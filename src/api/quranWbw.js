const BASE = 'https://api.quran.com/api/v4'
const AUDIO_CDN = 'https://audio.qurancdn.com/'

// Maps our alquran.cloud reciter identifiers to quran.com's numeric recitation ids
export const RECITATION_IDS = {
  'ar.alafasy': 7,
  'ar.husary': 6,
  'ar.abdulbasitmurattal': 2,
  'ar.minshawi': 9,
}

const chapterWordsCache = new Map()
const ayahAudioCache = new Map()

async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

// Returns a Map<numberInSurah, word[]> for every ayah in the surah, where each
// word is { position, text, meaning, transliteration } — text already excludes
// end-of-ayah markers.
export function getChapterWords(surahNumber) {
  if (chapterWordsCache.has(surahNumber)) return chapterWordsCache.get(surahNumber)
  const promise = getJSON(
    `${BASE}/verses/by_chapter/${surahNumber}?words=true&word_fields=text_uthmani&per_page=300`
  ).then((data) => {
    const map = new Map()
    for (const verse of data.verses) {
      const words = verse.words
        .filter((w) => w.char_type_name === 'word')
        .map((w) => ({
          position: w.position,
          text: w.text_uthmani,
          meaning: w.translation?.text || '',
          transliteration: w.transliteration?.text || '',
        }))
      map.set(verse.verse_number, words)
    }
    return map
  })
  chapterWordsCache.set(surahNumber, promise)
  return promise
}

// Returns { url, segments } for one ayah's audio, where segments is an array
// of [_, wordPosition, startMs, endMs] marking when each word is spoken.
export async function getAyahAudio(reciterId, surahNumber, numberInSurah) {
  const qdcId = RECITATION_IDS[reciterId] || RECITATION_IDS['ar.alafasy']
  const verseKey = `${surahNumber}:${numberInSurah}`
  const key = `${qdcId}:${verseKey}`
  if (ayahAudioCache.has(key)) return ayahAudioCache.get(key)
  const promise = getJSON(`${BASE}/recitations/${qdcId}/by_ayah/${verseKey}?fields=segments`).then(
    (data) => {
      const file = data.audio_files?.[0]
      if (!file) throw new Error('No audio available for this ayah')
      return {
        url: file.url.startsWith('http') ? file.url : `${AUDIO_CDN}${file.url}`,
        segments: file.segments || [],
      }
    }
  )
  ayahAudioCache.set(key, promise)
  return promise
}
