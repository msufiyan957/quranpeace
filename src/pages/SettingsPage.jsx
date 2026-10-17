import { useSettings } from '../context/SettingsContext.jsx'
import { RECITERS, TRANSLATIONS } from '../api/quran.js'
import { PlusIcon, MinusIcon, LoopIcon } from '../components/Icons.jsx'

const THEMES = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'system', name: 'System' },
]

export default function SettingsPage() {
  const { settings, update, setArabicScale } = useSettings()

  return (
    <div className="page container">
      <h1 className="page-title">Settings</h1>

      <div className="settings-group">
        <h2>Appearance</h2>
        <div className="option-row">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`option-pill${settings.theme === t.id ? ' active' : ''}`}
              onClick={() => update({ theme: t.id })}
              aria-pressed={settings.theme === t.id}
            >
              {t.name}
              <span className="option-pill__check" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <h2>Reciter</h2>
        <div className="option-row">
          {RECITERS.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`option-pill${settings.reciter === r.id ? ' active' : ''}`}
              onClick={() => update({ reciter: r.id })}
              aria-pressed={settings.reciter === r.id}
            >
              {r.name}
              <span className="option-pill__check" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <h2>Translation</h2>
        <div className="option-row">
          {TRANSLATIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`option-pill${settings.translation === t.id ? ' active' : ''}`}
              onClick={() => update({ translation: t.id })}
              aria-pressed={settings.translation === t.id}
            >
              {t.name}
              <span className="option-pill__check" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <h2>Reading</h2>
        <div className="font-size-row">
          <span className="font-size-row__label">Arabic text size</span>
          <div className="font-size-row__controls">
            <button type="button" className="icon-btn" onClick={() => setArabicScale(-0.1)} aria-label="Decrease text size">
              <MinusIcon />
            </button>
            <span aria-live="polite">{Math.round(settings.arabicScale * 100)}%</span>
            <button type="button" className="icon-btn" onClick={() => setArabicScale(0.1)} aria-label="Increase text size">
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="toggle-row" style={{ marginTop: 10 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LoopIcon style={{ width: 20, height: 20 }} />
            Continue to next surah automatically
          </span>
          <button
            type="button"
            className={`switch${settings.continuousPlay ? ' on' : ''}`}
            onClick={() => update({ continuousPlay: !settings.continuousPlay })}
            role="switch"
            aria-checked={settings.continuousPlay}
            aria-label="Continue to next surah automatically"
          >
            <span className="switch__knob" />
          </button>
        </div>
      </div>
    </div>
  )
}
