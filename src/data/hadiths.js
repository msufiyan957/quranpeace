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
  {
    text: 'The upper hand is better than the lower hand (the hand that gives is better than the hand that takes).',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Whoever guarantees me what is between his jaws (his tongue) and what is between his legs, I guarantee him Paradise.',
    source: 'Sahih al-Bukhari',
  },
  {
    text: 'What connection do I have with this world? I am to this world like a rider who takes shade under a tree, then moves on and leaves it.',
    source: 'Jami at-Tirmidhi',
  },
  {
    text: 'Allah does not look at your appearance or wealth, but He looks at your hearts and actions.',
    source: 'Sahih Muslim',
  },
  {
    text: 'The best of you are those who are best to their wives.',
    source: 'Jami at-Tirmidhi',
  },
  {
    text: 'A good word is charity.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Whoever believes in Allah and the Last Day, let him honor his guest.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Paradise is surrounded by hardships and Hell is surrounded by desires.',
    source: 'Sahih Muslim',
  },
  {
    text: 'Allah is Beautiful and loves beauty.',
    source: 'Sahih Muslim',
  },
  {
    text: 'Fear Allah wherever you are, follow a bad deed with a good deed which will wipe it out, and treat people with good character.',
    source: 'Jami at-Tirmidhi',
  },
  {
    text: 'None of you truly believes until I am more beloved to him than his father, his child, and all of mankind.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Paradise is nearer to any one of you than your shoelace, and so is the Fire.',
    source: 'Sahih al-Bukhari',
  },
  {
    text: 'Whomever Allah wants good for, He gives him understanding of the religion.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'Verily, Allah is Kind and loves kindness in all matters.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
  {
    text: 'There are two blessings which many people lose: health and free time.',
    source: 'Sahih al-Bukhari',
  },
  {
    text: 'Purity is half of faith.',
    source: 'Sahih Muslim',
  },
  {
    text: 'The believers, in their mutual love, mercy, and compassion, are like a body: when a part feels pain, the whole body responds with sleeplessness and fever.',
    source: 'Sahih al-Bukhari & Sahih Muslim',
  },
]

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - start) / 86400000)
}

export function getHadithOfTheDay(date = new Date()) {
  return HADITHS[dayOfYear(date) % HADITHS.length]
}
