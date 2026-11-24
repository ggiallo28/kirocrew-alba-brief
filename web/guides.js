// Guide di collegamento per app (verificate sulla documentazione ufficiale), in tutte le lingue di Alba (it, en, es, fr, de, pt).
window.ALBA_GUIDES = {
 "it": {
  "notion": {
   "steps": [
    "Apri la pagina dei token di Notion e accedi.",
    "Premi “New token”, dagli un nome (per esempio Alba), seleziona la capacità “Notion API” e premi Create.",
    "Copia il token (inizia con ntn_): dopo non si vede più.",
    "Incollalo qui sotto."
   ],
   "links": [
    {
     "href": "https://www.notion.so/developers/tokens",
     "text": "Apri i token di Notion"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ntn_…",
     "secret": true
    }
   ],
   "note": "Sui piani Business ed Enterprise un proprietario del workspace può dover abilitare i token in Impostazioni › Connessioni. Alba vede solo ciò a cui il token ha accesso e legge le pagine modificate negli ultimi 7 giorni, in sola lettura."
  },
  "linear": {
   "steps": [
    "Apri Linear › Impostazioni › Sicurezza e accesso.",
    "Crea una nuova chiave API personale (se puoi scegliere, dai solo il permesso di lettura) e copiala.",
    "Incollala qui sotto."
   ],
   "links": [
    {
     "href": "https://linear.app/settings/account/security",
     "text": "Apri “Sicurezza e accesso”"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "lin_api_…",
     "secret": true
    }
   ],
   "note": "Alba legge i ticket assegnati a te che non sono chiusi né annullati. La chiave si può revocare in qualsiasi momento dalla stessa pagina."
  },
  "trello": {
   "steps": [
    {
     "t": "Crea l'app",
     "d": "Premi “Nuovo”. Nelle specifiche dell'app scegli “La mia app non utilizza le funzionalità Power-up”, poi scrivi il nome qui sotto.",
     "copies": [
      [
       "Nome app",
       "Alba"
      ]
     ],
     "link": "https://trello.com/apps/admin",
     "ll": "Apri i Power-Up di Trello"
    },
    {
     "t": "Completa il modulo",
     "d": "Spazio di lavoro: scegli quello di questo profilo (o creane uno se non ne hai ancora). Email e Contatta l'assistenza: va bene la tua email in entrambi i campi. Autore: il tuo nome. Poi premi Crea."
    },
    {
     "t": "Genera la chiave (non OAuth 2.0)",
     "d": "Nel menu a sinistra apri “Autorizzazione” › “Autorizzazione Trello” - non “OAuth 2.0”, quella non ci serve. Premi il link “Genera un nuovo identificatore API di autenticazione di Trello per questa app” e copia la chiave mostrata."
    },
    {
     "t": "Incolla la chiave qui sotto",
     "d": "Incollala nel campo “Chiave API” qui sotto. Non premere ancora Collega: serve prima per il passo successivo."
    },
    {
     "t": "Autorizza da qui, non da Trello",
     "d": "Premi il pulsante “Autorizza (sola lettura)” qui sotto - non un link trovato sul sito di Trello, altrimenti chiave e token non saranno abbinati. Si apre la pagina di consenso: scorri in fondo e premi “Permetti”."
    },
    {
     "t": "Incolla il token e collega",
     "d": "Trello mostra un token: copialo, incollalo nel campo “Token” qui sotto e premi “Collega”."
    }
   ],
   "links": [
    {
     "href": "https://trello.com/apps/admin",
     "text": "Apri i Power-Up di Trello"
    }
   ],
   "fields": [
    {
     "k": "key",
     "ph": "Chiave API",
     "secret": false
    },
    {
     "k": "token",
     "ph": "Token",
     "secret": true
    }
   ],
   "auth": {
    "text": "Autorizza (sola lettura)",
    "url": "https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Alba&key="
   },
   "note": "Il token è di sola lettura e non scade. Si può revocare da Trello › Impostazioni account › Applicazioni. Alba legge le schede aperte assegnate a te, con scadenza e lista."
  },
  "github": {
   "steps": [
    "Apri la pagina che crea un token classico già compilato (permesso “notifications”, descrizione Alba).",
    "Scegli una scadenza (per esempio 90 giorni) e premi Generate token.",
    "Copia il token (inizia con ghp_) e incollalo qui sotto."
   ],
   "links": [
    {
     "href": "https://github.com/settings/tokens/new?scopes=notifications&description=Alba",
     "text": "Crea il token su GitHub"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ghp_…",
     "secret": true
    }
   ],
   "note": "Serve un token classico: i token a grana fine non possono leggere le notifiche. Con il solo permesso “notifications” Alba vede le tue notifiche (richieste di review, menzioni, esiti dei workflow) e le PR aperte nei repository pubblici; il permesso “repo” darebbe anche scrittura, quindi non lo chiede."
  },
  "microsoft": {
   "steps": [
    "Apri il centro di amministrazione Microsoft Entra. Per un account Outlook personale serve comunque un account Azure gratuito.",
    "Vai in Entra ID › App registrations › New registration. Nome: Alba. Tipo di account: “Any Entra ID Tenant + Personal Microsoft accounts”. Lascia vuoto il Redirect URI e premi Register.",
    "Nel menu Authentication attiva “Allow public client flows” (Sì) e salva.",
    "In API permissions › Add a permission › Microsoft Graph › Delegated aggiungi Mail.Read, Calendars.Read e offline_access (User.Read c’è già). Se è un account di lavoro, l’amministratore può dover dare il consenso.",
    "Copia l’“Application (client) ID” dalla pagina Overview e incollalo qui sotto, poi premi Accedi.",
    "Compare un codice: aprine la pagina di Microsoft, scrivi il codice e accedi con l’account. Alba lo riceve da sola."
   ],
   "links": [
    {
     "href": "https://entra.microsoft.com",
     "text": "Apri Microsoft Entra"
    }
   ],
   "fields": [
    {
     "k": "clientId",
     "ph": "ID applicazione (client ID)",
     "secret": false
    },
    {
     "k": "tenant",
     "ph": "Tenant (facoltativo, di solito common)",
     "secret": false,
     "optional": true
    }
   ],
   "login": "Accedi",
   "code": "Codice",
   "openCode": "Apri la pagina del codice",
   "waiting": "In attesa che tu finisca l’accesso su Microsoft…",
   "expired": "Codice scaduto: riprova.",
   "note": "Alba legge posta in arrivo (ultimi 3 giorni) e agenda (oggi e domani), solo in lettura. Il token di rinnovo resta nel deposito segreti del sistema."
  },
  "discord": {
   "note": "Discord non permette alle app di terze parti di leggere i tuoi messaggi privati: il permesso per i DM è riservato a partner approvati da Discord. Per questo Alba legge la pagina aperta nel browser interno di Crew, dove accedi tu."
  },
  "linkedin": {
   "note": "LinkedIn non offre alcuna API per leggere la tua casella di messaggi o le notifiche personali: i permessi disponibili riguardano solo pubblicazione e profilo. Alba legge quindi la pagina aperta nel browser interno di Crew, in sola lettura."
  },
  "telegram": {
   "note": "Per leggere le chat di un account utente Telegram serve un api_id/api_hash (da my.telegram.org) e un client MTProto: fuori dal perimetro di Alba, che non usa librerie esterne. Alba legge Telegram Web nel browser interno di Crew."
  },
  "teams": {
   "note": "Per Teams non c’è ancora un collegamento diretto: Alba legge Teams web nel browser interno di Crew, dove hai fatto accesso."
  }
 },
 "en": {
  "notion": {
   "steps": [
    "Open the Notion tokens page and sign in.",
    "Press “New token”, give it a name (for example Alba), select the “Notion API” capability and press Create.",
    "Copy the token (it starts with ntn_): it cannot be shown again.",
    "Paste it below."
   ],
   "links": [
    {
     "href": "https://www.notion.so/developers/tokens",
     "text": "Open Notion tokens"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ntn_…",
     "secret": true
    }
   ],
   "note": "On Business and Enterprise plans a workspace owner may need to enable tokens in Settings › Connections. Alba only sees what the token can access and reads pages edited in the last 7 days, read-only."
  },
  "linear": {
   "steps": [
    "Open Linear › Settings › Security & access.",
    "Create a new personal API key (if you can choose, give read-only access) and copy it.",
    "Paste it below."
   ],
   "links": [
    {
     "href": "https://linear.app/settings/account/security",
     "text": "Open “Security & access”"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "lin_api_…",
     "secret": true
    }
   ],
   "note": "Alba reads the issues assigned to you that are not completed or canceled. You can revoke the key any time from the same page."
  },
  "trello": {
   "steps": [
    {
     "t": "Create the app",
     "d": "Press “New”. In the app specifications choose “My app does not use Power-Up capabilities”, then type the name below.",
     "copies": [
      [
       "App name",
       "Alba"
      ]
     ],
     "link": "https://trello.com/apps/admin",
     "ll": "Open Trello Power-Ups"
    },
    {
     "t": "Fill in the form",
     "d": "Workspace: choose this profile's workspace (or create one first if you don't have any yet). Email and Contact support: your own email works for both fields. Author: your name. Then press Create."
    },
    {
     "t": "Generate the key (not OAuth 2.0)",
     "d": "In the left menu open “Authorization” › “Trello Authorization” - not “OAuth 2.0”, we don't need that. Press the “Generate a new API Key” link and copy the key it shows."
    },
    {
     "t": "Paste the key below",
     "d": "Paste it into the “API Key” field below. Don't press Connect yet - it's needed for the next step."
    },
    {
     "t": "Authorize from here, not from Trello",
     "d": "Press the “Authorize (read-only)” button below - not a link found on Trello's own site, otherwise the key and token won't match. The consent page opens: scroll down and press “Allow”."
    },
    {
     "t": "Paste the token and connect",
     "d": "Trello shows a token: copy it, paste it into the “Token” field below and press “Connect”."
    }
   ],
   "links": [
    {
     "href": "https://trello.com/apps/admin",
     "text": "Open Trello Power-Ups"
    }
   ],
   "fields": [
    {
     "k": "key",
     "ph": "API key",
     "secret": false
    },
    {
     "k": "token",
     "ph": "Token",
     "secret": true
    }
   ],
   "auth": {
    "text": "Authorize (read-only)",
    "url": "https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Alba&key="
   },
   "note": "The token is read-only and does not expire. You can revoke it from Trello › Account settings › Applications. Alba reads the open cards assigned to you, with due date and list."
  },
  "github": {
   "steps": [
    "Open the page that creates a classic token already filled in (“notifications” permission, description Alba).",
    "Pick an expiration (for example 90 days) and press Generate token.",
    "Copy the token (it starts with ghp_) and paste it below."
   ],
   "links": [
    {
     "href": "https://github.com/settings/tokens/new?scopes=notifications&description=Alba",
     "text": "Create the token on GitHub"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ghp_…",
     "secret": true
    }
   ],
   "note": "A classic token is needed: fine-grained tokens cannot read notifications. With only the “notifications” permission Alba sees your notifications (review requests, mentions, workflow results) and open PRs in public repositories; the “repo” permission would also allow writing, so it is not requested."
  },
  "microsoft": {
   "steps": [
    "Open the Microsoft Entra admin center. A personal Outlook account still needs a free Azure account.",
    "Go to Entra ID › App registrations › New registration. Name: Alba. Account type: “Any Entra ID Tenant + Personal Microsoft accounts”. Leave Redirect URI empty and press Register.",
    "In the Authentication menu turn on “Allow public client flows” (Yes) and save.",
    "In API permissions › Add a permission › Microsoft Graph › Delegated add Mail.Read, Calendars.Read and offline_access (User.Read is already there). For a work account an admin may need to grant consent.",
    "Copy the “Application (client) ID” from the Overview page and paste it below, then press Sign in.",
    "A code appears: open the Microsoft page, type the code and sign in with the account. Alba receives it by itself."
   ],
   "links": [
    {
     "href": "https://entra.microsoft.com",
     "text": "Open Microsoft Entra"
    }
   ],
   "fields": [
    {
     "k": "clientId",
     "ph": "Application (client) ID",
     "secret": false
    },
    {
     "k": "tenant",
     "ph": "Tenant (optional, usually common)",
     "secret": false,
     "optional": true
    }
   ],
   "login": "Sign in",
   "code": "Code",
   "openCode": "Open the code page",
   "waiting": "Waiting for you to finish signing in on Microsoft…",
   "expired": "Code expired: try again.",
   "note": "Alba reads the inbox (last 3 days) and the calendar (today and tomorrow), read-only. The refresh token stays in the system secret store."
  },
  "discord": {
   "note": "Discord does not let third-party apps read your direct messages: the DM permission is reserved for partners approved by Discord. So Alba reads the page open in Crew’s internal browser, where you sign in."
  },
  "linkedin": {
   "note": "LinkedIn offers no API to read your inbox or personal notifications: the available permissions only cover posting and profile. So Alba reads the page open in Crew’s internal browser, read-only."
  },
  "telegram": {
   "note": "Reading the chats of a Telegram user account needs an api_id/api_hash (from my.telegram.org) and an MTProto client: outside Alba’s scope, which uses no external libraries. Alba reads Telegram Web in Crew’s internal browser."
  },
  "teams": {
   "note": "There is no direct connection for Teams yet: Alba reads Teams on the web in Crew’s internal browser, where you are signed in."
  }
 },
 "es": {
  "notion": {
   "steps": [
    "Abre la página de tokens de Notion e inicia sesión.",
    "Pulsa «New token», ponle un nombre (por ejemplo Alba), selecciona la capacidad «Notion API» y pulsa Create.",
    "Copia el token (empieza por ntn_): después ya no se puede ver.",
    "Pégalo abajo."
   ],
   "links": [
    {
     "href": "https://www.notion.so/developers/tokens",
     "text": "Abrir los tokens de Notion"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ntn_…",
     "secret": true
    }
   ],
   "note": "En los planes Business y Enterprise un propietario del espacio puede tener que activar los tokens en Ajustes › Conexiones. Alba solo ve lo que el token puede abrir y lee las páginas editadas en los últimos 7 días, en solo lectura."
  },
  "linear": {
   "steps": [
    "Abre Linear › Ajustes › Seguridad y acceso.",
    "Crea una nueva clave de API personal (si puedes elegir, da solo permiso de lectura) y cópiala.",
    "Pégala abajo."
   ],
   "links": [
    {
     "href": "https://linear.app/settings/account/security",
     "text": "Abrir «Seguridad y acceso»"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "lin_api_…",
     "secret": true
    }
   ],
   "note": "Alba lee las incidencias asignadas a ti que no están completadas ni canceladas. Puedes revocar la clave cuando quieras desde la misma página."
  },
  "trello": {
   "steps": [
    {
     "t": "Crea la app",
     "d": "Pulsa “Nuevo”. En las especificaciones elige “Mi app no utiliza funciones de Power-Up”, luego escribe el nombre que tienes abajo.",
     "copies": [
      [
       "Nombre de la app",
       "Alba"
      ]
     ],
     "link": "https://trello.com/apps/admin",
     "ll": "Abrir los Power-Ups de Trello"
    },
    {
     "t": "Completa el formulario",
     "d": "Espacio de trabajo: elige el de este perfil (o crea uno si todavía no tienes ninguno). Correo electrónico y Contactar con soporte: tu propio correo sirve para ambos campos. Autor: tu nombre. Luego pulsa Crear."
    },
    {
     "t": "Genera la clave (no OAuth 2.0)",
     "d": "En el menú izquierdo abre “Autorización” › “Autorización de Trello” - no “OAuth 2.0”, eso no nos hace falta. Pulsa el enlace “Generate a new API Key” y copia la clave que aparece."
    },
    {
     "t": "Pega la clave abajo",
     "d": "Pégala en el campo “Chiave API” de abajo. No pulses Conectar todavía: hace falta para el siguiente paso."
    },
    {
     "t": "Autoriza desde aquí, no desde Trello",
     "d": "Pulsa el botón “Autorizar (sola lectura)” de abajo - no un enlace encontrado en la web de Trello, o la clave y el token no quedarán emparejados. Se abre la página de consentimiento: baja y pulsa “Permitir”."
    },
    {
     "t": "Pega el token y conecta",
     "d": "Trello muestra un token: cópialo, pégalo en el campo “Token” de abajo y pulsa “Conectar”."
    }
   ],
   "links": [
    {
     "href": "https://trello.com/apps/admin",
     "text": "Abrir los Power-Ups de Trello"
    }
   ],
   "fields": [
    {
     "k": "key",
     "ph": "Clave de API",
     "secret": false
    },
    {
     "k": "token",
     "ph": "Token",
     "secret": true
    }
   ],
   "auth": {
    "text": "Autorizar (solo lectura)",
    "url": "https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Alba&key="
   },
   "note": "El token es de solo lectura y no caduca. Puedes revocarlo en Trello › Ajustes de la cuenta › Aplicaciones. Alba lee las tarjetas abiertas asignadas a ti, con fecha límite y lista."
  },
  "github": {
   "steps": [
    "Abre la página que crea un token clásico ya rellenado (permiso «notifications», descripción Alba).",
    "Elige una caducidad (por ejemplo 90 días) y pulsa Generate token.",
    "Copia el token (empieza por ghp_) y pégalo abajo."
   ],
   "links": [
    {
     "href": "https://github.com/settings/tokens/new?scopes=notifications&description=Alba",
     "text": "Crear el token en GitHub"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ghp_…",
     "secret": true
    }
   ],
   "note": "Hace falta un token clásico: los tokens de grano fino no pueden leer las notificaciones. Con solo el permiso «notifications» Alba ve tus notificaciones (solicitudes de revisión, menciones, resultados de workflows) y las PR abiertas en repositorios públicos; el permiso «repo» permitiría también escribir, así que no lo pide."
  },
  "microsoft": {
   "steps": [
    "Abre el centro de administración de Microsoft Entra. Para una cuenta personal de Outlook hace falta igualmente una cuenta gratuita de Azure.",
    "Ve a Entra ID › App registrations › New registration. Nombre: Alba. Tipo de cuenta: «Any Entra ID Tenant + Personal Microsoft accounts». Deja vacío el Redirect URI y pulsa Register.",
    "En el menú Authentication activa «Allow public client flows» (Sí) y guarda.",
    "En API permissions › Add a permission › Microsoft Graph › Delegated añade Mail.Read, Calendars.Read y offline_access (User.Read ya está). Si es una cuenta de trabajo, puede que el administrador deba dar el consentimiento.",
    "Copia el «Application (client) ID» de la página Overview, pégalo abajo y pulsa Iniciar sesión.",
    "Aparece un código: abre la página de Microsoft, escribe el código e inicia sesión con la cuenta. Alba lo recibe sola."
   ],
   "links": [
    {
     "href": "https://entra.microsoft.com",
     "text": "Abrir Microsoft Entra"
    }
   ],
   "fields": [
    {
     "k": "clientId",
     "ph": "ID de aplicación (client ID)",
     "secret": false
    },
    {
     "k": "tenant",
     "ph": "Tenant (opcional, normalmente common)",
     "secret": false,
     "optional": true
    }
   ],
   "login": "Iniciar sesión",
   "code": "Código",
   "openCode": "Abrir la página del código",
   "waiting": "Esperando que termines el acceso en Microsoft…",
   "expired": "Código caducado: inténtalo de nuevo.",
   "note": "Alba lee la bandeja de entrada (últimos 3 días) y el calendario (hoy y mañana), solo en lectura. El token de renovación queda en el almacén de secretos del sistema."
  },
  "discord": {
   "note": "Discord no permite que las apps de terceros lean tus mensajes directos: el permiso para los DM está reservado a socios aprobados por Discord. Por eso Alba lee la página abierta en el navegador interno de Crew, donde inicias sesión tú."
  },
  "linkedin": {
   "note": "LinkedIn no ofrece ninguna API para leer tu bandeja de mensajes ni tus notificaciones personales: los permisos disponibles solo cubren publicar y el perfil. Por eso Alba lee la página abierta en el navegador interno de Crew, en solo lectura."
  },
  "telegram": {
   "note": "Para leer los chats de una cuenta de usuario de Telegram hacen falta un api_id/api_hash (de my.telegram.org) y un cliente MTProto: queda fuera del alcance de Alba, que no usa bibliotecas externas. Alba lee Telegram Web en el navegador interno de Crew."
  },
  "teams": {
   "note": "Para Teams todavía no hay una conexión directa: Alba lee Teams en la web, en el navegador interno de Crew, donde has iniciado sesión."
  }
 },
 "fr": {
  "notion": {
   "steps": [
    "Ouvrez la page des jetons de Notion et connectez-vous.",
    "Appuyez sur « New token », donnez-lui un nom (par exemple Alba), sélectionnez la capacité « Notion API » et appuyez sur Create.",
    "Copiez le jeton (il commence par ntn_) : il ne s’affiche plus ensuite.",
    "Collez-le ci-dessous."
   ],
   "links": [
    {
     "href": "https://www.notion.so/developers/tokens",
     "text": "Ouvrir les jetons Notion"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ntn_…",
     "secret": true
    }
   ],
   "note": "Sur les offres Business et Enterprise, un propriétaire de l’espace peut devoir activer les jetons dans Paramètres › Connexions. Alba ne voit que ce que le jeton peut ouvrir et lit les pages modifiées ces 7 derniers jours, en lecture seule."
  },
  "linear": {
   "steps": [
    "Ouvrez Linear › Paramètres › Sécurité et accès.",
    "Créez une nouvelle clé d’API personnelle (si vous pouvez choisir, donnez seulement l’accès en lecture) et copiez-la.",
    "Collez-la ci-dessous."
   ],
   "links": [
    {
     "href": "https://linear.app/settings/account/security",
     "text": "Ouvrir « Sécurité et accès »"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "lin_api_…",
     "secret": true
    }
   ],
   "note": "Alba lit les tickets qui vous sont assignés et qui ne sont ni terminés ni annulés. Vous pouvez révoquer la clé à tout moment depuis la même page."
  },
  "trello": {
   "steps": [
    {
     "t": "Créez l'appli",
     "d": "Cliquez sur « Nouveau ». Dans les spécifications, choisissez « Mon appli n'utilise pas les fonctionnalités Power-Up », puis saisissez le nom ci-dessous.",
     "copies": [
      [
       "Nom de l'appli",
       "Alba"
      ]
     ],
     "link": "https://trello.com/apps/admin",
     "ll": "Ouvrir les Power-Ups de Trello"
    },
    {
     "t": "Remplissez le formulaire",
     "d": "Espace de travail : choisissez celui de ce profil (ou créez-en un si vous n'en avez pas encore). E-mail et Contacter l'assistance : votre propre e-mail convient pour les deux champs. Auteur : votre nom. Puis cliquez sur Créer."
    },
    {
     "t": "Générez la clé (pas OAuth 2.0)",
     "d": "Dans le menu de gauche, ouvrez « Autorisation » › « Autorisation Trello » - pas « OAuth 2.0 », on n'en a pas besoin. Cliquez sur le lien « Generate a new API Key » et copiez la clé affichée."
    },
    {
     "t": "Collez la clé ci-dessous",
     "d": "Collez-la dans le champ « Clé API » ci-dessous. N'appuyez pas encore sur Connecter : elle sert à l'étape suivante."
    },
    {
     "t": "Autorisez depuis ici, pas depuis Trello",
     "d": "Cliquez sur le bouton « Autoriser (lecture seule) » ci-dessous - pas un lien trouvé sur le site de Trello, sinon la clé et le jeton ne seront pas associés. La page de consentement s'ouvre : descendez et cliquez sur « Allow »."
    },
    {
     "t": "Collez le jeton et connectez",
     "d": "Trello affiche un jeton : copiez-le, collez-le dans le champ « Jeton » ci-dessous et cliquez sur « Connecter »."
    }
   ],
   "links": [
    {
     "href": "https://trello.com/apps/admin",
     "text": "Ouvrir les Power-Ups de Trello"
    }
   ],
   "fields": [
    {
     "k": "key",
     "ph": "Clé d’API",
     "secret": false
    },
    {
     "k": "token",
     "ph": "Jeton",
     "secret": true
    }
   ],
   "auth": {
    "text": "Autoriser (lecture seule)",
    "url": "https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Alba&key="
   },
   "note": "Le jeton est en lecture seule et n’expire pas. Vous pouvez le révoquer depuis Trello › Paramètres du compte › Applications. Alba lit les cartes ouvertes qui vous sont assignées, avec échéance et liste."
  },
  "github": {
   "steps": [
    "Ouvrez la page qui crée un jeton classique déjà rempli (autorisation « notifications », description Alba).",
    "Choisissez une expiration (par exemple 90 jours) et appuyez sur Generate token.",
    "Copiez le jeton (il commence par ghp_) et collez-le ci-dessous."
   ],
   "links": [
    {
     "href": "https://github.com/settings/tokens/new?scopes=notifications&description=Alba",
     "text": "Créer le jeton sur GitHub"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ghp_…",
     "secret": true
    }
   ],
   "note": "Il faut un jeton classique : les jetons à granularité fine ne peuvent pas lire les notifications. Avec la seule autorisation « notifications », Alba voit vos notifications (demandes de revue, mentions, résultats de workflows) et les PR ouvertes dans les dépôts publics ; l’autorisation « repo » permettrait aussi d’écrire, elle n’est donc pas demandée."
  },
  "microsoft": {
   "steps": [
    "Ouvrez le centre d’administration Microsoft Entra. Pour un compte Outlook personnel, il faut tout de même un compte Azure gratuit.",
    "Allez dans Entra ID › App registrations › New registration. Nom : Alba. Type de compte : « Any Entra ID Tenant + Personal Microsoft accounts ». Laissez le Redirect URI vide et appuyez sur Register.",
    "Dans le menu Authentication, activez « Allow public client flows » (Oui) et enregistrez.",
    "Dans API permissions › Add a permission › Microsoft Graph › Delegated, ajoutez Mail.Read, Calendars.Read et offline_access (User.Read est déjà là). Pour un compte professionnel, l’administrateur peut devoir donner son consentement.",
    "Copiez l’« Application (client) ID » de la page Overview, collez-le ci-dessous et appuyez sur Se connecter.",
    "Un code s’affiche : ouvrez la page de Microsoft, saisissez le code et connectez-vous avec le compte. Alba le reçoit toute seule."
   ],
   "links": [
    {
     "href": "https://entra.microsoft.com",
     "text": "Ouvrir Microsoft Entra"
    }
   ],
   "fields": [
    {
     "k": "clientId",
     "ph": "ID d’application (client ID)",
     "secret": false
    },
    {
     "k": "tenant",
     "ph": "Tenant (facultatif, en général common)",
     "secret": false,
     "optional": true
    }
   ],
   "login": "Se connecter",
   "code": "Code",
   "openCode": "Ouvrir la page du code",
   "waiting": "En attente de la fin de votre connexion sur Microsoft…",
   "expired": "Code expiré : réessayez.",
   "note": "Alba lit la boîte de réception (3 derniers jours) et l’agenda (aujourd’hui et demain), en lecture seule. Le jeton d’actualisation reste dans le coffre de secrets du système."
  },
  "discord": {
   "note": "Discord ne permet pas aux applications tierces de lire vos messages privés : l’autorisation pour les DM est réservée aux partenaires approuvés par Discord. Alba lit donc la page ouverte dans le navigateur interne de Crew, où vous vous connectez."
  },
  "linkedin": {
   "note": "LinkedIn n’offre aucune API pour lire votre messagerie ni vos notifications personnelles : les autorisations disponibles ne couvrent que la publication et le profil. Alba lit donc la page ouverte dans le navigateur interne de Crew, en lecture seule."
  },
  "telegram": {
   "note": "Pour lire les discussions d’un compte utilisateur Telegram, il faut un api_id/api_hash (depuis my.telegram.org) et un client MTProto : hors du périmètre d’Alba, qui n’utilise aucune bibliothèque externe. Alba lit Telegram Web dans le navigateur interne de Crew."
  },
  "teams": {
   "note": "Il n’existe pas encore de connexion directe pour Teams : Alba lit Teams sur le web dans le navigateur interne de Crew, où vous êtes connecté."
  }
 },
 "de": {
  "notion": {
   "steps": [
    "Öffne die Token-Seite von Notion und melde dich an.",
    "Klicke auf „New token“, gib einen Namen ein (zum Beispiel Alba), wähle die Fähigkeit „Notion API“ und klicke auf Create.",
    "Kopiere das Token (beginnt mit ntn_): Es wird danach nicht mehr angezeigt.",
    "Füge es unten ein."
   ],
   "links": [
    {
     "href": "https://www.notion.so/developers/tokens",
     "text": "Notion-Tokens öffnen"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ntn_…",
     "secret": true
    }
   ],
   "note": "Bei Business- und Enterprise-Tarifen muss ein Workspace-Inhaber Tokens unter Einstellungen › Verbindungen eventuell freischalten. Alba sieht nur, worauf das Token Zugriff hat, und liest Seiten, die in den letzten 7 Tagen bearbeitet wurden, nur lesend."
  },
  "linear": {
   "steps": [
    "Öffne Linear › Einstellungen › Sicherheit & Zugriff.",
    "Erstelle einen neuen persönlichen API-Schlüssel (wenn du wählen kannst, nur Leserecht) und kopiere ihn.",
    "Füge ihn unten ein."
   ],
   "links": [
    {
     "href": "https://linear.app/settings/account/security",
     "text": "„Sicherheit & Zugriff“ öffnen"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "lin_api_…",
     "secret": true
    }
   ],
   "note": "Alba liest die dir zugewiesenen Tickets, die weder erledigt noch abgebrochen sind. Du kannst den Schlüssel jederzeit auf derselben Seite widerrufen."
  },
  "trello": {
   "steps": [
    {
     "t": "App erstellen",
     "d": "Klicke auf „Neu“. Wähle bei den App-Angaben „Meine App nutzt keine Power-Up-Funktionen“, dann gib den Namen unten ein.",
     "copies": [
      [
       "App-Name",
       "Alba"
      ]
     ],
     "link": "https://trello.com/apps/admin",
     "ll": "Trello-Power-Ups öffnen"
    },
    {
     "t": "Formular ausfüllen",
     "d": "Workspace: wähle den dieses Profils (oder lege zuerst einen an, falls noch keiner existiert). E-Mail und Support-Kontakt: deine eigene E-Mail passt für beide Felder. Autor: dein Name. Dann auf Erstellen klicken."
    },
    {
     "t": "Schlüssel erzeugen (nicht OAuth 2.0)",
     "d": "Öffne im linken Menü „Autorisierung“ › „Trello-Autorisierung“ - nicht „OAuth 2.0“, das brauchen wir nicht. Klicke auf „Generate a new API Key“ und kopiere den angezeigten Schlüssel."
    },
    {
     "t": "Schlüssel unten einfügen",
     "d": "Füge ihn in das Feld „API-Schlüssel“ unten ein. Noch nicht auf Verbinden klicken - er wird für den nächsten Schritt gebraucht."
    },
    {
     "t": "Hier autorisieren, nicht bei Trello",
     "d": "Klicke auf den Button „Autorisieren (nur lesen)“ unten - nicht auf einen Link, den du bei Trello selbst findest, sonst passen Schlüssel und Token nicht zusammen. Die Zustimmungsseite öffnet sich: scrolle runter und klicke auf „Allow“."
    },
    {
     "t": "Token einfügen und verbinden",
     "d": "Trello zeigt ein Token: kopiere es, füge es unten ins Feld „Token“ ein und klicke auf „Verbinden“."
    }
   ],
   "links": [
    {
     "href": "https://trello.com/apps/admin",
     "text": "Trello-Power-Ups öffnen"
    }
   ],
   "fields": [
    {
     "k": "key",
     "ph": "API-Schlüssel",
     "secret": false
    },
    {
     "k": "token",
     "ph": "Token",
     "secret": true
    }
   ],
   "auth": {
    "text": "Autorisieren (nur lesen)",
    "url": "https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Alba&key="
   },
   "note": "Das Token ist nur lesend und läuft nicht ab. Du kannst es unter Trello › Kontoeinstellungen › Anwendungen widerrufen. Alba liest die offenen, dir zugewiesenen Karten mit Fälligkeit und Liste."
  },
  "github": {
   "steps": [
    "Öffne die Seite, die ein klassisches Token bereits ausgefüllt erstellt (Berechtigung „notifications“, Beschreibung Alba).",
    "Wähle ein Ablaufdatum (zum Beispiel 90 Tage) und klicke auf Generate token.",
    "Kopiere das Token (beginnt mit ghp_) und füge es unten ein."
   ],
   "links": [
    {
     "href": "https://github.com/settings/tokens/new?scopes=notifications&description=Alba",
     "text": "Token auf GitHub erstellen"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ghp_…",
     "secret": true
    }
   ],
   "note": "Es wird ein klassisches Token benötigt: Feingranulare Tokens können keine Benachrichtigungen lesen. Mit nur der Berechtigung „notifications“ sieht Alba deine Benachrichtigungen (Review-Anfragen, Erwähnungen, Workflow-Ergebnisse) und offene PRs in öffentlichen Repositories; die Berechtigung „repo“ würde auch Schreiben erlauben und wird daher nicht angefragt."
  },
  "microsoft": {
   "steps": [
    "Öffne das Microsoft-Entra-Admin-Center. Für ein privates Outlook-Konto brauchst du trotzdem ein kostenloses Azure-Konto.",
    "Gehe zu Entra ID › App registrations › New registration. Name: Alba. Kontotyp: „Any Entra ID Tenant + Personal Microsoft accounts“. Lass den Redirect URI leer und klicke auf Register.",
    "Aktiviere im Menü Authentication „Allow public client flows“ (Ja) und speichere.",
    "Füge unter API permissions › Add a permission › Microsoft Graph › Delegated Mail.Read, Calendars.Read und offline_access hinzu (User.Read ist schon da). Bei einem Geschäftskonto muss ein Admin eventuell zustimmen.",
    "Kopiere die „Application (client) ID“ von der Seite Overview, füge sie unten ein und klicke auf Anmelden.",
    "Ein Code erscheint: Öffne die Microsoft-Seite, gib den Code ein und melde dich mit dem Konto an. Alba bekommt es von allein."
   ],
   "links": [
    {
     "href": "https://entra.microsoft.com",
     "text": "Microsoft Entra öffnen"
    }
   ],
   "fields": [
    {
     "k": "clientId",
     "ph": "Anwendungs-ID (Client-ID)",
     "secret": false
    },
    {
     "k": "tenant",
     "ph": "Tenant (optional, meist common)",
     "secret": false,
     "optional": true
    }
   ],
   "login": "Anmelden",
   "code": "Code",
   "openCode": "Code-Seite öffnen",
   "waiting": "Warte, bis du die Anmeldung bei Microsoft abgeschlossen hast…",
   "expired": "Code abgelaufen: Versuche es erneut.",
   "note": "Alba liest den Posteingang (letzte 3 Tage) und den Kalender (heute und morgen), nur lesend. Das Aktualisierungstoken bleibt im Geheimnisspeicher des Systems."
  },
  "discord": {
   "note": "Discord erlaubt Drittanbieter-Apps nicht, deine Direktnachrichten zu lesen: Die Berechtigung für DMs ist von Discord genehmigten Partnern vorbehalten. Deshalb liest Alba die Seite, die im internen Browser von Crew geöffnet ist und in dem du dich anmeldest."
  },
  "linkedin": {
   "note": "LinkedIn bietet keine API, um dein Postfach oder persönliche Benachrichtigungen zu lesen: Die verfügbaren Berechtigungen betreffen nur Veröffentlichen und Profil. Deshalb liest Alba die im internen Browser von Crew geöffnete Seite, nur lesend."
  },
  "telegram": {
   "note": "Um die Chats eines Telegram-Benutzerkontos zu lesen, braucht man eine api_id/api_hash (von my.telegram.org) und einen MTProto-Client: außerhalb von Albas Umfang, das keine externen Bibliotheken nutzt. Alba liest Telegram Web im internen Browser von Crew."
  },
  "teams": {
   "note": "Für Teams gibt es noch keine direkte Verbindung: Alba liest Teams im Web, im internen Browser von Crew, in dem du angemeldet bist."
  }
 },
 "pt": {
  "notion": {
   "steps": [
    "Abra a página de tokens do Notion e inicie sessão.",
    "Prima «New token», dê-lhe um nome (por exemplo Alba), selecione a capacidade «Notion API» e prima Create.",
    "Copie o token (começa por ntn_): depois já não é possível vê-lo.",
    "Cole-o abaixo."
   ],
   "links": [
    {
     "href": "https://www.notion.so/developers/tokens",
     "text": "Abrir os tokens do Notion"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ntn_…",
     "secret": true
    }
   ],
   "note": "Nos planos Business e Enterprise, um proprietário do espaço pode ter de ativar os tokens em Definições › Ligações. A Alba só vê o que o token consegue abrir e lê as páginas editadas nos últimos 7 dias, só em leitura."
  },
  "linear": {
   "steps": [
    "Abra Linear › Definições › Segurança e acesso.",
    "Crie uma nova chave de API pessoal (se puder escolher, dê só permissão de leitura) e copie-a.",
    "Cole-a abaixo."
   ],
   "links": [
    {
     "href": "https://linear.app/settings/account/security",
     "text": "Abrir «Segurança e acesso»"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "lin_api_…",
     "secret": true
    }
   ],
   "note": "A Alba lê as issues atribuídas a si que não estão concluídas nem canceladas. Pode revogar a chave quando quiser na mesma página."
  },
  "trello": {
   "steps": [
    {
     "t": "Crie a app",
     "d": "Clique em “Novo”. Nas especificações escolha “O meu app não usa funcionalidades de Power-Up”, depois escreva o nome abaixo.",
     "copies": [
      [
       "Nome da app",
       "Alba"
      ]
     ],
     "link": "https://trello.com/apps/admin",
     "ll": "Abrir os Power-Ups do Trello"
    },
    {
     "t": "Preencha o formulário",
     "d": "Espaço de trabalho: escolha o deste perfil (ou crie um, se ainda não tiver nenhum). E-mail e Contactar o suporte: o seu próprio e-mail serve para os dois campos. Autor: o seu nome. Depois clique em Criar."
    },
    {
     "t": "Gere a chave (não OAuth 2.0)",
     "d": "No menu à esquerda abra “Autorização” › “Autorização do Trello” - não “OAuth 2.0”, não precisamos disso. Clique em “Generate a new API Key” e copie a chave mostrada."
    },
    {
     "t": "Cole a chave abaixo",
     "d": "Cole-a no campo “Chave de API” abaixo. Não prima Ligar ainda: é necessária para o passo seguinte."
    },
    {
     "t": "Autorize a partir daqui, não do Trello",
     "d": "Prima o botão “Autorizar (só leitura)” abaixo - não um link encontrado no site do Trello, senão a chave e o token não ficam associados. Abre-se a página de consentimento: desça e prima “Permitir”."
    },
    {
     "t": "Cole o token e ligue",
     "d": "O Trello mostra um token: copie-o, cole-o no campo “Token” abaixo e prima “Ligar”."
    }
   ],
   "links": [
    {
     "href": "https://trello.com/apps/admin",
     "text": "Abrir os Power-Ups do Trello"
    }
   ],
   "fields": [
    {
     "k": "key",
     "ph": "Chave de API",
     "secret": false
    },
    {
     "k": "token",
     "ph": "Token",
     "secret": true
    }
   ],
   "auth": {
    "text": "Autorizar (só leitura)",
    "url": "https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Alba&key="
   },
   "note": "O token é só de leitura e não expira. Pode revogá-lo em Trello › Definições da conta › Aplicações. A Alba lê os cartões abertos atribuídos a si, com prazo e lista."
  },
  "github": {
   "steps": [
    "Abra a página que cria um token clássico já preenchido (permissão «notifications», descrição Alba).",
    "Escolha uma validade (por exemplo 90 dias) e prima Generate token.",
    "Copie o token (começa por ghp_) e cole-o abaixo."
   ],
   "links": [
    {
     "href": "https://github.com/settings/tokens/new?scopes=notifications&description=Alba",
     "text": "Criar o token no GitHub"
    }
   ],
   "fields": [
    {
     "k": "token",
     "ph": "ghp_…",
     "secret": true
    }
   ],
   "note": "É preciso um token clássico: os tokens de granularidade fina não conseguem ler as notificações. Só com a permissão «notifications» a Alba vê as suas notificações (pedidos de revisão, menções, resultados de workflows) e as PR abertas em repositórios públicos; a permissão «repo» permitiria também escrever, por isso não é pedida."
  },
  "microsoft": {
   "steps": [
    "Abra o centro de administração do Microsoft Entra. Para uma conta Outlook pessoal é preciso na mesma uma conta Azure gratuita.",
    "Vá a Entra ID › App registrations › New registration. Nome: Alba. Tipo de conta: «Any Entra ID Tenant + Personal Microsoft accounts». Deixe o Redirect URI vazio e prima Register.",
    "No menu Authentication ative «Allow public client flows» (Sim) e guarde.",
    "Em API permissions › Add a permission › Microsoft Graph › Delegated adicione Mail.Read, Calendars.Read e offline_access (User.Read já lá está). Numa conta de trabalho, o administrador pode ter de dar o consentimento.",
    "Copie o «Application (client) ID» da página Overview, cole-o abaixo e prima Iniciar sessão.",
    "Aparece um código: abra a página da Microsoft, escreva o código e inicie sessão com a conta. A Alba recebe-o sozinha."
   ],
   "links": [
    {
     "href": "https://entra.microsoft.com",
     "text": "Abrir o Microsoft Entra"
    }
   ],
   "fields": [
    {
     "k": "clientId",
     "ph": "ID da aplicação (client ID)",
     "secret": false
    },
    {
     "k": "tenant",
     "ph": "Tenant (opcional, normalmente common)",
     "secret": false,
     "optional": true
    }
   ],
   "login": "Iniciar sessão",
   "code": "Código",
   "openCode": "Abrir a página do código",
   "waiting": "A aguardar que termine o acesso na Microsoft…",
   "expired": "Código expirado: tente de novo.",
   "note": "A Alba lê a caixa de entrada (últimos 3 dias) e a agenda (hoje e amanhã), só em leitura. O token de renovação fica no cofre de segredos do sistema."
  },
  "discord": {
   "note": "O Discord não deixa apps de terceiros lerem as suas mensagens diretas: a permissão para os DM está reservada a parceiros aprovados pelo Discord. Por isso a Alba lê a página aberta no navegador interno do Crew, onde inicia sessão."
  },
  "linkedin": {
   "note": "O LinkedIn não oferece nenhuma API para ler a sua caixa de mensagens nem as notificações pessoais: as permissões disponíveis só cobrem publicar e o perfil. Por isso a Alba lê a página aberta no navegador interno do Crew, só em leitura."
  },
  "telegram": {
   "note": "Para ler as conversas de uma conta de utilizador do Telegram são precisos um api_id/api_hash (de my.telegram.org) e um cliente MTProto: fora do âmbito da Alba, que não usa bibliotecas externas. A Alba lê o Telegram Web no navegador interno do Crew."
  },
  "teams": {
   "note": "Para o Teams ainda não há ligação direta: a Alba lê o Teams na web, no navegador interno do Crew, onde iniciou sessão."
  }
 }
}
