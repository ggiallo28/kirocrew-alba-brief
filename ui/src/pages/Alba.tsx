import { Pencil, Plus, Sunrise } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAppApi } from '@kirocrew/app-sdk'
import { ALL, luIcon, ALL_ICON, APPS, Shell, countAccounts, spaceColor, spaceIcon, spacesOf, useConfig, useFilter, useLang, useLangSync, bannerFor } from '../shared'
declare const __ALBA_VERSION__: string
import Brief from './Brief'
import Connessioni from './Connessioni'
import Mascot from './Mascot'

const RUN = { since: 0, gen: '' }
const RUN_MAX = 8 * 60 * 1000
function clearRun() { RUN.since = 0; try { localStorage.removeItem('alba.run') } catch {} }
function runActive(): boolean {
  if (!RUN.since) {
    try { const o = JSON.parse(localStorage.getItem('alba.run') || 'null'); if (o?.since) { RUN.since = o.since; RUN.gen = o.gen || '' } } catch {}
  }
  if (RUN.since && Date.now() - RUN.since < RUN_MAX) return true
  RUN.since = 0
  return false
}

export default function Alba() {
  const { t, lang } = useLang()
  useLangSync()
  const { cfg, save } = useConfig()
  const [tab, setTab] = useState<string>(() => {
    try { return localStorage.getItem('alba.tab') ?? 'oggi' } catch { return 'oggi' }
  })
  const [stored, setFilter] = useFilter()
  const [dockHover, setDockHover] = useState(false)
  const [adding, setAdding] = useState(false)
  const api = useAppApi() as any
  // Lo stato "in corso" vive fuori dal componente: cambiando scheda la pagina si rimonta e uno stato locale si perderebbe.
  const [running, setRunningS] = useState<boolean>(() => runActive())
  const [runErr, setRunErr] = useState('')
  const [schedOpen, setSchedOpen] = useState(false)
  const sched = cfg.schedule ?? { time: '08:00', days: [1, 2, 3, 4, 5] }
  const dayName = (d: number) => { try { return new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2024, 0, d)) } catch { return String(d) } }
  const isWeek = sched.days.join() === '1,2,3,4,5'
  const schedLabel = isWeek ? t.bannerDays : sched.days.length === 7 ? '7/7' : sched.days.map(dayName).join(' ')
  const setSched = (n: { time: string; days: number[] }) => save({ ...cfg, schedule: { time: n.time, days: [...n.days].sort((a, b) => a - b) } })
  const popRef = useRef<HTMLDivElement>(null)
  const schedBtnRef = useRef<HTMLButtonElement>(null)
  const [popLeft, setPopLeft] = useState(0)
  const openSched = () => {
    const b = schedBtnRef.current, bar = b?.closest('.topbar') as HTMLElement | null
    if (b && bar) {
      const r = b.getBoundingClientRect(), w = bar.getBoundingClientRect()
      setPopLeft(Math.min(Math.max(r.left + r.width / 2 - w.left, 161), Math.max(w.width - 161, 161)))
    }
    setSchedOpen((v) => !v)
  }
  useEffect(() => {
    if (!schedOpen) return
    const off = (e: MouseEvent) => { const el = e.target as HTMLElement; if (popRef.current && !popRef.current.contains(el) && !el.closest?.('.st.sched')) setSchedOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [schedOpen])
  const setRunning = (v: boolean) => { if (!v) RUN.since = 0; setRunningS(v) }
  const runBrief = async () => {
    RUN.gen = cfg.brief?.generatedAt ?? ''
    RUN.since = Date.now()
    try { localStorage.setItem('alba.run', JSON.stringify(RUN)) } catch {}
    setRunning(true)
    setRunErr('')
    try {
      const r = await api.post('/apps/alba/api/run-brief', {})
      if (r && r.ok === false) throw new Error(String(r.error || 'error'))
    } catch (e: any) { clearRun(); setRunning(false); setRunErr(String(e?.message || e).slice(0, 160)); return }
  }
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => { if (!runActive()) setRunningS(false) }, 5000)
    return () => clearInterval(id)
  }, [running])
  // Lo stato vero viene dal job: vale anche per il cron delle 8:00 e per "Run now" dalla palette.
  useEffect(() => {
    let alive = true
    const poll = async () => {
      try {
        const r = await api.get('/apps/alba/api/run-status')
        if (!alive || !r || !r.known) return
        if (r.running) { if (!RUN.since) { RUN.since = Date.now(); RUN.gen = cfg.brief?.generatedAt ?? '' } setRunningS(true) }
        else if (RUN.since && Date.now() - RUN.since > 20000) { clearRun(); setRunningS(false) }
      } catch {}
    }
    poll()
    const id = setInterval(poll, 4000)
    return () => { alive = false; clearInterval(id) }
  }, [])
  useEffect(() => { if (running && (cfg.brief?.generatedAt ?? '') !== RUN.gen) { clearRun(); setRunningS(false) } }, [cfg.brief?.generatedAt, running])
  const [newName, setNewName] = useState('')
  const dockRef = useRef<HTMLDivElement>(null)
  // Riordino per trascinamento (solo nella pagina Fonti). Le posizioni si misurano una volta
  // all'inizio del gesto, così i tasti non oscillano mentre si muovono.
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const dragRef = useRef<{ sp: string; from: number; startX: number; step: number; n: number; started: boolean; target: number } | null>(null)
  const suppressClick = useRef(false)
  const [drag, setDrag] = useState<{ sp: string; from: number; dx: number; target: number; step: number } | null>(null)
  const footRef = useRef<HTMLDivElement>(null)
  // La scritta si dissolve solo se, in una finestra stretta, finirebbe sotto il nome del bottone.
  const onDockEnter = () => {
    const text = footRef.current?.firstElementChild as HTMLElement | null
    const dock = dockRef.current
    if (!text || !dock) return
    setDockHover(text.getBoundingClientRect().left < dock.getBoundingClientRect().right + 16)
  }
  const spaces = spacesOf(cfg)
  const edit = tab === 'connessioni'
  const used = APPS.filter((a) => (cfg.accounts[a.key] ?? []).length).length
  // in modifica non esiste la pagina "Tutti": si lavora sempre su un profilo
  const filter = edit && spaces.length && !spaces.includes(stored) ? spaces[0] : stored === ALL || spaces.includes(stored) ? stored : ALL
  // entrando in modifica il profilo mostrato diventa quello scelto davvero, così lo si ritrova tornando al brief
  useEffect(() => { if (edit && spaces.length && !spaces.includes(stored)) setFilter(spaces[0]) }, [edit, spaces.join('|'), stored])
  const sources = (cfg.brief?.sources ?? []).map((k) => APPS.find((a) => a.key === k.toLowerCase())).filter(Boolean) as (typeof APPS)[number][]
  const color = (sp: string) => (sp === ALL ? '#64748B' : spaceColor(cfg, sp))
  // Tasti numerici: 0 = Tutti, 1…9 = i profili nell'ordine della barra.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && (/INPUT|SELECT|TEXTAREA/.test(el.tagName) || el.isContentEditable)) return
      if (!/^[0-9]$/.test(e.key)) return
      const n = Number(e.key)
      if (n === 0) setFilter(ALL)
      else if (spaces[n - 1]) setFilter(spaces[n - 1]!)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [spaces.join('|')])

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, sp: string) => {
    if (!edit || e.button !== 0) return
    const from = spaces.indexOf(sp)
    const lefts = spaces.map((x) => btnRefs.current[x]?.getBoundingClientRect().left ?? 0)
    const step = lefts.length > 1 ? Math.abs(lefts[1]! - lefts[0]!) : 42
    dragRef.current = { sp, from, startX: e.clientX, step, n: spaces.length, started: false, target: from }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.startX
    if (!d.started) {
      if (Math.abs(dx) < 5) return
      d.started = true
    }
    d.target = Math.max(0, Math.min(d.n - 1, d.from + Math.round(dx / d.step)))
    setDrag({ sp: d.sp, from: d.from, dx, target: d.target, step: d.step })
  }
  const onPointerUp = () => {
    const d = dragRef.current
    dragRef.current = null
    setDrag(null)
    if (!d || !d.started) return
    suppressClick.current = true
    setTimeout(() => { suppressClick.current = false }, 0)
    if (d.target === d.from) return
    const next = spaces.slice()
    next.splice(d.from, 1)
    next.splice(d.target, 0, d.sp)
    const ordered = next.filter((x) => cfg.spaces.includes(x))
    save({ ...cfg, spaces: [...ordered, ...cfg.spaces.filter((x) => !ordered.includes(x))] })
  }
  useEffect(() => {
    if (!drag) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { dragRef.current = null; setDrag(null) } }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [!!drag])
  // Spostamento visivo: il tasto afferrato segue il mouse, gli altri si fanno da parte di un passo.
  const slotStyle = (i: number): React.CSSProperties => {
    if (!drag) return {}
    if (i === drag.from) return { transform: `translateX(${drag.dx}px) scale(1.1)`, transition: 'none', zIndex: 5, boxShadow: '0 10px 24px rgba(0,0,0,.45)', cursor: 'grabbing' }
    const shift = drag.from < i && i <= drag.target ? -drag.step : drag.target <= i && i < drag.from ? drag.step : 0
    return { transform: `translateX(${shift}px)`, transition: 'transform .18s cubic-bezier(.2,.8,.2,1)' }
  }

  const addProfile = () => {
    const name = newName.trim()
    if (!name || cfg.spaces.includes(name)) return
    save({ ...cfg, spaces: [...cfg.spaces, name] })
    setFilter(name)
    setNewName('')
    setAdding(false)
  }
  // il campo si chiude uscendo dalla modalità matita, cliccando fuori o con Esc
  useEffect(() => { if (!edit) setAdding(false) }, [edit])
  useEffect(() => {
    if (!adding) return
    const out = (e: MouseEvent) => { if (dockRef.current && !dockRef.current.contains(e.target as Node)) setAdding(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setAdding(false) }
    document.addEventListener('mousedown', out)
    window.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', out); window.removeEventListener('keydown', esc) }
  }, [adding])

  // finestrella con l'anteprima del brief appena generato (quando il cron finisce e la pagina è aperta)
  const [toast, setToast] = useState<string | null>(null)
  const gen = cfg.brief?.generatedAt
  useEffect(() => {
    if (!gen || String(cfg.brief?.caption ?? '').toUpperCase().startsWith('ESEMPIO')) return
    let seen = ''
    try { seen = localStorage.getItem('alba.seenBrief') ?? '' } catch { /* ignora */ }
    if (seen === gen) return
    try { localStorage.setItem('alba.seenBrief', gen) } catch { /* ignora */ }
    // solo se è davvero appena arrivato: aprendo la pagina più tardi non si ripropone un brief vecchio.
    // L'avviso vero è la scheda di sistema, in basso a sinistra sopra ogni app: questa finestrella la sostituisce solo se quella è spenta.
    if (seen && (cfg as any).notifyOs === false && Date.now() - Date.parse(gen) < 6 * 3600000) setToast(gen)
  }, [gen])
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 40000)
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setToast(null) }
    window.addEventListener('keydown', esc)
    return () => { clearTimeout(id); window.removeEventListener('keydown', esc) }
  }, [toast])

  const go = (k: string) => {
    if (k === 'oggi' && tab === 'connessioni') setFilter(ALL) // dalla modifica al brief si riparte da "Tutti"
    setTab(k)
    try { localStorage.setItem('alba.tab', k) } catch {}
  }

  return (
    <Shell
      overlay={
      <>
      {toast && cfg.brief ? (
        <aside className="briefpop" role="status" aria-live="polite" key={toast}>
          <div className="bp-head"><Sunrise size={15} /><b>{t.toastTitle}</b><span>{[cfg.brief.weekday, cfg.brief.dateLabel].filter(Boolean).join(' · ')}</span>
            <button className="bp-x" aria-label={t.toastClose} title={t.toastClose} onClick={() => setToast(null)}>×</button></div>
          {cfg.brief.headline ? <p className="bp-title">{cfg.brief.headline}</p> : null}
          <div className="bp-chips">
            {(cfg.brief.updates?.length ?? 0) > 0 ? <span><b>{cfg.brief.updates!.length}</b> {t.toastUpdates}</span> : null}
            {(cfg.tasks ?? []).filter((x) => x.status === 'open').length > 0 ? <span><b>{(cfg.tasks ?? []).filter((x) => x.status === 'open').length}</b> {t.toastTodo}</span> : null}
            {(cfg.brief.reminders?.length ?? 0) > 0 ? <span><b>{cfg.brief.reminders!.length}</b> {t.toastReminders}</span> : null}
          </div>
          <ul className="bp-list">
            {(cfg.brief.updates ?? []).slice(0, 3).map((u, i) => {
              const a = APPS.find((x) => x.key === u.source)
              const Ic = a?.Icon
              return (
                <li key={i}>
                  <i style={{ color: a?.color, background: a ? a.color + '22' : undefined }}>{Ic ? <Ic size={14} /> : null}</i>
                  <span>{u.title}{u.space ? <em><s style={{ background: spaceColor(cfg, u.space) }} />{u.space}</em> : null}</span>
                </li>
              )
            })}
          </ul>
          {(cfg.brief.updates?.length ?? 0) > 3 ? <div className="bp-more">+{(cfg.brief.updates?.length ?? 0) - 3} {t.toastMore}</div> : null}
          <div className="bp-actions"><button className="ghost" onClick={() => setToast(null)}>{t.toastLater}</button><button className="talk" onClick={() => { go('oggi'); setToast(null) }}>{t.toastOpen}</button></div>
          <div className="bp-bar"><i /></div>
        </aside>
      ) : null}
      <Mascot roam={tab === 'connessioni'} gutter={tab === 'oggi'} />
      <div className={'dock' + (edit ? ' edit' : '') + (drag ? ' dragging-any' : '')} ref={dockRef} onMouseEnter={onDockEnter} onMouseMove={onDockEnter} onMouseLeave={() => setDockHover(false)}>
        {adding ? (
          <div className="dockpop">
            <input className="newspace" autoFocus value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addProfile()} placeholder={t.newSpace} />
            <button className="ib" title={t.add} onClick={addProfile}><Plus size={16} /></button>
          </div>
        ) : null}
        <button className={'ichip side' + (tab === 'oggi' ? ' on' : '')} style={tab === 'oggi' ? { background: 'var(--accent)' } : undefined} data-tip={t.today} aria-label={t.today} onClick={() => go('oggi')}>
          <Sunrise size={18} />
        </button>
        <span className="sep" />
        {!edit ? (
        <button data-all="1" className={'ichip' + (filter === ALL ? ' on' : '')} style={({ '--c': color(ALL), ...(filter === ALL ? { background: color(ALL) } : {}) }) as any} data-tip={t.all} aria-label={t.all} onClick={() => setFilter(ALL)}>
          <ALL_ICON size={18} />
        </button>
        ) : null}
        {spaces.map((sp, i) => {
          const Icon = spaceIcon(cfg, sp)
          return (
            <button
              key={sp}
              ref={(el) => { btnRefs.current[sp] = el }}
              className={'ichip' + (filter === sp ? ' on' : '')}
              style={({ '--c': color(sp), ...(filter === sp ? { background: color(sp) } : { color: color(sp) }), ...slotStyle(i) }) as any}
              data-tip={sp}
              aria-label={sp}
              onPointerDown={(e) => onPointerDown(e, sp)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClick={() => { if (!suppressClick.current) setFilter(sp) }}
            >
              <Icon size={18} />
            </button>
          )
        })}
        <div className="addslot" aria-hidden={!edit}>
          <button className={'ichip add' + (adding ? ' on' : '')} tabIndex={edit ? 0 : -1} data-tip={t.newSpace} aria-label={t.newSpace} onClick={() => setAdding((v) => !v)}>
            <Plus size={16} />
          </button>
        </div>
        <span className="sep" />
        <button className={'ichip side' + (tab === 'connessioni' ? ' on' : '')} style={tab === 'connessioni' ? { background: 'var(--accent)' } : undefined} data-tip={t.connections} aria-label={t.connections} onClick={() => go('connessioni')}>
          <Pencil size={16} />
        </button>
      </div>
      </>
      }
    >
      <div className="topbar">
        <div className="banner" style={{ ['--grad' as any]: bannerFor(cfg.brief?.generatedAt) }}>
          <div className="bt">
            <Sunrise size={20} />
            <b>Alba</b><small>v{__ALBA_VERSION__}</small>
            <span className="bs">{t.bannerSub}</span>
            <button className={'tabbtn refresh' + (running ? ' spin' : '')} disabled={running} onClick={runBrief}>{(() => { const R = luIcon('RefreshCw'); return R ? <R size={14} /> : null })()}{running ? t.regenOn : runErr ? t.regenErr : t.regen}</button>
            {runErr ? <span className="bs" style={{ color: '#f87171', fontSize: 11 }}>{runErr}</span> : null}
          </div>
          <div className="stats2">
            <button type="button" ref={schedBtnRef} className="st sched" title={t.schedTitle} onClick={openSched}><b>{sched.time}</b> {schedLabel}</button>
            <span className="st"><b>{countAccounts(cfg)}</b>{t.bannerAccounts}</span>
            <span className="st"><b>{used}/{APPS.length}</b>{t.bannerApps}</span>
            <span className="st"><b>{cfg.spaces.length}</b>{t.bannerSpaces}</span>
          </div>
        </div>
        {schedOpen ? (
          <div className="schedpop" ref={popRef} style={{ left: popLeft }}>
            <h4>{t.schedTitle}</h4>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>{t.schedTime}
              <select value={sched.time.slice(0, 2)} onChange={(e) => setSched({ ...sched, time: e.target.value + ':' + sched.time.slice(3, 5) })}>
                {Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0')).map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              :
              <select value={sched.time.slice(3, 5)} onChange={(e) => setSched({ ...sched, time: sched.time.slice(0, 2) + ':' + e.target.value })}>
                {Array.from({ length: 12 }, (_, m) => String(m * 5).padStart(2, '0')).concat(/^\d\d$/.test(sched.time.slice(3, 5)) && Number(sched.time.slice(3, 5)) % 5 ? [sched.time.slice(3, 5)] : []).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </label>
            <div className="days">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <button key={d} className={sched.days.includes(d) ? 'on' : ''} onClick={() => {
                  const has = sched.days.includes(d)
                  if (has && sched.days.length === 1) return
                  setSched({ ...sched, days: has ? sched.days.filter((x) => x !== d) : [...sched.days, d] })
                }}>{dayName(d)}</button>
              ))}
            </div>
            <p>{t.schedHint}</p>
          </div>
        ) : null}
      </div>

      <div className="swap page" key={tab}>
        <div className="pageswap" key={tab}>{tab === 'connessioni' ? <Connessioni /> : <Brief />}</div>
      </div>

      <div ref={footRef} className={'foot' + (dockHover ? ' hide' : '')}>
        {tab === 'oggi' && cfg.brief ? (
          <>
          <span>{t.footMade}</span>
          {sources.length === 0 ? <span className="s">{t.footApps}</span> : null}
          {sources.map(({ key, name, Icon, color: c }, i) => (
            <span key={key} className="s">
              <Icon size={14} style={{ color: c }} />{name}{i < sources.length - 1 ? ' ·' : ''}
            </span>
          ))}
          </>
        ) : null}
      </div>
    </Shell>
  )
}
