import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import MiniPlayer from './components/MiniPlayer.jsx'
import Home from './pages/Home.jsx'
import SurahPage from './pages/SurahPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import BookmarksPage from './pages/BookmarksPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import { usePlayer } from './context/PlayerContext.jsx'

export default function App() {
  const { surah, currentAyah } = usePlayer()
  const showMiniPlayer = Boolean(surah && currentAyah)

  // The mini-player is fixed-position and sits above the bottom nav; reserve
  // extra scroll space while it's visible so it doesn't cover page content.
  useEffect(() => {
    document.body.classList.toggle('has-mini-player', showMiniPlayer)
    return () => document.body.classList.remove('has-mini-player')
  }, [showMiniPlayer])

  return (
    <>
      <a href="#main" className="sr-only">Skip to content</a>
      <Header />
      <main id="main" style={{ display: 'contents' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surah/:number" element={<SurahPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <MiniPlayer />
      <BottomNav />
    </>
  )
}
