import { Link } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarksContext.jsx'
import { BookmarkIcon } from '../components/Icons.jsx'

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  const sorted = [...bookmarks].sort((a, b) => b.savedAt - a.savedAt)

  return (
    <div className="page container">
      <h1 className="page-title">Your bookmarks</h1>

      {sorted.length === 0 && (
        <div className="empty-state">
          <BookmarkIcon />
          <p>No bookmarks yet. Tap the bookmark icon on any ayah while reading to save it here.</p>
        </div>
      )}

      {sorted.map((b) => (
        <div key={`${b.surahNumber}-${b.numberInSurah}`} className="search-result" style={{ position: 'relative' }}>
          <Link to={`/surah/${b.surahNumber}#ayah-${b.numberInSurah}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="search-result__ref">{b.surahName} · Ayah {b.numberInSurah}</div>
            <div className="search-result__text">{b.text}</div>
          </Link>
          <button
            type="button"
            className="icon-btn"
            style={{ position: 'absolute', top: 8, right: 8 }}
            onClick={() => toggleBookmark(b)}
            aria-label="Remove bookmark"
          >
            <BookmarkIcon filled />
          </button>
        </div>
      ))}
    </div>
  )
}
