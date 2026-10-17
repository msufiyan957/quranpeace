import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSurahList } from '../api/quran.js'
import { useBookmarks } from '../context/BookmarksContext.jsx'
import SurahCard from '../components/SurahCard.jsx'
import { SearchIcon, BookIcon } from '../components/Icons.jsx'

export default function Home() {
  const [surahs, setSurahs] = useState(null)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const { lastRead } = useBookmarks()

  useEffect(() => {
    getSurahList().then(setSurahs).catch(() => setError('Could not load the surah list. Check your connection.'))
  }, [])

  const filtered = useMemo(() => {
    if (!surahs) return []
    const q = query.trim().toLowerCase()
    if (!q) return surahs
    return surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        String(s.number) === q
    )
  }, [surahs, query])

  return (
    <div className="page container">
      <div className="search-bar">
        <SearchIcon />
        <input
          type="search"
          placeholder="Find a surah by name or number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Find a surah by name or number"
        />
      </div>

      {lastRead && (
        <Link
          to={`/surah/${lastRead.surahNumber}#ayah-${lastRead.numberInSurah}`}
          className="continue-card"
        >
          <BookIcon style={{ width: 28, height: 28 }} />
          <span className="continue-card__text">
            <span className="continue-card__label">Continue listening</span>
            <span className="continue-card__title">
              {lastRead.surahName} · Ayah {lastRead.numberInSurah} of {lastRead.totalAyahs}
            </span>
          </span>
        </Link>
      )}

      {error && <div className="banner-error">{error}</div>}

      {!surahs && !error && (
        <div className="empty-state">
          <span className="spinner" aria-hidden="true" />
          <p>Loading surahs…</p>
        </div>
      )}

      <div className="surah-grid">
        {filtered.map((s) => (
          <SurahCard key={s.number} surah={s} />
        ))}
      </div>
    </div>
  )
}
