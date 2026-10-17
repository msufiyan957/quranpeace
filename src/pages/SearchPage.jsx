import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchQuran } from '../api/quran.js'
import { useSettings } from '../context/SettingsContext.jsx'
import { SearchIcon } from '../components/Icons.jsx'

export default function SearchPage() {
  const { settings } = useSettings()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    const handle = setTimeout(() => {
      searchQuran(q, { translation: settings.translation })
        .then(setResults)
        .finally(() => setLoading(false))
    }, 350)
    return () => clearTimeout(handle)
  }, [query, settings.translation])

  return (
    <div className="page container">
      <h1 className="page-title">Search the Quran</h1>
      <div className="search-bar">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search by word or phrase, e.g. mercy, patience"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search by word or phrase"
          autoFocus
        />
      </div>

      {loading && (
        <div className="empty-state">
          <span className="spinner" aria-hidden="true" />
          <p>Searching…</p>
        </div>
      )}

      {!loading && query.trim().length >= 2 && results.length === 0 && (
        <div className="empty-state">
          <SearchIcon />
          <p>No matches found for "{query}".</p>
        </div>
      )}

      {results.map((r, i) => (
        <Link
          key={`${r.surahNumber}-${r.numberInSurah}-${i}`}
          to={`/surah/${r.surahNumber}#ayah-${r.numberInSurah}`}
          className="search-result"
        >
          <div className="search-result__ref">{r.surahName} · Ayah {r.numberInSurah}</div>
          <div className="search-result__text">{r.text}</div>
        </Link>
      ))}
    </div>
  )
}
