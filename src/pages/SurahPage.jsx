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
    <div className="page container" style={{ '--arabic-scale': settings.arabicScale }}>
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
      </div>

      {surah.ayahs.map((ayah) => (
        <AyahCard
          key={ayah.number}
          ayah={ayah}
          surahNumber={surahNumber}
          isActive={isCurrentSurah && player.currentAyah?.numberInSurah === ayah.numberInSurah}
          isPlaying={player.isPlaying}
          isLoading={player.isLoading}
          words={wordsBySurah?.get(ayah.numberInSurah)}
          activeWordPosition={
            isCurrentSurah && player.currentAyah?.numberInSurah === ayah.numberInSurah
              ? player.activeWordPosition
              : null
          }
          showTranslation={settings.showTranslation}
          bookmarked={isBookmarked(surahNumber, ayah.numberInSurah)}
          onPlay={player.play}
          onBookmark={(a) =>
            toggleBookmark({
              surahNumber,
              surahName: surah.englishName,
              numberInSurah: a.numberInSurah,
              text: a.translation,
            })
          }
        />
      ))}
    </div>
  )
}
