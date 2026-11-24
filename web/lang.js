// Testi della pagina di configurazione in tutte le lingue di Alba (it, en, es, fr, de, pt).
window.ALBA_L = {
 "it": {
  "title": "Collega i tuoi account",
  "sub": "Tutto da questa pagina, passo dopo passo. I link si aprono in schede nuove: torna qui quando hai finito.",
  "safe": "I valori che incolli vanno dritti al deposito segreti del sistema e non passano mai dalla chat o dall’agente.",
  "expired": "Sessione scaduta: riapri questa pagina dal pulsante Collega di Alba.",
  "connect": "Collega",
  "connected": "Collegato",
  "todo": "Da collegare",
  "ok": "Collegato",
  "bad": "Non riuscito",
  "copy": "Copia",
  "copied": "Copiato",
  "done": "Fatto",
  "undone": "Da fare",
  "open": "Apri",
  "slack": {
   "tabToken": "Token (API)",
   "tabBot": "Slackbot (riepilogo)",
   "botSteps": [
    "Premi il pulsante: Slack si apre nel browser di Crew. Accedi allo spazio.",
    "Apri la chat con Slackbot (barra a sinistra, sotto “Apps”) e copia l’indirizzo dalla barra del browser.",
    "Torna qui e incollalo nel campo."
   ],
   "botOpen": "Apri Slack in Crew",
   "botSent": "Richiesta inviata: guarda il browser di Crew.",
   "botPh": "Indirizzo della chat con Slackbot (https://app.slack.com/client/…)",
   "botSave": "Salva",
   "botNote": "Alba chiede ogni giorno a Slackbot un riepilogo dei canali e lo legge: nessun canale viene aperto, quindi nulla risulta letto. Serve che Slackbot sappia riassumere nel tuo spazio. Funziona per gli spazi dove non puoi creare un’app.",
   "steps": [
    "Apri “Crea app” su Slack, scegli “From a manifest” e il tuo workspace.",
    "Incolla il manifesto qui sotto (è solo lettura) e premi Crea.",
    "Premi “Install to Workspace” e conferma. Se Slack chiede l’approvazione dell’amministratore, attendila.",
    "In “OAuth & Permissions” copia il “User OAuth Token” (inizia con xoxp-) e incollalo qui sotto."
   ],
   "link": "Apri Slack · Crea app",
   "mlabel": "Manifesto",
   "ph": "User OAuth Token (xoxp-…)",
   "save": "Salva e verifica",
   "saving": "Verifica in corso…",
   "note": "Alba legge solo le menzioni e i messaggi diretti, e permette all’agente di cercare, in sola lettura."
  },
  "browser": {
   "steps": [
    "Premi il pulsante qui sotto: Alba apre la pagina di accesso nel browser di Crew. Accedi lì.",
    "Quando vedi la tua area, torna su Alba: controlla l’accesso da sola ogni mattina e ti avvisa se scade."
   ],
   "link": "Apri la pagina di accesso in Crew",
   "sent": "Richiesta inviata ad Alba: guarda il browser di Crew.",
   "note": "Niente da incollare: Alba legge la pagina con la sessione del browser di Crew."
  },
  "jira": {
   "steps": [
    "Scrivi l’indirizzo del tuo sito Atlassian.",
    "Apri la pagina dei token API e premi “Crea API token” (non la versione “con ambiti”): ti dà accesso sia a Jira sia a Confluence con lo stesso token.",
    "Scrivi la tua email Atlassian e incolla il token qui sotto."
   ],
   "link": "Apri la pagina dei token API",
   "phUrl": "https://tuodominio.atlassian.net",
   "phEmail": "La tua email Atlassian",
   "ph": "Token API",
   "save": "Salva e verifica",
   "saving": "Verifica in corso…",
   "note": "Alba legge solo le issue assegnate a te."
  },
  "confluence": {
   "steps": [
    "Scrivi l’indirizzo del tuo sito Atlassian.",
    "Apri la pagina dei token API e premi “Crea API token” (non la versione “con ambiti”): ti dà accesso sia a Jira sia a Confluence con lo stesso token.",
    "Scrivi la tua email Atlassian e incolla il token qui sotto."
   ],
   "link": "Apri la pagina dei token API",
   "phUrl": "https://tuodominio.atlassian.net",
   "phEmail": "La tua email Atlassian",
   "ph": "Token API",
   "save": "Salva e verifica",
   "saving": "Verifica in corso…",
   "note": "Alba legge solo le pagine che osservi, modificate di recente."
  },
  "youtrack": {
   "steps": [
    "Scrivi l’indirizzo della tua istanza.",
    "Apri la pagina dei token e crea un token permanente (in sola lettura se puoi).",
    "Incollalo qui sotto."
   ],
   "link": "Apri la pagina dei token",
   "phUrl": "https://nome.youtrack.cloud",
   "ph": "Token permanente",
   "save": "Salva e verifica",
   "saving": "Verifica in corso…",
   "note": "Alba legge solo le issue assegnate a te."
  },
  "google": {
   "prepTitle": "Prepara Google",
   "prepIntro": "Una volta sola, circa 5 minuti: crei una tua “app” gratuita su Google Cloud. Ogni passo ha il link e i valori da copiare. Serve un'app diversa per ogni profilo: così restano isolati, e un problema su uno non tocca gli altri.",
   "steps": [
    {
     "t": "Crea un progetto",
     "d": "Nel modulo, dagli il nome qui sotto. Lascia “Organizzazione” e “Risorsa padre” su “Nessuna organizzazione” e premi Crea.",
     "link": "projectcreate",
     "ll": "Apri “Nuovo progetto”",
     "copies": [
      [
       "Nome progetto",
       "Alba"
      ]
     ]
    },
    {
     "t": "Abilita le quattro API",
     "d": "Su ciascuna pagina premi il pulsante blu “Abilita”. Se dice già “Gestisci”, è a posto.",
     "apis": true
    },
    {
     "t": "Schermata di consenso",
     "d": "Premi “Inizia”: Google ti guida in 4 sottopassi. Ecco cosa scegliere in ciascuno.",
     "link": "consent",
     "ll": "Apri la schermata di consenso",
     "sub": [
      {
       "t": "Informazioni sull’app",
       "d": "Nome applicazione: Alba. Come “Email per assistenza utenti” scegli il tuo indirizzo. Poi Avanti.",
       "copies": [
        [
         "Nome applicazione",
         "Alba"
        ]
       ],
       "mails": true
      },
      {
       "t": "Pubblico",
       "d": "Scegli “Esterno” (è quello giusto per un Gmail personale; “Interno” esiste solo con un’organizzazione Google Workspace). Poi Avanti."
      },
      {
       "t": "Dati di contatto",
       "d": "Incolla il tuo indirizzo email e premi Avanti.",
       "mails": true
      },
      {
       "t": "Fine",
       "d": "Spunta “Accetto le Norme sui dati utente dei servizi API di Google”, poi Continua e Crea."
      },
      {
       "t": "Utenti di prova",
       "d": "Finito il procedimento: menu a sinistra › Pubblico › Utenti di prova › Aggiungi utenti. Aggiungi questi indirizzi e Salva.",
       "mails": true
      }
     ]
    },
    {
     "t": "Crea l’ID client",
     "d": "Si apre “Crea ID client OAuth”. Ecco cosa fare, in ordine.",
     "link": "client",
     "ll": "Apri “Crea ID client”",
     "sub": [
      {
       "t": "Tipo di applicazione",
       "d": "Apri il menu e scegli “Applicazione desktop”: è l’ultima voce della lista, sotto “TV e dispositivi di immissione limitata”. Non scegliere “Applicazione web”."
      },
      {
       "t": "Nome",
       "d": "Scrivi il nome qui sotto.",
       "copies": [
        [
         "Nome",
         "Alba"
        ]
       ]
      },
      {
       "t": "Casella “agente basato sull’AI”",
       "d": "Lascia NON spuntata “Utilizza questo client per un agente basato sull’AI”: serve solo per il server MCP di Google, mentre Alba usa le normali API di Gmail, Calendar e Drive."
      },
      {
       "t": "Crea",
       "d": "Premi Crea. Google avvisa che le impostazioni possono richiedere da cinque minuti a qualche ora per attivarsi: di solito bastano pochi minuti. Compare una finestra con “ID client” (finisce con .apps.googleusercontent.com) e “Segreto client”: tienila aperta, ti servono al prossimo passo."
      }
     ]
    },
    {
     "t": "Incolla ID e segreto",
     "d": "Copia i due valori dalla finestra di Google e incollali qui sotto.",
     "paste": true
    }
   ],
   "tester": "Utente di prova",
   "apis": [
    "Gmail API",
    "Google Calendar API",
    "Google Drive API",
    "Google Chat API"
   ],
   "phId": "ID client (…apps.googleusercontent.com)",
   "phSecret": "Segreto client",
   "save": "Salva",
   "saved": "Salvato. Ora accedi con ciascun account qui sotto.",
   "warn": "L'app resta “in fase di test”: ogni account Google va aggiunto come “Utente di prova” qui sopra, e al primo accesso comparirà un avviso “app non verificata” — premi Avanzate poi “Vai su Alba (non sicuro)”, è normale. Non serve pubblicarla.",
   "loginNote": "Alba chiede solo la lettura.",
   "login": "Accedi con Google",
   "needClient": "Prima completa “Prepara Google” qui sopra.",
   "waiting": "In attesa dell’accesso nella scheda di Google…",
   "progress": "passi completati"
  },
  "err": {
   "session": "Sessione scaduta: riapri la pagina da Alba.",
   "rejected": "{app} ha rifiutato le credenziali.",
   "unreachable": "{app} non è raggiungibile.",
   "http": "{app} ha risposto HTTP {detail}.",
   "slack_fmt": "Il token utente di Slack inizia con xoxp-.",
   "yt_url": "L’indirizzo deve essere del tipo https://nome.youtrack.cloud.",
   "no_token": "Manca il token.",
   "bad_client": "ID client o segreto non validi.",
   "gh_fine": "GitHub: serve un token classico (i token a grana fine non leggono le notifiche).",
   "gh_scope": "GitHub: al token manca il permesso “notifications”.",
   "ms_clientid": "L’ID applicazione Microsoft è un codice di 36 caratteri.",
   "ms": "Microsoft: {detail}",
   "oauth_client": "Manca l’app Google: completa prima “Prepara Google”.",
   "oauth_expired": "Richiesta scaduta: riprova dal pulsante di accesso.",
   "oauth_nopermanent": "Google non ha restituito un accesso duraturo: riprova.",
   "cancelled": "Accesso annullato.",
   "unsupported": "Questa app si legge dal browser: non c’è nulla da salvare."
  }
 },
 "en": {
  "title": "Connect your accounts",
  "sub": "Everything from this page, step by step. Links open in new tabs: come back here when you are done.",
  "safe": "The values you paste go straight to the system secret store and never pass through chat or the agent.",
  "expired": "Session expired: reopen this page from the Connect button in Alba.",
  "connect": "Connect",
  "connected": "Connected",
  "todo": "To connect",
  "ok": "Connected",
  "bad": "Failed",
  "copy": "Copy",
  "copied": "Copied",
  "done": "Done",
  "undone": "To do",
  "open": "Open",
  "slack": {
   "tabToken": "Token (API)",
   "tabBot": "Slackbot (recap)",
   "botSteps": [
    "Press the button: Slack opens in Crew’s browser. Sign in to the workspace.",
    "Open the Slackbot chat (left sidebar, under “Apps”) and copy the address from the browser bar.",
    "Come back here and paste it in the field."
   ],
   "botOpen": "Open Slack in Crew",
   "botSent": "Request sent: look at Crew’s browser.",
   "botPh": "Slackbot chat address (https://app.slack.com/client/…)",
   "botSave": "Save",
   "botNote": "Every day Alba asks Slackbot for a recap of your channels and reads it: no channel is opened, so nothing is marked read. Slackbot must be able to summarize in your workspace. Use it where you cannot create an app.",
   "steps": [
    "Open “Create app” on Slack, choose “From a manifest” and your workspace.",
    "Paste the manifest below (read-only) and press Create.",
    "Press “Install to Workspace” and confirm. If Slack asks for admin approval, wait for it.",
    "Under “OAuth & Permissions” copy the “User OAuth Token” (starts with xoxp-) and paste it below."
   ],
   "link": "Open Slack · Create app",
   "mlabel": "Manifest",
   "ph": "User OAuth Token (xoxp-…)",
   "save": "Save and verify",
   "saving": "Verifying…",
   "note": "Alba only reads mentions and direct messages, and lets the agent search, read-only."
  },
  "browser": {
   "steps": [
    "Press the button below: Alba opens the sign-in page in Crew’s browser. Sign in there.",
    "When you see your area, come back to Alba: it checks the sign-in by itself every morning and warns you if it expires."
   ],
   "link": "Open the sign-in page in Crew",
   "sent": "Request sent to Alba: look at Crew’s browser.",
   "note": "Nothing to paste: Alba reads the page with the session of Crew’s browser."
  },
  "jira": {
   "steps": [
    "Write your Atlassian site address.",
    "Open the API tokens page and press “Create API token” (not the “with scopes” version): it gives you access to both Jira and Confluence with the same token.",
    "Write your Atlassian email and paste the token below."
   ],
   "link": "Open the API tokens page",
   "phUrl": "https://yourdomain.atlassian.net",
   "phEmail": "Your Atlassian email",
   "ph": "API token",
   "save": "Save and verify",
   "saving": "Verifying…",
   "note": "Alba only reads issues assigned to you."
  },
  "confluence": {
   "steps": [
    "Write your Atlassian site address.",
    "Open the API tokens page and press “Create API token” (not the “with scopes” version): it gives you access to both Jira and Confluence with the same token.",
    "Write your Atlassian email and paste the token below."
   ],
   "link": "Open the API tokens page",
   "phUrl": "https://yourdomain.atlassian.net",
   "phEmail": "Your Atlassian email",
   "ph": "API token",
   "save": "Save and verify",
   "saving": "Verifying…",
   "note": "Alba only reads pages you watch that were recently edited."
  },
  "youtrack": {
   "steps": [
    "Type the address of your instance.",
    "Open the tokens page and create a permanent token (read-only if you can).",
    "Paste it below."
   ],
   "link": "Open the tokens page",
   "phUrl": "https://name.youtrack.cloud",
   "ph": "Permanent token",
   "save": "Save and verify",
   "saving": "Verifying…",
   "note": "Alba only reads the issues assigned to you."
  },
  "google": {
   "prepTitle": "Prepare Google",
   "prepIntro": "Once only, about 5 minutes: you create your own free “app” on Google Cloud. Every step has the link and the values to copy. You need a separate app for each profile: that way they stay isolated, and a problem on one never touches the others.",
   "steps": [
    {
     "t": "Create a project",
     "d": "In the form, give it the name below. Leave “Organization” and “Parent resource” on “No organization” and press Create.",
     "link": "projectcreate",
     "ll": "Open “New project”",
     "copies": [
      [
       "Project name",
       "Alba"
      ]
     ]
    },
    {
     "t": "Enable the four APIs",
     "d": "On each page press the blue “Enable” button. If it already says “Manage”, you are set.",
     "apis": true
    },
    {
     "t": "Consent screen",
     "d": "Press “Get started”: Google guides you through 4 sub-steps. Here is what to pick in each.",
     "link": "consent",
     "ll": "Open the consent screen",
     "sub": [
      {
       "t": "App information",
       "d": "App name: Alba. For “User support email” pick your address. Then Next.",
       "copies": [
        [
         "App name",
         "Alba"
        ]
       ],
       "mails": true
      },
      {
       "t": "Audience",
       "d": "Choose “External” (right for a personal Gmail; “Internal” only exists with a Google Workspace organization). Then Next."
      },
      {
       "t": "Contact information",
       "d": "Paste your email address and press Next.",
       "mails": true
      },
      {
       "t": "Finish",
       "d": "Tick “I agree to the Google API Services User Data Policy”, then Continue and Create."
      },
      {
       "t": "Test users",
       "d": "When it is done: left menu › Audience › Test users › Add users. Add these addresses and Save.",
       "mails": true
      }
     ]
    },
    {
     "t": "Create the client ID",
     "d": "The “Create OAuth client ID” page opens. Here is what to do, in order.",
     "link": "client",
     "ll": "Open “Create client ID”",
     "sub": [
      {
       "t": "Application type",
       "d": "Open the menu and choose “Desktop app”: it is the last item in the list, below “TVs and Limited Input devices”. Do not choose “Web application”."
      },
      {
       "t": "Name",
       "d": "Type the name below.",
       "copies": [
        [
         "Name",
         "Alba"
        ]
       ]
      },
      {
       "t": "“AI-powered agent” checkbox",
       "d": "Leave “Use this client for an AI-powered agent” UNCHECKED: it is only for Google’s MCP server, while Alba uses the regular Gmail, Calendar and Drive APIs."
      },
      {
       "t": "Create",
       "d": "Press Create. Google warns the settings can take from five minutes to a few hours to take effect: usually a few minutes are enough. A window shows the “Client ID” (ends with .apps.googleusercontent.com) and the “Client secret”: keep it open, you need them in the next step."
      }
     ]
    },
    {
     "t": "Paste the ID and secret",
     "d": "Copy the two values from the Google window and paste them below.",
     "paste": true
    }
   ],
   "tester": "Test user",
   "apis": [
    "Gmail API",
    "Google Calendar API",
    "Google Drive API",
    "Google Chat API"
   ],
   "phId": "Client ID (…apps.googleusercontent.com)",
   "phSecret": "Client secret",
   "save": "Save",
   "saved": "Saved. Now sign in with each account below.",
   "warn": "The app stays “in testing”: every Google account must be added as a “Test user” above, and the first sign-in will show an “unverified app” warning — press Advanced, then “Go to Alba (unsafe)”, that is normal. You do not need to publish it.",
   "loginNote": "Alba only asks to read.",
   "login": "Sign in with Google",
   "needClient": "First complete “Prepare Google” above.",
   "waiting": "Waiting for the sign-in in the Google tab…",
   "progress": "steps completed"
  },
  "err": {
   "session": "Session expired: reopen this page from Alba.",
   "rejected": "{app} rejected the credentials.",
   "unreachable": "{app} is not reachable.",
   "http": "{app} answered HTTP {detail}.",
   "slack_fmt": "The Slack user token starts with xoxp-.",
   "yt_url": "The address must look like https://name.youtrack.cloud.",
   "no_token": "The token is missing.",
   "bad_client": "Client ID or secret not valid.",
   "gh_fine": "GitHub: a classic token is needed (fine-grained tokens cannot read notifications).",
   "gh_scope": "GitHub: the token lacks the “notifications” permission.",
   "ms_clientid": "The Microsoft application ID is a 36-character code.",
   "ms": "Microsoft: {detail}",
   "oauth_client": "The Google app is missing: complete “Prepare Google” first.",
   "oauth_expired": "Request expired: try again from the sign-in button.",
   "oauth_nopermanent": "Google did not return lasting access: try again.",
   "cancelled": "Sign-in cancelled.",
   "unsupported": "This app is read from the browser: there is nothing to save."
  }
 },
 "es": {
  "title": "Conecta tus cuentas",
  "sub": "Todo desde esta página, paso a paso. Los enlaces se abren en pestañas nuevas: vuelve aquí cuando termines.",
  "safe": "Los valores que pegas van directamente al almacén de secretos del sistema y nunca pasan por el chat ni por el agente.",
  "expired": "Sesión caducada: vuelve a abrir esta página desde el botón Conectar de Alba.",
  "connect": "Conectar",
  "connected": "Conectado",
  "todo": "Por conectar",
  "ok": "Conectado",
  "bad": "No se pudo",
  "copy": "Copiar",
  "copied": "Copiado",
  "done": "Hecho",
  "undone": "Por hacer",
  "open": "Abrir",
  "slack": {
   "tabToken": "Token (API)",
   "tabBot": "Slackbot (resumen)",
   "botSteps": [
    "Pulsa el botón: Slack se abre en el navegador de Crew. Inicia sesión en el espacio.",
    "Abre el chat con Slackbot (barra izquierda, bajo «Apps») y copia la dirección de la barra del navegador.",
    "Vuelve aquí y pégala en el campo."
   ],
   "botOpen": "Abrir Slack en Crew",
   "botSent": "Solicitud enviada: mira el navegador de Crew.",
   "botPh": "Dirección del chat con Slackbot (https://app.slack.com/client/…)",
   "botSave": "Guardar",
   "botNote": "Cada día Alba pide a Slackbot un resumen de tus canales y lo lee: no se abre ningún canal, así que nada se marca como leído. Slackbot debe poder resumir en tu espacio. Úsalo donde no puedes crear una app.",
   "steps": [
    "Abre «Create app» en Slack, elige «From a manifest» y tu espacio de trabajo.",
    "Pega el manifiesto de abajo (solo lectura) y pulsa Create.",
    "Pulsa «Install to Workspace» y confirma. Si Slack pide la aprobación de un administrador, espérala.",
    "En «OAuth & Permissions» copia el «User OAuth Token» (empieza por xoxp-) y pégalo abajo."
   ],
   "link": "Abrir Slack · Create app",
   "mlabel": "Manifiesto",
   "ph": "User OAuth Token (xoxp-…)",
   "save": "Guardar y verificar",
   "saving": "Verificando…",
   "note": "Alba solo lee menciones y mensajes directos, y deja que el agente busque, en solo lectura."
  },
  "browser": {
   "steps": [
    "Pulsa el botón de abajo: Alba abre la página de acceso en el navegador de Crew. Inicia sesión allí.",
    "Cuando veas tu área, vuelve a Alba: comprueba el acceso sola cada mañana y te avisa si caduca."
   ],
   "link": "Abrir la página de acceso en Crew",
   "sent": "Solicitud enviada a Alba: mira el navegador de Crew.",
   "note": "Nada que pegar: Alba lee la página con la sesión del navegador de Crew."
  },
  "jira": {
   "steps": [
    "Escribe la dirección de tu sitio Atlassian.",
    "Abre la página de tokens API y pulsa “Crear token de API” (no la versión “con ámbitos”): da acceso tanto a Jira como a Confluence con el mismo token.",
    "Escribe tu email de Atlassian y pega el token abajo."
   ],
   "link": "Abrir la página de tokens API",
   "phUrl": "https://tudominio.atlassian.net",
   "phEmail": "Tu email de Atlassian",
   "ph": "Token API",
   "save": "Guardar y verificar",
   "saving": "Verificando…",
   "note": "Alba solo lee las incidencias asignadas a ti."
  },
  "confluence": {
   "steps": [
    "Escribe la dirección de tu sitio Atlassian.",
    "Abre la página de tokens API y pulsa “Crear token de API” (no la versión “con ámbitos”): da acceso tanto a Jira como a Confluence con el mismo token.",
    "Escribe tu email de Atlassian y pega el token abajo."
   ],
   "link": "Abrir la página de tokens API",
   "phUrl": "https://tudominio.atlassian.net",
   "phEmail": "Tu email de Atlassian",
   "ph": "Token API",
   "save": "Guardar y verificar",
   "saving": "Verificando…",
   "note": "Alba solo lee las páginas que observas, editadas recientemente."
  },
  "youtrack": {
   "steps": [
    "Escribe la dirección de tu instancia.",
    "Abre la página de tokens y crea un token permanente (de solo lectura si puedes).",
    "Pégalo abajo."
   ],
   "link": "Abrir la página de tokens",
   "phUrl": "https://name.youtrack.cloud",
   "ph": "Token permanente",
   "save": "Guardar y verificar",
   "saving": "Verificando…",
   "note": "Alba solo lee las incidencias asignadas a ti."
  },
  "google": {
   "prepTitle": "Prepara Google",
   "prepIntro": "Una sola vez, unos 5 minutos: creas tu propia «app» gratuita en Google Cloud. Cada paso tiene el enlace y los valores para copiar. Necesitas una app distinta para cada perfil: así quedan aislados, y un problema en uno nunca afecta a los demás.",
   "steps": [
    {
     "t": "Crea un proyecto",
     "d": "En el formulario, ponle el nombre de abajo. Deja «Organización» y «Recurso superior» en «Sin organización» y pulsa Crear.",
     "link": "projectcreate",
     "ll": "Abrir «Proyecto nuevo»",
     "copies": [
      [
       "Nombre del proyecto",
       "Alba"
      ]
     ]
    },
    {
     "t": "Habilita las cuatro API",
     "d": "En cada página pulsa el botón azul «Habilitar». Si ya dice «Administrar», está listo.",
     "apis": true
    },
    {
     "t": "Pantalla de consentimiento",
     "d": "Pulsa «Comenzar»: Google te guía en 4 subpasos. Esto es lo que debes elegir en cada uno.",
     "link": "consent",
     "ll": "Abrir la pantalla de consentimiento",
     "sub": [
      {
       "t": "Información de la aplicación",
       "d": "Nombre de la aplicación: Alba. En «Correo de asistencia del usuario» elige tu dirección. Luego Siguiente.",
       "copies": [
        [
         "Nombre de la aplicación",
         "Alba"
        ]
       ],
       "mails": true
      },
      {
       "t": "Público",
       "d": "Elige «Externo» (es lo correcto para un Gmail personal; «Interno» solo existe con una organización de Google Workspace). Luego Siguiente."
      },
      {
       "t": "Datos de contacto",
       "d": "Pega tu dirección de correo y pulsa Siguiente.",
       "mails": true
      },
      {
       "t": "Finalizar",
       "d": "Marca «Acepto la Política de datos de usuario de los servicios de API de Google», luego Continuar y Crear."
      },
      {
       "t": "Usuarios de prueba",
       "d": "Cuando termine: menú de la izquierda › Público › Usuarios de prueba › Añadir usuarios. Añade estas direcciones y Guarda.",
       "mails": true
      }
     ]
    },
    {
     "t": "Crea el ID de cliente",
     "d": "Se abre la página «Crear ID de cliente de OAuth». Esto es lo que debes hacer, en orden.",
     "link": "client",
     "ll": "Abrir «Crear ID de cliente»",
     "sub": [
      {
       "t": "Tipo de aplicación",
       "d": "Abre el menú y elige «Aplicación de escritorio»: es el último elemento de la lista, debajo de «TV y dispositivos de entrada limitada». No elijas «Aplicación web»."
      },
      {
       "t": "Nombre",
       "d": "Escribe el nombre de abajo.",
       "copies": [
        [
         "Nombre",
         "Alba"
        ]
       ]
      },
      {
       "t": "Casilla «agente basado en IA»",
       "d": "Deja SIN marcar «Usar este cliente para un agente basado en IA»: es solo para el servidor MCP de Google, mientras que Alba usa las API normales de Gmail, Calendar y Drive."
      },
      {
       "t": "Crear",
       "d": "Pulsa Crear. Google avisa de que los ajustes pueden tardar de cinco minutos a unas horas en activarse: normalmente bastan unos minutos. Una ventana muestra el «ID de cliente» (termina en .apps.googleusercontent.com) y el «Secreto del cliente»: déjala abierta, los necesitas en el paso siguiente."
      }
     ]
    },
    {
     "t": "Pega el ID y el secreto",
     "d": "Copia los dos valores de la ventana de Google y pégalos abajo.",
     "paste": true
    }
   ],
   "tester": "Usuario de prueba",
   "apis": [
    "API de Gmail",
    "API de Google Calendar",
    "API de Google Drive",
    "Google Chat API"
   ],
   "phId": "ID de cliente (…apps.googleusercontent.com)",
   "phSecret": "Secreto del cliente",
   "save": "Guardar",
   "saved": "Guardado. Ahora inicia sesión con cada cuenta de abajo.",
   "warn": "La app se queda “en fase de prueba”: cada cuenta de Google debe añadirse como “Usuario de prueba” arriba, y en el primer inicio de sesión aparecerá un aviso de “app no verificada” — pulsa Avanzado y luego “Ir a Alba (no seguro)”, es normal. No hace falta publicarla.",
   "loginNote": "Alba solo pide leer.",
   "login": "Iniciar sesión con Google",
   "needClient": "Antes completa «Prepara Google» más arriba.",
   "waiting": "Esperando el inicio de sesión en la pestaña de Google…",
   "progress": "pasos completados"
  },
  "err": {
   "session": "Sesión caducada: vuelve a abrir la página desde Alba.",
   "rejected": "{app} rechazó las credenciales.",
   "unreachable": "{app} no está disponible.",
   "http": "{app} respondió HTTP {detail}.",
   "slack_fmt": "El token de usuario de Slack empieza por xoxp-.",
   "yt_url": "La dirección debe ser del tipo https://nombre.youtrack.cloud.",
   "no_token": "Falta el token.",
   "bad_client": "ID de cliente o secreto no válidos.",
   "gh_fine": "GitHub: hace falta un token clásico (los tokens de grano fino no leen las notificaciones).",
   "gh_scope": "GitHub: al token le falta el permiso «notifications».",
   "ms_clientid": "El ID de aplicación de Microsoft es un código de 36 caracteres.",
   "ms": "Microsoft: {detail}",
   "oauth_client": "Falta la app de Google: completa antes «Prepara Google».",
   "oauth_expired": "Solicitud caducada: inténtalo de nuevo desde el botón de acceso.",
   "oauth_nopermanent": "Google no devolvió un acceso duradero: inténtalo de nuevo.",
   "cancelled": "Inicio de sesión cancelado.",
   "unsupported": "Esta app se lee desde el navegador: no hay nada que guardar."
  }
 },
 "fr": {
  "title": "Connectez vos comptes",
  "sub": "Tout se fait depuis cette page, pas à pas. Les liens s’ouvrent dans de nouveaux onglets : revenez ici quand vous avez terminé.",
  "safe": "Les valeurs que vous collez vont directement dans le coffre de secrets du système et ne passent jamais par le chat ni par l’agent.",
  "expired": "Session expirée : rouvrez cette page depuis le bouton Connecter d’Alba.",
  "connect": "Connecter",
  "connected": "Connecté",
  "todo": "À connecter",
  "ok": "Connecté",
  "bad": "Échec",
  "copy": "Copier",
  "copied": "Copié",
  "done": "Fait",
  "undone": "À faire",
  "open": "Ouvrir",
  "slack": {
   "tabToken": "Jeton (API)",
   "tabBot": "Slackbot (résumé)",
   "botSteps": [
    "Appuie sur le bouton : Slack s’ouvre dans le navigateur de Crew. Connecte-toi à l’espace.",
    "Ouvre la conversation avec Slackbot (barre de gauche, sous « Apps ») et copie l’adresse de la barre du navigateur.",
    "Reviens ici et colle-la dans le champ."
   ],
   "botOpen": "Ouvrir Slack dans Crew",
   "botSent": "Demande envoyée : regarde le navigateur de Crew.",
   "botPh": "Adresse de la conversation avec Slackbot (https://app.slack.com/client/…)",
   "botSave": "Enregistrer",
   "botNote": "Chaque jour Alba demande à Slackbot un résumé de tes canaux et le lit : aucun canal n’est ouvert, donc rien n’est marqué comme lu. Slackbot doit savoir résumer dans ton espace. À utiliser là où tu ne peux pas créer d’app.",
   "steps": [
    "Ouvrez « Create app » sur Slack, choisissez « From a manifest » et votre espace de travail.",
    "Collez le manifeste ci-dessous (lecture seule) et appuyez sur Create.",
    "Appuyez sur « Install to Workspace » et confirmez. Si Slack demande l’approbation d’un administrateur, attendez-la.",
    "Dans « OAuth & Permissions », copiez le « User OAuth Token » (il commence par xoxp-) et collez-le ci-dessous."
   ],
   "link": "Ouvrir Slack · Create app",
   "mlabel": "Manifeste",
   "ph": "User OAuth Token (xoxp-…)",
   "save": "Enregistrer et vérifier",
   "saving": "Vérification…",
   "note": "Alba lit seulement les mentions et les messages privés, et laisse l’agent chercher, en lecture seule."
  },
  "browser": {
   "steps": [
    "Appuyez sur le bouton ci-dessous : Alba ouvre la page de connexion dans le navigateur de Crew. Connectez-vous là-bas.",
    "Quand vous voyez votre espace, revenez à Alba : elle vérifie seule la connexion chaque matin et vous prévient si elle expire."
   ],
   "link": "Ouvrir la page de connexion dans Crew",
   "sent": "Demande envoyée à Alba : regardez le navigateur de Crew.",
   "note": "Rien à coller : Alba lit la page avec la session du navigateur de Crew."
  },
  "jira": {
   "steps": [
    "Écris l’adresse de ton site Atlassian.",
    "Ouvrez la page des jetons API et cliquez sur « Créer un jeton API » (pas la version « avec portées ») : il donne accès à Jira et à Confluence avec le même jeton.",
    "Écris ton email Atlassian et colle le jeton ci-dessous."
   ],
   "link": "Ouvrir la page des jetons API",
   "phUrl": "https://tondomaine.atlassian.net",
   "phEmail": "Ton email Atlassian",
   "ph": "Jeton API",
   "save": "Enregistrer et vérifier",
   "saving": "Vérification…",
   "note": "Alba ne lit que les tickets qui te sont assignés."
  },
  "confluence": {
   "steps": [
    "Écris l’adresse de ton site Atlassian.",
    "Ouvrez la page des jetons API et cliquez sur « Créer un jeton API » (pas la version « avec portées ») : il donne accès à Jira et à Confluence avec le même jeton.",
    "Écris ton email Atlassian et colle le jeton ci-dessous."
   ],
   "link": "Ouvrir la page des jetons API",
   "phUrl": "https://tondomaine.atlassian.net",
   "phEmail": "Ton email Atlassian",
   "ph": "Jeton API",
   "save": "Enregistrer et vérifier",
   "saving": "Vérification…",
   "note": "Alba ne lit que les pages que tu observes, modifiées récemment."
  },
  "youtrack": {
   "steps": [
    "Saisissez l’adresse de votre instance.",
    "Ouvrez la page des jetons et créez un jeton permanent (en lecture seule si possible).",
    "Collez-le ci-dessous."
   ],
   "link": "Ouvrir la page des jetons",
   "phUrl": "https://name.youtrack.cloud",
   "ph": "Jeton permanent",
   "save": "Enregistrer et vérifier",
   "saving": "Vérification…",
   "note": "Alba lit seulement les tickets qui vous sont assignés."
  },
  "google": {
   "prepTitle": "Préparer Google",
   "prepIntro": "Une seule fois, environ 5 minutes : vous créez votre propre « application » gratuite sur Google Cloud. Chaque étape a le lien et les valeurs à copier. Il faut une app différente pour chaque profil : ils restent ainsi isolés, et un problème sur l'un n'affecte jamais les autres.",
   "steps": [
    {
     "t": "Créer un projet",
     "d": "Dans le formulaire, donnez-lui le nom ci-dessous. Laissez « Organisation » et « Ressource parente » sur « Aucune organisation » et appuyez sur Créer.",
     "link": "projectcreate",
     "ll": "Ouvrir « Nouveau projet »",
     "copies": [
      [
       "Nom du projet",
       "Alba"
      ]
     ]
    },
    {
     "t": "Active les quatre API",
     "d": "Sur chaque page, appuyez sur le bouton bleu « Activer ». S’il indique déjà « Gérer », c’est bon.",
     "apis": true
    },
    {
     "t": "Écran de consentement",
     "d": "Appuyez sur « Commencer » : Google vous guide en 4 sous-étapes. Voici quoi choisir dans chacune.",
     "link": "consent",
     "ll": "Ouvrir l’écran de consentement",
     "sub": [
      {
       "t": "Informations sur l’application",
       "d": "Nom de l’application : Alba. Pour « Adresse e-mail d’assistance utilisateur », choisissez votre adresse. Puis Suivant.",
       "copies": [
        [
         "Nom de l’application",
         "Alba"
        ]
       ],
       "mails": true
      },
      {
       "t": "Public",
       "d": "Choisissez « Externe » (adapté à un Gmail personnel ; « Interne » n’existe qu’avec une organisation Google Workspace). Puis Suivant."
      },
      {
       "t": "Coordonnées",
       "d": "Collez votre adresse e-mail et appuyez sur Suivant.",
       "mails": true
      },
      {
       "t": "Terminer",
       "d": "Cochez « J’accepte les Règles relatives aux données utilisateur des services d’API Google », puis Continuer et Créer."
      },
      {
       "t": "Utilisateurs de test",
       "d": "Une fois terminé : menu de gauche › Public › Utilisateurs de test › Ajouter des utilisateurs. Ajoutez ces adresses et Enregistrez.",
       "mails": true
      }
     ]
    },
    {
     "t": "Créer l’ID client",
     "d": "La page « Créer un ID client OAuth » s’ouvre. Voici quoi faire, dans l’ordre.",
     "link": "client",
     "ll": "Ouvrir « Créer un ID client »",
     "sub": [
      {
       "t": "Type d’application",
       "d": "Ouvrez le menu et choisissez « Application de bureau » : c’est le dernier élément de la liste, sous « Téléviseurs et appareils à saisie limitée ». Ne choisissez pas « Application Web »."
      },
      {
       "t": "Nom",
       "d": "Saisissez le nom ci-dessous.",
       "copies": [
        [
         "Nom",
         "Alba"
        ]
       ]
      },
      {
       "t": "Case « agent basé sur l’IA »",
       "d": "Laissez DÉCOCHÉE « Utiliser ce client pour un agent basé sur l’IA » : elle ne sert que pour le serveur MCP de Google, alors qu’Alba utilise les API habituelles de Gmail, Calendar et Drive."
      },
      {
       "t": "Créer",
       "d": "Appuyez sur Créer. Google prévient que les réglages peuvent mettre de cinq minutes à quelques heures à s’appliquer : quelques minutes suffisent en général. Une fenêtre affiche l’« ID client » (il se termine par .apps.googleusercontent.com) et le « Code secret du client » : gardez-la ouverte, vous en avez besoin à l’étape suivante."
      }
     ]
    },
    {
     "t": "Collez l’ID et le secret",
     "d": "Copiez les deux valeurs de la fenêtre Google et collez-les ci-dessous.",
     "paste": true
    }
   ],
   "tester": "Utilisateur de test",
   "apis": [
    "API Gmail",
    "API Google Calendar",
    "API Google Drive",
    "Google Chat API"
   ],
   "phId": "ID client (…apps.googleusercontent.com)",
   "phSecret": "Code secret du client",
   "save": "Enregistrer",
   "saved": "Enregistré. Connectez-vous maintenant avec chaque compte ci-dessous.",
   "warn": "L'appli reste « en test » : chaque compte Google doit être ajouté comme « Utilisateur test » ci-dessus, et à la première connexion un avertissement « application non validée » s'affichera — cliquez sur Avancé puis « Accéder à Alba (dangereux) », c'est normal. Pas besoin de la publier.",
   "loginNote": "Alba demande uniquement à lire.",
   "login": "Se connecter avec Google",
   "needClient": "Terminez d’abord « Préparer Google » ci-dessus.",
   "waiting": "En attente de la connexion dans l’onglet Google…",
   "progress": "étapes terminées"
  },
  "err": {
   "session": "Session expirée : rouvrez la page depuis Alba.",
   "rejected": "{app} a refusé les identifiants.",
   "unreachable": "{app} est injoignable.",
   "http": "{app} a répondu HTTP {detail}.",
   "slack_fmt": "Le jeton utilisateur Slack commence par xoxp-.",
   "yt_url": "L’adresse doit ressembler à https://nom.youtrack.cloud.",
   "no_token": "Le jeton est manquant.",
   "bad_client": "ID client ou secret non valides.",
   "gh_fine": "GitHub : il faut un jeton classique (les jetons à granularité fine ne lisent pas les notifications).",
   "gh_scope": "GitHub : il manque l’autorisation « notifications » au jeton.",
   "ms_clientid": "L’ID d’application Microsoft est un code de 36 caractères.",
   "ms": "Microsoft : {detail}",
   "oauth_client": "L’application Google est absente : terminez d’abord « Préparer Google ».",
   "oauth_expired": "Demande expirée : réessayez depuis le bouton de connexion.",
   "oauth_nopermanent": "Google n’a pas renvoyé d’accès durable : réessayez.",
   "cancelled": "Connexion annulée.",
   "unsupported": "Cette application se lit depuis le navigateur : rien à enregistrer."
  }
 },
 "de": {
  "title": "Konten verbinden",
  "sub": "Alles von dieser Seite aus, Schritt für Schritt. Links öffnen sich in neuen Tabs: Kehre hierher zurück, wenn du fertig bist.",
  "safe": "Die eingefügten Werte gehen direkt in den Geheimnisspeicher des Systems und laufen nie über den Chat oder den Agenten.",
  "expired": "Sitzung abgelaufen: Öffne diese Seite erneut über die Schaltfläche Verbinden in Alba.",
  "connect": "Verbinden",
  "connected": "Verbunden",
  "todo": "Zu verbinden",
  "ok": "Verbunden",
  "bad": "Fehlgeschlagen",
  "copy": "Kopieren",
  "copied": "Kopiert",
  "done": "Erledigt",
  "undone": "Offen",
  "open": "Öffnen",
  "slack": {
   "tabToken": "Token (API)",
   "tabBot": "Slackbot (Zusammenfassung)",
   "botSteps": [
    "Drücke den Button: Slack öffnet sich im Browser von Crew. Melde dich im Workspace an.",
    "Öffne den Slackbot-Chat (linke Leiste, unter „Apps“) und kopiere die Adresse aus der Browserleiste.",
    "Komm hierher zurück und füge sie ins Feld ein."
   ],
   "botOpen": "Slack in Crew öffnen",
   "botSent": "Anfrage gesendet: sieh in den Browser von Crew.",
   "botPh": "Adresse des Slackbot-Chats (https://app.slack.com/client/…)",
   "botSave": "Speichern",
   "botNote": "Alba bittet Slackbot täglich um eine Zusammenfassung deiner Kanäle und liest sie: Es wird kein Kanal geöffnet, also wird nichts als gelesen markiert. Slackbot muss in deinem Workspace zusammenfassen können. Nutze das, wo du keine App erstellen kannst.",
   "steps": [
    "Öffne in Slack „Create app“, wähle „From a manifest“ und deinen Workspace.",
    "Füge das Manifest unten ein (nur Lesen) und klicke auf Create.",
    "Klicke auf „Install to Workspace“ und bestätige. Wenn Slack die Genehmigung eines Admins verlangt, warte darauf.",
    "Kopiere unter „OAuth & Permissions“ das „User OAuth Token“ (beginnt mit xoxp-) und füge es unten ein."
   ],
   "link": "Slack öffnen · Create app",
   "mlabel": "Manifest",
   "ph": "User OAuth Token (xoxp-…)",
   "save": "Speichern und prüfen",
   "saving": "Wird geprüft…",
   "note": "Alba liest nur Erwähnungen und Direktnachrichten und lässt den Agenten nur lesend suchen."
  },
  "browser": {
   "steps": [
    "Klicke auf die Schaltfläche unten: Alba öffnet die Anmeldeseite im Browser von Crew. Melde dich dort an.",
    "Wenn du deinen Bereich siehst, kehre zu Alba zurück: Sie prüft die Anmeldung jeden Morgen selbst und warnt dich, wenn sie abläuft."
   ],
   "link": "Anmeldeseite in Crew öffnen",
   "sent": "Anfrage an Alba gesendet: Schau in den Browser von Crew.",
   "note": "Nichts einzufügen: Alba liest die Seite mit der Sitzung des Crew-Browsers."
  },
  "jira": {
   "steps": [
    "Schreibe die Adresse deiner Atlassian-Seite.",
    "Öffne die API-Token-Seite und klicke auf „API-Token erstellen“ (nicht die Variante „mit Bereichen“): Er gibt dir mit demselben Token Zugriff auf Jira und Confluence.",
    "Schreibe deine Atlassian-E-Mail und füge den Token unten ein."
   ],
   "link": "API-Token-Seite öffnen",
   "phUrl": "https://deinedomain.atlassian.net",
   "phEmail": "Deine Atlassian-E-Mail",
   "ph": "API-Token",
   "save": "Speichern und prüfen",
   "saving": "Wird geprüft…",
   "note": "Alba liest nur dir zugewiesene Issues."
  },
  "confluence": {
   "steps": [
    "Schreibe die Adresse deiner Atlassian-Seite.",
    "Öffne die API-Token-Seite und klicke auf „API-Token erstellen“ (nicht die Variante „mit Bereichen“): Er gibt dir mit demselben Token Zugriff auf Jira und Confluence.",
    "Schreibe deine Atlassian-E-Mail und füge den Token unten ein."
   ],
   "link": "API-Token-Seite öffnen",
   "phUrl": "https://deinedomain.atlassian.net",
   "phEmail": "Deine Atlassian-E-Mail",
   "ph": "API-Token",
   "save": "Speichern und prüfen",
   "saving": "Wird geprüft…",
   "note": "Alba liest nur von dir beobachtete, kürzlich bearbeitete Seiten."
  },
  "youtrack": {
   "steps": [
    "Gib die Adresse deiner Instanz ein.",
    "Öffne die Token-Seite und erstelle ein permanentes Token (wenn möglich nur lesend).",
    "Füge es unten ein."
   ],
   "link": "Token-Seite öffnen",
   "phUrl": "https://name.youtrack.cloud",
   "ph": "Permanentes Token",
   "save": "Speichern und prüfen",
   "saving": "Wird geprüft…",
   "note": "Alba liest nur die dir zugewiesenen Tickets."
  },
  "google": {
   "prepTitle": "Google vorbereiten",
   "prepIntro": "Nur einmal, etwa 5 Minuten: Du erstellst deine eigene kostenlose „App“ in Google Cloud. Jeder Schritt hat den Link und die zu kopierenden Werte. Du brauchst für jedes Profil eine eigene App: so bleiben sie isoliert, und ein Problem bei einem betrifft nie die anderen.",
   "steps": [
    {
     "t": "Projekt erstellen",
     "d": "Gib im Formular den unten stehenden Namen ein. Lass „Organisation“ und „Übergeordnete Ressource“ auf „Keine Organisation“ und klicke auf Erstellen.",
     "link": "projectcreate",
     "ll": "„Neues Projekt“ öffnen",
     "copies": [
      [
       "Projektname",
       "Alba"
      ]
     ]
    },
    {
     "t": "Aktiviere die vier APIs",
     "d": "Klicke auf jeder Seite auf die blaue Schaltfläche „Aktivieren“. Steht dort schon „Verwalten“, ist alles erledigt.",
     "apis": true
    },
    {
     "t": "Zustimmungsbildschirm",
     "d": "Klicke auf „Los geht’s“: Google führt dich durch 4 Unterschritte. Das wählst du in jedem.",
     "link": "consent",
     "ll": "Zustimmungsbildschirm öffnen",
     "sub": [
      {
       "t": "App-Informationen",
       "d": "App-Name: Alba. Wähle bei „E-Mail-Adresse für Nutzersupport“ deine Adresse. Dann Weiter.",
       "copies": [
        [
         "App-Name",
         "Alba"
        ]
       ],
       "mails": true
      },
      {
       "t": "Zielgruppe",
       "d": "Wähle „Extern“ (richtig für ein privates Gmail; „Intern“ gibt es nur mit einer Google-Workspace-Organisation). Dann Weiter."
      },
      {
       "t": "Kontaktdaten",
       "d": "Füge deine E-Mail-Adresse ein und klicke auf Weiter.",
       "mails": true
      },
      {
       "t": "Fertigstellen",
       "d": "Setze den Haken bei „Ich stimme der Nutzerdatenrichtlinie für Google-API-Dienste zu“, dann Weiter und Erstellen."
      },
      {
       "t": "Testnutzer",
       "d": "Danach: Menü links › Zielgruppe › Testnutzer › Nutzer hinzufügen. Füge diese Adressen hinzu und speichere.",
       "mails": true
      }
     ]
    },
    {
     "t": "Client-ID erstellen",
     "d": "Die Seite „OAuth-Client-ID erstellen“ öffnet sich. So gehst du der Reihe nach vor.",
     "link": "client",
     "ll": "„Client-ID erstellen“ öffnen",
     "sub": [
      {
       "t": "Anwendungstyp",
       "d": "Öffne das Menü und wähle „Desktop-App“: Sie steht am Ende der Liste, unter „Fernseher und Geräte mit eingeschränkter Eingabe“. Wähle nicht „Webanwendung“."
      },
      {
       "t": "Name",
       "d": "Gib den unten stehenden Namen ein.",
       "copies": [
        [
         "Name",
         "Alba"
        ]
       ]
      },
      {
       "t": "Kontrollkästchen „KI-gestützter Agent“",
       "d": "Lass „Diesen Client für einen KI-gestützten Agenten verwenden“ NICHT angehakt: Es ist nur für den MCP-Server von Google, während Alba die normalen APIs von Gmail, Calendar und Drive nutzt."
      },
      {
       "t": "Erstellen",
       "d": "Klicke auf Erstellen. Google weist darauf hin, dass die Einstellungen fünf Minuten bis einige Stunden brauchen können: meist genügen ein paar Minuten. Ein Fenster zeigt die „Client-ID“ (endet auf .apps.googleusercontent.com) und den „Clientschlüssel“: Lass es offen, du brauchst sie im nächsten Schritt."
      }
     ]
    },
    {
     "t": "ID und Schlüssel einfügen",
     "d": "Kopiere die beiden Werte aus dem Google-Fenster und füge sie unten ein.",
     "paste": true
    }
   ],
   "tester": "Testnutzer",
   "apis": [
    "Gmail API",
    "Google Calendar API",
    "Google Drive API",
    "Google Chat API"
   ],
   "phId": "Client-ID (…apps.googleusercontent.com)",
   "phSecret": "Clientschlüssel",
   "save": "Speichern",
   "saved": "Gespeichert. Melde dich jetzt mit jedem Konto unten an.",
   "warn": "Die App bleibt „im Test“: Jedes Google-Konto muss oben als „Testnutzer“ hinzugefügt werden, und beim ersten Anmelden erscheint eine Warnung „nicht verifizierte App“ — klicke auf Erweitert, dann „Weiter zu Alba (unsicher)“, das ist normal. Veröffentlichen ist nicht nötig.",
   "loginNote": "Alba fragt nur Leserechte an.",
   "login": "Mit Google anmelden",
   "needClient": "Schließe zuerst „Google vorbereiten“ weiter oben ab.",
   "waiting": "Warte auf die Anmeldung im Google-Tab…",
   "progress": "Schritte abgeschlossen"
  },
  "err": {
   "session": "Sitzung abgelaufen: Öffne die Seite erneut über Alba.",
   "rejected": "{app} hat die Zugangsdaten abgelehnt.",
   "unreachable": "{app} ist nicht erreichbar.",
   "http": "{app} antwortete mit HTTP {detail}.",
   "slack_fmt": "Das Slack-Benutzertoken beginnt mit xoxp-.",
   "yt_url": "Die Adresse muss etwa so aussehen: https://name.youtrack.cloud.",
   "no_token": "Das Token fehlt.",
   "bad_client": "Client-ID oder Schlüssel ungültig.",
   "gh_fine": "GitHub: Es wird ein klassisches Token benötigt (feingranulare Tokens können keine Benachrichtigungen lesen).",
   "gh_scope": "GitHub: Dem Token fehlt die Berechtigung „notifications“.",
   "ms_clientid": "Die Microsoft-Anwendungs-ID ist ein Code mit 36 Zeichen.",
   "ms": "Microsoft: {detail}",
   "oauth_client": "Die Google-App fehlt: Schließe zuerst „Google vorbereiten“ ab.",
   "oauth_expired": "Anfrage abgelaufen: Versuche es über die Anmelde-Schaltfläche erneut.",
   "oauth_nopermanent": "Google hat keinen dauerhaften Zugriff geliefert: Versuche es erneut.",
   "cancelled": "Anmeldung abgebrochen.",
   "unsupported": "Diese App wird über den Browser gelesen: Es gibt nichts zu speichern."
  }
 },
 "pt": {
  "title": "Conecte as suas contas",
  "sub": "Tudo a partir desta página, passo a passo. Os links abrem em novos separadores: volte aqui quando terminar.",
  "safe": "Os valores que cola vão diretamente para o cofre de segredos do sistema e nunca passam pelo chat nem pelo agente.",
  "expired": "Sessão expirada: abra de novo esta página a partir do botão Conectar da Alba.",
  "connect": "Conectar",
  "connected": "Conectado",
  "todo": "Por conectar",
  "ok": "Conectado",
  "bad": "Falhou",
  "copy": "Copiar",
  "copied": "Copiado",
  "done": "Feito",
  "undone": "Por fazer",
  "open": "Abrir",
  "slack": {
   "tabToken": "Token (API)",
   "tabBot": "Slackbot (resumo)",
   "botSteps": [
    "Pressione o botão: o Slack abre no navegador do Crew. Entre no espaço.",
    "Abra o chat com o Slackbot (barra à esquerda, em “Apps”) e copie o endereço da barra do navegador.",
    "Volte aqui e cole no campo."
   ],
   "botOpen": "Abrir o Slack no Crew",
   "botSent": "Pedido enviado: veja o navegador do Crew.",
   "botPh": "Endereço do chat com o Slackbot (https://app.slack.com/client/…)",
   "botSave": "Salvar",
   "botNote": "Todos os dias a Alba pede ao Slackbot um resumo dos seus canais e o lê: nenhum canal é aberto, então nada é marcado como lido. O Slackbot precisa saber resumir no seu espaço. Use onde você não pode criar um app.",
   "steps": [
    "Abra «Create app» no Slack, escolha «From a manifest» e o seu espaço de trabalho.",
    "Cole o manifesto abaixo (só leitura) e prima Create.",
    "Prima «Install to Workspace» e confirme. Se o Slack pedir a aprovação de um administrador, aguarde.",
    "Em «OAuth & Permissions» copie o «User OAuth Token» (começa por xoxp-) e cole-o abaixo."
   ],
   "link": "Abrir Slack · Create app",
   "mlabel": "Manifesto",
   "ph": "User OAuth Token (xoxp-…)",
   "save": "Guardar e verificar",
   "saving": "A verificar…",
   "note": "A Alba só lê menções e mensagens diretas e deixa o agente pesquisar, só em leitura."
  },
  "browser": {
   "steps": [
    "Prima o botão abaixo: a Alba abre a página de acesso no navegador do Crew. Inicie sessão lá.",
    "Quando vir a sua área, volte à Alba: verifica sozinha o acesso todas as manhãs e avisa se expirar."
   ],
   "link": "Abrir a página de acesso no Crew",
   "sent": "Pedido enviado à Alba: veja o navegador do Crew.",
   "note": "Nada para colar: a Alba lê a página com a sessão do navegador do Crew."
  },
  "jira": {
   "steps": [
    "Escreva o endereço do seu site Atlassian.",
    "Abra a página de tokens de API e clique em “Criar token de API” (não a versão “com escopos”): dá acesso tanto ao Jira quanto ao Confluence com o mesmo token.",
    "Escreva seu email da Atlassian e cole o token abaixo."
   ],
   "link": "Abrir a página de tokens de API",
   "phUrl": "https://seudominio.atlassian.net",
   "phEmail": "Seu email da Atlassian",
   "ph": "Token de API",
   "save": "Salvar e verificar",
   "saving": "Verificando…",
   "note": "A Alba só lê as issues atribuídas a você."
  },
  "confluence": {
   "steps": [
    "Escreva o endereço do seu site Atlassian.",
    "Abra a página de tokens de API e clique em “Criar token de API” (não a versão “com escopos”): dá acesso tanto ao Jira quanto ao Confluence com o mesmo token.",
    "Escreva seu email da Atlassian e cole o token abaixo."
   ],
   "link": "Abrir a página de tokens de API",
   "phUrl": "https://seudominio.atlassian.net",
   "phEmail": "Seu email da Atlassian",
   "ph": "Token de API",
   "save": "Salvar e verificar",
   "saving": "Verificando…",
   "note": "A Alba só lê as páginas que você observa, editadas recentemente."
  },
  "youtrack": {
   "steps": [
    "Escreva o endereço da sua instância.",
    "Abra a página de tokens e crie um token permanente (só de leitura, se possível).",
    "Cole-o abaixo."
   ],
   "link": "Abrir a página de tokens",
   "phUrl": "https://name.youtrack.cloud",
   "ph": "Token permanente",
   "save": "Guardar e verificar",
   "saving": "A verificar…",
   "note": "A Alba só lê as issues atribuídas a si."
  },
  "google": {
   "prepTitle": "Preparar o Google",
   "prepIntro": "Só uma vez, cerca de 5 minutos: cria a sua própria «app» gratuita no Google Cloud. Cada passo tem o link e os valores a copiar. Você precisa de um app diferente para cada perfil: assim ficam isolados, e um problema em um nunca afeta os outros.",
   "steps": [
    {
     "t": "Criar um projeto",
     "d": "No formulário, dê-lhe o nome abaixo. Deixe «Organização» e «Recurso principal» em «Sem organização» e prima Criar.",
     "link": "projectcreate",
     "ll": "Abrir «Novo projeto»",
     "copies": [
      [
       "Nome do projeto",
       "Alba"
      ]
     ]
    },
    {
     "t": "Ative as quatro API",
     "d": "Em cada página prima o botão azul «Ativar». Se já disser «Gerir», está pronto.",
     "apis": true
    },
    {
     "t": "Ecrã de consentimento",
     "d": "Prima «Começar»: o Google guia-o em 4 subpassos. Eis o que escolher em cada um.",
     "link": "consent",
     "ll": "Abrir o ecrã de consentimento",
     "sub": [
      {
       "t": "Informações da app",
       "d": "Nome da app: Alba. Em «Email de apoio ao utilizador» escolha o seu endereço. Depois Seguinte.",
       "copies": [
        [
         "Nome da app",
         "Alba"
        ]
       ],
       "mails": true
      },
      {
       "t": "Público",
       "d": "Escolha «Externo» (certo para um Gmail pessoal; «Interno» só existe com uma organização Google Workspace). Depois Seguinte."
      },
      {
       "t": "Dados de contacto",
       "d": "Cole o seu endereço de email e prima Seguinte.",
       "mails": true
      },
      {
       "t": "Concluir",
       "d": "Marque «Aceito a Política de Dados do Utilizador dos Serviços de API do Google», depois Continuar e Criar."
      },
      {
       "t": "Utilizadores de teste",
       "d": "Quando terminar: menu à esquerda › Público › Utilizadores de teste › Adicionar utilizadores. Adicione estes endereços e Guarde.",
       "mails": true
      }
     ]
    },
    {
     "t": "Criar o ID de cliente",
     "d": "Abre-se a página «Criar ID de cliente OAuth». Eis o que fazer, por ordem.",
     "link": "client",
     "ll": "Abrir «Criar ID de cliente»",
     "sub": [
      {
       "t": "Tipo de aplicação",
       "d": "Abra o menu e escolha «Aplicação de ambiente de trabalho»: é o último item da lista, abaixo de «TVs e dispositivos de entrada limitada». Não escolha «Aplicação Web»."
      },
      {
       "t": "Nome",
       "d": "Escreva o nome abaixo.",
       "copies": [
        [
         "Nome",
         "Alba"
        ]
       ]
      },
      {
       "t": "Caixa «agente com IA»",
       "d": "Deixe SEM marcar «Usar este cliente para um agente com IA»: serve apenas para o servidor MCP do Google, enquanto a Alba usa as APIs normais do Gmail, Calendar e Drive."
      },
      {
       "t": "Criar",
       "d": "Prima Criar. O Google avisa que as definições podem demorar de cinco minutos a algumas horas a ter efeito: normalmente bastam alguns minutos. Uma janela mostra o «ID de cliente» (termina em .apps.googleusercontent.com) e o «Segredo do cliente»: deixe-a aberta, vai precisar deles no passo seguinte."
      }
     ]
    },
    {
     "t": "Cole o ID e o segredo",
     "d": "Copie os dois valores da janela do Google e cole-os abaixo.",
     "paste": true
    }
   ],
   "tester": "Utilizador de teste",
   "apis": [
    "API do Gmail",
    "API do Google Calendar",
    "API do Google Drive",
    "Google Chat API"
   ],
   "phId": "ID de cliente (…apps.googleusercontent.com)",
   "phSecret": "Segredo do cliente",
   "save": "Guardar",
   "saved": "Guardado. Agora inicie sessão com cada conta abaixo.",
   "warn": "O app continua “em teste”: cada conta do Google precisa ser adicionada como “Usuário de teste” acima, e no primeiro login vai aparecer um aviso de “app não verificado” — clique em Avançado e depois “Ir para Alba (não seguro)”, é normal. Não é preciso publicá-lo.",
   "loginNote": "A Alba só pede para ler.",
   "login": "Iniciar sessão com o Google",
   "needClient": "Primeiro conclua «Preparar o Google» acima.",
   "waiting": "A aguardar o início de sessão no separador do Google…",
   "progress": "passos concluídos"
  },
  "err": {
   "session": "Sessão expirada: abra de novo a página a partir da Alba.",
   "rejected": "{app} rejeitou as credenciais.",
   "unreachable": "{app} não está acessível.",
   "http": "{app} respondeu HTTP {detail}.",
   "slack_fmt": "O token de utilizador do Slack começa por xoxp-.",
   "yt_url": "O endereço deve ser do tipo https://nome.youtrack.cloud.",
   "no_token": "Falta o token.",
   "bad_client": "ID de cliente ou segredo inválidos.",
   "gh_fine": "GitHub: é preciso um token clássico (os tokens de granularidade fina não leem as notificações).",
   "gh_scope": "GitHub: falta ao token a permissão «notifications».",
   "ms_clientid": "O ID de aplicação da Microsoft é um código de 36 caracteres.",
   "ms": "Microsoft: {detail}",
   "oauth_client": "Falta a app do Google: conclua primeiro «Preparar o Google».",
   "oauth_expired": "Pedido expirado: tente de novo a partir do botão de acesso.",
   "oauth_nopermanent": "O Google não devolveu um acesso duradouro: tente de novo.",
   "cancelled": "Início de sessão cancelado.",
   "unsupported": "Esta app lê-se a partir do navegador: não há nada para guardar."
  }
 }
}
