import { forwardRef } from 'react'
import { PlayIcon, PauseIcon, BookmarkIcon, LoopIcon } from './Icons.jsx'

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
    showTransliteration,
    showWordMeaning,
    bookmarked,
    looping,
    onPlay,
    onBookmark,
    onToggleLoop,
  },
  ref
) {
  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      ref={ref}
      className={`quran-row${isActive ? ' is-active' : ''}`}
      aria-label={`Ayah ${ayah.numberInSurah}`}
    >
      <div className="quran-row__meaning">
        <div className="quran-row__controls">
          <span className="ayah-badge">{ayah.numberInSurah}</span>
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
          <button
            type="button"
            className={`icon-btn${looping ? ' icon-btn--active' : ''}`}
            onClick={onToggleLoop}
            aria-pressed={looping}
            aria-label={looping ? 'Stop repeating this ayah' : `Repeat ayah ${ayah.numberInSurah} to memorize`}
            title="Repeat this ayah"
          >
            <LoopIcon />
          </button>
        </div>
        {showTranslation && <p className="quran-row__translation">{ayah.translation}</p>}
      </div>
      <p className="quran-row__arabic arabic" lang="ar">
        {words ? (
          words.map((w) => (
            <span
              key={w.position}
              className={`word${activeWordPosition === w.position ? ' is-active' : ''}`}
            >
              <span className="word__arabic">{w.text}</span>
              {showTransliteration && w.transliteration && (
                <span className="word__transliteration">{w.transliteration}</span>
              )}
              {showWordMeaning && w.meaning && <span className="word__meaning">{w.meaning}</span>}
            </span>
          ))
        ) : (
          ayah.arabic
        )}
      </p>
    </div>
  )
})

export default AyahCard
