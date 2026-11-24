// Capisce il "quando" da una frase scritta come si parla ("ricordami che tra 3 giorni devo…").
// Sei lingue (it, en, es, fr, de, pt). Restituisce la data (YYYY-MM-DD) e il testo ripulito.
export type When = { due?: string; text: string }

const NUM: Record<string, number> = {
  un: 1, una: 1, uno: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  due: 2, tre: 3, quattro: 4, cinque: 5, sei: 6, sette: 7, otto: 8, nove: 9, dieci: 10,
  dos: 2, tres: 3, cuatro: 4, cinco: 5, siete: 7, ocho: 8, nueve: 9, diez: 10,
  deux: 2, trois: 3, quatre: 4, cinq: 5, sept: 7, huit: 8, neuf: 9, dix: 10,
  ein: 1, eine: 1, einen: 1, zwei: 2, drei: 3, vier: 4, funf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10,
  dois: 2, duas: 2, seis: 6, sete: 7, oito: 8, dez: 10,
}
const WEEKDAYS: Record<string, number> = {
  domenica: 0, lunedi: 1, martedi: 2, mercoledi: 3, giovedi: 4, venerdi: 5, sabato: 6,
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6,
  domingo: 0, lunes: 1, martes: 2, miercoles: 3, jueves: 4, viernes: 5,
  dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6,
  sonntag: 0, montag: 1, dienstag: 2, mittwoch: 3, donnerstag: 4, freitag: 5, samstag: 6, sonnabend: 6,
  segunda: 1, terca: 2, quarta: 3, quinta: 4, sexta: 5,
}
const MONTHS: Record<string, number> = {
  gennaio: 0, febbraio: 1, marzo: 2, aprile: 3, maggio: 4, giugno: 5, luglio: 6, agosto: 7, settembre: 8, ottobre: 9, novembre: 10, dicembre: 11,
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, december: 11,
  enero: 0, febrero: 1, mayo: 4, junio: 5, julio: 6, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  janvier: 0, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6, aout: 7, decembre: 11,
  januar: 0, februar: 1, marz: 2, juni: 5, juli: 6, oktober: 9, dezember: 11,
  janeiro: 0, fevereiro: 1, abril: 3, maio: 4, junho: 5, julho: 6, setembro: 8, outubro: 9, dezembro: 11,
}
const alt = (o: Record<string, number>) => Object.keys(o).sort((a, b) => b.length - a.length).join('|')

const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const plus = (d: Date, n: number) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return x }
const strip = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '')

export function parseWhen(input: string, lang: string, now = new Date()): When {
  const orig = input.trim()
  let norm = strip(orig).toLowerCase()
  if (norm.length !== orig.length) norm = orig.toLowerCase() // se la lunghezza cambia non si può ritagliare: si prova senza accenti tolti
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const cuts: [number, number][] = []
  let due: Date | undefined
  const take = (m: RegExpExecArray | null, d: Date) => { if (!m || due) return; due = d; cuts.push([m.index, m.index + m[0].length]) }

  // 1) dopodomani / domani
  take(/\b(?:dopodomani|day after tomorrow|pasado manana|apres-demain|apres demain|ubermorgen|depois de amanha)\b/.exec(norm), plus(today, 2))
  take(/\b(?:domani|tomorrow|manana|demain|morgen|amanha)\b/.exec(norm), plus(today, 1))

  // 2) tra N giorni/settimane/mesi
  if (!due) {
    const m = new RegExp(`\\b(?:tra|fra|in|dentro de|dans|daqui a|em|en)\\s+(\\d+|${alt(NUM)})\\s+(giorn[oi]|days?|dias?|jours?|tagen?|tage|settiman[ae]|weeks?|semanas?|semaines?|wochen?|mes(?:es|i|e)?|months?|mois|monat(?:e|en)?)\\b`).exec(norm)
    if (m) {
      const n = /^\d+$/.test(m[1]!) ? Number(m[1]) : NUM[m[1]!] ?? 0
      const u = m[2]!
      let d = today
      if (/^(giorn|day|dia|jour|tag)/.test(u)) d = plus(today, n)
      else if (/^(settiman|week|seman|woche)/.test(u)) d = plus(today, n * 7)
      else d = new Date(today.getFullYear(), today.getMonth() + n, today.getDate())
      if (n > 0) take(m, d)
    }
  }

  // 3) la prossima settimana
  take(/\b(?:next week|(?:la )?settimana prossima|(?:la )?prossima settimana|(?:la )?semana que viene|(?:la )?proxima semana|(?:la )?semaine prochaine|(?:die )?nachste woche|(?:na )?proxima semana)\b/.exec(norm), plus(today, 7))

  // 4) giorno della settimana (prossima occorrenza)
  if (!due) {
    const m = new RegExp(`\\b(?:(?:next|prossimo|prossima|proximo|proxima|prochain|nachsten|kommenden)\\s+)?(${alt(WEEKDAYS)})(?:-feira)?\\b`).exec(norm)
    if (m) take(m, plus(today, ((WEEKDAYS[m[1]!]! - today.getDay() + 7) % 7) || 7))
  }

  // 5) data: "il 25", "il 5 dicembre", "on the 3rd of January", "12/12"
  if (!due) {
    const m = new RegExp(`\\b(?:il|on the|on|the|el|le|am|dia|den)\\s+(\\d{1,2})(?:st|nd|rd|th|\\.)?(?:\\s+(?:of\\s+|de\\s+|di\\s+)?(${alt(MONTHS)}))?\\b`).exec(norm)
    if (m) {
      const day = Number(m[1])
      if (day >= 1 && day <= 31) {
        let y = today.getFullYear()
        let mo = m[2] ? MONTHS[m[2]]! : today.getMonth()
        let d = new Date(y, mo, day)
        if (d <= today) d = m[2] ? new Date(y + 1, mo, day) : new Date(y, mo + 1, day)
        take(m, d)
      }
    }
  }
  if (!due) {
    const m = /\b(\d{1,2})[/\-.](\d{1,2})(?:[/\-.](\d{2,4}))?\b/.exec(norm)
    if (m) {
      const a = Number(m[1]), b = Number(m[2])
      const [day, mo] = lang.startsWith('en') ? [b, a] : [a, b]
      if (day >= 1 && day <= 31 && mo >= 1 && mo <= 12) {
        let y = m[3] ? (m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3])) : today.getFullYear()
        let d = new Date(y, mo - 1, day)
        if (!m[3] && d <= today) d = new Date(y + 1, mo - 1, day)
        take(m, d)
      }
    }
  }

  // 6) oggi / stasera (arriverà comunque nel brief del giorno dopo)
  take(/\b(?:oggi|stasera|stanotte|today|tonight|hoy|esta noche|aujourd'?hui|ce soir|heute|hoje|esta noite)\b/.exec(norm), today)

  // testo ripulito
  let text = orig
  if (norm.length === orig.length) {
    const sorted = cuts.slice().sort((a, b) => b[0] - a[0])
    for (const [s, e] of sorted) text = text.slice(0, s) + ' ' + text.slice(e)
  }
  text = text
    .replace(/^\s*(?:ricordami|ricordarmi|ricorda(?:mi)?|remind me|recuerdame|recuérdame|recordame|rappelle[- ]moi|rappelez[- ]moi|erinnere mich|erinner mich|lembre[- ]me|me lembre)\b\s*/i, '')
    .replace(/^\s*(?:che|di|to|that|of|about|que|de|d'|an|daran|dass|,)\s+/i, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s,;:–-]+|[\s,;:–-]+$/g, '')
  text = text.replace(/^(?:che|di|to|that|que|de|dass)\s+/i, '').trim()
  return { due: due ? ymd(due) : undefined, text: text || orig }
}

// "boh", "non importa", "quando vuoi"… -> si usa il brief del giorno dopo
export const WHENEVER = /\b(?:boh|non importa|quando vuoi|come vuoi|whenever|any ?time|no idea|doesn'?t matter|da igual|cuando quieras|peu importe|n'importe quand|egal|wann du willst|tanto faz|quando quiser)\b/i
