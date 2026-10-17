const BASE = 'https://api.alquran.cloud/v1'

const cache = new Map()

async function getJSON(url) {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (json.code !== 200) throw new Error(json.data || 'Request failed')
  cache.set(url, json.data)
  return json.data
}

function cleanText(text) {
  return text.replace(/^﻿/, '').trim()
}

export const RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Al-Afasy' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi' },
]

export const TRANSLATIONS = [
  { id: 'en.sahih', name: 'Saheeh International (English)' },
  { id: 'en.asad', name: 'Muhammad Asad (English)' },
  { id: 'en.pickthall', name: 'Pickthall (English)' },
  { id: 'ur.jalandhry', name: 'Jalandhry (Urdu)' },
]

let surahListPromise = null
export function getSurahList() {
  if (!surahListPromise) {
    surahListPromise = getJSON(`${BASE}/meta`).then((data) => data.surahs.references)
  }
  return surahListPromise
}

export async function getSurah(number, { translation = 'en.sahih' } = {}) {
  const editions = `quran-uthmani,${translation}`
  const data = await getJSON(`${BASE}/surah/${number}/editions/${editions}`)
  const [arabic, translated] = data
  const ayahs = arabic.ayahs.map((a, i) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    arabic: cleanText(a.text),
    translation: cleanText(translated.ayahs[i]?.text || ''),
    sajda: !!a.sajda,
  }))
  return {
    number: arabic.number,
    name: arabic.name,
    englishName: arabic.englishName,
    englishNameTranslation: arabic.englishNameTranslation,
    revelationType: arabic.revelationType,
    numberOfAyahs: arabic.numberOfAyahs,
    ayahs,
  }
}

export async function searchQuran(keyword, { translation = 'en.sahih' } = {}) {
  if (!keyword || keyword.trim().length < 2) return []
  const url = `${BASE}/search/${encodeURIComponent(keyword.trim())}/all/${translation}`
  try {
    const data = await getJSON(url)
    return data.matches.map((m) => ({
      surahNumber: m.surah.number,
      surahName: m.surah.englishName,
      numberInSurah: m.numberInSurah,
      text: cleanText(m.text),
    }))
  } catch (e) {
    return []
  }
}
