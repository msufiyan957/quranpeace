import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.jsx'
import { PlayIcon, PauseIcon } from './Icons.jsx'

export default function SurahCard({ surah }) {
  const { surah: current, isPlaying, isLoading, play, toggle } = usePlayer()
  const isCurrent = current?.number === surah.number

  function handlePlayClick(e) {
    e.preventDefault()
    e.stopPropagation()
    if (isCurrent) {
      toggle()
    } else {
      play(surah.number, 0)
    }
  }

  return (
    <div className="surah-card">
      <Link to={`/surah/${surah.number}`} className="surah-card__link">
        <span className="surah-card__number" aria-hidden="true">{surah.number}</span>
        <span className="surah-card__text">
          <span className="surah-card__name-en">{surah.englishName}</span>
          <span className="surah-card__meta">
            <span className="surah-card__meta-text">
              {surah.englishNameTranslation} · {surah.numberOfAyahs} ayahs
            </span>
            <span className="surah-card__tag">{surah.revelationType}</span>
          </span>
        </span>
        <span className="surah-card__name-ar arabic">{surah.name}</span>
      </Link>
      <button
        type="button"
        className="icon-btn icon-btn--primary"
        onClick={handlePlayClick}
        aria-label={`${isCurrent && isPlaying ? 'Pause' : 'Play'} ${surah.englishName}`}
      >
        {isCurrent && isLoading ? (
          <span className="spinner" aria-hidden="true" />
        ) : isCurrent && isPlaying ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </button>
    </div>
  )
}
