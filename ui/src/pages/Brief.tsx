import { useAppApi, useChatLauncher, useNotify } from '@kirocrew/app-sdk'
import { useEffect, useRef, useState } from 'react'
import { BellRing, Check, Info, MessageCircle, Sunrise, ThumbsDown, ThumbsUp } from 'lucide-react'
import { ALL, APPS, heroImageFor, spaceColor, spacesOf, useConfig, useFilter, useLang, type Config, type Task } from '../shared'

// Uovo: il pulsante "Ci penso io" è un uovo di Alba (stessa famiglia della gallina e dei promemoria)
const EGG = 'M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z'

const srcOf = (k?: string) => APPS.find((a) => a.key === (k ?? '').toLowerCase())
const HOME: Record<string, string> = {
  gmail: 'https://mail.google.com/mail/',
  calendar: 'https://calendar.google.com/calendar/',
  drive: 'https://drive.google.com/drive/',
  slack: 'https://app.slack.com/client',
  discord: 'https://discord.com/app',
  linkedin: 'https://www.linkedin.com/messaging/',
  notion: 'https://www.notion.so/',
  linear: 'https://linear.app/',
  trello: 'https://trello.com/',
  github: 'https://github.com/notifications',
}
const GOOGLE = new Set(['gmail', 'calendar', 'drive'])
// Solo link http(s): l'indirizzo arriva dai dati letti, quindi non si fida di altri schemi.
const safeUrl = (u?: string) => (u && /^https?:\/\/[^\s]+$/i.test(u) ? u : undefined)
const hrefFor = (key: string, url?: string, account?: string) => {
  const direct = safeUrl(url)
  if (direct) {
    // link Gmail nella forma /mail/u/<email>/: si riscrive con authuser, che Google gestisce meglio con più account
    const m = /^https:\/\/mail\.google\.com\/mail\/u\/([^/]+)\/(#.*)?$/.exec(direct)
    if (m && /@|%40/.test(m[1]!)) return `https://mail.google.com/mail/?authuser=${m[1]!.includes('%40') ? m[1] : encodeURIComponent(m[1]!)}${m[2] ?? ''}`
    return direct
  }
  const home = HOME[key]
  if (!home) return undefined
  return GOOGLE.has(key) && account && /^[^@\s]+@[^@\s]+$/.test(account) ? `${home}?authuser=${encodeURIComponent(account)}` : home
}
function Src({ k, url, account }: { k?: string; url?: string; account?: string }) {
  const { t } = useLang()
  const a = srcOf(k)
  if (!a) return null
  const { Icon, color, name, key } = a
  const href = hrefFor(key, url, account)
  const label = t.openIn(name)
  if (!href) return <span className="src" title={name} style={{ color }}><Icon size={17} /></span>
  return (
    <a className="src" href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label} style={{ color }}>
      <Icon size={17} />
    </a>
  )
}
function Tags({ cfg, space, account }: { cfg: Config; space?: string; account?: string }) {
  if (!space && !account) return null
  return (
    <div className="tagrow">
      {space ? (
        <span className="itag">
          <i style={{ background: spaceColor(cfg, space) }} />
          {space}
        </span>
      ) : null}
      {account ? <span className="itag acc">{account}</span> : null}
    </div>
  )
}

const DAY = 86400000
const ymd = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const ageOf = (t: Task, today: string) => Math.max(0, Math.round((Date.parse(today) - Date.parse(t.firstSeen)) / DAY))
const LATE_DAYS = 3
const PARK_DAYS = 7
const KEEP_DAYS = 30


export default function Oggi() {
  const { cfg, saveBrief, loaded } = useConfig()
  const api = useAppApi() as any
  // Decisioni dell'utente: file dedicato scritto solo dal backend (nessuna gara con l'agente che riscrive config.json)
  const [decided, setDecided] = useState<Record<string, Partial<Task>>>({})
  useEffect(() => {
    let on = true
    const load = async () => { try { const r = await api.get('/apps/alba/api/task-state'); if (on && r && typeof r === 'object') setDecided(r) } catch { /* backend non pronto */ } }
    load()
    const id = setInterval(load, 15000)
    return () => { on = false; clearInterval(id) }
  }, [])
  const notify = useNotify()
  // i voti sulle novità (+1 più così, -1 meno così): il brief successivo li legge per scegliere meglio
  const [votes, setVotes] = useState<Record<string, number>>({})
  useEffect(() => { api.get('/apps/alba/api/feedback').then((r: any) => setVotes(Object.fromEntries(((r?.votes ?? []) as any[]).map((v) => [v.key, v.vote])))).catch(() => {}) }, [])
  const { t } = useLang()
  const { openChat } = useChatLauncher() as any
  const brief = cfg.brief
  const [stored] = useFilter()
  const spaces = spacesOf(cfg)
  const filter = stored === ALL || spaces.includes(stored) ? stored : ALL
  const show = (i: { space?: string }) => filter === ALL || i.space === filter

  const today = ymd()
  // Fonte unica dei task: cfg.tasks. Se manca (vecchi riepiloghi) si usano i todos del brief, tutti aperti oggi.
  const baseTasks: Task[] = cfg.tasks ?? (brief?.todos ?? []).map((x, i) => ({ id: 'legacy-' + i, title: x.title, body: x.body, source: x.source, space: x.space, account: x.account, firstSeen: today, status: x.done ? ('done' as const) : ('open' as const), doneAt: x.done ? today : undefined, doneBy: 'user' as const }))
  const tasks: Task[] = baseTasks.map((x) => (decided[x.id] ? { ...x, status: decided[x.id].status as Task['status'], doneAt: decided[x.id].doneAt, doneBy: 'user' as const } : x))
  const inFilter = (x: Task) => show(x)
  const open = tasks.filter((x) => x.status === 'open' && inFilter(x))
  const active = open.filter((x) => ageOf(x, today) < PARK_DAYS).sort((a, b) => ageOf(b, today) - ageOf(a, today))
  const parked = open.filter((x) => ageOf(x, today) >= PARK_DAYS)
  const doneToday = tasks.filter((x) => x.status === 'done' && x.doneAt === today && inFilter(x))
  const archive = tasks.filter((x) => x.status !== 'open' && x.doneAt !== today && inFilter(x) && (Date.parse(today) - Date.parse(x.doneAt ?? today)) / DAY <= KEEP_DAYS)
  const updates = (brief?.updates ?? []).filter(show)

  const setTask = (x: Task, patch: Partial<Task>) => {
    const next = { ...x, ...patch }
    setDecided((d) => { const n = { ...d }; if (next.status === 'open') delete n[x.id]; else n[x.id] = { status: next.status, doneAt: next.doneAt }; return n })
    api.post('/apps/alba/api/task-state', { id: x.id, title: x.title, source: x.source, account: x.account, url: x.url, status: next.status, doneAt: next.doneAt }).catch(() => notify(t.saveFail))
  }
  const complete = (x: Task) => setTask(x, { status: 'done', doneAt: today, doneBy: 'user' })
  const dismissTask = (x: Task) => setTask(x, { status: 'dismissed', doneAt: today, doneBy: 'user' })
  const reopen = (x: Task) => setTask(x, { status: 'open', doneAt: undefined, doneBy: undefined })

  // Chat dedicata su una voce: parte una conversazione nuova con il contesto già scritto.
  const chatAbout = (title: string, body?: string, source?: string, account?: string) => {
    const msg = [title, body, source ? `(${[source, account].filter(Boolean).join(' · ')})` : ''].filter(Boolean).join('\n')
    try { openChat({ agent: 'alba-bot', message: msg, autoSend: false }) } catch { notify(t.chatFail) }
  }
  // Il lavoro proposto è completato (lo segna l'agente nel brief o l'utente con la spunta): l'uovo si schiude e resta il pulcino
  const pushId = 'push:' + (brief?.generatedAt ?? '')
  const pushDone = !!brief?.push && (decided[pushId] ? decided[pushId].status === 'done' : !!brief.push.done)
  const setPushDone = (v: boolean) => {
    const status = v ? 'done' : 'dismissed'
    setDecided((d) => ({ ...d, [pushId]: { status: status as Task['status'], doneAt: today } }))
    api.post('/apps/alba/api/task-state', { id: pushId, title: brief?.push?.title ?? '', source: 'alba', status, doneAt: today }).catch(() => notify(t.saveFail))
  }
  const letsDo = () => {
    const prompt = brief?.push?.prompt || brief?.push?.title || ''
    try {
      openChat({ agent: 'alba-bot', message: prompt, autoSend: false })
    } catch {
      notify(t.chatFail)
    }
  }
  // Le righe "non letto" sono un dettaglio tecnico: dietro un popover, non in bella vista accanto al titolo
  const [unreadOpen, setUnreadOpen] = useState(false)
  const unreadRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!unreadOpen) return
    const off = (e: MouseEvent) => { if (unreadRef.current && !unreadRef.current.contains(e.target as Node)) setUnreadOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [unreadOpen])

  if (!brief) {
    return (
      <div className="card blank">
        <Sunrise size={34} />
        <h1 style={{ marginTop: 12 }}>{loaded ? t.emptyTitle('') : t.loading}</h1>
        <p className="sub">{t.emptyBody}</p>
      </div>
    )
  }

  return (
    <>
      <div className="paper serif">
        <div className="stage">
          <div className="vside vleft">{brief.dateLabel}</div>
          <div className="vside vright">{(() => {
            // solo l'ora, con AM o PM: "15:30" diventa "3:30 PM"
            const m = /^(\d{1,2})[:.](\d{2})$/.exec(String(brief.timeLabel ?? '').trim())
            if (!m) return brief.timeLabel
            const h = Number(m[1])
            return `${h % 12 || 12}:${m[2]} ${h < 12 ? 'AM' : 'PM'}`
          })()}</div>
          {brief.unread?.length ? (
            <div className="unreadwrap" ref={unreadRef}>
              <button type="button" className="ib unreadbtn" title={t.unread} aria-label={t.unread} onClick={() => setUnreadOpen((v) => !v)}><Info size={15} /></button>
              {unreadOpen ? (
                <div className="unreadpop">
                  <b>{t.unread}</b>
                  <ul>{brief.unread.map((u, n) => <li key={n}>{u}</li>)}</ul>
                </div>
              ) : null}
            </div>
          ) : null}
          {(() => {
            const art = heroImageFor(brief.generatedAt)
            return (
              <div className="hero" style={{ backgroundImage: `radial-gradient(ellipse 60% 70% at 50% 50%,rgba(8,8,10,.46),rgba(8,8,10,.16) 70%,rgba(8,8,10,.06)),url("${art.url}")` }}>
                <div className="ttl">
                  <i>{t.heroPre}</i>
                  <b>{brief.weekday ?? ''}</b>
                </div>
              </div>
            )
          })()}
        </div>
        <div className="cap">
          <span className="who">{brief.caption ?? 'Alba'}</span>
          {(() => { const art = heroImageFor(brief.generatedAt); return <span className="art">{art.title}, {art.artist}, {art.year}</span> })()}
        </div>

        {brief.headline ? <p className="lead">{brief.headline}</p> : null}

        {brief.push?.title ? (
          <div className="sect push fullrow" style={{ '--i': 0 } as any}>
            <div className="sec">
              <h2>{t.secPush}</h2>
              <div className="golink">
                <button className={'go' + (pushDone ? ' hatched' : '')} onClick={letsDo} aria-label={t.chatAbout}>
                  {pushDone ? (
                    <svg className="burst hatchsvg" viewBox="0 0 100 100" aria-hidden="true">
                      <defs>
                        <clipPath id="albaBelow"><path d="M0 100V56L10 54L20 64L30 52L40 64L50 53L60 64L70 52L80 64L90 54L100 56V100Z" /></clipPath>
                        <clipPath id="albaAbove"><path d="M0 0H100V56L90 54L80 64L70 52L60 64L50 53L40 64L30 52L20 64L10 54L0 56Z" /></clipPath>
                        <clipPath id="albaEgg"><path d="M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z" /></clipPath>
                        <linearGradient id="albaCb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF08A" /><stop offset="1" stopColor="#FBC93A" /></linearGradient>
                      </defs>
                      <ellipse cx="50" cy="95" rx="30" ry="3" fill="#000" opacity=".25" />
                      <g className="hs-chick">
                        <ellipse cx="50" cy="62" rx="18" ry="22" fill="url(#albaCb)" />
                        <ellipse cx="50" cy="66" rx="10" ry="14" fill="#FFF7B8" opacity=".85" />
                        <ellipse cx="33" cy="60" rx="5" ry="9" transform="rotate(14 33 60)" fill="#F7BD28" stroke="#E5A512" strokeWidth=".8" />
                        <ellipse cx="67" cy="60" rx="5" ry="9" transform="rotate(-14 67 60)" fill="#F7BD28" stroke="#E5A512" strokeWidth=".8" />
                        <circle cx="50" cy="38" r="15" fill="url(#albaCb)" />
                        <path d="M45 24 Q44 16 48.5 19 Q50 12 53 19 Q57.5 16 56 24" fill="#FBC93A" stroke="#E5A512" strokeWidth=".8" strokeLinejoin="round" />
                        <ellipse cx="43.5" cy="37" rx="2.2" ry="2.8" fill="#2B1405" /><ellipse cx="56.5" cy="37" rx="2.2" ry="2.8" fill="#2B1405" />
                        <circle cx="44.2" cy="35.9" r=".85" fill="#fff" /><circle cx="57.2" cy="35.9" r=".85" fill="#fff" />
                        <circle cx="38.5" cy="42.5" r="2.6" fill="#FB7185" opacity=".4" /><circle cx="61.5" cy="42.5" r="2.6" fill="#FB7185" opacity=".4" />
                        <path d="M46.5 41 Q50 39.4 53.5 41 Q50 47.5 46.5 41 Z" fill="#F59E0B" /><path d="M47.6 42 Q50 41.3 52.4 42" stroke="#B9650A" strokeWidth=".6" fill="none" strokeLinecap="round" />
                      </g>
                      <g clipPath="url(#albaBelow)"><path className="eggp" d="M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z" /><path className="shine" d="M24 70c1 8 5 14 11 18" opacity=".6" /></g>
                      <g clipPath="url(#albaEgg)"><path d="M10 54L20 64L30 52L40 64L50 53L60 64L70 52L80 64L90 54" fill="none" stroke="#F0B987" strokeWidth="1.3" strokeLinejoin="round" /></g>
                      <g className="hs-cap">
                        <g clipPath="url(#albaAbove)"><path className="eggp" d="M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z" /><path className="shine" d="M30 46c3-14 10-25 19-31" /></g>
                        <g clipPath="url(#albaEgg)"><path d="M10 54L20 64L30 52L40 64L50 53L60 64L70 52L80 64L90 54" fill="none" stroke="#F0B987" strokeWidth="1.3" strokeLinejoin="round" /></g>
                      </g>
                    </svg>
                  ) : null}
                  {pushDone ? null : <svg className="burst" viewBox="0 0 100 100" aria-hidden="true"><path className="eggp" d={EGG} /><path className="shine" d="M30 46c3-14 10-25 19-31" /></svg>}
                  {/* le due scritte occupano lo stesso posto: il bottone non cambia misura quando l'uovo si schiude */}
                  <span className="golbl"><i className={pushDone ? 'off' : ''}>{t.goLines.join(' ')}</i><i className={pushDone ? '' : 'off'}>{t.goDone}</i></span>
                </button>
                <button className="gocheck" title={pushDone ? t.reopen : t.done} aria-label={pushDone ? t.reopen : t.done} onClick={() => setPushDone(!pushDone)}><Check size={13} /></button>
                <div className="gocard" aria-hidden="true">
                  <b><MessageCircle size={15} /> {t.chatAbout}</b>
                  <i>“{brief.push.prompt || brief.push.title}”</i>
                </div>
              </div>
            </div>
            <div className="pushbody">
              <h3>{brief.push.title}</h3>
              {brief.push.body ? <p>{brief.push.body}</p> : null}
            </div>
          </div>
        ) : null}

        <div className="cols swap" key={filter}>
        <div>
        {brief.reminders?.length ? (
          <div className="sect remind" style={{ '--i': 0 } as any}>
            <div className="sec"><h2>{t.remTitle}</h2></div>
            {brief.reminders.map((r, n) => (
              <div className="ritem" key={n}>
                <BellRing size={17} />
                <div>{r.text}{r.since ? <small>{t.remSince(r.since)}</small> : null}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="sect">
          <div className="sec"><h2>{t.secTodos}</h2></div>
          {active.length + doneToday.length === 0 ? <p style={{ color: 'var(--muted)' }}>{t.noTasks}</p> : null}
          {[...active, ...doneToday].map((x, n) => {
            const age = ageOf(x, today)
            const done = x.status === 'done'
            return (
              <div key={x.id} className={'todo' + (done ? ' done' : '')} style={{ '--i': n } as any}>
                <button className={'circle' + (done ? ' on' : '')} onClick={() => (done ? reopen(x) : complete(x))} aria-label={t.done}>
                  {done ? <Check size={14} /> : null}
                </button>
                <div>
                  <h3>
                    {x.title}{x.tag ? <em className={x.hot ? 'hot' : ''}>{x.tag}</em> : null}<Src k={x.source} url={x.url} account={x.account} /><button className="itemchat" title={t.chatAbout} aria-label={t.chatAbout} onClick={() => chatAbout(x.title, x.body, x.source, x.account)}><MessageCircle size={15} /></button>
                    {!done && age >= 1 ? <span className={'age' + (age >= LATE_DAYS ? ' late' : '')}>{age >= LATE_DAYS ? t.late + ' · ' : ''}{t.ageDays(age)}</span> : null}
                    {done && x.doneBy === 'source' ? <span className="age">{t.viaSource}</span> : null}
                  </h3>
                  {x.body ? <p>{x.body}</p> : null}
                  <Tags cfg={cfg} space={x.space} account={x.account} />
                  {!done ? <div className="rowbtns"><button className="lnk" onClick={() => dismissTask(x)}>{t.dismiss}</button></div> : null}
                </div>
              </div>
            )
          })}
          {parked.length ? (
            <details className="fold" open>
              <summary>{t.parked} ({parked.length})</summary>
              {parked.map((x) => (
                <div key={x.id} className="todo parked">
                  <button className="circle" onClick={() => complete(x)} aria-label={t.done} />
                  <div>
                    <h3>{x.title}{x.tag ? <em className={x.hot ? 'hot' : ''}>{x.tag}</em> : null}<Src k={x.source} url={x.url} account={x.account} /><button className="itemchat" title={t.chatAbout} aria-label={t.chatAbout} onClick={() => chatAbout(x.title, x.body, x.source, x.account)}><MessageCircle size={15} /></button><span className="age">{t.ageDays(ageOf(x, today))}</span></h3>
                    {x.body ? <p>{x.body}</p> : null}
                    <Tags cfg={cfg} space={x.space} account={x.account} />
                    <div className="rowbtns"><button className="lnk" onClick={() => dismissTask(x)}>{t.dismiss}</button></div>
                  </div>
                </div>
              ))}
            </details>
          ) : null}
          {archive.length ? (
            <details className="fold">
              <summary>{t.completed(archive.length)}</summary>
              {archive.map((x) => (
                <div key={x.id} className="todo done">
                  <button className="circle on" onClick={() => reopen(x)} aria-label={t.reopen}><Check size={14} /></button>
                  <div>
                    <h3>{x.title}{x.tag ? <em className={x.hot ? 'hot' : ''}>{x.tag}</em> : null}<Src k={x.source} url={x.url} account={x.account} />{x.doneBy === 'source' ? <span className="age">{t.viaSource}</span> : null}</h3>
                    <Tags cfg={cfg} space={x.space} account={x.account} />
                  </div>
                </div>
              ))}
            </details>
          ) : null}
        </div>
        </div>
        <div>
        {updates.length ? (
          <div className="sect">
            <div className="sec"><h2>{t.secUpdates}</h2></div>
            {updates.map((u, i) => (
              <div key={i} className="upd" style={{ '--i': i } as any}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{u.title}{u.tag ? <em className={u.hot ? 'hot' : ''}>{u.tag}</em> : null}<button className="itemchat" title={t.chatAbout} aria-label={t.chatAbout} onClick={() => chatAbout(u.title, u.body, u.source, u.account)}><MessageCircle size={15} /></button></h3>
                  {u.body ? <p>{u.body}<Src k={u.source} url={u.url} account={u.account} /></p> : null}
                  {(() => {
                    const key = `${brief.generatedAt}|${u.title}`
                    const cur = votes[key] ?? 0
                    const cast = (v: number) => {
                      const next = cur === v ? 0 : v
                      setVotes((m) => ({ ...m, [key]: next }))
                      api.post('/apps/alba/api/feedback', { key, vote: next, title: u.title, tag: u.tag, source: u.source, space: u.space }).catch(() => notify(t.saveFail))
                    }
                    return (
                      <div className="updfoot">
                        <Tags cfg={cfg} space={u.space} account={u.account} />
                        <span className={'votes' + (cur ? ' set' : '')}>
                          <button className={'vote' + (cur === 1 ? ' on' : '')} title={t.voteUp} aria-label={t.voteUp} aria-pressed={cur === 1} onClick={() => cast(1)}><ThumbsUp size={14} /></button>
                          <button className={'vote down' + (cur === -1 ? ' on' : '')} title={t.voteDown} aria-label={t.voteDown} aria-pressed={cur === -1} onClick={() => cast(-1)}><ThumbsDown size={14} /></button>
                        </span>
                      </div>
                    )
                  })()}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        </div>
        </div>
      </div>
    </>
  )
}
