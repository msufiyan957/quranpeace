import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getSurah } from '../api/quran.js'
import { getAyahAudio } from '../api/quranWbw.js'
import { useSettings } from './SettingsContext.jsx'
import { useBookmarks } from './BookmarksContext.jsx'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const { settings } = useSettings()
  const { recordLastRead } = useBookmarks()
  const audioRef = useRef(null)
  const segmentsRef = useRef([])
  const [surah, setSurah] = useState(null)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeWordPosition, setActiveWordPosition] = useState(null)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audio.ontimeupdate = () => {
      const segments = segmentsRef.current
      if (!segments.length) return
      const t = audio.currentTime * 1000
      const seg = segments.find(([, , start, end]) => t >= start && t < end)
      setActiveWordPosition(seg ? seg[1] : null)
    }
    audioRef.current = audio
    return () => audio.pause()
  }, [])

  async function playAt(surahNumber, idx) {
    setError(null)
    setIsLoading(true)
    try {
      let s = surah
      if (!s || s.number !== surahNumber) {
        s = await getSurah(surahNumber, { translation: settings.translation })
        setSurah(s)
      }
      const ayah = s.ayahs[idx]
      if (!ayah) return
      const audioData = await getAyahAudio(settings.reciter, surahNumber, ayah.numberInSurah)
      setIndex(idx)
      setActiveWordPosition(null)
      segmentsRef.current = audioData.segments
      const audio = audioRef.current
      audio.src = audioData.url
      await audio.play()
      setIsPlaying(true)
      recordLastRead({
        surahNumber: s.number,
        surahName: s.englishName,
        numberInSurah: ayah.numberInSurah,
        totalAyahs: s.numberOfAyahs,
      })
    } catch (e) {
      setError('Could not play audio. Check your connection and try again.')
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  function togglePlayPause() {
    const audio = audioRef.current
    if (!audio || !surah) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  function goToNext() {
    if (!surah) return
    if (index + 1 < surah.ayahs.length) {
      playAt(surah.number, index + 1)
    } else if (settings.continuousPlay && surah.number < 114) {
      playAt(surah.number + 1, 0)
    } else {
      setIsPlaying(false)
    }
  }

  function goToPrev() {
    if (!surah) return
    if (index > 0) {
      playAt(surah.number, index - 1)
    } else if (surah.number > 1) {
      playAt(surah.number - 1, 0)
    }
  }

  // Keep the audio in sync when the user changes reciter or translation mid-playback
  useEffect(() => {
    if (!surah) return
    let cancelled = false
    ;(async () => {
      const wasPlaying = isPlaying
      try {
        const [s, audioData] = await Promise.all([
          getSurah(surah.number, { translation: settings.translation }),
          getAyahAudio(settings.reciter, surah.number, surah.ayahs[index].numberInSurah),
        ])
        if (cancelled) return
        setSurah(s)
        segmentsRef.current = audioData.segments
        setActiveWordPosition(null)
        const audio = audioRef.current
        if (audio) {
          audio.src = audioData.url
          if (wasPlaying) audio.play()
        }
      } catch (e) {
        /* keep previous audio if refresh fails */
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.reciter, settings.translation])

  // Rebind the "ended" handler so it always sees the latest surah/index/continuousPlay
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.onended = goToNext
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surah, index, settings.continuousPlay])

  const currentAyah = surah ? surah.ayahs[index] : null

  return (
    <PlayerContext.Provider
      value={{
        surah,
        index,
        currentAyah,
        isPlaying,
        isLoading,
        error,
        activeWordPosition,
        play: playAt,
        toggle: togglePlayPause,
        next: goToNext,
        prev: goToPrev,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
