import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { BookmarksProvider } from './context/BookmarksContext.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <BookmarksProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </BookmarksProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>
)
