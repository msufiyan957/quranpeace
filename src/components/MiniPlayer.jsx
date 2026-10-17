import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext.jsx'
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from './Icons.jsx'

export default function MiniPlayer() {
  const { surah, currentAyah, isPlaying, isLoading, toggle, next, prev } = usePlayer()
  const navigate = useNavigate()

  if (!surah || !currentAyah) return null

  return (
    <div className="mini-player" role="region" aria-label="Audio player">
      <div className="mini-player__inner">
        <button
          type="button"
          className="mini-player__info"
          style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}
          onClick={() => navigate(`/surah/${surah.number}#ayah-${currentAyah.numberInSurah}`)}
        >
          <div className="mini-player__title">{surah.englishName}</div>
          <div className="mini-player__sub">Ayah {currentAyah.numberInSurah} of {surah.numberOfAyahs}</div>
        </button>
        <button type="button" className="icon-btn" onClick={prev} aria-label="Previous ayah">
          <PrevIcon />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--primary"
          onClick={toggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? <span className="spinner" aria-hidden="true" /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button type="button" className="icon-btn" onClick={next} aria-label="Next ayah">
          <NextIcon />
        </button>
      </div>
    </div>
  )
}
