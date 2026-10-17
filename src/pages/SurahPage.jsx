import { useEffect, useRef, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { getSurah } from '../api/quran.js'
import { getChapterWords } from '../api/quranWbw.js'
import { useSettings } from '../context/SettingsContext.jsx'
import { useBookmarks } from '../context/BookmarksContext.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import AyahCard from '../components/AyahCard.jsx'
import { PlayIcon, PauseIcon, SpeakerIcon, PrevIcon } from '../components/Icons.jsx'

export default function SurahPage() {
  const { number } = useParams()
  const surahNumber = Number(number)
  const location = useLocation()
  const { settings, update } = useSettings()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const player = usePlayer()

  const [surah, setSurah] = useState(null)
  const [wordsBySurah, setWordsBySurah] = useState(null)
  const [error, setError] = useState(null)
  const scrolledRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    setSurah(null)
    setWordsBySurah(null)
    setError(null)
    scrolledRef.current = false
    getSurah(surahNumber, { translation: settings.translation })
      .then((s) => {
        if (!cancelled) setSurah(s)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load this surah. Check your connection and try again.')
      })
    getChapterWords(surahNumber)
      .then((words) => {
        if (!cancelled) setWordsBySurah(words)
      })
      .catch(() => {
        /* word-by-word highlighting is an enhancement; reading still works without it */
      })
    return () => {
      cancelled = true
    }
  }, [surahNumber, settings.translation])

  useEffect(() => {
    if (surah && location.hash && !scrolledRef.current) {
      scrolledRef.current = true
      const el = document.getElementById(location.hash.slice(1))
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }
  }, [surah, location.hash])

  const isCurrentSurah = player.surah?.number === surahNumber

  // Follow the active ayah as recitation advances through the surah
  useEffect(() => {
    if (!isCurrentSurah || !player.currentAyah) return
    const el = document.getElementById(`ayah-${player.currentAyah.numberInSurah}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [isCurrentSurah, player.currentAyah])

  if (error) {
    return (
      <div className="page container">
        <div className="banner-error">{error}</div>
        <p><Link to="/">&larr; Back to all surahs</Link></p>
      </div>
    )
  }

  if (!surah) {
    return (
      <div className="page container">
        <div className="empty-state">
          <span className="spinner" aria-hidden="true" />
          <p>Loading surah…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page container container--reader" style={{ '--arabic-scale': settings.arabicScale }}>
      <p style={{ marginTop: 16 }}>
        <Link to="/" aria-label="Back to all surahs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--text-dim)' }}>
          <PrevIcon style={{ width: 18, height: 18 }} /> All surahs
        </Link>
      </p>

      <header className="surah-header">
        <div className="surah-header__name-ar arabic">{surah.name}</div>
        <div className="surah-header__name-en">{surah.englishName} — {surah.englishNameTranslation}</div>
        <div className="surah-header__meta">{surah.revelationType} · {surah.numberOfAyahs} ayahs</div>
      </header>

      <div className="surah-toolbar">
        <button
          type="button"
          className="pill-btn active"
          onClick={() => (isCurrentSurah ? player.toggle() : player.play(surahNumber, 0))}
        >
          {isCurrentSurah && player.isPlaying ? <PauseIcon /> : <PlayIcon />}
          {isCurrentSurah && player.isPlaying ? 'Pause recitation' : 'Listen to this surah'}
        </button>
        <button
          type="button"
          className={`pill-btn${settings.showTranslation ? ' active' : ''}`}
          onClick={() => update({ showTranslation: !settings.showTranslation })}
          aria-pressed={settings.showTranslation}
        >
          <SpeakerIcon /> Translation
        </button>
        <button
          type="button"
          className={`pill-btn${settings.showTransliteration ? ' active' : ''}`}
          onClick={() => update({ showTransliteration: !settings.showTransliteration })}
          aria-pressed={settings.showTransliteration}
        >
          <SpeakerIcon /> Transliteration
        </button>
        <button
          type="button"
          className={`pill-btn${settings.showWordMeaning ? ' active' : ''}`}
          onClick={() => update({ showWordMeaning: !settings.showWordMeaning })}
          aria-pressed={settings.showWordMeaning}
        >
          <SpeakerIcon /> Word meaning
        </button>
      </div>

      <div className="quran-page">
        {surah.ayahs.map((ayah) => {
          const isActive = isCurrentSurah && player.currentAyah?.numberInSurah === ayah.numberInSurah
          return (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              surahNumber={surahNumber}
              isActive={isActive}
              isPlaying={player.isPlaying}
              isLoading={player.isLoading}
              words={wordsBySurah?.get(ayah.numberInSurah)}
              activeWordPosition={isActive ? player.activeWordPosition : null}
              showTranslation={settings.showTranslation}
              showTransliteration={settings.showTransliteration}
              showWordMeaning={settings.showWordMeaning}
              bookmarked={isBookmarked(surahNumber, ayah.numberInSurah)}
              looping={isActive && player.loopAyah}
              onPlay={player.play}
              onToggle={player.toggle}
              onToggleLoop={() => {
                if (isActive) {
                  player.setLoopAyah(!player.loopAyah)
                } else {
                  player.play(surahNumber, ayah.numberInSurah - 1)
                  player.setLoopAyah(true)
                }
              }}
              onBookmark={(a) =>
                toggleBookmark({
                  surahNumber,
                  surahName: surah.englishName,
                  numberInSurah: a.numberInSurah,
                  text: a.translation,
                })
              }
            />
          )
        })}
      </div>
    </div>
  )
}
