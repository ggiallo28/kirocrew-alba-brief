// Testi predefiniti del "focus" per fonte: cosa deve cercare l'agente. L'utente può riscriverli per profilo.
const IT: Record<string, string> = {
  gmail: 'Concentrati sulle mail che richiedono una mia risposta o una decisione, da persone reali, con scadenze o soldi di mezzo. Ignora newsletter, promozioni e notifiche automatiche, salvo che contengano qualcosa su cui agire.',
  calendar: 'Elenca gli appuntamenti di oggi con orario, chi partecipa e cosa preparare. Segnala sovrapposizioni e inviti a cui non ho ancora risposto. Indica il primo spazio libero.',
  drive: 'Segnala i file condivisi con me o modificati da altri che potrei dover leggere o approvare. Ignora le mie modifiche.',
  slack: 'Concentrati su menzioni dirette, messaggi privati e thread in cui qualcuno aspetta una mia risposta. Ignora le chiacchiere generali e i bot.',
  youtrack: 'Concentrati sui ticket assegnati a me, bloccati o scaduti, e sui commenti che mi fanno una domanda.',
  jira: 'Concentrati sulle issue assegnate a me, bloccate o scadute, e sui commenti che mi fanno una domanda.',
  confluence: 'Segnala le pagine che osservo modificate da altri di recente. Ignora le mie modifiche.',
  folder: 'Leggi solo i 3-5 file modificati più di recente in questa cartella. Per ciascuno riassumi in poche righe cosa è stato fatto o deciso. Ignora i file più vecchi. Controlla se c\'è del lavoro in sospeso.',
  claudecode: 'Leggi le conversazioni più recenti (ultimi giorni) e riprendi cosa stavo facendo: su cosa stavo lavorando, cosa ho deciso, cosa è rimasto a metà o non completato. Segnalami solo quello che sembra ancora aperto.',
  kiro: 'Leggi le sessioni più recenti (ultimi giorni) e riprendi cosa stavo facendo: su cosa stavo lavorando, cosa ho deciso, cosa è rimasto a metà o non completato. Segnalami solo quello che sembra ancora aperto.',
  googlechat: 'Concentrati sui messaggi diretti e sulle stanze dove qualcuno mi ha taggato. Ignora il resto delle stanze di gruppo.',
  github: 'Concentrati su PR in attesa della mia revisione, workflow falliti sui miei repository e richieste di review o di risposta. Ignora il resto.',
  web: "Cerca notizie recenti sui temi del mio lavoro e dei miei interessi. Segnala solo ciò che cambia qualcosa per me: una novità importante, una scadenza, un'occasione. Ignora il resto.",
  _: 'Concentrati su ciò che richiede la mia attenzione o una decisione oggi. Ignora il rumore.',
}
const EN: Record<string, string> = {
  gmail: 'Focus on mail that needs my reply or a decision, from real people, with deadlines or money involved. Ignore newsletters, promotions and automatic notifications unless something in them needs action.',
  calendar: "List today's meetings with time, who is in and what to prepare. Flag overlaps and invites I have not answered yet. Mention the first free slot.",
  drive: 'Point out files shared with me or edited by others that I may need to read or approve. Ignore my own edits.',
  slack: 'Focus on direct mentions, DMs and threads where someone is waiting for my answer. Ignore general chatter and bots.',
  youtrack: 'Focus on issues assigned to me, blocked or past due, and comments that ask me something.',
  jira: 'Focus on issues assigned to me, blocked or past due, and comments that ask me something.',
  confluence: 'Point out pages I watch that were recently edited by others. Ignore my own edits.',
  folder: 'Read only the 3-5 most recently modified files in this folder. For each, summarize in a few lines what was done or decided. Ignore older files. Check whether there is any pending work.',
  claudecode: 'Read the most recent conversations (last few days) and remind me what I was doing: what I was working on, what I decided, what was left half-done or unfinished. Only flag what still looks open.',
  kiro: 'Read the most recent sessions (last few days) and remind me what I was doing: what I was working on, what I decided, what was left half-done or unfinished. Only flag what still looks open.',
  googlechat: 'Focus on direct messages and on rooms where someone tagged me. Ignore the rest of the group rooms.',
  github: 'Focus on PRs waiting for my review, failed workflows on my repositories and review or reply requests. Ignore the rest.',
  web: "Look for recent news on the topics of my work and interests. Flag only what changes something for me: a real development, a deadline, an opportunity. Ignore the rest.",
  _: 'Focus on what needs my attention or a decision today. Ignore noise.',
}
export const focusDefault = (app: string, lang: string): string => {
  const d = lang.toLowerCase().startsWith('it') ? IT : EN
  return d[app] ?? d._
}
