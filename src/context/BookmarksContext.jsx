import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'qp.bookmarks.v1'
const LAST_READ_KEY = 'qp.lastread.v1'

function loadBookmarks() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* ignore corrupt storage */
  }
  return []
}

function loadLastRead() {
  try {
    const raw = localStorage.getItem(LAST_READ_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* ignore corrupt storage */
  }
  return null
}

const BookmarksContext = createContext(null)

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(loadBookmarks)
  const [lastRead, setLastRead] = useState(loadLastRead)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    if (lastRead) localStorage.setItem(LAST_READ_KEY, JSON.stringify(lastRead))
  }, [lastRead])

  function isBookmarked(surahNumber, numberInSurah) {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.numberInSurah === numberInSurah)
  }

  function toggleBookmark(entry) {
    setBookmarks((bs) => {
      const exists = bs.some(
        (b) => b.surahNumber === entry.surahNumber && b.numberInSurah === entry.numberInSurah
      )
      if (exists) {
        return bs.filter(
          (b) => !(b.surahNumber === entry.surahNumber && b.numberInSurah === entry.numberInSurah)
        )
      }
      return [...bs, { ...entry, savedAt: Date.now() }]
    })
  }

  function recordLastRead(entry) {
    setLastRead({ ...entry, at: Date.now() })
  }

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark, lastRead, recordLastRead }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext)
  if (!ctx) throw new Error('useBookmarks must be used within BookmarksProvider')
  return ctx
}
