import { createContext, useContext, useEffect, useState } from 'react'
import { RECITERS, TRANSLATIONS } from '../api/quran.js'

const KEY = 'qp.settings.v1'

function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch (e) {
    /* ignore corrupt storage */
  }
  return defaults()
}

function defaults() {
  return {
    translation: TRANSLATIONS[0].id,
    reciter: RECITERS[0].id,
    arabicScale: 1,
    showTranslation: true,
    showTransliteration: false,
    showWordMeaning: true,
    continuousPlay: true,
    theme: 'dark',
  }
}

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings))
  }, [settings])

  // Reflect the chosen theme on <html>, following the OS preference live when set to "system"
  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: light)')

    function apply() {
      const resolved = settings.theme === 'system' ? (media.matches ? 'light' : 'dark') : settings.theme
      root.setAttribute('data-theme', resolved)
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', resolved === 'light' ? '#faf8f3' : '#0f1115')
    }

    apply()
    if (settings.theme === 'system') {
      media.addEventListener('change', apply)
      return () => media.removeEventListener('change', apply)
    }
  }, [settings.theme])

  function update(patch) {
    setSettings((s) => ({ ...s, ...patch }))
  }

  function setArabicScale(delta) {
    setSettings((s) => ({
      ...s,
      arabicScale: Math.min(2, Math.max(0.7, +(s.arabicScale + delta).toFixed(2))),
    }))
  }

  return (
    <SettingsContext.Provider value={{ settings, update, setArabicScale }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
