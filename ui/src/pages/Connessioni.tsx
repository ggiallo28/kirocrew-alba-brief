import { Check, Globe, RotateCcw, Pause, Pencil, Play, Plus, Plug, RefreshCw, Sunrise, Trash2, X } from 'lucide-react'
import { useAppApi, useChatLauncher } from '@kirocrew/app-sdk'
import { useEffect, useRef, useState } from 'react'
import { focusDefault } from '../focus'
import { APPS, EXTRA_ICONS, iconByKey, luIcon, ICONS, PALETTE, PickerIcon, spaceIcon, countAccounts, initials, spaceColor, useConfig, useFilter, useLang, isPage, type Account, type Method } from '../shared'

declare const __ALBA_VERSION__: string
const LINKABLE = ['youtrack', 'jira', 'confluence', 'gmail', 'calendar', 'drive', 'googlechat', 'slack', 'notion', 'linear', 'trello', 'github', 'outlook']
const SECRET: string[] = []
// Promemoria per l'agente (vale anche se la conversazione è iniziata con istruzioni vecchie)
const SIGNIN_HINT = ' (Sign-in: if the account is not signed in, call the browser op `ask` with args {kind:"credentials", reason:"…"} and NO targets so Crew shows its secure sign-in sheet; for codes use ask kind otp, for CAPTCHA human_check. Never tell the user to take over or to type in the live view, never ask for the password, and do not wait for them to say they are done. Browser parameters go inside `args`.)'
const uid = () => Math.random().toString(36).slice(2, 9)
const ALL = '*'

export default function Connessioni() {
  const { cfg, save, saveTasks, saveBrief, loaded } = useConfig()
  const { t, code, lang } = useLang()
  const api = useAppApi() as any
  const { openChat } = useChatLauncher() as any
  // collegamenti veri: il backend di Alba tiene le credenziali nel Portachiavi, qui non restano mai
  const [links, setLinks] = useState<Record<string, { app: string; url: string; lastSync?: string; count?: number; error?: string }>>({})
  const [store, setStore] = useState('')
  const [gClientBySpace, setGClientBySpace] = useState<Record<string, boolean>>({})
  const [secrets, setSecrets] = useState<Record<string, boolean>>({})
  const [secFor, setSecFor] = useState<Record<string, boolean>>({})
  const [setupUrl, setSetupUrl] = useState<string | null>(null)
  // the link to the setup page is only a fallback for a blocked pop-up: it goes away by itself
  useEffect(() => { if (!setupUrl) return; const id = setTimeout(() => setSetupUrl(null), 20000); return () => clearTimeout(id) }, [setupUrl])
  const [setupCopied, setSetupCopied] = useState(false)
  const [secVal, setSecVal] = useState<Record<string, string>>({})
  const [gForm, setGForm] = useState({ id: '', secret: '' })
  const [waiting, setWaiting] = useState<string | null>(null)
  const [linkFor, setLinkFor] = useState<string | null>(null)
  const [form, setForm] = useState({ url: '', token: '' })
  const [linkBusy, setLinkBusy] = useState(false)
  const [working, setWorking] = useState<Record<string, boolean>>({})
  // connessioni non usate in questo profilo: un quadratino con la sola icona in fondo all'elenco, finché non lo apri
  const [expandedEmpty, setExpandedEmpty] = useState<Record<string, boolean>>(() => { try { return JSON.parse(localStorage.getItem('alba.expandedEmpty') || '{}') } catch { return {} } })
  const expandEmpty = (k: string) => setExpandedEmpty((m) => { const n = { ...m, [k]: true }; try { localStorage.setItem('alba.expandedEmpty', JSON.stringify(n)) } catch { /* local storage non disponibile */ } return n })
  const collapseEmpty = (k: string) => setExpandedEmpty((m) => { const n = { ...m }; delete n[k]; try { localStorage.setItem('alba.expandedEmpty', JSON.stringify(n)) } catch { /* local storage non disponibile */ } return n })
  // mostra l'attività almeno un istante: una sincronizzazione veloce altrimenti non si vedrebbe
  const withWork = async (id: string, fn: () => Promise<unknown>) => {
    setWorking((m) => ({ ...m, [id]: true }))
    const t0 = Date.now()
    try { await fn() } finally {
      const wait = Math.max(0, 1000 - (Date.now() - t0))
      setTimeout(() => setWorking((m) => ({ ...m, [id]: false })), wait)
    }
  }
  const [linkErr, setLinkErr] = useState('')
  const loadLinks = async () => { try { const r = await api.get('/apps/alba/api/status'); if (r?.accounts) { setLinks(r.accounts); setStore(r.store ?? ''); setGClientBySpace(r.googleClientBySpace ?? {}); setSecrets(r.secrets ?? {}) } } catch { /* backend non ancora pronto */ } }
  useEffect(() => { void loadLinks(); const id = setInterval(() => void loadLinks(), 20000); return () => clearInterval(id) }, [])
  const callApi = async (path: string, body: any) => {
    try { return await api.post('/apps/alba/api/' + path, body) } catch (e: any) {
      const m = /"error"\s*:\s*"([^"]+)"/.exec(String(e?.message ?? e)); return { error: m ? m[1] : 'Errore' }
    }
  }
  const linkGo = async (acc: string, app: string) => {
    setLinkBusy(true); setLinkErr('')
    if (app === 'gmail') {
      const sp0 = cfg.accounts[app]?.find((x) => x.id === acc)?.space ?? ''
      if (!gClientBySpace[sp0]) {
        const g = await callApi('google-client', { accountId: acc, clientId: gForm.id, clientSecret: gForm.secret })
        setGForm({ id: gForm.id, secret: '' })
        if (!g?.ok) { setLinkBusy(false); setLinkErr(g?.error || 'Errore'); return }
        setGClientBySpace((m) => ({ ...m, [sp0]: true }))
      }
      const r = await callApi('connect', { app, accountId: acc })
      setLinkBusy(false)
      if (!r?.authUrl) { setLinkErr(r?.error || 'Errore'); return }
      window.open(r.authUrl, '_blank', 'noopener')
      setWaiting(acc)
      const t0 = Date.now()
      const id = setInterval(async () => {
        await loadLinks()
        if (Date.now() - t0 > 180000) { clearInterval(id); setWaiting(null) }
      }, 3000)
      return
    }
    const r = await callApi('connect', { app, accountId: acc, url: form.url, token: form.token })
    setForm({ url: form.url, token: '' })
    setLinkBusy(false)
    if (r?.ok) { setLinkFor(null); setForm({ url: '', token: '' }); void loadLinks() } else setLinkErr(r?.error || 'Errore')
  }
  // Pagina di configurazione di Alba (HTML/JS/CSS locale servito dal backend): un solo modo per tutti gli account.
  // Gmail, Calendar e YouTrack si completano nel browser di sempre (Google rifiuta quello interno); le app che si leggono
  // dalla pagina si aprono nel browser interno di Crew, dove resta la sessione.
  // Indirizzi di accesso delle app che si leggono dalla pagina: qui non c'è nulla da configurare, fa tutto Alba nel browser di Crew
  const WEB_LOGIN: Record<string, string> = { discord: 'https://discord.com/login', linkedin: 'https://www.linkedin.com/login', telegram: 'https://web.telegram.org/', teams: 'https://teams.microsoft.com/' }
  const openSetup = async (items: { key: string; name: string; a: Account }[]) => {
    // app con token o accesso (Google, Slack, YouTrack, Notion, Linear, Trello, GitHub, Outlook): pagina di configurazione nel browser di sempre
    const setup = items.filter((i) => LINKABLE.includes(i.key))
    const web = items.filter((i) => !LINKABLE.includes(i.key))
    if (setup.length) {
      const u = (await callApi('setup/start', { accountIds: setup.map((i) => i.a.id), lang: code }))?.url as string | undefined
      if (u) { setSetupUrl(u); setSetupCopied(false); try { window.open(u, '_blank', 'noopener') } catch { /* popup bloccato: resta il link qui sotto */ } }
    }
    // app lette dalla pagina: Alba apre l'accesso nel browser interno di Crew, senza pagina di configurazione
    if (web.length) {
      web.forEach((i) => { if (!isPage(i.a.method)) patch(i.key, i.a.id, { method: 'page' }) })
      const urls = [...new Set(web.map((i) => WEB_LOGIN[i.key]).filter(Boolean))]
      if (urls.length) window.dispatchEvent(new CustomEvent('alba:ask', { detail: { message: 'Open ' + (urls.length > 1 ? 'these addresses, one tab each,' : 'this address') + ' with the browser tool (op navigate, the url goes inside args) and stop there. Do not click, type or read anything: ' + urls.join(' ') } }))
    }
  }
  // richieste arrivate dalla pagina di configurazione: aprire l'accesso di un'app nel browser interno di Crew
  useEffect(() => {
    let on = true
    const id = setInterval(async () => {
      try {
        const r = await api.get('/apps/alba/api/open-requests')
        if (!on || !Array.isArray(r?.requests)) return
        for (const q of r.requests as { url: string }[]) {
          window.dispatchEvent(new CustomEvent('alba:ask', { detail: { message: 'Open this address with the browser tool (op navigate, the url goes inside args) and stop there. Do not click, type or read anything: ' + q.url } }))
        }
      } catch { /* backend non pronto */ }
    }, 3000)
    return () => { on = false; clearInterval(id) }
  }, [])
  const browserLogin = (key: string, name: string, a: Account) => {
    if (!isPage(a.method)) patch(key, a.id, { method: 'page' })
    const msg = t.bMsg.replace('{app}', name).replace('{acc}', a.label).replace('{sp}', a.space).replace('{key}', key + ':' + a.id)
    // la scheda di accesso sicura compare sulla scheda del browser dentro la chat completa di Crew, non nel fumetto
    try { openChat({ agent: 'alba-bot', message: msg + SIGNIN_HINT, autoSend: true }) } catch { window.dispatchEvent(new CustomEvent('alba:ask', { detail: { message: msg + SIGNIN_HINT } })) }
  }
  const secVerify = (acc: string, _app: string) => withWork(acc, async () => {
    setLinkBusy(true); setLinkErr('')
    const r = await callApi('secret-check', { accountId: acc })
    setLinkBusy(false)
    if (!r?.ok) setLinkErr(r?.error || 'Errore')
    await loadLinks()
  })
  const secSave = async (acc: string) => {
    setLinkBusy(true); setLinkErr('')
    const r = await callApi('secret-set', { accountId: acc, value: secVal[acc] ?? '' })
    setSecVal((m) => ({ ...m, [acc]: '' }))
    setLinkBusy(false)
    if (r?.ok) setSecFor((m) => ({ ...m, [acc]: false }))
    else setLinkErr(r?.error || 'Errore')
    void loadLinks()
  }
  // l'agente guida i passi nel fumetto di Alba; il valore non passa mai dalla chat
  const askGuide = (key: string, name: string, a: Account) => {
    const msg = t.secAskMsg.replace('{app}', name).replace('{acc}', a.label).replace('{sp}', a.space)
    window.dispatchEvent(new CustomEvent('alba:ask', { detail: { message: msg } }))
  }
  const linkOff = async (acc: string) => { await callApi('disconnect', { accountId: acc }); void loadLinks() }
  const linkSync = (acc: string) => withWork(acc, async () => { await callApi('refresh', { accountId: acc }); await loadLinks() })
  const [stored, setSpace] = useFilter()
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const space = cfg.spaces.includes(stored) ? stored : cfg.spaces[0] ?? ALL // senza pagina "Tutti" in modifica
  const target = space === ALL ? cfg.spaces[0] ?? '' : space
  const color = (s: string) => (s === ALL ? '#64748B' : spaceColor(cfg, s))
  // collega tutto in un colpo: apre i campi sicuri di tutti gli account da configurare e chiede all'agente una guida unica
  const pending = APPS.flatMap(({ key, name }) => (cfg.accounts[key] ?? []).filter((a) => a.enabled && (LINKABLE.includes(key) ? !links[a.id] : cfg.health?.[a.id]?.status !== 'ok') && (space === ALL || a.space === space)).map((a) => ({ key, name, a })))
  const connectAll = () => {
    const items = APPS.flatMap(({ key, name }) => (cfg.accounts[key] ?? []).filter((a) => a.enabled && (space === ALL || a.space === space)).map((a) => ({ key, name, a })))
    void openSetup(items.filter(({ key, a }) => (LINKABLE.includes(key) ? !links[a.id] : !(cfg.health?.[a.id]?.status === 'ok'))))
  }


  const setList = (app: string, list: Account[]) => save({ ...cfg, accounts: { ...cfg.accounts, [app]: list } })
  // Claude Code e Kiro hanno un percorso noto: se non scrivi nulla, parte quello di default invece di richiedere di scriverlo
  const DEFAULT_PATH: Record<string, string> = { claudecode: '~/.claude/projects', kiro: '~/.kiro/sessions' }
  const add = (app: string) => {
    const label = (drafts[app] ?? '').trim() || DEFAULT_PATH[app] || ''
    if (!label || !target) return
    const method: Method = app === 'discord' ? 'page' : ['folder', 'claudecode', 'kiro'].includes(app) ? 'folder' : 'integration'
    // la ricerca web non ha nulla da collegare: è pronta appena la aggiungi
    const extra: Partial<Account> = app === 'web' ? { verifiedAt: new Date().toISOString(), web: { mode: 'free', sites: [], block: [] } } : {}
    setList(app, [...(cfg.accounts[app] ?? []), { id: uid(), label, space: target, method, enabled: true, ...extra }])
    setDrafts({ ...drafts, [app]: '' })
  }
  const patch = (app: string, id: string, p: Partial<Account>) =>
    setList(app, (cfg.accounts[app] ?? []).map((a) => (a.id === id ? { ...a, ...p } : a)))
  const remove = (app: string, id: string) => setList(app, (cfg.accounts[app] ?? []).filter((a) => a.id !== id))
  // I campi di testo dei pannelli (siti, parole escluse, pattern, organizzazioni) si salvano mentre scrivi, poco dopo l'ultimo tasto.
  // Salvare solo all'uscita dal campo non basta: cliccando fuori il pannello si chiude prima, e il testo andrebbe perso.
  const cfgRef = useRef(cfg)
  cfgRef.current = cfg
  const patchRef = useRef(patch)
  patchRef.current = patch
  const soon = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const FIELD_DEFAULT = { web: { mode: 'free', sites: [], block: [] }, patterns: { include: [], exclude: [] }, orgFilter: { mode: 'exclude', orgs: [] } } as const
  const patchSoon = (app: string, id: string, field: 'web' | 'patterns' | 'orgFilter', part: Record<string, string[]>) => {
    const k = id + field + Object.keys(part).join()
    clearTimeout(soon.current[k])
    soon.current[k] = setTimeout(() => {
      const cur = (cfgRef.current.accounts[app] ?? []).find((x) => x.id === id) as any
      if (cur) patchRef.current(app, id, { [field]: { ...FIELD_DEFAULT[field], ...(cur[field] ?? {}), ...part } } as Partial<Account>)
    }, 350)
  }

  const [checking, setChecking] = useState<Record<string, number>>({})
  const [avOpen, setAvOpen] = useState<string | null>(null)
  const [freqFor, setFreqFor] = useState<string | null>(null)
  const [orgFor, setOrgFor] = useState<string | null>(null)
  const [coFor, setCoFor] = useState<string | null>(null)
  const [setFor, setSetFor] = useState<string | null>(null)   // filtri della cartella o impostazioni della ricerca web
  useEffect(() => {
    if (!avOpen && !freqFor && !orgFor && !coFor && !setFor) return
    const off = (e: MouseEvent) => { const el = e.target as HTMLElement; if (!el.closest?.('.avpop, .av, .fpop, .fbtn, .orgpop, .orgbtn, .copop, .cobtn, .setbtn')) { setAvOpen(null); setFreqFor(null); setOrgFor(null); setCoFor(null); setSetFor(null) } }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [avOpen, freqFor, orgFor, coFor, setFor])
  const dayName = (d: number) => { try { return new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2024, 0, d)) } catch { return String(d) } }
  const freqOf = (id: string) => cfg.frequency?.[id] ?? { mode: 'every' as const, days: [] as number[] }
  const setFreq = (id: string, v: { mode: 'every' | 'weekly' | 'off'; days?: number[] }) =>
    save({ ...cfg, frequency: { ...(cfg.frequency ?? {}), [id]: v } })
  const rel = (iso: string) => {
    const m = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000))
    try {
      const f = new Intl.RelativeTimeFormat(code || 'en', { numeric: 'auto' })
      return m < 60 ? f.format(-m, 'minute') : m < 1440 ? f.format(-Math.round(m / 60), 'hour') : f.format(-Math.round(m / 1440), 'day')
    } catch { return iso.slice(0, 16).replace('T', ' ') }
  }
  // stato di una riga: verde = verificato di recente, ambra = da ricontrollare, rosso = serve riaccedere o errore, grigio = mai verificato
  const stateOf = (key: string, a: Account): { dot: 'ok' | 'warn' | 'bad' | 'none'; text: string; title?: string; href?: string } => {
    if (LINKABLE.includes(key)) {
      const l = links[a.id]
      if (!l) return { dot: 'none', text: t.lnkNo }
      if (l.error) {
        const m = /https:\/\/console\.(?:developers|cloud)\.google\.com\/[^\s"'<>]+/.exec(l.error)
        if (m && /has not been used|is disabled|accessNotConfigured/i.test(l.error)) return { dot: 'bad', text: t.apiOff, title: l.error, href: m[0] }
        return { dot: 'bad', text: l.error, title: l.url }
      }
      const unit = key === 'gmail' ? t.unitMail : key === 'calendar' ? t.unitEvent : key === 'drive' ? t.unitFile : key === 'slack' || key === 'googlechat' ? t.unitMsg : ['notion', 'linear', 'trello', 'github', 'outlook', 'jira', 'confluence'].includes(key) ? t.unitItem : ''
      return { dot: 'ok', text: unit ? t.lnkOk.split('·')[0] + '· ' + String(l.count ?? 0) + ' ' + unit : t.lnkOk.replace('{n}', String(l.count ?? 0)), title: l.lastSync ? rel(l.lastSync) : l.url }
    }
    if (SECRET.includes(key)) {
      const l = links[a.id]
      if (l?.error) return { dot: 'bad', text: l.error }
      if (l) return { dot: 'ok', text: t.lnkOk.split('·')[0] + '· ' + String(l.count ?? 0), title: l.lastSync ? rel(l.lastSync) : undefined }
      return secrets[a.id] ? { dot: 'warn', text: t.secYes } : { dot: 'none', text: t.secNo }
    }
    const h = cfg.health?.[a.id] ?? (a.verifiedAt ? { status: 'ok' as const, checkedAt: a.verifiedAt } : undefined)
    if (checking[a.id] && Date.now() - checking[a.id]! < 120000 && !(h && Date.parse(h.checkedAt) > checking[a.id]!)) return { dot: 'warn', text: t.stBusy }
    if (!h) return { dot: 'none', text: t.stNever }
    if (h.status === 'signin') return { dot: 'bad', text: t.stSignin, title: rel(h.checkedAt) }
    if (h.status === 'error') return { dot: 'bad', text: t.stErr, title: h.detail }
    // Discord non viene più riverificato ogni giorno (aprirlo segnerebbe i messaggi come letti): l'ultimo stato noto resta valido, non invecchia mai in giallo
    if (key === 'discord') return { dot: 'ok', text: t.stOk.replace('{t}', rel(h.checkedAt)) }
    const age = Date.now() - Date.parse(h.checkedAt)
    return age > 36 * 3600000 ? { dot: 'warn', text: t.stOld.replace('{t}', rel(h.checkedAt)) } : { dot: 'ok', text: t.stOk.replace('{t}', rel(h.checkedAt)) }
  }
  // la verifica è codice (cron di Crew senza modello): da qui si avvia solo, e l'esito arriva dalla configurazione
  const checkNow = async (_key: string, _name: string, a: Account) => {
    setChecking((m) => ({ ...m, [a.id]: Date.now() }))
    setWorking((m) => ({ ...m, [a.id]: true }))
    setTimeout(() => setWorking((m) => ({ ...m, [a.id]: false })), 1500)
    try {
      const r = await api.post('/apps/alba/api/run-brief', { steps: ['health'] })
      if (r && r.ok === false) throw new Error(String(r.error || 'error'))
    } catch { setChecking((m) => { const n = { ...m }; delete n[a.id]; return n }) }
  }

  const countIn = (s: string) =>
    Object.values(cfg.accounts).reduce((n, l) => n + l.filter((a) => s === ALL || a.space === s).length, 0)

  const [fapp, setFapp] = useState('')
  const [iconOpen, setIconOpen] = useState(false)
  const [iconQ, setIconQ] = useState('')
  const iconPopRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!iconOpen) return
    const off = (e: MouseEvent) => { const t = e.target as Node; if (iconPopRef.current && !iconPopRef.current.contains(t) && !(t as HTMLElement).closest?.('.ichip.more')) setIconOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [iconOpen])
  const renameSpace = (from: string, raw: string) => {
    const to = raw.trim()
    if (!to || to === from || cfg.spaces.includes(to)) return
    const mv = <T,>(o?: Record<string, T>) => { if (!o || !(from in o)) return o; const { [from]: v, ...rest } = o; return { ...rest, [to]: v } }
    const accounts = Object.fromEntries(Object.entries(cfg.accounts).map(([k, l]) => [k, l.map((a) => (a.space === from ? { ...a, space: to } : a))]))
    save({ ...cfg, accounts, spaces: cfg.spaces.map((x) => (x === from ? to : x)), spaceIcons: mv(cfg.spaceIcons), spaceColors: mv(cfg.spaceColors), focus: mv(cfg.focus) })
    if (cfg.tasks?.some((x) => x.space === from)) saveTasks(cfg.tasks.map((x) => (x.space === from ? { ...x, space: to } : x)))
    if (cfg.brief) saveBrief({ ...cfg.brief, updates: cfg.brief.updates?.map((x) => (x.space === from ? { ...x, space: to } : x)), todos: cfg.brief.todos?.map((x) => (x.space === from ? { ...x, space: to } : x)) })
    if (stored === from) setSpace(to)
  }

  const removeSpace = (sp: string) => {
    if (countIn(sp) > 0) return
    save({ ...cfg, spaces: cfg.spaces.filter((x) => x !== sp) })
    setSpace(ALL)
  }

  return (
    <>
      {setupUrl ? (
        <div className="loginhint" style={{ marginBottom: 14 }}>
          <span>{t.setupReady}</span>
          <span style={{ display: 'flex', gap: 6, flex: 'none' }}>
            <a className="talk" href={setupUrl} target="_blank" rel="noopener noreferrer">{t.setupOpen}</a>
            <button className="talk" type="button" onClick={async () => { try { await navigator.clipboard.writeText(setupUrl) } catch { /* appunti non disponibili */ } setSetupCopied(true) }}>{setupCopied ? t.setupCopied : t.setupCopy}</button>
            <button className="talk" type="button" onClick={() => setSetupUrl(null)} aria-label={t.close} title={t.close}><X size={13} /></button>
          </span>
        </div>
      ) : null}
      <h1>{t.connTitle}{pending.length > 1 ? <button className="talk connall" onClick={connectAll}><Plug size={13} /> {t.connAll} ({pending.length})</button> : null}</h1>

      <div className="card about">
        {(() => {
          const def = cfg.about ?? ''
          const custom = space !== ALL ? cfg.aboutBySpace?.[space] : undefined
          const val = space === ALL ? def : (custom ?? def)
          const setAbout = (text: string) => {
            if (space === ALL) { save({ ...cfg, about: text }); return }
            const all = { ...(cfg.aboutBySpace ?? {}) }
            if (text === def) delete all[space]; else all[space] = text
            save({ ...cfg, aboutBySpace: all })
          }
          const reset = space !== ALL ? <button className="freset" disabled={custom === undefined} onClick={() => setAbout(def)}><RotateCcw size={11} />{t.focusReset}</button> : null
          return (
            <>
              <div className="frow"><span className="flab">{t.aboutTitle}</span>{space !== ALL ? <span className="fname">{space}</span> : null}{reset}</div>
              <small>{t.aboutHint}</small>
              <textarea key={space} value={val} maxLength={400} spellCheck={false} placeholder={t.aboutPh} aria-label={t.aboutTitle} onChange={(e) => setAbout(e.target.value)} />
            </>
          )
        })()}
      </div>

      <div className="cards swap" key={space}>
        {space !== ALL ? (() => {
          const sp = space
          const I = spaceIcon(cfg, sp)
          const c = color(sp)
          const n = countIn(sp)
          return (
            <div className="card spacecfg" style={{ '--c': c } as any}>
              <div className="head">
                <div className="tile" style={{ background: c, color: '#fff' }}><I size={22} /></div>
                <input key={sp} className="renamein" defaultValue={sp} maxLength={40} title={t.renameSpace} aria-label={t.renameSpace} onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }} onBlur={(e) => renameSpace(sp, e.target.value)} />
                {n === 0 ? (
                  <button className="ib" title={t.deleteSpace} aria-label={t.deleteSpace} onClick={() => removeSpace(sp)}><Trash2 size={15} /></button>
                ) : null}
              </div>
                  <div className="pgroup">
                    <div className="iconsgrid">
                      {Object.entries(ICONS).map(([key, Ic]) => {
                        const on = (cfg.spaceIcons?.[sp] ?? '') === key
                        return (
                          <button key={key} className={'ichip' + (on ? ' on' : '')} style={on ? { background: c } : undefined} onClick={() => save({ ...cfg, spaceIcons: { ...(cfg.spaceIcons ?? {}), [sp]: key } })}>
                            <Ic size={18} />
                          </button>
                        )
                      })}
                      {(() => {
                        const cur = cfg.spaceIcons?.[sp] ?? ''
                        const QUICK = ['Laptop', 'Landmark', 'Stethoscope']
                        const customOn = cur.startsWith('lu:') && !QUICK.includes(cur.slice(3))
                        const Cx = customOn ? iconByKey(cur) : null
                        const quick = (customOn ? QUICK.slice(0, 2) : QUICK).filter((n) => luIcon(n))
                        return (
                          <>
                            {quick.map((n) => { const Ic = luIcon(n); const on = cur === 'lu:' + n; return (
                              <button key={n} title={n} className={'ichip' + (on ? ' on' : '')} style={on ? { background: c } : undefined} onClick={() => save({ ...cfg, spaceIcons: { ...(cfg.spaceIcons ?? {}), [sp]: 'lu:' + n } })}><Ic size={18} /></button>
                            ) })}
                            {Cx ? <button className="ichip on" style={{ background: c }} title={cur.slice(3)} onClick={() => setIconOpen(true)}><Cx size={18} /></button> : null}
                          </>
                        )
                      })()}
                      <button className="ichip more" title={t.moreIcons} aria-label={t.moreIcons} onClick={() => { setIconQ(''); setIconOpen(true) }}>{(() => { const M = luIcon('LayoutGrid') ?? Plus; return <M size={16} /> })()}</button>
                    </div>
                  {iconOpen ? (
                    <div className="iconpop" ref={iconPopRef} role="dialog" onKeyDown={(e) => { if (e.key === 'Escape') setIconOpen(false) }}>
                      <div className="ipt">
                        <input autoFocus value={iconQ} onChange={(e) => setIconQ(e.target.value)} placeholder={t.iconSearch} aria-label={t.iconSearch} />
                        <button className="lnk" onClick={() => setIconOpen(false)}>{t.close}</button>
                      </div>
                      <div className="ipg">
                        {EXTRA_ICONS.filter((n) => n.toLowerCase().includes(iconQ.trim().toLowerCase())).map((n) => {
                          const Ic = luIcon(n)
                          if (!Ic) return null
                          const on = (cfg.spaceIcons?.[sp] ?? '') === 'lu:' + n
                          return <button key={n} title={n} className={on ? 'on' : ''} style={on ? { background: c } : undefined} onClick={() => { save({ ...cfg, spaceIcons: { ...(cfg.spaceIcons ?? {}), [sp]: 'lu:' + n } }); setIconOpen(false) }}><Ic size={18} /></button>
                        })}
                      </div>
                    </div>
                  ) : null}
                  </div>
                  <div className="pgroup">
                    <div className="colorsgrid">
                      {PALETTE.map((pc) => (
                        <button key={pc} className={'sw' + (c.toLowerCase() === pc.toLowerCase() ? ' on' : '')} style={{ background: pc }} aria-label={pc} onClick={() => save({ ...cfg, spaceColors: { ...(cfg.spaceColors ?? {}), [sp]: pc } })} />
                      ))}
                      {(() => {
                        const custom = !PALETTE.some((pc) => pc.toLowerCase() === c.toLowerCase())
                        return (
                          <label className={'swpick' + (custom ? ' on' : '')} style={custom ? { background: c } : undefined} title={t.chooseColor}>
                            <PickerIcon size={13} />
                            <input type="color" value={/^#[0-9a-fA-F]{6}$/.test(c) ? c : '#8b5cf6'} onChange={(e) => save({ ...cfg, spaceColors: { ...(cfg.spaceColors ?? {}), [sp]: e.target.value } })} />
                          </label>
                        )
                      })()}
                    </div>
                  </div>
                  {(() => {
                    const keys = APPS.filter((a) => (cfg.accounts[a.key] ?? []).some((x) => x.space === sp)).map((a) => a.key)
                    const cur = keys.includes(fapp) ? fapp : keys[0]
                    if (!cur) return <div className="focus"><span className="flab">{t.focusTitle}</span><small>{t.focusNone}</small></div>
                    const def = focusDefault(cur, code)
                    const custom = cfg.focus?.[sp]?.[cur]
                    const val = custom ?? def
                    const setFocus = (app: string, text: string | null) => {
                      const all = { ...(cfg.focus ?? {}) }
                      const mine = { ...(all[sp] ?? {}) }
                      if (text === null || text.trim() === '' || text === focusDefault(app, code)) delete mine[app]; else mine[app] = text
                      if (Object.keys(mine).length) all[sp] = mine; else delete all[sp]
                      save({ ...cfg, focus: all })
                    }
                    const vert = true // stessa disposizione per tutti i profili
                    const chips = keys.map((k) => { const A = APPS.find((a) => a.key === k)!; return (
                      <button key={k} className={'fchip' + (k === cur ? ' on' : '')} title={A.name} aria-label={A.name} onClick={() => setFapp(k)}>
                        <A.Icon size={14} />{cfg.focus?.[sp]?.[k] ? <i /> : null}
                      </button>
                    ) })
                    const reset = <button className="freset" disabled={custom === undefined} onClick={() => setFocus(cur, null)}><RotateCcw size={11} />{t.focusReset}</button>
                    const area = <textarea key={sp + cur} value={val} maxLength={800} spellCheck={false} aria-label={t.focusTitle} onChange={(e) => setFocus(cur, e.target.value)} />
                    // con molte app i pulsanti andrebbero a capo e schiaccerebbero il testo: si passa a una colonna verticale a sinistra
                    return vert ? (
                      <div className="focus vert">
                        <div className="fcol">{chips}</div>
                        <div className="fmain">
                          <div className="frow"><span className="flab">{t.focusTitle}</span><span className="fname">{APPS.find((a) => a.key === cur)?.name}</span>{reset}</div>
                          {area}
                        </div>
                      </div>
                    ) : (
                      <div className="focus">
                        <div className="frow"><span className="flab">{t.focusTitle}</span>{chips}{reset}</div>
                        {area}
                      </div>
                    )
                  })()}
            </div>
          )
        })() : null}
        {(() => {
          const isUsed = (key: string) => space === ALL || (cfg.accounts[key] ?? []).some((x) => x.space === space)
          const expandedKey = (key: string) => space + '::' + key
          const emptyApps = space === ALL ? [] : APPS.filter((a) => !isUsed(a.key))
          const collapsed = emptyApps.filter((a) => !expandedEmpty[expandedKey(a.key)])
          const ordered = [...APPS.filter((a) => isUsed(a.key)), ...emptyApps.filter((a) => expandedEmpty[expandedKey(a.key)])]
          return (
            <>
              {ordered.map(({ key, name, color: c, Icon }, n) => {
                const hint = t.apps[key] ?? ''
                const all = cfg.accounts[key] ?? []
                const list = all.filter((a) => space === ALL || a.space === space)
                return (
            <div className={'card' + (list.length ? '' : ' empty') + (list.some((x) => x.id === avOpen || x.id === freqFor || x.id === orgFor || x.id === coFor || x.id === setFor) ? ' up' : '')} key={key} style={{ '--i': n } as any}>
              <div className="head">
                <div className="tile" style={{ background: c + '26', color: c }}><Icon size={22} /></div>
                <div><b>{key === 'folder' ? t.folderName : name}</b><span>{hint}</span>
                </div>
                <span className="count">{list.length}</span>
                {space !== ALL && list.length === 0 ? <button type="button" className="ib collapseapp" title={t.hideUnused} aria-label={t.hideUnused} onClick={() => collapseEmpty(expandedKey(key))}>×</button> : null}
              </div>
              {list.length === 0 ? <div className="acc ghost" aria-hidden="true"><div className="av">&nbsp;</div></div> : null}
              {list.map((a) => (
                <div key={a.id} className={'acc' + (a.enabled ? '' : ' off')}>
                  {(() => { const st = stateOf(key, a); const busy = st.text === t.stBusy || !!working[a.id]; return (
                    <button type="button" className="av" style={{ background: spaceColor(cfg, a.space) }} aria-label={t.avStatus} title={st.text} onClick={() => { setFreqFor(null); setAvOpen(avOpen === a.id ? null : a.id) }}>{initials(a.label)}<i className={'sdot ' + (busy ? 'warn' : a.enabled ? st.dot : 'none') + (busy ? ' busy' : '')} /></button>
                  ) })()}
                  {avOpen === a.id ? (() => { const st0 = stateOf(key, a); const busy = st0.text === t.stBusy || !!working[a.id]; const st = busy ? { ...st0, dot: 'warn' as const, text: t.stBusy, title: undefined, href: undefined } : st0; return (
                    <div className="avpop">
                      <input className="l" style={{ width: '100%', boxSizing: 'border-box', fontWeight: 700, fontSize: 13 }} title={a.label} value={a.label} onChange={(e) => patch(key, a.id, { label: e.target.value })} />
                      <div className="r">{a.space}{(links[a.id] as any)?.team ? ' · ' + (links[a.id] as any).team : ''}</div>
                      <div className={'r ' + (a.enabled ? st.dot : '')}><i />{st.href ? <a href={st.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>{st.text}</a> : st.text}</div>
                      {st.title ? <div className="r" style={{ wordBreak: 'break-word' }}>{st.title}</div> : null}
                    </div>
                  ) })() : null}
                  {freqFor === a.id ? <div className="fpop">
                      {(() => { const f = freqOf(a.id); const pick = (mode: 'every' | 'weekly' | 'off') => setFreq(a.id, { mode, days: mode === 'weekly' ? (f.days?.length ? f.days : [1]) : f.days }); return (
                        <div className="fq" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
                          <h5>⏱ {t.freqTitle.replace('{app}', name)}</h5>
                          <label><input type="radio" name={'f' + a.id} checked={f.mode === 'every'} onChange={() => pick('every')} />{t.freqEvery}</label>
                          <label><input type="radio" name={'f' + a.id} checked={f.mode === 'weekly'} onChange={() => pick('weekly')} />{t.freqWeekly}</label>
                          {f.mode === 'weekly' ? (
                            <div className="days">
                              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                                <button key={d} type="button" className={f.days?.includes(d) ? 'on' : ''} onClick={() => {
                                  const has = f.days?.includes(d)
                                  if (has && (f.days?.length ?? 0) === 1) return
                                  setFreq(a.id, { mode: 'weekly', days: has ? (f.days ?? []).filter((x) => x !== d) : [...(f.days ?? []), d].sort((x, y) => x - y) })
                                }}>{dayName(d)}</button>
                              ))}
                            </div>
                          ) : null}
                          <label><input type="radio" name={'f' + a.id} checked={f.mode === 'off'} onChange={() => pick('off')} />{t.freqOff}</label>
                          <p>{t.freqHint}</p>
                        </div>
                      ) })()}
                  </div> : null}
                  {orgFor === a.id ? <div className="fpop orgpop">
                      {(() => {
                        const of = a.orgFilter ?? { mode: 'exclude' as const, orgs: [] as string[] }
                        const setOrg = (p: Partial<{ mode: 'include' | 'exclude'; orgs: string[] }>) => patch(key, a.id, { orgFilter: { ...of, ...p } })
                        return (
                          <div className="fq" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
                            <h5>🏢 {t.ghOrgTitle}</h5>
                            <label><input type="radio" name={'o' + a.id} checked={of.mode === 'exclude'} onChange={() => setOrg({ mode: 'exclude' })} />{t.ghOrgExclude}</label>
                            <label><input type="radio" name={'o' + a.id} checked={of.mode === 'include'} onChange={() => setOrg({ mode: 'include' })} />{t.ghOrgInclude}</label>
                            <input className="orginput" style={{ width: '100%', boxSizing: 'border-box' }} placeholder={t.ghOrgPh} defaultValue={of.orgs.join(', ')} onChange={(e) => patchSoon(key, a.id, 'orgFilter', { orgs: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} />
                            <p>{t.ghOrgHint}</p>
                          </div>
                        )
                      })()}
                  </div> : null}
                  {setFor === a.id && key === 'web' ? <div className="fpop orgpop">
                      {(() => {
                        const w = a.web ?? { mode: 'free' as const, sites: [] as string[], block: [] as string[] }
                        const setW = (p: Partial<{ mode: 'free' | 'sites' }>) => patch(key, a.id, { web: { ...w, ...((cfgRef.current.accounts[key] ?? []).find((x) => x.id === a.id)?.web ?? {}), ...p } })
                        const list = (v: string) => v.split(',').map((x) => x.trim()).filter(Boolean)
                        return (
                          <div className="fq" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
                            <h5>{t.webTitle}</h5>
                            <label><input type="radio" name={'w' + a.id} checked={w.mode !== 'sites'} onChange={() => setW({ mode: 'free' })} />{t.webFree}</label>
                            {w.mode !== 'sites' ? <input key="b" className="orginput" style={{ width: '100%', boxSizing: 'border-box' }} placeholder={t.webBlockPh} defaultValue={w.block.join(', ')} onChange={(e) => patchSoon(key, a.id, 'web', { block: list(e.target.value) })} /> : null}
                            <label><input type="radio" name={'w' + a.id} checked={w.mode === 'sites'} onChange={() => setW({ mode: 'sites' })} />{t.webSites}</label>
                            {w.mode === 'sites' ? <input key="s" className="orginput" style={{ width: '100%', boxSizing: 'border-box' }} placeholder={t.webSitesPh} defaultValue={w.sites.join(', ')} onChange={(e) => patchSoon(key, a.id, 'web', { sites: list(e.target.value) })} /> : null}
                            <p>{t.webHint}</p>
                          </div>
                        )
                      })()}
                  </div> : null}
                  {setFor === a.id && ['folder', 'claudecode', 'kiro'].includes(key) ? <div className="fpop orgpop">
                      {(() => {
                        const pt = a.patterns ?? { include: [] as string[], exclude: [] as string[] }
                        const list = (v: string) => v.split(',').map((x) => x.trim()).filter(Boolean)
                        return (
                          <div className="fq" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
                            <h5>{t.patTitle}</h5>
                            <input className="orginput" style={{ width: '100%', boxSizing: 'border-box' }} placeholder={t.patInclude} defaultValue={pt.include.join(', ')} onChange={(e) => patchSoon(key, a.id, 'patterns', { include: list(e.target.value) })} />
                            <input className="orginput" style={{ width: '100%', boxSizing: 'border-box' }} placeholder={t.patExclude} defaultValue={pt.exclude.join(', ')} onChange={(e) => patchSoon(key, a.id, 'patterns', { exclude: list(e.target.value) })} />
                            <p>{t.patHint}</p>
                          </div>
                        )
                      })()}
                  </div> : null}
                  {coFor === a.id ? <div className="fpop orgpop">
                      {(() => {
                        const scope = a.companyScope ?? 'profile'
                        const setScope = (s: 'profile' | 'both' | 'company') => patch(key, a.id, { companyScope: s })
                        return (
                          <div className="fq" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
                            <h5>🏛 {t.liCoTitle}</h5>
                            <label><input type="radio" name={'c' + a.id} checked={scope === 'profile'} onChange={() => setScope('profile')} />{t.liCoProfile}</label>
                            <label><input type="radio" name={'c' + a.id} checked={scope === 'both'} onChange={() => setScope('both')} />{t.liCoBoth}</label>
                            <label><input type="radio" name={'c' + a.id} checked={scope === 'company'} onChange={() => setScope('company')} />{t.liCoOnly}</label>
                            {scope !== 'profile' ? <input className="orginput" style={{ width: '100%', boxSizing: 'border-box' }} placeholder={t.liCoPh} defaultValue={a.companyPage ?? ''} onBlur={(e) => patch(key, a.id, { companyPage: e.target.value.trim() })} /> : null}
                            <p>{t.liCoHint}</p>
                          </div>
                        )
                      })()}
                  </div> : null}
                  <div className="accinfo">
                    <span className="nm" title={a.label}>{a.label}</span>
                    {space === ALL ? (
                      <select value={a.space} onChange={(e) => patch(key, a.id, { space: e.target.value })}>
                        {cfg.spaces.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    ) : null}
                  </div>
                  <div className="acctools">
                  {(() => {
                    // stesse icone, nello stesso ordine, per ogni account di ogni profilo: quella non applicabile resta spenta
                    let on = false, title = t.lnkSync
                    let run: () => void = () => {}
                    if (LINKABLE.includes(key)) { on = !!links[a.id]; run = () => void linkSync(a.id) }
                    else if (SECRET.includes(key)) { on = !linkBusy && (!!secrets[a.id] || !!links[a.id]); title = t.secVerify; run = () => void secVerify(a.id, key) }
                    else if (key !== 'drive' && isPage(a.method)) { on = true; title = t.stCheck; run = () => void checkNow(key, name, a) }
                    return <button className={'ib' + (working[a.id] ? ' spin' : '')} title={title} aria-label={title} disabled={!on} style={on ? undefined : { opacity: 0.3, cursor: 'default' }} onClick={run}><RefreshCw size={14} /></button>
                  })()}
                  {true ? (
                    <button className={'ib' + (a.enabled && !['web', 'folder', 'claudecode', 'kiro'].includes(key) && ['none', 'bad'].includes(stateOf(key, a).dot) && !working[a.id] ? ' need' : '')} title={t.lnkGo} aria-label={t.lnkGo} onClick={() => void openSetup([{ key, name, a }])}><Plug size={14} /></button>
                  ) : null}
                  {(() => { const Clock = luIcon('Clock'); const f = freqOf(a.id); return Clock ? <button className={'ib fbtn' + (f.mode !== 'every' ? ' act' : '')} title={t.freqTitle.replace('{app}', name)} aria-label={t.freqTitle.replace('{app}', name)} onClick={() => { setAvOpen(null); setFreqFor(freqFor === a.id ? null : a.id) }}><Clock size={15} /></button> : null })()}
                  {key === 'github' ? (() => { const Building = luIcon('Building2'); const has = !!a.orgFilter?.orgs.length; return Building ? <button className={'ib orgbtn' + (has ? ' act' : '')} title={t.ghOrgTitle} aria-label={t.ghOrgTitle} onClick={() => { setAvOpen(null); setOrgFor(orgFor === a.id ? null : a.id) }}><Building size={15} /></button> : null })() : null}
                  {key === 'web' || ['folder', 'claudecode', 'kiro'].includes(key) ? (() => { const Ic = luIcon(key === 'web' ? 'SlidersHorizontal' : 'Filter'); const has = key === 'web' ? (a.web?.mode === 'sites' || !!a.web?.block.length) : !!(a.patterns?.include.length || a.patterns?.exclude.length); const ttl = key === 'web' ? t.webTitle : t.patTitle; return Ic ? <button className={'ib setbtn' + (has ? ' act' : '')} title={ttl} aria-label={ttl} onClick={() => { setAvOpen(null); setSetFor(setFor === a.id ? null : a.id) }}><Ic size={15} /></button> : null })() : null}
                  {key === 'linkedin' ? (() => { const Landmark = luIcon('Landmark'); const has = (a.companyScope ?? 'profile') !== 'profile'; return Landmark ? <button className={'ib cobtn' + (has ? ' act' : '')} title={t.liCoTitle} aria-label={t.liCoTitle} onClick={() => { setAvOpen(null); setCoFor(coFor === a.id ? null : a.id) }}><Landmark size={15} /></button> : null })() : null}
                  <button className="ib" title={a.enabled ? t.pause : t.resume} onClick={() => patch(key, a.id, { enabled: !a.enabled })}>
                    {a.enabled ? <Pause size={15} /> : <Play size={15} />}
                  </button>
                  <button className="ib" title={t.remove} onClick={() => { if (links[a.id] || secrets[a.id]) void callApi('disconnect', { accountId: a.id, app: key }); remove(key, a.id) }}><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
              {SECRET.includes(key) ? list.filter((a) => secFor[a.id]).map((a) => (
                <div key={'s' + a.id} className="linkform">
                  <small>{key === 'gmail' ? t.secGmail : t.secCal}</small>
                  <div className="lf2" style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    {key === 'gmail' ? <a className="lnk" href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">{t.secLinkApp}</a> : <a className="lnk" href="https://calendar.google.com/calendar/u/0/r/settings" target="_blank" rel="noopener noreferrer">{t.secLinkCal}</a>}
                  </div>
                  <input type="password" value={secVal[a.id] ?? ''} onChange={(e) => setSecVal({ ...secVal, [a.id]: e.target.value })} placeholder={key === 'gmail' ? t.secPhGmail : t.secPhCal} autoComplete="new-password" spellCheck={false} />
                  <div className="lf2"><small>{t.secGuide}</small>
                    <span style={{ display: 'flex', gap: 6, flex: 'none' }}>
                      <button className="talk" type="button" onClick={() => askGuide(key, name, a)}>{t.secAsk}</button>
                      <button className="talk" type="button" disabled={linkBusy || !(secVal[a.id] ?? '').trim()} onClick={() => void secSave(a.id)}>{t.secSave}</button>
                    </span>
                  </div>
                  {linkErr ? <em>{linkErr}</em> : null}
                </div>
              )) : null}
              {LINKABLE.includes(key) ? list.filter((a) => linkFor === a.id && !links[a.id]).map((a) => (
                <form key={'f' + a.id} className="linkform" autoComplete="off" onSubmit={(e) => { e.preventDefault(); void linkGo(a.id, key) }}>
                  {key === 'gmail' ? (
                    gClientBySpace[a.space] ? null : (
                      <>
                        <small>{t.gHow} <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">console.cloud.google.com</a></small>
                        <input value={gForm.id} onChange={(e) => setGForm({ ...gForm, id: e.target.value })} placeholder={t.gId} spellCheck={false} />
                        <input type="password" value={gForm.secret} onChange={(e) => setGForm({ ...gForm, secret: e.target.value })} placeholder={t.gSecret} autoComplete="new-password" spellCheck={false} />
                      </>
                    )
                  ) : (
                    <>
                      <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder={t.lnkUrl} spellCheck={false} />
                      <input type="password" value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} placeholder={t.lnkToken} autoComplete="new-password" spellCheck={false} />
                    </>
                  )}
                  <div className="lf2"><small>{store === 'file' ? t.lnkWeak : key === 'gmail' ? '' : t.lnkSafe}</small><button className="talk" disabled={linkBusy || (key === 'gmail' ? (!gClientBySpace[a.space] && (!gForm.id || !gForm.secret)) : (!form.url || !form.token))} type="submit"><Plug size={13} /> {key === 'gmail' ? t.gSign : t.lnkGo}</button></div>
                  {linkErr ? <em>{linkErr}</em> : null}
                  {waiting === a.id ? <em style={{ color: 'var(--muted)' }}>{t.gWait}</em> : null}
                </form>
              )) : null}
              <div className="add">
                <input
                  value={drafts[key] ?? ''}
                  onChange={(e) => setDrafts({ ...drafts, [key]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && add(key)}
                  placeholder={DEFAULT_PATH[key] ?? (key === 'folder' ? t.folderPh : key === 'web' ? t.webPh : target ? t.addTo(target) : t.createFirst)}
                />
                <button className="ib" style={{ background: c, color: '#fff' }} title={t.add} onClick={() => add(key)}><Plus size={16} /></button>
              </div>
            </div>
                )
              })}
              {collapsed.length ? (
                <div className="unusedrow">
                  {collapsed.map(({ key, name, color: c, Icon }) => (
                    <button key={key} type="button" className="unusedchip" title={name} aria-label={name} style={{ '--c': c } as any} onClick={() => expandEmpty(expandedKey(key))}><Icon size={18} /></button>
                  ))}
                </div>
              ) : null}
            </>
          )
        })()}
      </div>
    </>
  )
}
