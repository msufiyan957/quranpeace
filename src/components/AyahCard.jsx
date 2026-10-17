import { forwardRef } from 'react'
import { PlayIcon, PauseIcon, BookmarkIcon } from './Icons.jsx'

const AyahCard = forwardRef(function AyahCard(
  {
    ayah,
    surahNumber,
    isActive,
    isPlaying,
    isLoading,
    words,
    activeWordPosition,
    showTranslation,
    bookmarked,
    onPlay,
    onBookmark,
  },
  ref
) {
  return (
    <section
      id={`ayah-${ayah.numberInSurah}`}
      ref={ref}
      className={`ayah-card${isActive ? ' is-active' : ''}`}
      aria-label={`Ayah ${ayah.numberInSurah}`}
    >
      <div className="ayah-card__top">
        <span className="ayah-badge">{ayah.numberInSurah}</span>
        <div className="ayah-card__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onBookmark(ayah)}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <BookmarkIcon filled={bookmarked} />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--primary"
            onClick={() => onPlay(surahNumber, ayah.numberInSurah - 1)}
            aria-label={isActive && isPlaying ? 'Pause' : `Play ayah ${ayah.numberInSurah}`}
          >
            {isActive && isLoading ? (
              <span className="spinner" aria-hidden="true" />
            ) : isActive && isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </div>
      </div>
      <p className="ayah-card__arabic arabic" lang="ar">
        {words ? (
          words.map((w) => (
            <span
              key={w.position}
              className={`word${activeWordPosition === w.position ? ' is-active' : ''}`}
            >
              {w.text}
            </span>
          ))
        ) : (
          ayah.arabic
        )}
      </p>
      {showTranslation && <p className="ayah-card__translation">{ayah.translation}</p>}
    </section>
  )
})

export default AyahCard
