// A small, deliberately conservative set of widely-known, authentically attributed
// hadiths (Sahih al-Bukhari / Sahih Muslim unless noted). Hadith numbers are omitted
// since they vary between print editions — only the collection is cited.
export const HADITHS = [
  {
    text: 'Actions are judged by intentions, and every person will get the reward according to what he has intended.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'None of you truly believes until he loves for his brother what he loves for himself.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'The strong is not the one who overcomes people by his strength, but the strong is the one who controls himself while in anger.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'A Muslim is the one who avoids harming Muslims with his tongue and hands.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Make things easy for people, and do not make it difficult for them; make people calm, and do not scare them away.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'The best among you are those who learn the Qur\'an and teach it.',
    source: 'Sahih al-Bukhari',
  },
  {
    text: 'Smiling in the face of your brother is charity.',
    source: 'Jami at-Tirmidhi',
  },
  {
    text: 'Whoever relieves a believer\'s distress in this world, Allah will relieve his distress on the Day of Resurrection.',
    source: 'Sahih Muslim',
  },
  {
    text: 'Richness is not having many possessions, but richness is the richness of the soul.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'The most beloved of deeds to Allah are those that are most consistent, even if small.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Modesty is a part of faith.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Whoever is not merciful to others will not be treated mercifully.',
    source: 'Sahih al-Bukhari',
  },
]

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - start) / 86400000)
}

export function getHadithOfTheDay(date = new Date()) {
  return HADITHS[dayOfYear(date) % HADITHS.length]
}
