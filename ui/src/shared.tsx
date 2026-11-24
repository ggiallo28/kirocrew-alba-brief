import { useAppApi, useNotify } from '@kirocrew/app-sdk'
import LU, { Bike, Book, Briefcase, Building2, Calendar, Camera, Car, Cloud, Moon, Palette, Shield, Sun, Wrench, CheckSquare, Code, Coffee, Dumbbell, FileText, Folder, Gamepad2, GitBranch, Globe, GraduationCap, HardDrive, Hash, Heart, Home, Layers, Leaf, Lightbulb, Mail, MessageCircle, Music, Pipette, Plane, Rocket, ShoppingCart, Sparkles, Star, User, Users, Wallet } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { GmailLogo, GCalLogo, GDriveLogo, SlackLogo, DiscordLogo, LinkedInLogo, NotionLogo, LinearLogo, GitHubLogo, TelegramLogo, OutlookLogo, TeamsLogo, YouTrackLogo, TrelloLogo } from './brandIcons'
import { crewLangCode, dict, resolveLang } from './i18n'
import heroImages from '../../assets/hero-images.json'

export type Method = 'integration' | 'page' | 'integrazione' | 'pagina aperta' | 'folder'
export const isPage = (m: string) => m === 'page' || m === 'pagina aperta'
export type Health = { status: 'ok' | 'signin' | 'error'; checkedAt: string; detail?: string }
export type Account = { id: string; label: string; space: string; method: Method; enabled: boolean; verifiedAt?: string; patterns?: { include: string[]; exclude: string[] }; web?: { mode: 'free' | 'sites'; sites: string[]; block: string[] }; orgFilter?: { mode: 'include' | 'exclude'; orgs: string[] }; companyPage?: string; companyScope?: 'profile' | 'both' | 'company' }
export type Todo = { title: string; body?: string; source?: string; url?: string; space?: string; account?: string; done?: boolean }
export type Task = { id: string; title: string; tag?: string; hot?: boolean; body?: string; source?: string; url?: string; space?: string; account?: string; firstSeen: string; status: 'open' | 'done' | 'dismissed'; doneAt?: string; archived?: boolean; doneBy?: 'user' | 'source' }
export type Reminder = { id: string; text: string; createdAt: string; due?: string; status: 'pending' | 'delivered'; deliveredAt?: string }
export type Update = { title: string; tag?: string; hot?: boolean; body?: string; source?: string; url?: string; space?: string; account?: string }
export type Brief = {
  generatedAt?: string
  weekday?: string
  dateLabel?: string
  timeLabel?: string
  headline?: string
  caption?: string
  push?: { title: string; body?: string; prompt?: string; done?: boolean }
  todos?: Todo[]
  updates?: Update[]
  sources?: string[]
  unread?: string[]
  reminders?: { text: string; since?: string }[]
}
export type Config = { health?: Record<string, Health>; accounts: Record<string, Account[]>; spaces: string[]; brief?: Brief; tasks?: Task[]; reminders?: Reminder[]; lang?: string; spaceIcons?: Record<string, string>; spaceColors?: Record<string, string>; focus?: Record<string, Record<string, string>>; schedule?: { time: string; days: number[] }; frequency?: Record<string, { mode: 'every' | 'weekly' | 'off'; days?: number[] }>; about?: string; aboutBySpace?: Record<string, string>; location?: { region?: string; country?: string } }

// pool di gradienti per il banner e l'hero del brief: uno diverso per ogni brief generato (non per giorno - un brief
// rigenerato più volte nello stesso giorno ne prende comunque uno nuovo), scelto in modo stabile dal suo generatedAt
export const BANNER_GRADIENTS = [
  'linear-gradient(135deg,#f59e0b 0%,#ef4444 55%,#8b5cf6 100%)',
  'linear-gradient(135deg,#0ea5e9 0%,#6366f1 55%,#a855f7 100%)',
  'linear-gradient(135deg,#10b981 0%,#0ea5e9 55%,#6366f1 100%)',
  'linear-gradient(135deg,#f43f5e 0%,#ec4899 55%,#8b5cf6 100%)',
  'linear-gradient(135deg,#f59e0b 0%,#f43f5e 55%,#6366f1 100%)',
  'linear-gradient(135deg,#14b8a6 0%,#22c55e 55%,#eab308 100%)',
  'linear-gradient(135deg,#8b5cf6 0%,#ec4899 55%,#f59e0b 100%)',
  'linear-gradient(135deg,#0ea5e9 0%,#14b8a6 55%,#22c55e 100%)',
  'linear-gradient(135deg,#ef4444 0%,#f97316 55%,#eab308 100%)',
  'linear-gradient(135deg,#6366f1 0%,#8b5cf6 55%,#ef4444 100%)',
  'linear-gradient(135deg,#eab308 0%,#84cc16 55%,#06b6d4 100%)',
  'linear-gradient(135deg,#d946ef 0%,#6366f1 55%,#14b8a6 100%)',
  'linear-gradient(135deg,#f97316 0%,#eab308 55%,#10b981 100%)',
  'linear-gradient(135deg,#06b6d4 0%,#3b82f6 55%,#d946ef 100%)',
  'linear-gradient(135deg,#ef4444 0%,#8b5cf6 55%,#0ea5e9 100%)',
]
export const bannerFor = (key: string | undefined | null): string => {
  const s = String(key || '')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return BANNER_GRADIENTS[s ? h % BANNER_GRADIENTS.length : 0]!
}

// Pool di dipinti di pubblico dominio per lo sfondo della hero: niente impressionismo francese - ukiyo-e, romanticismo tedesco/inglese, scuola americana dell'Hudson
// River... Uno diverso per ogni brief generato, stessa logica di bannerFor/BANNER_GRADIENTS.
export type HeroImage = { url: string; artist: string; title: string; year: string }
// l'elenco sta in assets/hero-images.json: lo legge anche il backend, per mettere lo stesso dipinto nell'avviso di sistema
export const HERO_IMAGES: HeroImage[] = heroImages as HeroImage[]
export const heroImageFor = (key: string | undefined | null): HeroImage => {
  const s = String(key || '')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return HERO_IMAGES[s ? h % HERO_IMAGES.length : 0]!
}

export const APPS = [
  { key: 'gmail', name: 'Gmail', hint: 'Posta in arrivo, non letti e con stella', color: '#EA4335', Icon: GmailLogo },
  { key: 'calendar', name: 'Google Calendar', hint: 'Riunioni e impegni di oggi', color: '#4285F4', Icon: GCalLogo },
  { key: 'drive', name: 'Google Drive', hint: 'File modificati di recente', color: '#1FA463', Icon: GDriveLogo },
  { key: 'slack', name: 'Slack', hint: 'Menzioni, DM e canali scelti', color: '#E01E5A', Icon: SlackLogo },
  { key: 'discord', name: 'Discord', hint: 'Letto dalla pagina aperta, senza bot', color: '#5865F2', Icon: DiscordLogo },
  { key: 'linkedin', name: 'LinkedIn', hint: 'Statistiche del profilo, post, inviti e lavori', color: '#0A66C2', Icon: LinkedInLogo },
  { key: 'notion', name: 'Notion', hint: 'Pagine e aggiornamenti', color: '#9B9A97', Icon: NotionLogo },
  { key: 'linear', name: 'Linear', hint: 'Issue assegnate', color: '#5E6AD2', Icon: LinearLogo },
  { key: 'trello', name: 'Trello', hint: 'Schede assegnate e scadenze', color: '#0079BF', Icon: TrelloLogo },
  { key: 'github', name: 'GitHub', hint: 'Notifiche e pull request', color: '#8B949E', Icon: GitHubLogo },
  { key: 'outlook', name: 'Outlook', hint: '', color: '#0078D4', Icon: OutlookLogo },
  { key: 'teams', name: 'Microsoft Teams', hint: '', color: '#6264A7', Icon: TeamsLogo },
  { key: 'telegram', name: 'Telegram', hint: '', color: '#26A5E4', Icon: TelegramLogo },
  { key: 'youtrack', name: 'YouTrack', hint: '', color: '#FF318C', Icon: YouTrackLogo },
  { key: 'googlechat', name: 'Google Chat', hint: 'Messaggi diretti e tag', color: '#00897B', Icon: MessageCircle },
  { key: 'jira', name: 'Jira', hint: 'Issue assegnate a me', color: '#0052CC', Icon: Layers },
  { key: 'confluence', name: 'Confluence', hint: 'Pagine che osservo', color: '#172B4D', Icon: FileText },
  { key: 'web', name: 'Web', hint: 'Notizie dal web sui tuoi temi', color: '#0EA5E9', Icon: Globe },
  { key: 'folder', name: 'Local folder', hint: 'Cerca quello che scrivi nel focus', color: '#64748B', Icon: Folder },
  { key: 'claudecode', name: 'Claude Code', hint: 'Riprendi da dove avevi lasciato', color: '#D97757', Icon: Sparkles },
  { key: 'kiro', name: 'Kiro', hint: 'Riprendi da dove avevi lasciato', color: '#6366F1', Icon: GitBranch },
] as const

export const ICONS: Record<string, any> = {
  briefcase: Briefcase, home: Home, user: User, users: Users, heart: Heart, star: Star, code: Code, rocket: Rocket, book: Book,
  school: GraduationCap, cart: ShoppingCart, camera: Camera, music: Music, plane: Plane, coffee: Coffee, wallet: Wallet,
  building: Building2, game: Gamepad2, fitness: Dumbbell, idea: Lightbulb, globe: Globe, folder: Folder, sparkles: Sparkles, leaf: Leaf,
  wrench: Wrench, palette: Palette, shield: Shield, cloud: Cloud, sun: Sun, moon: Moon, bike: Bike, car: Car,
}
export const ALL_ICON = Layers
export const PickerIcon = Pipette
const defaultIcon = (name: string) => (/lavor|work|ufficio|office|azienda|company|trabaj|trabalh|travail|arbeit|bureau|büro/i.test(name) ? 'briefcase' : /person|privat|casa|home|famil|pessoal|maison|zuhause/i.test(name) ? 'user' : 'folder')
// Altre icone: il modulo lucide dell'host espone tutte le icone dal default export; le chiavi 'lu:Nome' sono quelle scelte dal selettore.
export const EXTRA_ICONS = 'Anchor Apple Archive Atom Award Baby Backpack Banknote Beaker Beer Bird Bone Bookmark Bot Brain Bug Bus Cake Calculator Candy Carrot Cat ChefHat Church Clapperboard Clock Compass Cookie Cpu Crown Diamond Dna Dog DollarSign Drama Droplet Drum Egg Factory Feather Fish FlaskConical Flag Flame Flower Footprints Gem Gift Glasses Guitar Hammer Hand Headphones Hotel Hourglass IceCream Image Key Landmark Languages Laptop Library LifeBuoy Lock Map MapPin Medal Mic Microscope Mountain Newspaper Paintbrush Paperclip PawPrint Pen Pencil Phone PiggyBank Pill Pizza Plug Popcorn Puzzle Radio Ruler Sailboat Sandwich Scale Scissors Server Ship Shirt ShoppingBag Smile Snowflake Soup Sprout Stethoscope Store Syringe Tag Target Telescope Tent Terminal Ticket Timer Train Trees Trophy Truck Tv Umbrella Utensils Video Waves Wheat Wifi Wind Wine Zap'.split(' ')
export const luIcon = (name: string): any => (LU as any)?.[name]
export const iconByKey = (key: string): any => ICONS[key] ?? (key.startsWith('lu:') ? luIcon(key.slice(3)) : undefined)
export const spaceIcon = (cfg: Config, name: string) => iconByKey(cfg.spaceIcons?.[name] ?? defaultIcon(name)) ?? Folder

export const SPACE_COLORS = ['#F59E0B', '#8B5CF6', '#10B981', '#EC4899', '#3B82F6', '#EF4444']
export const PALETTE = ['#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#FB7185', '#FDBA74', '#A3E635', '#2DD4BF', '#7DD3FC', '#C4B5FD', '#78716C', '#94A3B8', '#64748B', '#A16207', '#0F766E', '#1E3A8A', '#E11D48', '#65A30D', '#0284C7', '#9A3412']
export const spaceColor = (cfg: Config, name: string) => cfg.spaceColors?.[name] ?? SPACE_COLORS[Math.max(0, cfg.spaces.indexOf(name)) % SPACE_COLORS.length]

// chi parte da zero trova due profili con il nome nella propria lingua, non in quella di chi ha scritto l'app
const EMPTY: Config = { accounts: {}, spaces: (() => { try { return dict(resolveLang(crewLangCode())).defaultSpaces } catch { return ['Work', 'Personal'] } })() }
const CONFIG_PATH = '/api/apps/alba/config'

export function useLang() {
  const [code, setCode] = useState(crewLangCode)
  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => setCode(crewLangCode()))
    obs.observe(el, { attributes: true, attributeFilter: ['lang'] })
    return () => obs.disconnect()
  }, [])
  const lang = resolveLang(code)
  return { code, lang, t: dict(lang) }
}

// Scrive la lingua di Crew nel file letto dall'agente, così il riepilogo esce nella stessa lingua.
export function useLangSync() {
  const api = useAppApi() as any
  const { code } = useLang()
  useEffect(() => {
    let off = false
    api.get(CONFIG_PATH)
      .then((r: any) => {
        const c = r?.config ?? r ?? {}
        if (!off && c.lang !== code) return api.put(CONFIG_PATH, { ...c, lang: code })
      })
      .catch(() => {})
    return () => { off = true }
  }, [code])
}

// Stato condiviso: tutte le parti della pagina (schede, barra degli spazi, riepilogo) vedono gli stessi dati.
let cfgState: Config = EMPTY
let cfgLoaded = false
const cfgSubs = new Set<() => void>()
let cfgPoll: ReturnType<typeof setInterval> | undefined
let cfgTimer: ReturnType<typeof setTimeout> | undefined
let cfgPending: Partial<Config> = {}
let apiRef: any = null
let failRead = () => {}
let failSave = () => {}
const cfgEmit = () => cfgSubs.forEach((f) => f())
const cfgPull = (): Promise<any> =>
  apiRef.get(CONFIG_PATH).then((r: any) => {
    const c = r?.config ?? r
    return c && typeof c === 'object' ? c : {}
  })

function cfgStart() {
  cfgPull()
    .then((c: any) => { if (c.accounts) cfgState = { ...EMPTY, ...c } })
    .catch(() => failRead())
    .finally(() => { cfgLoaded = true; cfgEmit() })
  cfgPoll = setInterval(() => {
    cfgPull()
      .then((c: any) => {
        // l'agente e il controllo accessi scrivono anche `health` e i campi degli account: si leggono, salvo modifiche locali in corso
        const idle = cfgPending.accounts === undefined
        cfgState = { ...cfgState, brief: c.brief, tasks: c.tasks, reminders: c.reminders, health: c.health, ...(idle && c.accounts ? { accounts: c.accounts } : {}) }
        cfgEmit()
      })
      .catch(() => {})
  }, 15000)
}

// Scrive solo i campi cambiati sopra la versione più recente sul disco: il riepilogo scritto
// dall'agente non viene mai sovrascritto da una copia vecchia.
function cfgSave(patch: Partial<Config>) {
  cfgState = { ...cfgState, ...patch }
  cfgPending = { ...cfgPending, ...patch }
  cfgEmit()
  clearTimeout(cfgTimer)
  cfgTimer = setTimeout(async () => {
    const send = cfgPending
    cfgPending = {}
    try {
      const server = await cfgPull()
      await apiRef.put(CONFIG_PATH, { ...server, ...send })
    } catch {
      failSave()
    }
  }, 400)
}

// Promemoria: si applica l'operazione alla copia più recente sul disco, così non si perdono
// gli stati scritti dall'agente (consegnato, ecc.).
async function remOp(fn: (list: Reminder[]) => Reminder[]) {
  cfgState = { ...cfgState, reminders: fn(cfgState.reminders ?? []) }
  cfgEmit()
  try {
    const server = await cfgPull()
    await apiRef.put(CONFIG_PATH, { ...server, reminders: fn(server.reminders ?? []) })
  } catch {
    failSave()
  }
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
export const ymd = (d = new Date()) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x }

export function useConfig() {
  const api = useAppApi() as any
  const notify = useNotify()
  const { t } = useLang()
  const [, tick] = useState(0)
  apiRef = api
  failRead = () => notify(t.readFail)
  failSave = () => notify(t.saveFail)
  useEffect(() => {
    const f = () => tick((n) => n + 1)
    cfgSubs.add(f)
    if (cfgSubs.size === 1) cfgStart()
    return () => {
      cfgSubs.delete(f)
      if (cfgSubs.size === 0) { clearInterval(cfgPoll); cfgLoaded = false }
    }
  }, [])
  return {
    cfg: cfgState,
    loaded: cfgLoaded,
    save: (next: Config) => cfgSave({ accounts: next.accounts, spaces: next.spaces, spaceIcons: next.spaceIcons, spaceColors: next.spaceColors, focus: next.focus, schedule: next.schedule, frequency: next.frequency, about: next.about, aboutBySpace: next.aboutBySpace }),
    saveBrief: (brief: Brief) => cfgSave({ brief }),
    saveTasks: (tasks: Task[]) => cfgSave({ tasks }),
    addReminder: (r: Reminder) => remOp((l) => (l.some((x) => x.id === r.id) ? l : [...l, r])),
    removeReminder: (id: string) => remOp((l) => l.filter((x) => x.id !== id)),
  }
}

export const ALL = '*'
const FILTER_KEY = 'alba.filter'
const filterListeners = new Set<() => void>()
let filterVal = ALL
try { filterVal = localStorage.getItem(FILTER_KEY) ?? ALL } catch {}
export function useFilter(): [string, (v: string) => void] {
  const [, tick] = useState(0)
  useEffect(() => {
    const f = () => tick((n) => n + 1)
    filterListeners.add(f)
    return () => void filterListeners.delete(f)
  }, [])
  const set = (v: string) => {
    filterVal = v
    try { localStorage.setItem(FILTER_KEY, v) } catch {}
    filterListeners.forEach((f) => f())
  }
  return [filterVal, set]
}
const manageListeners = new Set<() => void>()
let manageVal = false
export function useManage(): [boolean, (v: boolean) => void] {
  const [, tick] = useState(0)
  useEffect(() => {
    const f = () => tick((n) => n + 1)
    manageListeners.add(f)
    return () => void manageListeners.delete(f)
  }, [])
  return [manageVal, (v: boolean) => { manageVal = v; manageListeners.forEach((f) => f()) }]
}
export const accountsIn = (cfg: Config, s: string): number =>
  Object.values(cfg.accounts).reduce((n, l) => n + l.filter((a) => s === ALL || a.space === s).length, 0)

const itemsOf = (cfg: Config): { space?: string }[] => [
  ...(cfg.tasks ?? cfg.brief?.todos ?? []).filter((x: any) => (x.status ?? 'open') === 'open'),
  ...(cfg.brief?.updates ?? []),
]
export const spacesOf = (cfg: Config): string[] =>
  Array.from(new Set([...cfg.spaces, ...(itemsOf(cfg).map((i) => i.space).filter(Boolean) as string[])]))
export const countIn = (cfg: Config, s: string): number => itemsOf(cfg).filter((i) => s === ALL || i.space === s).length

const SPACE_KEY = 'alba.space'
export function useSpace(): [string, (s: string) => void] {
  const [space, setSpace] = useState<string>(() => {
    try { return localStorage.getItem(SPACE_KEY) ?? '*' } catch { return '*' }
  })
  const set = (s: string) => {
    setSpace(s)
    try { localStorage.setItem(SPACE_KEY, s) } catch {}
  }
  return [space, set]
}

export const countAccounts = (cfg: Config) => Object.values(cfg.accounts).reduce((n, l) => n + l.length, 0)
export const initials = (s: string) => (s.replace(/@.*/, '').match(/[A-Za-z0-9]/g) ?? ['?']).slice(0, 2).join('').toUpperCase()

const CSS = `
.mb{position:relative;color:var(--text);flex:1;min-height:0;overflow:hidden;font-family:var(--font-body,inherit);display:flex;flex-direction:column}
.mb .scroll{flex:1;min-height:0;overflow-y:auto;padding:28px 32px 14px;display:flex;flex-direction:column}
.mb *{box-sizing:border-box}
.mb h1{font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0;color:var(--text-strong)}
.mb .sub{color:var(--muted);margin:4px 0 0;font-size:14px}
.mb .serif{font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif}
.mb .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px}
.mb .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;transition:transform .15s,box-shadow .15s}
.mb .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.18)}
.mb .head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.mb .tile{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;flex:none}
.mb .head b{display:block;font-size:15px;color:var(--text-strong)}.mb .head span{font-size:12px;color:var(--muted)}
.mb .count{margin-left:auto;font-size:12px;font-weight:600;padding:3px 9px;border-radius:99px;background:var(--bg-elevated);color:var(--muted)}
.mb .acc.ghost{visibility:hidden;pointer-events:none}
.mb .acc{display:flex;flex-wrap:nowrap;align-items:center;gap:10px;padding:8px;border-radius:12px;background:var(--bg-elevated);margin-bottom:8px}
.mb .acc>.av{flex:none}.mb .acc>input.l{flex:1 1 110px!important;min-width:100px!important}.mb .acc>.tag{flex:0 1 auto;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
.mb .accinfo{display:flex;align-items:center;gap:8px;flex:1 1 auto;min-width:0}
.mb .accinfo select{flex:none;max-width:45%;margin-left:auto}
.mb .acctools{flex:none;display:flex;flex-wrap:wrap;justify-content:flex-end;align-items:center;gap:6px;width:96px}
.mb .acc.off{opacity:.5}
.mb .av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff;flex:none}
.mb .acc input.l{flex:1;min-width:0;background:transparent;border:0;color:var(--text-strong);font-size:13px;outline:none}
.mb .orginput{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:7px 10px;color:var(--text-strong);font-size:13px;font:inherit}
.mb .orginput:focus{border-color:var(--border-hover);outline:none}
/* account non ancora collegato: il tasto per collegarlo richiama l'attenzione con un anello che si allarga e svanisce */
.mb .ib.need{position:relative;color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.mb .ib.need::after{content:"";position:absolute;inset:-1px;border-radius:inherit;border:1.5px solid var(--accent);pointer-events:none;animation:albaNeed 1.9s cubic-bezier(.2,.7,.3,1) infinite}
@keyframes albaNeed{0%{opacity:.85;transform:scale(1)}70%{opacity:0;transform:scale(1.45)}100%{opacity:0;transform:scale(1.45)}}
@media (prefers-reduced-motion:reduce){.mb .ib.need::after{animation:none;opacity:0}}
.mb select,.mb .add input{background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:5px 8px;font-size:12px}
.mb .ib{background:transparent;border:0;color:var(--muted);cursor:pointer;padding:5px;border-radius:8px;display:grid;place-items:center}
.mb .ib:hover{background:var(--bg-hover);color:var(--text-strong)}
.mb .add{display:flex;gap:8px;margin-top:4px}.mb .add input{flex:1;min-width:0;padding:8px 10px;font-size:13px}
.mb .tabs{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 -32px 28px;padding:12px 32px;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.mb .tabbtn{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:99px;padding:7px 14px;font-size:13px;font-weight:600;cursor:pointer;transition:all .12s}
.mb .tabbtn:hover{border-color:var(--border-hover)}
.mb .tabbtn.on{color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.mb .tabbtn kbd{font:inherit;font-size:10px;opacity:.6;border:1px solid currentColor;border-radius:4px;padding:0 4px}
.mb .dot{width:8px;height:8px;border-radius:50%}
.mb .tabbtn small{font-size:11px;opacity:.75}
.mb .newspace{background:var(--card);color:var(--text);border:1px dashed var(--border-hover);border-radius:99px;padding:7px 14px;font-size:13px;width:150px}
.mb .empty{border-style:dashed;background:transparent;opacity:.85}
.mb .tag{font-size:11px;padding:2px 8px;border-radius:99px;background:var(--bg-elevated);color:var(--muted)}
.mb .topbar{position:relative;z-index:15;display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:-28px -32px 22px;padding:14px 32px 12px;border-bottom:1px solid transparent}
.mb .fchips{display:flex;gap:6px;align-items:center;flex:none}
.mb .topbar .banner{align-self:stretch;min-height:46px;flex:1 1 280px}
.mb .mainTabs{display:flex;gap:4px;padding:4px;border-radius:14px;background:var(--bg-elevated);width:fit-content;flex:none}
.mb .banner{position:relative;overflow:hidden;flex:1;min-width:0;display:grid;grid-template-columns:1fr auto;align-items:center;gap:14px;padding:5px 14px 5px 18px;min-height:46px;border-radius:12px;color:var(--text-strong);
  background:var(--card);border:1px solid var(--border);--grad:linear-gradient(135deg,#f59e0b 0%,#ef4444 55%,#8b5cf6 100%)}
.mb .banner:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--grad);opacity:.9}
.mb .banner .bt>svg{color:#f59e0b}
.mb .banner .st.sched{border:0;color:inherit;font:inherit;font-size:12px;cursor:pointer;display:inline-flex;gap:4px;align-items:baseline}.mb .banner .st.sched:hover{border-color:var(--border-strong);color:var(--text-strong)}
.mb .schedpop{position:absolute;transform:translateX(-50%);top:calc(100% - 8px);z-index:40;width:290px;max-width:calc(100% - 32px);box-sizing:border-box;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:14px;padding:14px;box-shadow:0 12px 32px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:10px}
.mb .schedpop h4{margin:0;font-size:13px}.mb .schedpop p{margin:0;font-size:11.5px;color:var(--muted);line-height:1.4}
.mb .schedpop select{font:inherit;font-size:15px;padding:6px 8px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text)}
.mb .schedpop input[type=time]{font:inherit;font-size:15px;padding:6px 8px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);width:max-content}
.mb .schedpop .days{display:flex;flex-wrap:wrap;gap:6px}.mb .schedpop .days button{border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:99px;padding:5px 10px;font:inherit;font-size:12px;cursor:pointer}.mb .schedpop .days button.on{background:#C2410C;border-color:transparent;color:#fff}
.mb .card{position:relative}.mb .ib.spin svg{animation:albaSpin 1s linear infinite;transform-origin:50% 50%}.mb .acc .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;color:var(--text)}.mb .card.up{z-index:60}
.mb .av{position:relative;border:0;padding:0;cursor:pointer;font-family:inherit}
.mb .sdot{position:absolute;right:-2px;bottom:-2px;width:11px;height:11px;border-radius:50%;border:2px solid var(--bg-elevated);box-sizing:border-box;background:#6b7280}
.mb .sdot.ok{background:#22c55e}.mb .sdot.warn{background:#eab308}.mb .sdot.bad{background:#ef4444}.mb .sdot.none,.mb .acc.off .sdot{background:#6b7280}
.mb .sdot.busy{animation:albaPulse 1s ease-in-out infinite}
.mb .acc{position:relative}
.mb .avpop{position:absolute;left:0;top:calc(100% + 6px);z-index:30;width:280px;max-width:calc(100vw - 48px);box-sizing:border-box;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:12px;padding:12px;box-shadow:0 12px 32px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:6px;font-size:12px}
.mb .avpop b{font-size:13px;word-break:break-all}.mb .avpop .r{display:flex;gap:6px;align-items:center;color:var(--muted)}.mb .avpop .r i{width:9px;height:9px;border-radius:50%;flex:none;background:#6b7280}.mb .avpop .r.ok i{background:#22c55e}.mb .avpop .r.warn i{background:#eab308}.mb .avpop .r.bad i{background:#ef4444}.mb .avpop .r.ok,.mb .avpop .r.warn,.mb .avpop .r.bad{color:var(--text)}
.mb .fpop{position:absolute;right:0;top:calc(100% + 6px);z-index:30;width:270px;max-width:calc(100vw - 48px);box-sizing:border-box;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:12px;padding:12px;box-shadow:0 12px 32px rgba(0,0,0,.35)}.mb .ib.act{color:#C2410C}
.mb .fpop .fq,.mb .avpop .fq{display:flex;flex-direction:column;gap:7px;margin-top:6px;padding-top:9px;border-top:1px solid var(--border)}.mb .fpop .fq{display:flex;flex-direction:column;gap:7px}.mb .fpop .fq h5{margin:0;font-size:12.5px}.mb .fpop .fq label{display:flex;gap:7px;align-items:center;font-size:12.5px;cursor:pointer}.mb .fpop .fq .days{display:flex;flex-wrap:wrap;gap:5px;margin:-2px 0 0 22px}.mb .fpop .fq .days button{border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:99px;padding:3px 8px;font:inherit;font-size:11.5px;cursor:pointer}.mb .fpop .fq .days button.on{background:#C2410C;border-color:transparent;color:#fff}.mb .fpop .fq p{margin:0;font-size:11px;color:var(--muted);line-height:1.4}
.mb .avpop .fq h5{margin:0;font-size:12px;color:var(--text)}.mb .avpop .fq label{display:flex;gap:7px;align-items:center;font-size:12.5px;cursor:pointer;color:var(--text)}.mb .avpop .fq .days{display:flex;flex-wrap:wrap;gap:5px;margin:-2px 0 0 22px}.mb .avpop .fq .days button{border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:99px;padding:3px 8px;font:inherit;font-size:11.5px;cursor:pointer}.mb .avpop .fq .days button.on{background:#C2410C;border-color:transparent;color:#fff}.mb .avpop .fq p{margin:0;font-size:11px;color:var(--muted);line-height:1.4}
.mb .freq{display:inline-flex;align-items:center;gap:5px;margin-top:4px;padding:2px 9px;border:1px solid var(--border);border-radius:99px;background:transparent;color:var(--muted);font:inherit;font-size:11.5px;cursor:pointer}.mb .freq:hover{border-color:var(--border-hover);color:var(--text)}
.mb .freqpop{position:absolute;left:50%;transform:translateX(-50%);top:78px;z-index:30;width:270px;max-width:calc(100% - 20px);box-sizing:border-box;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:14px;padding:14px;box-shadow:0 12px 32px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:9px}
.mb .freqpop h4{margin:0;font-size:13px}.mb .freqpop label{display:flex;gap:8px;align-items:center;font-size:13px;cursor:pointer}.mb .freqpop .days{display:flex;flex-wrap:wrap;gap:5px;margin:-2px 0 0 24px}.mb .freqpop .days button{border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:99px;padding:4px 9px;font:inherit;font-size:11.5px;cursor:pointer}.mb .freqpop .days button.on{background:#C2410C;border-color:transparent;color:#fff}.mb .freqpop p{margin:0;font-size:11.5px;color:var(--muted);line-height:1.4}
.mb .banner .refresh{margin-left:auto;align-self:center;position:relative;z-index:2}.mb .banner .refresh:disabled{opacity:.7;cursor:default}.mb .banner .refresh.spin svg{animation:albaSpin 1s linear infinite;transform-origin:50% 50%}@keyframes albaSpin{to{transform:rotate(360deg)}}.mb .banner .refresh.spin{animation:albaPulse 1.2s ease-in-out infinite}@keyframes albaPulse{50%{opacity:.55}}
.mb .banner .bt{display:flex;align-items:center;gap:10px;min-width:0;position:relative;z-index:1}
.mb .banner b{font-size:17px;letter-spacing:-.01em}
.mb .banner small{font-size:11px;opacity:.75;font-weight:600}
.mb .banner .bs{font-size:12px;opacity:.88;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mb .banner .stats2{justify-self:end;display:flex;gap:8px;position:relative;z-index:1}
.mb .banner .mainTabs{position:relative;z-index:2;background:rgba(0,0,0,.28);backdrop-filter:blur(8px)}
.mb .banner .maintab{color:var(--muted)}
.mb .banner .maintab.on{background:var(--accent);color:var(--accent-fg)}
.mb .banner .st{background:var(--bg);border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:3px 10px;font-size:12px;white-space:nowrap}
.mb .banner .st b{color:var(--text-strong)}
.mb .banner .st b{font-size:13px;margin-right:4px}
.mb .banner small{font-size:11px;opacity:.75;font-weight:600}
@media (max-width:900px){.mb .banner .bs{display:none}}
@media (max-width:700px){.mb .banner .stats2{display:none}}
.mb .maintab{display:inline-flex;align-items:center;gap:8px;border:0;background:transparent;color:var(--muted);font-size:14px;font-weight:600;padding:8px 16px;border-radius:10px;cursor:pointer}
.mb .maintab.on{background:var(--accent);color:var(--accent-fg)}
.mb .pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:99px;font-size:12px;font-weight:600;color:#fff}

/* ---- Oggi: schema "brief" ---- */
.mb .paper{position:relative;max-width:none;margin:0;padding:0 76px}
.mb .stage{position:relative}
.mb .vside{position:absolute;top:50%;font-family:Didot,"Bodoni 72","Bodoni MT","Playfair Display","Iowan Old Style",Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(30px,2.5vw,40px);letter-spacing:.07em;line-height:1;white-space:nowrap;color:var(--text-strong);writing-mode:vertical-rl;font-variant-numeric:lining-nums;font-feature-settings:"lnum" 1;text-transform:uppercase}
.mb .vleft{left:-60px;transform:translateY(-50%) rotate(180deg)}
.mb .vright{right:-60px;transform:translateY(-50%) rotate(180deg)}
.mb .mark{display:grid;place-items:center;margin:0 0 18px}
.mb .hero{position:relative;height:clamp(260px,40vh,440px);border-radius:3px;overflow:hidden;display:grid;place-items:center;text-align:center;
  background-size:cover;background-position:center 42%;box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),0 18px 40px -24px rgba(0,0,0,.6)}
.mb .hero .ttl{position:relative;color:#fff;line-height:.95;text-shadow:0 1px 2px rgba(0,0,0,.45),0 4px 28px rgba(0,0,0,.55)}
.mb .hero .ttl i{display:block;font-size:clamp(22px,2.2vw,30px);margin-bottom:8px;opacity:.94}
.mb .hero .ttl b{display:block;font-weight:400;font-size:clamp(56px,8vw,96px);letter-spacing:-.015em}
.mb .unreadwrap{position:absolute;right:-56px;bottom:6px}
.mb .unreadbtn{color:var(--muted);background:var(--card);border:1px solid var(--border);box-shadow:0 2px 8px rgba(0,0,0,.18)}
.mb .unreadbtn:hover{color:var(--text-strong)}
.mb .unreadpop{position:absolute;top:calc(100% + 8px);right:0;z-index:30;width:min(360px,calc(100vw - 48px));box-sizing:border-box;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:14px;padding:14px 16px;box-shadow:0 18px 44px rgba(0,0,0,.4);font-style:normal;font-size:13px;line-height:1.4}
.mb .unreadpop b{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin-bottom:8px}
.mb .unreadpop ul{margin:0;padding-left:18px;display:grid;gap:6px}
.mb .cap{display:flex;justify-content:space-between;align-items:baseline;gap:24px;font-size:11px;letter-spacing:.04em;color:var(--muted);margin:9px 0 40px}
.mb .cap .who{text-transform:uppercase;letter-spacing:.09em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.mb .cap .art{font-style:italic;white-space:nowrap;flex:none}
@media (max-width:700px){.mb .cap .who{display:none}}
.mb .lead{font-style:italic;font-size:clamp(24px,2.3vw,33px);line-height:1.28;color:var(--muted);margin:0 0 44px;max-width:38em;text-wrap:balance}
.mb .cols{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:72px;align-items:start}
.mb .cols>div{min-width:0}
@media (max-width:1100px){.mb .cols{grid-template-columns:1fr;gap:0}}
.mb .sec{display:flex;align-items:flex-end;justify-content:space-between;margin:0 0 18px}
/* scheda compatta: titolo di sezione e azione sulla stessa riga, il testo sotto a tutta larghezza; alta quanto il contenuto */
.mb .sect.push{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"head go" "body body";column-gap:24px;row-gap:12px;align-items:center;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px 30px 24px;overflow:visible}
.mb .sect.push .sec{display:contents}
.mb .sect.push .sec h2{grid-area:head;margin:0;font-size:22px;letter-spacing:.01em;line-height:1.15;color:var(--muted)}
.mb .sect.push .golink{grid-area:go;margin:0;display:inline-flex;align-items:center;gap:6px}
.mb .sect.push .pushbody{grid-area:body;min-width:0}
.mb .sect.push .pushbody h3{margin:0 0 6px;font-size:19px}
.mb .sect.push .pushbody p{margin:0}
/* l'uovo resta, ma piccolo e fermo: un segno accanto all'azione scritta, non un pulsante-giocattolo */
.mb .sect.push .go{display:inline-flex;align-items:center;gap:10px;width:auto;height:auto;margin:0;padding:5px 14px 5px 8px;border-radius:99px;border:1px solid var(--border);background:transparent;transform:none;transition:background .15s,border-color .15s}
.mb .sect.push .go:hover{transform:none;background:var(--bg-elevated);border-color:var(--border-strong)}
.mb .sect.push .go.hatched{transform:none}
.mb .sect.push .go .burst{position:static;width:26px;height:26px;flex:none;filter:none}
.mb .sect.push .go .golbl{display:inline-grid}
.mb .sect.push .go .golbl i{grid-area:1/1;font-style:italic;transition:opacity .25s}
.mb .sect.push .go .golbl i.off{opacity:0;visibility:hidden}
.mb .sect.push .go span{position:static;color:var(--text-strong);font-style:italic;font-weight:400;font-size:17px;line-height:1.1;white-space:nowrap}
.mb .sect.push .go.hatched span{color:var(--muted)}
.mb .sect.push .gocheck{position:static;opacity:0}
.mb .sect.push:hover .gocheck,.mb .sect.push .gocheck:focus-visible{opacity:1}
.mb .sect.push .gocard{left:auto;right:0;top:calc(100% + 10px)}
@media (max-width:640px){.mb .sect.push{grid-template-columns:1fr;grid-template-areas:"head" "body" "go";padding:20px}.mb .sect.push .golink{justify-self:start}}
.mb .sec h2{font-style:italic;font-weight:400;font-size:30px;margin:0;color:var(--text-strong)}
.mb .golink{position:relative;flex:none}
.mb .go{position:relative;width:118px;height:132px;margin:-42px 0 -42px;border:0;background:none;padding:0;cursor:pointer;transform:rotate(-9deg);transition:transform .25s cubic-bezier(.2,1.4,.4,1);font-family:inherit}
.mb .go:hover{transform:rotate(-3deg) scale(1.08)}
.mb .gocheck{position:absolute;right:-2px;bottom:4px;width:24px;height:24px;border-radius:50%;border:1px solid var(--border-strong);background:var(--card);color:var(--muted);display:grid;place-items:center;cursor:pointer;padding:0;opacity:0;transition:opacity .15s,color .15s}.mb .golink:hover .gocheck,.mb .gocheck:focus-visible{opacity:1}.mb .gocheck:hover{color:var(--text-strong)}
.mb .go.hatched{transform:rotate(-4deg)}
.mb .go .hatchsvg .eggp{fill:#FFE2C4;stroke:#F0B987;stroke-width:1.2}.mb .go .hatchsvg .shine{fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;opacity:.7}
.mb .go .hatchsvg .hs-cap{transform-box:view-box;transform-origin:13px 54px;transform:rotate(-62deg);animation:albaHatchTop .7s cubic-bezier(.3,1.3,.5,1) .1s both}
@keyframes albaHatchTop{0%{transform:rotate(0deg)}100%{transform:rotate(-62deg)}}
.mb .go .hatchsvg .hs-chick{transform-box:fill-box;transform-origin:50% 100%;animation:albaChickUp .6s cubic-bezier(.3,1.4,.5,1) .25s both,albaChickBob 2.6s ease-in-out 1s infinite}
@keyframes albaChickUp{0%{translate:0 14px}100%{translate:0 0}}
@keyframes albaChickBob{0%,100%{translate:0 0}50%{translate:0 -1.4px}}
@keyframes albaChickBob{0%,100%{translate:0 0}50%{translate:0 -1.6px}}
.mb .go .burst{position:absolute;inset:0;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 8px 12px rgba(0,0,0,.4))}.mb .go .eggp{fill:#FFE2C4;stroke:#F0B987;stroke-width:1.2}.mb .go .shine{fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;opacity:.7}
.mb .go span{position:absolute;left:0;right:0;top:48px;display:block;color:#5a2d0c;font-style:italic;font-weight:700;font-size:19px;line-height:1.08;text-align:center}
.mb .gocard{position:absolute;left:calc(100% + 26px);top:-28px;width:310px;max-width:calc(100vw - 40px);padding:14px 16px;border-radius:14px;background:var(--card);border:1px solid var(--border);box-shadow:0 18px 44px rgba(0,0,0,.5);opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .16s,transform .22s;z-index:30;text-align:left}
.mb .golink:hover .gocard{opacity:1;transform:none}
.mb .gocard b{display:flex;align-items:center;gap:8px;font-weight:500;font-size:15px;color:var(--text-strong);margin-bottom:8px}
.mb .gocard i{display:block;font-size:13px;line-height:1.5;color:var(--muted)}
.mb .itemchat{display:inline-grid;place-items:center;vertical-align:-3px;margin-left:6px;border:0;background:none;color:var(--muted);cursor:pointer;padding:2px;border-radius:6px;opacity:0;transition:opacity .15s,color .15s,background .15s}
.mb .todo:hover .itemchat,.mb .upd:hover .itemchat,.mb .itemchat:focus-visible{opacity:1}
.mb .itemchat:hover{color:var(--text-strong);background:var(--bg-elevated)}
.mb .updfoot{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.mb .updfoot .tagrow{margin:0}
.mb .votes{display:inline-flex;gap:2px;margin-left:auto;opacity:0;transition:opacity .15s}
.mb .upd:hover .votes,.mb .votes:focus-within,.mb .votes.set{opacity:1}
.mb .vote{display:grid;place-items:center;width:26px;height:26px;border:0;background:none;color:var(--muted);border-radius:7px;cursor:pointer;transition:color .15s,background .15s}
.mb .vote:hover{color:var(--text-strong);background:var(--bg-elevated)}
.mb .vote.on{color:var(--accent)}.mb .vote.down.on{color:#f87171}
.mb .push h3,.mb .todo h3,.mb .upd h3{font-family:var(--font-body,inherit);font-size:17px;font-weight:500;color:var(--text-strong);margin:0}
.mb .push p,.mb .todo p,.mb .upd p{color:var(--muted);font-size:15px;line-height:1.7;margin:8px 0 0}
.mb .sect{margin-bottom:64px}
.mb .todo{display:flex;gap:18px;margin:0 -14px 34px;padding:10px 14px;border-radius:14px;transition:background .15s}
.mb .todo:hover{background:var(--bg-elevated)}
.mb .circle{width:24px;height:24px;border-radius:50%;border:1.5px solid var(--border-hover);background:transparent;flex:none;margin-top:2px;cursor:pointer;display:grid;place-items:center;color:var(--accent-fg)}
.mb .circle.on{background:var(--accent);border-color:var(--accent)}
.mb .todo.done h3{text-decoration:line-through;color:var(--muted)}
.mb .src{display:inline-grid;place-items:center;vertical-align:-3px;margin-left:8px;border-radius:6px;padding:2px;cursor:pointer;text-decoration:none;transition:transform .15s,background .15s}
.mb a.src:hover{transform:scale(1.18);background:var(--bg-elevated)}
.mb .upd{display:flex;gap:18px;margin:0 -14px 34px;padding:10px 14px;border-radius:14px;transition:background .15s}
.mb .upd:hover{background:var(--bg-elevated)}
.mb .upd .n{color:var(--muted-strong);font-size:13px;width:26px;flex:none;padding-top:3px}
.mb .upd h3 em,.mb .todo h3 em{color:var(--muted);font-weight:400;font-style:italic;margin-left:8px;font-size:15px}.mb h3 em.hot{color:var(--accent);font-weight:600}
.mb .foot{height:18px;margin:auto 0 0;flex:none;text-align:right;color:var(--muted);font-size:12px;line-height:18px;letter-spacing:.01em;display:flex;flex-wrap:nowrap;white-space:nowrap;overflow:hidden;gap:0 9px;justify-content:flex-end;align-items:center;opacity:.72;transition:opacity .2s;pointer-events:none}
.mb .foot span.s{display:inline-flex;align-items:center;gap:5px;color:var(--muted)}
.mb .foot span.s svg{opacity:.85}
.mb .foot.hide{opacity:0}
.mb .page{padding-bottom:84px}
.mb .page>h1{margin:10px 0 20px;line-height:1.1}
.mb .warn{margin-top:18px;text-align:center;color:var(--muted);font-size:13px}
.mb .blank{padding:40px;text-align:center;color:var(--muted)}
.mb .tagrow{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.mb .itag{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-body,inherit);font-size:11px;font-weight:600;padding:3px 9px;border-radius:99px;background:var(--bg-elevated);color:var(--text)}
.mb .itag i{width:7px;height:7px;border-radius:50%;display:block}
.mb .itag.acc{font-weight:400;color:var(--muted);background:transparent;border:1px solid var(--border)}
.mb .filter{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 26px;font-family:var(--font-body,inherit)}
.mb .age{font-family:var(--font-body,inherit);font-size:11px;color:var(--muted);margin-left:8px;font-weight:400}
.mb .age.late{color:var(--danger,#ef4444);font-weight:600}
.mb .rowbtns{display:flex;gap:10px;margin-top:8px;font-family:var(--font-body,inherit)}
.mb .lnk{background:none;border:0;padding:0;color:var(--muted);font-size:12px;cursor:pointer;text-decoration:underline;display:inline-flex;align-items:center;gap:5px}
.mb .lnk svg{flex:none}
.mb .lnk:hover{color:var(--text-strong)}
.mb .parked{opacity:.65}
.mb .fold summary{cursor:pointer;color:var(--muted);font-family:var(--font-body,inherit);font-size:13px;margin:6px 0 18px}
.mb .ichip{position:relative;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;transition:all .12s;padding:0}
.mb .ichip:hover{border-color:var(--border-hover)}
.mb .ichip.on{color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.mb .picker{display:flex;flex-wrap:wrap;gap:6px;margin:-12px 0 22px;padding:10px;background:var(--card);border:1px solid var(--border);border-radius:12px;width:fit-content;max-width:100%}
.mb .panel .sep{width:1px;align-self:stretch;background:var(--border)}
.mb .panel .lbl{font-size:12px;color:var(--muted)}
.mb .dock{position:absolute;left:50%;bottom:36px;transform:translateX(-50%);z-index:20;display:flex;align-items:center;gap:6px;padding:6px;border-radius:18px;
  background:color-mix(in srgb,var(--bg-elevated) 86%,transparent);backdrop-filter:blur(14px);border:1px solid var(--border-strong,var(--border));box-shadow:0 10px 34px rgba(0,0,0,.4)}
.mb .dock .ichip.side{margin:0 8px;border:1px solid var(--border-strong,var(--border));
  box-shadow:inset 0 2px 4px rgba(0,0,0,.38),inset 0 -1px 0 rgba(255,255,255,.05)}
.mb .dock .ichip.side:hover{border-color:var(--border-hover)}
.mb .dock .ichip.side.on{border-color:transparent;box-shadow:inset 0 2px 4px rgba(0,0,0,.3),inset 0 -1px 0 rgba(255,255,255,.14)}
.mb .dock .ichip{--c:var(--accent);transition:transform .22s cubic-bezier(.2,1.4,.4,1),box-shadow .25s,border-color .25s,background .28s,color .28s}
.mb .dock .ichip:hover{transform:translateY(-4px) scale(1.1);box-shadow:0 10px 22px color-mix(in srgb,var(--c) 45%,transparent),0 0 0 1px color-mix(in srgb,var(--c) 70%,transparent)}
.mb .dock .ichip[data-tip]::after{content:attr(data-tip);position:absolute;left:50%;top:calc(100% + 22px);z-index:30;transform:translate(-50%,-6px);opacity:0;pointer-events:none;white-space:nowrap;
  font-size:12px;font-weight:700;letter-spacing:.04em;line-height:1.2;
  background:linear-gradient(110deg,var(--c) 0%,#fff 45%,var(--c) 90%);background-size:240% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;
  transition:opacity .16s,transform .3s cubic-bezier(.2,1.2,.4,1)}
.mb .dock .ichip[data-tip]:hover::after{opacity:1;transform:translate(-50%,0);animation:albaShine 1.6s linear infinite}
@keyframes albaShine{from{background-position:0 0}to{background-position:-240% 0}}
@media (prefers-reduced-motion:reduce){.mb .dock .ichip,.mb .dock .ichip::after{transition:none!important;animation:none!important}}
.mb .dock.edit .ichip:not(.side):not([data-all]){cursor:grab;touch-action:none;user-select:none}
.mb .dock.dragging-any .ichip::after{display:none}
.mb .dock .addslot{display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden;height:36px;width:0;line-height:0;margin-left:-6px;opacity:0;transform:scale(.5);pointer-events:none;transition:width .3s cubic-bezier(.2,.8,.2,1),margin-left .3s cubic-bezier(.2,.8,.2,1),opacity .22s,transform .3s cubic-bezier(.2,1.3,.4,1)}
.mb .dock.edit .addslot{width:36px;margin-left:0;opacity:1;transform:none;pointer-events:auto;overflow:visible}
.mb .dock .addslot .ichip{margin:0;flex:none}
.mb .dock .ichip.add{border:1.5px dashed var(--border-hover);color:var(--muted);background:transparent}
.mb .dock .ichip.add:hover,.mb .dock .ichip.add.on{color:var(--text-strong);border-color:var(--text-strong)}
@media (prefers-reduced-motion:reduce){.mb .dock .addslot{transition:none}}
.mb .dock .sep{width:1px;height:22px;background:var(--border);margin:0 2px}
.mb .dockpop{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%);display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;width:max-content;max-width:min(560px,92vw);padding:10px 12px;border-radius:14px;
  background:var(--card);border:1px solid var(--border);box-shadow:0 14px 40px rgba(0,0,0,.45)}
.mb .dockpop .lbl{font-size:12px;color:var(--muted);width:100%;text-align:center}
.mb .dockpop .sep{width:100%;height:1px;background:var(--border)}
.mb .sw{width:22px;height:22px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
.mb .sw.on{border-color:var(--text-strong)}
.mb .swpick{position:relative;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;border:1.5px dashed var(--border-hover);color:var(--muted);cursor:pointer;overflow:hidden;transition:color .15s,border-color .15s}
.mb .swpick:hover{color:var(--text-strong);border-color:var(--text-strong)}
.mb .swpick.on{border:2px solid var(--text-strong);color:#fff}
.mb .swpick input{position:absolute;inset:-6px;width:calc(100% + 12px);height:calc(100% + 12px);opacity:0;cursor:pointer;border:0;padding:0}
.mb .pgroup{display:flex;flex-direction:column;gap:10px;min-width:0}
.mb .pgroup+.pgroup{padding-left:40px;border-left:1px solid var(--border)}
.mb .plabel{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.mb .plabel b{color:var(--text-strong);letter-spacing:.02em;text-transform:none;font-size:12px}
.mb .prow{display:flex;gap:8px;align-items:center}
.mb .prow .newspace{flex:1;min-width:0;width:auto}
.mb .colorsgrid{display:grid;grid-template-columns:repeat(6,24px);gap:10px;align-items:center}
.mb .pdel{display:inline-flex;align-items:center;gap:8px;background:none;border:1px solid var(--border);border-radius:10px;color:var(--muted);padding:7px 12px;font-size:12px;cursor:pointer;width:fit-content}
.mb .pdel:hover{color:var(--text-strong);border-color:var(--border-hover)}
.mb .phint{font-size:13px;color:var(--muted);line-height:1.5}
.mb .profiles{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 28px}
.mb .pcard{--c:var(--accent);position:relative;display:flex;align-items:center;gap:11px;padding:7px 12px 7px 7px;background:var(--card);border:1px solid var(--border);border-radius:14px;min-width:210px;transition:border-color .2s,box-shadow .2s}
.mb .pcard .ptile{width:38px;height:38px;border-radius:11px;border:0;display:grid;place-items:center;color:#fff;cursor:pointer;flex:none;transition:transform .18s cubic-bezier(.2,1.4,.4,1)}
.mb .pcard .ptile:hover{transform:scale(1.08)}
.mb .pcard .pname{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1}
.mb .pcard .pname b{font-size:13px;color:var(--text-strong);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mb .pcard .pname span{font-size:11px;color:var(--muted)}
.mb .pcard.padd{border-style:dashed;background:transparent;min-width:230px}
.mb .pcard.padd .newspace{flex:1;min-width:0;width:auto;border:0;background:transparent;padding:6px 6px}
.mb .ppop{position:absolute;top:calc(100% + 8px);left:0;z-index:40;display:flex;gap:0;width:max-content;max-width:92vw;padding:16px;background:var(--card);border:1px solid var(--border);border-radius:14px;box-shadow:0 18px 48px rgba(0,0,0,.5);animation:albaIn .2s cubic-bezier(.2,.8,.2,1)}
.mb .ppop .iconsgrid{display:grid;grid-template-columns:repeat(6,40px);gap:8px}
.mb .ppop .colorsgrid{display:grid;grid-template-columns:repeat(6,24px);gap:10px;align-items:center}
.mb .mascot{position:absolute;left:28px;bottom:28px;z-index:21;width:58px;height:58px;border:0;background:none;padding:0;cursor:pointer;transition:transform .25s cubic-bezier(.2,1.4,.4,1)}
.mb .mascot:hover{transform:translateY(-4px) scale(1.07)}
.mb .mascot svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 8px 12px rgba(0,0,0,.35))}
.mb .mascot .hen{transform-origin:50% 90%;animation:albaBob 3.4s ease-in-out infinite}
@keyframes albaBob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-1.5px) rotate(-1.5deg)}}
.mb .mascot .eye{transform-box:fill-box;transform-origin:50% 50%;animation:albaBlink 4.6s infinite}
@keyframes albaHop{0%,100%{transform:translateY(0)}30%{transform:translateY(-9px)}55%{transform:translateY(0)}72%{transform:translateY(-4px)}}
.mb .mascot.hop{animation:albaHop .8s ease-out 1}
.mb .teaser{position:absolute;left:0;top:0;z-index:21;max-width:min(300px,calc(100% - 130px));text-align:left;border:1px solid var(--border);background:var(--card);color:var(--text-strong);border-radius:16px 16px 16px 4px;padding:10px 14px;font-size:13px;line-height:1.4;pointer-events:none;user-select:none;box-shadow:0 12px 34px rgba(0,0,0,.4);animation:albaIn .28s cubic-bezier(.2,.9,.3,1.2)}
@keyframes albaSpin{to{transform:rotate(360deg)}}
@keyframes albaChick{0%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}60%{transform:translateY(0)}78%{transform:translateY(-2px)}}
@keyframes albaWob{0%,100%{transform:rotate(0)}8%{transform:rotate(-9deg)}16%{transform:rotate(9deg)}24%{transform:rotate(-7deg)}32%{transform:rotate(6deg)}40%{transform:rotate(0)}}
@keyframes albaTop{0%,42%{transform:translate(0,0) rotate(0);opacity:1}70%{transform:translate(-6px,-13px) rotate(-32deg);opacity:1}100%{transform:translate(-11px,-8px) rotate(-58deg);opacity:0}}
@keyframes albaRise{0%,42%{transform:translateY(9px) scale(.35);opacity:0}72%{transform:translateY(-3px) scale(1.05);opacity:1}100%{transform:translateY(0) scale(1);opacity:1}}
@keyframes albaEggWob{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-7deg)}94%{transform:rotate(6deg)}}
.mb .pin{position:sticky;top:0;z-index:14;margin:-28px -32px 18px;padding:26px 32px 12px;background:var(--bg);border-bottom:1px solid var(--border)}
.mb .pin .profiles{margin:12px 0 22px}
@media (max-height:520px){.mb .pin{position:static;border-bottom:0}}
.mb .card.spacecfg{position:relative;grid-column:span 2;display:grid;grid-template-columns:304px 1fr;grid-template-rows:34px 1fr;gap:10px 22px;align-items:stretch}
.mb .card.spacecfg>.head{grid-area:1/2;margin:0;gap:10px}.mb .card.spacecfg>.head .tile{width:34px;height:34px;flex:none;border-radius:10px}
.mb .card.spacecfg>.head .renamein{flex:1;min-width:0;height:34px;padding:0 10px;font-weight:700;font-size:14px}
.mb .card.spacecfg>.pgroup{margin:0;padding:0;border:0;display:flex}.mb .card.spacecfg>.pgroup:nth-child(2){grid-area:1/1/3/2;align-self:stretch;margin-bottom:46px}.mb .card.spacecfg>.pgroup:nth-child(3){grid-area:2/1;align-self:end;height:36px}
.mb .card.spacecfg .iconsgrid{flex:1;display:grid;grid-template-columns:repeat(9,1fr);grid-template-rows:repeat(4,minmax(0,1fr));gap:5px}
.mb .card.spacecfg .iconsgrid .ichip{width:100%;height:100%;min-height:0;border-radius:9px;padding:0}.mb .card.spacecfg .iconsgrid .ichip svg{width:16px;height:16px}
.mb .card.spacecfg .colorsgrid{flex:1;display:grid;grid-template-columns:repeat(17,1fr);grid-template-rows:repeat(2,15px);gap:6px 2px;align-items:center;justify-items:center}
.mb .card.spacecfg .colorsgrid .sw,.mb .card.spacecfg .colorsgrid .swpick{width:15px;height:15px}.mb .card.spacecfg .colorsgrid .swpick svg{width:9px;height:9px}
.mb .card.spacecfg>.focus{grid-area:2/2;display:flex;flex-direction:column;gap:6px;min-height:0;min-width:0}
.mb .focus .frow,.mb .card.about .frow{display:flex;align-items:center;gap:5px;flex-wrap:wrap}.mb .focus .flab,.mb .card.about .flab{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-right:3px}
.mb .card.about .fname{font-size:11px;color:var(--muted);font-weight:600}
.mb .focus .fchip{width:24px;height:24px;border-radius:7px;border:1px solid var(--border);background:var(--bg);display:grid;place-items:center;cursor:pointer;padding:0;position:relative}.mb .focus .fchip.on{border-color:var(--c);box-shadow:0 0 0 1px var(--c)}.mb .focus .fchip i{position:absolute;top:-3px;right:-3px;width:7px;height:7px;border-radius:50%;background:var(--c)}
.mb .focus .freset,.mb .card.about .freset{margin-left:auto;display:inline-flex;align-items:center;gap:4px;font-size:11px;border:0;background:none;color:var(--muted);cursor:pointer;padding:2px 4px;border-radius:6px}.mb .focus .freset:hover:not(:disabled),.mb .card.about .freset:hover:not(:disabled){color:var(--text-strong);background:var(--bg-elevated)}.mb .focus .freset:disabled,.mb .card.about .freset:disabled{opacity:.35;cursor:default}
.mb .focus textarea{flex:1;min-height:0;width:100%;box-sizing:border-box;resize:none;padding:7px 9px;border-radius:9px;border:1px solid var(--border-strong);background:var(--bg);color:var(--text-strong);font:inherit;font-size:12px;line-height:1.4;outline:none}.mb .focus textarea:focus{border-color:var(--accent)}
.mb .card.about{margin-bottom:14px;display:flex;flex-direction:column;gap:6px}
.mb .card.about small{color:var(--muted);font-size:11.5px;line-height:1.4}
.mb .card.about textarea{width:100%;box-sizing:border-box;resize:none;min-height:40px;padding:8px 10px;border-radius:9px;border:1px solid var(--border-strong);background:var(--bg);color:var(--text-strong);font:inherit;font-size:13px;line-height:1.4;outline:none}
.mb .card.about textarea:focus{border-color:var(--accent)}
.mb .card.spacecfg>.focus.vert{flex-direction:row;gap:10px;overflow:hidden}.mb .focus .fcol{flex:none;display:grid;grid-auto-flow:column;grid-template-rows:repeat(5,20px);gap:4px;padding:3px;align-content:start}.mb .focus .fcol .fchip{width:20px;height:20px;border-radius:6px}.mb .focus .fcol .fchip svg{width:12px;height:12px}.mb .focus .fcol .fchip i{width:6px;height:6px}.mb .focus .fmain{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;gap:6px}
.mb .focus small{color:var(--muted);font-size:11px}
@media (max-width:760px){.mb .card.spacecfg{grid-column:auto;grid-template-columns:1fr;grid-template-rows:auto}.mb .card.spacecfg>.head,.mb .card.spacecfg>.pgroup,.mb .card.spacecfg>.focus{grid-area:auto!important}.mb .focus textarea{min-height:90px}}
.mb .card.info{padding:0;border:0;background:none;box-shadow:none}.mb .card.info .banner{height:100%;box-sizing:border-box;grid-template-columns:1fr;align-content:center;gap:10px;padding:18px 20px}.mb .card.info .banner .bs{white-space:normal;display:block}.mb .card.info .banner .stats2{justify-self:start;flex-wrap:wrap}
.mb .linkform{display:flex;flex-direction:column;gap:8px;margin:2px 0 10px;padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--bg)}.mb .linkform input{width:100%;box-sizing:border-box;padding:8px 10px;border-radius:9px;border:1px solid var(--border-strong);background:var(--card);color:var(--text-strong);font:inherit;font-size:13px;outline:none}.mb .linkform input:focus{border-color:var(--accent)}.mb .linkform .lf2{display:flex;gap:10px;align-items:center;justify-content:space-between}.mb .linkform small{color:var(--muted);font-size:11px;line-height:1.35}.mb .linkform em{color:#f87171;font-style:normal;font-size:12px}.mb .tag.st{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}.mb .tag.st i{width:7px;height:7px;border-radius:50%;background:var(--muted);flex:none}.mb .tag.st.ok i{background:#34d399;box-shadow:0 0 0 3px rgba(52,211,153,.18)}.mb .tag.st.ok{color:#34d399}.mb .tag.st.warn i{background:#fbbf24;box-shadow:0 0 0 3px rgba(251,191,36,.18)}.mb .tag.st.warn{color:#fbbf24}.mb .tag.st.bad i{background:#f87171;box-shadow:0 0 0 3px rgba(248,113,113,.18)}.mb .tag.st.bad{color:#f87171}.mb .tag.ok{color:#34d399;display:inline-flex;align-items:center;gap:3px}
.mb .loginhint{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:6px 0;padding:8px 10px;border:1px solid var(--border);border-radius:10px;background:var(--bg-elevated);font-size:12px;color:var(--muted);line-height:1.35}.mb .loginhint .talk{flex:none;text-decoration:none;display:inline-flex;align-items:center}
.mb .linkform .cmd{display:block;padding:8px 10px;border-radius:9px;background:var(--card);border:1px solid var(--border);font:12px ui-monospace,Menlo,monospace;color:var(--text-strong);word-break:break-all;user-select:all}.mb .linkform a.lnk{color:var(--accent);font-size:12px}
.mb h1 .connall{display:inline-flex;align-items:center;gap:6px;margin-left:14px;vertical-align:middle;white-space:nowrap;font:inherit;font-family:var(--font-body,inherit);font-size:12px;font-weight:600;line-height:1;padding:7px 12px;border-radius:99px;border:1px solid var(--border-strong);background:var(--bg-elevated);color:var(--text-strong);cursor:pointer}.mb h1 .connall:hover{border-color:var(--accent);color:var(--accent)}
.mb .briefpop{position:absolute;bottom:26px;left:26px;z-index:40;width:min(360px,calc(100% - 52px));padding:14px 16px 12px;border-radius:14px;background:var(--card);border:1px solid var(--border-strong,var(--border));box-shadow:0 22px 60px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.03);animation:albaToast .45s cubic-bezier(.2,1.1,.3,1) both;overflow:hidden}
.mb .briefpop:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#f59e0b,#ef4444 55%,#8b5cf6)}
.mb .bp-head{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px}.mb .bp-head b{color:var(--text-strong);font-size:13px}.mb .bp-head span{margin-left:auto;margin-right:22px;white-space:nowrap}
.mb .bp-x{position:absolute;top:10px;right:10px;width:24px;height:24px;border:0;border-radius:8px;background:transparent;color:var(--muted);font-size:18px;line-height:1;cursor:pointer}.mb .bp-x:hover{background:var(--bg-elevated);color:var(--text-strong)}
.mb .bp-title{margin:10px 0 8px;font-family:var(--font-serif,Georgia,serif);font-size:18px;line-height:1.25;color:var(--text-strong)}
.mb .bp-list{list-style:none;margin:0;padding:0;display:grid;gap:6px}.mb .bp-chips{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}.mb .bp-chips span{font-size:11.5px;color:var(--muted);padding:3px 9px;border-radius:99px;background:var(--bg-elevated)}.mb .bp-chips b{color:var(--text-strong)}
.mb .bp-list li{display:flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--text);line-height:1.35}.mb .bp-list i{flex:none;width:24px;height:24px;border-radius:8px;display:grid;place-items:center}.mb .bp-list em{display:inline-flex;align-items:center;gap:5px;margin-left:8px;font-style:normal;font-size:11px;color:var(--muted)}.mb .bp-list s{width:7px;height:7px;border-radius:50%;display:inline-block}
.mb .bp-more{margin-top:6px;font-size:12px;color:var(--muted)}
.mb .bp-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.mb .bp-actions .ghost{padding:7px 12px;border-radius:10px;border:0;background:transparent;color:var(--muted);font:inherit;font-size:13px;cursor:pointer}.mb .bp-actions .ghost:hover{color:var(--text-strong);background:var(--bg-elevated)}.mb .bp-actions .talk{padding:7px 14px;border-radius:10px;border:0;background:var(--accent);color:var(--accent-fg,#04251b);font:inherit;font-size:13px;font-weight:700;cursor:pointer}.mb .bp-actions .talk:hover{filter:brightness(1.08)}
.mb .bp-bar{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--bg-elevated)}.mb .bp-bar i{display:block;height:100%;width:100%;background:var(--accent);transform-origin:left;animation:albaToastBar 40s linear forwards}
@keyframes albaToast{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
@keyframes albaToastBar{to{transform:scaleX(0)}}
@media (prefers-reduced-motion:reduce){.mb .briefpop{animation:none}.mb .bp-bar i{animation:none}}
.mb .conn{width:auto;padding:0 9px;gap:4px;display:inline-flex;align-items:center;font-size:11px;font-weight:600;margin-left:auto;margin-right:6px;border:1px solid var(--border-strong);color:var(--muted);border-radius:8px}.mb .conn:hover{color:var(--text-strong);border-color:var(--accent)}
.mb .renamein{width:100%;box-sizing:border-box;padding:7px 10px;border-radius:9px;border:1px solid var(--border-strong);background:var(--bg);color:var(--text-strong);font:inherit;font-size:13px;outline:none}.mb .renamein:focus{border-color:var(--accent)}
.mb .egg{position:absolute;left:21px;bottom:31px;z-index:20;width:14px;height:17px;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:#FFF4DC;border:1px solid #F4C27A;display:grid;place-items:center;box-shadow:0 2px 5px rgba(0,0,0,.35);transform-origin:50% 100%;animation:albaEggWob 6s ease-in-out infinite}
.mb .egg b{font-size:8.5px;font-weight:800;color:#7C4A03;line-height:1}
.mb .hatch{position:absolute;left:18px;bottom:30px;z-index:20;width:20px;height:24px;overflow:visible;transform-origin:50% 100%;animation:albaWob 2.6s ease-in-out 1}
.mb .hatch .htop{transform-origin:15px 20px;animation:albaTop 2.6s ease-out forwards}
.mb .hatch .hchick{transform-origin:15px 30px;animation:albaRise 2.6s ease-out forwards}
.mb .chickwrap{position:absolute;left:0;top:0;width:16px;height:16px;z-index:20;pointer-events:none;will-change:translate}
.mb .chickwrap .chick{width:16px;height:16px;overflow:visible;animation:albaChick 2.2s ease-in-out infinite}
.mb .chickmore{position:absolute;left:150px;bottom:31px;font-size:11px;color:var(--muted)}
.mb .mascot.roaming{scale:.8}
@keyframes albaPeck{0%,100%{transform:rotate(0)}45%{transform:rotate(34deg) translateY(2px)}}
@keyframes albaLook{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}60%{transform:rotate(9deg)}}
@keyframes albaFlap{0%,100%{transform:rotate(0)}50%{transform:rotate(-46deg)}}
@keyframes albaScratch{0%,100%{transform:rotate(0)}50%{transform:rotate(-38deg)}}
@keyframes albaStep{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
@keyframes albaZ{0%{opacity:0;transform:translate(0,4px)}40%{opacity:1}100%{opacity:0;transform:translate(5px,-9px)}}
.mb .mascot .henhead,.mb .mascot .henwing,.mb .mascot .legfront,.mb .mascot .legback{transform-box:view-box}
.mb .mascot .henhead{transform-origin:36px 33px}
.mb .mascot .beakU,.mb .mascot .beakL{transform-box:view-box}.mb .mascot .beakL{transform-origin:52px 24px}.mb .mascot .beakU{transform-origin:52px 21px}
@keyframes albaMouthL{0%,100%{rotate:0deg}18%,78%{rotate:38deg}}
@keyframes albaMouthU{0%,100%{rotate:0deg}18%,78%{rotate:-12deg}}
.mb .mascot.act-gulp .beakL{animation:albaMouthL 1.25s ease-in-out 1}.mb .mascot.act-gulp .beakU{animation:albaMouthU 1.25s ease-in-out 1}
.mb .mascot.act-pull .beakL{rotate:6deg}
.mb .mascot .hen,.mb .mascot .henhead,.mb .mascot .legfront,.mb .mascot .legback{will-change:translate,rotate}
.mb .mascot .henwing{transform-origin:33px 37px}
.mb .mascot .legfront{transform-origin:36px 51px}
.mb .mascot .legback{transform-origin:27px 51px}
.mb .mascot .zz{opacity:0}
.mb .mascot.act-peck .henhead{animation:albaPeck .58s ease-in-out 3}
.mb .mascot.act-look .henhead{animation:albaLook 2.2s ease-in-out 1}
.mb .mascot.act-flap .henwing{animation:albaFlap .28s ease-in-out 5}
.mb .mascot.act-flap .hen{translate:0 -2px}
.mb .mascot.act-scratch .legfront{animation:albaScratch .32s ease-in-out 4}
.mb .mascot.act-nap .hen{translate:0 3px;scale:1 .94}
.mb .mascot.act-nap .eye{animation:none;transform:scaleY(.12)}
.mb .mascot.act-nap .zz{animation:albaZ 2s ease-in-out infinite}
.mb .mascot.act-dizzy .hen{animation:albaDizzyBody .9s ease-in-out 2}
.mb .mascot.act-dizzy .henhead{animation:albaDizzyHead .35s ease-in-out 5}
.mb .mascot.act-dizzy .eye{animation:albaDizzyEye .3s ease-in-out infinite}
@keyframes albaDizzyBody{0%,100%{rotate:0deg}25%{rotate:-8deg}75%{rotate:8deg}}
@keyframes albaDizzyHead{0%,100%{translate:0 0}50%{translate:2.4px -1px}}
@keyframes albaDizzyEye{0%,100%{transform:scaleY(1) translateX(0)}50%{transform:scaleY(.5) translateX(.6px)}}
@keyframes albaFlapRun{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(-44deg)}}
@keyframes albaFlapFast{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(-66deg)}}
@keyframes albaLand{0%{translate:0 -6px}55%{translate:0 2px;scale:1 .94}100%{translate:0 0}}
@keyframes albaGulp{0%,100%{transform:rotate(0)}25%{transform:rotate(-26deg) translateY(-1.5px)}55%{transform:rotate(-26deg) translateY(-1.5px)}85%{transform:rotate(4deg)}}
@keyframes albaBulge{0%{opacity:0;transform:translate(0,0) scale(.6)}25%{opacity:1;transform:translate(0,0) scale(1.15)}100%{opacity:0;transform:translate(-9px,13px) scale(.7)}}
@keyframes albaDance{0%,100%{translate:0 0;rotate:0}20%{translate:0 -7px;rotate:-9deg}40%{translate:0 0;rotate:0}60%{translate:0 -7px;rotate:9deg}80%{translate:0 0;rotate:0}}
@keyframes albaWormUp{0%{translate:0 44px}65%{translate:0 25px}100%{translate:0 28px}}
/* tirato dal becco si allunga come un elastico (la coda resta nella terra), poi schizza fuori e rimbalza */
@keyframes albaWormPull{0%{translate:0 28px;scale:1 1}30%{translate:0 27px;scale:.86 1.3}58%{translate:0 24px;scale:.78 1.52}74%{translate:0 11px;scale:1.12 .84}88%{translate:0 14px;scale:.96 1.08}100%{translate:0 13px;scale:1 1}}
@keyframes albaWormSway{0%,100%{rotate:-5deg}50%{rotate:6deg}}
@keyframes albaWormDangle{0%{rotate:-11deg;scale:1 1.1}25%{scale:1 .95}50%{rotate:8deg;scale:1 1.07}75%{scale:1 .97}100%{rotate:-11deg;scale:1 1.1}}
/* risucchiato come uno spaghetto: resta attaccato al becco e si accorcia, con la coda che dà gli ultimi colpi */
@keyframes albaSwallow{0%{rotate:-8deg;scale:1 1;opacity:1}14%{rotate:6deg;scale:.9 1.14;opacity:1}34%{rotate:-9deg;scale:1 .78;opacity:1}54%{rotate:7deg;scale:1.02 .52;opacity:1}74%{rotate:-6deg;scale:1.06 .28;opacity:1}92%{rotate:3deg;scale:1.1 .08;opacity:1}100%{rotate:0deg;scale:1.1 0;opacity:0}}
@keyframes albaSeg{0%,100%{translate:calc(var(--amp,1.5px) * -1) 0}50%{translate:var(--amp,1.5px) 0}}
@keyframes albaPull{0%{transform:rotate(0) translateY(0)}100%{transform:rotate(-12deg) translateY(-5px)}}
.mb .mascot.act-pull .henhead{animation:albaPull .6s ease-out both}
.mb .worm{position:absolute;left:0;top:0;width:40px;height:56px;z-index:19;pointer-events:none}
.mb .worm[data-state=carry]{z-index:22}.mb .worm[data-state=swallow]{z-index:20}
.mb .worm .wormclip{position:absolute;left:13px;top:0;width:14px;height:49px;overflow:hidden}
.mb .worm[data-state=carry] .wormclip{overflow:visible;height:40px}
.mb .worm[data-state=swallow] .wormclip{overflow:visible;height:40px}
.mb .worm .wormbody{position:absolute;left:0;top:0;width:14px;height:32px;display:block;translate:0 28px;transform-origin:50% 55%;animation:albaWormUp .9s cubic-bezier(.2,1,.4,1) .25s both,albaWormSway 1.7s ease-in-out 1.2s infinite}
.mb .worm[data-state=pull] .wormbody{transform-origin:50% 100%;animation:albaWormPull .66s cubic-bezier(.3,0,.3,1) both}
.mb .worm[data-state=carry] .wormbody{translate:0 0;transform-origin:50% 0;animation:albaWormDangle 1.05s ease-in-out infinite}
.mb .worm[data-state=swallow] .wormbody{translate:0 0;transform-origin:50% 0;animation:albaSwallow 1.2s cubic-bezier(.5,0,.6,1) .12s both}
.mb .worm .seg{animation:albaSeg 1.1s ease-in-out infinite;animation-delay:calc(var(--i) * -.13s)}
.mb .worm .wormhead{animation-name:albaSeg}
/* tirato fuori si tende dritto; appeso al becco penzola molle (la coda oscilla più della testa, tutti insieme: una curva, non uno zigzag); inghiottito va giù dritto */
.mb .worm[data-state=pull] .seg{animation:none;translate:0 0}
.mb .worm[data-state=carry] .seg{--amp:calc((9 - var(--i)) * .3px);animation-duration:1.05s;animation-delay:calc(var(--i) * -.06s)}
.mb .worm[data-state=swallow] .seg{--amp:calc((9 - var(--i)) * .36px);animation-duration:.4s;animation-delay:calc(var(--i) * -.045s)}
.mb .worm[data-face="-1"] .wormclip{scale:-1 1}
.mb .albabug{position:absolute;left:0;top:0;width:24px;height:24px;z-index:24;pointer-events:none;display:grid;place-items:center;animation:albaFadeIn .5s ease-out both}
.mb .albabug svg{overflow:visible;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))}
.mb .albabug .wing{animation:albaWing .09s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
.mb .albabug .bwing{transform-box:view-box;transform-origin:12px 12px;animation:albaWingB .15s ease-in-out infinite alternate}
/* posata tiene le ali aperte e ogni tanto le chiude piano, come fanno le farfalle ferme */
.mb .albabug[data-state=perch] .bwing{animation:albaWingRest 2.4s ease-in-out infinite}.mb .albabug[data-state=perch] .wing{animation:none}
@keyframes albaWingRest{0%,55%,100%{scale:1 1}78%{scale:.34 1}}
@keyframes albaWing{0%{scale:1 1}100%{scale:.7 .35}}
@keyframes albaWingB{0%{scale:1 1}100%{scale:.3 1}}
@keyframes albaFadeIn{from{opacity:0}to{opacity:1}}
/* cambio di pagina o di filtro: il contenuto entra con una dissolvenza e un leggero scorrimento, senza salti */
.mb .pageswap{display:flex;flex-direction:column;flex:1 0 auto;min-width:0;animation:albaSwap .38s cubic-bezier(.22,.8,.24,1) both}
.mb .cols.swap{animation:albaSwap .34s cubic-bezier(.22,.8,.24,1) both}
@keyframes albaSwap{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.mb .pageswap,.mb .cols.swap{animation:none}}
.mb .snail{position:absolute;left:0;top:0;width:34px;height:22px;z-index:18;pointer-events:none;transition:opacity .7s ease-out;animation:albaFadeIn .9s ease-out both;--st:0}
.mb .snail svg{overflow:visible;display:block}
.mb .snail[data-state=bye]{opacity:0}
/* avanza a impulsi: il piede si allunga in avanti, la testa lo segue, il guscio dondola appena */
.mb .snail .sfoot{transform-box:fill-box;transform-origin:8% 60%;transform:scaleX(calc(1 + var(--st) * .12))}
.mb .snail .stent{transform-box:fill-box;transform-origin:30% 100%;translate:calc(var(--st) * 3.4px) 0;transition:scale .28s ease-out;animation:albaTent 2.6s ease-in-out infinite}
.mb .snail .sshell{translate:calc(var(--st) * .9px) calc(var(--st) * -.5px);rotate:calc(var(--st) * -2deg);transform-box:fill-box;transform-origin:50% 90%}
.mb .snail[data-state=look] .stent{animation-duration:1.1s}
.mb .snail[data-state=shy] .stent{scale:1 .2;animation:none}
.mb .snail[data-state=talk] .stent{animation-duration:.7s}
@keyframes albaTent{0%,100%{rotate:-5deg}50%{rotate:6deg}}
.mb .slimes{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;z-index:17}
.mb .slime{position:absolute;left:0;top:0;width:9px;height:2.5px;border-radius:2px;background:linear-gradient(90deg,rgba(210,235,255,0),rgba(210,235,255,.34),rgba(210,235,255,0));animation:albaSlime 18s linear forwards}
@keyframes albaSlime{0%{opacity:0}4%{opacity:1}60%{opacity:.7}100%{opacity:0}}
.mb .snailteaser{z-index:21}
.mb .albareact{position:absolute;left:0;top:0;width:40px;height:40px;z-index:23;pointer-events:none;opacity:0;display:flex;gap:2px;align-items:flex-end;justify-content:center}
.mb .albareact[data-state=on]{animation:albaReactIn 1.5s ease-out both}
.mb .albareact i{font-style:normal;font-size:13px;color:#F472B6;animation:albaReactFloat 1.5s ease-out both}
.mb .albareact i:nth-child(1){animation-delay:0s;color:#F472B6}
.mb .albareact i:nth-child(2){animation-delay:.12s;color:#FDE047;font-size:11px}
.mb .albareact i:nth-child(3){animation-delay:.24s;color:#F9A8D4}
@keyframes albaReactIn{0%,85%{opacity:1}100%{opacity:0}}
@keyframes albaReactFloat{0%{translate:0 6px;opacity:0;scale:.4}20%{opacity:1;scale:1}100%{translate:0 -26px;opacity:0;scale:.8}}
.mb .wormspot{position:absolute;left:0;top:0;width:40px;height:56px;z-index:20;pointer-events:none}
.mb .wormspot .mound{position:absolute;left:0;top:42px;width:40px;height:14px;transform-origin:50% 100%;animation:albaMound .35s cubic-bezier(.2,1.4,.4,1) both}
.mb .wormspot[data-state=out] .mound{animation:albaMoundOut 1.1s ease-in .1s both}
.mb .wormspot .crumb{position:absolute;left:18px;top:46px;width:4px;height:4px;border-radius:50%;background:#8B5E34;opacity:0;animation:albaCrumb .7s ease-out .22s both}
@keyframes albaMound{0%{transform:scale(.2)}100%{transform:scale(1)}}
@keyframes albaMoundOut{0%{transform:scale(1);opacity:1}100%{transform:scale(.45);opacity:0}}
@keyframes albaCrumb{0%{opacity:1;transform:translate(0,0)}70%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy))}}
.mb .mascot .bulge{opacity:0}
.mb .mascot.act-gulp .henhead{animation:albaGulp 1.15s ease-in-out 1}
.mb .mascot.act-gulp .bulge{animation:albaBulge 1s ease-in .35s 1 both}
.mb .mascot{touch-action:none}.mb .mascot.dragging{cursor:grabbing}
@keyframes albaStruggle{0%,100%{rotate:-8deg;translate:0 -2px}50%{rotate:8deg;translate:0 -5px}}
@keyframes albaKick{0%,100%{rotate:-28deg}50%{rotate:28deg}}
@keyframes albaShake{0%,100%{rotate:-7deg}50%{rotate:7deg}}
.mb .mascot.act-struggle .hen{animation:albaStruggle .2s ease-in-out infinite}
.mb .mascot.act-struggle .henwing{animation:albaFlapFast .09s ease-in-out infinite}
.mb .mascot.act-struggle .legfront{animation:albaKick .17s ease-in-out infinite}
.mb .mascot.act-struggle .legback{animation:albaKick .17s ease-in-out infinite reverse}
.mb .mascot.act-struggle .henhead{animation:albaShake .15s ease-in-out infinite}
.mb .mascot.act-dance .hen{animation:albaDance .55s ease-in-out 4}
.mb .mascot.act-peck1 .henhead{animation:albaPeck .5s ease-in-out 1}
.mb .mascot.act-look1 .henhead{animation:albaLook 1s ease-in-out 1}
.mb .mascot.act-run .henwing{animation:albaFlapRun .16s ease-in-out infinite}
.mb .mascot.act-fly .henwing{animation:albaFlapFast .14s ease-in-out infinite}
.mb .mascot.act-fly .hen{translate:0 -3px;rotate:-6deg}
.mb .mascot.act-fly .legfront,.mb .mascot.act-fly .legback{rotate:38deg}
.mb .mascot.act-land .hen{animation:albaLand .5s ease-out 1}
.mb .wormspot[data-state=out] .mound{animation:albaMoundOut .9s ease-in .1s both}
@keyframes albaBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}
.mb .bubble{position:absolute;left:0;top:0;z-index:22;width:340px;max-width:calc(100% - 56px);padding:16px;border-radius:18px;background:var(--card);border:1px solid var(--border);box-shadow:0 18px 52px rgba(0,0,0,.5);animation:albaIn .22s cubic-bezier(.2,.8,.2,1)}
.mb .bubble.chat{width:420px}
.mb .bubble.below:after{bottom:auto;top:-7px;border:0;border-left:1px solid var(--border);border-top:1px solid var(--border)}
.mb .bubble .chatbox{height:340px;margin-top:6px;border:1px solid var(--border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;background:var(--bg-elevated)}
.mb .bubble .chatbox>*{min-height:0;flex:1}
.mb .bubble:after{pointer-events:none;content:"";position:absolute;left:var(--tail,22px);bottom:-7px;width:14px;height:14px;background:var(--card);border-right:1px solid var(--border);border-bottom:1px solid var(--border);transform:rotate(45deg)}
.mb .bubble .bhead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 10px}
.mb .bubble h4{margin:0;font-size:14px;color:var(--text-strong);font-weight:600}
.mb .bubble .talk{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--bg-elevated);color:var(--text-strong);border-radius:99px;padding:5px 11px;font-size:12px;cursor:pointer;white-space:nowrap}
.mb .bubble .talk:hover{border-color:var(--accent);color:var(--accent)}
.mb .bubble .msgs{max-height:230px;min-height:44px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin:0 0 10px;padding-right:2px}
.mb .bubble .msg{max-width:88%;padding:8px 12px;border-radius:14px;font-size:13px;line-height:1.45;animation:albaIn .18s ease-out}
.mb .bubble .msg.me{align-self:flex-end;background:var(--accent);color:var(--accent-fg);border-bottom-right-radius:4px}
.mb .bubble .msg.al{align-self:flex-start;background:var(--bg-elevated);color:var(--text-strong);border-bottom-left-radius:4px}
.mb .bubble .rin{display:flex;gap:8px}
.mb .bubble .rin input{flex:1;min-width:0;background:var(--bg-elevated);color:var(--text-strong);border:1px solid var(--border);border-radius:10px;padding:9px 12px;font-size:13px;outline:none}
.mb .bubble .rin input:focus{border-color:var(--accent)}
.mb .bubble .whens{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0;align-items:center}
.mb .bubble .when{border:1px solid var(--border);background:transparent;color:var(--muted);border-radius:99px;padding:5px 11px;font-size:12px;cursor:pointer}
.mb .bubble .when.on{background:var(--accent);color:var(--accent-fg);border-color:transparent;font-weight:600}
.mb .bubble input[type=date]{background:var(--bg-elevated);color:var(--text);border:1px solid var(--border);border-radius:99px;padding:4px 10px;font-size:12px;color-scheme:dark light}
.mb .bubble .ok{margin:10px 0 0;font-size:12px;color:var(--accent)}
.mb .bubble .plist{margin:14px 0 0;padding:12px 0 0;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:8px;max-height:180px;overflow:auto}
.mb .bubble .plist b{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:700}
.mb .bubble .pitem{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:var(--text)}
.mb .bubble .pitem span{flex:1}
.mb .bubble .pitem em{display:block;font-style:normal;font-size:11px;color:var(--muted)}
.mb .remind{margin-bottom:56px;padding:18px 20px;border-radius:16px;border:1px solid color-mix(in srgb,var(--accent) 45%,var(--border));background:color-mix(in srgb,var(--accent) 9%,transparent)}
.mb .remind .sec{margin-bottom:12px}
.mb .remind .ritem{display:flex;gap:12px;align-items:flex-start;font-size:16px;color:var(--text-strong);line-height:1.5;margin:8px 0}
.mb .remind .ritem svg{color:var(--accent);flex:none;margin-top:5px}
.mb .remind .ritem small{display:block;font-size:12px;color:var(--muted)}
@media (prefers-reduced-motion:reduce){.mb .mascot *,.mb .worm *,.mb .snail *,.mb .albabug,.mb .albabug *,.mb .albareact,.mb .albareact *{animation:none!important}.mb .egg,.mb .chickwrap .chick,.mb .hatch,.mb .hatch *{animation:none}.mb .mascot .hatch .htop{opacity:0}.mb .mascot .hen,.mb .mascot .eye,.mb .mascot.hop,.mb .teaser{animation:none}}
@media (max-width:760px){.mb .vside{display:none}.mb .paper{padding:0}}
.mb .card.spacecfg>.pgroup:nth-child(2){position:relative}
.mb .iconpop{position:absolute;inset:-6px -6px -6px -6px;z-index:25;display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:12px;background:var(--card);border:1px solid var(--border-strong);box-shadow:0 18px 44px rgba(0,0,0,.55)}
.mb .iconpop .ipt{display:flex;gap:8px;align-items:center}.mb .iconpop input{flex:1;min-width:0;box-sizing:border-box;padding:6px 10px;border-radius:9px;border:1px solid var(--border-strong);background:var(--bg);color:var(--text-strong);font:inherit;font-size:12px;outline:none}.mb .iconpop input:focus{border-color:var(--accent)}
.mb .iconpop .ipg{flex:1;min-height:0;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,30px);justify-content:space-between;gap:5px 4px;align-content:start}
.mb .iconpop .ipg button{height:30px;border-radius:9px;border:1px solid var(--border);background:var(--bg);color:var(--text);display:grid;place-items:center;cursor:pointer;padding:0}.mb .iconpop .ipg button:hover{background:var(--bg-elevated);color:var(--text-strong)}.mb .iconpop .ipg button.on{color:#fff;border-color:transparent}
.mb .card.spacecfg .iconsgrid .ichip.more{border-style:dashed;color:var(--muted)}
.mb .collapseapp{font-size:16px;line-height:1}
.mb .unusedrow{justify-self:start;align-self:start;display:grid;grid-auto-flow:column;grid-template-rows:repeat(4,42px);gap:8px}
.mb .unusedchip{width:42px;height:42px;border-radius:12px;border:1px dashed var(--border-strong);background:color-mix(in srgb,var(--c) 15%,transparent);color:var(--c);display:grid;place-items:center;cursor:pointer}
.mb .unusedchip:hover{border-style:solid;border-color:var(--c);background:color-mix(in srgb,var(--c) 26%,transparent)}
`

export function Shell({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  return (
    <div className="mb">
      <style>{CSS}</style>
      <div className="scroll">{children}</div>
      {overlay}
    </div>
  )
}

