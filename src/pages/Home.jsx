import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSurahList } from '../api/quran.js'
import { useBookmarks } from '../context/BookmarksContext.jsx'
import SurahCard from '../components/SurahCard.jsx'
import { SearchIcon, BookIcon, ChevronRightIcon } from '../components/Icons.jsx'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

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

  const progress = lastRead ? Math.round((lastRead.numberInSurah / lastRead.totalAyahs) * 100) : 0

  return (
    <div className="page">
      <div className="container">
        <section className="home-hero">
          <p className="home-hero__eyebrow">
            {getGreeting()} <span className="arabic">السلام عليكم</span>
          </p>
          <h1 className="home-hero__title">The Noble Qur'an</h1>
          <p className="home-hero__subtitle">Read, listen, and reflect — in Arabic and your language.</p>
        </section>

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
            <span className="continue-card__icon" aria-hidden="true">
              <BookIcon style={{ width: 22, height: 22 }} />
            </span>
            <span className="continue-card__body">
              <span className="continue-card__label">Continue listening</span>
              <span className="continue-card__title">{lastRead.surahName}</span>
              <span className="continue-card__meta">
                <span>Ayah {lastRead.numberInSurah} of {lastRead.totalAyahs}</span>
                <span className="continue-card__percent">{progress}%</span>
              </span>
              <span className="continue-card__progress" aria-hidden="true">
                <span className="continue-card__progress-fill" style={{ width: `${progress}%` }} />
              </span>
            </span>
            <ChevronRightIcon className="continue-card__arrow" aria-hidden="true" />
          </Link>
        )}

        {error && <div className="banner-error">{error}</div>}

        {!surahs && !error && (
          <div className="empty-state">
            <span className="spinner" aria-hidden="true" />
            <p>Loading surahs…</p>
          </div>
        )}

        {surahs && (
          <div className="section-heading">
            <h2 className="section-title">All Surahs</h2>
            <span className="section-count">{filtered.length} of {surahs.length}</span>
          </div>
        )}
      </div>

      <div className="surah-section">
        <div className="surah-grid">
          {filtered.map((s) => (
            <SurahCard key={s.number} surah={s} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="divider" aria-hidden="true">
          <span />
          <span className="divider__dot" />
          <span />
        </div>
        <p className="dedication">
          I built this for my akhirah. I don't know who will read this, but I pray
          Allah rewards you a billion times more than me.
        </p>
      </div>
    </div>
  )
}
