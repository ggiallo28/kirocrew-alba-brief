import { ChatEmbed, useAppApi, useChatLauncher } from '@kirocrew/app-sdk'
import { Bell, CornerDownLeft, ExternalLink, MessageCircle, RotateCcw, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useConfig, useLang, ymd, type Reminder } from '../shared'
import { buildGrid, cellOf, centerOf, flood, nearestFree, pathTo, pickGoal, simplify, type Rect } from '../roam'
import { parseWhen, WHENEVER } from '../when'

const HOME_L = 28
const HOME_B = 28
const SIZE = 58

// Alba è una gallina. Un clic apre il fumetto: scrivi come parli ("ricordami che tra 3 giorni devo…")
// e Alba capisce il quando dalla frase; lo chiede solo se manca.
export default function Mascot({ roam = false, gutter = false }: { roam?: boolean; gutter?: boolean }) {
  const { cfg, addReminder, removeReminder } = useConfig()
  const { t, lang, code } = useLang()
  const { openChat } = useChatLauncher() as any
  const api = useAppApi() as any
  const [listOpen, setListOpen] = useState(false)
  const [triedChat, setTriedChat] = useState(false)
  const [msgs, setMsgs] = useState<{ from: 'me' | 'al'; text: string }[]>([])
  const msgsEl = useRef<HTMLDivElement>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [chatErr, setChatErr] = useState(false)
  const [open, setOpen] = useState(false)
  const [loginHint, setLoginHint] = useState(false)
  const [text, setText] = useState('')
  const [waiting, setWaiting] = useState<string | null>(null) // frase in attesa del "quando"
  const [saved, setSaved] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  // Motore del movimento: la gallina e i pulcini si muovono a ogni fotogramma, senza scatti.
  const btnRef = useRef<HTMLButtonElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const chickEls = useRef<(HTMLDivElement | null)[]>([])
  const pos = useRef<{ x: number; y: number } | null>(null)
  const vel = useRef({ x: 0, y: 0 })
  const face = useRef(1)
  const nav = useRef<{ path: [number, number][]; i: number; speed: number } | null>(null)
  const chickPos = useRef<{ x: number; y: number }[]>([])
  const raf = useRef(0)
  const lastT = useRef(0)
  const [teaser, setTeaser] = useState<string | null>(null)
  const last = useRef<string>('')
  const pressed = useRef(false)
  const drag = useRef<{ id: number; sx: number; sy: number; lx: number; ly: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)
  const shown = useRef(0)
  const latest = useRef({ cfg, t, open })
  latest.current = { cfg, t, open }
  const pending = (cfg.reminders ?? []).filter((r) => r.status === 'pending')
  // Pulcini: tante quante le cose ricordate oggi (consegnate nel brief di oggi).
  const todayStr = ymd()
  const deliveredToday = (cfg.reminders ?? []).filter((r) => r.status === 'delivered' && r.deliveredAt === todayStr).length
  const briefToday = cfg.brief?.generatedAt?.slice(0, 10) === todayStr ? cfg.brief.reminders?.length ?? 0 : 0
  const chicks = Math.max(deliveredToday, briefToday)
  const chicksRef = useRef(0)
  chicksRef.current = chicks
  const roamRef = useRef(roam || gutter)
  roamRef.current = roam || gutter
  const gutterRef = useRef(gutter)
  gutterRef.current = gutter
  const [hatching, setHatching] = useState(false)
  // Vita da gallina: ogni tanto becchetta, si guarda intorno, sbatte le ali, gratta, dorme o fa due passi.
  const [act, setAct] = useState<string | null>(null)
  const [shownChicks, setShownChicks] = useState(0)
  // La prima volta che oggi compaiono pulcini l'uovo si schiude; poi restano tutto il giorno.
  useEffect(() => {
    let seen = 0
    try { const v = JSON.parse(localStorage.getItem('alba.chicks') || 'null'); if (v && v.d === todayStr) seen = v.n } catch {}
    if (chicks > seen) {
      try { localStorage.setItem('alba.chicks', JSON.stringify({ d: todayStr, n: chicks })) } catch {}
      setHatching(true)
      const id = setTimeout(() => { setHatching(false); setShownChicks(chicks) }, 2600)
      return () => clearTimeout(id)
    }
    setShownChicks(chicks)
  }, [chicks, todayStr])
  const fmt = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long' })

  useEffect(() => {
    if (!open) { setWaiting(null); return }
    const out = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', out)
    window.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', out); window.removeEventListener('keydown', esc) }
  }, [open])

  // Quello che l'utente ha già spuntato o scartato nella pagina: vale subito, senza aspettare il prossimo brief.
  // Senza questo Alba continuerebbe a dire "ci sono cose che aspettano" per voci già chiuse.
  const decided = useRef<Record<string, { status?: string }>>({})
  const lateSaidAt = useRef(0)
  useEffect(() => {
    let on = true
    const load = () => { api.get('/apps/alba/api/task-state').then((r: any) => { if (on && r && typeof r === 'object') decided.current = r }).catch(() => {}) }
    load()
    const id = setInterval(load, 45000)
    return () => { on = false; clearInterval(id) }
  }, [])
  // La gallina ogni tanto dice qualcosa di spontaneo (mai "cliccami") e non disturba mai.
  useEffect(() => {
    const fast = (window as any).__albaTeaserMs as number | undefined
    let timer: ReturnType<typeof setTimeout>
    let hide: ReturnType<typeof setTimeout>
    const pick = (): string => {
      const { cfg: c, t: tt } = latest.current
      const today = ymd()
      const closed = (id: string) => { const d = decided.current[id]?.status; return d === 'done' || d === 'dismissed' }
      const late = (c.tasks ?? []).filter((x) => x.status === 'open' && !closed(x.id) && (Date.parse(today) - Date.parse(x.firstSeen)) / 86400000 >= 3).length
      const pend = (c.reminders ?? []).filter((r) => r.status === 'pending').length
      const pool: string[] = [...tt.teasers]
      // lo ricorda, ma non lo ripete in continuazione: al più una volta ogni due ore
      const lateOk = late > 0 && Date.now() - lateSaidAt.current > 2 * 3600000
      if (lateOk) pool.push(tt.teaseLate(late))
      if (pend > 0) pool.push(tt.teasePending(pend))
      if ((c.brief?.reminders ?? []).length > 0) pool.push(tt.teaseFresh)
      const choices = pool.filter((x) => x !== last.current)
      const said = choices[Math.floor(Math.random() * choices.length)] ?? pool[0]!
      if (lateOk && said === tt.teaseLate(late)) lateSaidAt.current = Date.now()
      return said
    }
    const schedule = (ms: number) => {
      timer = setTimeout(() => {
        const a = document.activeElement as HTMLElement | null
        const busy = pressed.current || (a && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable)) || !!document.querySelector('.bubble, .ppop, .dockpop')
        if (!latest.current.open && !busy && shown.current < 6) {
          const msg = pick()
          last.current = msg
          shown.current += 1
          setTeaser(msg)
          hide = setTimeout(() => setTeaser(null), fast ? fast : 7500)
        }
        schedule(fast ? fast * 2 : 70000 + Math.random() * 50000)
      }, ms)
    }
    schedule(fast ? fast : 25000)
    return () => { clearTimeout(timer); clearTimeout(hide) }
  }, [])
  useEffect(() => { if (open) setTeaser(null) }, [open])
  useEffect(() => {
    const down = () => { pressed.current = true }
    const up = () => { pressed.current = false }
    const move = (e: MouseEvent) => {
      const el = ref.current?.querySelector('.teaser') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left - 10 && e.clientX <= r.right + 10 && e.clientY >= r.top - 10 && e.clientY <= r.bottom + 10) setTeaser(null)
    }
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move) }
  }, [])

  // se Crew ha lasciato appesa una copia vecchia di Alba (staccata dalla pagina vera), o questa è una copia minuscola
  // (es. un'anteprima dell'icona nella sidebar, non la pagina vera), qui si ferma: niente .mb valido
  const pane = () => {
    const el = ref.current?.closest('.mb') as HTMLElement | null
    if (!el || !el.isConnected) return null
    if (el.clientWidth < 250 || el.clientHeight < 250) return null
    return el
  }
  const home = () => {
    const p = pane()
    return { x: HOME_L + SIZE / 2, y: (p ? p.clientHeight : 700) - HOME_B - SIZE / 2 }
  }
  const eggSpot = () => ({ x: HOME_L, y: (pane() ? pane()!.clientHeight : 700) - 31 - 8.5 })

  // parti del disegno che si animano a ogni passo
  const parts = useRef<{ hen?: SVGElement | null; lf?: SVGElement | null; lb?: SVGElement | null; head?: SVGElement | null }>({})
  const getParts = () => {
    if (!parts.current.hen && svgRef.current) {
      const q = (c: string) => svgRef.current!.querySelector(c) as SVGElement | null
      parts.current = { hen: q('.hen'), lf: q('.legfront'), lb: q('.legback'), head: q('.henhead') }
    }
    return parts.current
  }
  const phase = useRef(0)
  const burst = useRef({ moving: true, until: 0 })
  const flying = useRef(false)
  const teaserRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const wormEl = useRef<HTMLDivElement>(null)
  const wormBody = useRef<HTMLDivElement>(null)
  const reactEl = useRef<HTMLDivElement>(null)
  const worm = useRef<{ x: number; y: number; sc0: number; carry?: number; cy0?: number } | null>(null)
  const scEl = () => document.querySelector('.mb .scroll') as HTMLElement | null
  // il vermetto sta sulla pagina: se la pagina scorre, si sposta con lei
  const wyOf = (w: { y: number; sc0: number }) => w.y - ((scEl()?.scrollTop ?? 0) - w.sc0)
  const [wormOn, setWormOn] = useState(false)
  // la lumaca è una visita indipendente: striscia per conto suo, non è legata alla caccia della gallina
  const snailEl = useRef<HTMLDivElement>(null)
  const snailBubbleRef = useRef<HTMLDivElement>(null)
  const snail = useRef<{ x: number; y: number; path: [number, number][]; i: number; phase: 'crawl' | 'meet' | 'talk' | 'leave'; wave: number; trail: number; sc: number } | null>(null)
  const snailFace = useRef(1)
  const snailTilt = useRef(0)
  const slimeEl = useRef<HTMLDivElement>(null)
  // la farfalla (o l'ape) è un'amica che passa a trovarla: vola per conto suo, non fa parte della caccia al cibo
  const bflyEl = useRef<HTMLDivElement>(null)
  const bflyReact = useRef<HTMLDivElement>(null)
  const bfly = useRef<{ x: number; y: number; vx: number; vy: number; tx: number; ty: number; phase: 'in' | 'tease' | 'perch' | 'out'; t: number; t0: number; next: number; dodges: number; landed: boolean; token: number; sc: number } | null>(null)
  const [bflyOn, setBflyOn] = useState<null | 'butterfly' | 'bee'>(null)
  const bflyRaf = useRef(0)
  const bflyLast = useRef(0)
  const [snailOn, setSnailOn] = useState(false)
  const [snailLine, setSnailLine] = useState<string | null>(null)
  const snailRaf = useRef(0)
  const snailLastT = useRef(0)
  const snailToken = useRef(0)
  const hunt = useRef<{ token: number } | null>(null)
  const huntToken = useRef(0)
  const flyToken = useRef(0)
  const setFace = (f: number) => {
    if (f !== face.current) { face.current = f; if (svgRef.current) (svgRef.current.style as any).scale = f < 0 ? '-1 1' : '1 1' }
  }
  const placeTeaser = () => {
    const te = teaserRef.current, pn = pane()
    if (!te || !pn) return
    const p = pos.current ?? home()
    const W = pn.clientWidth
    const tw = te.offsetWidth, th = te.offsetHeight
    const x = Math.max(8, Math.min(W - tw - 8, p.x + 34))
    let y = p.y - 36 - th
    if (y < 8) y = p.y + 36
    ;(te.style as any).translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`
  }
  // il fumetto della conversazione si apre sopra (o sotto) la gallina, ovunque sia
  const placeBubble = () => {
    const el = bubbleRef.current, pn = pane()
    if (!el || !pn) return
    const W = pn.clientWidth, H = pn.clientHeight
    const p = pos.current ?? home()
    const bw = el.offsetWidth, bh = el.offsetHeight
    const x = Math.max(12, Math.min(W - bw - 12, p.x - 36))
    let y = p.y - 29 - 14 - bh
    let below = false
    if (y < 8) { below = true; y = p.y + 29 + 14; if (y + bh > H - 8) y = Math.max(8, H - bh - 8) }
    ;(el.style as any).translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`
    el.style.setProperty('--tail', `${Math.max(16, Math.min(bw - 30, p.x - x - 7))}px`)
    el.classList.toggle('below', below)
  }
  // il fumetto della lumaca segue lei, non la gallina: resta fermo mentre parla, non serve riposizionarlo ogni fotogramma
  const placeSnailBubble = () => {
    const te = snailBubbleRef.current, pn = pane(), s = snail.current
    if (!te || !pn || !s) return
    const W = pn.clientWidth
    const tw = te.offsetWidth, th = te.offsetHeight
    const x = Math.max(8, Math.min(W - tw - 8, s.x + 22))
    let y = s.y - 20 - th
    // se Alba le è accanto, il fumetto sale sopra la sua testa invece di coprirla
    const p = pos.current
    if (p && Math.abs(p.x - s.x) < 90 && Math.abs(p.y - s.y) < 60) y = Math.min(y, p.y - 42 - th)
    if (y < 8) y = s.y + 16
    ;(te.style as any).translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`
  }

  const tick = (t: number) => {
    // copia staccata dalla pagina (vecchia versione rimasta appesa dopo un aggiornamento): si ferma qui, non anima più nel vuoto
    if (!btnRef.current || !btnRef.current.isConnected) { raf.current = 0; return }
    const dt = Math.min(0.05, (t - lastT.current) / 1000 || 0.016)
    lastT.current = t
    const h = home()
    if (!pos.current) pos.current = { ...h }
    const p = pos.current
    const v = vel.current
    const n = nav.current
    if (n) {
      const wp = n.path[n.i]!
      const dx = wp[0] - p.x, dy = wp[1] - p.y
      const d = Math.hypot(dx, dy)
      const last = n.i === n.path.length - 1
      if (d < (last ? 2.5 : 16)) {
        n.i += 1
        if (n.i >= n.path.length) {
          nav.current = null
          if (flying.current) {
            flying.current = false
            setAct('land'); setTimeout(() => setAct((a) => (a === 'land' ? null : a)), 520)
          } else setAct((a) => (a === 'walk' || a === 'peck1' || a === 'look1' ? null : a))
        }
      } else {
        let sp = last ? n.speed * Math.min(1, d / 60 + 0.12) : n.speed
        if (!flying.current && sp < 88) sp *= 0.78 + 0.44 * Math.abs(Math.sin(phase.current))
        // andatura da uccello: brevi scatti con soste per beccare o guardarsi intorno
        const fin = n.path[n.path.length - 1]!
        if (!flying.current && n.speed < 88 && Math.hypot(fin[0] - p.x, fin[1] - p.y) > 55) {
          const b = burst.current
          if (t > b.until) {
            b.moving = !b.moving
            b.until = t + (b.moving ? 700 + Math.random() * 900 : 320 + Math.random() * 520)
            if (b.moving) setAct('walk')
            else { const r = Math.random(); setAct(r < 0.7 ? 'peck1' : 'look1') }
          }
          if (!b.moving) sp = 0
        }
        const k = 1 - Math.exp(-dt * (flying.current ? 2.8 : 3.4))
        v.x += ((dx / d) * sp - v.x) * k
        v.y += ((dy / d) * sp - v.y) * k
      }
    } else {
      const k = 1 - Math.exp(-dt * 5)
      v.x -= v.x * k
      v.y -= v.y * k
      // a riposo nell'angolo si assesta esattamente al suo posto
      if (!roamRef.current && !flying.current) {
        const ex = h.x - p.x, ey = h.y - p.y
        if (Math.hypot(ex, ey) < 14) { const k2 = 1 - Math.exp(-dt * 6); p.x += ex * k2; p.y += ey * k2 }
      }
    }
    p.x += v.x * dt
    p.y += v.y * dt
    const speed = Math.hypot(v.x, v.y)
    if (Math.abs(v.x) > 7) setFace(v.x >= 0 ? 1 : -1)
    if (btnRef.current) (btnRef.current.style as any).translate = `${(p.x - h.x).toFixed(2)}px ${(p.y - h.y).toFixed(2)}px`

    // passo vero: la testa scatta in avanti e poi resta quasi ferma mentre il corpo avanza,
    // le zampe si alzano e si alternano; di corsa fa passi lunghi con piccoli salti
    const pt = getParts()
    const running = speed > 88
    if (!flying.current && pt.hen) {
      const amp = Math.min(1, speed / 20)
      phase.current += (speed * dt / (running ? 20 : 10.5)) * Math.PI
      const ph = phase.current
      const set = (el: SVGElement | null | undefined, k: 'translate' | 'rotate', val: string) => { if (el) (el.style as any)[k] = val }
      if (amp > 0.02 || gaitOn.current) {
        const u = (((ph / Math.PI) % 1) + 1) % 1
        const ease = (x: number) => 1 - (1 - x) ** 3
        const headX = (u < 0.3 ? -3.4 + 7.6 * ease(u / 0.3) : 4.2 - 7.6 * ((u - 0.3) / 0.7)) * amp
        const headY = (u < 0.3 ? 1.8 * Math.sin((Math.PI * u) / 0.3) : 0) * amp
        const hop = running ? 6.5 : 2.4
        set(pt.hen, 'translate', `0 ${(-Math.abs(Math.sin(ph)) * hop * amp).toFixed(2)}px`)
        set(pt.hen, 'rotate', `${((running ? 5 : 2.2) * amp).toFixed(2)}deg`)
        const sw = (running ? 48 : 40) * amp
        set(pt.lf, 'rotate', `${(Math.sin(ph) * sw).toFixed(1)}deg`)
        set(pt.lb, 'rotate', `${(-Math.sin(ph) * sw).toFixed(1)}deg`)
        if (pt.lf) (pt.lf.style as any).translate = `0 ${(-Math.max(0, Math.cos(ph)) * 2.2 * amp).toFixed(2)}px`
        if (pt.lb) (pt.lb.style as any).translate = `0 ${(-Math.max(0, -Math.cos(ph)) * 2.2 * amp).toFixed(2)}px`
        set(pt.head, 'translate', `${headX.toFixed(2)}px ${headY.toFixed(2)}px`)
        gaitOn.current = amp > 0.02
      }
    }
    // di corsa apre le ali e svolazza
    if (running && !flying.current) { if (!runOn.current) { runOn.current = true; setAct('run') } }
    else if (runOn.current && speed < 66) { runOn.current = false; setAct((a) => (a === 'run' ? 'walk' : a)) }

    // i pulcini seguono in fila, con un po' di ritardo ciascuno
    const cs = chickPos.current
    const nCh = Math.min(shownChicksRef.current, 6)
    const hx = speed > 8 ? v.x / speed : face.current
    const hy = speed > 8 ? v.y / speed : 0
    const s = Math.min(1, speed / 30)
    let settled = true
    for (let i = 0; i < nCh; i++) {
      if (!cs[i]) { const e = eggSpot(); cs[i] = { x: e.x, y: e.y } }
      const lead = i === 0 ? p : cs[i - 1]!
      const idleX = p.x + 46 + i * 18, idleY = p.y + 21
      const trailX = i === 0 ? p.x - hx * 34 : lead.x - hx * 19
      const trailY = i === 0 ? p.y - hy * 34 + 21 : lead.y - hy * 19
      const tx = idleX + (trailX - idleX) * s
      const ty = idleY + (trailY - idleY) * s
      const rate = 1 - Math.exp(-dt * (4.6 - i * 0.3))
      cs[i]!.x += (tx - cs[i]!.x) * rate
      cs[i]!.y += (ty - cs[i]!.y) * rate
      if (Math.abs(tx - cs[i]!.x) > 0.4 || Math.abs(ty - cs[i]!.y) > 0.4) settled = false
      const el = chickEls.current[i]
      if (el) (el.style as any).translate = `${(cs[i]!.x - 8).toFixed(2)}px ${(cs[i]!.y - 8).toFixed(2)}px`
      // il pulcino guarda dove sta andando (il disegno guarda a destra: a sinistra va specchiato)
      if (el) (el.style as any).scale = (speed > 8 ? hx : face.current) < 0 ? '-1 1' : '1 1'
    }
    // il fumetto spontaneo segue la gallina
    if (teaserRef.current) placeTeaser()
    // il vermetto segue la pagina; quando è afferrato penzola dal becco
    let wormBusy = false
    const w = worm.current
    if (w) {
      const wy = wyOf(w)
      if (w.carry) {
        const u = Math.min(1, (performance.now() - w.carry) / 380)
        const e = 1 - (1 - u) ** 3
        const bx = p.x + face.current * 22, by = p.y - 6
        const x = w.x + (bx - w.x) * e, y = (w.cy0 ?? wy - 37) + (by - 4 - (w.cy0 ?? wy - 32)) * e
        if (wormEl.current) (wormEl.current.style as any).translate = `${(x - 20).toFixed(2)}px ${y.toFixed(2)}px`
      } else {
        const tr = `${(w.x - 20).toFixed(2)}px ${(wy - 50).toFixed(2)}px`
        if (wormEl.current) (wormEl.current.style as any).translate = tr
        if (spotEl.current) (spotEl.current.style as any).translate = tr
      }
      wormBusy = true
    }
    if (reactEl.current) (reactEl.current.style as any).translate = `${(p.x - 20 + face.current * 10).toFixed(2)}px ${(p.y - 56).toFixed(2)}px`
    const homeErr = !roamRef.current && !flying.current && !nav.current ? Math.hypot(h.x - p.x, h.y - p.y) : 0
    if (nav.current || speed > 0.6 || !settled || wormBusy || homeErr > 0.3 || drag.current?.moved) raf.current = requestAnimationFrame(tick)
    else raf.current = 0
  }
  const gaitOn = useRef(false)
  const runOn = useRef(false)
  const kick = () => { if (!raf.current) { lastT.current = performance.now(); raf.current = requestAnimationFrame(tick) } }
  const shownChicksRef = useRef(0)
  shownChicksRef.current = shownChicks
  useEffect(() => { kick() }, [shownChicks])
  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); raf.current = 0 }, [])
  useEffect(() => () => { if (snailRaf.current) cancelAnimationFrame(snailRaf.current); snailRaf.current = 0; if (bflyRaf.current) cancelAnimationFrame(bflyRaf.current); bflyRaf.current = 0 }, [])
  useLayoutEffect(() => { if (teaser) { placeTeaser(); kick() } }, [teaser])
  useLayoutEffect(() => { if (snailLine) placeSnailBubble() }, [snailLine])
  useEffect(() => {
    const sc = scEl()
    if (!sc) return
    const on = () => { if (slimeEl.current) (slimeEl.current.style as any).translate = `0 ${(-sc.scrollTop).toFixed(1)}px` }
    sc.addEventListener('scroll', on, { passive: true })
    return () => sc.removeEventListener('scroll', on)
  }, [roam, gutter])
  // la lumaca compare ogni tanto per conto suo, solo nella pagina Fonti (dove ha spazio per strisciare)
  useEffect(() => {
    if (!roam && !gutter) { snail.current = null; setSnailOn(false); return }
    let timer: ReturnType<typeof setTimeout>
    const loop = () => {
      timer = setTimeout(() => {
        if (!ref.current || !ref.current.isConnected) return
        const a = document.activeElement as HTMLElement | null
        const busy = pressed.current || latest.current.open || (a && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable)) || !!document.querySelector('.ppop, .dockpop')
        if (!busy && !snail.current) startSnail()
        loop()
      }, (window as any).__albaScene === 'snail' ? 1200 : 45000 + Math.random() * 60000)
    }
    loop()
    return () => clearTimeout(timer)
  }, [roam, gutter])
  // il fumetto della chat si riposiziona anche quando cambia altezza (la chat si carica)
  useLayoutEffect(() => {
    if (!open) return
    placeBubble()
    const el = bubbleRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => placeBubble())
    ro.observe(el)
    return () => ro.disconnect()
  }, [open, chatErr, slot])

  // ostacoli della pagina Fonti (per i percorsi della gallina)
  const gather = () => {
    const pn = pane()
    if (!pn) return null
    const W = pn.clientWidth, H = pn.clientHeight
    const pr = pn.getBoundingClientRect()
    const rel = (e: Element): Rect => { const r = e.getBoundingClientRect(); return { l: r.left - pr.left, t: r.top - pr.top, r: r.right - pr.left, b: r.bottom - pr.top } }
    const vis = (r: Rect) => r.r > 0 && r.b > 0 && r.l < W && r.t < H
    const common = '.topbar, .dock, .foot, .bubble, .teaser, .egg, .hatch'
    let obstacles: Rect[]
    let hiding: Rect[] = []
    if (gutterRef.current) {
      // Home: si muove solo nella striscia libera a sinistra del testo
      obstacles = Array.from(pn.querySelectorAll('.scroll .paper .stage, .scroll .paper .cap, .scroll .paper .lead, .scroll .paper .cols, .scroll .vside, ' + common)).map(rel).filter(vis)
      const content = Array.from(pn.querySelectorAll('.scroll .paper .stage, .scroll .paper .lead, .scroll .paper .cols')).map(rel).filter(vis)
      const right = content.length ? Math.min(...content.map((r) => r.l)) - 10 : 0
      if (right < 74) return null
      obstacles.push({ l: right, t: -10, r: W + 10, b: H + 10 })
    } else {
      obstacles = Array.from(pn.querySelectorAll('.scroll .card, .scroll .pcard, .scroll h1, .scroll .sub, .scroll .phint, .scroll .ppop, ' + common)).map(rel).filter(vis)
      hiding = Array.from(pn.querySelectorAll('.scroll .card, .scroll .pcard, .dock')).map(rel).filter((r) => vis(r) && r.r - r.l > 90)
    }
    // tiene cibo/ospiti/percorsi lontani dall'angolo in alto a sinistra: lì il riquadro confina con la barra laterale di Crew (più larga del previsto in alcuni host) ed è troppo stretto per sembrare naturale
    const EDGE = 190
    obstacles.push({ l: -20, t: -20, r: W + 20, b: EDGE }, { l: -20, t: -20, r: EDGE, b: H + 20 })
    const g = buildGrid(W, H, obstacles, 12, 46, 12)
    return { g, hiding, W, H }
  }
  const startTrip = () => {
    const env = gather()
    if (!env || !pos.current) return
    const { g } = env
    const start = nearestFree(g, cellOf(g, pos.current.x, pos.current.y))
    if (!start) return
    const { dist, prev } = flood(g, start)
    const goal = pickGoal(g, dist, Math.random, 10)
    if (!goal) return
    const path = simplify(g, pathTo(g, prev, goal)).map((c) => centerOf(g, c))
    burst.current = { moving: true, until: performance.now() + 900 }
    nav.current = { path, i: 0, speed: Math.random() < 0.3 ? 128 : 50 }
    setAct('walk')
    kick()
  }

  // La lumaca è una visita per conto suo. Entra da un bordo, avanza a impulsi come una lumaca vera (si allunga, poi
  // si raccoglie) lasciando una scia, si ferma; Alba le va incontro, si scambiano due parole, poi lei riparte verso il bordo.
  const SNAIL_SPEED = 15 // px/s al culmine dell'impulso; la media è circa la metà
  const dropSlime = (x: number, y: number) => {
    const host = slimeEl.current
    if (!host) return
    const i = document.createElement('i')
    i.className = 'slime'
    const sc = scEl()?.scrollTop ?? 0
    ;(i.style as any).translate = `${x.toFixed(1)}px ${(y + sc).toFixed(1)}px`   // coordinate di pagina: la scia resta dov'è stata lasciata
    ;(host.style as any).translate = `0 ${(-sc).toFixed(1)}px`
    i.addEventListener('animationend', () => i.remove())
    host.appendChild(i)
    if (host.childElementCount > 70) host.firstElementChild?.remove()
  }
  const snailGone = () => { snail.current = null; setSnailLine(null); setSnailOn(false) }
  const snailTick = (t: number) => {
    if (!ref.current || !ref.current.isConnected) { snailRaf.current = 0; return } // copia staccata dopo un aggiornamento: non anima più
    const s = snail.current
    if (!s) { snailRaf.current = 0; return }
    const dt = Math.min(0.05, (t - snailLastT.current) / 1000 || 0.016)
    snailLastT.current = t
    // la lumaca sta sulla pagina: se la pagina scorre, lei (con la sua strada, la scia e il fumetto) scorre con lei
    const scNow = scEl()?.scrollTop ?? 0
    if (scNow !== s.sc) {
      const d = scNow - s.sc
      s.sc = scNow
      s.y -= d
      for (const q of s.path) q[1] -= d
      if (slimeEl.current) (slimeEl.current.style as any).translate = `0 ${(-scNow).toFixed(1)}px`
      if (snailBubbleRef.current) placeSnailBubble()
    }
    let st = 0
    if (s.phase === 'crawl' || s.phase === 'leave') {
      if (s.i >= s.path.length) {
        if (s.phase === 'crawl') snailArrived(); else { snailGone(); snailRaf.current = 0; return }
      } else {
        s.wave += dt * ((Math.PI * 2) / 1.45)
        st = Math.max(0, Math.sin(s.wave))
        const wp = s.path[s.i]!
        const dx = wp[0] - s.x, dy = wp[1] - s.y
        const d = Math.hypot(dx, dy)
        if (d < 2) s.i += 1
        else {
          if (Math.abs(dx) > 1) snailFace.current = dx >= 0 ? 1 : -1
          // in salita o in discesa si inclina un po', come su un pendio (mai capovolta)
          const want = Math.max(-28, Math.min(28, (Math.atan2(dy, Math.abs(dx) + 0.001) * 180) / Math.PI))
          snailTilt.current += (want - snailTilt.current) * Math.min(1, dt * 2)
          const v = SNAIL_SPEED * (0.1 + 0.9 * st)
          s.x += (dx / d) * v * dt
          s.y += (dy / d) * v * dt
          s.trail += v * dt
          if (s.trail >= 8) { s.trail = 0; dropSlime(s.x - snailFace.current * 12 - 4, s.y + 8) }
        }
        if (s.phase === 'leave' && snailEl.current) {
          const end = s.path[s.path.length - 1]!
          if (Math.hypot(end[0] - s.x, end[1] - s.y) < 22) snailEl.current.dataset.state = 'bye'
        }
      }
    }
    if (s.phase !== 'crawl' && s.phase !== 'leave') snailTilt.current += (0 - snailTilt.current) * Math.min(1, dt * 3)   // ferma, torna in piano
    if (snailEl.current) {
      (snailEl.current.style as any).translate = `${(s.x - 17).toFixed(2)}px ${(s.y - 11).toFixed(2)}px`
      ;(snailEl.current.style as any).scale = snailFace.current < 0 ? '-1 1' : '1 1'   // il disegno guarda a destra
      ;(snailEl.current.style as any).rotate = `${(snailTilt.current * snailFace.current).toFixed(1)}deg`
      snailEl.current.style.setProperty('--st', st.toFixed(3))
    }
    snailRaf.current = requestAnimationFrame(snailTick)
  }
  const snailKick = () => { if (!snailRaf.current) { snailLastT.current = performance.now(); snailRaf.current = requestAnimationFrame(snailTick) } }
  // Le celle libere più vicine al bordo destro (o, se lì non c'è spazio, a quello in basso): da lì la lumaca entra ed esce.
  // La griglia non segna mai libere le celle proprio sul bordo (tiene il margine per la gallina), quindi si cerca la colonna/riga libera più esterna.
  const snailDoors = (g: { cols: number; rows: number; cell: number; free: Uint8Array }, W: number, H: number, ok: (i: number) => boolean = () => true) => {
    let mx = -1, my = -1
    for (let i = 0; i < g.free.length; i++) if (g.free[i] && ok(i)) { mx = Math.max(mx, i % g.cols); my = Math.max(my, (i / g.cols) | 0) }
    const doors: { c: [number, number]; out: [number, number] }[] = []
    const add = (side: 'r' | 'b') => {
      for (let i = 0; i < g.free.length; i++) {
        if (!g.free[i] || !ok(i)) continue
        const x = i % g.cols, y = (i / g.cols) | 0
        const cx = x * g.cell + g.cell / 2, cy = y * g.cell + g.cell / 2
        if (side === 'r' && x >= mx - 1 && W - cx < 70) doors.push({ c: [x, y], out: [W + 26, cy] })
        if (side === 'b' && y >= my - 1 && H - cy < 70) doors.push({ c: [x, y], out: [cx, H + 26] })
      }
    }
    add('r')
    if (!doors.length) add('b')
    return doors
  }
  // percorso dalla lumaca alla porta più vicina
  const snailExit = (): [number, number][] | null => {
    const env = gather(), s = snail.current
    if (!env || !s) return null
    const { g, W, H } = env
    const s0 = nearestFree(g, cellOf(g, s.x, s.y))
    if (!s0) return null
    const { dist, prev } = flood(g, s0)
    const doors = snailDoors(g, W, H, (k) => dist[k]! >= 0)
    if (!doors.length) return null
    const door = doors.reduce((a, b) => (dist[b.c[1] * g.cols + b.c[0]]! < dist[a.c[1] * g.cols + a.c[0]]! ? b : a))
    const path = simplify(g, pathTo(g, prev, door.c)).map((c) => centerOf(g, c))
    path.push(door.out)
    return path
  }
  const snailLeave = () => {
    const s = snail.current
    if (!s) return
    if (snailEl.current) snailEl.current.dataset.state = 'crawl'
    const path = snailExit()
    if (!path) { if (snailEl.current) snailEl.current.dataset.state = 'bye'; setTimeout(snailGone, 700); return }
    s.path = path; s.i = 0; s.phase = 'leave'
  }
  // la lumaca dice qualcosa, Alba (che nel frattempo le è arrivata accanto) le risponde, poi ognuna torna alla sua vita
  const snailTalk = (token: number, henToken: number | null) => {
    const s = snail.current
    if (!s || snailToken.current !== token) return
    s.phase = 'talk'
    if (snailEl.current) snailEl.current.dataset.state = 'talk'
    const lines = latest.current.t.snailLines
    const n = Math.floor(Math.random() * lines.length)
    setSnailLine(lines[n] ?? null)
    setTimeout(() => {
      if (snailToken.current !== token) return
      setSnailLine(null)
      if (!latest.current.open) {
        const replies = latest.current.t.snailReplies   // stessa posizione della battuta: è la sua risposta, non una frase a caso
        setTeaser(replies[n] ?? replies[0] ?? null)
        setTimeout(() => { if (snailToken.current === token) setTeaser(null) }, 2700)
      }
      setTimeout(() => {
        if (henToken !== null && hunt.current?.token === henToken) { hunt.current = null; setAct(null) }
        if (snailToken.current === token) snailLeave()
      }, 3000)
    }, 2700)
  }
  // Alba va a mettersi davanti alla lumaca: restituisce il punto in cui si fermerà, o null se non può (occupata, niente strada)
  const callHen = (): { ox: number; oy: number; side: number; token: number } | null => {
    const s = snail.current
    if (!s || !pos.current || hunt.current || latest.current.open || drag.current || flying.current || hatchingRef.current || !roamRef.current) return null
    const env = gather()
    if (!env) return null
    const { g } = env
    const s0 = nearestFree(g, cellOf(g, pos.current.x, pos.current.y))
    if (!s0) return null
    const { dist, prev } = flood(g, s0)
    // davanti a lei se c'è posto, altrimenti dietro, un po' più in là o un po' più su: l'importante è arrivarle accanto
    const spots: [number, number, number][] = []
    for (const [dx, dy] of [[40, -13], [52, -13], [40, -26], [58, -30], [44, 4]] as const) for (const side of [snailFace.current, -snailFace.current]) spots.push([side, dx, dy])
    for (const [side, ox, oy] of spots) {
      const x = s.x + side * ox, y = s.y + oy
      const c = cellOf(g, x, y)
      if (!g.free[c[1] * g.cols + c[0]] || dist[c[1] * g.cols + c[0]]! < 0) continue
      const path = simplify(g, pathTo(g, prev, c)).map((q) => centerOf(g, q))
      path[Math.max(0, path.length - 1)] = [x, y]
      const token = ++huntToken.current
      hunt.current = { token }
      burst.current = { moving: true, until: performance.now() + 1500 }
      nav.current = { path, i: 0, speed: 62 }
      setAct('walk'); kick()
      return { ox: side * ox, oy, side, token }
    }
    return null
  }
  const snailArrived = () => {
    const s = snail.current
    if (!s) return
    s.phase = 'meet'
    if (snailEl.current) snailEl.current.dataset.state = 'look'
    const token = ++snailToken.current
    // Alba può essere impegnata (sta mangiando, gioca con la farfalla): la lumaca la aspetta guardandosi intorno,
    // e solo se proprio non arriva le parla da dove si trova
    let spot = callHen()
    const born = performance.now()
    const id = setInterval(() => {
      if (snailToken.current !== token || !snail.current) { clearInterval(id); return }
      if (!spot) {
        spot = callHen()
        if (!spot) { if (performance.now() - born > 20000) { clearInterval(id); snailTalk(token, null) } return }
      }
      const mine = hunt.current?.token === spot.token
      const p = pos.current, sn = snail.current
      const tx = sn.x + spot.ox, ty = sn.y + spot.oy
      const there = !!p && !nav.current && Math.hypot(p.x - tx, p.y - ty) < 9
      // la pagina è scorsa mentre Alba arrivava: la lumaca si è spostata con la pagina, Alba la raggiunge di nuovo
      if (mine && p && !nav.current && !there) { nav.current = { path: [[tx, ty]], i: 0, speed: 70 }; setAct('walk'); kick() }
      if (mine && !there && performance.now() - born < 34000) return
      clearInterval(id)
      if (!mine) { snailTalk(token, null); return }   // Alba è stata chiamata altrove: la lumaca parla lo stesso, da lontano
      setAct(null)
      setFace(-spot.side)                 // Alba guarda la lumaca...
      snailFace.current = spot.side       // ...e la lumaca si gira verso di lei
      // quando la gallina le arriva accanto la lumaca ritira un attimo le antenne, poi si riaffaccia e parla
      if (snailEl.current) snailEl.current.dataset.state = 'shy'
      setTimeout(() => snailTalk(token, spot.token), 850)
    }, 150)
  }
  const startSnail = (): boolean => {
    const env = gather()
    if (!env) return false
    const { g, W, H } = env
    // entra da una porta sul bordo; se non ce n'è, compare in un punto libero qualsiasi
    const doors = snailDoors(g, W, H)
    const door = doors.length ? doors[Math.floor(Math.random() * doors.length)]! : null
    let startCell: [number, number] | null = door ? door.c : null
    for (let tries = 0; tries < 20 && !startCell; tries++) {
      const c: [number, number] = [Math.floor(Math.random() * g.cols), Math.floor(Math.random() * g.rows)]
      if (g.free[c[1] * g.cols + c[0]]) startCell = c
    }
    if (!startCell) return false
    const { dist, prev } = flood(g, startCell)
    // una meta non lontana e più o meno alla stessa altezza: una lumaca vista di lato striscia in orizzontale, non scala la pagina
    let goal: [number, number] | null = null
    let goalScore = Infinity
    for (let k = 0; k < 10; k++) {
      const c = pickGoal(g, dist, Math.random, 7, 20) ?? pickGoal(g, dist, Math.random, 3, 40)
      if (!c) continue
      // preferisce un punto con spazio accanto, dove Alba possa fermarsi a parlarle
      const [cx, cy] = centerOf(g, c)
      const roomy = [-1, 1].some((sd) => { const q = cellOf(g, cx + sd * 40, cy - 13); return g.free[q[1] * g.cols + q[0]] === 1 })
      const score = Math.abs(c[1] - startCell[1]) + (roomy ? 0 : 100)
      if (!goal || score < goalScore) { goal = c; goalScore = score }
    }
    const first = centerOf(g, startCell)
    const start: [number, number] = door ? door.out : first
    const path: [number, number][] = [first, ...(goal ? simplify(g, pathTo(g, prev, goal)).map((c) => centerOf(g, c)) : [])]
    snailToken.current += 1
    snail.current = { x: start[0], y: start[1], path, i: 0, phase: 'crawl', wave: 0, trail: 0, sc: scEl()?.scrollTop ?? 0 }
    snailFace.current = path[0]![0] >= start[0] ? 1 : -1
    setSnailLine(null)
    setSnailOn(true)
    if (snailEl.current) snailEl.current.dataset.state = 'crawl'
    snailKick()
    return true
  }

  // La farfalla (o l'ape) è un'amica. Arriva in volo, Alba le corre dietro per gioco e lei la schiva svolazzando,
  // poi le si posa addosso un momento e riparte. Alba non la becca mai.
  const bflyLeave = () => {
    const b = bfly.current, pn = pane()
    if (!b || b.phase === 'out') return
    b.phase = 'out'
    b.landed = false
    if (bflyEl.current) bflyEl.current.dataset.state = 'fly'
    const W = pn?.clientWidth ?? 800
    b.tx = b.x < W / 2 ? -60 : W + 60
    b.ty = Math.max(30, b.y - 90)
    const token = b.token
    if (hunt.current?.token === token) {
      setAct('look')   // la guarda andare via
      setTimeout(() => { if (hunt.current?.token === token) { setAct(null); hunt.current = null } }, 1500)
    }
  }
  // un nuovo punto verso cui svolazzare, poco lontano; la gallina parte un attimo dopo, come chi insegue
  const bflyWaypoint = (): boolean => {
    const b = bfly.current, env = gather()
    if (!b || !env || !pos.current) return false
    const { g } = env
    const s0 = nearestFree(g, cellOf(g, pos.current.x, pos.current.y))
    if (!s0) return false
    const { dist, prev } = flood(g, s0)
    const goal = pickGoal(g, dist, Math.random, 6, 13) ?? pickGoal(g, dist, Math.random, 2, 18)
    if (!goal) return false
    const [gx, gy] = centerOf(g, goal)
    b.tx = gx; b.ty = gy - 48
    const path = simplify(g, pathTo(g, prev, goal)).map((c) => centerOf(g, c))
    const token = b.token
    setTimeout(() => {
      if (bfly.current?.token !== token || bfly.current.phase !== 'tease' || hunt.current?.token !== token || !path.length) return
      nav.current = { path, i: 0, speed: 112 }
      setAct('walk'); kick()
    }, 380)
    return true
  }
  const bflyTick = (t: number) => {
    if (!ref.current || !ref.current.isConnected) { bflyRaf.current = 0; return }
    const b = bfly.current, pn = pane()
    if (!b || !pn || !pos.current) { bflyRaf.current = 0; bfly.current = null; setBflyOn(null); return }
    const dt = Math.min(0.05, (t - bflyLast.current) / 1000 || 0.016)
    bflyLast.current = t
    b.t += dt
    const scNow = scEl()?.scrollTop ?? 0
    if (scNow !== b.sc) { const d = scNow - b.sc; b.sc = scNow; b.y -= d; b.ty -= d }   // anche lei vola sopra la pagina, non sopra la finestra
    const p = pos.current
    const W = pn.clientWidth
    if (b.phase !== 'out' && hunt.current?.token !== b.token) bflyLeave()   // Alba è stata presa o chiamata: l'amica se ne va
    if (b.phase === 'in') {
      b.tx = p.x + face.current * 30; b.ty = p.y - 50
      if (Math.hypot(b.tx - b.x, b.ty - b.y) < 24) { b.phase = 'tease'; b.t0 = b.t; b.next = b.t + 1.1; setAct('look') }
    } else if (b.phase === 'tease') {
      const under = Math.hypot(p.x - b.tx, p.y - (b.ty + 48))
      const caught = under < 26
      if (caught || b.t >= b.next) {
        if (caught) b.dodges += 1
        if (b.dodges >= 3 || b.t - b.t0 > 15) {
          b.phase = 'perch'; b.next = b.t + 4.2
          nav.current = null; setAct(null)
        } else if (bflyWaypoint()) b.next = b.t + 3.4
        else bflyLeave()
      }
    } else if (b.phase === 'perch') {
      b.tx = p.x - face.current * 9; b.ty = p.y - 15   // sulla schiena, non sospesa sopra
      if (!b.landed && Math.hypot(b.tx - b.x, b.ty - b.y) < 4) {
        b.landed = true
        if (bflyEl.current) bflyEl.current.dataset.state = 'perch'
        if (bflyReact.current) {
          (bflyReact.current.style as any).translate = `${(p.x - 20).toFixed(1)}px ${(p.y - 62).toFixed(1)}px`
          bflyReact.current.dataset.state = 'on'
        }
      }
      if (b.t >= b.next) bflyLeave()
    } else if (b.x < -40 || b.x > W + 40) {
      bfly.current = null; bflyRaf.current = 0; setBflyOn(null)
      return
    }
    if (b.landed) { b.x = b.tx; b.y = b.ty; b.vx = 0; b.vy = 0 }
    else {
      const dx = b.tx - b.x, dy = b.ty - b.y
      const d = Math.hypot(dx, dy)
      const top = b.phase === 'out' ? 130 : b.phase === 'perch' ? 60 : 100
      const sp = Math.min(top, d * 3)
      const k = 1 - Math.exp(-dt * 3.6)
      b.vx += ((d > 0.5 ? (dx / d) * sp : 0) - b.vx) * k
      b.vy += ((d > 0.5 ? (dy / d) * sp : 0) - b.vy) * k
      b.x += b.vx * dt
      b.y += b.vy * dt
    }
    // il volo di una farfalla non è una linea: ondeggia e sobbalza a ogni battito
    const fl = b.landed ? 0 : 1
    const ox = Math.sin(b.t * 4.7) * 5 * fl, oy = (Math.sin(b.t * 9.3) * 4 + Math.sin(b.t * 2.3) * 5) * fl
    if (bflyEl.current) {
      (bflyEl.current.style as any).translate = `${(b.x + ox - 12).toFixed(2)}px ${(b.y + oy - 12).toFixed(2)}px`
      ;(bflyEl.current.style as any).rotate = `${Math.max(-20, Math.min(20, b.vx * 0.14)).toFixed(1)}deg`
    }
    bflyRaf.current = requestAnimationFrame(bflyTick)
  }
  const startButterfly = (): boolean => {
    const pn = pane()
    if (!pn || !pos.current || hunt.current || bfly.current) return false
    const W = pn.clientWidth, H = pn.clientHeight
    const token = ++huntToken.current
    hunt.current = { token }
    // arriva da destra o dall'alto, mai da troppo lontano: deve sembrare che passi di lì, non che attraversi tutta la pagina
    const p0 = pos.current
    const fromRight = p0.x < W - 260
    bfly.current = { x: fromRight ? Math.min(W + 30, p0.x + 420 + Math.random() * 160) : p0.x - 380, y: Math.max(40, Math.min(H - 80, p0.y - 150 - Math.random() * 130)), vx: fromRight ? -70 : 70, vy: 20, tx: p0.x, ty: p0.y - 50, phase: 'in', t: 0, t0: 0, next: 0, dodges: 0, landed: false, token, sc: scEl()?.scrollTop ?? 0 }
    setBflyOn(Math.random() < 0.7 ? 'butterfly' : 'bee')
    if (!bflyRaf.current) { bflyLast.current = performance.now(); bflyRaf.current = requestAnimationFrame(bflyTick) }
    return true
  }

  // il vermetto esce dalla terra in un punto libero; la gallina lo trova, ci va e lo becca con il becco sopra di lui
  const cancelHunt = () => { hunt.current = null; worm.current = null; setWormOn(false) }   // se c'era la farfalla, se ne accorge da sola e vola via
  const spotEl = useRef<HTMLDivElement>(null)
  const retractWorm = () => {
    if (wormEl.current) wormEl.current.dataset.state = 'down'
    setTimeout(() => { worm.current = null; setWormOn(false) }, 480)
  }
  // dopo il pasto fa qualcosa a caso
  const afterMeal = (token: number) => {
    const alive = () => hunt.current?.token === token
    const done = (ms: number) => setTimeout(() => { if (alive()) { setAct(null); hunt.current = null } }, ms)
    const r = ['dance', 'flap', 'nap', 'zoom', 'cluck', 'scratch', 'dance', 'zoom'][Math.floor(Math.random() * 8)]!
    if (r === 'zoom') {
      hunt.current = null
      const trip = (n: number) => {
        if (n === 0) { setAct(null); return }
        startTrip()
        if (nav.current) { nav.current.speed = 135 }
        const id = setInterval(() => { if (!nav.current) { clearInterval(id); trip(n - 1) } }, 200)
      }
      trip(2)
      return
    }
    if (r === 'cluck') { setAct('flap'); setTeaser(latest.current.t.cluck); setTimeout(() => setTeaser(null), 2600); done(2400); return }
    setAct(r)
    done(r === 'nap' ? 4600 : r === 'dance' ? 2300 : r === 'flap' ? 1700 : 1500)
  }
  // la gallina sta accanto al vermetto, con i piedi alla sua altezza e il becco sopra di lui
  // distanza orizzontale tra il centro della gallina e la punta del becco quando è chinata a beccare
  const BEAK = 25
  const peckSpot = (px: number, py: number, free: (x: number, y: number) => boolean) => {
    for (const f of [1, -1]) {
      const sx = px - f * BEAK, sy = py - 20
      if (free(sx, sy)) return { sx, sy, face: f }
    }
    return null
  }
  const startHunt = (): boolean => {
    const env = gather()
    if (!env || !pos.current) return false
    const { g } = env
    const start = nearestFree(g, cellOf(g, pos.current.x, pos.current.y))
    if (!start) return false
    const { dist, prev } = flood(g, start)
    const free = (x: number, y: number) => { const c = cellOf(g, x, y); return g.free[c[1] * g.cols + c[0]] === 1 && dist[c[1] * g.cols + c[0]]! >= 0 }
    let spot: { px: number; py: number; sx: number; sy: number; face: number } | null = null
    for (let tries = 0; tries < 14 && !spot; tries++) {
      const goal = pickGoal(g, dist, Math.random, 9)   // il cibo spunta lontano: la gallina lo va a cercare
      if (!goal) return false
      const [gx, gy] = centerOf(g, goal)
      const px = gx, py = gy + 18   // il punto di terra sotto il centro della cella
      const ps = peckSpot(px, py, free)
      if (ps) spot = { px, py, ...ps }
    }
    if (!spot) return false
    const sp = spot
    worm.current = { x: sp.px, y: sp.py, sc0: scEl()?.scrollTop ?? 0 }
    setWormOn(true)
    const token = ++huntToken.current
    hunt.current = { token }
    kick()
    const alive = () => hunt.current?.token === token
    // la gallina nota il vermetto dopo un attimo
    setTimeout(() => {
      if (!alive()) return
      const e = gather()
      if (!e || !pos.current) return cancelHunt()
      const s0 = nearestFree(e.g, cellOf(e.g, pos.current.x, pos.current.y))
      const sc = cellOf(e.g, sp.sx, sp.sy)
      if (!s0) return cancelHunt()
      const fl = flood(e.g, s0)
      if (fl.dist[sc[1] * e.g.cols + sc[0]]! < 0) return cancelHunt()
      const raw = simplify(e.g, pathTo(e.g, fl.prev, sc)).map((q) => centerOf(e.g, q))
      raw[raw.length - 1] = [sp.sx, sp.sy]   // l'ultimo passo è proprio il punto di beccata
      burst.current = { moving: true, until: performance.now() + 1200 }
      nav.current = { path: raw, i: 0, speed: Math.random() < 0.5 ? 125 : 52 }
      setAct('walk'); kick()
      // la gallina resta attaccata al vermetto: se la pagina scorre lo insegue, e il pasto riprende solo quando lo ha raggiunto
      let phase: 'walk' | 'peck' | 'pull' | 'carry' | 'swallow' = 'walk'
      let eatT = 0
      let lastSc = scEl()?.scrollTop ?? 0
      let chaseUntil = 0
      let unreach = 0
      const born = performance.now()
      const H = () => (document.querySelector('.mb') as HTMLElement | null)?.clientHeight ?? 600
      const id = setInterval(() => {
        const w = worm.current
        if (!alive() || !w || !pos.current) { clearInterval(id); return }
        const p = pos.current
        const wy = wyOf(w)
        const scNow = scEl()?.scrollTop ?? 0
        if (scNow !== lastSc) { lastSc = scNow; chaseUntil = performance.now() + 2500 }
        if (phase === 'walk' || phase === 'peck') {
          if (performance.now() - born > 45000) { clearInterval(id); retractWorm(); setAct(null); hunt.current = null; return }
          const tx = w.x - sp.face * BEAK
          const ty = Math.max(46, Math.min(H() - 74, wy - 20))
          const far = Math.hypot(tx - p.x, ty - p.y)
          // il vermetto è ai bordi dello schermo e la gallina non ci arriva: non becca a vuoto, aspetta che la pagina lo riporti a tiro
          const reach = Math.abs(ty - (wy - 20))
          if (reach > 10) {
            unreach += 100
            if (phase === 'peck') { phase = 'walk'; setAct(null) }
            if (unreach > 6000) { clearInterval(id); retractWorm(); setAct(null); hunt.current = null; return }
            if (far > 6) { if (nav.current) nav.current.path[nav.current.path.length - 1] = [tx, ty]; else { burst.current = { moving: true, until: performance.now() + 700 }; nav.current = { path: [[tx, ty]], i: 0, speed: 90 }; kick() } }
            return
          }
          unreach = 0
          if (far > (phase === 'peck' ? 7 : 4)) {
            if (phase === 'peck') setAct(far > 70 ? 'run' : 'walk')
            if (phase === 'peck' || performance.now() < chaseUntil) {
              // la pagina si è mossa: la gallina corre dietro al vermetto senza soste
              burst.current = { moving: true, until: performance.now() + 700 }
              if (nav.current) { nav.current.path = [[tx, ty]]; nav.current.i = 0; nav.current.speed = far > 26 ? 150 : 70 }
              else { nav.current = { path: [[tx, ty]], i: 0, speed: far > 26 ? 150 : 70 }; kick() }
            } else if (nav.current) nav.current.path[nav.current.path.length - 1] = [tx, ty]
            else { burst.current = { moving: true, until: performance.now() + 900 }; nav.current = { path: [[tx, ty]], i: 0, speed: far > 70 ? 150 : 75 }; kick() }
          } else if (!nav.current) {
            setFace(sp.face)   // un re-inseguimento del vermetto può aver girato la gallina nel verso sbagliato: ricontrollalo ogni volta che è ferma, non solo la prima
            if (phase === 'walk') { phase = 'peck'; setAct('peck') }
            else { setAct((a) => (a === 'peck' ? a : 'peck')); eatT += 100 }
          }
          if (phase === 'peck' && eatT >= 1500) {
            phase = 'pull'; setAct('pull')
            if (wormEl.current) wormEl.current.dataset.state = 'pull'
          }
          return
        }
        eatT += 100
        if (phase === 'pull' && eatT >= 2150) {
          phase = 'carry'
          w.cy0 = wy - 37; w.carry = performance.now()
          setAct(null)
          if (wormEl.current) { wormEl.current.dataset.state = 'carry'; wormEl.current.dataset.face = String(face.current) }
          if (spotEl.current) spotEl.current.dataset.state = 'out'
          kick()
        } else if (phase === 'carry' && eatT >= 2650) {
          phase = 'swallow'; setAct('gulp')
          if (wormEl.current) { wormEl.current.dataset.state = 'swallow'; wormEl.current.dataset.face = String(face.current) }
          if (reactEl.current) reactEl.current.dataset.state = 'on'   // cuoricini/stelline quando finisce di mangiare
        } else if (phase === 'swallow' && eatT >= 3900) {
          clearInterval(id)
          worm.current = null; setWormOn(false)
          afterMeal(token)
        }
      }, 100)
    }, 2100)
    return true
  }

  // si può prendere e trascinare la gallina: si dimena finché la tieni, poi cade e riprende la sua vita
  const dragStart = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 || open) return
    if (!pane()) return
    // riallinea la posizione interna a quella che si vede (dopo un ridimensionamento potrebbero differire)
    const m = /(-?[\d.]+)px\s+(-?[\d.]+)px/.exec(String((btnRef.current?.style as any)?.translate ?? ''))
    const hm = home()
    pos.current = { x: hm.x + (m ? parseFloat(m[1]!) : 0), y: hm.y + (m ? parseFloat(m[2]!) : 0) }
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, moved: false }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* ignora */ }
  }
  const dragMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.moved) {
      if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 6) return
      d.moved = true; d.lx = d.sx; d.ly = d.sy
      nav.current = null; flying.current = false; vel.current.x = 0; vel.current.y = 0
      cancelHunt(); setDragging(true); setAct('struggle'); setTeaser(latest.current.t.cluck)
    }
    // si sposta di quanto si sposta il puntatore: la gallina segue la mano senza salti
    const pn = pane()
    if (!pn || !pos.current) return
    pos.current.x = Math.max(0, Math.min(pn.clientWidth, pos.current.x + (e.clientX - d.lx)))
    pos.current.y = Math.max(0, Math.min(pn.clientHeight, pos.current.y + (e.clientY - d.ly)))
    d.lx = e.clientX; d.ly = e.clientY
    kick()
  }
  const dragEnd = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* ignora */ }
    if (!d.moved) return
    suppressClick.current = true
    setDragging(false); setTeaser(null)
    setAct('land'); setTimeout(() => setAct((a) => (a === 'land' ? null : a)), 520)
    // se è finita su qualcosa o fuori dal suo posto, riprende da sola
    setTimeout(() => {
      if (!roamRef.current) { goHome(); return }
      const env = gather()
      if (!env || !pos.current) return
      const c = cellOf(env.g, pos.current.x, pos.current.y)
      if (!env.g.free[c[1] * env.g.cols + c[0]]) startTrip()
    }, 700)
  }
  // finché la tieni in mano continua a dimenarsi, anche se altri comportamenti provano a cambiarle azione
  useEffect(() => {
    if (!dragging) return
    const id = setInterval(() => setAct('struggle'), 120)
    return () => clearInterval(id)
  }, [dragging])
  // tornando alla pagina normale la gallina torna nell'angolo volando
  const goHome = () => {
    cancelHunt()
    const h = home()
    const p = pos.current ?? h
    const dist = Math.hypot(h.x - p.x, h.y - p.y)
    if (dist < 30) { nav.current = { path: [[h.x, h.y]], i: 0, speed: 60 }; setAct('walk'); kick(); return }
    const lift = Math.min(150, dist * 0.45)
    const cx = (p.x + h.x) / 2
    let cy = Math.min(p.y, h.y) - lift
    // se il volo attraverserebbe la barra in basso, sale abbastanza da scavalcarla invece di tagliarla in mezzo
    const pn = pane()
    const dockEl = pn?.querySelector('.dock') as HTMLElement | null
    if (pn && dockEl) {
      const pr = pn.getBoundingClientRect(), dr = dockEl.getBoundingClientRect()
      const dock = { l: dr.left - pr.left, r: dr.right - pr.left, t: dr.top - pr.top }
      const xLo = Math.min(p.x, h.x), xHi = Math.max(p.x, h.x)
      if (xHi > dock.l - 20 && xLo < dock.r + 20) cy = Math.min(cy, dock.t - 50)
    }
    const path: [number, number][] = []
    for (let i = 1; i <= 10; i++) {
      const tt = i / 10
      path.push([(1 - tt) ** 2 * p.x + 2 * (1 - tt) * tt * cx + tt ** 2 * h.x, (1 - tt) ** 2 * p.y + 2 * (1 - tt) * tt * cy + tt ** 2 * h.y])
    }
    flying.current = true
    nav.current = { path, i: 0, speed: 175 }
    setAct('fly')
    kick()
    // rete di sicurezza: se per qualche motivo il volo non arriva mai (si blocca a metà), dopo un po' si riposiziona comunque a casa invece di restare lì ferma
    const token = ++flyToken.current
    setTimeout(() => {
      if (flyToken.current !== token || !flying.current) return
      flying.current = false
      nav.current = null
      pos.current = home()
      setAct(null)
    }, 2600)
  }
  // dentro la pagina Fonti gira per tutta la pagina; altrove sta nel suo angolo
  const wasRoam = useRef(false)
  useEffect(() => {
    if (wasRoam.current && !roam) goHome()
    wasRoam.current = roam
    if (!roam && !gutter) return
    const speedUp = ((window as any).__albaRoamMs as number | undefined) ?? 0
    let timer: ReturnType<typeof setTimeout>
    let first = true
    const loop = () => {
      timer = setTimeout(() => {
        if (!btnRef.current || !btnRef.current.isConnected) return   // copia staccata: non si riprogramma più
        const a = document.activeElement as HTMLElement | null
        const busy = pressed.current || latest.current.open || (a && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable)) || !!document.querySelector('.ppop, .dockpop')
        if (!busy && !nav.current && !hunt.current && !hatchingRef.current) {
          const forceHunt = (window as any).__albaHunt as number | undefined
          const scene = (window as any).__albaScene as string | undefined
          const visit = roam && (scene === 'butterfly' || (!first && !scene && Math.random() < 0.12)) && startButterfly()
          if (!visit && !(roam && scene !== 'butterfly' && scene !== 'snail' && (first || Math.random() < (forceHunt ?? 0.4)) && startHunt())) startTrip()
          first = false
        }
        loop()
      }, speedUp || (first ? 4500 : 3500 + Math.random() * 5000))
    }
    loop()
    const sc = document.querySelector('.mb .scroll')
    let st: ReturnType<typeof setTimeout>
    // scorrendo, se il testo le arriva sotto, la gallina si sposta da sola
    const onScroll = () => {
      if (hunt.current) return
      nav.current = null
      clearTimeout(st)
      st = setTimeout(() => {
        if (latest.current.open || !pos.current || hunt.current) return
        const env = gather()
        if (!env) return
        const c = cellOf(env.g, pos.current.x, pos.current.y)
        if (!env.g.free[c[1] * env.g.cols + c[0]]) startTrip()
      }, 450)
    }
    sc?.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(timer); clearTimeout(st); sc?.removeEventListener('scroll', onScroll) }
  }, [roam, gutter])
  useEffect(() => { if (open) { nav.current = null; cancelHunt() } }, [open])
  const hatchingRef = useRef(false)
  hatchingRef.current = hatching

  // Vita da gallina: ogni tanto becchetta, si guarda intorno, sbatte le ali, gratta, dorme o fa due passi.
  useEffect(() => {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const speed = ((window as any).__albaHenMs as number | undefined) ?? 0
    const forced = (window as any).__albaAct as string | undefined
    let timer: ReturnType<typeof setTimeout>
    let end: ReturnType<typeof setTimeout>
    const DUR: Record<string, number> = { peck: 1800, look: 2300, flap: 1600, scratch: 1400, nap: 4800, walk: 1500, dizzy: 1800 }
    const next = () => {
      timer = setTimeout(() => {
        const a = document.activeElement as HTMLElement | null
        const busy = pressed.current || latest.current.open || nav.current || hunt.current || (a && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || a.isContentEditable)) || !!document.querySelector('.ppop, .dockpop')
        if (!busy) {
          // ogni tanto fa qualcosa di strano (dizzy): è voluto, fa parte del suo carattere, non un errore
          const pool = ['peck', 'peck', 'peck', 'look', 'look', 'flap', 'scratch', 'nap', 'dizzy', ...(roamRef.current ? [] : ['walk', 'walk', 'walk'])]
          const pick = forced ?? pool[Math.floor(Math.random() * pool.length)]!
          if (pick === 'walk') {
            const h = home()
            const tx = h.x + Math.round(-4 + Math.random() * 44)
            nav.current = { path: [[tx, h.y]], i: 0, speed: 38 }
            kick()
          }
          setAct(pick)
          if (!(window as any).__albaHold && pick !== 'walk') end = setTimeout(() => setAct(null), speed ? DUR[pick]! / 2 : DUR[pick]!)
        }
        next()
      }, speed ? speed : 3500 + Math.random() * 4500)
    }
    next()
    return () => { clearTimeout(timer); clearTimeout(end) }
  }, [])

  // Chat con alba-bot dentro il fumetto: si riprende sempre la stessa conversazione.
  const talk = async (): Promise<string | null> => {
    setChatErr(false)
    if (slot) return slot
    try {
      let key: string | null = null
      try { key = localStorage.getItem('alba.chatslot') } catch {}
      if (key) {
        const list = await api.get('/api/chat/slots')
        if (!(Array.isArray(list) && list.some((x: any) => x.key === key))) key = null
      }
      if (!key) {
        const r = await api.post('/api/chat/slots', { name: 'alba', agent: 'alba-bot' })
        key = r?.key ?? null
        try { if (key) localStorage.setItem('alba.chatslot', key) } catch {}
      }
      if (!key) throw new Error('no slot')
      setSlot(key)
      return key
    } catch {
      setChatErr(true)
      return null
    }
  }

  // Nuova conversazione: nuovo slot per l'agente e chat veloce azzerata
  const [chatRev, setChatRev] = useState(0)
  const resetChat = async () => {
    setMsgs([{ from: 'al', text: latest.current.t.remHello }]); setLoginHint(false)
    const old = slot
    if (old) {
      // la conversazione si cancella davvero: si elimina lo slot; se non si può, resta comunque abbandonato
      try { await (api as any).del(`/api/chat/slots/${encodeURIComponent(old)}`) } catch { /* ripiego sotto */ }
    }
    try {
      // nome sempre nuovo: con lo stesso nome lo slot riprenderebbe la stessa chiave e la chat resterebbe com'era
      const r = await api.post('/api/chat/slots', { name: 'alba-' + Date.now().toString(36), agent: 'alba-bot' })
      if (r?.key) { try { localStorage.setItem('alba.chatslot', r.key) } catch { /* ignora */ } setSlot(r.key) }
    } catch { setChatErr(true) }
    setChatRev((n) => n + 1)
  }

  // Chat istantanea: capisce il quando dalla frase e risponde subito, senza agente e senza permessi.
  const say = (text: string, from: 'me' | 'al') => setMsgs((m) => [...m, { from, text }])
  const reply = (text: string) => setTimeout(() => say(text, 'al'), 120)
  // Aprendo il fumetto parte subito la chat con alba-bot
  useEffect(() => { if (open && !slot && !triedChat) { setTriedChat(true); void talk() } }, [open])
  useEffect(() => { if (open && msgs.length === 0) setMsgs([{ from: 'al', text: t.remHello }]) }, [open])
  useEffect(() => { const el = msgsEl.current; if (el) el.scrollTop = el.scrollHeight }, [msgs, open, chatErr])
  const save = (txt: string, due?: string) => {
    const r: Reminder = { id: Math.random().toString(36).slice(2, 9), text: txt, createdAt: new Date().toISOString(), status: 'pending', ...(due ? { due } : {}) }
    void addReminder(r)
    setWaiting(null)
    // Senza data (o con data di oggi) torna nel brief del giorno dopo.
    reply(t.remSaved(due && due > ymd() ? t.remOnDay(fmt(due)) : t.remNextLabel))
  }
  const full = !chatErr
  const QUESTION = /^\s*(?:cosa|che|come|quando|dove|perch[eé]|chi|quale|quali|quanto|what|how|when|where|why|who|which|qu[eé]|c[oó]mo|cu[aá]ndo|d[oó]nde|quoi|comment|pourquoi|o que|por que|was|wie|wann|wo|warum|wer)\b/i
  const openFull = async (question?: string) => {
    const key = await talk()
    if (key && question) {
      try { await api.post('/api/chat?ws=1', { message: question, slot: key, agent: 'alba-bot', embed_app: 'alba' }) } catch {}
    }
  }
  // altre pagine di Alba possono chiedere alla gallina di parlare: il messaggio parte nella sua chat, qui dentro
  const askRef = useRef<(q: string) => void>(() => {})
  askRef.current = (q: string) => { setOpen(true); setTriedChat(true); if (q.includes('[alba-login')) { setLoginHint(true); setTimeout(() => setLoginHint(false), 600000) } void openFull(q) }
  useEffect(() => {
    const on = (e: Event) => { const m = (e as CustomEvent).detail?.message; if (typeof m === 'string' && m) askRef.current(m) }
    window.addEventListener('alba:ask', on)
    return () => window.removeEventListener('alba:ask', on)
  }, [])
  const submit = () => {
    const raw = text.trim()
    if (!raw) return
    setText('')
    say(raw, 'me')
    if (waiting) {
      const w = parseWhen(raw, code)
      if (w.due) return save(waiting, w.due)
      if (WHENEVER.test(raw)) return save(waiting)
      return reply(`${t.remAsk} (${t.remAskPh})`)
    }
    if (/\?\s*$/.test(raw) || QUESTION.test(raw)) {
      reply(t.remToChat)
      setTimeout(() => void openFull(raw), 650)
      return
    }
    const w = parseWhen(raw, code)
    if (w.due) save(w.text, w.due)
    else { setWaiting(w.text); reply(t.remAsk) }
  }

  return (
    <div ref={ref}>
      {open ? (
        <div ref={bubbleRef} className={'bubble' + (full ? ' chat' : '')}>
          <div className="bhead">
            <h4>Alba</h4>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <button className="ib" title={t.chatReset} aria-label={t.chatReset} onClick={() => void resetChat()}><RotateCcw size={14} /></button>
              {pending.length ? <button className="talk" title={t.remPending} onClick={() => setListOpen((v) => !v)}><Bell size={13} /> {pending.length}</button> : null}
              {full ? (
                <button className="ib" title={t.chatOpenCrew} aria-label={t.chatOpenCrew} onClick={() => openChat({ ...(slot ? { slotKey: slot } : { agent: 'alba-bot' }) })}><ExternalLink size={15} /></button>
              ) : (
                <button className="ib" title={t.remTalk} aria-label={t.remTalk} onClick={() => { setTriedChat(true); void talk() }}><MessageCircle size={16} /></button>
              )}
            </div>
          </div>
          {listOpen && pending.length ? (
            <div className="plist" style={{ margin: '0 0 10px', paddingTop: 0, borderTop: 0 }}>
              <b>{t.remPending}</b>
              {pending.map((r) => (
                <div className="pitem" key={r.id}>
                  <Bell size={14} style={{ marginTop: 3, color: 'var(--accent)' }} />
                  <span>
                    {r.text}
                    <em>{r.due && r.due > ymd() ? t.remOnDay(fmt(r.due)) : t.remNextLabel}</em>
                  </span>
                  <button className="ib" title={t.remDelete} aria-label={t.remDelete} onClick={() => void removeReminder(r.id)}><X size={14} /></button>
                </div>
              ))}
            </div>
          ) : null}
          {full ? (
            chatErr ? (
              <div>
                <p className="ok" style={{ color: 'var(--muted)' }}>{t.chatUnavailable}</p>
                <button className="talk" onClick={() => openChat({ agent: 'alba-bot' })}><ExternalLink size={14} /> {t.chatOpenCrew}</button>
              </div>
            ) : slot ? (
              <>
              {loginHint ? (
                <div className="loginhint"><span>{t.loginHint}</span><button className="talk" onClick={() => openChat(slot ? { slotKey: slot } : { agent: 'alba-bot' })}><ExternalLink size={13} /> {t.loginOpen}</button></div>
              ) : null}
              <div className="chatbox"><ChatEmbed key={slot + ':' + chatRev} slotKey={slot} agent="alba-bot" placeholder={t.remPlaceholder} frameless startAtBottom /></div>
              </>
            ) : (
              <p className="ok" style={{ color: 'var(--muted)' }}>…</p>
            )
          ) : (
            <>
              <div className="msgs" ref={msgsEl}>
                {msgs.map((m, i) => <div key={i} className={'msg ' + m.from}>{m.text}</div>)}
              </div>
              <div className="rin">
                <input autoFocus value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder={waiting ? t.remAskPh : t.remPlaceholder} />
                <button className="ib" title={t.add} aria-label={t.add} onClick={submit}><CornerDownLeft size={16} /></button>
              </div>
            </>
          )}
        </div>
      ) : null}
      {teaser && !open ? <div ref={teaserRef} className="teaser" role="status">{teaser}</div> : null}
      <button ref={btnRef} className={'mascot' + (teaser && !open ? ' hop' : '') + (act ? ' act-' + act : '') + ((roam || gutter) ? ' roaming' : '') + (dragging ? ' dragging' : '')} aria-label="Alba" title="Alba" onPointerDown={dragStart} onPointerMove={dragMove} onPointerUp={dragEnd} onPointerCancel={dragEnd} onClick={() => { if (suppressClick.current) { suppressClick.current = false; return } setOpen((v) => !v) }}>
        <svg ref={svgRef} viewBox="0 0 64 64" aria-hidden="true">
          <g className="hen">
            {/* coda */}
            <g className="hentail">
              <ellipse cx="14" cy="34" rx="5" ry="10" transform="rotate(-28 14 34)" fill="#F4C27A" />
              <ellipse cx="17" cy="30" rx="4" ry="9" transform="rotate(-8 17 30)" fill="#F8D79B" />
            </g>
            {/* zampe */}
            <g stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" fill="none">
              <g className="legback"><path d="M27 51 V58 M24.5 58.5 H29.5" /></g>
              <g className="legfront"><path d="M36 51 V58 M33.5 58.5 H38.5" /></g>
            </g>
            {/* corpo */}
            <ellipse cx="30" cy="38" rx="20" ry="16" fill="#FFF4DC" />
            <g className="henwing"><ellipse cx="27" cy="41" rx="10" ry="6.8" transform="rotate(-14 27 41)" fill="#F6D9A0" /></g>
            {/* testa */}
            <g className="henhead">
              <circle cx="42" cy="22" r="11" fill="#FFF4DC" />
              <g fill="#EF4444">
                <circle cx="37" cy="12.5" r="3.4" />
                <circle cx="42.5" cy="10.5" r="3.8" />
                <circle cx="48" cy="13" r="3.2" />
              </g>
              <path className="beakU" d="M52 21 L60 24 L52 24 Z" fill="#F59E0B" />
              <path className="beakL" d="M52 24 L60 24 L52 27 Z" fill="#E88A0B" />
              <ellipse cx="50.5" cy="30" rx="2.2" ry="3.2" fill="#EF4444" />
              <ellipse className="eye" cx="44.5" cy="21" rx="1.9" ry="2.5" fill="#3B1D06" />
              <circle cx="41" cy="27" r="2.6" fill="#FB7185" opacity=".5" />
            </g>
            <circle className="bulge" cx="47" cy="29" r="2.6" fill="#F9A8D4" />
            <text className="zz" x="52" y="10" fontSize="11" fontWeight="700" fill="#93C5FD">z</text>
          </g>
        </svg>
      </button>
        {pending.length && !hatching ? <span className="egg" title={t.remPending}><b>{pending.length > 9 ? '9+' : pending.length}</b></span> : null}
        {hatching ? (
          <svg className="hatch" viewBox="0 0 30 36" aria-hidden="true">
            <g className="hchick">
              <circle cx="15" cy="17" r="7.5" fill="#FDE047" />
              <path d="M21.5 16 L26 17.4 L21.5 18.8 Z" fill="#F59E0B" />
              <circle cx="17.6" cy="15.2" r="1.1" fill="#3B1D06" />
            </g>
            <path d="M3 22 Q3 33 15 34 Q27 33 27 22 L22.5 19.5 L19 23 L15 19.5 L11 23 L7.5 19.5 Z" fill="#FFF4DC" stroke="#F4C27A" strokeWidth="1.4" />
            <g className="htop">
              <path d="M3 21.5 Q3 5 15 3 Q27 5 27 21.5 L22.5 19 L19 22.5 L15 19 L11 22.5 L7.5 19 Z" fill="#FFF4DC" stroke="#F4C27A" strokeWidth="1.4" />
            </g>
          </svg>
        ) : null}
      {Array.from({ length: Math.min(shownChicks, 6) }).map((_, i) => (
        <div key={i} className="chickwrap" ref={(el) => { chickEls.current[i] = el }} aria-hidden="true">
          <svg viewBox="0 0 24 24" className="chick" style={{ animationDelay: i * 0.37 + 's' }}>
            <ellipse cx="10.5" cy="14.5" rx="8" ry="7" fill="#FDE047" />
            <circle cx="14.5" cy="8.5" r="5" fill="#FDE047" />
            <path d="M18.8 8 L22.8 9.2 L18.8 10.4 Z" fill="#F59E0B" />
            <circle cx="15.7" cy="7.6" r="1" fill="#3B1D06" />
            <path d="M9.5 21 V23.4 M12.5 21 V23.4" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      ))}
      {wormOn && worm.current ? (
        <>
          {(
            <div className="wormspot" ref={spotEl} data-state="in" style={{ translate: `${worm.current.x - 20}px ${worm.current.y - 50}px` } as any} aria-hidden="true">
              <svg className="mound" viewBox="0 0 40 14">
                <ellipse cx="20" cy="9" rx="17" ry="5" fill="#5E3B1E" />
                <ellipse cx="20" cy="7.6" rx="15" ry="4.4" fill="#7B5128" />
                <ellipse cx="20" cy="7.2" rx="6.5" ry="2.3" fill="#24150a" />
                <circle cx="9" cy="8" r="1.1" fill="#9A6A38" /><circle cx="31" cy="8.6" r="1.3" fill="#9A6A38" /><circle cx="26" cy="5.6" r=".9" fill="#9A6A38" />
              </svg>
              {[0, 1, 2, 3, 4].map((i) => <i key={i} className="crumb" style={{ ['--dx' as any]: `${(i - 2) * 8 + (i % 2 ? 3 : -3)}px`, ['--dy' as any]: `${-14 - (i % 3) * 5}px`, animationDelay: `${i * 0.03}s` }} />)}
            </div>
          )}
          {(
          <div className="worm" ref={wormEl} data-state="up" style={{ translate: `${worm.current.x - 20}px ${worm.current.y - 50}px` } as any} aria-hidden="true">
            <div className="wormclip">
                <svg className="wormbody" viewBox="0 0 14 32">
                  {/* segmento 0 */}<circle className="seg" style={{ ["--i" as any]: 0 }} cx="7" cy="30.0" r="1.3" fill="#F9A8D4" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 1 */}<circle className="seg" style={{ ["--i" as any]: 1 }} cx="7" cy="27.1" r="1.9" fill="#F7A0CD" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 2 */}<circle className="seg" style={{ ["--i" as any]: 2 }} cx="7" cy="24.2" r="2.4" fill="#F9A8D4" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 3 */}<circle className="seg" style={{ ["--i" as any]: 3 }} cx="7" cy="21.3" r="2.7" fill="#F7A0CD" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 4 */}<circle className="seg" style={{ ["--i" as any]: 4 }} cx="7" cy="18.4" r="2.9" fill="#F9A8D4" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 5 */}<circle className="seg" style={{ ["--i" as any]: 5 }} cx="7" cy="15.5" r="2.9" fill="#F7A0CD" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 6 */}<circle className="seg" style={{ ["--i" as any]: 6 }} cx="7" cy="12.6" r="2.8" fill="#F9A8D4" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 7 */}<circle className="seg" style={{ ["--i" as any]: 7 }} cx="7" cy="9.7" r="2.7" fill="#F7A0CD" stroke="#F472B6" strokeWidth=".5" />
                  {/* segmento 8 */}<circle className="seg" style={{ ["--i" as any]: 8 }} cx="7" cy="6.8" r="2.6" fill="#F9A8D4" stroke="#F472B6" strokeWidth=".5" />
                  <g className="seg wormhead" style={{ ['--i' as any]: 9 }}>
                    <circle cx="7" cy="4.4" r="3.3" fill="#F472B6" />
                    <circle cx="8.4" cy="3.6" r=".85" fill="#3B1D06" />
                  </g>
                </svg>
            </div>
          </div>
          )}
          <div className="albareact" ref={reactEl} data-state="off" aria-hidden="true">
            <i>♥</i><i>★</i><i>♥</i>
          </div>
        </>
      ) : null}
      {shownChicks > 6 ? <small className="chickmore">+{shownChicks - 6}</small> : null}
      <div className="slimes" ref={slimeEl} aria-hidden="true" />
      {snailOn && snail.current ? (
        <>
          <div className="snail" ref={snailEl} data-state="crawl" style={{ translate: `${snail.current.x - 17}px ${snail.current.y - 11}px`, scale: snailFace.current < 0 ? '-1 1' : '1 1' } as any} aria-hidden="true">
            <svg viewBox="0 0 40 26" width="34" height="22">
              <path className="sfoot" d="M3 22 Q1.5 19 6 18.4 L26 17.6 Q30 17.4 31.4 13.4 Q32.4 9.8 35 10.6 Q37.4 12 35.8 16.6 Q33.6 22.4 28 23 L6 23 Q3.6 23 3 22 Z" fill="#CDBB96" stroke="#9C8A63" strokeWidth=".6" />
              <g className="sshell">
                <circle cx="16" cy="12" r="8.6" fill="#B9703A" stroke="#7E4722" strokeWidth=".7" />
                <path d="M16.4 12.2 a1.9 1.9 0 1 1 2.6 -1.7 a4.3 4.3 0 1 1 -6.6 3.9 a6.5 6.5 0 1 1 10.2 -5.2" fill="none" stroke="#F0C38E" strokeWidth="1.1" strokeLinecap="round" />
              </g>
              <g className="stent">
                <path d="M34.2 11 Q35.6 6 37.6 4.4" stroke="#9C8A63" strokeWidth="1" fill="none" strokeLinecap="round" />
                <circle cx="37.7" cy="4.2" r="1.15" fill="#3B1D06" />
                <path d="M32.6 10.6 Q32.4 5.4 33.5 3.6" stroke="#9C8A63" strokeWidth="1" fill="none" strokeLinecap="round" />
                <circle cx="33.6" cy="3.3" r="1.15" fill="#3B1D06" />
              </g>
            </svg>
          </div>
          {snailLine ? <div ref={snailBubbleRef} className="teaser snailteaser">{snailLine}</div> : null}
        </>
      ) : null}
      {bflyOn ? (
        <>
          <div className="albabug" ref={bflyEl} data-state="fly" style={{ translate: '-80px -80px' } as any} aria-hidden="true">
            {bflyOn === 'bee' ? (
              <svg viewBox="0 0 24 24" width="18" height="18">
                <ellipse className="wing" cx="8" cy="8" rx="3.6" ry="2.4" fill="#fff" opacity=".75" />
                <ellipse className="wing" cx="16" cy="8" rx="3.6" ry="2.4" fill="#fff" opacity=".75" />
                <ellipse cx="12" cy="13" rx="5.2" ry="4.2" fill="#FDE047" />
                <path d="M7.2 10.5 H16.8 M7 13 H17 M7.6 15.5 H16.4" stroke="#3B1D06" strokeWidth="1.3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22">
                <g className="bwing bwl">
                  <path d="M12 9 C8 2 2 4 3.5 9 C4.6 12.6 9 11.6 12 9 Z" fill="#F472B6" />
                  <path d="M12 9 C8.5 15 3.5 15.4 4.6 19 C5.8 22.7 10 20 12 15 Z" fill="#A78BFA" />
                </g>
                <g className="bwing bwr">
                  <path d="M12 9 C16 2 22 4 20.5 9 C19.4 12.6 15 11.6 12 9 Z" fill="#F9A8D4" />
                  <path d="M12 9 C15.5 15 20.5 15.4 19.4 19 C18.2 22.7 14 20 12 15 Z" fill="#C4B5FD" />
                </g>
                <path d="M12 5.4 V18 M12 6 Q10.4 3.4 9.4 3 M12 6 Q13.6 3.4 14.6 3" stroke="#3B1D06" strokeWidth="1.1" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <div className="albareact" ref={bflyReact} data-state="off" aria-hidden="true">
            <i>♥</i><i>★</i><i>♥</i>
          </div>
        </>
      ) : null}
    </div>
  )
}
