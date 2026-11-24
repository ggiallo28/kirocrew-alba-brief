import { jsx as t, jsxs as r, Fragment as Xe } from "react/jsx-runtime";
import wo, { MessageCircle as ua, Layers as Wn, FileText as Co, Globe as $n, Folder as tn, Sparkles as Un, GitBranch as So, Car as zo, Bike as Ao, Moon as No, Sun as To, Cloud as Mo, Shield as Fo, Palette as Io, Wrench as Eo, Leaf as Lo, Lightbulb as Po, Dumbbell as qo, Gamepad2 as Do, Building2 as Bo, Wallet as Oo, Coffee as Ho, Plane as Ro, Music as jo, Camera as _o, ShoppingCart as Go, GraduationCap as Wo, Book as $o, Rocket as Uo, Code as Vo, Star as Yo, Heart as Ko, Users as Qo, User as Zo, Home as Jo, Briefcase as Xo, Pipette as er, Sunrise as Ta, Info as tr, Check as _a, BellRing as ar, ThumbsUp as nr, ThumbsDown as or, Plug as Ga, RotateCcw as Za, Trash2 as Cn, Plus as Ma, RefreshCw as rr, Pause as ir, Play as sr, Bell as Sn, ExternalLink as Wa, X as lr, CornerDownLeft as cr, Pencil as dr } from "lucide-react";
import { useState as D, useEffect as ee, useRef as I, useLayoutEffect as $a } from "react";
import { useAppApi as ma, useNotify as Vn, useChatLauncher as an, ChatEmbed as pr } from "@kirocrew/app-sdk";
const et = (e) => ({ size: p = 16, ...u }) => /* @__PURE__ */ t("svg", { viewBox: "0 0 24 24", width: p, height: p, fill: "currentColor", "aria-hidden": !0, ...u, children: /* @__PURE__ */ t("path", { d: e }) }), ur = et("M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"), mr = et("M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z"), hr = et("M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z"), gr = et("M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"), br = et("M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"), fr = et("M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"), xr = et("M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"), vr = et("M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"), yr = et("M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"), kr = et("M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"), wr = et("M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5zm2.2.2 6.8 5 6.8-5-.2-.2H5.4zM19 8.9l-6.4 4.7a1 1 0 0 1-1.2 0L5 8.9v8.6c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5z"), Cr = et("M14.5 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM18.5 9.5H21a1 1 0 0 1 1 1V15a3 3 0 0 1-3 3 3 3 0 0 1-.5-.05zM3 9.5h11.5a1 1 0 0 1 1 1V16a5 5 0 0 1-5 5h-3.5A5 5 0 0 1 3 16zm4.5 2v1.7H6v1.5h1.5V18H9v-3.3h1.5v-1.5H9v-1.7z"), Sr = et("M7.529 8.753h-.705v.941h.706c.376 0 .565-.188.565-.471-.001-.329-.236-.47-.566-.47zm-3.2.282c0-.235-.188-.329-.471-.329h-.705v.706h.659c.329-.047.517-.141.517-.377zm6.212 1.13h.847l-.423-1.083zm-6.588 0h-.847v.706h.847c.329 0 .518-.141.518-.376s-.189-.33-.518-.33zM0 0v24h24V0H0zm8.424 3.012h3.435v.941h-1.176v2.965H9.6V3.953H8.424v-.941zm-.236 0v.894h-2.07v.612H8v.847H6.118v.612h2.118v.941H5.082l-.047-3.906h3.153zm-2.635 7.623c0 .659-.565 1.082-1.459 1.082H2.071V7.812h2.023c.471 0 .847.141 1.082.329.142.141.236.377.236.659 0 .471-.235.706-.612.894.471.141.753.424.753.941zM2.682 5.647c.188.235.376.376.612.376.282 0 .424-.188.424-.565V2.965H4.8v2.494c0 .471-.141.847-.376 1.082s-.612.377-1.083.377c-.706.047-1.082-.236-1.364-.612l.705-.659zm8.377 15.341H2.071v-1.506h8.988v1.506zm.894-9.223l-.282-.706h-1.506l-.282.706h-1.13l.02-.047h-.679l-.8-1.176h-.47v1.176H5.741V7.812h1.835c.612 0 .988.141 1.271.424.235.235.329.518.329.894 0 .612-.329.988-.8 1.224l.605.878 1.465-3.419h1.035l1.647 3.953h-1.175zm2.4-.047h-1.082V7.812h1.082v3.906zm3.953 0h-.941L15.718 9.6v2.165h-1.082V7.812h.988l1.6 2.071V7.812h1.082v3.906zm1.929.047a2.488 2.488 0 0 1-1.835-.612l.612-.706c.376.329.8.471 1.271.471.282 0 .471-.094.471-.282s-.141-.235-.659-.376c-.847-.188-1.459-.424-1.459-1.224 0-.706.565-1.271 1.506-1.271.659 0 1.176.188 1.6.518l-.565.753c-.377-.236-.753-.377-1.083-.377-.282 0-.376.094-.376.235 0 .188.141.235.659.376.894.188 1.459.471 1.459 1.224-.001.8-.612 1.271-1.601 1.271z"), zr = et("M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"), Ar = ["it", "en", "es", "fr", "de", "pt"], Ja = () => {
  try {
    return document.documentElement.lang || navigator.language || "en";
  } catch {
    return "en";
  }
};
function Yn(e) {
  const p = e.slice(0, 2).toLowerCase();
  return Ar.includes(p) ? p : "en";
}
const Nr = {
  it: {
    today: "Oggi",
    connections: "Fonti",
    emptyTitle: (e) => `Nessun riepilogo per ${e || "questo spazio"}`,
    emptyBody: 'Parte da solo alle 8:00 nei giorni feriali. Per averlo subito apri Cmd+K e scegli "Alba · Run now". Quando è pronto compare qui, non in chat.',
    loading: "Carico…",
    emptyTab: "vuoto",
    moreIcons: "Altre icone",
    iconSearch: "Cerca un’icona…",
    close: "Chiudi",
    focusTitle: "Focus",
    focusNone: "Aggiungi un account a questo profilo per scrivere cosa deve cercare Alba.",
    focusReset: "Ripristina",
    aboutTitle: "Chi sei",
    aboutHint: "Una riga su chi sei e di cosa ti occupi: aiuta Alba a capire cosa conta davvero per te, nel brief, nei suggerimenti LinkedIn e nei riepiloghi Slack.",
    aboutPh: "Es. Gestisco un piccolo studio di progettazione, seguo clienti e fornitori e la sera organizzo un gruppo di lettura.",
    showUnused: (e) => `+ ${e} connessioni non usate`,
    hideUnused: "Nascondi le non usate",
    folderPh: "/percorso/della/cartella",
    heroPre: "L'alba di",
    secPush: "Spingi il lavoro avanti",
    secTodos: "Cose da fare",
    secUpdates: "Novità",
    go: "Ci penso",
    footMade: "Preparato per te da Alba usando",
    footApps: "le tue app",
    unread: "Non letti",
    done: "Fatto",
    freqTitle: "Quando leggere {app}",
    freqEvery: "Ogni brief",
    freqWeekly: "Solo nei giorni scelti",
    freqOff: "Mai",
    freqHint: "Nei giorni non scelti la fonte resta fuori dal brief.",
    avStatus: "Stato",
    schedTitle: "Quando parte il brief",
    schedHint: "Parte da quest'ora nei giorni scelti. Se il computer è spento, parte appena lo accendi.",
    schedTime: "Ora",
    regen: "Aggiorna brief",
    regenOn: "In corso…",
    regenErr: "Non riuscito: riprova",
    late: "in ritardo",
    ageDays: (e) => e === 1 ? "da ieri" : `da ${e} giorni`,
    parked: "Da riguardare",
    completed: (e) => `Completate (${e})`,
    dismiss: "Non serve più",
    reopen: "Riapri",
    viaSource: "risolta dalla fonte",
    noTasks: "Niente in sospeso.",
    chooseIcon: "Scegli icona",
    renameSpace: "Rinomina",
    manageSpaces: "Gestisci spazi",
    pickSpaceHint: "Seleziona uno spazio nella barra in basso per cambiarne l'icona",
    chooseColor: "Scegli colore",
    openIn: (e) => `Apri in ${e}`,
    dragHint: "Trascina le icone dei profili nella barra in basso per riordinarli.",
    remToChat: "Questa è una domanda per la chat completa: ti apro quella.",
    cluck: "Coccodè!",
    teasers: ["Coccodè… ti è venuto in mente qualcosa?", "Ti è venuto in mente qualcosa da non dimenticare?", "Ehi… hai un attimo?", "Ho buona memoria, sai?", "Dimmi pure, intanto il brief è a posto.", "Qualcosa che domani ti servirà ricordare?"],
    teaseLate: (e) => e === 1 ? "C’è una cosa che aspetta da qualche giorno…" : `Ci sono ${e} cose che aspettano da qualche giorno…`,
    teasePending: (e) => e === 1 ? "Ho ancora una cosa da ricordarti, ma non ti dico quale." : `Ho ancora ${e} cose da ricordarti, ma non ti dico quali.`,
    teaseFresh: "Nel brief di oggi ti ho lasciato un pensiero.",
    chatPlaceholder: "Scrivi ad Alba…",
    chatUnavailable: "Non riesco ad aprire la chat qui. Crew potrebbe chiedere di autorizzare Alba a usare la chat.",
    chatBack: "Promemoria",
    chatOpenCrew: "Apri in Crew",
    goLines: ["Ci penso", "→"],
    chatAbout: "Avvia una chat su questo",
    chatHint: "Scrivi come parli, anche “tra 3 giorni devo chiamare il dentista”. Se qualcosa non mi è chiaro, te lo chiedo io.",
    remAsk: "Quando te lo ricordo?",
    remAskPh: "es. domani, tra 3 giorni, lunedì",
    remHint: "Scrivi come parli: “tra 3 giorni devo chiamare il dentista”.",
    remTalk: "Parla con Alba",
    remTitle: "Alba ti ricorda",
    remHello: "Cosa devo ricordarti?",
    remPlaceholder: "Ricordami che tra 3 giorni devo…",
    remNext: "Nel prossimo brief",
    remPick: "Un giorno preciso",
    remSaved: (e) => `Fatto: te lo ricordo ${e}.`,
    remNextLabel: "nel brief di domani",
    remOnDay: (e) => `nel brief di ${e}`,
    remPending: "Te lo ricorderò",
    remDelete: "Togli",
    remSince: (e) => `chiesto il ${e}`,
    ghOrgTitle: "Organizzazioni GitHub",
    ghOrgExclude: "Tutte tranne queste",
    ghOrgInclude: "Solo queste",
    ghOrgPh: "es. org1, org2",
    ghOrgHint: "Filtra le notifiche di questo account per organizzazione. Lascia vuoto per non filtrare.",
    liCoTitle: "Pagina aziendale",
    liCoPh: "es. acme",
    liCoHint: "Scrivi solo il nome della pagina, non l'URL intero: se la pagina è linkedin.com/company/acme/, scrivi solo acme.",
    liCoProfile: "Solo il profilo personale",
    liCoBoth: "Profilo e pagina aziendale",
    liCoOnly: "Solo la pagina aziendale",
    folderName: "Cartella locale",
    defaultSpaces: ["Lavoro", "Personale"],
    voteUp: "Più così",
    voteDown: "Meno così",
    goDone: "Avviato",
    patTitle: "File da leggere",
    patInclude: "Solo questi (es. *.md, note/*)",
    patExclude: "Mai questi (es. *.log, archivio/*)",
    patHint: "Pattern separati da virgole. Lascia vuoti entrambi per leggere tutto.",
    webTitle: "Cosa seguire",
    webFree: "Ricerca libera, dal mio profilo e dal focus",
    webSites: "Solo questi siti",
    webSitesPh: "es. example.com, another.org",
    webBlockPh: "Mai da: siti o parole, es. example.com, gossip",
    webHint: "La ricerca libera cerca notizie su quello che hai scritto nel profilo e nel focus di questa app. Con un elenco, legge solo quei siti.",
    webPh: "Dai un nome, es. Notizie di settore",
    snailLines: ["Ciao Alba, tutto bene quassù?", "Passavo di qui, tutto tranquillo?", "Che bella giornata per un giro, no?", "Ho fatto un bel viaggio per arrivare fin qui, sai?", "Il prato dietro l'angolo oggi è affollato."],
    snailReplies: ["Coccodè, tutto a posto qui!", "Sì, giornata tranquilla finora.", "Anche per me, sto giusto facendo due passi.", "Beh, sei più lenta di me ma arrivi sempre!", "Qui tranquillo, vieni pure quando vuoi."],
    profile: "Profilo",
    deleteSpace: "Elimina profilo",
    bannerSub: "Cosa devi sapere oggi, in una pagina",
    bannerDays: "Lun–Ven",
    bannerAccounts: "account",
    bannerApps: "app",
    bannerSpaces: "spazi",
    connTitle: "Fonti",
    connSub: (e) => `${e} account collegati. Scegli uno spazio, poi aggiungi gli account: finiscono lì. Le credenziali non si inseriscono qui: l'accesso si fa dall'integrazione di Crew o dal browser.`,
    all: "Tutti",
    newSpace: "+ Nuovo spazio",
    delSpace: "Elimina questo spazio (è vuoto)",
    addTo: (e) => `Aggiungi a ${e}…`,
    createFirst: "Crea prima uno spazio",
    pause: "Metti in pausa",
    resume: "Riattiva",
    remove: "Rimuovi",
    add: "Aggiungi",
    integration: "integrazione",
    page: "pagina aperta",
    readFail: "Non riesco a leggere le connessioni salvate.",
    saveFail: "Salvataggio non riuscito.",
    chatFail: "Non riesco ad aprire la chat da qui.",
    apps: { web: "Notizie dal web sui tuoi temi", gmail: "Posta in arrivo, non letti e con stella", calendar: "Riunioni e impegni di oggi", drive: "File modificati di recente", slack: "Menzioni, DM e canali scelti", discord: "Letto dalla pagina aperta, senza bot", jira: "Issue assegnate a te", confluence: "Pagine che osservi", folder: "Cerca quello che scrivi nel focus", claudecode: "Riprendi da dove avevi lasciato", kiro: "Riprendi da dove avevi lasciato", googlechat: "Messaggi diretti e tag", linkedin: "Statistiche e inviti", notion: "Pagine e aggiornamenti", linear: "Issue assegnate", trello: "Schede assegnate e scadenze", outlook: "Posta Outlook, non letti e riunioni", teams: "Chat e canali di Teams, menzioni", telegram: "Messaggi e chat scelte (sola lettura)", youtrack: "Issue assegnate e in scadenza", github: "Notifiche e pull request" },
    connect: "Collega",
    chatReset: "Nuova conversazione",
    lnkUrl: "Indirizzo (https://nome.youtrack.cloud)",
    lnkToken: "Token permanente",
    lnkGo: "Collega",
    lnkOk: "Collegato · {n} issue",
    lnkNo: "Da collegare",
    lnkOff: "Scollega",
    lnkSafe: "Il token va nel deposito segreti del sistema (Portachiavi, Gestione credenziali o Secret Service): non finisce nei file di Alba e l'agente non lo vede mai.",
    lnkSync: "Aggiorna ora",
    lnkRO: "Sola lettura",
    lnkWeak: "Nessun deposito segreti trovato: il token resta in un file privato nella tua cartella utente (meno sicuro). Su Linux installa libsecret-tools.",
    gId: "ID client Google (…apps.googleusercontent.com)",
    gSecret: "Segreto client Google",
    gSign: "Accedi con Google",
    gWait: "In attesa dell'accesso nella scheda di Google…",
    gHow: "Una volta sola: in Google Cloud Console abilita la Gmail API e crea un ID client OAuth di tipo «App desktop», poi incolla qui ID e segreto. Alba chiede solo la lettura della posta.",
    bLogin: "Accedi con il browser",
    bMsg: "Apri nel browser di Crew la pagina di {app} per l'account {acc} (profilo {sp}), aspetta che io faccia l'accesso (ti passo io il controllo) e, quando vedi la vista principale (per esempio la posta in arrivo o il calendario), avvisami. Non cliccare su nulla che modifichi qualcosa e non leggere ancora nulla. [alba-login:{key}]",
    stOk: "Verificato {t}",
    stOld: "Da verificare ({t})",
    stSignin: "Accesso scaduto: riaccedi",
    stErr: "Errore nel controllo",
    stNever: "Mai verificato",
    stCheck: "Verifica ora",
    stCheckMsg: "Controlla ora l'accesso di {app} per l'account {acc} (profilo {sp}) seguendo la skill alba-health. [alba-health:{key}:{id}]",
    stBusy: "Controllo in corso…",
    loginHint: "Se la scheda di accesso sicura non compare qui sotto, aprila in Crew.",
    loginOpen: "Apri la scheda di accesso",
    secNo: "Credenziale non ancora inserita",
    secYes: "Credenziale presente: premi Verifica",
    secVerify: "Verifica",
    secCopy: "Copia comando",
    secCopied: "Copiato",
    secSafe: "Una volta sola, sul tuo computer. La password non passa da Alba né dall'agente: la digiti al prompt nascosto del Terminale e va nel deposito segreti del sistema.",
    secGmail: "1) Attiva la verifica in due passaggi sul tuo account Google. 2) Crea una password per le app (nome: Alba). 3) Copia il comando, incollalo nel Terminale e digita la password. 4) Torna qui e premi Verifica.",
    secCal: "1) In Google Calendar apri le impostazioni del calendario > Integra il calendario > Indirizzo segreto in formato iCal e copialo. 2) Copia il comando, incollalo nel Terminale e incolla l'indirizzo. 3) Torna qui e premi Verifica.",
    secLinkApp: "Password per le app",
    secLinkCal: "Impostazioni calendario",
    secPhGmail: "Incolla qui la password per le app",
    secPhCal: "Incolla qui l'indirizzo segreto iCal",
    secSave: "Salva e verifica",
    secAsk: "Chiedi ad Alba",
    secGuide: "Ti guido io nei passi. Incolla il valore solo nel campo qui sotto, mai in chat: va nel deposito segreti del sistema e l'agente non lo vede.",
    secAskMsg: "Guidami a collegare {app} per l'account {acc} (profilo {sp}). Spiegami i passi uno alla volta con i link giusti. Il valore dovrò incollarlo io nel campo sicuro della pagina Fonti: non chiedermelo e non scriverlo mai in chat.",
    connAll: "Collega tutto",
    connAllMsg: "Guidami a collegare tutti questi account in un colpo solo: {list}. Raggruppa i passi per tipo (una sola spiegazione per tutte le password per le app di Gmail, una per gli indirizzi iCal, ecc.) con i link giusti, così preparo tutto insieme. Incollerò i valori io nei campi sicuri della pagina Fonti, che si sono aperti tutti insieme: non chiedermeli e non scriverli mai in chat.",
    setupReady: "Pagina di configurazione pronta.",
    setupOpen: "Apri nel browser",
    setupCopy: "Copia indirizzo",
    setupCopied: "Copiato",
    unitItem: "voci",
    unitMail: "mail",
    unitEvent: "eventi",
    unitFile: "file",
    apiOff: "API non abilitata in Google Cloud: abilitala ↗",
    unitMsg: "messaggi",
    toastTitle: "Il brief è pronto",
    toastOpen: "Apri il brief",
    toastClose: "Chiudi",
    toastMore: "altre novità",
    toastUpdates: "novità",
    toastTodo: "da fare",
    toastReminders: "promemoria",
    toastLater: "Più tardi",
    connectMsg: (e) => "Collega {n} ad Alba: guidami passo passo.".replace("{n}", e)
  },
  en: {
    today: "Today",
    connections: "Sources",
    emptyTitle: (e) => `No brief yet for ${e || "this space"}`,
    emptyBody: 'It runs on its own at 8:00 on weekdays. To get it now press Cmd+K and pick "Alba · Run now". When it is ready it shows up here, not in chat.',
    loading: "Loading…",
    emptyTab: "empty",
    moreIcons: "More icons",
    iconSearch: "Search an icon…",
    close: "Close",
    focusTitle: "Focus",
    focusNone: "Add an account to this profile to write what Alba should look for.",
    focusReset: "Reset",
    aboutTitle: "About you",
    aboutHint: "A line on who you are and what you do: helps Alba judge what really matters to you, in the brief, the LinkedIn suggestions and the Slack recaps.",
    aboutPh: "E.g. I run a small design studio, I deal with clients and suppliers, and I organize a book club in the evenings.",
    showUnused: (e) => `+ ${e} unused connections`,
    hideUnused: "Hide unused",
    folderPh: "/path/to/the/folder",
    heroPre: "Dawn of",
    secPush: "Push your work forward",
    secTodos: "Top to-dos",
    secUpdates: "New updates",
    go: "On it",
    footMade: "Made for you by Alba using",
    footApps: "your apps",
    unread: "Not read",
    done: "Done",
    freqTitle: "When to read {app}",
    freqEvery: "Every brief",
    freqWeekly: "Only on chosen days",
    freqOff: "Never",
    freqHint: "On the other days the source is left out of the brief.",
    avStatus: "Status",
    schedTitle: "When the brief runs",
    schedHint: "It starts from this time on the chosen days. If the computer is off, it starts as soon as you turn it on.",
    schedTime: "Time",
    regen: "Refresh brief",
    regenOn: "Working…",
    regenErr: "Failed: retry",
    late: "overdue",
    ageDays: (e) => e === 1 ? "since yesterday" : `for ${e} days`,
    parked: "To revisit",
    completed: (e) => `Completed (${e})`,
    dismiss: "No longer needed",
    reopen: "Reopen",
    viaSource: "resolved at the source",
    noTasks: "Nothing pending.",
    chooseIcon: "Choose icon",
    renameSpace: "Rename",
    manageSpaces: "Manage spaces",
    pickSpaceHint: "Select a space in the bar below to change its icon",
    chooseColor: "Choose color",
    openIn: (e) => `Open in ${e}`,
    dragHint: "Drag the profile icons in the bar below to reorder them.",
    remToChat: "That one is for the full chat: opening it.",
    cluck: "Cluck!",
    teasers: ["Cluck… did something just come to mind?", "Did something just come to mind that you should not forget?", "Hey… got a minute?", "I have a good memory, you know.", "Go on, the brief is all set.", "Anything tomorrow-you will need to remember?"],
    teaseLate: (e) => e === 1 ? "There is one thing that has been waiting for a few days…" : `There are ${e} things that have been waiting for a few days…`,
    teasePending: (e) => e === 1 ? "I still have one thing to remind you of, but I will not say which." : `I still have ${e} things to remind you of, but I will not say which.`,
    teaseFresh: "I left you a thought in today's brief.",
    chatPlaceholder: "Write to Alba…",
    chatUnavailable: "I cannot open the chat here. Crew may ask you to allow Alba to use chat.",
    chatBack: "Reminders",
    chatOpenCrew: "Open in Crew",
    goLines: ["Let's", "do it →"],
    chatAbout: "Start a chat about this",
    chatHint: "Write like you speak, even “in 3 days I need to call the dentist”. If something is unclear, I will ask you.",
    remAsk: "When should I remind you?",
    remAskPh: "e.g. tomorrow, in 3 days, Monday",
    remHint: "Write it like you speak: “in 3 days I need to call the dentist”.",
    remTalk: "Talk to Alba",
    remTitle: "Alba reminds you",
    remHello: "What should I remind you of?",
    remPlaceholder: "Remind me that in 3 days I need to…",
    remNext: "In the next brief",
    remPick: "A specific day",
    remSaved: (e) => `Done: I will remind you ${e}.`,
    remNextLabel: "in tomorrow's brief",
    remOnDay: (e) => `in the brief of ${e}`,
    remPending: "I will remind you",
    remDelete: "Remove",
    remSince: (e) => `asked on ${e}`,
    ghOrgTitle: "GitHub organizations",
    ghOrgExclude: "All except these",
    ghOrgInclude: "Only these",
    ghOrgPh: "e.g. org1, org2",
    ghOrgHint: "Filter this account's notifications by organization. Leave empty to not filter.",
    liCoTitle: "Company page",
    liCoPh: "e.g. acme",
    liCoHint: "Write just the page's name, not the full URL: if the page is linkedin.com/company/acme/, write just acme.",
    liCoProfile: "Personal profile only",
    liCoBoth: "Profile and company page",
    liCoOnly: "Company page only",
    folderName: "Local folder",
    defaultSpaces: ["Work", "Personal"],
    voteUp: "More like this",
    voteDown: "Less like this",
    goDone: "Started",
    patTitle: "Files to read",
    patInclude: "Only these (e.g. *.md, notes/*)",
    patExclude: "Never these (e.g. *.log, archive/*)",
    patHint: "Patterns separated by commas. Leave both empty to read everything.",
    webTitle: "What to watch",
    webFree: "Free search, from my profile and focus",
    webSites: "Only these sites",
    webSitesPh: "e.g. example.com, another.org",
    webBlockPh: "Never from: sites or words, e.g. example.com, gossip",
    webHint: "Free search looks for news on what you wrote in your profile and in this app's focus. With a list, only those sites are read.",
    webPh: "Name this watch, e.g. Industry news",
    snailLines: ["Hi Alba, all good up here?", "Just passing through, everything calm?", "Lovely day for a stroll, isn't it?", "I came a long way to get here, you know.", "The lawn around the corner is quite crowded today."],
    snailReplies: ["Cluck, all good here!", "Yes, a quiet day so far.", "Same here, just stretching my legs.", "Well, you're slower than me but you always make it!", "Quiet here, come by whenever you like."],
    profile: "Profile",
    deleteSpace: "Delete profile",
    bannerSub: "What you need to know today, on one page",
    bannerDays: "Mon–Fri",
    bannerAccounts: "accounts",
    bannerApps: "apps",
    bannerSpaces: "spaces",
    connTitle: "Sources",
    connSub: (e) => `${e} accounts connected. Pick a space, then add accounts: they land there. Credentials are not entered here: sign in through the Crew integration or the browser.`,
    all: "All",
    newSpace: "+ New space",
    delSpace: "Delete this space (it is empty)",
    addTo: (e) => `Add to ${e}…`,
    createFirst: "Create a space first",
    pause: "Pause",
    resume: "Resume",
    remove: "Remove",
    add: "Add",
    integration: "integration",
    page: "open page",
    readFail: "Could not read the saved connections.",
    saveFail: "Saving failed.",
    chatFail: "Could not open the chat from here.",
    apps: { web: "News from the web on your topics", gmail: "Inbox, unread and starred", calendar: "Today's meetings and commitments", drive: "Recently modified files", slack: "Mentions, DMs and chosen channels", discord: "Read from the open page, no bot", jira: "Issues assigned to you", confluence: "Pages you watch", folder: "Searches for what you write in focus", claudecode: "Pick up where you left off", kiro: "Pick up where you left off", googlechat: "Direct messages and tags", linkedin: "Stats and invitations", notion: "Pages and updates", linear: "Assigned issues", trello: "Cards assigned to you and due dates", outlook: "Outlook mail, unread and meetings", teams: "Teams chats and channels, mentions", telegram: "Messages and chosen chats (read-only)", youtrack: "Assigned and due issues", github: "Notifications and pull requests" },
    connect: "Connect",
    chatReset: "New conversation",
    lnkUrl: "Address (https://name.youtrack.cloud)",
    lnkToken: "Permanent token",
    lnkGo: "Connect",
    lnkOk: "Connected · {n} issues",
    lnkNo: "Not connected",
    lnkOff: "Disconnect",
    lnkSafe: "The token goes into the operating system's secret store (Keychain, Credential Manager or Secret Service): it is not written to Alba's files and the agent never sees it.",
    lnkSync: "Refresh now",
    lnkRO: "Read-only",
    lnkWeak: "No system secret store found: the token is kept in a private file in your home folder (less safe). On Linux install libsecret-tools.",
    gId: "Google client ID (…apps.googleusercontent.com)",
    gSecret: "Google client secret",
    gSign: "Sign in with Google",
    gWait: "Waiting for sign-in in the Google tab…",
    gHow: "Once only: in Google Cloud Console enable the Gmail API and create an OAuth client ID of type “Desktop app”, then paste the ID and secret here. Alba only asks to read your mail.",
    bLogin: "Sign in with the browser",
    bMsg: "Open the {app} page in the Crew browser for the account {acc} (profile {sp}), wait for me to sign in (I take over control) and tell me when you see the main view (for example the inbox or the calendar). Do not click anything that changes something and do not read anything yet. [alba-login:{key}]",
    stOk: "Verified {t}",
    stOld: "To verify ({t})",
    stSignin: "Signed out: sign in again",
    stErr: "Check failed",
    stNever: "Never verified",
    stCheck: "Check now",
    stCheckMsg: "Check now the sign-in of {app} for the account {acc} (profile {sp}) following the alba-health skill. [alba-health:{key}:{id}]",
    stBusy: "Checking…",
    loginHint: "If the secure sign-in sheet does not show up below, open it in Crew.",
    loginOpen: "Open the sign-in sheet",
    secNo: "Credential not entered yet",
    secYes: "Credential present: press Verify",
    secVerify: "Verify",
    secCopy: "Copy command",
    secCopied: "Copied",
    secSafe: "Once only, on your computer. The password never goes through Alba or the agent: you type it at the Terminal's hidden prompt and it lands in the system secret store.",
    secGmail: "1) Turn on 2-step verification on your Google account. 2) Create an app password (name: Alba). 3) Copy the command, paste it in the Terminal and type the password. 4) Come back here and press Verify.",
    secCal: "1) In Google Calendar open the calendar settings > Integrate calendar > Secret address in iCal format and copy it. 2) Copy the command, paste it in the Terminal and paste the address. 3) Come back here and press Verify.",
    secLinkApp: "App passwords",
    secLinkCal: "Calendar settings",
    secPhGmail: "Paste the app password here",
    secPhCal: "Paste the secret iCal address here",
    secSave: "Save and verify",
    secAsk: "Ask Alba",
    secGuide: "I will guide you through the steps. Paste the value only in the field below, never in chat: it goes into the system secret store and the agent never sees it.",
    secAskMsg: "Guide me to connect {app} for the account {acc} (profile {sp}). Explain the steps one at a time with the right links. I will paste the value myself into the secure field in the Sources page: do not ask me for it and never write it in chat.",
    connAll: "Connect all",
    connAllMsg: "Guide me to connect all these accounts in one go: {list}. Group the steps by type (one explanation for all Gmail app passwords, one for the iCal addresses, etc.) with the right links so I can prepare everything together. I will paste the values myself into the secure fields in the Sources page, which are all open at once: do not ask me for them and never write them in chat.",
    setupReady: "Setup page ready.",
    setupOpen: "Open in browser",
    setupCopy: "Copy address",
    setupCopied: "Copied",
    unitItem: "items",
    unitMail: "emails",
    unitEvent: "events",
    unitFile: "files",
    apiOff: "API not enabled in Google Cloud: enable it ↗",
    unitMsg: "messages",
    toastTitle: "Your brief is ready",
    toastOpen: "Open the brief",
    toastClose: "Close",
    toastMore: "more updates",
    toastUpdates: "updates",
    toastTodo: "to do",
    toastReminders: "reminders",
    toastLater: "Later",
    connectMsg: (e) => "Connect {n} to Alba: guide me step by step.".replace("{n}", e)
  },
  es: {
    today: "Hoy",
    connections: "Fuentes",
    emptyTitle: (e) => `Aún no hay resumen para ${e || "este espacio"}`,
    emptyBody: 'Se genera solo a las 8:00 los días laborables. Para tenerlo ya pulsa Cmd+K y elige "Alba · Run now". Cuando esté listo aparece aquí, no en el chat.',
    loading: "Cargando…",
    emptyTab: "vacío",
    moreIcons: "Más iconos",
    iconSearch: "Buscar un icono…",
    close: "Cerrar",
    focusTitle: "Foco",
    focusNone: "Añade una cuenta a este perfil para escribir qué debe buscar Alba.",
    focusReset: "Restablecer",
    aboutTitle: "Sobre ti",
    aboutHint: "Una línea sobre quién eres y a qué te dedicas: ayuda a Alba a juzgar qué te importa de verdad, en el resumen, las sugerencias de LinkedIn y los resúmenes de Slack.",
    aboutPh: "Ej. Dirijo un pequeño estudio de diseño, trato con clientes y proveedores y por las tardes organizo un club de lectura.",
    showUnused: (e) => `+ ${e} conexiones sin usar`,
    hideUnused: "Ocultar las no usadas",
    folderPh: "/ruta/de/la/carpeta",
    heroPre: "El amanecer del",
    secPush: "Impulsa tu trabajo",
    secTodos: "Tareas principales",
    secUpdates: "Novedades",
    go: "Vamos",
    footMade: "Preparado para ti por Alba con",
    footApps: "tus apps",
    unread: "Sin leer",
    done: "Hecho",
    freqTitle: "Cuándo leer {app}",
    freqEvery: "Cada brief",
    freqWeekly: "Solo los días elegidos",
    freqOff: "Nunca",
    freqHint: "Los demás días la fuente queda fuera del brief.",
    avStatus: "Estado",
    schedTitle: "Cuándo sale el brief",
    schedHint: "Empieza a esta hora en los días elegidos. Si el equipo está apagado, empieza en cuanto lo enciendas.",
    schedTime: "Hora",
    regen: "Actualizar brief",
    regenOn: "En curso…",
    regenErr: "Falló: reintentar",
    late: "atrasada",
    ageDays: (e) => e === 1 ? "desde ayer" : `desde hace ${e} días`,
    parked: "Por revisar",
    completed: (e) => `Completadas (${e})`,
    dismiss: "Ya no hace falta",
    reopen: "Reabrir",
    viaSource: "resuelta en la fuente",
    noTasks: "Nada pendiente.",
    chooseIcon: "Elegir icono",
    renameSpace: "Renombrar",
    manageSpaces: "Gestionar espacios",
    pickSpaceHint: "Selecciona un espacio en la barra de abajo para cambiar su icono",
    chooseColor: "Elegir color",
    openIn: (e) => `Abrir en ${e}`,
    dragHint: "Arrastra los iconos de perfil en la barra de abajo para reordenarlos.",
    remToChat: "Eso es para el chat completo: te lo abro.",
    cluck: "¡Coc, coc!",
    teasers: ["Coc, coc… ¿se te ha ocurrido algo?", "¿Se te ha ocurrido algo que no quieras olvidar?", "Eh… ¿tienes un momento?", "Tengo buena memoria, ¿sabes?", "Dime, el resumen ya está listo.", "¿Algo que mañana necesitarás recordar?"],
    teaseLate: (e) => e === 1 ? "Hay una cosa que lleva unos días esperando…" : `Hay ${e} cosas que llevan unos días esperando…`,
    teasePending: (e) => e === 1 ? "Aún tengo una cosa que recordarte, pero no te digo cuál." : `Aún tengo ${e} cosas que recordarte, pero no te digo cuáles.`,
    teaseFresh: "Te he dejado un pensamiento en el resumen de hoy.",
    chatPlaceholder: "Escribe a Alba…",
    chatUnavailable: "No puedo abrir el chat aquí. Crew puede pedirte que autorices a Alba a usar el chat.",
    chatBack: "Recordatorios",
    chatOpenCrew: "Abrir en Crew",
    goLines: ["Voy", "yo →"],
    chatAbout: "Iniciar un chat sobre esto",
    chatHint: "Escribe como hablas, incluso “en 3 días tengo que llamar al dentista”. Si algo no está claro, te lo pregunto yo.",
    remAsk: "¿Cuándo te lo recuerdo?",
    remAskPh: "p. ej. mañana, en 3 días, el lunes",
    remHint: "Escribe como hablas: “en 3 días tengo que llamar al dentista”.",
    remTalk: "Habla con Alba",
    remTitle: "Alba te recuerda",
    remHello: "¿Qué quieres que te recuerde?",
    remPlaceholder: "Recuérdame que en 3 días tengo que…",
    remNext: "En el próximo resumen",
    remPick: "Un día concreto",
    remSaved: (e) => `Hecho: te lo recordaré ${e}.`,
    remNextLabel: "en el resumen de mañana",
    remOnDay: (e) => `en el resumen del ${e}`,
    remPending: "Te lo recordaré",
    remDelete: "Quitar",
    remSince: (e) => `pedido el ${e}`,
    ghOrgTitle: "Organizaciones de GitHub",
    ghOrgExclude: "Todas menos estas",
    ghOrgInclude: "Solo estas",
    ghOrgPh: "ej. org1, org2",
    ghOrgHint: "Filtra las notificaciones de esta cuenta por organización. Déjalo vacío para no filtrar.",
    liCoTitle: "Página de empresa",
    liCoPh: "ej. acme",
    liCoHint: "Escribe solo el nombre de la página, no la URL completa: si la página es linkedin.com/company/acme/, escribe solo acme.",
    liCoProfile: "Solo el perfil personal",
    liCoBoth: "Perfil y página de empresa",
    liCoOnly: "Solo la página de empresa",
    folderName: "Carpeta local",
    defaultSpaces: ["Trabajo", "Personal"],
    voteUp: "Más como esto",
    voteDown: "Menos como esto",
    goDone: "Iniciado",
    patTitle: "Archivos que leer",
    patInclude: "Solo estos (ej. *.md, notas/*)",
    patExclude: "Nunca estos (ej. *.log, archivo/*)",
    patHint: "Patrones separados por comas. Deja ambos vacíos para leerlo todo.",
    webTitle: "Qué seguir",
    webFree: "Búsqueda libre, según mi perfil y el foco",
    webSites: "Solo estos sitios",
    webSitesPh: "ej. example.com, another.org",
    webBlockPh: "Nunca de: sitios o palabras, ej. example.com, cotilleos",
    webHint: "La búsqueda libre busca noticias sobre lo que escribiste en tu perfil y en el foco de esta app. Con una lista, solo se leen esos sitios.",
    webPh: "Ponle un nombre, ej. Noticias del sector",
    snailLines: ["Hola Alba, ¿todo bien por aquí?", "Solo pasaba por aquí, ¿todo tranquilo?", "Qué buen día para pasear, ¿no?", "Hice un largo viaje para llegar hasta aquí, ¿sabes?", "El césped de la esquina está bastante concurrido hoy."],
    snailReplies: ["¡Coc coc, todo bien por aquí!", "Sí, un día tranquilo hasta ahora.", "Igual que yo, estirando las patas.", "Bueno, eres más lenta que yo pero siempre llegas.", "Aquí tranquilo, ven cuando quieras."],
    profile: "Perfil",
    deleteSpace: "Eliminar perfil",
    bannerSub: "Lo que necesitas saber hoy, en una página",
    bannerDays: "Lun–Vie",
    bannerAccounts: "cuentas",
    bannerApps: "apps",
    bannerSpaces: "espacios",
    connTitle: "Fuentes",
    connSub: (e) => `${e} cuentas conectadas. Elige un espacio y añade cuentas: se guardan ahí. Las credenciales no se escriben aquí: se accede desde la integración de Crew o el navegador.`,
    all: "Todos",
    newSpace: "+ Nuevo espacio",
    delSpace: "Eliminar este espacio (está vacío)",
    addTo: (e) => `Añadir a ${e}…`,
    createFirst: "Crea primero un espacio",
    pause: "Pausar",
    resume: "Reanudar",
    remove: "Quitar",
    add: "Añadir",
    integration: "integración",
    page: "página abierta",
    readFail: "No puedo leer las conexiones guardadas.",
    saveFail: "No se pudo guardar.",
    chatFail: "No puedo abrir el chat desde aquí.",
    apps: { web: "Noticias de la web sobre tus temas", gmail: "Bandeja de entrada, no leídos y destacados", calendar: "Reuniones y compromisos de hoy", drive: "Archivos modificados recientemente", slack: "Menciones, mensajes directos y canales elegidos", discord: "Leído desde la página abierta, sin bot", jira: "Incidencias asignadas a ti", confluence: "Páginas que observas", folder: "Busca lo que escribes en el foco", claudecode: "Retoma donde lo dejaste", kiro: "Retoma donde lo dejaste", googlechat: "Mensajes directos y menciones", linkedin: "Estadísticas e invitaciones", notion: "Páginas y novedades", linear: "Incidencias asignadas", trello: "Tarjetas asignadas y vencimientos", outlook: "Correo de Outlook, no leídos y reuniones", teams: "Chats y canales de Teams, menciones", telegram: "Mensajes y chats elegidos (solo lectura)", youtrack: "Incidencias asignadas y por vencer", github: "Notificaciones y pull requests" },
    connect: "Conectar",
    chatReset: "Nueva conversación",
    lnkUrl: "Dirección (https://nombre.youtrack.cloud)",
    lnkToken: "Token permanente",
    lnkGo: "Conectar",
    lnkOk: "Conectado · {n} incidencias",
    lnkNo: "Sin conectar",
    lnkOff: "Desconectar",
    lnkSafe: "El token va al almacén de secretos del sistema (Llavero, Administrador de credenciales o Secret Service): no se escribe en los archivos de Alba y el agente nunca lo ve.",
    lnkSync: "Actualizar ahora",
    lnkRO: "Solo lectura",
    lnkWeak: "No se encontró almacén de secretos: el token queda en un archivo privado en tu carpeta de usuario (menos seguro). En Linux instala libsecret-tools.",
    gId: "ID de cliente de Google (…apps.googleusercontent.com)",
    gSecret: "Secreto de cliente de Google",
    gSign: "Iniciar sesión con Google",
    gWait: "Esperando el inicio de sesión en la pestaña de Google…",
    gHow: "Solo una vez: en Google Cloud Console activa la Gmail API y crea un ID de cliente OAuth de tipo «App de escritorio»; pega aquí el ID y el secreto. Alba solo pide leer el correo.",
    bLogin: "Iniciar sesión con el navegador",
    bMsg: "Abre la página de {app} en el navegador de Crew para la cuenta {acc} (perfil {sp}), espera a que inicie sesión (yo tomo el control) y avísame cuando veas la vista principal (por ejemplo la bandeja de entrada o el calendario). No hagas clic en nada que modifique algo y no leas nada todavía. [alba-login:{key}]",
    stOk: "Verificado {t}",
    stOld: "Por verificar ({t})",
    stSignin: "Sesión caducada: inicia sesión",
    stErr: "Error en la comprobación",
    stNever: "Nunca verificado",
    stCheck: "Comprobar ahora",
    stCheckMsg: "Comprueba ahora el acceso de {app} para la cuenta {acc} (perfil {sp}) siguiendo la skill alba-health. [alba-health:{key}:{id}]",
    stBusy: "Comprobando…",
    loginHint: "Si la hoja de inicio de sesión segura no aparece abajo, ábrela en Crew.",
    loginOpen: "Abrir la hoja de inicio de sesión",
    secNo: "Credencial aún no introducida",
    secYes: "Credencial presente: pulsa Verificar",
    secVerify: "Verificar",
    secCopy: "Copiar comando",
    secCopied: "Copiado",
    secSafe: "Solo una vez, en tu ordenador. La contraseña no pasa por Alba ni por el agente: la escribes en el prompt oculto del Terminal y va al almacén de secretos del sistema.",
    secGmail: "1) Activa la verificación en dos pasos en tu cuenta de Google. 2) Crea una contraseña de aplicación (nombre: Alba). 3) Copia el comando, pégalo en el Terminal y escribe la contraseña. 4) Vuelve aquí y pulsa Verificar.",
    secCal: "1) En Google Calendar abre la configuración del calendario > Integrar el calendario > Dirección secreta en formato iCal y cópiala. 2) Copia el comando, pégalo en el Terminal y pega la dirección. 3) Vuelve aquí y pulsa Verificar.",
    secLinkApp: "Contraseñas de aplicación",
    secLinkCal: "Configuración del calendario",
    secPhGmail: "Pega aquí la contraseña de aplicación",
    secPhCal: "Pega aquí la dirección secreta iCal",
    secSave: "Guardar y verificar",
    secAsk: "Preguntar a Alba",
    secGuide: "Te guío paso a paso. Pega el valor solo en el campo de abajo, nunca en el chat: va al almacén de secretos del sistema y el agente no lo ve.",
    secAskMsg: "Guíame para conectar {app} para la cuenta {acc} (perfil {sp}). Explícame los pasos uno a uno con los enlaces correctos. Pegaré yo el valor en el campo seguro de la página Fuentes: no me lo pidas ni lo escribas nunca en el chat.",
    connAll: "Conectar todo",
    connAllMsg: "Guíame para conectar todas estas cuentas de una vez: {list}. Agrupa los pasos por tipo (una explicación para todas las contraseñas de aplicación de Gmail, otra para las direcciones iCal, etc.) con los enlaces correctos para prepararlo todo junto. Pegaré yo los valores en los campos seguros de la página Fuentes, que se han abierto todos a la vez: no me los pidas ni los escribas nunca en el chat.",
    setupReady: "Página de configuración lista.",
    setupOpen: "Abrir en el navegador",
    setupCopy: "Copiar dirección",
    setupCopied: "Copiado",
    unitItem: "elementos",
    unitMail: "correos",
    unitEvent: "eventos",
    unitFile: "archivos",
    apiOff: "API no habilitada en Google Cloud: habilítala ↗",
    unitMsg: "mensajes",
    toastTitle: "Tu resumen está listo",
    toastOpen: "Abrir el resumen",
    toastClose: "Cerrar",
    toastMore: "novedades más",
    toastUpdates: "novedades",
    toastTodo: "por hacer",
    toastReminders: "recordatorios",
    toastLater: "Más tarde",
    connectMsg: (e) => "Conecta {n} con Alba: guíame paso a paso.".replace("{n}", e)
  },
  fr: {
    today: "Aujourd'hui",
    connections: "Sources",
    emptyTitle: (e) => `Pas encore de résumé pour ${e || "cet espace"}`,
    emptyBody: 'Il se lance tout seul à 8 h les jours ouvrés. Pour l’avoir tout de suite, ouvrez Cmd+K et choisissez "Alba · Run now". Quand il est prêt, il apparaît ici, pas dans le chat.',
    loading: "Chargement…",
    emptyTab: "vide",
    moreIcons: "Plus d’icônes",
    iconSearch: "Rechercher une icône…",
    close: "Fermer",
    focusTitle: "Focus",
    focusNone: "Ajoutez un compte à ce profil pour écrire ce qu’Alba doit chercher.",
    focusReset: "Réinitialiser",
    aboutTitle: "À propos de toi",
    aboutHint: "Une ligne sur qui tu es et ce que tu fais : aide Alba à juger ce qui compte vraiment pour toi, dans le brief, les suggestions LinkedIn et les récapitulatifs Slack.",
    aboutPh: "Ex. Je dirige un petit studio de design, je gère clients et fournisseurs, et le soir j'anime un club de lecture.",
    showUnused: (e) => `+ ${e} connexions inutilisées`,
    hideUnused: "Masquer les inutilisées",
    folderPh: "/chemin/du/dossier",
    heroPre: "L'aube du",
    secPush: "Faites avancer votre travail",
    secTodos: "À faire",
    secUpdates: "Nouveautés",
    go: "On y va",
    footMade: "Préparé pour vous par Alba avec",
    footApps: "vos applis",
    unread: "Non lus",
    done: "Fait",
    freqTitle: "Quand lire {app}",
    freqEvery: "À chaque brief",
    freqWeekly: "Seulement les jours choisis",
    freqOff: "Jamais",
    freqHint: "Les autres jours la source reste hors du brief.",
    avStatus: "État",
    schedTitle: "Quand part le brief",
    schedHint: "Il démarre à cette heure les jours choisis. Si l’ordinateur est éteint, il démarre dès l’allumage.",
    schedTime: "Heure",
    regen: "Actualiser le brief",
    regenOn: "En cours…",
    regenErr: "Échec : réessayer",
    late: "en retard",
    ageDays: (e) => e === 1 ? "depuis hier" : `depuis ${e} jours`,
    parked: "À revoir",
    completed: (e) => `Terminées (${e})`,
    dismiss: "Plus nécessaire",
    reopen: "Rouvrir",
    viaSource: "résolue à la source",
    noTasks: "Rien en attente.",
    chooseIcon: "Choisir l'icône",
    renameSpace: "Renommer",
    manageSpaces: "Gérer les espaces",
    pickSpaceHint: "Sélectionnez un espace dans la barre du bas pour changer son icône",
    chooseColor: "Choisir la couleur",
    openIn: (e) => `Ouvrir dans ${e}`,
    dragHint: "Faites glisser les icônes de profil dans la barre du bas pour les réordonner.",
    remToChat: "Ça, c’est pour le chat complet : je l’ouvre.",
    cluck: "Cot cot !",
    teasers: ["Cot cot… quelque chose vous est venu à l’esprit ?", "Quelque chose à ne pas oublier vous est venu à l’esprit ?", "Dites… vous avez une minute ?", "J’ai une bonne mémoire, vous savez.", "Dites-moi, le résumé est prêt.", "Quelque chose dont vous aurez besoin demain ?"],
    teaseLate: (e) => e === 1 ? "Une chose attend depuis quelques jours…" : `${e} choses attendent depuis quelques jours…`,
    teasePending: (e) => e === 1 ? "J’ai encore une chose à vous rappeler, mais je ne dis pas laquelle." : `J’ai encore ${e} choses à vous rappeler, mais je ne dis pas lesquelles.`,
    teaseFresh: "Je vous ai laissé une pensée dans le résumé d’aujourd’hui.",
    chatPlaceholder: "Écrire à Alba…",
    chatUnavailable: "Je ne peux pas ouvrir le chat ici. Crew peut vous demander d’autoriser Alba à utiliser le chat.",
    chatBack: "Rappels",
    chatOpenCrew: "Ouvrir dans Crew",
    goLines: ["J’y", "vais →"],
    chatAbout: "Démarrer un chat à ce sujet",
    chatHint: "Écrivez comme vous parlez, même « dans 3 jours je dois appeler le dentiste ». Si quelque chose n’est pas clair, je vous le demande.",
    remAsk: "Quand dois-je vous le rappeler ?",
    remAskPh: "ex. demain, dans 3 jours, lundi",
    remHint: "Écrivez comme vous parlez : « dans 3 jours je dois appeler le dentiste ».",
    remTalk: "Parler à Alba",
    remTitle: "Alba vous rappelle",
    remHello: "Que dois-je vous rappeler ?",
    remPlaceholder: "Rappelle-moi que dans 3 jours je dois…",
    remNext: "Dans le prochain résumé",
    remPick: "Un jour précis",
    remSaved: (e) => `C’est noté : je vous le rappellerai ${e}.`,
    remNextLabel: "dans le résumé de demain",
    remOnDay: (e) => `dans le résumé du ${e}`,
    remPending: "Je vous le rappellerai",
    remDelete: "Retirer",
    remSince: (e) => `demandé le ${e}`,
    ghOrgTitle: "Organisations GitHub",
    ghOrgExclude: "Toutes sauf celles-ci",
    ghOrgInclude: "Seulement celles-ci",
    ghOrgPh: "ex. org1, org2",
    ghOrgHint: "Filtre les notifications de ce compte par organisation. Laissez vide pour ne pas filtrer.",
    liCoTitle: "Page entreprise",
    liCoPh: "ex. acme",
    liCoHint: "Écrivez juste le nom de la page, pas l'URL complète : si la page est linkedin.com/company/acme/, écrivez juste acme.",
    liCoProfile: "Uniquement le profil personnel",
    liCoBoth: "Profil et page entreprise",
    liCoOnly: "Uniquement la page entreprise",
    folderName: "Dossier local",
    defaultSpaces: ["Travail", "Personnel"],
    voteUp: "Plus comme ça",
    voteDown: "Moins comme ça",
    goDone: "Lancé",
    patTitle: "Fichiers à lire",
    patInclude: "Seulement ceux-ci (ex. *.md, notes/*)",
    patExclude: "Jamais ceux-ci (ex. *.log, archive/*)",
    patHint: "Motifs séparés par des virgules. Laissez les deux vides pour tout lire.",
    webTitle: "Quoi suivre",
    webFree: "Recherche libre, selon mon profil et le focus",
    webSites: "Seulement ces sites",
    webSitesPh: "ex. example.com, another.org",
    webBlockPh: "Jamais de : sites ou mots, ex. example.com, potins",
    webHint: "La recherche libre cherche des nouvelles sur ce que vous avez écrit dans votre profil et dans le focus de cette app. Avec une liste, seuls ces sites sont lus.",
    webPh: "Donnez un nom, ex. Actualités du secteur",
    snailLines: ["Salut Alba, tout va bien par ici ?", "Je passais par là, tout est calme ?", "Belle journée pour une balade, non ?", "J'ai fait un long voyage pour arriver jusqu'ici, tu sais.", "La pelouse au coin de la rue est bien animée aujourd'hui."],
    snailReplies: ["Cot cot, tout va bien ici !", "Oui, une journée calme jusqu'ici.", "Pareil pour moi, je me dégourdis les pattes.", "Eh bien, tu es plus lente que moi mais tu arrives toujours !", "Calme ici, passe quand tu veux."],
    profile: "Profil",
    deleteSpace: "Supprimer le profil",
    bannerSub: "Ce qu’il faut savoir aujourd’hui, sur une page",
    bannerDays: "Lun–Ven",
    bannerAccounts: "comptes",
    bannerApps: "applis",
    bannerSpaces: "espaces",
    connTitle: "Sources",
    connSub: (e) => `${e} comptes connectés. Choisissez un espace, puis ajoutez des comptes : ils y sont rangés. Les identifiants ne se saisissent pas ici : connectez-vous via l’intégration Crew ou le navigateur.`,
    all: "Tous",
    newSpace: "+ Nouvel espace",
    delSpace: "Supprimer cet espace (il est vide)",
    addTo: (e) => `Ajouter à ${e}…`,
    createFirst: "Créez d'abord un espace",
    pause: "Mettre en pause",
    resume: "Reprendre",
    remove: "Retirer",
    add: "Ajouter",
    integration: "intégration",
    page: "page ouverte",
    readFail: "Impossible de lire les connexions enregistrées.",
    saveFail: "Échec de l'enregistrement.",
    chatFail: "Impossible d'ouvrir le chat d'ici.",
    apps: { web: "Actualités du web sur vos sujets", gmail: "Boîte de réception, non lus et suivis", calendar: "Réunions et engagements d'aujourd'hui", drive: "Fichiers modifiés récemment", slack: "Mentions, messages privés et canaux choisis", discord: "Lu depuis la page ouverte, sans bot", jira: "Tickets qui te sont assignés", confluence: "Pages que tu observes", folder: "Cherche ce que tu écris dans le focus", claudecode: "Reprends où tu en étais", kiro: "Reprends où tu en étais", googlechat: "Messages directs et mentions", linkedin: "Statistiques et invitations", notion: "Pages et mises à jour", linear: "Tickets assignés", trello: "Cartes assignées et échéances", outlook: "Courrier Outlook, non lus et réunions", teams: "Discussions et canaux Teams, mentions", telegram: "Messages et discussions choisies (lecture seule)", youtrack: "Tickets assignés et à échéance", github: "Notifications et pull requests" },
    connect: "Connecter",
    chatReset: "Nouvelle conversation",
    lnkUrl: "Adresse (https://nom.youtrack.cloud)",
    lnkToken: "Jeton permanent",
    lnkGo: "Connecter",
    lnkOk: "Connecté · {n} tickets",
    lnkNo: "Non connecté",
    lnkOff: "Déconnecter",
    lnkSafe: "Le jeton va dans le coffre de secrets du système (Trousseau, Gestionnaire d'identifiants ou Secret Service) : il n'est pas écrit dans les fichiers d'Alba et l'agent ne le voit jamais.",
    lnkSync: "Actualiser",
    lnkRO: "Lecture seule",
    lnkWeak: "Aucun coffre de secrets trouvé : le jeton reste dans un fichier privé de votre dossier utilisateur (moins sûr). Sous Linux, installez libsecret-tools.",
    gId: "ID client Google (…apps.googleusercontent.com)",
    gSecret: "Secret client Google",
    gSign: "Se connecter avec Google",
    gWait: "En attente de la connexion dans l'onglet Google…",
    gHow: "Une seule fois : dans Google Cloud Console, activez l'API Gmail et créez un ID client OAuth de type « Application de bureau », puis collez l'ID et le secret ici. Alba demande uniquement la lecture du courrier.",
    bLogin: "Se connecter avec le navigateur",
    bMsg: "Ouvre la page de {app} dans le navigateur de Crew pour le compte {acc} (profil {sp}), attends que je me connecte (je prends le contrôle) et préviens-moi quand tu vois la vue principale (par exemple la boîte de réception ou l'agenda). Ne clique sur rien qui modifie quoi que ce soit et ne lis rien pour l'instant. [alba-login:{key}]",
    stOk: "Vérifié {t}",
    stOld: "À vérifier ({t})",
    stSignin: "Session expirée : reconnectez-vous",
    stErr: "Échec du contrôle",
    stNever: "Jamais vérifié",
    stCheck: "Vérifier maintenant",
    stCheckMsg: "Vérifie maintenant la connexion de {app} pour le compte {acc} (profil {sp}) selon la skill alba-health. [alba-health:{key}:{id}]",
    stBusy: "Vérification…",
    loginHint: "Si la feuille de connexion sécurisée n'apparaît pas ci-dessous, ouvrez-la dans Crew.",
    loginOpen: "Ouvrir la feuille de connexion",
    secNo: "Identifiant pas encore saisi",
    secYes: "Identifiant présent : appuyez sur Vérifier",
    secVerify: "Vérifier",
    secCopy: "Copier la commande",
    secCopied: "Copié",
    secSafe: "Une seule fois, sur votre ordinateur. Le mot de passe ne passe ni par Alba ni par l'agent : vous le saisissez dans l'invite masquée du Terminal et il va dans le coffre de secrets du système.",
    secGmail: "1) Activez la validation en deux étapes sur votre compte Google. 2) Créez un mot de passe d'application (nom : Alba). 3) Copiez la commande, collez-la dans le Terminal et saisissez le mot de passe. 4) Revenez ici et appuyez sur Vérifier.",
    secCal: "1) Dans Google Agenda ouvrez les paramètres de l'agenda > Intégrer l'agenda > Adresse secrète au format iCal et copiez-la. 2) Copiez la commande, collez-la dans le Terminal et collez l'adresse. 3) Revenez ici et appuyez sur Vérifier.",
    secLinkApp: "Mots de passe d'application",
    secLinkCal: "Paramètres de l'agenda",
    secPhGmail: "Collez ici le mot de passe d'application",
    secPhCal: "Collez ici l'adresse secrète iCal",
    secSave: "Enregistrer et vérifier",
    secAsk: "Demander à Alba",
    secGuide: "Je vous guide pas à pas. Collez la valeur uniquement dans le champ ci-dessous, jamais dans le chat : elle va dans le coffre de secrets du système et l'agent ne la voit pas.",
    secAskMsg: "Guide-moi pour connecter {app} pour le compte {acc} (profil {sp}). Explique les étapes une par une avec les bons liens. Je collerai moi-même la valeur dans le champ sécurisé de la page Sources : ne me la demande pas et ne l'écris jamais dans le chat.",
    connAll: "Tout connecter",
    connAllMsg: "Guide-moi pour connecter tous ces comptes d'un coup : {list}. Regroupe les étapes par type (une explication pour tous les mots de passe d'application Gmail, une pour les adresses iCal, etc.) avec les bons liens afin que je prépare tout ensemble. Je collerai moi-même les valeurs dans les champs sécurisés de la page Sources, tous ouverts à la fois : ne me les demande pas et ne les écris jamais dans le chat.",
    setupReady: "Page de configuration prête.",
    setupOpen: "Ouvrir dans le navigateur",
    setupCopy: "Copier l'adresse",
    setupCopied: "Copié",
    unitItem: "éléments",
    unitMail: "e-mails",
    unitEvent: "événements",
    unitFile: "fichiers",
    apiOff: "API non activée dans Google Cloud : activez-la ↗",
    unitMsg: "messages",
    toastTitle: "Votre brief est prêt",
    toastOpen: "Ouvrir le brief",
    toastClose: "Fermer",
    toastMore: "autres nouveautés",
    toastUpdates: "nouveautés",
    toastTodo: "à faire",
    toastReminders: "rappels",
    toastLater: "Plus tard",
    connectMsg: (e) => "Connecte {n} à Alba : guide-moi pas à pas.".replace("{n}", e)
  },
  de: {
    today: "Heute",
    connections: "Quellen",
    emptyTitle: (e) => `Noch keine Übersicht für ${e || "diesen Bereich"}`,
    emptyBody: 'Sie startet werktags automatisch um 8:00 Uhr. Für sofort drücke Cmd+K und wähle "Alba · Run now". Wenn sie fertig ist, erscheint sie hier, nicht im Chat.',
    loading: "Lädt…",
    emptyTab: "leer",
    moreIcons: "Mehr Symbole",
    iconSearch: "Symbol suchen…",
    close: "Schließen",
    focusTitle: "Fokus",
    focusNone: "Füge diesem Profil ein Konto hinzu, um festzulegen, worauf Alba achten soll.",
    focusReset: "Zurücksetzen",
    aboutTitle: "Über dich",
    aboutHint: "Eine Zeile darüber, wer du bist und was du machst: hilft Alba einzuschätzen, was für dich wirklich zählt, im Briefing, bei LinkedIn-Vorschlägen und Slack-Zusammenfassungen.",
    aboutPh: "Z. B. Ich leite ein kleines Designstudio, betreue Kunden und Lieferanten und organisiere abends einen Lesekreis.",
    showUnused: (e) => `+ ${e} ungenutzte Verbindungen`,
    hideUnused: "Ungenutzte ausblenden",
    folderPh: "/pfad/zum/ordner",
    heroPre: "Morgenröte am",
    secPush: "Bring deine Arbeit voran",
    secTodos: "Wichtigste Aufgaben",
    secUpdates: "Neuigkeiten",
    go: "Los geht’s",
    footMade: "Für dich zusammengestellt von Alba mit",
    footApps: "deinen Apps",
    unread: "Nicht gelesen",
    done: "Erledigt",
    freqTitle: "Wann {app} gelesen wird",
    freqEvery: "Jeder Brief",
    freqWeekly: "Nur an gewählten Tagen",
    freqOff: "Nie",
    freqHint: "An den anderen Tagen bleibt die Quelle außen vor.",
    avStatus: "Status",
    schedTitle: "Wann der Brief startet",
    schedHint: "Er startet ab dieser Uhrzeit an den gewählten Tagen. Ist der Rechner aus, startet er beim Einschalten.",
    schedTime: "Uhrzeit",
    regen: "Brief aktualisieren",
    regenOn: "Läuft…",
    regenErr: "Fehlgeschlagen: erneut",
    late: "überfällig",
    ageDays: (e) => e === 1 ? "seit gestern" : `seit ${e} Tagen`,
    parked: "Zur Wiedervorlage",
    completed: (e) => `Erledigt (${e})`,
    dismiss: "Nicht mehr nötig",
    reopen: "Wieder öffnen",
    viaSource: "an der Quelle erledigt",
    noTasks: "Nichts offen.",
    chooseIcon: "Symbol wählen",
    renameSpace: "Umbenennen",
    manageSpaces: "Bereiche verwalten",
    pickSpaceHint: "Wähle unten in der Leiste einen Bereich, um sein Symbol zu ändern",
    chooseColor: "Farbe wählen",
    openIn: (e) => `In ${e} öffnen`,
    dragHint: "Ziehe die Profilsymbole in der Leiste unten, um sie neu anzuordnen.",
    remToChat: "Das ist etwas für den vollen Chat: ich öffne ihn.",
    cluck: "Gack!",
    teasers: ["Gack… ist dir etwas eingefallen?", "Ist dir etwas eingefallen, das du nicht vergessen willst?", "Hey… hast du kurz Zeit?", "Ich habe ein gutes Gedächtnis, weißt du.", "Sag ruhig, der Überblick ist fertig.", "Etwas, das du morgen brauchen wirst?"],
    teaseLate: (e) => e === 1 ? "Eine Sache wartet schon seit ein paar Tagen…" : `${e} Dinge warten schon seit ein paar Tagen…`,
    teasePending: (e) => e === 1 ? "Ich muss dich noch an eine Sache erinnern, aber ich verrate nicht, an welche." : `Ich muss dich noch an ${e} Dinge erinnern, aber ich verrate nicht, an welche.`,
    teaseFresh: "Ich habe dir einen Gedanken im heutigen Überblick hinterlassen.",
    chatPlaceholder: "Schreib an Alba…",
    chatUnavailable: "Ich kann den Chat hier nicht öffnen. Crew fragt eventuell, ob Alba den Chat nutzen darf.",
    chatBack: "Erinnerungen",
    chatOpenCrew: "In Crew öffnen",
    goLines: ["Ich mach’s", "→"],
    chatAbout: "Chat dazu starten",
    chatHint: "Schreib, wie du sprichst, etwa „in 3 Tagen muss ich den Zahnarzt anrufen“. Wenn mir etwas unklar ist, frage ich nach.",
    remAsk: "Wann soll ich dich erinnern?",
    remAskPh: "z. B. morgen, in 3 Tagen, Montag",
    remHint: "Schreib, wie du sprichst: „in 3 Tagen muss ich den Zahnarzt anrufen“.",
    remTalk: "Mit Alba sprechen",
    remTitle: "Alba erinnert dich",
    remHello: "Woran soll ich dich erinnern?",
    remPlaceholder: "Erinnere mich, dass ich in 3 Tagen … muss",
    remNext: "Im nächsten Überblick",
    remPick: "Ein bestimmter Tag",
    remSaved: (e) => `Erledigt: Ich erinnere dich ${e}.`,
    remNextLabel: "im Überblick von morgen",
    remOnDay: (e) => `im Überblick vom ${e}`,
    remPending: "Ich erinnere dich",
    remDelete: "Entfernen",
    remSince: (e) => `gefragt am ${e}`,
    ghOrgTitle: "GitHub-Organisationen",
    ghOrgExclude: "Alle außer diesen",
    ghOrgInclude: "Nur diese",
    ghOrgPh: "z. B. org1, org2",
    ghOrgHint: "Filtert die Benachrichtigungen dieses Kontos nach Organisation. Leer lassen, um nicht zu filtern.",
    liCoTitle: "Unternehmensseite",
    liCoPh: "z. B. acme",
    liCoHint: "Schreib nur den Namen der Seite, nicht die ganze URL: Wenn die Seite linkedin.com/company/acme/ ist, schreib nur acme.",
    liCoProfile: "Nur persönliches Profil",
    liCoBoth: "Profil und Unternehmensseite",
    liCoOnly: "Nur Unternehmensseite",
    folderName: "Lokaler Ordner",
    defaultSpaces: ["Arbeit", "Privat"],
    voteUp: "Mehr davon",
    voteDown: "Weniger davon",
    goDone: "Gestartet",
    patTitle: "Zu lesende Dateien",
    patInclude: "Nur diese (z. B. *.md, notizen/*)",
    patExclude: "Nie diese (z. B. *.log, archiv/*)",
    patHint: "Muster durch Kommas getrennt. Beide leer lassen, um alles zu lesen.",
    webTitle: "Was beobachten",
    webFree: "Freie Suche, nach meinem Profil und Fokus",
    webSites: "Nur diese Seiten",
    webSitesPh: "z. B. example.com, another.org",
    webBlockPh: "Nie von: Seiten oder Wörtern, z. B. example.com, Klatsch",
    webHint: "Die freie Suche findet Nachrichten zu dem, was du in deinem Profil und im Fokus dieser App geschrieben hast. Mit einer Liste werden nur diese Seiten gelesen.",
    webPh: "Gib einen Namen, z. B. Branchennews",
    snailLines: ["Hallo Alba, alles gut hier oben?", "Ich war gerade in der Nähe, alles ruhig?", "Schöner Tag für einen Spaziergang, oder?", "Ich bin weit gereist, um hierher zu kommen, weißt du.", "Die Wiese um die Ecke ist heute ziemlich voll."],
    snailReplies: ["Gack, hier ist alles gut!", "Ja, bisher ein ruhiger Tag.", "Ich auch, ich vertrete mir gerade die Füße.", "Na ja, du bist langsamer als ich, aber du schaffst es immer!", "Hier ist es ruhig, komm vorbei wann du willst."],
    profile: "Profil",
    deleteSpace: "Profil löschen",
    bannerSub: "Was heute wichtig ist, auf einer Seite",
    bannerDays: "Mo–Fr",
    bannerAccounts: "Konten",
    bannerApps: "Apps",
    bannerSpaces: "Bereiche",
    connTitle: "Quellen",
    connSub: (e) => `${e} Konten verbunden. Wähle einen Bereich und füge Konten hinzu: Sie landen dort. Zugangsdaten werden hier nicht eingegeben: Anmeldung über die Crew-Integration oder den Browser.`,
    all: "Alle",
    newSpace: "+ Neuer Bereich",
    delSpace: "Diesen Bereich löschen (er ist leer)",
    addTo: (e) => `Zu ${e} hinzufügen…`,
    createFirst: "Lege zuerst einen Bereich an",
    pause: "Pausieren",
    resume: "Fortsetzen",
    remove: "Entfernen",
    add: "Hinzufügen",
    integration: "Integration",
    page: "offene Seite",
    readFail: "Gespeicherte Verbindungen konnten nicht gelesen werden.",
    saveFail: "Speichern fehlgeschlagen.",
    chatFail: "Der Chat kann von hier nicht geöffnet werden.",
    apps: { web: "Nachrichten aus dem Web zu deinen Themen", gmail: "Posteingang, Ungelesenes und Markiertes", calendar: "Heutige Termine und Verpflichtungen", drive: "Zuletzt geänderte Dateien", slack: "Erwähnungen, DMs und gewählte Kanäle", discord: "Von der offenen Seite gelesen, ohne Bot", jira: "Dir zugewiesene Issues", confluence: "Von dir beobachtete Seiten", folder: "Sucht, was du im Fokus schreibst", claudecode: "Mach dort weiter, wo du aufgehört hast", kiro: "Mach dort weiter, wo du aufgehört hast", googlechat: "Direktnachrichten und Erwähnungen", linkedin: "Statistiken und Einladungen", notion: "Seiten und Änderungen", linear: "Zugewiesene Issues", trello: "Zugewiesene Karten und Fristen", outlook: "Outlook-Mails, Ungelesenes und Termine", teams: "Teams-Chats und -Kanäle, Erwähnungen", telegram: "Nachrichten und gewählte Chats (nur lesen)", youtrack: "Zugewiesene und fällige Tickets", github: "Benachrichtigungen und Pull Requests" },
    connect: "Verbinden",
    chatReset: "Neues Gespräch",
    lnkUrl: "Adresse (https://name.youtrack.cloud)",
    lnkToken: "Permanentes Token",
    lnkGo: "Verbinden",
    lnkOk: "Verbunden · {n} Tickets",
    lnkNo: "Nicht verbunden",
    lnkOff: "Trennen",
    lnkSafe: "Das Token landet im Geheimnisspeicher des Systems (Schlüsselbund, Anmeldeinformationsverwaltung oder Secret Service): Es steht in keiner Alba-Datei und der Agent sieht es nie.",
    lnkSync: "Jetzt aktualisieren",
    lnkRO: "Nur lesen",
    lnkWeak: "Kein System-Geheimnisspeicher gefunden: Das Token liegt in einer privaten Datei im Benutzerordner (weniger sicher). Unter Linux libsecret-tools installieren.",
    gId: "Google-Client-ID (…apps.googleusercontent.com)",
    gSecret: "Google-Client-Secret",
    gSign: "Mit Google anmelden",
    gWait: "Warte auf die Anmeldung im Google-Tab…",
    gHow: "Einmalig: In der Google Cloud Console die Gmail API aktivieren und eine OAuth-Client-ID vom Typ „Desktop-App“ erstellen, dann ID und Secret hier einfügen. Alba fragt nur Lesezugriff auf die Mails an.",
    bLogin: "Mit dem Browser anmelden",
    bMsg: "Öffne die {app}-Seite im Crew-Browser für das Konto {acc} (Profil {sp}), warte, bis ich mich anmelde (ich übernehme die Kontrolle), und sag mir Bescheid, wenn du die Hauptansicht siehst (z. B. den Posteingang oder den Kalender). Klicke nichts, was etwas ändert, und lies noch nichts. [alba-login:{key}]",
    stOk: "Geprüft {t}",
    stOld: "Zu prüfen ({t})",
    stSignin: "Abgemeldet: neu anmelden",
    stErr: "Prüfung fehlgeschlagen",
    stNever: "Nie geprüft",
    stCheck: "Jetzt prüfen",
    stCheckMsg: "Prüfe jetzt die Anmeldung bei {app} für das Konto {acc} (Profil {sp}) mit der Skill alba-health. [alba-health:{key}:{id}]",
    stBusy: "Prüfe…",
    loginHint: "Erscheint das sichere Anmeldeblatt unten nicht, öffne es in Crew.",
    loginOpen: "Anmeldeblatt öffnen",
    secNo: "Zugangsdaten noch nicht eingegeben",
    secYes: "Zugangsdaten vorhanden: auf Prüfen drücken",
    secVerify: "Prüfen",
    secCopy: "Befehl kopieren",
    secCopied: "Kopiert",
    secSafe: "Nur einmal, auf deinem Computer. Das Passwort läuft weder über Alba noch über den Agenten: Du gibst es an der versteckten Eingabe im Terminal ein und es landet im Geheimnisspeicher des Systems.",
    secGmail: "1) Aktiviere die Bestätigung in zwei Schritten in deinem Google-Konto. 2) Erstelle ein App-Passwort (Name: Alba). 3) Kopiere den Befehl, füge ihn im Terminal ein und tippe das Passwort. 4) Komm zurück und drücke Prüfen.",
    secCal: "1) Öffne in Google Kalender die Kalendereinstellungen > Kalender integrieren > Geheime Adresse im iCal-Format und kopiere sie. 2) Kopiere den Befehl, füge ihn im Terminal ein und füge die Adresse ein. 3) Komm zurück und drücke Prüfen.",
    secLinkApp: "App-Passwörter",
    secLinkCal: "Kalendereinstellungen",
    secPhGmail: "App-Passwort hier einfügen",
    secPhCal: "Geheime iCal-Adresse hier einfügen",
    secSave: "Speichern und prüfen",
    secAsk: "Alba fragen",
    secGuide: "Ich führe dich durch die Schritte. Füge den Wert nur ins Feld unten ein, nie im Chat: Er landet im Geheimnisspeicher des Systems und der Agent sieht ihn nie.",
    secAskMsg: "Führe mich beim Verbinden von {app} für das Konto {acc} (Profil {sp}). Erkläre die Schritte einzeln mit den richtigen Links. Den Wert füge ich selbst ins sichere Feld der Quellen-Seite ein: Frag nicht danach und schreibe ihn nie in den Chat.",
    connAll: "Alles verbinden",
    connAllMsg: "Führe mich beim Verbinden all dieser Konten in einem Rutsch: {list}. Gruppiere die Schritte nach Typ (eine Erklärung für alle Gmail-App-Passwörter, eine für die iCal-Adressen usw.) mit den richtigen Links, damit ich alles zusammen vorbereite. Die Werte füge ich selbst in die sicheren Felder der Quellen-Seite ein, die alle gleichzeitig offen sind: Frag nicht danach und schreibe sie nie in den Chat.",
    setupReady: "Einrichtungsseite bereit.",
    setupOpen: "Im Browser öffnen",
    setupCopy: "Adresse kopieren",
    setupCopied: "Kopiert",
    unitItem: "Einträge",
    unitMail: "Mails",
    unitEvent: "Termine",
    unitFile: "Dateien",
    apiOff: "API in Google Cloud nicht aktiviert: aktivieren ↗",
    unitMsg: "Nachrichten",
    toastTitle: "Dein Brief ist fertig",
    toastOpen: "Brief öffnen",
    toastClose: "Schließen",
    toastMore: "weitere Neuigkeiten",
    toastUpdates: "Neuigkeiten",
    toastTodo: "zu tun",
    toastReminders: "Erinnerungen",
    toastLater: "Später",
    connectMsg: (e) => "Verbinde {n} mit Alba: führe mich Schritt für Schritt.".replace("{n}", e)
  },
  pt: {
    today: "Hoje",
    connections: "Fontes",
    emptyTitle: (e) => `Ainda não há resumo para ${e || "este espaço"}`,
    emptyBody: 'Ele roda sozinho às 8:00 em dias úteis. Para ter agora, pressione Cmd+K e escolha "Alba · Run now". Quando estiver pronto, aparece aqui, não no chat.',
    loading: "Carregando…",
    emptyTab: "vazio",
    moreIcons: "Mais ícones",
    iconSearch: "Procurar um ícone…",
    close: "Fechar",
    focusTitle: "Foco",
    focusNone: "Adicione uma conta a este perfil para escrever o que a Alba deve procurar.",
    focusReset: "Repor",
    aboutTitle: "Sobre você",
    aboutHint: "Uma linha sobre quem você é e o que faz: ajuda a Alba a julgar o que realmente importa para você, no resumo, nas sugestões do LinkedIn e nos resumos do Slack.",
    aboutPh: "Ex. Dirijo um pequeno estúdio de design, cuido de clientes e fornecedores e à noite organizo um clube de leitura.",
    showUnused: (e) => `+ ${e} conexões não usadas`,
    hideUnused: "Ocultar as não usadas",
    folderPh: "/caminho/da/pasta",
    heroPre: "A alvorada de",
    secPush: "Faça seu trabalho avançar",
    secTodos: "Principais tarefas",
    secUpdates: "Novidades",
    go: "Vamos lá",
    footMade: "Preparado para você pelo Alba usando",
    footApps: "seus apps",
    unread: "Não lidos",
    done: "Feito",
    freqTitle: "Quando ler {app}",
    freqEvery: "Cada brief",
    freqWeekly: "Só nos dias escolhidos",
    freqOff: "Nunca",
    freqHint: "Nos outros dias a fonte fica fora do brief.",
    avStatus: "Estado",
    schedTitle: "Quando sai o brief",
    schedHint: "Começa a esta hora nos dias escolhidos. Se o computador estiver desligado, começa assim que o ligar.",
    schedTime: "Hora",
    regen: "Atualizar brief",
    regenOn: "Em curso…",
    regenErr: "Falhou: tentar de novo",
    late: "atrasada",
    ageDays: (e) => e === 1 ? "desde ontem" : `há ${e} dias`,
    parked: "A rever",
    completed: (e) => `Concluídas (${e})`,
    dismiss: "Já não é preciso",
    reopen: "Reabrir",
    viaSource: "resolvida na origem",
    noTasks: "Nada pendente.",
    chooseIcon: "Escolher ícone",
    renameSpace: "Renomear",
    manageSpaces: "Gerir espaços",
    pickSpaceHint: "Selecione um espaço na barra abaixo para mudar o ícone",
    chooseColor: "Escolher cor",
    openIn: (e) => `Abrir em ${e}`,
    dragHint: "Arraste os ícones de perfil na barra abaixo para reordená-los.",
    remToChat: "Isso é para o chat completo: vou abrir.",
    cluck: "Có có!",
    teasers: ["Có có… lembrou-se de alguma coisa?", "Lembrou-se de algo que não quer esquecer?", "Ei… tem um minuto?", "Tenho boa memória, sabe?", "Diga lá, o resumo já está pronto.", "Algo de que vai precisar amanhã?"],
    teaseLate: (e) => e === 1 ? "Há uma coisa à espera há alguns dias…" : `Há ${e} coisas à espera há alguns dias…`,
    teasePending: (e) => e === 1 ? "Ainda tenho uma coisa para lembrar você, mas não digo qual." : `Ainda tenho ${e} coisas para lembrar você, mas não digo quais.`,
    teaseFresh: "Deixei um pensamento no resumo de hoje.",
    chatPlaceholder: "Escreva à Alba…",
    chatUnavailable: "Não consigo abrir o chat aqui. O Crew pode pedir para autorizar a Alba a usar o chat.",
    chatBack: "Lembretes",
    chatOpenCrew: "Abrir no Crew",
    goLines: ["Eu", "faço →"],
    chatAbout: "Iniciar um chat sobre isto",
    chatHint: "Escreva como fala, até “daqui a 3 dias preciso ligar para o dentista”. Se algo não estiver claro, eu pergunto.",
    remAsk: "Quando devo lembrar você?",
    remAskPh: "ex. amanhã, daqui a 3 dias, segunda",
    remHint: "Escreva como fala: “daqui a 3 dias preciso ligar para o dentista”.",
    remTalk: "Falar com a Alba",
    remTitle: "Alba lembra você",
    remHello: "Do que devo lembrar você?",
    remPlaceholder: "Lembre-me que daqui a 3 dias preciso…",
    remNext: "No próximo resumo",
    remPick: "Um dia específico",
    remSaved: (e) => `Feito: vou lembrar você ${e}.`,
    remNextLabel: "no resumo de amanhã",
    remOnDay: (e) => `no resumo de ${e}`,
    remPending: "Vou lembrar você",
    remDelete: "Remover",
    remSince: (e) => `pedido em ${e}`,
    ghOrgTitle: "Organizações do GitHub",
    ghOrgExclude: "Todas exceto estas",
    ghOrgInclude: "Só estas",
    ghOrgPh: "ex. org1, org2",
    ghOrgHint: "Filtra as notificações desta conta por organização. Deixe vazio para não filtrar.",
    liCoTitle: "Página da empresa",
    liCoPh: "ex. acme",
    liCoHint: "Escreva só o nome da página, não a URL completa: se a página é linkedin.com/company/acme/, escreva só acme.",
    liCoProfile: "Só o perfil pessoal",
    liCoBoth: "Perfil e página da empresa",
    liCoOnly: "Só a página da empresa",
    folderName: "Pasta local",
    defaultSpaces: ["Trabalho", "Pessoal"],
    voteUp: "Mais assim",
    voteDown: "Menos assim",
    goDone: "Iniciado",
    patTitle: "Arquivos a ler",
    patInclude: "Só estes (ex. *.md, notas/*)",
    patExclude: "Nunca estes (ex. *.log, arquivo/*)",
    patHint: "Padrões separados por vírgulas. Deixe ambos vazios para ler tudo.",
    webTitle: "O que acompanhar",
    webFree: "Busca livre, pelo meu perfil e pelo foco",
    webSites: "Só estes sites",
    webSitesPh: "ex. example.com, another.org",
    webBlockPh: "Nunca de: sites ou palavras, ex. example.com, fofoca",
    webHint: "A busca livre procura notícias sobre o que você escreveu no seu perfil e no foco deste app. Com uma lista, só esses sites são lidos.",
    webPh: "Dê um nome, ex. Notícias do setor",
    snailLines: ["Oi Alba, tudo bem por aqui?", "Estava só passando, tudo tranquilo?", "Belo dia para um passeio, não é?", "Fiz uma longa viagem para chegar até aqui, sabe?", "O gramado da esquina está bem cheio hoje."],
    snailReplies: ["Có có, tudo bem por aqui!", "Sim, um dia tranquilo até agora.", "Eu também, só esticando as pernas.", "Bem, você é mais lenta que eu, mas sempre chega!", "Tranquilo por aqui, venha quando quiser."],
    profile: "Perfil",
    deleteSpace: "Excluir perfil",
    bannerSub: "O que você precisa saber hoje, numa página",
    bannerDays: "Seg–Sex",
    bannerAccounts: "contas",
    bannerApps: "apps",
    bannerSpaces: "espaços",
    connTitle: "Fontes",
    connSub: (e) => `${e} contas conectadas. Escolha um espaço e adicione contas: elas ficam lá. As credenciais não são digitadas aqui: o acesso é pela integração do Crew ou pelo navegador.`,
    all: "Todos",
    newSpace: "+ Novo espaço",
    delSpace: "Excluir este espaço (está vazio)",
    addTo: (e) => `Adicionar a ${e}…`,
    createFirst: "Crie primeiro um espaço",
    pause: "Pausar",
    resume: "Retomar",
    remove: "Remover",
    add: "Adicionar",
    integration: "integração",
    page: "página aberta",
    readFail: "Não consigo ler as conexões salvas.",
    saveFail: "Falha ao salvar.",
    chatFail: "Não consigo abrir o chat daqui.",
    apps: { web: "Notícias da web sobre os seus temas", gmail: "Caixa de entrada, não lidos e com estrela", calendar: "Reuniões e compromissos de hoje", drive: "Arquivos modificados recentemente", slack: "Menções, DMs e canais escolhidos", discord: "Lido da página aberta, sem bot", jira: "Issues atribuídas a você", confluence: "Páginas que você observa", folder: "Procura o que você escreve no foco", claudecode: "Retome de onde parou", kiro: "Retome de onde parou", googlechat: "Mensagens diretas e marcações", linkedin: "Estatísticas e convites", notion: "Páginas e atualizações", linear: "Issues atribuídas", trello: "Cartões atribuídos e prazos", outlook: "E-mails do Outlook, não lidos e reuniões", teams: "Chats e canais do Teams, menções", telegram: "Mensagens e chats escolhidos (somente leitura)", youtrack: "Issues atribuídas e com prazo", github: "Notificações e pull requests" },
    connect: "Conectar",
    chatReset: "Nova conversa",
    lnkUrl: "Endereço (https://nome.youtrack.cloud)",
    lnkToken: "Token permanente",
    lnkGo: "Conectar",
    lnkOk: "Conectado · {n} issues",
    lnkNo: "Não conectado",
    lnkOff: "Desconectar",
    lnkSafe: "O token vai para o cofre de segredos do sistema (Chaveiro, Gerenciador de credenciais ou Secret Service): não é gravado nos arquivos do Alba e o agente nunca o vê.",
    lnkSync: "Atualizar agora",
    lnkRO: "Somente leitura",
    lnkWeak: "Nenhum cofre de segredos encontrado: o token fica em um arquivo privado na sua pasta de usuário (menos seguro). No Linux, instale libsecret-tools.",
    gId: "ID de cliente do Google (…apps.googleusercontent.com)",
    gSecret: "Segredo do cliente do Google",
    gSign: "Entrar com o Google",
    gWait: "Aguardando o login na aba do Google…",
    gHow: "Só uma vez: no Google Cloud Console ative a Gmail API e crie um ID de cliente OAuth do tipo «App para computador», depois cole aqui o ID e o segredo. O Alba só pede leitura do e-mail.",
    bLogin: "Entrar com o navegador",
    bMsg: "Abra a página do {app} no navegador do Crew para a conta {acc} (perfil {sp}), espere eu fazer login (eu assumo o controle) e avise quando vir a vista principal (por exemplo a caixa de entrada ou o calendário). Não clique em nada que altere algo e não leia nada ainda. [alba-login:{key}]",
    stOk: "Verificado {t}",
    stOld: "A verificar ({t})",
    stSignin: "Sessão expirada: entre novamente",
    stErr: "Falha na verificação",
    stNever: "Nunca verificado",
    stCheck: "Verificar agora",
    stCheckMsg: "Verifique agora o acesso do {app} para a conta {acc} (perfil {sp}) seguindo a skill alba-health. [alba-health:{key}:{id}]",
    stBusy: "Verificando…",
    loginHint: "Se a folha de login segura não aparecer abaixo, abra-a no Crew.",
    loginOpen: "Abrir a folha de login",
    secNo: "Credencial ainda não inserida",
    secYes: "Credencial presente: pressione Verificar",
    secVerify: "Verificar",
    secCopy: "Copiar comando",
    secCopied: "Copiado",
    secSafe: "Só uma vez, no seu computador. A senha não passa pelo Alba nem pelo agente: você a digita no prompt oculto do Terminal e ela vai para o cofre de segredos do sistema.",
    secGmail: "1) Ative a verificação em duas etapas na sua conta Google. 2) Crie uma senha de app (nome: Alba). 3) Copie o comando, cole no Terminal e digite a senha. 4) Volte aqui e pressione Verificar.",
    secCal: "1) No Google Agenda abra as configurações da agenda > Integrar agenda > Endereço secreto no formato iCal e copie. 2) Copie o comando, cole no Terminal e cole o endereço. 3) Volte aqui e pressione Verificar.",
    secLinkApp: "Senhas de app",
    secLinkCal: "Configurações da agenda",
    secPhGmail: "Cole aqui a senha de app",
    secPhCal: "Cole aqui o endereço secreto iCal",
    secSave: "Salvar e verificar",
    secAsk: "Perguntar à Alba",
    secGuide: "Eu guio você pelos passos. Cole o valor só no campo abaixo, nunca no chat: ele vai para o cofre de segredos do sistema e o agente não o vê.",
    secAskMsg: "Guie-me para conectar o {app} para a conta {acc} (perfil {sp}). Explique os passos um a um com os links certos. Eu mesmo colarei o valor no campo seguro da página Fontes: não o peça e nunca o escreva no chat.",
    connAll: "Conectar tudo",
    connAllMsg: "Guie-me para conectar todas estas contas de uma vez: {list}. Agrupe os passos por tipo (uma explicação para todas as senhas de app do Gmail, outra para os endereços iCal etc.) com os links certos para eu preparar tudo junto. Eu mesmo colarei os valores nos campos seguros da página Fontes, que abriram todos juntos: não os peça e nunca os escreva no chat.",
    setupReady: "Página de configuração pronta.",
    setupOpen: "Abrir no navegador",
    setupCopy: "Copiar endereço",
    setupCopied: "Copiado",
    unitItem: "itens",
    unitMail: "e-mails",
    unitEvent: "eventos",
    unitFile: "arquivos",
    apiOff: "API não ativada no Google Cloud: ative-a ↗",
    unitMsg: "mensagens",
    toastTitle: "Seu resumo está pronto",
    toastOpen: "Abrir o resumo",
    toastClose: "Fechar",
    toastMore: "mais novidades",
    toastUpdates: "novidades",
    toastTodo: "a fazer",
    toastReminders: "lembretes",
    toastLater: "Mais tarde",
    connectMsg: (e) => "Conecte {n} ao Alba: guie-me passo a passo.".replace("{n}", e)
  }
}, Kn = (e) => Nr[e], Tr = [
  {
    artist: "Katsushika Hokusai",
    title: "The Great Wave off Kanagawa",
    year: "c. 1831",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg"
  },
  {
    artist: "Utagawa Hiroshige",
    title: "Sudden Shower over Shin-Ōhashi Bridge and Atake",
    year: "1857",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg/1920px-Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg"
  },
  {
    artist: "Caspar David Friedrich",
    title: "Wanderer above the Sea of Fog",
    year: "1818",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg"
  },
  {
    artist: "Caspar David Friedrich",
    title: "Monk by the Sea",
    year: "c. 1808-1810",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Friedrich%2C_Caspar_David_-_M%C3%B6nch_am_Meer_-_Alte_Nationalgalerie_in_Berlin.jpg/1920px-Friedrich%2C_Caspar_David_-_M%C3%B6nch_am_Meer_-_Alte_Nationalgalerie_in_Berlin.jpg"
  },
  {
    artist: "J.M.W. Turner",
    title: "The Fighting Temeraire",
    year: "1839",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg"
  },
  {
    artist: "John Constable",
    title: "The Hay Wain",
    year: "1821",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/John_Constable_-_The_Hay_Wain_%281821%29.jpg"
  },
  {
    artist: "Albert Bierstadt",
    title: "Among the Sierra Nevada Mountains, California",
    year: "1868",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bierstadt_-_Among_the_Sierra_Nevada_Mountains_-_1868.jpg/1920px-Bierstadt_-_Among_the_Sierra_Nevada_Mountains_-_1868.jpg"
  },
  {
    artist: "Thomas Cole",
    title: "The Oxbow",
    year: "1836",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Thomas_Cole_-_The_Oxbow_%28Met%29.jpg"
  },
  {
    artist: "Thomas Moran",
    title: "Grand Canyon of the Yellowstone",
    year: "1872",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone.jpg"
  },
  {
    artist: "Winslow Homer",
    title: "Breezing Up (A Fair Wind)",
    year: "1873-1876",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Winslow_Homer_-_Breezing_Up_%28A_Fair_Wind%29_-_Google_Art_Project.jpg"
  },
  {
    artist: "Ivan Aivazovsky",
    title: "The Ninth Wave",
    year: "1850",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Ivan_Aivazovsky_-_The_Ninth_Wave_-_WGA00095.jpg/1920px-Ivan_Aivazovsky_-_The_Ninth_Wave_-_WGA00095.jpg"
  },
  {
    artist: "Frederic Edwin Church",
    title: "Twilight in the Wilderness",
    year: "1860",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Frederic_Edwin_Church_-_Twilight_in_the_Wilderness.jpg"
  },
  {
    artist: "Vincent van Gogh",
    title: "The Starry Night",
    year: "1889",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/66/VanGogh-starry_night_ballance1.jpg"
  },
  {
    artist: "Katsushika Hokusai",
    title: 'Fine Wind, Clear Morning ("Red Fuji")',
    year: "c. 1830-1832",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Katsushika_Hokusai_-_Fine_Wind%2C_Clear_Morning_%28Gaif%C5%AB_kaisei%29_-_Google_Art_Project_cropped.jpg"
  },
  {
    artist: "Canaletto",
    title: "The Entrance to the Grand Canal, Venice",
    year: "c. 1730s",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Canaletto_-_The_Entrance_to_the_Grand_Canal%2C_Venice_-_Google_Art_Project.jpg/1920px-Canaletto_-_The_Entrance_to_the_Grand_Canal%2C_Venice_-_Google_Art_Project.jpg"
  }
], zn = (e) => e === "page" || e === "pagina aperta", An = [
  "linear-gradient(135deg,#f59e0b 0%,#ef4444 55%,#8b5cf6 100%)",
  "linear-gradient(135deg,#0ea5e9 0%,#6366f1 55%,#a855f7 100%)",
  "linear-gradient(135deg,#10b981 0%,#0ea5e9 55%,#6366f1 100%)",
  "linear-gradient(135deg,#f43f5e 0%,#ec4899 55%,#8b5cf6 100%)",
  "linear-gradient(135deg,#f59e0b 0%,#f43f5e 55%,#6366f1 100%)",
  "linear-gradient(135deg,#14b8a6 0%,#22c55e 55%,#eab308 100%)",
  "linear-gradient(135deg,#8b5cf6 0%,#ec4899 55%,#f59e0b 100%)",
  "linear-gradient(135deg,#0ea5e9 0%,#14b8a6 55%,#22c55e 100%)",
  "linear-gradient(135deg,#ef4444 0%,#f97316 55%,#eab308 100%)",
  "linear-gradient(135deg,#6366f1 0%,#8b5cf6 55%,#ef4444 100%)",
  "linear-gradient(135deg,#eab308 0%,#84cc16 55%,#06b6d4 100%)",
  "linear-gradient(135deg,#d946ef 0%,#6366f1 55%,#14b8a6 100%)",
  "linear-gradient(135deg,#f97316 0%,#eab308 55%,#10b981 100%)",
  "linear-gradient(135deg,#06b6d4 0%,#3b82f6 55%,#d946ef 100%)",
  "linear-gradient(135deg,#ef4444 0%,#8b5cf6 55%,#0ea5e9 100%)"
], Mr = (e) => {
  const p = String(e || "");
  let u = 0;
  for (let C = 0; C < p.length; C++) u = u * 31 + p.charCodeAt(C) >>> 0;
  return An[p ? u % An.length : 0];
}, Nn = Tr, Tn = (e) => {
  const p = String(e || "");
  let u = 0;
  for (let C = 0; C < p.length; C++) u = u * 31 + p.charCodeAt(C) >>> 0;
  return Nn[p ? u % Nn.length : 0];
}, ut = [
  { key: "gmail", name: "Gmail", hint: "Posta in arrivo, non letti e con stella", color: "#EA4335", Icon: ur },
  { key: "calendar", name: "Google Calendar", hint: "Riunioni e impegni di oggi", color: "#4285F4", Icon: mr },
  { key: "drive", name: "Google Drive", hint: "File modificati di recente", color: "#1FA463", Icon: hr },
  { key: "slack", name: "Slack", hint: "Menzioni, DM e canali scelti", color: "#E01E5A", Icon: gr },
  { key: "discord", name: "Discord", hint: "Letto dalla pagina aperta, senza bot", color: "#5865F2", Icon: br },
  { key: "linkedin", name: "LinkedIn", hint: "Statistiche del profilo, post, inviti e lavori", color: "#0A66C2", Icon: fr },
  { key: "notion", name: "Notion", hint: "Pagine e aggiornamenti", color: "#9B9A97", Icon: xr },
  { key: "linear", name: "Linear", hint: "Issue assegnate", color: "#5E6AD2", Icon: vr },
  { key: "trello", name: "Trello", hint: "Schede assegnate e scadenze", color: "#0079BF", Icon: zr },
  { key: "github", name: "GitHub", hint: "Notifiche e pull request", color: "#8B949E", Icon: yr },
  { key: "outlook", name: "Outlook", hint: "", color: "#0078D4", Icon: wr },
  { key: "teams", name: "Microsoft Teams", hint: "", color: "#6264A7", Icon: Cr },
  { key: "telegram", name: "Telegram", hint: "", color: "#26A5E4", Icon: kr },
  { key: "youtrack", name: "YouTrack", hint: "", color: "#FF318C", Icon: Sr },
  { key: "googlechat", name: "Google Chat", hint: "Messaggi diretti e tag", color: "#00897B", Icon: ua },
  { key: "jira", name: "Jira", hint: "Issue assegnate a me", color: "#0052CC", Icon: Wn },
  { key: "confluence", name: "Confluence", hint: "Pagine che osservo", color: "#172B4D", Icon: Co },
  { key: "web", name: "Web", hint: "Notizie dal web sui tuoi temi", color: "#0EA5E9", Icon: $n },
  { key: "folder", name: "Local folder", hint: "Cerca quello che scrivi nel focus", color: "#64748B", Icon: tn },
  { key: "claudecode", name: "Claude Code", hint: "Riprendi da dove avevi lasciato", color: "#D97757", Icon: Un },
  { key: "kiro", name: "Kiro", hint: "Riprendi da dove avevi lasciato", color: "#6366F1", Icon: So }
], Qn = {
  briefcase: Xo,
  home: Jo,
  user: Zo,
  users: Qo,
  heart: Ko,
  star: Yo,
  code: Vo,
  rocket: Uo,
  book: $o,
  school: Wo,
  cart: Go,
  camera: _o,
  music: jo,
  plane: Ro,
  coffee: Ho,
  wallet: Oo,
  building: Bo,
  game: Do,
  fitness: qo,
  idea: Po,
  globe: $n,
  folder: tn,
  sparkles: Un,
  leaf: Lo,
  wrench: Eo,
  palette: Io,
  shield: Fo,
  cloud: Mo,
  sun: To,
  moon: No,
  bike: Ao,
  car: zo
}, Fr = Wn, Ir = er, Er = (e) => /lavor|work|ufficio|office|azienda|company|trabaj|trabalh|travail|arbeit|bureau|büro/i.test(e) ? "briefcase" : /person|privat|casa|home|famil|pessoal|maison|zuhause/i.test(e) ? "user" : "folder", Lr = "Anchor Apple Archive Atom Award Baby Backpack Banknote Beaker Beer Bird Bone Bookmark Bot Brain Bug Bus Cake Calculator Candy Carrot Cat ChefHat Church Clapperboard Clock Compass Cookie Cpu Crown Diamond Dna Dog DollarSign Drama Droplet Drum Egg Factory Feather Fish FlaskConical Flag Flame Flower Footprints Gem Gift Glasses Guitar Hammer Hand Headphones Hotel Hourglass IceCream Image Key Landmark Languages Laptop Library LifeBuoy Lock Map MapPin Medal Mic Microscope Mountain Newspaper Paintbrush Paperclip PawPrint Pen Pencil Phone PiggyBank Pill Pizza Plug Popcorn Puzzle Radio Ruler Sailboat Sandwich Scale Scissors Server Ship Shirt ShoppingBag Smile Snowflake Soup Sprout Stethoscope Store Syringe Tag Target Telescope Tent Terminal Ticket Timer Train Trees Trophy Truck Tv Umbrella Utensils Video Waves Wheat Wifi Wind Wine Zap".split(" "), Tt = (e) => {
  var p;
  return (p = wo) == null ? void 0 : p[e];
}, Zn = (e) => Qn[e] ?? (e.startsWith("lu:") ? Tt(e.slice(3)) : void 0), Jn = (e, p) => {
  var u;
  return Zn(((u = e.spaceIcons) == null ? void 0 : u[p]) ?? Er(p)) ?? tn;
}, Mn = ["#F59E0B", "#8B5CF6", "#10B981", "#EC4899", "#3B82F6", "#EF4444"], Fn = ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E", "#10B981", "#14B8A6", "#06B6D4", "#0EA5E9", "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF", "#EC4899", "#F43F5E", "#FB7185", "#FDBA74", "#A3E635", "#2DD4BF", "#7DD3FC", "#C4B5FD", "#78716C", "#94A3B8", "#64748B", "#A16207", "#0F766E", "#1E3A8A", "#E11D48", "#65A30D", "#0284C7", "#9A3412"], ya = (e, p) => {
  var u;
  return ((u = e.spaceColors) == null ? void 0 : u[p]) ?? Mn[Math.max(0, e.spaces.indexOf(p)) % Mn.length];
}, Xn = { accounts: {}, spaces: (() => {
  try {
    return Kn(Yn(Ja())).defaultSpaces;
  } catch {
    return ["Work", "Personal"];
  }
})() }, ka = "/api/apps/alba/config";
function ta() {
  const [e, p] = D(Ja);
  ee(() => {
    const C = document.documentElement, o = new MutationObserver(() => p(Ja()));
    return o.observe(C, { attributes: !0, attributeFilter: ["lang"] }), () => o.disconnect();
  }, []);
  const u = Yn(e);
  return { code: e, lang: u, t: Kn(u) };
}
function Pr() {
  const e = ma(), { code: p } = ta();
  ee(() => {
    let u = !1;
    return e.get(ka).then((C) => {
      const o = (C == null ? void 0 : C.config) ?? C ?? {};
      if (!u && o.lang !== p) return e.put(ka, { ...o, lang: p });
    }).catch(() => {
    }), () => {
      u = !0;
    };
  }, [p]);
}
let Ot = Xn, Xa = !1;
const xa = /* @__PURE__ */ new Set();
let eo, In, va = {}, Ea = null, to = () => {
}, nn = () => {
};
const Fa = () => xa.forEach((e) => e()), Ia = () => Ea.get(ka).then((e) => {
  const p = (e == null ? void 0 : e.config) ?? e;
  return p && typeof p == "object" ? p : {};
});
function qr() {
  Ia().then((e) => {
    e.accounts && (Ot = { ...Xn, ...e });
  }).catch(() => to()).finally(() => {
    Xa = !0, Fa();
  }), eo = setInterval(() => {
    Ia().then((e) => {
      const p = va.accounts === void 0;
      Ot = { ...Ot, brief: e.brief, tasks: e.tasks, reminders: e.reminders, health: e.health, ...p && e.accounts ? { accounts: e.accounts } : {} }, Fa();
    }).catch(() => {
    });
  }, 15e3);
}
function Ua(e) {
  Ot = { ...Ot, ...e }, va = { ...va, ...e }, Fa(), clearTimeout(In), In = setTimeout(async () => {
    const p = va;
    va = {};
    try {
      const u = await Ia();
      await Ea.put(ka, { ...u, ...p });
    } catch {
      nn();
    }
  }, 400);
}
async function En(e) {
  Ot = { ...Ot, reminders: e(Ot.reminders ?? []) }, Fa();
  try {
    const p = await Ia();
    await Ea.put(ka, { ...p, reminders: e(p.reminders ?? []) });
  } catch {
    nn();
  }
}
const Ln = (e) => String(e).padStart(2, "0"), za = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${Ln(e.getMonth() + 1)}-${Ln(e.getDate())}`;
function La() {
  const e = ma(), p = Vn(), { t: u } = ta(), [, C] = D(0);
  return Ea = e, to = () => p(u.readFail), nn = () => p(u.saveFail), ee(() => {
    const o = () => C((y) => y + 1);
    return xa.add(o), xa.size === 1 && qr(), () => {
      xa.delete(o), xa.size === 0 && (clearInterval(eo), Xa = !1);
    };
  }, []), {
    cfg: Ot,
    loaded: Xa,
    save: (o) => Ua({ accounts: o.accounts, spaces: o.spaces, spaceIcons: o.spaceIcons, spaceColors: o.spaceColors, focus: o.focus, schedule: o.schedule, frequency: o.frequency, about: o.about, aboutBySpace: o.aboutBySpace }),
    saveBrief: (o) => Ua({ brief: o }),
    saveTasks: (o) => Ua({ tasks: o }),
    addReminder: (o) => En((y) => y.some((G) => G.id === o.id) ? y : [...y, o]),
    removeReminder: (o) => En((y) => y.filter((G) => G.id !== o))
  };
}
const Ve = "*", ao = "alba.filter", Va = /* @__PURE__ */ new Set();
let en = Ve;
try {
  en = localStorage.getItem(ao) ?? Ve;
} catch {
}
function on() {
  const [, e] = D(0);
  return ee(() => {
    const u = () => e((C) => C + 1);
    return Va.add(u), () => void Va.delete(u);
  }, []), [en, (u) => {
    en = u;
    try {
      localStorage.setItem(ao, u);
    } catch {
    }
    Va.forEach((C) => C());
  }];
}
const Dr = (e) => {
  var p, u;
  return [
    ...(e.tasks ?? ((p = e.brief) == null ? void 0 : p.todos) ?? []).filter((C) => (C.status ?? "open") === "open"),
    ...((u = e.brief) == null ? void 0 : u.updates) ?? []
  ];
}, no = (e) => Array.from(/* @__PURE__ */ new Set([...e.spaces, ...Dr(e).map((p) => p.space).filter(Boolean)])), Br = (e) => Object.values(e.accounts).reduce((p, u) => p + u.length, 0), Or = (e) => (e.replace(/@.*/, "").match(/[A-Za-z0-9]/g) ?? ["?"]).slice(0, 2).join("").toUpperCase(), Hr = `
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
.mb .lnk{background:none;border:0;padding:0;color:var(--muted);font-size:12px;cursor:pointer;text-decoration:underline}
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
`;
function Rr({ children: e, overlay: p }) {
  return /* @__PURE__ */ r("div", { className: "mb", children: [
    /* @__PURE__ */ t("style", { children: Hr }),
    /* @__PURE__ */ t("div", { className: "scroll", children: e }),
    p
  ] });
}
const jr = "M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z", _r = (e) => ut.find((p) => p.key === (e ?? "").toLowerCase()), Gr = {
  gmail: "https://mail.google.com/mail/",
  calendar: "https://calendar.google.com/calendar/",
  drive: "https://drive.google.com/drive/",
  slack: "https://app.slack.com/client",
  discord: "https://discord.com/app",
  linkedin: "https://www.linkedin.com/messaging/",
  notion: "https://www.notion.so/",
  linear: "https://linear.app/",
  trello: "https://trello.com/",
  github: "https://github.com/notifications"
}, Wr = /* @__PURE__ */ new Set(["gmail", "calendar", "drive"]), $r = (e) => e && /^https?:\/\/[^\s]+$/i.test(e) ? e : void 0, Ur = (e, p, u) => {
  const C = $r(p);
  if (C) {
    const y = /^https:\/\/mail\.google\.com\/mail\/u\/([^/]+)\/(#.*)?$/.exec(C);
    return y && /@|%40/.test(y[1]) ? `https://mail.google.com/mail/?authuser=${y[1].includes("%40") ? y[1] : encodeURIComponent(y[1])}${y[2] ?? ""}` : C;
  }
  const o = Gr[e];
  if (o)
    return Wr.has(e) && u && /^[^@\s]+@[^@\s]+$/.test(u) ? `${o}?authuser=${encodeURIComponent(u)}` : o;
};
function Aa({ k: e, url: p, account: u }) {
  const { t: C } = ta(), o = _r(e);
  if (!o) return null;
  const { Icon: y, color: G, name: j, key: N } = o, _ = Ur(N, p, u), x = C.openIn(j);
  return _ ? /* @__PURE__ */ t("a", { className: "src", href: _, target: "_blank", rel: "noopener noreferrer", title: x, "aria-label": x, style: { color: G }, children: /* @__PURE__ */ t(y, { size: 17 }) }) : /* @__PURE__ */ t("span", { className: "src", title: j, style: { color: G }, children: /* @__PURE__ */ t(y, { size: 17 }) });
}
function Na({ cfg: e, space: p, account: u }) {
  return !p && !u ? null : /* @__PURE__ */ r("div", { className: "tagrow", children: [
    p ? /* @__PURE__ */ r("span", { className: "itag", children: [
      /* @__PURE__ */ t("i", { style: { background: ya(e, p) } }),
      p
    ] }) : null,
    u ? /* @__PURE__ */ t("span", { className: "itag acc", children: u }) : null
  ] });
}
const oo = 864e5, Vr = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`, ia = (e, p) => Math.max(0, Math.round((Date.parse(p) - Date.parse(e.firstSeen)) / oo)), Pn = 3, qn = 7, Yr = 30;
function Kr() {
  var he, W, It;
  const { cfg: e, loaded: p } = La(), u = ma(), [C, o] = D({});
  ee(() => {
    let i = !0;
    const B = async () => {
      try {
        const V = await u.get("/apps/alba/api/task-state");
        i && V && typeof V == "object" && o(V);
      } catch {
      }
    };
    B();
    const U = setInterval(B, 15e3);
    return () => {
      i = !1, clearInterval(U);
    };
  }, []);
  const y = Vn(), [G, j] = D({});
  ee(() => {
    u.get("/apps/alba/api/feedback").then((i) => j(Object.fromEntries(((i == null ? void 0 : i.votes) ?? []).map((B) => [B.key, B.vote])))).catch(() => {
    });
  }, []);
  const { t: N } = ta(), { openChat: _ } = an(), x = e.brief, [Z] = on(), ce = no(e), K = Z === Ve || ce.includes(Z) ? Z : Ve, me = (i) => K === Ve || i.space === K, de = Vr(), we = (e.tasks ?? ((x == null ? void 0 : x.todos) ?? []).map((i, B) => ({ id: "legacy-" + B, title: i.title, body: i.body, source: i.source, space: i.space, account: i.account, firstSeen: de, status: i.done ? "done" : "open", doneAt: i.done ? de : void 0, doneBy: "user" }))).map((i) => C[i.id] ? { ...i, status: C[i.id].status, doneAt: C[i.id].doneAt, doneBy: "user" } : i), mt = (i) => me(i), pe = we.filter((i) => i.status === "open" && mt(i)), ht = pe.filter((i) => ia(i, de) < qn).sort((i, B) => ia(B, de) - ia(i, de)), be = pe.filter((i) => ia(i, de) >= qn), it = we.filter((i) => i.status === "done" && i.doneAt === de && mt(i)), Ye = we.filter((i) => i.status !== "open" && i.doneAt !== de && mt(i) && (Date.parse(de) - Date.parse(i.doneAt ?? de)) / oo <= Yr), tt = ((x == null ? void 0 : x.updates) ?? []).filter(me), Me = (i, B) => {
    const U = { ...i, ...B };
    o((V) => {
      const xe = { ...V };
      return U.status === "open" ? delete xe[i.id] : xe[i.id] = { status: U.status, doneAt: U.doneAt }, xe;
    }), u.post("/apps/alba/api/task-state", { id: i.id, title: i.title, source: i.source, account: i.account, url: i.url, status: U.status, doneAt: U.doneAt }).catch(() => y(N.saveFail));
  }, gt = (i) => Me(i, { status: "done", doneAt: de, doneBy: "user" }), bt = (i) => Me(i, { status: "dismissed", doneAt: de, doneBy: "user" }), ft = (i) => Me(i, { status: "open", doneAt: void 0, doneBy: void 0 }), Mt = (i, B, U, V) => {
    const xe = [i, B, U ? `(${[U, V].filter(Boolean).join(" · ")})` : ""].filter(Boolean).join(`
`);
    try {
      _({ agent: "alba-bot", message: xe, autoSend: !1 });
    } catch {
      y(N.chatFail);
    }
  }, Ft = "push:" + ((x == null ? void 0 : x.generatedAt) ?? ""), oe = !!(x != null && x.push) && (C[Ft] ? C[Ft].status === "done" : !!x.push.done), Ie = (i) => {
    var U;
    const B = i ? "done" : "dismissed";
    o((V) => ({ ...V, [Ft]: { status: B, doneAt: de } })), u.post("/apps/alba/api/task-state", { id: Ft, title: ((U = x == null ? void 0 : x.push) == null ? void 0 : U.title) ?? "", source: "alba", status: B, doneAt: de }).catch(() => y(N.saveFail));
  }, Re = () => {
    var B, U;
    const i = ((B = x == null ? void 0 : x.push) == null ? void 0 : B.prompt) || ((U = x == null ? void 0 : x.push) == null ? void 0 : U.title) || "";
    try {
      _({ agent: "alba-bot", message: i, autoSend: !0 });
    } catch {
      y(N.chatFail);
    }
  }, [Ee, O] = D(!1), je = I(null);
  return ee(() => {
    if (!Ee) return;
    const i = (B) => {
      je.current && !je.current.contains(B.target) && O(!1);
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [Ee]), x ? /* @__PURE__ */ t(Xe, { children: /* @__PURE__ */ r("div", { className: "paper serif", children: [
    /* @__PURE__ */ r("div", { className: "stage", children: [
      /* @__PURE__ */ t("div", { className: "vside vleft", children: x.dateLabel }),
      /* @__PURE__ */ t("div", { className: "vside vright", children: (() => {
        const i = /^(\d{1,2})[:.](\d{2})$/.exec(String(x.timeLabel ?? "").trim());
        if (!i) return x.timeLabel;
        const B = Number(i[1]);
        return `${B % 12 || 12}:${i[2]} ${B < 12 ? "AM" : "PM"}`;
      })() }),
      (he = x.unread) != null && he.length ? /* @__PURE__ */ r("div", { className: "unreadwrap", ref: je, children: [
        /* @__PURE__ */ t("button", { type: "button", className: "ib unreadbtn", title: N.unread, "aria-label": N.unread, onClick: () => O((i) => !i), children: /* @__PURE__ */ t(tr, { size: 15 }) }),
        Ee ? /* @__PURE__ */ r("div", { className: "unreadpop", children: [
          /* @__PURE__ */ t("b", { children: N.unread }),
          /* @__PURE__ */ t("ul", { children: x.unread.map((i, B) => /* @__PURE__ */ t("li", { children: i }, B)) })
        ] }) : null
      ] }) : null,
      (() => {
        const i = Tn(x.generatedAt);
        return /* @__PURE__ */ t("div", { className: "hero", style: { backgroundImage: `radial-gradient(ellipse 60% 70% at 50% 50%,rgba(8,8,10,.46),rgba(8,8,10,.16) 70%,rgba(8,8,10,.06)),url("${i.url}")` }, children: /* @__PURE__ */ r("div", { className: "ttl", children: [
          /* @__PURE__ */ t("i", { children: N.heroPre }),
          /* @__PURE__ */ t("b", { children: x.weekday ?? "" })
        ] }) });
      })()
    ] }),
    /* @__PURE__ */ r("div", { className: "cap", children: [
      /* @__PURE__ */ t("span", { className: "who", children: x.caption ?? "Alba" }),
      (() => {
        const i = Tn(x.generatedAt);
        return /* @__PURE__ */ r("span", { className: "art", children: [
          i.title,
          ", ",
          i.artist,
          ", ",
          i.year
        ] });
      })()
    ] }),
    x.headline ? /* @__PURE__ */ t("p", { className: "lead", children: x.headline }) : null,
    (W = x.push) != null && W.title ? /* @__PURE__ */ r("div", { className: "sect push fullrow", style: { "--i": 0 }, children: [
      /* @__PURE__ */ r("div", { className: "sec", children: [
        /* @__PURE__ */ t("h2", { children: N.secPush }),
        /* @__PURE__ */ r("div", { className: "golink", children: [
          /* @__PURE__ */ r("button", { className: "go" + (oe ? " hatched" : ""), onClick: Re, "aria-label": N.chatAbout, children: [
            oe ? /* @__PURE__ */ r("svg", { className: "burst hatchsvg", viewBox: "0 0 100 100", "aria-hidden": "true", children: [
              /* @__PURE__ */ r("defs", { children: [
                /* @__PURE__ */ t("clipPath", { id: "albaBelow", children: /* @__PURE__ */ t("path", { d: "M0 100V56L10 54L20 64L30 52L40 64L50 53L60 64L70 52L80 64L90 54L100 56V100Z" }) }),
                /* @__PURE__ */ t("clipPath", { id: "albaAbove", children: /* @__PURE__ */ t("path", { d: "M0 0H100V56L90 54L80 64L70 52L60 64L50 53L40 64L30 52L20 64L10 54L0 56Z" }) }),
                /* @__PURE__ */ t("clipPath", { id: "albaEgg", children: /* @__PURE__ */ t("path", { d: "M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z" }) }),
                /* @__PURE__ */ r("linearGradient", { id: "albaCb", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ t("stop", { offset: "0", stopColor: "#FFF08A" }),
                  /* @__PURE__ */ t("stop", { offset: "1", stopColor: "#FBC93A" })
                ] })
              ] }),
              /* @__PURE__ */ t("ellipse", { cx: "50", cy: "95", rx: "30", ry: "3", fill: "#000", opacity: ".25" }),
              /* @__PURE__ */ r("g", { className: "hs-chick", children: [
                /* @__PURE__ */ t("ellipse", { cx: "50", cy: "62", rx: "18", ry: "22", fill: "url(#albaCb)" }),
                /* @__PURE__ */ t("ellipse", { cx: "50", cy: "66", rx: "10", ry: "14", fill: "#FFF7B8", opacity: ".85" }),
                /* @__PURE__ */ t("ellipse", { cx: "33", cy: "60", rx: "5", ry: "9", transform: "rotate(14 33 60)", fill: "#F7BD28", stroke: "#E5A512", strokeWidth: ".8" }),
                /* @__PURE__ */ t("ellipse", { cx: "67", cy: "60", rx: "5", ry: "9", transform: "rotate(-14 67 60)", fill: "#F7BD28", stroke: "#E5A512", strokeWidth: ".8" }),
                /* @__PURE__ */ t("circle", { cx: "50", cy: "38", r: "15", fill: "url(#albaCb)" }),
                /* @__PURE__ */ t("path", { d: "M45 24 Q44 16 48.5 19 Q50 12 53 19 Q57.5 16 56 24", fill: "#FBC93A", stroke: "#E5A512", strokeWidth: ".8", strokeLinejoin: "round" }),
                /* @__PURE__ */ t("ellipse", { cx: "43.5", cy: "37", rx: "2.2", ry: "2.8", fill: "#2B1405" }),
                /* @__PURE__ */ t("ellipse", { cx: "56.5", cy: "37", rx: "2.2", ry: "2.8", fill: "#2B1405" }),
                /* @__PURE__ */ t("circle", { cx: "44.2", cy: "35.9", r: ".85", fill: "#fff" }),
                /* @__PURE__ */ t("circle", { cx: "57.2", cy: "35.9", r: ".85", fill: "#fff" }),
                /* @__PURE__ */ t("circle", { cx: "38.5", cy: "42.5", r: "2.6", fill: "#FB7185", opacity: ".4" }),
                /* @__PURE__ */ t("circle", { cx: "61.5", cy: "42.5", r: "2.6", fill: "#FB7185", opacity: ".4" }),
                /* @__PURE__ */ t("path", { d: "M46.5 41 Q50 39.4 53.5 41 Q50 47.5 46.5 41 Z", fill: "#F59E0B" }),
                /* @__PURE__ */ t("path", { d: "M47.6 42 Q50 41.3 52.4 42", stroke: "#B9650A", strokeWidth: ".6", fill: "none", strokeLinecap: "round" })
              ] }),
              /* @__PURE__ */ r("g", { clipPath: "url(#albaBelow)", children: [
                /* @__PURE__ */ t("path", { className: "eggp", d: "M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z" }),
                /* @__PURE__ */ t("path", { className: "shine", d: "M24 70c1 8 5 14 11 18", opacity: ".6" })
              ] }),
              /* @__PURE__ */ t("g", { clipPath: "url(#albaEgg)", children: /* @__PURE__ */ t("path", { d: "M10 54L20 64L30 52L40 64L50 53L60 64L70 52L80 64L90 54", fill: "none", stroke: "#F0B987", strokeWidth: "1.3", strokeLinejoin: "round" }) }),
              /* @__PURE__ */ r("g", { className: "hs-cap", children: [
                /* @__PURE__ */ r("g", { clipPath: "url(#albaAbove)", children: [
                  /* @__PURE__ */ t("path", { className: "eggp", d: "M50 4C30 4 12 38 12 62c0 20 17 34 38 34s38-14 38-34C88 38 70 4 50 4Z" }),
                  /* @__PURE__ */ t("path", { className: "shine", d: "M30 46c3-14 10-25 19-31" })
                ] }),
                /* @__PURE__ */ t("g", { clipPath: "url(#albaEgg)", children: /* @__PURE__ */ t("path", { d: "M10 54L20 64L30 52L40 64L50 53L60 64L70 52L80 64L90 54", fill: "none", stroke: "#F0B987", strokeWidth: "1.3", strokeLinejoin: "round" }) })
              ] })
            ] }) : null,
            oe ? null : /* @__PURE__ */ r("svg", { className: "burst", viewBox: "0 0 100 100", "aria-hidden": "true", children: [
              /* @__PURE__ */ t("path", { className: "eggp", d: jr }),
              /* @__PURE__ */ t("path", { className: "shine", d: "M30 46c3-14 10-25 19-31" })
            ] }),
            /* @__PURE__ */ r("span", { className: "golbl", children: [
              /* @__PURE__ */ t("i", { className: oe ? "off" : "", children: N.goLines.join(" ") }),
              /* @__PURE__ */ t("i", { className: oe ? "" : "off", children: N.goDone })
            ] })
          ] }),
          /* @__PURE__ */ t("button", { className: "gocheck", title: oe ? N.reopen : N.done, "aria-label": oe ? N.reopen : N.done, onClick: () => Ie(!oe), children: /* @__PURE__ */ t(_a, { size: 13 }) }),
          /* @__PURE__ */ r("div", { className: "gocard", "aria-hidden": "true", children: [
            /* @__PURE__ */ r("b", { children: [
              /* @__PURE__ */ t(ua, { size: 15 }),
              " ",
              N.chatAbout
            ] }),
            /* @__PURE__ */ r("i", { children: [
              "“",
              x.push.prompt || x.push.title,
              "”"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "pushbody", children: [
        /* @__PURE__ */ t("h3", { children: x.push.title }),
        x.push.body ? /* @__PURE__ */ t("p", { children: x.push.body }) : null
      ] })
    ] }) : null,
    /* @__PURE__ */ r("div", { className: "cols swap", children: [
      /* @__PURE__ */ r("div", { children: [
        (It = x.reminders) != null && It.length ? /* @__PURE__ */ r("div", { className: "sect remind", style: { "--i": 0 }, children: [
          /* @__PURE__ */ t("div", { className: "sec", children: /* @__PURE__ */ t("h2", { children: N.remTitle }) }),
          x.reminders.map((i, B) => /* @__PURE__ */ r("div", { className: "ritem", children: [
            /* @__PURE__ */ t(ar, { size: 17 }),
            /* @__PURE__ */ r("div", { children: [
              i.text,
              i.since ? /* @__PURE__ */ t("small", { children: N.remSince(i.since) }) : null
            ] })
          ] }, B))
        ] }) : null,
        /* @__PURE__ */ r("div", { className: "sect", children: [
          /* @__PURE__ */ t("div", { className: "sec", children: /* @__PURE__ */ t("h2", { children: N.secTodos }) }),
          ht.length + it.length === 0 ? /* @__PURE__ */ t("p", { style: { color: "var(--muted)" }, children: N.noTasks }) : null,
          [...ht, ...it].map((i, B) => {
            const U = ia(i, de), V = i.status === "done";
            return /* @__PURE__ */ r("div", { className: "todo" + (V ? " done" : ""), style: { "--i": B }, children: [
              /* @__PURE__ */ t("button", { className: "circle" + (V ? " on" : ""), onClick: () => V ? ft(i) : gt(i), "aria-label": N.done, children: V ? /* @__PURE__ */ t(_a, { size: 14 }) : null }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("h3", { children: [
                  i.title,
                  i.tag ? /* @__PURE__ */ t("em", { className: i.hot ? "hot" : "", children: i.tag }) : null,
                  /* @__PURE__ */ t(Aa, { k: i.source, url: i.url, account: i.account }),
                  /* @__PURE__ */ t("button", { className: "itemchat", title: N.chatAbout, "aria-label": N.chatAbout, onClick: () => Mt(i.title, i.body, i.source, i.account), children: /* @__PURE__ */ t(ua, { size: 15 }) }),
                  !V && U >= 1 ? /* @__PURE__ */ r("span", { className: "age" + (U >= Pn ? " late" : ""), children: [
                    U >= Pn ? N.late + " · " : "",
                    N.ageDays(U)
                  ] }) : null,
                  V && i.doneBy === "source" ? /* @__PURE__ */ t("span", { className: "age", children: N.viaSource }) : null
                ] }),
                i.body ? /* @__PURE__ */ t("p", { children: i.body }) : null,
                /* @__PURE__ */ t(Na, { cfg: e, space: i.space, account: i.account }),
                V ? null : /* @__PURE__ */ t("div", { className: "rowbtns", children: /* @__PURE__ */ t("button", { className: "lnk", onClick: () => bt(i), children: N.dismiss }) })
              ] })
            ] }, i.id);
          }),
          be.length ? /* @__PURE__ */ r("details", { className: "fold", open: !0, children: [
            /* @__PURE__ */ r("summary", { children: [
              N.parked,
              " (",
              be.length,
              ")"
            ] }),
            be.map((i) => /* @__PURE__ */ r("div", { className: "todo parked", children: [
              /* @__PURE__ */ t("button", { className: "circle", onClick: () => gt(i), "aria-label": N.done }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("h3", { children: [
                  i.title,
                  i.tag ? /* @__PURE__ */ t("em", { className: i.hot ? "hot" : "", children: i.tag }) : null,
                  /* @__PURE__ */ t(Aa, { k: i.source, url: i.url, account: i.account }),
                  /* @__PURE__ */ t("button", { className: "itemchat", title: N.chatAbout, "aria-label": N.chatAbout, onClick: () => Mt(i.title, i.body, i.source, i.account), children: /* @__PURE__ */ t(ua, { size: 15 }) }),
                  /* @__PURE__ */ t("span", { className: "age", children: N.ageDays(ia(i, de)) })
                ] }),
                i.body ? /* @__PURE__ */ t("p", { children: i.body }) : null,
                /* @__PURE__ */ t(Na, { cfg: e, space: i.space, account: i.account }),
                /* @__PURE__ */ t("div", { className: "rowbtns", children: /* @__PURE__ */ t("button", { className: "lnk", onClick: () => bt(i), children: N.dismiss }) })
              ] })
            ] }, i.id))
          ] }) : null,
          Ye.length ? /* @__PURE__ */ r("details", { className: "fold", children: [
            /* @__PURE__ */ t("summary", { children: N.completed(Ye.length) }),
            Ye.map((i) => /* @__PURE__ */ r("div", { className: "todo done", children: [
              /* @__PURE__ */ t("button", { className: "circle on", onClick: () => ft(i), "aria-label": N.reopen, children: /* @__PURE__ */ t(_a, { size: 14 }) }),
              /* @__PURE__ */ r("div", { children: [
                /* @__PURE__ */ r("h3", { children: [
                  i.title,
                  i.tag ? /* @__PURE__ */ t("em", { className: i.hot ? "hot" : "", children: i.tag }) : null,
                  /* @__PURE__ */ t(Aa, { k: i.source, url: i.url, account: i.account }),
                  i.doneBy === "source" ? /* @__PURE__ */ t("span", { className: "age", children: N.viaSource }) : null
                ] }),
                /* @__PURE__ */ t(Na, { cfg: e, space: i.space, account: i.account })
              ] })
            ] }, i.id))
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ t("div", { children: tt.length ? /* @__PURE__ */ r("div", { className: "sect", children: [
        /* @__PURE__ */ t("div", { className: "sec", children: /* @__PURE__ */ t("h2", { children: N.secUpdates }) }),
        tt.map((i, B) => /* @__PURE__ */ r("div", { className: "upd", style: { "--i": B }, children: [
          /* @__PURE__ */ t("span", { className: "n", children: String(B + 1).padStart(2, "0") }),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ r("h3", { children: [
              i.title,
              i.tag ? /* @__PURE__ */ t("em", { className: i.hot ? "hot" : "", children: i.tag }) : null,
              /* @__PURE__ */ t("button", { className: "itemchat", title: N.chatAbout, "aria-label": N.chatAbout, onClick: () => Mt(i.title, i.body, i.source, i.account), children: /* @__PURE__ */ t(ua, { size: 15 }) })
            ] }),
            i.body ? /* @__PURE__ */ r("p", { children: [
              i.body,
              /* @__PURE__ */ t(Aa, { k: i.source, url: i.url, account: i.account })
            ] }) : null,
            (() => {
              const U = `${x.generatedAt}|${i.title}`, V = G[U] ?? 0, xe = (Ce) => {
                const De = V === Ce ? 0 : Ce;
                j((Et) => ({ ...Et, [U]: De })), u.post("/apps/alba/api/feedback", { key: U, vote: De, title: i.title, tag: i.tag, source: i.source, space: i.space }).catch(() => y(N.saveFail));
              };
              return /* @__PURE__ */ r("div", { className: "updfoot", children: [
                /* @__PURE__ */ t(Na, { cfg: e, space: i.space, account: i.account }),
                /* @__PURE__ */ r("span", { className: "votes" + (V ? " set" : ""), children: [
                  /* @__PURE__ */ t("button", { className: "vote" + (V === 1 ? " on" : ""), title: N.voteUp, "aria-label": N.voteUp, "aria-pressed": V === 1, onClick: () => xe(1), children: /* @__PURE__ */ t(nr, { size: 14 }) }),
                  /* @__PURE__ */ t("button", { className: "vote down" + (V === -1 ? " on" : ""), title: N.voteDown, "aria-label": N.voteDown, "aria-pressed": V === -1, onClick: () => xe(-1), children: /* @__PURE__ */ t(or, { size: 14 }) })
                ] })
              ] });
            })()
          ] })
        ] }, B))
      ] }) : null })
    ] }, K)
  ] }) }) : /* @__PURE__ */ r("div", { className: "card blank", children: [
    /* @__PURE__ */ t(Ta, { size: 34 }),
    /* @__PURE__ */ t("h1", { style: { marginTop: 12 }, children: p ? N.emptyTitle("") : N.loading }),
    /* @__PURE__ */ t("p", { className: "sub", children: N.emptyBody })
  ] });
}
const Qr = {
  gmail: "Concentrati sulle mail che richiedono una mia risposta o una decisione, da persone reali, con scadenze o soldi di mezzo. Ignora newsletter, promozioni e notifiche automatiche, salvo che contengano qualcosa su cui agire.",
  calendar: "Elenca gli appuntamenti di oggi con orario, chi partecipa e cosa preparare. Segnala sovrapposizioni e inviti a cui non ho ancora risposto. Indica il primo spazio libero.",
  drive: "Segnala i file condivisi con me o modificati da altri che potrei dover leggere o approvare. Ignora le mie modifiche.",
  slack: "Concentrati su menzioni dirette, messaggi privati e thread in cui qualcuno aspetta una mia risposta. Ignora le chiacchiere generali e i bot.",
  youtrack: "Concentrati sui ticket assegnati a me, bloccati o scaduti, e sui commenti che mi fanno una domanda.",
  jira: "Concentrati sulle issue assegnate a me, bloccate o scadute, e sui commenti che mi fanno una domanda.",
  confluence: "Segnala le pagine che osservo modificate da altri di recente. Ignora le mie modifiche.",
  folder: "Leggi solo i 3-5 file modificati più di recente in questa cartella. Per ciascuno riassumi in poche righe cosa è stato fatto o deciso. Ignora i file più vecchi. Controlla se c'è del lavoro in sospeso.",
  claudecode: "Leggi le conversazioni più recenti (ultimi giorni) e riprendi cosa stavo facendo: su cosa stavo lavorando, cosa ho deciso, cosa è rimasto a metà o non completato. Segnalami solo quello che sembra ancora aperto.",
  kiro: "Leggi le sessioni più recenti (ultimi giorni) e riprendi cosa stavo facendo: su cosa stavo lavorando, cosa ho deciso, cosa è rimasto a metà o non completato. Segnalami solo quello che sembra ancora aperto.",
  googlechat: "Concentrati sui messaggi diretti e sulle stanze dove qualcuno mi ha taggato. Ignora il resto delle stanze di gruppo.",
  github: "Concentrati su PR in attesa della mia revisione, workflow falliti sui miei repository e richieste di review o di risposta. Ignora il resto.",
  web: "Cerca notizie recenti sui temi del mio lavoro e dei miei interessi. Segnala solo ciò che cambia qualcosa per me: una novità importante, una scadenza, un'occasione. Ignora il resto.",
  _: "Concentrati su ciò che richiede la mia attenzione o una decisione oggi. Ignora il rumore."
}, Zr = {
  gmail: "Focus on mail that needs my reply or a decision, from real people, with deadlines or money involved. Ignore newsletters, promotions and automatic notifications unless something in them needs action.",
  calendar: "List today's meetings with time, who is in and what to prepare. Flag overlaps and invites I have not answered yet. Mention the first free slot.",
  drive: "Point out files shared with me or edited by others that I may need to read or approve. Ignore my own edits.",
  slack: "Focus on direct mentions, DMs and threads where someone is waiting for my answer. Ignore general chatter and bots.",
  youtrack: "Focus on issues assigned to me, blocked or past due, and comments that ask me something.",
  jira: "Focus on issues assigned to me, blocked or past due, and comments that ask me something.",
  confluence: "Point out pages I watch that were recently edited by others. Ignore my own edits.",
  folder: "Read only the 3-5 most recently modified files in this folder. For each, summarize in a few lines what was done or decided. Ignore older files. Check whether there is any pending work.",
  claudecode: "Read the most recent conversations (last few days) and remind me what I was doing: what I was working on, what I decided, what was left half-done or unfinished. Only flag what still looks open.",
  kiro: "Read the most recent sessions (last few days) and remind me what I was doing: what I was working on, what I decided, what was left half-done or unfinished. Only flag what still looks open.",
  googlechat: "Focus on direct messages and on rooms where someone tagged me. Ignore the rest of the group rooms.",
  github: "Focus on PRs waiting for my review, failed workflows on my repositories and review or reply requests. Ignore the rest.",
  web: "Look for recent news on the topics of my work and interests. Flag only what changes something for me: a real development, a deadline, an opportunity. Ignore the rest.",
  _: "Focus on what needs my attention or a decision today. Ignore noise."
}, Dn = (e, p) => {
  const u = p.toLowerCase().startsWith("it") ? Qr : Zr;
  return u[e] ?? u._;
}, Xt = ["youtrack", "jira", "confluence", "gmail", "calendar", "drive", "googlechat", "slack", "notion", "linear", "trello", "github", "outlook"], Ya = [], Jr = () => Math.random().toString(36).slice(2, 9), qe = "*";
function Xr() {
  const { cfg: e, save: p, saveTasks: u, saveBrief: C } = La(), { t: o, code: y, lang: G } = ta(), j = ma(), { openChat: N } = an(), [_, x] = D({}), [Z, ce] = D(""), [K, me] = D({}), [de, rt] = D({}), [we, mt] = D({}), [pe, ht] = D(null), [be, it] = D(!1), [Ye, tt] = D({}), [Me, gt] = D({ id: "", secret: "" }), [bt, ft] = D(null), [Mt, Ft] = D(null), [oe, Ie] = D({ url: "", token: "" }), [Re, Ee] = D(!1), [O, je] = D({}), [he, W] = D(() => {
    try {
      return JSON.parse(localStorage.getItem("alba.expandedEmpty") || "{}");
    } catch {
      return {};
    }
  }), It = (l) => W((k) => {
    const m = { ...k, [l]: !0 };
    try {
      localStorage.setItem("alba.expandedEmpty", JSON.stringify(m));
    } catch {
    }
    return m;
  }), i = (l) => W((k) => {
    const m = { ...k };
    delete m[l];
    try {
      localStorage.setItem("alba.expandedEmpty", JSON.stringify(m));
    } catch {
    }
    return m;
  }), B = async (l, k) => {
    je((M) => ({ ...M, [l]: !0 }));
    const m = Date.now();
    try {
      await k();
    } finally {
      const M = Math.max(0, 1e3 - (Date.now() - m));
      setTimeout(() => je((S) => ({ ...S, [l]: !1 })), M);
    }
  }, [U, V] = D(""), xe = async () => {
    try {
      const l = await j.get("/apps/alba/api/status");
      l != null && l.accounts && (x(l.accounts), ce(l.store ?? ""), me(l.googleClientBySpace ?? {}), rt(l.secrets ?? {}));
    } catch {
    }
  };
  ee(() => {
    xe();
    const l = setInterval(() => void xe(), 2e4);
    return () => clearInterval(l);
  }, []);
  const Ce = async (l, k) => {
    try {
      return await j.post("/apps/alba/api/" + l, k);
    } catch (m) {
      const M = /"error"\s*:\s*"([^"]+)"/.exec(String((m == null ? void 0 : m.message) ?? m));
      return { error: M ? M[1] : "Errore" };
    }
  }, De = async (l, k) => {
    var M, S;
    if (Ee(!0), V(""), k === "gmail") {
      const d = ((S = (M = e.accounts[k]) == null ? void 0 : M.find((ve) => ve.id === l)) == null ? void 0 : S.space) ?? "";
      if (!K[d]) {
        const ve = await Ce("google-client", { accountId: l, clientId: Me.id, clientSecret: Me.secret });
        if (gt({ id: Me.id, secret: "" }), !(ve != null && ve.ok)) {
          Ee(!1), V((ve == null ? void 0 : ve.error) || "Errore");
          return;
        }
        me((Se) => ({ ...Se, [d]: !0 }));
      }
      const F = await Ce("connect", { app: k, accountId: l });
      if (Ee(!1), !(F != null && F.authUrl)) {
        V((F == null ? void 0 : F.error) || "Errore");
        return;
      }
      window.open(F.authUrl, "_blank", "noopener"), ft(l);
      const re = Date.now(), ne = setInterval(async () => {
        await xe(), Date.now() - re > 18e4 && (clearInterval(ne), ft(null));
      }, 3e3);
      return;
    }
    const m = await Ce("connect", { app: k, accountId: l, url: oe.url, token: oe.token });
    Ie({ url: oe.url, token: "" }), Ee(!1), m != null && m.ok ? (Ft(null), Ie({ url: "", token: "" }), xe()) : V((m == null ? void 0 : m.error) || "Errore");
  }, Et = { discord: "https://discord.com/login", linkedin: "https://www.linkedin.com/login", telegram: "https://web.telegram.org/", teams: "https://teams.microsoft.com/" }, Ht = async (l) => {
    var M;
    const k = l.filter((S) => Xt.includes(S.key)), m = l.filter((S) => !Xt.includes(S.key));
    if (k.length) {
      const S = (M = await Ce("setup/start", { accountIds: k.map((d) => d.a.id), lang: y })) == null ? void 0 : M.url;
      if (S) {
        ht(S), it(!1);
        try {
          window.open(S, "_blank", "noopener");
        } catch {
        }
      }
    }
    if (m.length) {
      m.forEach((d) => {
        zn(d.a.method) || w(d.key, d.a.id, { method: "page" });
      });
      const S = [...new Set(m.map((d) => Et[d.key]).filter(Boolean))];
      S.length && window.dispatchEvent(new CustomEvent("alba:ask", { detail: { message: "Open " + (S.length > 1 ? "these addresses, one tab each," : "this address") + " with the browser tool (op navigate, the url goes inside args) and stop there. Do not click, type or read anything: " + S.join(" ") } }));
    }
  };
  ee(() => {
    let l = !0;
    const k = setInterval(async () => {
      try {
        const m = await j.get("/apps/alba/api/open-requests");
        if (!l || !Array.isArray(m == null ? void 0 : m.requests)) return;
        for (const M of m.requests)
          window.dispatchEvent(new CustomEvent("alba:ask", { detail: { message: "Open this address with the browser tool (op navigate, the url goes inside args) and stop there. Do not click, type or read anything: " + M.url } }));
      } catch {
      }
    }, 3e3);
    return () => {
      l = !1, clearInterval(k);
    };
  }, []);
  const $t = (l, k) => B(l, async () => {
    Ee(!0), V("");
    const m = await Ce("secret-check", { accountId: l });
    Ee(!1), m != null && m.ok || V((m == null ? void 0 : m.error) || "Errore"), await xe();
  }), aa = async (l) => {
    Ee(!0), V("");
    const k = await Ce("secret-set", { accountId: l, value: Ye[l] ?? "" });
    tt((m) => ({ ...m, [l]: "" })), Ee(!1), k != null && k.ok ? mt((m) => ({ ...m, [l]: !1 })) : V((k == null ? void 0 : k.error) || "Errore"), xe();
  }, Fe = (l, k, m) => {
    const M = o.secAskMsg.replace("{app}", k).replace("{acc}", m.label).replace("{sp}", m.space);
    window.dispatchEvent(new CustomEvent("alba:ask", { detail: { message: M } }));
  }, Ke = (l) => B(l, async () => {
    await Ce("refresh", { accountId: l }), await xe();
  }), [_e, xt] = on(), [Ct, st] = D({}), se = e.spaces.includes(_e) ? _e : e.spaces[0] ?? qe, Qe = se === qe ? e.spaces[0] ?? "" : se, Ut = (l) => l === qe ? "#64748B" : ya(e, l), Lt = ut.flatMap(({ key: l, name: k }) => (e.accounts[l] ?? []).filter((m) => {
    var M, S;
    return m.enabled && (Xt.includes(l) ? !_[m.id] : ((S = (M = e.health) == null ? void 0 : M[m.id]) == null ? void 0 : S.status) !== "ok") && (se === qe || m.space === se);
  }).map((m) => ({ key: l, name: k, a: m }))), Vt = () => {
    const l = ut.flatMap(({ key: k, name: m }) => (e.accounts[k] ?? []).filter((M) => M.enabled && (se === qe || M.space === se)).map((M) => ({ key: k, name: m, a: M })));
    Ht(l.filter(({ key: k, a: m }) => {
      var M, S;
      return Xt.includes(k) ? !_[m.id] : ((S = (M = e.health) == null ? void 0 : M[m.id]) == null ? void 0 : S.status) !== "ok";
    }));
  }, Pt = (l, k) => p({ ...e, accounts: { ...e.accounts, [l]: k } }), Y = { claudecode: "~/.claude/projects", kiro: "~/.kiro/sessions" }, c = (l) => {
    const k = (Ct[l] ?? "").trim() || Y[l] || "";
    if (!k || !Qe) return;
    const m = l === "discord" ? "page" : ["folder", "claudecode", "kiro"].includes(l) ? "folder" : "integration", M = l === "web" ? { verifiedAt: (/* @__PURE__ */ new Date()).toISOString(), web: { mode: "free", sites: [], block: [] } } : {};
    Pt(l, [...e.accounts[l] ?? [], { id: Jr(), label: k, space: Qe, method: m, enabled: !0, ...M }]), st({ ...Ct, [l]: "" });
  }, w = (l, k, m) => Pt(l, (e.accounts[l] ?? []).map((M) => M.id === k ? { ...M, ...m } : M)), H = (l, k) => Pt(l, (e.accounts[l] ?? []).filter((m) => m.id !== k)), ae = I(e);
  ae.current = e;
  const $e = I(w);
  $e.current = w;
  const Le = I({}), lt = { web: { mode: "free", sites: [], block: [] }, patterns: { include: [], exclude: [] }, orgFilter: { mode: "exclude", orgs: [] } }, Yt = (l, k, m, M) => {
    const S = k + m + Object.keys(M).join();
    clearTimeout(Le.current[S]), Le.current[S] = setTimeout(() => {
      const d = (ae.current.accounts[l] ?? []).find((F) => F.id === k);
      d && $e.current(l, k, { [m]: { ...lt[m], ...d[m] ?? {}, ...M } });
    }, 350);
  }, [Kt, wa] = D({}), [qt, Ze] = D(null), [Ae, Qt] = D(null), [Dt, Pe] = D(null), [vt, Je] = D(null), [Be, ha] = D(null);
  ee(() => {
    if (!qt && !Ae && !Dt && !vt && !Be) return;
    const l = (k) => {
      var M;
      const m = k.target;
      (M = m.closest) != null && M.call(m, ".avpop, .av, .fpop, .fbtn, .orgpop, .orgbtn, .copop, .cobtn, .setbtn") || (Ze(null), Qt(null), Pe(null), Je(null), ha(null));
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [qt, Ae, Dt, vt, Be]);
  const Pa = (l) => {
    try {
      return new Intl.DateTimeFormat(G, { weekday: "short" }).format(new Date(2024, 0, l));
    } catch {
      return String(l);
    }
  }, Zt = (l) => {
    var k;
    return ((k = e.frequency) == null ? void 0 : k[l]) ?? { mode: "every", days: [] };
  }, ke = (l, k) => p({ ...e, frequency: { ...e.frequency ?? {}, [l]: k } }), St = (l) => {
    const k = Math.max(0, Math.round((Date.now() - Date.parse(l)) / 6e4));
    try {
      const m = new Intl.RelativeTimeFormat(y || "en", { numeric: "auto" });
      return k < 60 ? m.format(-k, "minute") : k < 1440 ? m.format(-Math.round(k / 60), "hour") : m.format(-Math.round(k / 1440), "day");
    } catch {
      return l.slice(0, 16).replace("T", " ");
    }
  }, Ne = (l, k) => {
    var S;
    if (Xt.includes(l)) {
      const d = _[k.id];
      if (!d) return { dot: "none", text: o.lnkNo };
      if (d.error) {
        const re = /https:\/\/console\.(?:developers|cloud)\.google\.com\/[^\s"'<>]+/.exec(d.error);
        return re && /has not been used|is disabled|accessNotConfigured/i.test(d.error) ? { dot: "bad", text: o.apiOff, title: d.error, href: re[0] } : { dot: "bad", text: d.error, title: d.url };
      }
      const F = l === "gmail" ? o.unitMail : l === "calendar" ? o.unitEvent : l === "drive" ? o.unitFile : l === "slack" || l === "googlechat" ? o.unitMsg : ["notion", "linear", "trello", "github", "outlook", "jira", "confluence"].includes(l) ? o.unitItem : "";
      return { dot: "ok", text: F ? o.lnkOk.split("·")[0] + "· " + String(d.count ?? 0) + " " + F : o.lnkOk.replace("{n}", String(d.count ?? 0)), title: d.lastSync ? St(d.lastSync) : d.url };
    }
    if (Ya.includes(l)) {
      const d = _[k.id];
      return d != null && d.error ? { dot: "bad", text: d.error } : d ? { dot: "ok", text: o.lnkOk.split("·")[0] + "· " + String(d.count ?? 0), title: d.lastSync ? St(d.lastSync) : void 0 } : de[k.id] ? { dot: "warn", text: o.secYes } : { dot: "none", text: o.secNo };
    }
    const m = ((S = e.health) == null ? void 0 : S[k.id]) ?? (k.verifiedAt ? { status: "ok", checkedAt: k.verifiedAt } : void 0);
    return Kt[k.id] && Date.now() - Kt[k.id] < 12e4 && !(m && Date.parse(m.checkedAt) > Kt[k.id]) ? { dot: "warn", text: o.stBusy } : m ? m.status === "signin" ? { dot: "bad", text: o.stSignin, title: St(m.checkedAt) } : m.status === "error" ? { dot: "bad", text: o.stErr, title: m.detail } : l === "discord" ? { dot: "ok", text: o.stOk.replace("{t}", St(m.checkedAt)) } : Date.now() - Date.parse(m.checkedAt) > 36 * 36e5 ? { dot: "warn", text: o.stOld.replace("{t}", St(m.checkedAt)) } : { dot: "ok", text: o.stOk.replace("{t}", St(m.checkedAt)) } : { dot: "none", text: o.stNever };
  }, yt = async (l, k, m) => {
    wa((M) => ({ ...M, [m.id]: Date.now() })), je((M) => ({ ...M, [m.id]: !0 })), setTimeout(() => je((M) => ({ ...M, [m.id]: !1 })), 1500);
    try {
      const M = await j.post("/apps/alba/api/run-brief", { steps: ["health"] });
      if (M && M.ok === !1) throw new Error(String(M.error || "error"));
    } catch {
      wa((M) => {
        const S = { ...M };
        return delete S[m.id], S;
      });
    }
  }, Rt = (l) => Object.values(e.accounts).reduce((k, m) => k + m.filter((M) => l === qe || M.space === l).length, 0), [Bt, zt] = D(""), [jt, Ge] = D(!1), [ga, na] = D(""), at = I(null);
  ee(() => {
    if (!jt) return;
    const l = (k) => {
      var M;
      const m = k.target;
      at.current && !at.current.contains(m) && !((M = m.closest) != null && M.call(m, ".ichip.more")) && Ge(!1);
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [jt]);
  const ba = (l, k) => {
    var d, F, re;
    const m = k.trim();
    if (!m || m === l || e.spaces.includes(m)) return;
    const M = (ne) => {
      if (!ne || !(l in ne)) return ne;
      const { [l]: ve, ...Se } = ne;
      return { ...Se, [m]: ve };
    }, S = Object.fromEntries(Object.entries(e.accounts).map(([ne, ve]) => [ne, ve.map((Se) => Se.space === l ? { ...Se, space: m } : Se)]));
    p({ ...e, accounts: S, spaces: e.spaces.map((ne) => ne === l ? m : ne), spaceIcons: M(e.spaceIcons), spaceColors: M(e.spaceColors), focus: M(e.focus) }), (d = e.tasks) != null && d.some((ne) => ne.space === l) && u(e.tasks.map((ne) => ne.space === l ? { ...ne, space: m } : ne)), e.brief && C({ ...e.brief, updates: (F = e.brief.updates) == null ? void 0 : F.map((ne) => ne.space === l ? { ...ne, space: m } : ne), todos: (re = e.brief.todos) == null ? void 0 : re.map((ne) => ne.space === l ? { ...ne, space: m } : ne) }), _e === l && xt(m);
  }, qa = (l) => {
    Rt(l) > 0 || (p({ ...e, spaces: e.spaces.filter((k) => k !== l) }), xt(qe));
  };
  return /* @__PURE__ */ r(Xe, { children: [
    pe ? /* @__PURE__ */ r("div", { className: "loginhint", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ t("span", { children: o.setupReady }),
      /* @__PURE__ */ r("span", { style: { display: "flex", gap: 6, flex: "none" }, children: [
        /* @__PURE__ */ t("a", { className: "talk", href: pe, target: "_blank", rel: "noopener noreferrer", children: o.setupOpen }),
        /* @__PURE__ */ t("button", { className: "talk", type: "button", onClick: async () => {
          try {
            await navigator.clipboard.writeText(pe);
          } catch {
          }
          it(!0);
        }, children: be ? o.setupCopied : o.setupCopy })
      ] })
    ] }) : null,
    /* @__PURE__ */ r("h1", { children: [
      o.connTitle,
      Lt.length > 1 ? /* @__PURE__ */ r("button", { className: "talk connall", onClick: Vt, children: [
        /* @__PURE__ */ t(Ga, { size: 13 }),
        " ",
        o.connAll,
        " (",
        Lt.length,
        ")"
      ] }) : null
    ] }),
    /* @__PURE__ */ t("div", { className: "card about", children: (() => {
      var d;
      const l = e.about ?? "", k = se !== qe ? (d = e.aboutBySpace) == null ? void 0 : d[se] : void 0, m = se === qe ? l : k ?? l, M = (F) => {
        if (se === qe) {
          p({ ...e, about: F });
          return;
        }
        const re = { ...e.aboutBySpace ?? {} };
        F === l ? delete re[se] : re[se] = F, p({ ...e, aboutBySpace: re });
      }, S = se !== qe ? /* @__PURE__ */ r("button", { className: "freset", disabled: k === void 0, onClick: () => M(l), children: [
        /* @__PURE__ */ t(Za, { size: 11 }),
        o.focusReset
      ] }) : null;
      return /* @__PURE__ */ r(Xe, { children: [
        /* @__PURE__ */ r("div", { className: "frow", children: [
          /* @__PURE__ */ t("span", { className: "flab", children: o.aboutTitle }),
          se !== qe ? /* @__PURE__ */ t("span", { className: "fname", children: se }) : null,
          S
        ] }),
        /* @__PURE__ */ t("small", { children: o.aboutHint }),
        /* @__PURE__ */ t("textarea", { value: m, maxLength: 400, spellCheck: !1, placeholder: o.aboutPh, "aria-label": o.aboutTitle, onChange: (F) => M(F.target.value) }, se)
      ] });
    })() }),
    /* @__PURE__ */ r("div", { className: "cards swap", children: [
      se !== qe ? (() => {
        const l = se, k = Jn(e, l), m = Ut(l), M = Rt(l);
        return /* @__PURE__ */ r("div", { className: "card spacecfg", style: { "--c": m }, children: [
          /* @__PURE__ */ r("div", { className: "head", children: [
            /* @__PURE__ */ t("div", { className: "tile", style: { background: m, color: "#fff" }, children: /* @__PURE__ */ t(k, { size: 22 }) }),
            /* @__PURE__ */ t("input", { className: "renamein", defaultValue: l, maxLength: 40, title: o.renameSpace, "aria-label": o.renameSpace, onKeyDown: (S) => {
              S.key === "Enter" && S.target.blur();
            }, onBlur: (S) => ba(l, S.target.value) }, l),
            M === 0 ? /* @__PURE__ */ t("button", { className: "ib", title: o.deleteSpace, "aria-label": o.deleteSpace, onClick: () => qa(l), children: /* @__PURE__ */ t(Cn, { size: 15 }) }) : null
          ] }),
          /* @__PURE__ */ r("div", { className: "pgroup", children: [
            /* @__PURE__ */ r("div", { className: "iconsgrid", children: [
              Object.entries(Qn).map(([S, d]) => {
                var re;
                const F = (((re = e.spaceIcons) == null ? void 0 : re[l]) ?? "") === S;
                return /* @__PURE__ */ t("button", { className: "ichip" + (F ? " on" : ""), style: F ? { background: m } : void 0, onClick: () => p({ ...e, spaceIcons: { ...e.spaceIcons ?? {}, [l]: S } }), children: /* @__PURE__ */ t(d, { size: 18 }) }, S);
              }),
              (() => {
                var ve;
                const S = ((ve = e.spaceIcons) == null ? void 0 : ve[l]) ?? "", d = ["Laptop", "Landmark", "Stethoscope"], F = S.startsWith("lu:") && !d.includes(S.slice(3)), re = F ? Zn(S) : null, ne = (F ? d.slice(0, 2) : d).filter((Se) => Tt(Se));
                return /* @__PURE__ */ r(Xe, { children: [
                  ne.map((Se) => {
                    const _t = Tt(Se), Oe = S === "lu:" + Se;
                    return /* @__PURE__ */ t("button", { title: Se, className: "ichip" + (Oe ? " on" : ""), style: Oe ? { background: m } : void 0, onClick: () => p({ ...e, spaceIcons: { ...e.spaceIcons ?? {}, [l]: "lu:" + Se } }), children: /* @__PURE__ */ t(_t, { size: 18 }) }, Se);
                  }),
                  re ? /* @__PURE__ */ t("button", { className: "ichip on", style: { background: m }, title: S.slice(3), onClick: () => Ge(!0), children: /* @__PURE__ */ t(re, { size: 18 }) }) : null
                ] });
              })(),
              /* @__PURE__ */ t("button", { className: "ichip more", title: o.moreIcons, "aria-label": o.moreIcons, onClick: () => {
                na(""), Ge(!0);
              }, children: (() => {
                const S = Tt("LayoutGrid") ?? Ma;
                return /* @__PURE__ */ t(S, { size: 16 });
              })() })
            ] }),
            jt ? /* @__PURE__ */ r("div", { className: "iconpop", ref: at, role: "dialog", onKeyDown: (S) => {
              S.key === "Escape" && Ge(!1);
            }, children: [
              /* @__PURE__ */ r("div", { className: "ipt", children: [
                /* @__PURE__ */ t("input", { autoFocus: !0, value: ga, onChange: (S) => na(S.target.value), placeholder: o.iconSearch, "aria-label": o.iconSearch }),
                /* @__PURE__ */ t("button", { className: "lnk", onClick: () => Ge(!1), children: o.close })
              ] }),
              /* @__PURE__ */ t("div", { className: "ipg", children: Lr.filter((S) => S.toLowerCase().includes(ga.trim().toLowerCase())).map((S) => {
                var re;
                const d = Tt(S);
                if (!d) return null;
                const F = (((re = e.spaceIcons) == null ? void 0 : re[l]) ?? "") === "lu:" + S;
                return /* @__PURE__ */ t("button", { title: S, className: F ? "on" : "", style: F ? { background: m } : void 0, onClick: () => {
                  p({ ...e, spaceIcons: { ...e.spaceIcons ?? {}, [l]: "lu:" + S } }), Ge(!1);
                }, children: /* @__PURE__ */ t(d, { size: 18 }) }, S);
              }) })
            ] }) : null
          ] }),
          /* @__PURE__ */ t("div", { className: "pgroup", children: /* @__PURE__ */ r("div", { className: "colorsgrid", children: [
            Fn.map((S) => /* @__PURE__ */ t("button", { className: "sw" + (m.toLowerCase() === S.toLowerCase() ? " on" : ""), style: { background: S }, "aria-label": S, onClick: () => p({ ...e, spaceColors: { ...e.spaceColors ?? {}, [l]: S } }) }, S)),
            (() => {
              const S = !Fn.some((d) => d.toLowerCase() === m.toLowerCase());
              return /* @__PURE__ */ r("label", { className: "swpick" + (S ? " on" : ""), style: S ? { background: m } : void 0, title: o.chooseColor, children: [
                /* @__PURE__ */ t(Ir, { size: 13 }),
                /* @__PURE__ */ t("input", { type: "color", value: /^#[0-9a-fA-F]{6}$/.test(m) ? m : "#8b5cf6", onChange: (d) => p({ ...e, spaceColors: { ...e.spaceColors ?? {}, [l]: d.target.value } }) })
              ] });
            })()
          ] }) }),
          (() => {
            var z, J, q;
            const S = ut.filter((Q) => (e.accounts[Q.key] ?? []).some((ie) => ie.space === l)).map((Q) => Q.key), d = S.includes(Bt) ? Bt : S[0];
            if (!d) return /* @__PURE__ */ r("div", { className: "focus", children: [
              /* @__PURE__ */ t("span", { className: "flab", children: o.focusTitle }),
              /* @__PURE__ */ t("small", { children: o.focusNone })
            ] });
            const F = Dn(d, y), re = (J = (z = e.focus) == null ? void 0 : z[l]) == null ? void 0 : J[d], ne = re ?? F, ve = (Q, ie) => {
              const Te = { ...e.focus ?? {} }, Ue = { ...Te[l] ?? {} };
              ie === null || ie.trim() === "" || ie === Dn(Q, y) ? delete Ue[Q] : Ue[Q] = ie, Object.keys(Ue).length ? Te[l] = Ue : delete Te[l], p({ ...e, focus: Te });
            }, Se = !0, _t = S.map((Q) => {
              var Te, Ue;
              const ie = ut.find((Jt) => Jt.key === Q);
              return /* @__PURE__ */ r("button", { className: "fchip" + (Q === d ? " on" : ""), title: ie.name, "aria-label": ie.name, onClick: () => zt(Q), children: [
                /* @__PURE__ */ t(ie.Icon, { size: 14 }),
                (Ue = (Te = e.focus) == null ? void 0 : Te[l]) != null && Ue[Q] ? /* @__PURE__ */ t("i", {}) : null
              ] }, Q);
            }), Oe = /* @__PURE__ */ r("button", { className: "freset", disabled: re === void 0, onClick: () => ve(d, null), children: [
              /* @__PURE__ */ t(Za, { size: 11 }),
              o.focusReset
            ] }), h = /* @__PURE__ */ t("textarea", { value: ne, maxLength: 800, spellCheck: !1, "aria-label": o.focusTitle, onChange: (Q) => ve(d, Q.target.value) }, l + d);
            return Se ? /* @__PURE__ */ r("div", { className: "focus vert", children: [
              /* @__PURE__ */ t("div", { className: "fcol", children: _t }),
              /* @__PURE__ */ r("div", { className: "fmain", children: [
                /* @__PURE__ */ r("div", { className: "frow", children: [
                  /* @__PURE__ */ t("span", { className: "flab", children: o.focusTitle }),
                  /* @__PURE__ */ t("span", { className: "fname", children: (q = ut.find((Q) => Q.key === d)) == null ? void 0 : q.name }),
                  Oe
                ] }),
                h
              ] })
            ] }) : /* @__PURE__ */ r("div", { className: "focus", children: [
              /* @__PURE__ */ r("div", { className: "frow", children: [
                /* @__PURE__ */ t("span", { className: "flab", children: o.focusTitle }),
                _t,
                Oe
              ] }),
              h
            ] });
          })()
        ] });
      })() : null,
      (() => {
        const l = (d) => se === qe || (e.accounts[d] ?? []).some((F) => F.space === se), k = (d) => se + "::" + d, m = se === qe ? [] : ut.filter((d) => !l(d.key)), M = m.filter((d) => !he[k(d.key)]), S = [...ut.filter((d) => l(d.key)), ...m.filter((d) => he[k(d.key)])];
        return /* @__PURE__ */ r(Xe, { children: [
          S.map(({ key: d, name: F, color: re, Icon: ne }, ve) => {
            const Se = o.apps[d] ?? "", Oe = (e.accounts[d] ?? []).filter((h) => se === qe || h.space === se);
            return /* @__PURE__ */ r("div", { className: "card" + (Oe.length ? "" : " empty") + (Oe.some((h) => h.id === qt || h.id === Ae || h.id === Dt || h.id === vt || h.id === Be) ? " up" : ""), style: { "--i": ve }, children: [
              /* @__PURE__ */ r("div", { className: "head", children: [
                /* @__PURE__ */ t("div", { className: "tile", style: { background: re + "26", color: re }, children: /* @__PURE__ */ t(ne, { size: 22 }) }),
                /* @__PURE__ */ r("div", { children: [
                  /* @__PURE__ */ t("b", { children: d === "folder" ? o.folderName : F }),
                  /* @__PURE__ */ t("span", { children: Se })
                ] }),
                /* @__PURE__ */ t("span", { className: "count", children: Oe.length }),
                se !== qe && Oe.length === 0 ? /* @__PURE__ */ t("button", { type: "button", className: "ib collapseapp", title: o.hideUnused, "aria-label": o.hideUnused, onClick: () => i(k(d)), children: "×" }) : null
              ] }),
              Oe.length === 0 ? /* @__PURE__ */ t("div", { className: "acc ghost", "aria-hidden": "true", children: /* @__PURE__ */ t("div", { className: "av", children: " " }) }) : null,
              Oe.map((h) => /* @__PURE__ */ r("div", { className: "acc" + (h.enabled ? "" : " off"), children: [
                (() => {
                  const z = Ne(d, h), J = z.text === o.stBusy || !!O[h.id];
                  return /* @__PURE__ */ r("button", { type: "button", className: "av", style: { background: ya(e, h.space) }, "aria-label": o.avStatus, title: z.text, onClick: () => {
                    Qt(null), Ze(qt === h.id ? null : h.id);
                  }, children: [
                    Or(h.label),
                    /* @__PURE__ */ t("i", { className: "sdot " + (J ? "warn" : h.enabled ? z.dot : "none") + (J ? " busy" : "") })
                  ] });
                })(),
                qt === h.id ? (() => {
                  var Q;
                  const z = Ne(d, h), q = z.text === o.stBusy || !!O[h.id] ? { ...z, dot: "warn", text: o.stBusy, title: void 0, href: void 0 } : z;
                  return /* @__PURE__ */ r("div", { className: "avpop", children: [
                    /* @__PURE__ */ t("input", { className: "l", style: { width: "100%", boxSizing: "border-box", fontWeight: 700, fontSize: 13 }, title: h.label, value: h.label, onChange: (ie) => w(d, h.id, { label: ie.target.value }) }),
                    /* @__PURE__ */ r("div", { className: "r", children: [
                      h.space,
                      (Q = _[h.id]) != null && Q.team ? " · " + _[h.id].team : ""
                    ] }),
                    /* @__PURE__ */ r("div", { className: "r " + (h.enabled ? q.dot : ""), children: [
                      /* @__PURE__ */ t("i", {}),
                      q.href ? /* @__PURE__ */ t("a", { href: q.href, target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", textDecoration: "underline" }, children: q.text }) : q.text
                    ] }),
                    q.title ? /* @__PURE__ */ t("div", { className: "r", style: { wordBreak: "break-word" }, children: q.title }) : null
                  ] });
                })() : null,
                Ae === h.id ? /* @__PURE__ */ t("div", { className: "fpop", children: (() => {
                  const z = Zt(h.id), J = (q) => {
                    var Q;
                    return ke(h.id, { mode: q, days: q === "weekly" ? (Q = z.days) != null && Q.length ? z.days : [1] : z.days });
                  };
                  return /* @__PURE__ */ r("div", { className: "fq", style: { borderTop: 0, marginTop: 0, paddingTop: 0 }, children: [
                    /* @__PURE__ */ r("h5", { children: [
                      "⏱ ",
                      o.freqTitle.replace("{app}", F)
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "f" + h.id, checked: z.mode === "every", onChange: () => J("every") }),
                      o.freqEvery
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "f" + h.id, checked: z.mode === "weekly", onChange: () => J("weekly") }),
                      o.freqWeekly
                    ] }),
                    z.mode === "weekly" ? /* @__PURE__ */ t("div", { className: "days", children: [1, 2, 3, 4, 5, 6, 7].map((q) => {
                      var Q;
                      return /* @__PURE__ */ t("button", { type: "button", className: (Q = z.days) != null && Q.includes(q) ? "on" : "", onClick: () => {
                        var Te, Ue;
                        const ie = (Te = z.days) == null ? void 0 : Te.includes(q);
                        ie && (((Ue = z.days) == null ? void 0 : Ue.length) ?? 0) === 1 || ke(h.id, { mode: "weekly", days: ie ? (z.days ?? []).filter((Jt) => Jt !== q) : [...z.days ?? [], q].sort((Jt, Ca) => Jt - Ca) });
                      }, children: Pa(q) }, q);
                    }) }) : null,
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "f" + h.id, checked: z.mode === "off", onChange: () => J("off") }),
                      o.freqOff
                    ] }),
                    /* @__PURE__ */ t("p", { children: o.freqHint })
                  ] });
                })() }) : null,
                Dt === h.id ? /* @__PURE__ */ t("div", { className: "fpop orgpop", children: (() => {
                  const z = h.orgFilter ?? { mode: "exclude", orgs: [] }, J = (q) => w(d, h.id, { orgFilter: { ...z, ...q } });
                  return /* @__PURE__ */ r("div", { className: "fq", style: { borderTop: 0, marginTop: 0, paddingTop: 0 }, children: [
                    /* @__PURE__ */ r("h5", { children: [
                      "🏢 ",
                      o.ghOrgTitle
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "o" + h.id, checked: z.mode === "exclude", onChange: () => J({ mode: "exclude" }) }),
                      o.ghOrgExclude
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "o" + h.id, checked: z.mode === "include", onChange: () => J({ mode: "include" }) }),
                      o.ghOrgInclude
                    ] }),
                    /* @__PURE__ */ t("input", { className: "orginput", style: { width: "100%", boxSizing: "border-box" }, placeholder: o.ghOrgPh, defaultValue: z.orgs.join(", "), onChange: (q) => Yt(d, h.id, "orgFilter", { orgs: q.target.value.split(",").map((Q) => Q.trim()).filter(Boolean) }) }),
                    /* @__PURE__ */ t("p", { children: o.ghOrgHint })
                  ] });
                })() }) : null,
                Be === h.id && d === "web" ? /* @__PURE__ */ t("div", { className: "fpop orgpop", children: (() => {
                  const z = h.web ?? { mode: "free", sites: [], block: [] }, J = (Q) => {
                    var ie;
                    return w(d, h.id, { web: { ...z, ...((ie = (ae.current.accounts[d] ?? []).find((Te) => Te.id === h.id)) == null ? void 0 : ie.web) ?? {}, ...Q } });
                  }, q = (Q) => Q.split(",").map((ie) => ie.trim()).filter(Boolean);
                  return /* @__PURE__ */ r("div", { className: "fq", style: { borderTop: 0, marginTop: 0, paddingTop: 0 }, children: [
                    /* @__PURE__ */ t("h5", { children: o.webTitle }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "w" + h.id, checked: z.mode !== "sites", onChange: () => J({ mode: "free" }) }),
                      o.webFree
                    ] }),
                    z.mode !== "sites" ? /* @__PURE__ */ t("input", { className: "orginput", style: { width: "100%", boxSizing: "border-box" }, placeholder: o.webBlockPh, defaultValue: z.block.join(", "), onChange: (Q) => Yt(d, h.id, "web", { block: q(Q.target.value) }) }, "b") : null,
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "w" + h.id, checked: z.mode === "sites", onChange: () => J({ mode: "sites" }) }),
                      o.webSites
                    ] }),
                    z.mode === "sites" ? /* @__PURE__ */ t("input", { className: "orginput", style: { width: "100%", boxSizing: "border-box" }, placeholder: o.webSitesPh, defaultValue: z.sites.join(", "), onChange: (Q) => Yt(d, h.id, "web", { sites: q(Q.target.value) }) }, "s") : null,
                    /* @__PURE__ */ t("p", { children: o.webHint })
                  ] });
                })() }) : null,
                Be === h.id && ["folder", "claudecode", "kiro"].includes(d) ? /* @__PURE__ */ t("div", { className: "fpop orgpop", children: (() => {
                  const z = h.patterns ?? { include: [], exclude: [] }, J = (q) => q.split(",").map((Q) => Q.trim()).filter(Boolean);
                  return /* @__PURE__ */ r("div", { className: "fq", style: { borderTop: 0, marginTop: 0, paddingTop: 0 }, children: [
                    /* @__PURE__ */ t("h5", { children: o.patTitle }),
                    /* @__PURE__ */ t("input", { className: "orginput", style: { width: "100%", boxSizing: "border-box" }, placeholder: o.patInclude, defaultValue: z.include.join(", "), onChange: (q) => Yt(d, h.id, "patterns", { include: J(q.target.value) }) }),
                    /* @__PURE__ */ t("input", { className: "orginput", style: { width: "100%", boxSizing: "border-box" }, placeholder: o.patExclude, defaultValue: z.exclude.join(", "), onChange: (q) => Yt(d, h.id, "patterns", { exclude: J(q.target.value) }) }),
                    /* @__PURE__ */ t("p", { children: o.patHint })
                  ] });
                })() }) : null,
                vt === h.id ? /* @__PURE__ */ t("div", { className: "fpop orgpop", children: (() => {
                  const z = h.companyScope ?? "profile", J = (q) => w(d, h.id, { companyScope: q });
                  return /* @__PURE__ */ r("div", { className: "fq", style: { borderTop: 0, marginTop: 0, paddingTop: 0 }, children: [
                    /* @__PURE__ */ r("h5", { children: [
                      "🏛 ",
                      o.liCoTitle
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "c" + h.id, checked: z === "profile", onChange: () => J("profile") }),
                      o.liCoProfile
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "c" + h.id, checked: z === "both", onChange: () => J("both") }),
                      o.liCoBoth
                    ] }),
                    /* @__PURE__ */ r("label", { children: [
                      /* @__PURE__ */ t("input", { type: "radio", name: "c" + h.id, checked: z === "company", onChange: () => J("company") }),
                      o.liCoOnly
                    ] }),
                    z !== "profile" ? /* @__PURE__ */ t("input", { className: "orginput", style: { width: "100%", boxSizing: "border-box" }, placeholder: o.liCoPh, defaultValue: h.companyPage ?? "", onBlur: (q) => w(d, h.id, { companyPage: q.target.value.trim() }) }) : null,
                    /* @__PURE__ */ t("p", { children: o.liCoHint })
                  ] });
                })() }) : null,
                /* @__PURE__ */ r("div", { className: "accinfo", children: [
                  /* @__PURE__ */ t("span", { className: "nm", title: h.label, children: h.label.includes("@") ? h.label.split("@")[0] : h.label }),
                  se === qe ? /* @__PURE__ */ t("select", { value: h.space, onChange: (z) => w(d, h.id, { space: z.target.value }), children: e.spaces.map((z) => /* @__PURE__ */ t("option", { children: z }, z)) }) : null
                ] }),
                /* @__PURE__ */ r("div", { className: "acctools", children: [
                  (() => {
                    let z = !1, J = o.lnkSync, q = () => {
                    };
                    return Xt.includes(d) ? (z = !!_[h.id], q = () => void Ke(h.id)) : Ya.includes(d) ? (z = !Re && (!!de[h.id] || !!_[h.id]), J = o.secVerify, q = () => void $t(h.id)) : d !== "drive" && zn(h.method) && (z = !0, J = o.stCheck, q = () => void yt(d, F, h)), /* @__PURE__ */ t("button", { className: "ib" + (O[h.id] ? " spin" : ""), title: J, "aria-label": J, disabled: !z, style: z ? void 0 : { opacity: 0.3, cursor: "default" }, onClick: q, children: /* @__PURE__ */ t(rr, { size: 14 }) });
                  })(),
                  /* @__PURE__ */ t("button", { className: "ib" + (h.enabled && !["web", "folder", "claudecode", "kiro"].includes(d) && ["none", "bad"].includes(Ne(d, h).dot) && !O[h.id] ? " need" : ""), title: o.lnkGo, "aria-label": o.lnkGo, onClick: () => void Ht([{ key: d, name: F, a: h }]), children: /* @__PURE__ */ t(Ga, { size: 14 }) }),
                  (() => {
                    const z = Tt("Clock"), J = Zt(h.id);
                    return z ? /* @__PURE__ */ t("button", { className: "ib fbtn" + (J.mode !== "every" ? " act" : ""), title: o.freqTitle.replace("{app}", F), "aria-label": o.freqTitle.replace("{app}", F), onClick: () => {
                      Ze(null), Qt(Ae === h.id ? null : h.id);
                    }, children: /* @__PURE__ */ t(z, { size: 15 }) }) : null;
                  })(),
                  d === "github" ? (() => {
                    var q;
                    const z = Tt("Building2"), J = !!((q = h.orgFilter) != null && q.orgs.length);
                    return z ? /* @__PURE__ */ t("button", { className: "ib orgbtn" + (J ? " act" : ""), title: o.ghOrgTitle, "aria-label": o.ghOrgTitle, onClick: () => {
                      Ze(null), Pe(Dt === h.id ? null : h.id);
                    }, children: /* @__PURE__ */ t(z, { size: 15 }) }) : null;
                  })() : null,
                  d === "web" || ["folder", "claudecode", "kiro"].includes(d) ? (() => {
                    var Q, ie, Te, Ue;
                    const z = Tt(d === "web" ? "SlidersHorizontal" : "Filter"), J = d === "web" ? ((Q = h.web) == null ? void 0 : Q.mode) === "sites" || !!((ie = h.web) != null && ie.block.length) : !!((Te = h.patterns) != null && Te.include.length || (Ue = h.patterns) != null && Ue.exclude.length), q = d === "web" ? o.webTitle : o.patTitle;
                    return z ? /* @__PURE__ */ t("button", { className: "ib setbtn" + (J ? " act" : ""), title: q, "aria-label": q, onClick: () => {
                      Ze(null), ha(Be === h.id ? null : h.id);
                    }, children: /* @__PURE__ */ t(z, { size: 15 }) }) : null;
                  })() : null,
                  d === "linkedin" ? (() => {
                    const z = Tt("Landmark"), J = (h.companyScope ?? "profile") !== "profile";
                    return z ? /* @__PURE__ */ t("button", { className: "ib cobtn" + (J ? " act" : ""), title: o.liCoTitle, "aria-label": o.liCoTitle, onClick: () => {
                      Ze(null), Je(vt === h.id ? null : h.id);
                    }, children: /* @__PURE__ */ t(z, { size: 15 }) }) : null;
                  })() : null,
                  /* @__PURE__ */ t("button", { className: "ib", title: h.enabled ? o.pause : o.resume, onClick: () => w(d, h.id, { enabled: !h.enabled }), children: h.enabled ? /* @__PURE__ */ t(ir, { size: 15 }) : /* @__PURE__ */ t(sr, { size: 15 }) }),
                  /* @__PURE__ */ t("button", { className: "ib", title: o.remove, onClick: () => {
                    (_[h.id] || de[h.id]) && Ce("disconnect", { accountId: h.id, app: d }), H(d, h.id);
                  }, children: /* @__PURE__ */ t(Cn, { size: 15 }) })
                ] })
              ] }, h.id)),
              Ya.includes(d) ? Oe.filter((h) => we[h.id]).map((h) => /* @__PURE__ */ r("div", { className: "linkform", children: [
                /* @__PURE__ */ t("small", { children: d === "gmail" ? o.secGmail : o.secCal }),
                /* @__PURE__ */ t("div", { className: "lf2", style: { justifyContent: "flex-start", flexWrap: "wrap" }, children: d === "gmail" ? /* @__PURE__ */ t("a", { className: "lnk", href: "https://myaccount.google.com/apppasswords", target: "_blank", rel: "noopener noreferrer", children: o.secLinkApp }) : /* @__PURE__ */ t("a", { className: "lnk", href: "https://calendar.google.com/calendar/u/0/r/settings", target: "_blank", rel: "noopener noreferrer", children: o.secLinkCal }) }),
                /* @__PURE__ */ t("input", { type: "password", value: Ye[h.id] ?? "", onChange: (z) => tt({ ...Ye, [h.id]: z.target.value }), placeholder: d === "gmail" ? o.secPhGmail : o.secPhCal, autoComplete: "new-password", spellCheck: !1 }),
                /* @__PURE__ */ r("div", { className: "lf2", children: [
                  /* @__PURE__ */ t("small", { children: o.secGuide }),
                  /* @__PURE__ */ r("span", { style: { display: "flex", gap: 6, flex: "none" }, children: [
                    /* @__PURE__ */ t("button", { className: "talk", type: "button", onClick: () => Fe(d, F, h), children: o.secAsk }),
                    /* @__PURE__ */ t("button", { className: "talk", type: "button", disabled: Re || !(Ye[h.id] ?? "").trim(), onClick: () => void aa(h.id), children: o.secSave })
                  ] })
                ] }),
                U ? /* @__PURE__ */ t("em", { children: U }) : null
              ] }, "s" + h.id)) : null,
              Xt.includes(d) ? Oe.filter((h) => Mt === h.id && !_[h.id]).map((h) => /* @__PURE__ */ r("form", { className: "linkform", autoComplete: "off", onSubmit: (z) => {
                z.preventDefault(), De(h.id, d);
              }, children: [
                d === "gmail" ? K[h.space] ? null : /* @__PURE__ */ r(Xe, { children: [
                  /* @__PURE__ */ r("small", { children: [
                    o.gHow,
                    " ",
                    /* @__PURE__ */ t("a", { href: "https://console.cloud.google.com/apis/credentials", target: "_blank", rel: "noopener noreferrer", children: "console.cloud.google.com" })
                  ] }),
                  /* @__PURE__ */ t("input", { value: Me.id, onChange: (z) => gt({ ...Me, id: z.target.value }), placeholder: o.gId, spellCheck: !1 }),
                  /* @__PURE__ */ t("input", { type: "password", value: Me.secret, onChange: (z) => gt({ ...Me, secret: z.target.value }), placeholder: o.gSecret, autoComplete: "new-password", spellCheck: !1 })
                ] }) : /* @__PURE__ */ r(Xe, { children: [
                  /* @__PURE__ */ t("input", { value: oe.url, onChange: (z) => Ie({ ...oe, url: z.target.value }), placeholder: o.lnkUrl, spellCheck: !1 }),
                  /* @__PURE__ */ t("input", { type: "password", value: oe.token, onChange: (z) => Ie({ ...oe, token: z.target.value }), placeholder: o.lnkToken, autoComplete: "new-password", spellCheck: !1 })
                ] }),
                /* @__PURE__ */ r("div", { className: "lf2", children: [
                  /* @__PURE__ */ t("small", { children: Z === "file" ? o.lnkWeak : d === "gmail" ? "" : o.lnkSafe }),
                  /* @__PURE__ */ r("button", { className: "talk", disabled: Re || (d === "gmail" ? !K[h.space] && (!Me.id || !Me.secret) : !oe.url || !oe.token), type: "submit", children: [
                    /* @__PURE__ */ t(Ga, { size: 13 }),
                    " ",
                    d === "gmail" ? o.gSign : o.lnkGo
                  ] })
                ] }),
                U ? /* @__PURE__ */ t("em", { children: U }) : null,
                bt === h.id ? /* @__PURE__ */ t("em", { style: { color: "var(--muted)" }, children: o.gWait }) : null
              ] }, "f" + h.id)) : null,
              /* @__PURE__ */ r("div", { className: "add", children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    value: Ct[d] ?? "",
                    onChange: (h) => st({ ...Ct, [d]: h.target.value }),
                    onKeyDown: (h) => h.key === "Enter" && c(d),
                    placeholder: Y[d] ?? (d === "folder" ? o.folderPh : d === "web" ? o.webPh : Qe ? o.addTo(Qe) : o.createFirst)
                  }
                ),
                /* @__PURE__ */ t("button", { className: "ib", style: { background: re, color: "#fff" }, title: o.add, onClick: () => c(d), children: /* @__PURE__ */ t(Ma, { size: 16 }) })
              ] })
            ] }, d);
          }),
          M.length ? /* @__PURE__ */ t("div", { className: "unusedrow", children: M.map(({ key: d, name: F, color: re, Icon: ne }) => /* @__PURE__ */ t("button", { type: "button", className: "unusedchip", title: F, "aria-label": F, style: { "--c": re }, onClick: () => It(k(d)), children: /* @__PURE__ */ t(ne, { size: 18 }) }, d)) }) : null
        ] });
      })()
    ] }, se)
  ] });
}
function ei(e, p, u, C, o, y) {
  const G = Math.max(1, Math.floor(e / C)), j = Math.max(1, Math.floor(p / C)), N = new Uint8Array(G * j).fill(1), _ = o / 2 + y;
  for (let x = 0; x < j; x++)
    for (let Z = 0; Z < G; Z++) {
      const ce = Z * C + C / 2, K = x * C + C / 2;
      if (ce - o / 2 < 0 || K - o / 2 < 0 || ce + o / 2 > e || K + o / 2 > p) {
        N[x * G + Z] = 0;
        continue;
      }
      for (const me of u)
        if (ce > me.l - _ && ce < me.r + _ && K > me.t - _ && K < me.b + _) {
          N[x * G + Z] = 0;
          break;
        }
    }
  return { cols: G, rows: j, cell: C, free: N };
}
const Wt = (e, p, u) => u * e.cols + p, ot = (e, p, u) => [
  Math.max(0, Math.min(e.cols - 1, Math.floor(p / e.cell))),
  Math.max(0, Math.min(e.rows - 1, Math.floor(u / e.cell)))
], pt = (e, p) => [p[0] * e.cell + e.cell / 2, p[1] * e.cell + e.cell / 2];
function sa(e, p) {
  if (e.free[Wt(e, p[0], p[1])]) return p;
  const u = Math.max(e.cols, e.rows);
  for (let C = 1; C < u; C++) {
    let o = null, y = 1 / 0;
    for (let G = -C; G <= C; G++)
      for (let j = -C; j <= C; j++) {
        if (Math.max(Math.abs(j), Math.abs(G)) !== C) continue;
        const N = p[0] + j, _ = p[1] + G;
        if (N < 0 || _ < 0 || N >= e.cols || _ >= e.rows || !e.free[Wt(e, N, _)]) continue;
        const x = j * j + G * G;
        x < y && (y = x, o = [N, _]);
      }
    if (o) return o;
  }
  return null;
}
const ti = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
function ea(e, p) {
  const u = new Int32Array(e.cols * e.rows).fill(-1), C = new Int32Array(e.cols * e.rows).fill(-1), o = [Wt(e, p[0], p[1])];
  u[o[0]] = 0;
  for (let y = 0; y < o.length; y++) {
    const G = o[y], j = G % e.cols, N = G / e.cols | 0;
    for (const [_, x] of ti) {
      const Z = j + _, ce = N + x;
      if (Z < 0 || ce < 0 || Z >= e.cols || ce >= e.rows) continue;
      const K = Wt(e, Z, ce);
      !e.free[K] || u[K] !== -1 || _ !== 0 && x !== 0 && (!e.free[Wt(e, j + _, N)] || !e.free[Wt(e, j, N + x)]) || (u[K] = u[G] + 1, C[K] = G, o.push(K));
    }
  }
  return { dist: u, prev: C };
}
function la(e, p, u) {
  const C = [];
  let o = Wt(e, u[0], u[1]);
  for (; o !== -1; )
    C.push([o % e.cols, o / e.cols | 0]), o = p[o];
  return C.reverse();
}
function ai(e, p, u) {
  const C = pt(e, p), o = pt(e, u), y = Math.max(1, Math.ceil(Math.hypot(o[0] - C[0], o[1] - C[1]) / (e.cell / 2)));
  for (let G = 0; G <= y; G++) {
    const j = C[0] + (o[0] - C[0]) * G / y, N = C[1] + (o[1] - C[1]) * G / y, _ = ot(e, j, N);
    if (!e.free[Wt(e, _[0], _[1])]) return !1;
  }
  return !0;
}
function ca(e, p) {
  if (p.length <= 2) return p;
  const u = [p[0]];
  let C = 0;
  for (let o = 2; o < p.length; o++)
    ai(e, p[C], p[o]) || (u.push(p[o - 1]), C = o - 1);
  return u.push(p[p.length - 1]), u;
}
function da(e, p, u, C, o = 1 / 0) {
  const y = [];
  for (let j = 0; j < p.length; j++) p[j] >= C && p[j] <= o && y.push(j);
  if (!y.length) return null;
  const G = y[Math.floor(u() * y.length)];
  return [G % e.cols, G / e.cols | 0];
}
const Bn = {
  un: 1,
  una: 1,
  uno: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  due: 2,
  tre: 3,
  quattro: 4,
  cinque: 5,
  sei: 6,
  sette: 7,
  otto: 8,
  nove: 9,
  dieci: 10,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  siete: 7,
  ocho: 8,
  nueve: 9,
  diez: 10,
  deux: 2,
  trois: 3,
  quatre: 4,
  cinq: 5,
  sept: 7,
  huit: 8,
  neuf: 9,
  dix: 10,
  ein: 1,
  eine: 1,
  einen: 1,
  zwei: 2,
  drei: 3,
  vier: 4,
  funf: 5,
  sechs: 6,
  sieben: 7,
  acht: 8,
  neun: 9,
  zehn: 10,
  dois: 2,
  duas: 2,
  seis: 6,
  sete: 7,
  oito: 8,
  dez: 10
}, On = {
  domenica: 0,
  lunedi: 1,
  martedi: 2,
  mercoledi: 3,
  giovedi: 4,
  venerdi: 5,
  sabato: 6,
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  domingo: 0,
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
  sonntag: 0,
  montag: 1,
  dienstag: 2,
  mittwoch: 3,
  donnerstag: 4,
  freitag: 5,
  samstag: 6,
  sonnabend: 6,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5
}, Hn = {
  gennaio: 0,
  febbraio: 1,
  marzo: 2,
  aprile: 3,
  maggio: 4,
  giugno: 5,
  luglio: 6,
  agosto: 7,
  settembre: 8,
  ottobre: 9,
  novembre: 10,
  dicembre: 11,
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  december: 11,
  enero: 0,
  febrero: 1,
  mayo: 4,
  junio: 5,
  julio: 6,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
  janvier: 0,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  aout: 7,
  decembre: 11,
  januar: 0,
  februar: 1,
  marz: 2,
  juni: 5,
  juli: 6,
  oktober: 9,
  dezember: 11,
  janeiro: 0,
  fevereiro: 1,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  setembro: 8,
  outubro: 9,
  dezembro: 11
}, Ka = (e) => Object.keys(e).sort((p, u) => u.length - p.length).join("|"), ni = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`, pa = (e, p) => new Date(e.getFullYear(), e.getMonth(), e.getDate() + p), oi = (e) => e.normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "");
function Rn(e, p, u = /* @__PURE__ */ new Date()) {
  const C = e.trim();
  let o = oi(C).toLowerCase();
  o.length !== C.length && (o = C.toLowerCase());
  const y = new Date(u.getFullYear(), u.getMonth(), u.getDate()), G = [];
  let j;
  const N = (x, Z) => {
    !x || j || (j = Z, G.push([x.index, x.index + x[0].length]));
  };
  if (N(/\b(?:dopodomani|day after tomorrow|pasado manana|apres-demain|apres demain|ubermorgen|depois de amanha)\b/.exec(o), pa(y, 2)), N(/\b(?:domani|tomorrow|manana|demain|morgen|amanha)\b/.exec(o), pa(y, 1)), !j) {
    const x = new RegExp(`\\b(?:tra|fra|in|dentro de|dans|daqui a|em|en)\\s+(\\d+|${Ka(Bn)})\\s+(giorn[oi]|days?|dias?|jours?|tagen?|tage|settiman[ae]|weeks?|semanas?|semaines?|wochen?|mes(?:es|i|e)?|months?|mois|monat(?:e|en)?)\\b`).exec(o);
    if (x) {
      const Z = /^\d+$/.test(x[1]) ? Number(x[1]) : Bn[x[1]] ?? 0, ce = x[2];
      let K = y;
      /^(giorn|day|dia|jour|tag)/.test(ce) ? K = pa(y, Z) : /^(settiman|week|seman|woche)/.test(ce) ? K = pa(y, Z * 7) : K = new Date(y.getFullYear(), y.getMonth() + Z, y.getDate()), Z > 0 && N(x, K);
    }
  }
  if (N(/\b(?:next week|(?:la )?settimana prossima|(?:la )?prossima settimana|(?:la )?semana que viene|(?:la )?proxima semana|(?:la )?semaine prochaine|(?:die )?nachste woche|(?:na )?proxima semana)\b/.exec(o), pa(y, 7)), !j) {
    const x = new RegExp(`\\b(?:(?:next|prossimo|prossima|proximo|proxima|prochain|nachsten|kommenden)\\s+)?(${Ka(On)})(?:-feira)?\\b`).exec(o);
    x && N(x, pa(y, (On[x[1]] - y.getDay() + 7) % 7 || 7));
  }
  if (!j) {
    const x = new RegExp(`\\b(?:il|on the|on|the|el|le|am|dia|den)\\s+(\\d{1,2})(?:st|nd|rd|th|\\.)?(?:\\s+(?:of\\s+|de\\s+|di\\s+)?(${Ka(Hn)}))?\\b`).exec(o);
    if (x) {
      const Z = Number(x[1]);
      if (Z >= 1 && Z <= 31) {
        let ce = y.getFullYear(), K = x[2] ? Hn[x[2]] : y.getMonth(), me = new Date(ce, K, Z);
        me <= y && (me = x[2] ? new Date(ce + 1, K, Z) : new Date(ce, K + 1, Z)), N(x, me);
      }
    }
  }
  if (!j) {
    const x = /\b(\d{1,2})[/\-.](\d{1,2})(?:[/\-.](\d{2,4}))?\b/.exec(o);
    if (x) {
      const Z = Number(x[1]), ce = Number(x[2]), [K, me] = p.startsWith("en") ? [ce, Z] : [Z, ce];
      if (K >= 1 && K <= 31 && me >= 1 && me <= 12) {
        let de = x[3] ? x[3].length === 2 ? 2e3 + Number(x[3]) : Number(x[3]) : y.getFullYear(), rt = new Date(de, me - 1, K);
        !x[3] && rt <= y && (rt = new Date(de + 1, me - 1, K)), N(x, rt);
      }
    }
  }
  N(/\b(?:oggi|stasera|stanotte|today|tonight|hoy|esta noche|aujourd'?hui|ce soir|heute|hoje|esta noite)\b/.exec(o), y);
  let _ = C;
  if (o.length === C.length) {
    const x = G.slice().sort((Z, ce) => ce[0] - Z[0]);
    for (const [Z, ce] of x) _ = _.slice(0, Z) + " " + _.slice(ce);
  }
  return _ = _.replace(/^\s*(?:ricordami|ricordarmi|ricorda(?:mi)?|remind me|recuerdame|recuérdame|recordame|rappelle[- ]moi|rappelez[- ]moi|erinnere mich|erinner mich|lembre[- ]me|me lembre)\b\s*/i, "").replace(/^\s*(?:che|di|to|that|of|about|que|de|d'|an|daran|dass|,)\s+/i, "").replace(/\s{2,}/g, " ").replace(/^[\s,;:–-]+|[\s,;:–-]+$/g, ""), _ = _.replace(/^(?:che|di|to|that|que|de|dass)\s+/i, "").trim(), { due: j ? ni(j) : void 0, text: _ || C };
}
const ri = /\b(?:boh|non importa|quando vuoi|come vuoi|whenever|any ?time|no idea|doesn'?t matter|da igual|cuando quieras|peu importe|n'importe quand|egal|wann du willst|tanto faz|quando quiser)\b/i, jn = 28, ii = 28, _n = 58;
function si({ roam: e = !1, gutter: p = !1 }) {
  var vn, yn, kn;
  const { cfg: u, addReminder: C, removeReminder: o } = La(), { t: y, lang: G, code: j } = ta(), { openChat: N } = an(), _ = ma(), [x, Z] = D(!1), [ce, K] = D(!1), [me, de] = D([]), rt = I(null), [we, mt] = D(null), [pe, ht] = D(!1), [be, it] = D(!1), [Ye, tt] = D(!1), [Me, gt] = D(""), [bt, ft] = D(null), [Mt, Ft] = D(null), oe = I(null), Ie = I(null), Re = I(null), Ee = I([]), O = I(null), je = I({ x: 0, y: 0 }), he = I(1), W = I(null), It = I([]), i = I(0), B = I(0), [U, V] = D(null), xe = I(""), Ce = I(!1), De = I(null), Et = I(!1), [Ht, $t] = D(!1), aa = I(0), Fe = I({ cfg: u, t: y, open: be });
  Fe.current = { cfg: u, t: y, open: be };
  const Ke = (u.reminders ?? []).filter((n) => n.status === "pending"), _e = za(), xt = (u.reminders ?? []).filter((n) => n.status === "delivered" && n.deliveredAt === _e).length, Ct = ((yn = (vn = u.brief) == null ? void 0 : vn.generatedAt) == null ? void 0 : yn.slice(0, 10)) === _e ? ((kn = u.brief.reminders) == null ? void 0 : kn.length) ?? 0 : 0, st = Math.max(xt, Ct), se = I(0);
  se.current = st;
  const Qe = I(e || p);
  Qe.current = e || p;
  const Ut = I(p);
  Ut.current = p;
  const [Lt, Vt] = D(!1), [Pt, Y] = D(null), [c, w] = D(0);
  ee(() => {
    let n = 0;
    try {
      const a = JSON.parse(localStorage.getItem("alba.chicks") || "null");
      a && a.d === _e && (n = a.n);
    } catch {
    }
    if (st > n) {
      try {
        localStorage.setItem("alba.chicks", JSON.stringify({ d: _e, n: st }));
      } catch {
      }
      Vt(!0);
      const a = setTimeout(() => {
        Vt(!1), w(st);
      }, 2600);
      return () => clearTimeout(a);
    }
    w(st);
  }, [st, _e]);
  const H = (n) => (/* @__PURE__ */ new Date(n + "T12:00:00")).toLocaleDateString(G, { weekday: "long", day: "numeric", month: "long" });
  ee(() => {
    if (!be) {
      ft(null);
      return;
    }
    const n = (s) => {
      oe.current && !oe.current.contains(s.target) && it(!1);
    }, a = (s) => {
      s.key === "Escape" && it(!1);
    };
    return document.addEventListener("mousedown", n), window.addEventListener("keydown", a), () => {
      document.removeEventListener("mousedown", n), window.removeEventListener("keydown", a);
    };
  }, [be]);
  const ae = I({}), $e = I(0);
  ee(() => {
    let n = !0;
    const a = () => {
      _.get("/apps/alba/api/task-state").then((g) => {
        n && g && typeof g == "object" && (ae.current = g);
      }).catch(() => {
      });
    };
    a();
    const s = setInterval(a, 45e3);
    return () => {
      n = !1, clearInterval(s);
    };
  }, []), ee(() => {
    const n = window.__albaTeaserMs;
    let a, s;
    const g = () => {
      var te;
      const { cfg: f, t: v } = Fe.current, A = za(), E = (X) => {
        var At;
        const ct = (At = ae.current[X]) == null ? void 0 : At.status;
        return ct === "done" || ct === "dismissed";
      }, P = (f.tasks ?? []).filter((X) => X.status === "open" && !E(X.id) && (Date.parse(A) - Date.parse(X.firstSeen)) / 864e5 >= 3).length, L = (f.reminders ?? []).filter((X) => X.status === "pending").length, T = [...v.teasers], R = P > 0 && Date.now() - $e.current > 2 * 36e5;
      R && T.push(v.teaseLate(P)), L > 0 && T.push(v.teasePending(L)), (((te = f.brief) == null ? void 0 : te.reminders) ?? []).length > 0 && T.push(v.teaseFresh);
      const ue = T.filter((X) => X !== xe.current), fe = ue[Math.floor(Math.random() * ue.length)] ?? T[0];
      return R && fe === v.teaseLate(P) && ($e.current = Date.now()), fe;
    }, b = (f) => {
      a = setTimeout(() => {
        const v = document.activeElement, A = Ce.current || v && (/INPUT|TEXTAREA|SELECT/.test(v.tagName) || v.isContentEditable) || !!document.querySelector(".bubble, .ppop, .dockpop");
        if (!Fe.current.open && !A && aa.current < 6) {
          const E = g();
          xe.current = E, aa.current += 1, V(E), s = setTimeout(() => V(null), n || 7500);
        }
        b(n ? n * 2 : 7e4 + Math.random() * 5e4);
      }, f);
    };
    return b(n || 25e3), () => {
      clearTimeout(a), clearTimeout(s);
    };
  }, []), ee(() => {
    be && V(null);
  }, [be]), ee(() => {
    const n = () => {
      Ce.current = !0;
    }, a = () => {
      Ce.current = !1;
    }, s = (g) => {
      var v;
      const b = (v = oe.current) == null ? void 0 : v.querySelector(".teaser");
      if (!b) return;
      const f = b.getBoundingClientRect();
      g.clientX >= f.left - 10 && g.clientX <= f.right + 10 && g.clientY >= f.top - 10 && g.clientY <= f.bottom + 10 && V(null);
    };
    return window.addEventListener("mousedown", n), window.addEventListener("mouseup", a), window.addEventListener("mousemove", s), () => {
      window.removeEventListener("mousedown", n), window.removeEventListener("mouseup", a), window.removeEventListener("mousemove", s);
    };
  }, []);
  const Le = () => {
    var a;
    const n = (a = oe.current) == null ? void 0 : a.closest(".mb");
    return !n || !n.isConnected || n.clientWidth < 250 || n.clientHeight < 250 ? null : n;
  }, lt = () => {
    const n = Le();
    return { x: jn + _n / 2, y: (n ? n.clientHeight : 700) - ii - _n / 2 };
  }, Yt = () => ({ x: jn, y: (Le() ? Le().clientHeight : 700) - 31 - 8.5 }), Kt = I({}), wa = () => {
    if (!Kt.current.hen && Re.current) {
      const n = (a) => Re.current.querySelector(a);
      Kt.current = { hen: n(".hen"), lf: n(".legfront"), lb: n(".legback"), head: n(".henhead") };
    }
    return Kt.current;
  }, qt = I(0), Ze = I({ moving: !0, until: 0 }), Ae = I(!1), Qt = I(null), Dt = I(null), Pe = I(null);
  I(null);
  const vt = I(null), Je = I(null), Be = () => document.querySelector(".mb .scroll"), ha = (n) => {
    var a;
    return n.y - ((((a = Be()) == null ? void 0 : a.scrollTop) ?? 0) - n.sc0);
  }, [Pa, Zt] = D(!1), ke = I(null), St = I(null), Ne = I(null), yt = I(1), Rt = I(0), Bt = I(null), zt = I(null), jt = I(null), Ge = I(null), [ga, na] = D(null), at = I(0), ba = I(0), [qa, l] = D(!1), [k, m] = D(null), M = I(0), S = I(0), d = I(0), F = I(null), re = I(0), ne = I(0), ve = (n) => {
    n !== he.current && (he.current = n, Re.current && (Re.current.style.scale = n < 0 ? "-1 1" : "1 1"));
  }, Se = () => {
    const n = Qt.current, a = Le();
    if (!n || !a) return;
    const s = O.current ?? lt(), g = a.clientWidth, b = n.offsetWidth, f = n.offsetHeight, v = Math.max(8, Math.min(g - b - 8, s.x + 34));
    let A = s.y - 36 - f;
    A < 8 && (A = s.y + 36), n.style.translate = `${v.toFixed(1)}px ${A.toFixed(1)}px`;
  }, _t = () => {
    const n = Dt.current, a = Le();
    if (!n || !a) return;
    const s = a.clientWidth, g = a.clientHeight, b = O.current ?? lt(), f = n.offsetWidth, v = n.offsetHeight, A = Math.max(12, Math.min(s - f - 12, b.x - 36));
    let E = b.y - 29 - 14 - v, P = !1;
    E < 8 && (P = !0, E = b.y + 29 + 14, E + v > g - 8 && (E = Math.max(8, g - v - 8))), n.style.translate = `${A.toFixed(1)}px ${E.toFixed(1)}px`, n.style.setProperty("--tail", `${Math.max(16, Math.min(f - 30, b.x - A - 7))}px`), n.classList.toggle("below", P);
  }, Oe = () => {
    const n = St.current, a = Le(), s = Ne.current;
    if (!n || !a || !s) return;
    const g = a.clientWidth, b = n.offsetWidth, f = n.offsetHeight, v = Math.max(8, Math.min(g - b - 8, s.x + 22));
    let A = s.y - 20 - f;
    const E = O.current;
    E && Math.abs(E.x - s.x) < 90 && Math.abs(E.y - s.y) < 60 && (A = Math.min(A, E.y - 42 - f)), A < 8 && (A = s.y + 16), n.style.translate = `${v.toFixed(1)}px ${A.toFixed(1)}px`;
  }, h = (n) => {
    var At;
    if (!Ie.current || !Ie.current.isConnected) {
      i.current = 0;
      return;
    }
    const a = Math.min(0.05, (n - B.current) / 1e3 || 0.016);
    B.current = n;
    const s = lt();
    O.current || (O.current = { ...s });
    const g = O.current, b = je.current, f = W.current;
    if (f) {
      const $ = f.path[f.i], ye = $[0] - g.x, ze = $[1] - g.y, ge = Math.hypot(ye, ze), nt = f.i === f.path.length - 1;
      if (ge < (nt ? 2.5 : 16))
        f.i += 1, f.i >= f.path.length && (W.current = null, Ae.current ? (Ae.current = !1, Y("land"), setTimeout(() => Y((le) => le === "land" ? null : le), 520)) : Y((le) => le === "walk" || le === "peck1" || le === "look1" ? null : le));
      else {
        let le = nt ? f.speed * Math.min(1, ge / 60 + 0.12) : f.speed;
        !Ae.current && le < 88 && (le *= 0.78 + 0.44 * Math.abs(Math.sin(qt.current)));
        const dt = f.path[f.path.length - 1];
        if (!Ae.current && f.speed < 88 && Math.hypot(dt[0] - g.x, dt[1] - g.y) > 55) {
          const We = Ze.current;
          if (n > We.until)
            if (We.moving = !We.moving, We.until = n + (We.moving ? 700 + Math.random() * 900 : 320 + Math.random() * 520), We.moving) Y("walk");
            else {
              const wt = Math.random();
              Y(wt < 0.7 ? "peck1" : "look1");
            }
          We.moving || (le = 0);
        }
        const kt = 1 - Math.exp(-a * (Ae.current ? 2.8 : 3.4));
        b.x += (ye / ge * le - b.x) * kt, b.y += (ze / ge * le - b.y) * kt;
      }
    } else {
      const $ = 1 - Math.exp(-a * 5);
      if (b.x -= b.x * $, b.y -= b.y * $, !Qe.current && !Ae.current) {
        const ye = s.x - g.x, ze = s.y - g.y;
        if (Math.hypot(ye, ze) < 14) {
          const ge = 1 - Math.exp(-a * 6);
          g.x += ye * ge, g.y += ze * ge;
        }
      }
    }
    g.x += b.x * a, g.y += b.y * a;
    const v = Math.hypot(b.x, b.y);
    Math.abs(b.x) > 7 && ve(b.x >= 0 ? 1 : -1), Ie.current && (Ie.current.style.translate = `${(g.x - s.x).toFixed(2)}px ${(g.y - s.y).toFixed(2)}px`);
    const A = wa(), E = v > 88;
    if (!Ae.current && A.hen) {
      const $ = Math.min(1, v / 20);
      qt.current += v * a / (E ? 20 : 10.5) * Math.PI;
      const ye = qt.current, ze = (ge, nt, le) => {
        ge && (ge.style[nt] = le);
      };
      if ($ > 0.02 || z.current) {
        const ge = (ye / Math.PI % 1 + 1) % 1, nt = (wt) => 1 - (1 - wt) ** 3, le = (ge < 0.3 ? -3.4 + 7.6 * nt(ge / 0.3) : 4.2 - 7.6 * ((ge - 0.3) / 0.7)) * $, dt = (ge < 0.3 ? 1.8 * Math.sin(Math.PI * ge / 0.3) : 0) * $, kt = E ? 6.5 : 2.4;
        ze(A.hen, "translate", `0 ${(-Math.abs(Math.sin(ye)) * kt * $).toFixed(2)}px`), ze(A.hen, "rotate", `${((E ? 5 : 2.2) * $).toFixed(2)}deg`);
        const We = (E ? 48 : 40) * $;
        ze(A.lf, "rotate", `${(Math.sin(ye) * We).toFixed(1)}deg`), ze(A.lb, "rotate", `${(-Math.sin(ye) * We).toFixed(1)}deg`), A.lf && (A.lf.style.translate = `0 ${(-Math.max(0, Math.cos(ye)) * 2.2 * $).toFixed(2)}px`), A.lb && (A.lb.style.translate = `0 ${(-Math.max(0, -Math.cos(ye)) * 2.2 * $).toFixed(2)}px`), ze(A.head, "translate", `${le.toFixed(2)}px ${dt.toFixed(2)}px`), z.current = $ > 0.02;
      }
    }
    E && !Ae.current ? J.current || (J.current = !0, Y("run")) : J.current && v < 66 && (J.current = !1, Y(($) => $ === "run" ? "walk" : $));
    const P = It.current, L = Math.min(Q.current, 6), T = v > 8 ? b.x / v : he.current, R = v > 8 ? b.y / v : 0, ue = Math.min(1, v / 30);
    let fe = !0;
    for (let $ = 0; $ < L; $++) {
      if (!P[$]) {
        const Nt = Yt();
        P[$] = { x: Nt.x, y: Nt.y };
      }
      const ye = $ === 0 ? g : P[$ - 1], ze = g.x + 46 + $ * 18, ge = g.y + 21, nt = $ === 0 ? g.x - T * 34 : ye.x - T * 19, le = $ === 0 ? g.y - R * 34 + 21 : ye.y - R * 19, dt = ze + (nt - ze) * ue, kt = ge + (le - ge) * ue, We = 1 - Math.exp(-a * (4.6 - $ * 0.3));
      P[$].x += (dt - P[$].x) * We, P[$].y += (kt - P[$].y) * We, (Math.abs(dt - P[$].x) > 0.4 || Math.abs(kt - P[$].y) > 0.4) && (fe = !1);
      const wt = Ee.current[$];
      wt && (wt.style.translate = `${(P[$].x - 8).toFixed(2)}px ${(P[$].y - 8).toFixed(2)}px`), wt && (wt.style.scale = (v > 8 ? T : he.current) < 0 ? "-1 1" : "1 1");
    }
    Qt.current && Se();
    let te = !1;
    const X = Je.current;
    if (X) {
      const $ = ha(X);
      if (X.carry) {
        const ze = 1 - (1 - Math.min(1, (performance.now() - X.carry) / 380)) ** 3, ge = g.x + he.current * 22, nt = g.y - 6, le = X.x + (ge - X.x) * ze, dt = (X.cy0 ?? $ - 37) + (nt - 4 - (X.cy0 ?? $ - 32)) * ze;
        Pe.current && (Pe.current.style.translate = `${(le - 20).toFixed(2)}px ${dt.toFixed(2)}px`);
      } else {
        const ye = `${(X.x - 20).toFixed(2)}px ${($ - 50).toFixed(2)}px`;
        Pe.current && (Pe.current.style.translate = ye), fa.current && (fa.current.style.translate = ye);
      }
      te = !0;
    }
    vt.current && (vt.current.style.translate = `${(g.x - 20 + he.current * 10).toFixed(2)}px ${(g.y - 56).toFixed(2)}px`);
    const ct = !Qe.current && !Ae.current && !W.current ? Math.hypot(s.x - g.x, s.y - g.y) : 0;
    W.current || v > 0.6 || !fe || te || ct > 0.3 || (At = De.current) != null && At.moved ? i.current = requestAnimationFrame(h) : i.current = 0;
  }, z = I(!1), J = I(!1), q = () => {
    i.current || (B.current = performance.now(), i.current = requestAnimationFrame(h));
  }, Q = I(0);
  Q.current = c, ee(() => {
    q();
  }, [c]), ee(() => () => {
    i.current && cancelAnimationFrame(i.current), i.current = 0;
  }, []), ee(() => () => {
    M.current && cancelAnimationFrame(M.current), M.current = 0, at.current && cancelAnimationFrame(at.current), at.current = 0;
  }, []), $a(() => {
    U && (Se(), q());
  }, [U]), $a(() => {
    k && Oe();
  }, [k]), ee(() => {
    const n = Be();
    if (!n) return;
    const a = () => {
      Bt.current && (Bt.current.style.translate = `0 ${(-n.scrollTop).toFixed(1)}px`);
    };
    return n.addEventListener("scroll", a, { passive: !0 }), () => n.removeEventListener("scroll", a);
  }, [e, p]), ee(() => {
    if (!e && !p) {
      Ne.current = null, l(!1);
      return;
    }
    let n;
    const a = () => {
      n = setTimeout(() => {
        if (!oe.current || !oe.current.isConnected) return;
        const s = document.activeElement;
        !(Ce.current || Fe.current.open || s && (/INPUT|TEXTAREA|SELECT/.test(s.tagName) || s.isContentEditable) || !!document.querySelector(".ppop, .dockpop")) && !Ne.current && co(), a();
      }, window.__albaScene === "snail" ? 1200 : 45e3 + Math.random() * 6e4);
    };
    return a(), () => clearTimeout(n);
  }, [e, p]), $a(() => {
    if (!be) return;
    _t();
    const n = Dt.current;
    if (!n || typeof ResizeObserver > "u") return;
    const a = new ResizeObserver(() => _t());
    return a.observe(n), () => a.disconnect();
  }, [be, pe, we]);
  const ie = () => {
    const n = Le();
    if (!n) return null;
    const a = n.clientWidth, s = n.clientHeight, g = n.getBoundingClientRect(), b = (T) => {
      const R = T.getBoundingClientRect();
      return { l: R.left - g.left, t: R.top - g.top, r: R.right - g.left, b: R.bottom - g.top };
    }, f = (T) => T.r > 0 && T.b > 0 && T.l < a && T.t < s, v = ".topbar, .dock, .foot, .bubble, .teaser, .egg, .hatch";
    let A, E = [];
    if (Ut.current) {
      A = Array.from(n.querySelectorAll(".scroll .paper .stage, .scroll .paper .cap, .scroll .paper .lead, .scroll .paper .cols, .scroll .vside, " + v)).map(b).filter(f);
      const T = Array.from(n.querySelectorAll(".scroll .paper .stage, .scroll .paper .lead, .scroll .paper .cols")).map(b).filter(f), R = T.length ? Math.min(...T.map((ue) => ue.l)) - 10 : 0;
      if (R < 74) return null;
      A.push({ l: R, t: -10, r: a + 10, b: s + 10 });
    } else
      A = Array.from(n.querySelectorAll(".scroll .card, .scroll .pcard, .scroll h1, .scroll .sub, .scroll .phint, .scroll .ppop, " + v)).map(b).filter(f), E = Array.from(n.querySelectorAll(".scroll .card, .scroll .pcard, .dock")).map(b).filter((T) => f(T) && T.r - T.l > 90);
    const P = 190;
    return A.push({ l: -20, t: -20, r: a + 20, b: P }, { l: -20, t: -20, r: P, b: s + 20 }), { g: ei(a, s, A, 12, 46, 12), hiding: E, W: a, H: s };
  }, Te = () => {
    const n = ie();
    if (!n || !O.current) return;
    const { g: a } = n, s = sa(a, ot(a, O.current.x, O.current.y));
    if (!s) return;
    const { dist: g, prev: b } = ea(a, s), f = da(a, g, Math.random, 10);
    if (!f) return;
    const v = ca(a, la(a, b, f)).map((A) => pt(a, A));
    Ze.current = { moving: !0, until: performance.now() + 900 }, W.current = { path: v, i: 0, speed: Math.random() < 0.3 ? 128 : 50 }, Y("walk"), q();
  }, Ue = 15, Jt = (n, a) => {
    var f, v;
    const s = Bt.current;
    if (!s) return;
    const g = document.createElement("i");
    g.className = "slime";
    const b = ((f = Be()) == null ? void 0 : f.scrollTop) ?? 0;
    g.style.translate = `${n.toFixed(1)}px ${(a + b).toFixed(1)}px`, s.style.translate = `0 ${(-b).toFixed(1)}px`, g.addEventListener("animationend", () => g.remove()), s.appendChild(g), s.childElementCount > 70 && ((v = s.firstElementChild) == null || v.remove());
  }, Ca = () => {
    Ne.current = null, m(null), l(!1);
  }, rn = (n) => {
    var f;
    if (!oe.current || !oe.current.isConnected) {
      M.current = 0;
      return;
    }
    const a = Ne.current;
    if (!a) {
      M.current = 0;
      return;
    }
    const s = Math.min(0.05, (n - S.current) / 1e3 || 0.016);
    S.current = n;
    const g = ((f = Be()) == null ? void 0 : f.scrollTop) ?? 0;
    if (g !== a.sc) {
      const v = g - a.sc;
      a.sc = g, a.y -= v;
      for (const A of a.path) A[1] -= v;
      Bt.current && (Bt.current.style.translate = `0 ${(-g).toFixed(1)}px`), St.current && Oe();
    }
    let b = 0;
    if (a.phase === "crawl" || a.phase === "leave")
      if (a.i >= a.path.length)
        if (a.phase === "crawl") lo();
        else {
          Ca(), M.current = 0;
          return;
        }
      else {
        a.wave += s * (Math.PI * 2 / 1.45), b = Math.max(0, Math.sin(a.wave));
        const v = a.path[a.i], A = v[0] - a.x, E = v[1] - a.y, P = Math.hypot(A, E);
        if (P < 2) a.i += 1;
        else {
          Math.abs(A) > 1 && (yt.current = A >= 0 ? 1 : -1);
          const L = Math.max(-28, Math.min(28, Math.atan2(E, Math.abs(A) + 1e-3) * 180 / Math.PI));
          Rt.current += (L - Rt.current) * Math.min(1, s * 2);
          const T = Ue * (0.1 + 0.9 * b);
          a.x += A / P * T * s, a.y += E / P * T * s, a.trail += T * s, a.trail >= 8 && (a.trail = 0, Jt(a.x - yt.current * 12 - 4, a.y + 8));
        }
        if (a.phase === "leave" && ke.current) {
          const L = a.path[a.path.length - 1];
          Math.hypot(L[0] - a.x, L[1] - a.y) < 22 && (ke.current.dataset.state = "bye");
        }
      }
    a.phase !== "crawl" && a.phase !== "leave" && (Rt.current += (0 - Rt.current) * Math.min(1, s * 3)), ke.current && (ke.current.style.translate = `${(a.x - 17).toFixed(2)}px ${(a.y - 11).toFixed(2)}px`, ke.current.style.scale = yt.current < 0 ? "-1 1" : "1 1", ke.current.style.rotate = `${(Rt.current * yt.current).toFixed(1)}deg`, ke.current.style.setProperty("--st", b.toFixed(3))), M.current = requestAnimationFrame(rn);
  }, ro = () => {
    M.current || (S.current = performance.now(), M.current = requestAnimationFrame(rn));
  }, sn = (n, a, s, g = () => !0) => {
    let b = -1, f = -1;
    for (let E = 0; E < n.free.length; E++) n.free[E] && g(E) && (b = Math.max(b, E % n.cols), f = Math.max(f, E / n.cols | 0));
    const v = [], A = (E) => {
      for (let P = 0; P < n.free.length; P++) {
        if (!n.free[P] || !g(P)) continue;
        const L = P % n.cols, T = P / n.cols | 0, R = L * n.cell + n.cell / 2, ue = T * n.cell + n.cell / 2;
        E === "r" && L >= b - 1 && a - R < 70 && v.push({ c: [L, T], out: [a + 26, ue] }), E === "b" && T >= f - 1 && s - ue < 70 && v.push({ c: [L, T], out: [R, s + 26] });
      }
    };
    return A("r"), v.length || A("b"), v;
  }, io = () => {
    const n = ie(), a = Ne.current;
    if (!n || !a) return null;
    const { g: s, W: g, H: b } = n, f = sa(s, ot(s, a.x, a.y));
    if (!f) return null;
    const { dist: v, prev: A } = ea(s, f), E = sn(s, g, b, (T) => v[T] >= 0);
    if (!E.length) return null;
    const P = E.reduce((T, R) => v[R.c[1] * s.cols + R.c[0]] < v[T.c[1] * s.cols + T.c[0]] ? R : T), L = ca(s, la(s, A, P.c)).map((T) => pt(s, T));
    return L.push(P.out), L;
  }, so = () => {
    const n = Ne.current;
    if (!n) return;
    ke.current && (ke.current.dataset.state = "crawl");
    const a = io();
    if (!a) {
      ke.current && (ke.current.dataset.state = "bye"), setTimeout(Ca, 700);
      return;
    }
    n.path = a, n.i = 0, n.phase = "leave";
  }, Da = (n, a) => {
    const s = Ne.current;
    if (!s || d.current !== n) return;
    s.phase = "talk", ke.current && (ke.current.dataset.state = "talk");
    const g = Fe.current.t.snailLines, b = Math.floor(Math.random() * g.length);
    m(g[b] ?? null), setTimeout(() => {
      if (d.current === n) {
        if (m(null), !Fe.current.open) {
          const f = Fe.current.t.snailReplies;
          V(f[b] ?? f[0] ?? null), setTimeout(() => {
            d.current === n && V(null);
          }, 2700);
        }
        setTimeout(() => {
          var f;
          a !== null && ((f = F.current) == null ? void 0 : f.token) === a && (F.current = null, Y(null)), d.current === n && so();
        }, 3e3);
      }
    }, 2700);
  }, ln = () => {
    const n = Ne.current;
    if (!n || !O.current || F.current || Fe.current.open || De.current || Ae.current || Oa.current || !Qe.current) return null;
    const a = ie();
    if (!a) return null;
    const { g: s } = a, g = sa(s, ot(s, O.current.x, O.current.y));
    if (!g) return null;
    const { dist: b, prev: f } = ea(s, g), v = [];
    for (const [A, E] of [[40, -13], [52, -13], [40, -26], [58, -30], [44, 4]]) for (const P of [yt.current, -yt.current]) v.push([P, A, E]);
    for (const [A, E, P] of v) {
      const L = n.x + A * E, T = n.y + P, R = ot(s, L, T);
      if (!s.free[R[1] * s.cols + R[0]] || b[R[1] * s.cols + R[0]] < 0) continue;
      const ue = ca(s, la(s, f, R)).map((te) => pt(s, te));
      ue[Math.max(0, ue.length - 1)] = [L, T];
      const fe = ++re.current;
      return F.current = { token: fe }, Ze.current = { moving: !0, until: performance.now() + 1500 }, W.current = { path: ue, i: 0, speed: 62 }, Y("walk"), q(), { ox: A * E, oy: P, side: A, token: fe };
    }
    return null;
  }, lo = () => {
    const n = Ne.current;
    if (!n) return;
    n.phase = "meet", ke.current && (ke.current.dataset.state = "look");
    const a = ++d.current;
    let s = ln();
    const g = performance.now(), b = setInterval(() => {
      var T;
      if (d.current !== a || !Ne.current) {
        clearInterval(b);
        return;
      }
      if (!s && (s = ln(), !s)) {
        performance.now() - g > 2e4 && (clearInterval(b), Da(a, null));
        return;
      }
      const f = ((T = F.current) == null ? void 0 : T.token) === s.token, v = O.current, A = Ne.current, E = A.x + s.ox, P = A.y + s.oy, L = !!v && !W.current && Math.hypot(v.x - E, v.y - P) < 9;
      if (f && v && !W.current && !L && (W.current = { path: [[E, P]], i: 0, speed: 70 }, Y("walk"), q()), !(f && !L && performance.now() - g < 34e3)) {
        if (clearInterval(b), !f) {
          Da(a, null);
          return;
        }
        Y(null), ve(-s.side), yt.current = s.side, ke.current && (ke.current.dataset.state = "shy"), setTimeout(() => Da(a, s.token), 850);
      }
    }, 150);
  }, co = () => {
    var fe;
    const n = ie();
    if (!n) return !1;
    const { g: a, W: s, H: g } = n, b = sn(a, s, g), f = b.length ? b[Math.floor(Math.random() * b.length)] : null;
    let v = f ? f.c : null;
    for (let te = 0; te < 20 && !v; te++) {
      const X = [Math.floor(Math.random() * a.cols), Math.floor(Math.random() * a.rows)];
      a.free[X[1] * a.cols + X[0]] && (v = X);
    }
    if (!v) return !1;
    const { dist: A, prev: E } = ea(a, v);
    let P = null, L = 1 / 0;
    for (let te = 0; te < 10; te++) {
      const X = da(a, A, Math.random, 7, 20) ?? da(a, A, Math.random, 3, 40);
      if (!X) continue;
      const [ct, At] = pt(a, X), $ = [-1, 1].some((ze) => {
        const ge = ot(a, ct + ze * 40, At - 13);
        return a.free[ge[1] * a.cols + ge[0]] === 1;
      }), ye = Math.abs(X[1] - v[1]) + ($ ? 0 : 100);
      (!P || ye < L) && (P = X, L = ye);
    }
    const T = pt(a, v), R = f ? f.out : T, ue = [T, ...P ? ca(a, la(a, E, P)).map((te) => pt(a, te)) : []];
    return d.current += 1, Ne.current = { x: R[0], y: R[1], path: ue, i: 0, phase: "crawl", wave: 0, trail: 0, sc: ((fe = Be()) == null ? void 0 : fe.scrollTop) ?? 0 }, yt.current = ue[0][0] >= R[0] ? 1 : -1, m(null), l(!0), ke.current && (ke.current.dataset.state = "crawl"), ro(), !0;
  }, Ba = () => {
    var b;
    const n = Ge.current, a = Le();
    if (!n || n.phase === "out") return;
    n.phase = "out", n.landed = !1, zt.current && (zt.current.dataset.state = "fly");
    const s = (a == null ? void 0 : a.clientWidth) ?? 800;
    n.tx = n.x < s / 2 ? -60 : s + 60, n.ty = Math.max(30, n.y - 90);
    const g = n.token;
    ((b = F.current) == null ? void 0 : b.token) === g && (Y("look"), setTimeout(() => {
      var f;
      ((f = F.current) == null ? void 0 : f.token) === g && (Y(null), F.current = null);
    }, 1500));
  }, po = () => {
    const n = Ge.current, a = ie();
    if (!n || !a || !O.current) return !1;
    const { g: s } = a, g = sa(s, ot(s, O.current.x, O.current.y));
    if (!g) return !1;
    const { dist: b, prev: f } = ea(s, g), v = da(s, b, Math.random, 6, 13) ?? da(s, b, Math.random, 2, 18);
    if (!v) return !1;
    const [A, E] = pt(s, v);
    n.tx = A, n.ty = E - 48;
    const P = ca(s, la(s, f, v)).map((T) => pt(s, T)), L = n.token;
    return setTimeout(() => {
      var T, R;
      ((T = Ge.current) == null ? void 0 : T.token) !== L || Ge.current.phase !== "tease" || ((R = F.current) == null ? void 0 : R.token) !== L || !P.length || (W.current = { path: P, i: 0, speed: 112 }, Y("walk"), q());
    }, 380), !0;
  }, cn = (n) => {
    var L, T;
    if (!oe.current || !oe.current.isConnected) {
      at.current = 0;
      return;
    }
    const a = Ge.current, s = Le();
    if (!a || !s || !O.current) {
      at.current = 0, Ge.current = null, na(null);
      return;
    }
    const g = Math.min(0.05, (n - ba.current) / 1e3 || 0.016);
    ba.current = n, a.t += g;
    const b = ((L = Be()) == null ? void 0 : L.scrollTop) ?? 0;
    if (b !== a.sc) {
      const R = b - a.sc;
      a.sc = b, a.y -= R, a.ty -= R;
    }
    const f = O.current, v = s.clientWidth;
    if (a.phase !== "out" && ((T = F.current) == null ? void 0 : T.token) !== a.token && Ba(), a.phase === "in")
      a.tx = f.x + he.current * 30, a.ty = f.y - 50, Math.hypot(a.tx - a.x, a.ty - a.y) < 24 && (a.phase = "tease", a.t0 = a.t, a.next = a.t + 1.1, Y("look"));
    else if (a.phase === "tease") {
      const ue = Math.hypot(f.x - a.tx, f.y - (a.ty + 48)) < 26;
      (ue || a.t >= a.next) && (ue && (a.dodges += 1), a.dodges >= 3 || a.t - a.t0 > 15 ? (a.phase = "perch", a.next = a.t + 4.2, W.current = null, Y(null)) : po() ? a.next = a.t + 3.4 : Ba());
    } else if (a.phase === "perch")
      a.tx = f.x - he.current * 9, a.ty = f.y - 15, !a.landed && Math.hypot(a.tx - a.x, a.ty - a.y) < 4 && (a.landed = !0, zt.current && (zt.current.dataset.state = "perch"), jt.current && (jt.current.style.translate = `${(f.x - 20).toFixed(1)}px ${(f.y - 62).toFixed(1)}px`, jt.current.dataset.state = "on")), a.t >= a.next && Ba();
    else if (a.x < -40 || a.x > v + 40) {
      Ge.current = null, at.current = 0, na(null);
      return;
    }
    if (a.landed)
      a.x = a.tx, a.y = a.ty, a.vx = 0, a.vy = 0;
    else {
      const R = a.tx - a.x, ue = a.ty - a.y, fe = Math.hypot(R, ue), te = a.phase === "out" ? 130 : a.phase === "perch" ? 60 : 100, X = Math.min(te, fe * 3), ct = 1 - Math.exp(-g * 3.6);
      a.vx += ((fe > 0.5 ? R / fe * X : 0) - a.vx) * ct, a.vy += ((fe > 0.5 ? ue / fe * X : 0) - a.vy) * ct, a.x += a.vx * g, a.y += a.vy * g;
    }
    const A = a.landed ? 0 : 1, E = Math.sin(a.t * 4.7) * 5 * A, P = (Math.sin(a.t * 9.3) * 4 + Math.sin(a.t * 2.3) * 5) * A;
    zt.current && (zt.current.style.translate = `${(a.x + E - 12).toFixed(2)}px ${(a.y + P - 12).toFixed(2)}px`, zt.current.style.rotate = `${Math.max(-20, Math.min(20, a.vx * 0.14)).toFixed(1)}deg`), at.current = requestAnimationFrame(cn);
  }, uo = () => {
    var v;
    const n = Le();
    if (!n || !O.current || F.current || Ge.current) return !1;
    const a = n.clientWidth, s = n.clientHeight, g = ++re.current;
    F.current = { token: g };
    const b = O.current, f = b.x < a - 260;
    return Ge.current = { x: f ? Math.min(a + 30, b.x + 420 + Math.random() * 160) : b.x - 380, y: Math.max(40, Math.min(s - 80, b.y - 150 - Math.random() * 130)), vx: f ? -70 : 70, vy: 20, tx: b.x, ty: b.y - 50, phase: "in", t: 0, t0: 0, next: 0, dodges: 0, landed: !1, token: g, sc: ((v = Be()) == null ? void 0 : v.scrollTop) ?? 0 }, na(Math.random() < 0.7 ? "butterfly" : "bee"), at.current || (ba.current = performance.now(), at.current = requestAnimationFrame(cn)), !0;
  }, oa = () => {
    F.current = null, Je.current = null, Zt(!1);
  }, fa = I(null), dn = () => {
    Pe.current && (Pe.current.dataset.state = "down"), setTimeout(() => {
      Je.current = null, Zt(!1);
    }, 480);
  }, mo = (n) => {
    const a = () => {
      var b;
      return ((b = F.current) == null ? void 0 : b.token) === n;
    }, s = (b) => setTimeout(() => {
      a() && (Y(null), F.current = null);
    }, b), g = ["dance", "flap", "nap", "zoom", "cluck", "scratch", "dance", "zoom"][Math.floor(Math.random() * 8)];
    if (g === "zoom") {
      F.current = null;
      const b = (f) => {
        if (f === 0) {
          Y(null);
          return;
        }
        Te(), W.current && (W.current.speed = 135);
        const v = setInterval(() => {
          W.current || (clearInterval(v), b(f - 1));
        }, 200);
      };
      b(2);
      return;
    }
    if (g === "cluck") {
      Y("flap"), V(Fe.current.t.cluck), setTimeout(() => V(null), 2600), s(2400);
      return;
    }
    Y(g), s(g === "nap" ? 4600 : g === "dance" ? 2300 : g === "flap" ? 1700 : 1500);
  }, pn = 25, ho = (n, a, s) => {
    for (const g of [1, -1]) {
      const b = n - g * pn, f = a - 20;
      if (s(b, f)) return { sx: b, sy: f, face: g };
    }
    return null;
  }, go = () => {
    var P;
    const n = ie();
    if (!n || !O.current) return !1;
    const { g: a } = n, s = sa(a, ot(a, O.current.x, O.current.y));
    if (!s) return !1;
    const { dist: g } = ea(a, s), b = (L, T) => {
      const R = ot(a, L, T);
      return a.free[R[1] * a.cols + R[0]] === 1 && g[R[1] * a.cols + R[0]] >= 0;
    };
    let f = null;
    for (let L = 0; L < 14 && !f; L++) {
      const T = da(a, g, Math.random, 9);
      if (!T) return !1;
      const [R, ue] = pt(a, T), fe = R, te = ue + 18, X = ho(fe, te, b);
      X && (f = { px: fe, py: te, ...X });
    }
    if (!f) return !1;
    const v = f;
    Je.current = { x: v.px, y: v.py, sc0: ((P = Be()) == null ? void 0 : P.scrollTop) ?? 0 }, Zt(!0);
    const A = ++re.current;
    F.current = { token: A }, q();
    const E = () => {
      var L;
      return ((L = F.current) == null ? void 0 : L.token) === A;
    };
    return setTimeout(() => {
      var nt;
      if (!E()) return;
      const L = ie();
      if (!L || !O.current) return oa();
      const T = sa(L.g, ot(L.g, O.current.x, O.current.y)), R = ot(L.g, v.sx, v.sy);
      if (!T) return oa();
      const ue = ea(L.g, T);
      if (ue.dist[R[1] * L.g.cols + R[0]] < 0) return oa();
      const fe = ca(L.g, la(L.g, ue.prev, R)).map((le) => pt(L.g, le));
      fe[fe.length - 1] = [v.sx, v.sy], Ze.current = { moving: !0, until: performance.now() + 1200 }, W.current = { path: fe, i: 0, speed: Math.random() < 0.5 ? 125 : 52 }, Y("walk"), q();
      let te = "walk", X = 0, ct = ((nt = Be()) == null ? void 0 : nt.scrollTop) ?? 0, At = 0, $ = 0;
      const ye = performance.now(), ze = () => {
        var le;
        return ((le = document.querySelector(".mb")) == null ? void 0 : le.clientHeight) ?? 600;
      }, ge = setInterval(() => {
        var wt;
        const le = Je.current;
        if (!E() || !le || !O.current) {
          clearInterval(ge);
          return;
        }
        const dt = O.current, kt = ha(le), We = ((wt = Be()) == null ? void 0 : wt.scrollTop) ?? 0;
        if (We !== ct && (ct = We, At = performance.now() + 2500), te === "walk" || te === "peck") {
          if (performance.now() - ye > 45e3) {
            clearInterval(ge), dn(), Y(null), F.current = null;
            return;
          }
          const Nt = le.x - v.face * pn, Gt = Math.max(46, Math.min(ze() - 74, kt - 20)), ra = Math.hypot(Nt - dt.x, Gt - dt.y);
          if (Math.abs(Gt - (kt - 20)) > 10) {
            if ($ += 100, te === "peck" && (te = "walk", Y(null)), $ > 6e3) {
              clearInterval(ge), dn(), Y(null), F.current = null;
              return;
            }
            ra > 6 && (W.current ? W.current.path[W.current.path.length - 1] = [Nt, Gt] : (Ze.current = { moving: !0, until: performance.now() + 700 }, W.current = { path: [[Nt, Gt]], i: 0, speed: 90 }, q()));
            return;
          }
          $ = 0, ra > (te === "peck" ? 7 : 4) ? (te === "peck" && Y(ra > 70 ? "run" : "walk"), te === "peck" || performance.now() < At ? (Ze.current = { moving: !0, until: performance.now() + 700 }, W.current ? (W.current.path = [[Nt, Gt]], W.current.i = 0, W.current.speed = ra > 26 ? 150 : 70) : (W.current = { path: [[Nt, Gt]], i: 0, speed: ra > 26 ? 150 : 70 }, q())) : W.current ? W.current.path[W.current.path.length - 1] = [Nt, Gt] : (Ze.current = { moving: !0, until: performance.now() + 900 }, W.current = { path: [[Nt, Gt]], i: 0, speed: ra > 70 ? 150 : 75 }, q())) : W.current || (ve(v.face), te === "walk" ? (te = "peck", Y("peck")) : (Y((wn) => wn === "peck" ? wn : "peck"), X += 100)), te === "peck" && X >= 1500 && (te = "pull", Y("pull"), Pe.current && (Pe.current.dataset.state = "pull"));
          return;
        }
        X += 100, te === "pull" && X >= 2150 ? (te = "carry", le.cy0 = kt - 37, le.carry = performance.now(), Y(null), Pe.current && (Pe.current.dataset.state = "carry", Pe.current.dataset.face = String(he.current)), fa.current && (fa.current.dataset.state = "out"), q()) : te === "carry" && X >= 2650 ? (te = "swallow", Y("gulp"), Pe.current && (Pe.current.dataset.state = "swallow", Pe.current.dataset.face = String(he.current)), vt.current && (vt.current.dataset.state = "on")) : te === "swallow" && X >= 3900 && (clearInterval(ge), Je.current = null, Zt(!1), mo(A));
      }, 100);
    }, 2100), !0;
  }, bo = (n) => {
    var g, b;
    if (n.button !== 0 || be || !Le()) return;
    const a = /(-?[\d.]+)px\s+(-?[\d.]+)px/.exec(String(((b = (g = Ie.current) == null ? void 0 : g.style) == null ? void 0 : b.translate) ?? "")), s = lt();
    O.current = { x: s.x + (a ? parseFloat(a[1]) : 0), y: s.y + (a ? parseFloat(a[2]) : 0) }, De.current = { id: n.pointerId, sx: n.clientX, sy: n.clientY, lx: n.clientX, ly: n.clientY, moved: !1 };
    try {
      n.currentTarget.setPointerCapture(n.pointerId);
    } catch {
    }
  }, fo = (n) => {
    const a = De.current;
    if (!a || a.id !== n.pointerId) return;
    if (!a.moved) {
      if (Math.hypot(n.clientX - a.sx, n.clientY - a.sy) < 6) return;
      a.moved = !0, a.lx = a.sx, a.ly = a.sy, W.current = null, Ae.current = !1, je.current.x = 0, je.current.y = 0, oa(), $t(!0), Y("struggle"), V(Fe.current.t.cluck);
    }
    const s = Le();
    !s || !O.current || (O.current.x = Math.max(0, Math.min(s.clientWidth, O.current.x + (n.clientX - a.lx))), O.current.y = Math.max(0, Math.min(s.clientHeight, O.current.y + (n.clientY - a.ly))), a.lx = n.clientX, a.ly = n.clientY, q());
  }, un = (n) => {
    const a = De.current;
    if (!(!a || a.id !== n.pointerId)) {
      De.current = null;
      try {
        n.currentTarget.releasePointerCapture(n.pointerId);
      } catch {
      }
      a.moved && (Et.current = !0, $t(!1), V(null), Y("land"), setTimeout(() => Y((s) => s === "land" ? null : s), 520), setTimeout(() => {
        if (!Qe.current) {
          mn();
          return;
        }
        const s = ie();
        if (!s || !O.current) return;
        const g = ot(s.g, O.current.x, O.current.y);
        s.g.free[g[1] * s.g.cols + g[0]] || Te();
      }, 700));
    }
  };
  ee(() => {
    if (!Ht) return;
    const n = setInterval(() => Y("struggle"), 120);
    return () => clearInterval(n);
  }, [Ht]);
  const mn = () => {
    oa();
    const n = lt(), a = O.current ?? n, s = Math.hypot(n.x - a.x, n.y - a.y);
    if (s < 30) {
      W.current = { path: [[n.x, n.y]], i: 0, speed: 60 }, Y("walk"), q();
      return;
    }
    const g = Math.min(150, s * 0.45), b = (a.x + n.x) / 2;
    let f = Math.min(a.y, n.y) - g;
    const v = Le(), A = v == null ? void 0 : v.querySelector(".dock");
    if (v && A) {
      const L = v.getBoundingClientRect(), T = A.getBoundingClientRect(), R = { l: T.left - L.left, r: T.right - L.left, t: T.top - L.top }, ue = Math.min(a.x, n.x);
      Math.max(a.x, n.x) > R.l - 20 && ue < R.r + 20 && (f = Math.min(f, R.t - 50));
    }
    const E = [];
    for (let L = 1; L <= 10; L++) {
      const T = L / 10;
      E.push([(1 - T) ** 2 * a.x + 2 * (1 - T) * T * b + T ** 2 * n.x, (1 - T) ** 2 * a.y + 2 * (1 - T) * T * f + T ** 2 * n.y]);
    }
    Ae.current = !0, W.current = { path: E, i: 0, speed: 175 }, Y("fly"), q();
    const P = ++ne.current;
    setTimeout(() => {
      ne.current !== P || !Ae.current || (Ae.current = !1, W.current = null, O.current = lt(), Y(null));
    }, 2600);
  }, hn = I(!1);
  ee(() => {
    if (hn.current && !e && mn(), hn.current = e, !e && !p) return;
    const n = window.__albaRoamMs ?? 0;
    let a, s = !0;
    const g = () => {
      a = setTimeout(() => {
        if (!Ie.current || !Ie.current.isConnected) return;
        const A = document.activeElement;
        if (!(Ce.current || Fe.current.open || A && (/INPUT|TEXTAREA|SELECT/.test(A.tagName) || A.isContentEditable) || !!document.querySelector(".ppop, .dockpop")) && !W.current && !F.current && !Oa.current) {
          const P = window.__albaHunt, L = window.__albaScene;
          !(e && (L === "butterfly" || !s && !L && Math.random() < 0.12) && uo()) && !(e && L !== "butterfly" && L !== "snail" && (s || Math.random() < (P ?? 0.4)) && go()) && Te(), s = !1;
        }
        g();
      }, n || (s ? 4500 : 3500 + Math.random() * 5e3));
    };
    g();
    const b = document.querySelector(".mb .scroll");
    let f;
    const v = () => {
      F.current || (W.current = null, clearTimeout(f), f = setTimeout(() => {
        if (Fe.current.open || !O.current || F.current) return;
        const A = ie();
        if (!A) return;
        const E = ot(A.g, O.current.x, O.current.y);
        A.g.free[E[1] * A.g.cols + E[0]] || Te();
      }, 450));
    };
    return b == null || b.addEventListener("scroll", v, { passive: !0 }), () => {
      clearTimeout(a), clearTimeout(f), b == null || b.removeEventListener("scroll", v);
    };
  }, [e, p]), ee(() => {
    be && (W.current = null, oa());
  }, [be]);
  const Oa = I(!1);
  Oa.current = Lt, ee(() => {
    if (typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = window.__albaHenMs ?? 0, a = window.__albaAct;
    let s, g;
    const b = { peck: 1800, look: 2300, flap: 1600, scratch: 1400, nap: 4800, walk: 1500, dizzy: 1800 }, f = () => {
      s = setTimeout(() => {
        const v = document.activeElement;
        if (!(Ce.current || Fe.current.open || W.current || F.current || v && (/INPUT|TEXTAREA|SELECT/.test(v.tagName) || v.isContentEditable) || !!document.querySelector(".ppop, .dockpop"))) {
          const E = ["peck", "peck", "peck", "look", "look", "flap", "scratch", "nap", "dizzy", ...Qe.current ? [] : ["walk", "walk", "walk"]], P = a ?? E[Math.floor(Math.random() * E.length)];
          if (P === "walk") {
            const L = lt(), T = L.x + Math.round(-4 + Math.random() * 44);
            W.current = { path: [[T, L.y]], i: 0, speed: 38 }, q();
          }
          Y(P), !window.__albaHold && P !== "walk" && (g = setTimeout(() => Y(null), n ? b[P] / 2 : b[P]));
        }
        f();
      }, n || 3500 + Math.random() * 4500);
    };
    return f(), () => {
      clearTimeout(s), clearTimeout(g);
    };
  }, []);
  const Ha = async () => {
    if (ht(!1), we) return we;
    try {
      let n = null;
      try {
        n = localStorage.getItem("alba.chatslot");
      } catch {
      }
      if (n) {
        const a = await _.get("/api/chat/slots");
        Array.isArray(a) && a.some((s) => s.key === n) || (n = null);
      }
      if (!n) {
        const a = await _.post("/api/chat/slots", { name: "alba", agent: "alba-bot" });
        n = (a == null ? void 0 : a.key) ?? null;
        try {
          n && localStorage.setItem("alba.chatslot", n);
        } catch {
        }
      }
      if (!n) throw new Error("no slot");
      return mt(n), n;
    } catch {
      return ht(!0), null;
    }
  }, [xo, vo] = D(0), yo = async () => {
    de([{ from: "al", text: Fe.current.t.remHello }]), tt(!1);
    const n = we;
    if (n)
      try {
        await _.del(`/api/chat/slots/${encodeURIComponent(n)}`);
      } catch {
      }
    try {
      const a = await _.post("/api/chat/slots", { name: "alba-" + Date.now().toString(36), agent: "alba-bot" });
      if (a != null && a.key) {
        try {
          localStorage.setItem("alba.chatslot", a.key);
        } catch {
        }
        mt(a.key);
      }
    } catch {
      ht(!0);
    }
    vo((a) => a + 1);
  }, gn = (n, a) => de((s) => [...s, { from: a, text: n }]), Sa = (n) => setTimeout(() => gn(n, "al"), 120);
  ee(() => {
    be && !we && !ce && (K(!0), Ha());
  }, [be]), ee(() => {
    be && me.length === 0 && de([{ from: "al", text: y.remHello }]);
  }, [be]), ee(() => {
    const n = rt.current;
    n && (n.scrollTop = n.scrollHeight);
  }, [me, be, pe]);
  const Ra = (n, a) => {
    const s = { id: Math.random().toString(36).slice(2, 9), text: n, createdAt: (/* @__PURE__ */ new Date()).toISOString(), status: "pending", ...a ? { due: a } : {} };
    C(s), ft(null), Sa(y.remSaved(a && a > za() ? y.remOnDay(H(a)) : y.remNextLabel));
  }, ja = !pe, ko = /^\s*(?:cosa|che|come|quando|dove|perch[eé]|chi|quale|quali|quanto|what|how|when|where|why|who|which|qu[eé]|c[oó]mo|cu[aá]ndo|d[oó]nde|quoi|comment|pourquoi|o que|por que|was|wie|wann|wo|warum|wer)\b/i, bn = async (n) => {
    const a = await Ha();
    if (a && n)
      try {
        await _.post("/api/chat?ws=1", { message: n, slot: a, agent: "alba-bot", embed_app: "alba" });
      } catch {
      }
  }, fn = I(() => {
  });
  fn.current = (n) => {
    it(!0), K(!0), n.includes("[alba-login") && (tt(!0), setTimeout(() => tt(!1), 6e5)), bn(n);
  }, ee(() => {
    const n = (a) => {
      var g;
      const s = (g = a.detail) == null ? void 0 : g.message;
      typeof s == "string" && s && fn.current(s);
    };
    return window.addEventListener("alba:ask", n), () => window.removeEventListener("alba:ask", n);
  }, []);
  const xn = () => {
    const n = Me.trim();
    if (!n) return;
    if (gt(""), gn(n, "me"), bt) {
      const s = Rn(n, j);
      return s.due ? Ra(bt, s.due) : ri.test(n) ? Ra(bt) : Sa(`${y.remAsk} (${y.remAskPh})`);
    }
    if (/\?\s*$/.test(n) || ko.test(n)) {
      Sa(y.remToChat), setTimeout(() => void bn(n), 650);
      return;
    }
    const a = Rn(n, j);
    a.due ? Ra(a.text, a.due) : (ft(a.text), Sa(y.remAsk));
  };
  return /* @__PURE__ */ r("div", { ref: oe, children: [
    be ? /* @__PURE__ */ r("div", { ref: Dt, className: "bubble" + (ja ? " chat" : ""), children: [
      /* @__PURE__ */ r("div", { className: "bhead", children: [
        /* @__PURE__ */ t("h4", { children: "Alba" }),
        /* @__PURE__ */ r("div", { style: { display: "flex", gap: 6, alignItems: "center" }, children: [
          /* @__PURE__ */ t("button", { className: "ib", title: y.chatReset, "aria-label": y.chatReset, onClick: () => void yo(), children: /* @__PURE__ */ t(Za, { size: 14 }) }),
          Ke.length ? /* @__PURE__ */ r("button", { className: "talk", title: y.remPending, onClick: () => Z((n) => !n), children: [
            /* @__PURE__ */ t(Sn, { size: 13 }),
            " ",
            Ke.length
          ] }) : null,
          ja ? /* @__PURE__ */ t("button", { className: "ib", title: y.chatOpenCrew, "aria-label": y.chatOpenCrew, onClick: () => N({ ...we ? { slotKey: we } : { agent: "alba-bot" } }), children: /* @__PURE__ */ t(Wa, { size: 15 }) }) : /* @__PURE__ */ t("button", { className: "ib", title: y.remTalk, "aria-label": y.remTalk, onClick: () => {
            K(!0), Ha();
          }, children: /* @__PURE__ */ t(ua, { size: 16 }) })
        ] })
      ] }),
      x && Ke.length ? /* @__PURE__ */ r("div", { className: "plist", style: { margin: "0 0 10px", paddingTop: 0, borderTop: 0 }, children: [
        /* @__PURE__ */ t("b", { children: y.remPending }),
        Ke.map((n) => /* @__PURE__ */ r("div", { className: "pitem", children: [
          /* @__PURE__ */ t(Sn, { size: 14, style: { marginTop: 3, color: "var(--accent)" } }),
          /* @__PURE__ */ r("span", { children: [
            n.text,
            /* @__PURE__ */ t("em", { children: n.due && n.due > za() ? y.remOnDay(H(n.due)) : y.remNextLabel })
          ] }),
          /* @__PURE__ */ t("button", { className: "ib", title: y.remDelete, "aria-label": y.remDelete, onClick: () => void o(n.id), children: /* @__PURE__ */ t(lr, { size: 14 }) })
        ] }, n.id))
      ] }) : null,
      ja ? pe ? /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ t("p", { className: "ok", style: { color: "var(--muted)" }, children: y.chatUnavailable }),
        /* @__PURE__ */ r("button", { className: "talk", onClick: () => N({ agent: "alba-bot" }), children: [
          /* @__PURE__ */ t(Wa, { size: 14 }),
          " ",
          y.chatOpenCrew
        ] })
      ] }) : we ? /* @__PURE__ */ r(Xe, { children: [
        Ye ? /* @__PURE__ */ r("div", { className: "loginhint", children: [
          /* @__PURE__ */ t("span", { children: y.loginHint }),
          /* @__PURE__ */ r("button", { className: "talk", onClick: () => N(we ? { slotKey: we } : { agent: "alba-bot" }), children: [
            /* @__PURE__ */ t(Wa, { size: 13 }),
            " ",
            y.loginOpen
          ] })
        ] }) : null,
        /* @__PURE__ */ t("div", { className: "chatbox", children: /* @__PURE__ */ t(pr, { slotKey: we, agent: "alba-bot", placeholder: y.remPlaceholder, frameless: !0, startAtBottom: !0 }, we + ":" + xo) })
      ] }) : /* @__PURE__ */ t("p", { className: "ok", style: { color: "var(--muted)" }, children: "…" }) : /* @__PURE__ */ r(Xe, { children: [
        /* @__PURE__ */ t("div", { className: "msgs", ref: rt, children: me.map((n, a) => /* @__PURE__ */ t("div", { className: "msg " + n.from, children: n.text }, a)) }),
        /* @__PURE__ */ r("div", { className: "rin", children: [
          /* @__PURE__ */ t("input", { autoFocus: !0, value: Me, onChange: (n) => gt(n.target.value), onKeyDown: (n) => n.key === "Enter" && xn(), placeholder: bt ? y.remAskPh : y.remPlaceholder }),
          /* @__PURE__ */ t("button", { className: "ib", title: y.add, "aria-label": y.add, onClick: xn, children: /* @__PURE__ */ t(cr, { size: 16 }) })
        ] })
      ] })
    ] }) : null,
    U && !be ? /* @__PURE__ */ t("div", { ref: Qt, className: "teaser", role: "status", children: U }) : null,
    /* @__PURE__ */ t("button", { ref: Ie, className: "mascot" + (U && !be ? " hop" : "") + (Pt ? " act-" + Pt : "") + (e || p ? " roaming" : "") + (Ht ? " dragging" : ""), "aria-label": "Alba", title: "Alba", onPointerDown: bo, onPointerMove: fo, onPointerUp: un, onPointerCancel: un, onClick: () => {
      if (Et.current) {
        Et.current = !1;
        return;
      }
      it((n) => !n);
    }, children: /* @__PURE__ */ t("svg", { ref: Re, viewBox: "0 0 64 64", "aria-hidden": "true", children: /* @__PURE__ */ r("g", { className: "hen", children: [
      /* @__PURE__ */ r("g", { className: "hentail", children: [
        /* @__PURE__ */ t("ellipse", { cx: "14", cy: "34", rx: "5", ry: "10", transform: "rotate(-28 14 34)", fill: "#F4C27A" }),
        /* @__PURE__ */ t("ellipse", { cx: "17", cy: "30", rx: "4", ry: "9", transform: "rotate(-8 17 30)", fill: "#F8D79B" })
      ] }),
      /* @__PURE__ */ r("g", { stroke: "#F59E0B", strokeWidth: "2.4", strokeLinecap: "round", fill: "none", children: [
        /* @__PURE__ */ t("g", { className: "legback", children: /* @__PURE__ */ t("path", { d: "M27 51 V58 M24.5 58.5 H29.5" }) }),
        /* @__PURE__ */ t("g", { className: "legfront", children: /* @__PURE__ */ t("path", { d: "M36 51 V58 M33.5 58.5 H38.5" }) })
      ] }),
      /* @__PURE__ */ t("ellipse", { cx: "30", cy: "38", rx: "20", ry: "16", fill: "#FFF4DC" }),
      /* @__PURE__ */ t("g", { className: "henwing", children: /* @__PURE__ */ t("ellipse", { cx: "27", cy: "41", rx: "10", ry: "6.8", transform: "rotate(-14 27 41)", fill: "#F6D9A0" }) }),
      /* @__PURE__ */ r("g", { className: "henhead", children: [
        /* @__PURE__ */ t("circle", { cx: "42", cy: "22", r: "11", fill: "#FFF4DC" }),
        /* @__PURE__ */ r("g", { fill: "#EF4444", children: [
          /* @__PURE__ */ t("circle", { cx: "37", cy: "12.5", r: "3.4" }),
          /* @__PURE__ */ t("circle", { cx: "42.5", cy: "10.5", r: "3.8" }),
          /* @__PURE__ */ t("circle", { cx: "48", cy: "13", r: "3.2" })
        ] }),
        /* @__PURE__ */ t("path", { className: "beakU", d: "M52 21 L60 24 L52 24 Z", fill: "#F59E0B" }),
        /* @__PURE__ */ t("path", { className: "beakL", d: "M52 24 L60 24 L52 27 Z", fill: "#E88A0B" }),
        /* @__PURE__ */ t("ellipse", { cx: "50.5", cy: "30", rx: "2.2", ry: "3.2", fill: "#EF4444" }),
        /* @__PURE__ */ t("ellipse", { className: "eye", cx: "44.5", cy: "21", rx: "1.9", ry: "2.5", fill: "#3B1D06" }),
        /* @__PURE__ */ t("circle", { cx: "41", cy: "27", r: "2.6", fill: "#FB7185", opacity: ".5" })
      ] }),
      /* @__PURE__ */ t("circle", { className: "bulge", cx: "47", cy: "29", r: "2.6", fill: "#F9A8D4" }),
      /* @__PURE__ */ t("text", { className: "zz", x: "52", y: "10", fontSize: "11", fontWeight: "700", fill: "#93C5FD", children: "z" })
    ] }) }) }),
    Ke.length && !Lt ? /* @__PURE__ */ t("span", { className: "egg", title: y.remPending, children: /* @__PURE__ */ t("b", { children: Ke.length > 9 ? "9+" : Ke.length }) }) : null,
    Lt ? /* @__PURE__ */ r("svg", { className: "hatch", viewBox: "0 0 30 36", "aria-hidden": "true", children: [
      /* @__PURE__ */ r("g", { className: "hchick", children: [
        /* @__PURE__ */ t("circle", { cx: "15", cy: "17", r: "7.5", fill: "#FDE047" }),
        /* @__PURE__ */ t("path", { d: "M21.5 16 L26 17.4 L21.5 18.8 Z", fill: "#F59E0B" }),
        /* @__PURE__ */ t("circle", { cx: "17.6", cy: "15.2", r: "1.1", fill: "#3B1D06" })
      ] }),
      /* @__PURE__ */ t("path", { d: "M3 22 Q3 33 15 34 Q27 33 27 22 L22.5 19.5 L19 23 L15 19.5 L11 23 L7.5 19.5 Z", fill: "#FFF4DC", stroke: "#F4C27A", strokeWidth: "1.4" }),
      /* @__PURE__ */ t("g", { className: "htop", children: /* @__PURE__ */ t("path", { d: "M3 21.5 Q3 5 15 3 Q27 5 27 21.5 L22.5 19 L19 22.5 L15 19 L11 22.5 L7.5 19 Z", fill: "#FFF4DC", stroke: "#F4C27A", strokeWidth: "1.4" }) })
    ] }) : null,
    Array.from({ length: Math.min(c, 6) }).map((n, a) => /* @__PURE__ */ t("div", { className: "chickwrap", ref: (s) => {
      Ee.current[a] = s;
    }, "aria-hidden": "true", children: /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", className: "chick", style: { animationDelay: a * 0.37 + "s" }, children: [
      /* @__PURE__ */ t("ellipse", { cx: "10.5", cy: "14.5", rx: "8", ry: "7", fill: "#FDE047" }),
      /* @__PURE__ */ t("circle", { cx: "14.5", cy: "8.5", r: "5", fill: "#FDE047" }),
      /* @__PURE__ */ t("path", { d: "M18.8 8 L22.8 9.2 L18.8 10.4 Z", fill: "#F59E0B" }),
      /* @__PURE__ */ t("circle", { cx: "15.7", cy: "7.6", r: "1", fill: "#3B1D06" }),
      /* @__PURE__ */ t("path", { d: "M9.5 21 V23.4 M12.5 21 V23.4", stroke: "#F59E0B", strokeWidth: "1.6", strokeLinecap: "round" })
    ] }) }, a)),
    Pa && Je.current ? /* @__PURE__ */ r(Xe, { children: [
      /* @__PURE__ */ r("div", { className: "wormspot", ref: fa, "data-state": "in", style: { translate: `${Je.current.x - 20}px ${Je.current.y - 50}px` }, "aria-hidden": "true", children: [
        /* @__PURE__ */ r("svg", { className: "mound", viewBox: "0 0 40 14", children: [
          /* @__PURE__ */ t("ellipse", { cx: "20", cy: "9", rx: "17", ry: "5", fill: "#5E3B1E" }),
          /* @__PURE__ */ t("ellipse", { cx: "20", cy: "7.6", rx: "15", ry: "4.4", fill: "#7B5128" }),
          /* @__PURE__ */ t("ellipse", { cx: "20", cy: "7.2", rx: "6.5", ry: "2.3", fill: "#24150a" }),
          /* @__PURE__ */ t("circle", { cx: "9", cy: "8", r: "1.1", fill: "#9A6A38" }),
          /* @__PURE__ */ t("circle", { cx: "31", cy: "8.6", r: "1.3", fill: "#9A6A38" }),
          /* @__PURE__ */ t("circle", { cx: "26", cy: "5.6", r: ".9", fill: "#9A6A38" })
        ] }),
        [0, 1, 2, 3, 4].map((n) => /* @__PURE__ */ t("i", { className: "crumb", style: { "--dx": `${(n - 2) * 8 + (n % 2 ? 3 : -3)}px`, "--dy": `${-14 - n % 3 * 5}px`, animationDelay: `${n * 0.03}s` } }, n))
      ] }),
      /* @__PURE__ */ t("div", { className: "worm", ref: Pe, "data-state": "up", style: { translate: `${Je.current.x - 20}px ${Je.current.y - 50}px` }, "aria-hidden": "true", children: /* @__PURE__ */ t("div", { className: "wormclip", children: /* @__PURE__ */ r("svg", { className: "wormbody", viewBox: "0 0 14 32", children: [
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 0 }, cx: "7", cy: "30.0", r: "1.3", fill: "#F9A8D4", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 1 }, cx: "7", cy: "27.1", r: "1.9", fill: "#F7A0CD", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 2 }, cx: "7", cy: "24.2", r: "2.4", fill: "#F9A8D4", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 3 }, cx: "7", cy: "21.3", r: "2.7", fill: "#F7A0CD", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 4 }, cx: "7", cy: "18.4", r: "2.9", fill: "#F9A8D4", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 5 }, cx: "7", cy: "15.5", r: "2.9", fill: "#F7A0CD", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 6 }, cx: "7", cy: "12.6", r: "2.8", fill: "#F9A8D4", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 7 }, cx: "7", cy: "9.7", r: "2.7", fill: "#F7A0CD", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ t("circle", { className: "seg", style: { "--i": 8 }, cx: "7", cy: "6.8", r: "2.6", fill: "#F9A8D4", stroke: "#F472B6", strokeWidth: ".5" }),
        /* @__PURE__ */ r("g", { className: "seg wormhead", style: { "--i": 9 }, children: [
          /* @__PURE__ */ t("circle", { cx: "7", cy: "4.4", r: "3.3", fill: "#F472B6" }),
          /* @__PURE__ */ t("circle", { cx: "8.4", cy: "3.6", r: ".85", fill: "#3B1D06" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ r("div", { className: "albareact", ref: vt, "data-state": "off", "aria-hidden": "true", children: [
        /* @__PURE__ */ t("i", { children: "♥" }),
        /* @__PURE__ */ t("i", { children: "★" }),
        /* @__PURE__ */ t("i", { children: "♥" })
      ] })
    ] }) : null,
    c > 6 ? /* @__PURE__ */ r("small", { className: "chickmore", children: [
      "+",
      c - 6
    ] }) : null,
    /* @__PURE__ */ t("div", { className: "slimes", ref: Bt, "aria-hidden": "true" }),
    qa && Ne.current ? /* @__PURE__ */ r(Xe, { children: [
      /* @__PURE__ */ t("div", { className: "snail", ref: ke, "data-state": "crawl", style: { translate: `${Ne.current.x - 17}px ${Ne.current.y - 11}px`, scale: yt.current < 0 ? "-1 1" : "1 1" }, "aria-hidden": "true", children: /* @__PURE__ */ r("svg", { viewBox: "0 0 40 26", width: "34", height: "22", children: [
        /* @__PURE__ */ t("path", { className: "sfoot", d: "M3 22 Q1.5 19 6 18.4 L26 17.6 Q30 17.4 31.4 13.4 Q32.4 9.8 35 10.6 Q37.4 12 35.8 16.6 Q33.6 22.4 28 23 L6 23 Q3.6 23 3 22 Z", fill: "#CDBB96", stroke: "#9C8A63", strokeWidth: ".6" }),
        /* @__PURE__ */ r("g", { className: "sshell", children: [
          /* @__PURE__ */ t("circle", { cx: "16", cy: "12", r: "8.6", fill: "#B9703A", stroke: "#7E4722", strokeWidth: ".7" }),
          /* @__PURE__ */ t("path", { d: "M16.4 12.2 a1.9 1.9 0 1 1 2.6 -1.7 a4.3 4.3 0 1 1 -6.6 3.9 a6.5 6.5 0 1 1 10.2 -5.2", fill: "none", stroke: "#F0C38E", strokeWidth: "1.1", strokeLinecap: "round" })
        ] }),
        /* @__PURE__ */ r("g", { className: "stent", children: [
          /* @__PURE__ */ t("path", { d: "M34.2 11 Q35.6 6 37.6 4.4", stroke: "#9C8A63", strokeWidth: "1", fill: "none", strokeLinecap: "round" }),
          /* @__PURE__ */ t("circle", { cx: "37.7", cy: "4.2", r: "1.15", fill: "#3B1D06" }),
          /* @__PURE__ */ t("path", { d: "M32.6 10.6 Q32.4 5.4 33.5 3.6", stroke: "#9C8A63", strokeWidth: "1", fill: "none", strokeLinecap: "round" }),
          /* @__PURE__ */ t("circle", { cx: "33.6", cy: "3.3", r: "1.15", fill: "#3B1D06" })
        ] })
      ] }) }),
      k ? /* @__PURE__ */ t("div", { ref: St, className: "teaser snailteaser", children: k }) : null
    ] }) : null,
    ga ? /* @__PURE__ */ r(Xe, { children: [
      /* @__PURE__ */ t("div", { className: "albabug", ref: zt, "data-state": "fly", style: { translate: "-80px -80px" }, "aria-hidden": "true", children: ga === "bee" ? /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", width: "18", height: "18", children: [
        /* @__PURE__ */ t("ellipse", { className: "wing", cx: "8", cy: "8", rx: "3.6", ry: "2.4", fill: "#fff", opacity: ".75" }),
        /* @__PURE__ */ t("ellipse", { className: "wing", cx: "16", cy: "8", rx: "3.6", ry: "2.4", fill: "#fff", opacity: ".75" }),
        /* @__PURE__ */ t("ellipse", { cx: "12", cy: "13", rx: "5.2", ry: "4.2", fill: "#FDE047" }),
        /* @__PURE__ */ t("path", { d: "M7.2 10.5 H16.8 M7 13 H17 M7.6 15.5 H16.4", stroke: "#3B1D06", strokeWidth: "1.3" })
      ] }) : /* @__PURE__ */ r("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
        /* @__PURE__ */ r("g", { className: "bwing bwl", children: [
          /* @__PURE__ */ t("path", { d: "M12 9 C8 2 2 4 3.5 9 C4.6 12.6 9 11.6 12 9 Z", fill: "#F472B6" }),
          /* @__PURE__ */ t("path", { d: "M12 9 C8.5 15 3.5 15.4 4.6 19 C5.8 22.7 10 20 12 15 Z", fill: "#A78BFA" })
        ] }),
        /* @__PURE__ */ r("g", { className: "bwing bwr", children: [
          /* @__PURE__ */ t("path", { d: "M12 9 C16 2 22 4 20.5 9 C19.4 12.6 15 11.6 12 9 Z", fill: "#F9A8D4" }),
          /* @__PURE__ */ t("path", { d: "M12 9 C15.5 15 20.5 15.4 19.4 19 C18.2 22.7 14 20 12 15 Z", fill: "#C4B5FD" })
        ] }),
        /* @__PURE__ */ t("path", { d: "M12 5.4 V18 M12 6 Q10.4 3.4 9.4 3 M12 6 Q13.6 3.4 14.6 3", stroke: "#3B1D06", strokeWidth: "1.1", fill: "none", strokeLinecap: "round" })
      ] }) }),
      /* @__PURE__ */ r("div", { className: "albareact", ref: jt, "data-state": "off", "aria-hidden": "true", children: [
        /* @__PURE__ */ t("i", { children: "♥" }),
        /* @__PURE__ */ t("i", { children: "★" }),
        /* @__PURE__ */ t("i", { children: "♥" })
      ] })
    ] }) : null
  ] });
}
const He = { since: 0, gen: "" }, li = 8 * 60 * 1e3;
function Qa() {
  He.since = 0;
  try {
    localStorage.removeItem("alba.run");
  } catch {
  }
}
function Gn() {
  if (!He.since)
    try {
      const e = JSON.parse(localStorage.getItem("alba.run") || "null");
      e != null && e.since && (He.since = e.since, He.gen = e.gen || "");
    } catch {
    }
  return He.since && Date.now() - He.since < li ? !0 : (He.since = 0, !1);
}
function hi() {
  var st, se, Qe, Ut, Lt, Vt, Pt, Y;
  const { t: e, lang: p } = ta();
  Pr();
  const { cfg: u, save: C } = La(), [o, y] = D(() => {
    try {
      return localStorage.getItem("alba.tab") ?? "oggi";
    } catch {
      return "oggi";
    }
  }), [G, j] = on(), [N, _] = D(!1), [x, Z] = D(!1), ce = ma(), [K, me] = D(() => Gn()), [de, rt] = D(""), [we, mt] = D(!1), pe = u.schedule ?? { time: "08:00", days: [1, 2, 3, 4, 5] }, ht = (c) => {
    try {
      return new Intl.DateTimeFormat(p, { weekday: "short" }).format(new Date(2024, 0, c));
    } catch {
      return String(c);
    }
  }, it = pe.days.join() === "1,2,3,4,5" ? e.bannerDays : pe.days.length === 7 ? "7/7" : pe.days.map(ht).join(" "), Ye = (c) => C({ ...u, schedule: { time: c.time, days: [...c.days].sort((w, H) => w - H) } }), tt = I(null), Me = I(null), [gt, bt] = D(0), ft = () => {
    const c = Me.current, w = c == null ? void 0 : c.closest(".topbar");
    if (c && w) {
      const H = c.getBoundingClientRect(), ae = w.getBoundingClientRect();
      bt(Math.min(Math.max(H.left + H.width / 2 - ae.left, 161), Math.max(ae.width - 161, 161)));
    }
    mt((H) => !H);
  };
  ee(() => {
    if (!we) return;
    const c = (w) => {
      var ae;
      const H = w.target;
      tt.current && !tt.current.contains(H) && !((ae = H.closest) != null && ae.call(H, ".st.sched")) && mt(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, [we]);
  const Mt = (c) => {
    c || (He.since = 0), me(c);
  }, Ft = async () => {
    var c;
    He.gen = ((c = u.brief) == null ? void 0 : c.generatedAt) ?? "", He.since = Date.now();
    try {
      localStorage.setItem("alba.run", JSON.stringify(He));
    } catch {
    }
    Mt(!0), rt("");
    try {
      const w = await ce.post("/apps/alba/api/run-brief", {});
      if (w && w.ok === !1) throw new Error(String(w.error || "error"));
    } catch (w) {
      Qa(), Mt(!1), rt(String((w == null ? void 0 : w.message) || w).slice(0, 160));
      return;
    }
  };
  ee(() => {
    if (!K) return;
    const c = setInterval(() => {
      Gn() || me(!1);
    }, 5e3);
    return () => clearInterval(c);
  }, [K]), ee(() => {
    let c = !0;
    const w = async () => {
      var ae;
      try {
        const $e = await ce.get("/apps/alba/api/run-status");
        if (!c || !$e || !$e.known) return;
        $e.running ? (He.since || (He.since = Date.now(), He.gen = ((ae = u.brief) == null ? void 0 : ae.generatedAt) ?? ""), me(!0)) : He.since && Date.now() - He.since > 2e4 && (Qa(), me(!1));
      } catch {
      }
    };
    w();
    const H = setInterval(w, 4e3);
    return () => {
      c = !1, clearInterval(H);
    };
  }, []), ee(() => {
    var c;
    K && (((c = u.brief) == null ? void 0 : c.generatedAt) ?? "") !== He.gen && (Qa(), me(!1));
  }, [(st = u.brief) == null ? void 0 : st.generatedAt, K]);
  const [oe, Ie] = D(""), Re = I(null), Ee = I({}), O = I(null), je = I(!1), [he, W] = D(null), It = I(null), i = () => {
    var H;
    const c = (H = It.current) == null ? void 0 : H.firstElementChild, w = Re.current;
    !c || !w || _(c.getBoundingClientRect().left < w.getBoundingClientRect().right + 16);
  }, B = no(u), U = o === "connessioni", V = ut.filter((c) => (u.accounts[c.key] ?? []).length).length, xe = U && B.length && !B.includes(G) ? B[0] : G === Ve || B.includes(G) ? G : Ve;
  ee(() => {
    U && B.length && !B.includes(G) && j(B[0]);
  }, [U, B.join("|"), G]);
  const Ce = (((se = u.brief) == null ? void 0 : se.sources) ?? []).map((c) => ut.find((w) => w.key === c.toLowerCase())).filter(Boolean), De = (c) => c === Ve ? "#64748B" : ya(u, c);
  ee(() => {
    const c = (w) => {
      if (w.metaKey || w.ctrlKey || w.altKey) return;
      const H = w.target;
      if (H && (/INPUT|SELECT|TEXTAREA/.test(H.tagName) || H.isContentEditable) || !/^[0-9]$/.test(w.key)) return;
      const ae = Number(w.key);
      ae === 0 ? j(Ve) : B[ae - 1] && j(B[ae - 1]);
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [B.join("|")]);
  const Et = (c, w) => {
    if (!U || c.button !== 0) return;
    const H = B.indexOf(w), ae = B.map((Le) => {
      var lt;
      return ((lt = Ee.current[Le]) == null ? void 0 : lt.getBoundingClientRect().left) ?? 0;
    }), $e = ae.length > 1 ? Math.abs(ae[1] - ae[0]) : 42;
    O.current = { sp: w, from: H, startX: c.clientX, step: $e, n: B.length, started: !1, target: H };
    try {
      c.currentTarget.setPointerCapture(c.pointerId);
    } catch {
    }
  }, Ht = (c) => {
    const w = O.current;
    if (!w) return;
    const H = c.clientX - w.startX;
    if (!w.started) {
      if (Math.abs(H) < 5) return;
      w.started = !0;
    }
    w.target = Math.max(0, Math.min(w.n - 1, w.from + Math.round(H / w.step))), W({ sp: w.sp, from: w.from, dx: H, target: w.target, step: w.step });
  }, $t = () => {
    const c = O.current;
    if (O.current = null, W(null), !c || !c.started || (je.current = !0, setTimeout(() => {
      je.current = !1;
    }, 0), c.target === c.from)) return;
    const w = B.slice();
    w.splice(c.from, 1), w.splice(c.target, 0, c.sp);
    const H = w.filter((ae) => u.spaces.includes(ae));
    C({ ...u, spaces: [...H, ...u.spaces.filter((ae) => !H.includes(ae))] });
  };
  ee(() => {
    if (!he) return;
    const c = (w) => {
      w.key === "Escape" && (O.current = null, W(null));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [!!he]);
  const aa = (c) => he ? c === he.from ? { transform: `translateX(${he.dx}px) scale(1.1)`, transition: "none", zIndex: 5, boxShadow: "0 10px 24px rgba(0,0,0,.45)", cursor: "grabbing" } : { transform: `translateX(${he.from < c && c <= he.target ? -he.step : he.target <= c && c < he.from ? he.step : 0}px)`, transition: "transform .18s cubic-bezier(.2,.8,.2,1)" } : {}, Fe = () => {
    const c = oe.trim();
    !c || u.spaces.includes(c) || (C({ ...u, spaces: [...u.spaces, c] }), j(c), Ie(""), Z(!1));
  };
  ee(() => {
    U || Z(!1);
  }, [U]), ee(() => {
    if (!x) return;
    const c = (H) => {
      Re.current && !Re.current.contains(H.target) && Z(!1);
    }, w = (H) => {
      H.key === "Escape" && Z(!1);
    };
    return document.addEventListener("mousedown", c), window.addEventListener("keydown", w), () => {
      document.removeEventListener("mousedown", c), window.removeEventListener("keydown", w);
    };
  }, [x]);
  const [Ke, _e] = D(null), xt = (Qe = u.brief) == null ? void 0 : Qe.generatedAt;
  ee(() => {
    var w;
    if (!xt || String(((w = u.brief) == null ? void 0 : w.caption) ?? "").toUpperCase().startsWith("ESEMPIO")) return;
    let c = "";
    try {
      c = localStorage.getItem("alba.seenBrief") ?? "";
    } catch {
    }
    if (c !== xt) {
      try {
        localStorage.setItem("alba.seenBrief", xt);
      } catch {
      }
      c && u.notifyOs === !1 && Date.now() - Date.parse(xt) < 6 * 36e5 && _e(xt);
    }
  }, [xt]), ee(() => {
    if (!Ke) return;
    const c = setTimeout(() => _e(null), 4e4), w = (H) => {
      H.key === "Escape" && _e(null);
    };
    return window.addEventListener("keydown", w), () => {
      clearTimeout(c), window.removeEventListener("keydown", w);
    };
  }, [Ke]);
  const Ct = (c) => {
    c === "oggi" && o === "connessioni" && j(Ve), y(c);
    try {
      localStorage.setItem("alba.tab", c);
    } catch {
    }
  };
  return /* @__PURE__ */ r(
    Rr,
    {
      overlay: /* @__PURE__ */ r(Xe, { children: [
        Ke && u.brief ? /* @__PURE__ */ r("aside", { className: "briefpop", role: "status", "aria-live": "polite", children: [
          /* @__PURE__ */ r("div", { className: "bp-head", children: [
            /* @__PURE__ */ t(Ta, { size: 15 }),
            /* @__PURE__ */ t("b", { children: e.toastTitle }),
            /* @__PURE__ */ t("span", { children: [u.brief.weekday, u.brief.dateLabel].filter(Boolean).join(" · ") }),
            /* @__PURE__ */ t("button", { className: "bp-x", "aria-label": e.toastClose, title: e.toastClose, onClick: () => _e(null), children: "×" })
          ] }),
          u.brief.headline ? /* @__PURE__ */ t("p", { className: "bp-title", children: u.brief.headline }) : null,
          /* @__PURE__ */ r("div", { className: "bp-chips", children: [
            (((Ut = u.brief.updates) == null ? void 0 : Ut.length) ?? 0) > 0 ? /* @__PURE__ */ r("span", { children: [
              /* @__PURE__ */ t("b", { children: u.brief.updates.length }),
              " ",
              e.toastUpdates
            ] }) : null,
            (u.tasks ?? []).filter((c) => c.status === "open").length > 0 ? /* @__PURE__ */ r("span", { children: [
              /* @__PURE__ */ t("b", { children: (u.tasks ?? []).filter((c) => c.status === "open").length }),
              " ",
              e.toastTodo
            ] }) : null,
            (((Lt = u.brief.reminders) == null ? void 0 : Lt.length) ?? 0) > 0 ? /* @__PURE__ */ r("span", { children: [
              /* @__PURE__ */ t("b", { children: u.brief.reminders.length }),
              " ",
              e.toastReminders
            ] }) : null
          ] }),
          /* @__PURE__ */ t("ul", { className: "bp-list", children: (u.brief.updates ?? []).slice(0, 3).map((c, w) => {
            const H = ut.find(($e) => $e.key === c.source), ae = H == null ? void 0 : H.Icon;
            return /* @__PURE__ */ r("li", { children: [
              /* @__PURE__ */ t("i", { style: { color: H == null ? void 0 : H.color, background: H ? H.color + "22" : void 0 }, children: ae ? /* @__PURE__ */ t(ae, { size: 14 }) : null }),
              /* @__PURE__ */ r("span", { children: [
                c.title,
                c.space ? /* @__PURE__ */ r("em", { children: [
                  /* @__PURE__ */ t("s", { style: { background: ya(u, c.space) } }),
                  c.space
                ] }) : null
              ] })
            ] }, w);
          }) }),
          (((Vt = u.brief.updates) == null ? void 0 : Vt.length) ?? 0) > 3 ? /* @__PURE__ */ r("div", { className: "bp-more", children: [
            "+",
            (((Pt = u.brief.updates) == null ? void 0 : Pt.length) ?? 0) - 3,
            " ",
            e.toastMore
          ] }) : null,
          /* @__PURE__ */ r("div", { className: "bp-actions", children: [
            /* @__PURE__ */ t("button", { className: "ghost", onClick: () => _e(null), children: e.toastLater }),
            /* @__PURE__ */ t("button", { className: "talk", onClick: () => {
              Ct("oggi"), _e(null);
            }, children: e.toastOpen })
          ] }),
          /* @__PURE__ */ t("div", { className: "bp-bar", children: /* @__PURE__ */ t("i", {}) })
        ] }, Ke) : null,
        /* @__PURE__ */ t(si, { roam: o === "connessioni", gutter: o === "oggi" }),
        /* @__PURE__ */ r("div", { className: "dock" + (U ? " edit" : "") + (he ? " dragging-any" : ""), ref: Re, onMouseEnter: i, onMouseMove: i, onMouseLeave: () => _(!1), children: [
          x ? /* @__PURE__ */ r("div", { className: "dockpop", children: [
            /* @__PURE__ */ t("input", { className: "newspace", autoFocus: !0, value: oe, onChange: (c) => Ie(c.target.value), onKeyDown: (c) => c.key === "Enter" && Fe(), placeholder: e.newSpace }),
            /* @__PURE__ */ t("button", { className: "ib", title: e.add, onClick: Fe, children: /* @__PURE__ */ t(Ma, { size: 16 }) })
          ] }) : null,
          /* @__PURE__ */ t("button", { className: "ichip side" + (o === "oggi" ? " on" : ""), style: o === "oggi" ? { background: "var(--accent)" } : void 0, "data-tip": e.today, "aria-label": e.today, onClick: () => Ct("oggi"), children: /* @__PURE__ */ t(Ta, { size: 18 }) }),
          /* @__PURE__ */ t("span", { className: "sep" }),
          U ? null : /* @__PURE__ */ t("button", { "data-all": "1", className: "ichip" + (xe === Ve ? " on" : ""), style: { "--c": De(Ve), ...xe === Ve ? { background: De(Ve) } : {} }, "data-tip": e.all, "aria-label": e.all, onClick: () => j(Ve), children: /* @__PURE__ */ t(Fr, { size: 18 }) }),
          B.map((c, w) => {
            const H = Jn(u, c);
            return /* @__PURE__ */ t(
              "button",
              {
                ref: (ae) => {
                  Ee.current[c] = ae;
                },
                className: "ichip" + (xe === c ? " on" : ""),
                style: { "--c": De(c), ...xe === c ? { background: De(c) } : { color: De(c) }, ...aa(w) },
                "data-tip": c,
                "aria-label": c,
                onPointerDown: (ae) => Et(ae, c),
                onPointerMove: Ht,
                onPointerUp: $t,
                onPointerCancel: $t,
                onClick: () => {
                  je.current || j(c);
                },
                children: /* @__PURE__ */ t(H, { size: 18 })
              },
              c
            );
          }),
          /* @__PURE__ */ t("div", { className: "addslot", "aria-hidden": !U, children: /* @__PURE__ */ t("button", { className: "ichip add" + (x ? " on" : ""), tabIndex: U ? 0 : -1, "data-tip": e.newSpace, "aria-label": e.newSpace, onClick: () => Z((c) => !c), children: /* @__PURE__ */ t(Ma, { size: 16 }) }) }),
          /* @__PURE__ */ t("span", { className: "sep" }),
          /* @__PURE__ */ t("button", { className: "ichip side" + (o === "connessioni" ? " on" : ""), style: o === "connessioni" ? { background: "var(--accent)" } : void 0, "data-tip": e.connections, "aria-label": e.connections, onClick: () => Ct("connessioni"), children: /* @__PURE__ */ t(dr, { size: 16 }) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ r("div", { className: "topbar", children: [
          /* @__PURE__ */ r("div", { className: "banner", style: { "--grad": Mr((Y = u.brief) == null ? void 0 : Y.generatedAt) }, children: [
            /* @__PURE__ */ r("div", { className: "bt", children: [
              /* @__PURE__ */ t(Ta, { size: 20 }),
              /* @__PURE__ */ t("b", { children: "Alba" }),
              /* @__PURE__ */ r("small", { children: [
                "v",
                "1.48.3"
              ] }),
              /* @__PURE__ */ t("span", { className: "bs", children: e.bannerSub }),
              /* @__PURE__ */ r("button", { className: "tabbtn refresh" + (K ? " spin" : ""), disabled: K, onClick: Ft, children: [
                (() => {
                  const c = Tt("RefreshCw");
                  return c ? /* @__PURE__ */ t(c, { size: 14 }) : null;
                })(),
                K ? e.regenOn : de ? e.regenErr : e.regen
              ] }),
              de ? /* @__PURE__ */ t("span", { className: "bs", style: { color: "#f87171", fontSize: 11 }, children: de }) : null
            ] }),
            /* @__PURE__ */ r("div", { className: "stats2", children: [
              /* @__PURE__ */ r("button", { type: "button", ref: Me, className: "st sched", title: e.schedTitle, onClick: ft, children: [
                /* @__PURE__ */ t("b", { children: pe.time }),
                " ",
                it
              ] }),
              /* @__PURE__ */ r("span", { className: "st", children: [
                /* @__PURE__ */ t("b", { children: Br(u) }),
                e.bannerAccounts
              ] }),
              /* @__PURE__ */ r("span", { className: "st", children: [
                /* @__PURE__ */ r("b", { children: [
                  V,
                  "/",
                  ut.length
                ] }),
                e.bannerApps
              ] }),
              /* @__PURE__ */ r("span", { className: "st", children: [
                /* @__PURE__ */ t("b", { children: u.spaces.length }),
                e.bannerSpaces
              ] })
            ] })
          ] }),
          we ? /* @__PURE__ */ r("div", { className: "schedpop", ref: tt, style: { left: gt }, children: [
            /* @__PURE__ */ t("h4", { children: e.schedTitle }),
            /* @__PURE__ */ r("label", { style: { display: "flex", gap: 8, alignItems: "center", fontSize: 12 }, children: [
              e.schedTime,
              /* @__PURE__ */ t("select", { value: pe.time.slice(0, 2), onChange: (c) => Ye({ ...pe, time: c.target.value + ":" + pe.time.slice(3, 5) }), children: Array.from({ length: 24 }, (c, w) => String(w).padStart(2, "0")).map((c) => /* @__PURE__ */ t("option", { value: c, children: c }, c)) }),
              ":",
              /* @__PURE__ */ t("select", { value: pe.time.slice(3, 5), onChange: (c) => Ye({ ...pe, time: pe.time.slice(0, 2) + ":" + c.target.value }), children: Array.from({ length: 12 }, (c, w) => String(w * 5).padStart(2, "0")).concat(/^\d\d$/.test(pe.time.slice(3, 5)) && Number(pe.time.slice(3, 5)) % 5 ? [pe.time.slice(3, 5)] : []).map((c) => /* @__PURE__ */ t("option", { value: c, children: c }, c)) })
            ] }),
            /* @__PURE__ */ t("div", { className: "days", children: [1, 2, 3, 4, 5, 6, 7].map((c) => /* @__PURE__ */ t("button", { className: pe.days.includes(c) ? "on" : "", onClick: () => {
              const w = pe.days.includes(c);
              w && pe.days.length === 1 || Ye({ ...pe, days: w ? pe.days.filter((H) => H !== c) : [...pe.days, c] });
            }, children: ht(c) }, c)) }),
            /* @__PURE__ */ t("p", { children: e.schedHint })
          ] }) : null
        ] }),
        /* @__PURE__ */ t("div", { className: "swap page", children: /* @__PURE__ */ t("div", { className: "pageswap", children: o === "connessioni" ? /* @__PURE__ */ t(Xr, {}) : /* @__PURE__ */ t(Kr, {}) }, o) }, o),
        /* @__PURE__ */ t("div", { ref: It, className: "foot" + (N ? " hide" : ""), children: o === "oggi" && u.brief ? /* @__PURE__ */ r(Xe, { children: [
          /* @__PURE__ */ t("span", { children: e.footMade }),
          Ce.length === 0 ? /* @__PURE__ */ t("span", { className: "s", children: e.footApps }) : null,
          Ce.map(({ key: c, name: w, Icon: H, color: ae }, $e) => /* @__PURE__ */ r("span", { className: "s", children: [
            /* @__PURE__ */ t(H, { size: 14, style: { color: ae } }),
            w,
            $e < Ce.length - 1 ? " ·" : ""
          ] }, c))
        ] }) : null })
      ]
    }
  );
}
export {
  hi as default
};
