(function () {
  'use strict'
  var P = new URLSearchParams(location.search)
  var TOKEN = P.get('t') || ''
  var LS = 'alba.setup.steps'
  var L = window.ALBA_L || {}
  function pick(code) { var c = String(code || '').toLowerCase().slice(0, 2); return L[c] ? c : 'en' }
  var LANG = pick(document.documentElement.lang !== 'it' ? (navigator.language || 'en') : 'it')
  document.documentElement.lang = LANG
  var T = L[LANG]
  var GCLOUD = { projectcreate: 'https://console.cloud.google.com/projectcreate', consent: 'https://console.cloud.google.com/auth/overview', audience: 'https://console.cloud.google.com/auth/audience', branding: 'https://console.cloud.google.com/auth/branding', client: 'https://console.cloud.google.com/auth/clients/create',
    apis: ['https://console.cloud.google.com/apis/library/gmail.googleapis.com', 'https://console.cloud.google.com/apis/library/calendar-json.googleapis.com', 'https://console.cloud.google.com/apis/library/drive.googleapis.com', 'https://console.cloud.google.com/apis/library/chat.googleapis.com'] }
  var APPS = {
    gmail: { name: 'Gmail', color: '#EA4335' }, calendar: { name: 'Google Calendar', color: '#4285F4' }, drive: { name: 'Google Drive', color: '#1FA463' }, googlechat: { name: 'Google Chat', color: '#00897B' }, youtrack: { name: 'YouTrack', color: '#FF318C' },
    jira: { name: 'Jira', color: '#0052CC' }, confluence: { name: 'Confluence', color: '#172B4D' },
    slack: { name: 'Slack', color: '#E01E5A', url: 'https://app.slack.com/client' }, discord: { name: 'Discord', color: '#5865F2', url: 'https://discord.com/login' },
    linkedin: { name: 'LinkedIn', color: '#0A66C2', url: 'https://www.linkedin.com/login' }, notion: { name: 'Notion', color: '#9B9A97', url: 'https://www.notion.so/login' },
    trello: { name: 'Trello', color: '#0079BF', url: 'https://trello.com/login' }, linear: { name: 'Linear', color: '#5E6AD2', url: 'https://linear.app/login' }, github: { name: 'GitHub', color: '#8B949E', url: 'https://github.com/login' },
    outlook: { name: 'Outlook', color: '#0078D4', url: 'https://outlook.office.com/mail/' }, teams: { name: 'Microsoft Teams', color: '#6264A7', url: 'https://teams.microsoft.com/' },
    telegram: { name: 'Telegram', color: '#26A5E4', url: 'https://web.telegram.org/' }
  }
  function errText(j) {
    if (j && j.code && T.err && T.err[j.code]) return T.err[j.code].replace('{app}', j.app || '').replace('{detail}', j.detail || '')
    return (j && j.error) || T.bad
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e }
  function api(path, opts) { return fetch(path + (path.indexOf('?') < 0 ? '?' : '&') + 't=' + encodeURIComponent(TOKEN), opts).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j } }) }) }
  function link(href, text, cls) { var l = el('a', cls || 'btn', text); l.href = href; l.target = '_blank'; l.rel = 'noopener'; return l }
  function copyChip(label, value) {
    var w = el('div', 'chipcopy'); var k = el('span', 'k', label); var v = el('code', null, value); var b = el('button', 'cp', T.copy); b.type = 'button'
    b.addEventListener('click', function () { try { navigator.clipboard.writeText(value); b.textContent = '✓ ' + T.copied; b.classList.add('on'); setTimeout(function () { b.textContent = T.copy; b.classList.remove('on') }, 1800) } catch (e) {} })
    w.appendChild(k); w.appendChild(v); w.appendChild(b); return w
  }
  var MANIFEST = '{"display_information":{"name":"Alba","description":"Read-only access for the Alba brief"},"oauth_config":{"scopes":{"user":["search:read","channels:history","groups:history","im:history","mpim:history","channels:read","groups:read","im:read","mpim:read","users:read"]}},"settings":{"org_deploy_enabled":false,"socket_mode_enabled":false,"token_rotation_enabled":false}}'
  var done = {}
  try { done = JSON.parse(localStorage.getItem(LS) || '{}') } catch (e) { done = {} }
  function saveDone() { try { localStorage.setItem(LS, JSON.stringify(done)) } catch (e) {} }

  function avatar(app, name) { var d = el('div', 'dot', (name || app).slice(0, 1).toUpperCase()); d.style.background = (APPS[app] || { color: '#64748b' }).color; return d }

  function prepCard(S, space) {
    var G = T.google
    var c = el('section', 'card prep')
    var head = el('div', 'head'); head.appendChild(avatar('gmail', 'G')); head.firstChild.style.background = 'linear-gradient(135deg,#4285F4,#34A853 50%,#FBBC05)'
    var ready = function () { return !!(S.googleClientBySpace && S.googleClientBySpace[space]) }
    var nm = el('div', 'grow'); nm.appendChild(el('b', null, G.prepTitle + ' · ' + space)); nm.appendChild(el('div', 'who', G.prepIntro))
    var chip = el('span', 'chip' + (ready() ? ' ok' : ''), ready() ? T.connected : T.todo)
    head.appendChild(nm); head.appendChild(chip); c.appendChild(head)
    var bar = el('div', 'bar'); var fill = el('i'); bar.appendChild(fill); var cnt = el('div', 'barlabel'); c.appendChild(bar); c.appendChild(cnt)
    function refresh() {
      var n = G.steps.filter(function (s, k) { return done[space + ':s' + k] }).length + (ready() ? 0 : 0)
      var total = G.steps.length
      fill.style.width = Math.round((ready() ? total : n) / total * 100) + '%'
      cnt.textContent = (ready() ? total : n) + '/' + total + ' ' + G.progress
    }
    var mails = S.accounts.filter(function (a) { return a.kind === 'google' && a.space === space }).map(function (a) { return a.label }).filter(function (v, k, arr) { return v.indexOf('@') > 0 && arr.indexOf(v) === k })
    var steps = el('ol', 'steps')
    G.steps.forEach(function (st, k) {
      var dk = space + ':s' + k
      var li = el('li', 'step' + (done[dk] || (ready() && k < G.steps.length) ? ' isdone' : ''))
      var n = el('div', 'num', String(k + 1))
      var body = el('div', 'sbody')
      var top = el('div', 'stop'); top.appendChild(el('b', null, st.t))
      var tg = el('button', 'tick', done[dk] ? '✓ ' + T.done : T.undone); tg.type = 'button'
      tg.addEventListener('click', function () { done[dk] = !done[dk]; saveDone(); li.classList.toggle('isdone', !!done[dk]); tg.textContent = done[dk] ? '✓ ' + T.done : T.undone; refresh() })
      top.appendChild(tg); body.appendChild(top)
      body.appendChild(el('p', 'sd', st.d))
      var row = el('div', 'row')
      if (st.apis) GCLOUD.apis.forEach(function (u, i) { row.appendChild(link(u, G.apis[i] + ' ↗')) })
      if (st.link) row.appendChild(link(GCLOUD[st.link], st.ll + ' ↗'))
      if (row.childNodes.length) body.appendChild(row)
      if (st.copies) st.copies.forEach(function (cp) { body.appendChild(copyChip(cp[0], cp[1])) })
      if (st.mails) mails.forEach(function (m) { body.appendChild(copyChip(G.tester, m)) })
      if (st.sub) {
        var sl = el('ol', 'sub')
        st.sub.forEach(function (ss) {
          var si = el('li'); si.appendChild(el('b', null, ss.t)); si.appendChild(el('div', 'sd', ss.d))
          if (ss.copies) ss.copies.forEach(function (cp) { si.appendChild(copyChip(cp[0], cp[1])) })
          if (ss.mails) mails.forEach(function (m) { si.appendChild(copyChip(G.tester, m)) })
          if (ss.link) { var srow = el('div', 'row'); srow.appendChild(link(GCLOUD[ss.link], ss.ll + ' ↗')); si.appendChild(srow) }
          sl.appendChild(si)
        })
        body.appendChild(sl)
      }
      if (st.paste) {
        var idIn = el('input'); idIn.placeholder = G.phId; idIn.spellcheck = false; idIn.autocomplete = 'off'
        var secIn = el('input'); secIn.type = 'password'; secIn.placeholder = G.phSecret; secIn.autocomplete = 'new-password'; secIn.spellcheck = false
        var btn = el('button', 'btn primary', G.save); btn.type = 'button'
        var msg = el('div', 'msg')
        btn.addEventListener('click', function () {
          if (!idIn.value.trim() || !secIn.value.trim()) return
          btn.disabled = true
          api('/setup/api/google-client', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ clientId: idIn.value, clientSecret: secIn.value, space: space }) }).then(function (r) {
            secIn.value = ''; btn.disabled = false
            if (r.ok && r.j.ok) { msg.className = 'msg ok'; msg.textContent = G.saved; chip.className = 'chip ok'; chip.textContent = T.connected; S.googleClientBySpace = S.googleClientBySpace || {}; S.googleClientBySpace[space] = true; refresh(); document.dispatchEvent(new Event('alba-google-ready')) }
            else { msg.className = 'msg bad'; msg.textContent = errText(r.j) }
          }).catch(function () { btn.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
        })
        body.appendChild(idIn); body.appendChild(secIn); body.appendChild(btn); body.appendChild(msg)
      }
      li.appendChild(n); li.appendChild(body); steps.appendChild(li)
    })
    c.appendChild(steps); c.appendChild(el('div', 'note', G.warn)); refresh()
    return c
  }

  function googleCard(a, S) {
    var G = T.google
    var c = el('section', 'card')
    var head = el('div', 'head'); head.appendChild(avatar(a.app, APPS[a.app] && APPS[a.app].name))
    var nm = el('div', 'grow'); nm.appendChild(el('b', null, (APPS[a.app] || {}).name || a.app)); nm.appendChild(el('div', 'who', a.label + ' · ' + a.space))
    var chip = el('span', 'chip' + (a.connected ? ' ok' : ''), a.connected ? T.connected : T.todo)
    head.appendChild(nm); head.appendChild(chip); c.appendChild(head)
    var btn = el('button', 'btn primary', G.login); btn.type = 'button'
    var msg = el('div', 'msg')
    function ready() { return !!(S.googleClientBySpace && S.googleClientBySpace[a.space]) }
    function sync() { btn.disabled = !ready(); if (!ready()) { msg.className = 'msg'; msg.textContent = G.needClient } else if (msg.textContent === G.needClient) msg.textContent = '' }
    document.addEventListener('alba-google-ready', sync); sync()
    btn.addEventListener('click', function () {
      btn.disabled = true; msg.className = 'msg'; msg.textContent = ''
      api('/setup/api/google-start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id }) }).then(function (r) {
        btn.disabled = false
        if (!(r.ok && r.j.authUrl)) { msg.className = 'msg bad'; msg.textContent = errText(r.j); return }
        window.open(r.j.authUrl, '_blank', 'noopener'); msg.textContent = G.waiting
        var t0 = Date.now()
        var iv = setInterval(function () {
          api('/setup/api/info').then(function (q) {
            var me = q.ok && q.j.accounts.filter(function (x) { return x.id === a.id })[0]
            if (me && me.connected) { clearInterval(iv); chip.className = 'chip ok'; chip.textContent = T.connected; msg.className = 'msg ok'; msg.textContent = T.ok }
          })
          if (Date.now() - t0 > 180000) clearInterval(iv)
        }, 3000)
      }).catch(function () { btn.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
    })
    c.appendChild(btn); c.appendChild(el('div', 'note', G.loginNote)); c.appendChild(msg)
    return c
  }

  function guideOf(app) { var g = window.ALBA_GUIDES || {}; var lang = document.documentElement.lang; return ((g[lang] || g.en || {})[app === 'outlook' ? 'microsoft' : app]) || null }
  function cardHead(a) {
    var meta = APPS[a.app] || { color: '#64748b' }
    var head = el('div', 'head'); head.appendChild(avatar(a.app, meta.name))
    var nm = el('div', 'grow'); nm.appendChild(el('b', null, meta.name || a.app)); nm.appendChild(el('div', 'who', a.label + ' · ' + a.space))
    var chip = el('span', 'chip' + (a.connected ? ' ok' : ''), a.connected ? T.connected : T.todo)
    head.appendChild(nm); head.appendChild(chip)
    return { head: head, chip: chip }
  }
  function fieldInputs(g, c) {
    var ins = {}
    g.fields.forEach(function (f) {
      var i = el('input'); i.placeholder = f.ph; i.spellcheck = false
      if (f.secret) { i.type = 'password'; i.autocomplete = 'new-password' } else i.autocomplete = 'off'
      ins[f.k] = i; c.appendChild(i)
    })
    return ins
  }
  // Un passo può essere testo semplice, oppure un oggetto ricco (titolo, descrizione, valori da copiare, sotto-passi) come la guida di Google
  function stepList(steps) {
    var ol = el('ol', 'plain')
    steps.forEach(function (s) {
      if (typeof s === 'string') { ol.appendChild(el('li', null, s)); return }
      var li = el('li', 'rich')
      if (s.t) li.appendChild(el('b', null, s.t))
      if (s.link) { var row = el('div', 'row'); row.appendChild(link(s.link, (s.ll || s.link) + ' ↗')); li.appendChild(row) }
      if (s.d) li.appendChild(el('p', 'sd', s.d))
      if (s.copies) s.copies.forEach(function (cp) { li.appendChild(copyChip(cp[0], cp[1])) })
      if (s.sub) {
        var sl = el('ol', 'sub')
        s.sub.forEach(function (ss) {
          var si = el('li')
          if (ss.t) si.appendChild(el('b', null, ss.t))
          if (ss.d) si.appendChild(el('div', 'sd', ss.d))
          if (ss.copies) ss.copies.forEach(function (cp) { si.appendChild(copyChip(cp[0], cp[1])) })
          sl.appendChild(si)
        })
        li.appendChild(sl)
      }
      ol.appendChild(li)
    })
    return ol
  }
  // Notion, Linear, Trello, GitHub: guida + campi da incollare (verificati e salvati nel deposito segreti dal backend)
  function tokenCard(a) {
    var g = guideOf(a.app), c = el('section', 'card'), h = cardHead(a)
    c.appendChild(h.head)
    var stepsHaveLink = g.steps.some(function (s) { return s && s.link })
    c.appendChild(stepList(g.steps))
    if (!stepsHaveLink) { var row = el('div', 'row'); g.links.forEach(function (l) { row.appendChild(link(l.href, l.text + ' ↗')) }); c.appendChild(row) }
    var ins = fieldInputs(g, c)
    if (g.auth && ins.key) {
      var ar = el('div', 'row'); var ab = el('a', 'btn', g.auth.text + ' ↗'); ab.href = '#'
      ab.addEventListener('click', function (ev) { ev.preventDefault(); var k = (ins.key.value || '').trim(); if (/^[0-9a-fA-F]{20,}$/.test(k)) { window.open(g.auth.url + encodeURIComponent(k), '_blank', 'noopener') } else { ins.key.focus() } })
      ar.appendChild(ab); c.appendChild(ar)
    }
    var btn = el('button', 'btn primary', T.connect || 'OK'); btn.type = 'button'
    var msg = el('div', 'msg')
    btn.addEventListener('click', function () {
      var values = {}, miss = false
      g.fields.forEach(function (f) { values[f.k] = (ins[f.k].value || '').trim(); if (!values[f.k] && !f.optional) miss = true })
      if (miss) return
      btn.disabled = true; msg.className = 'msg'; msg.textContent = ''
      api('/setup/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id, values: values }) }).then(function (r) {
        btn.disabled = false
        Object.keys(ins).forEach(function (k) { if (ins[k].type === 'password') ins[k].value = '' })
        if (r.ok && r.j.ok) { msg.className = 'msg ok'; msg.textContent = T.ok + (r.j.who ? ' · ' + r.j.who : '') + (r.j.count != null ? ' · ' + r.j.count : ''); h.chip.className = 'chip ok'; h.chip.textContent = T.connected }
        else { msg.className = 'msg bad'; msg.textContent = errText(r.j) }
      }).catch(function () { btn.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
    })
    c.appendChild(btn); c.appendChild(el('div', 'note', g.note)); c.appendChild(msg)
    return c
  }
  // Outlook: app registrata dall'utente su Microsoft Entra + accesso con codice (device code), senza segreti da incollare
  function msCard(a) {
    var g = guideOf(a.app), c = el('section', 'card'), h = cardHead(a)
    c.appendChild(h.head)
    var ol = el('ol', 'plain'); g.steps.forEach(function (s) { ol.appendChild(el('li', null, s)) }); c.appendChild(ol)
    var row = el('div', 'row'); g.links.forEach(function (l) { row.appendChild(link(l.href, l.text + ' ↗')) }); c.appendChild(row)
    var ins = fieldInputs(g, c)
    var btn = el('button', 'btn primary', g.login); btn.type = 'button'
    var msg = el('div', 'msg'), box = el('div', 'msbox')
    var timer = null
    btn.addEventListener('click', function () {
      var cid = (ins.clientId.value || '').trim(); if (!cid) return
      btn.disabled = true; msg.className = 'msg'; msg.textContent = ''; box.textContent = ''
      api('/setup/api/ms-start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id, clientId: cid, tenant: (ins.tenant.value || '').trim() }) }).then(function (r) {
        if (!(r.ok && r.j.userCode)) { btn.disabled = false; msg.className = 'msg bad'; msg.textContent = errText(r.j); return }
        box.appendChild(copyChip(g.code, r.j.userCode)); box.appendChild(link(r.j.url || 'https://microsoft.com/devicelogin', g.openCode + ' ↗', 'btn'))
        msg.textContent = g.waiting
        var t0 = Date.now(), every = Math.max(3, +r.j.interval || 5) * 1000
        timer = setInterval(function () {
          api('/setup/api/ms-poll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id }) }).then(function (q) {
            if (q.ok && q.j.pending) return
            clearInterval(timer); btn.disabled = false
            if (q.ok && q.j.ok) { box.textContent = ''; msg.className = 'msg ok'; msg.textContent = T.ok + (q.j.who ? ' · ' + q.j.who : '') + (q.j.count != null ? ' · ' + q.j.count : ''); h.chip.className = 'chip ok'; h.chip.textContent = T.connected }
            else { msg.className = 'msg bad'; msg.textContent = errText(q.j) }
          })
          if (Date.now() - t0 > (+r.j.expiresIn || 900) * 1000) { clearInterval(timer); btn.disabled = false; msg.className = 'msg bad'; msg.textContent = g.expired }
        }, every)
      }).catch(function () { btn.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
    })
    c.appendChild(btn); c.appendChild(box); c.appendChild(el('div', 'note', g.note)); c.appendChild(msg)
    return c
  }

  function plainCard(a) {
    var meta = APPS[a.app] || { color: '#64748b' }, tx = T[a.kind] || T.browser
    var c = el('section', 'card')
    var head = el('div', 'head'); head.appendChild(avatar(a.app, meta.name))
    var nm = el('div', 'grow'); nm.appendChild(el('b', null, meta.name || a.app)); nm.appendChild(el('div', 'who', a.label + ' · ' + a.space))
    var chip = el('span', 'chip' + (a.connected ? ' ok' : ''), a.connected ? T.connected : T.todo)
    head.appendChild(nm); head.appendChild(chip); c.appendChild(head)
    var ol = el('ol', 'plain'); tx.steps.forEach(function (s) { ol.appendChild(el('li', null, s)) }); c.appendChild(ol)
    if (a.kind === 'slack') { var mc = copyChip(tx.mlabel, MANIFEST); c.appendChild(mc) }
    var msg = el('div', 'msg')
    var row = el('div', 'row'); var urlIn = null; var emailIn = null
    if (a.kind === 'youtrack') {
      urlIn = el('input'); urlIn.placeholder = tx.phUrl; urlIn.spellcheck = false; urlIn.autocomplete = 'off'; c.appendChild(urlIn)
      var lk = el('a', 'btn', tx.link + ' ↗'); lk.href = '#'
      lk.addEventListener('click', function (ev) { ev.preventDefault(); var u = (urlIn.value || '').trim().replace(/\/$/, ''); if (/^https:\/\/[A-Za-z0-9.\-:]+/.test(u)) window.open(u + '/users/me?tab=account-security', '_blank', 'noopener') })
      row.appendChild(lk)
    } else if (a.kind === 'jira' || a.kind === 'confluence') {
      urlIn = el('input'); urlIn.placeholder = tx.phUrl; urlIn.spellcheck = false; urlIn.autocomplete = 'off'; c.appendChild(urlIn)
      emailIn = el('input'); emailIn.placeholder = tx.phEmail; emailIn.spellcheck = false; emailIn.autocomplete = 'off'; c.appendChild(emailIn)
      row.appendChild(link('https://id.atlassian.com/manage-profile/security/api-tokens', tx.link + ' ↗'))
    } else if (a.kind === 'slack') row.appendChild(link('https://api.slack.com/apps?new_app=1', tx.link + ' ↗'))
    else {
      var ob = el('button', 'btn', tx.link); ob.type = 'button'
      ob.addEventListener('click', function () {
        ob.disabled = true
        api('/setup/api/open-crew', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id }) }).then(function (r) {
          ob.disabled = false
          if (r.ok && r.j.ok) { msg.className = 'msg ok'; msg.textContent = tx.sent } else { msg.className = 'msg bad'; msg.textContent = errText(r.j) }
        }).catch(function () { ob.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
      })
      row.appendChild(ob)
    }
    c.appendChild(row)
    if (a.kind === 'youtrack' || a.kind === 'jira' || a.kind === 'confluence' || a.kind === 'slack') {
      var inp = el('input'); inp.type = 'password'; inp.placeholder = tx.ph; inp.autocomplete = 'new-password'; inp.spellcheck = false
      var btn = el('button', 'btn primary', tx.save); btn.type = 'button'
      btn.addEventListener('click', function () {
        if (!inp.value.trim()) return
        if (emailIn && !emailIn.value.trim()) return
        btn.disabled = true; btn.textContent = tx.saving; msg.className = 'msg'; msg.textContent = ''
        api('/setup/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id, value: inp.value, url: urlIn ? urlIn.value : '', values: emailIn ? { email: emailIn.value } : undefined }) }).then(function (r) {
          inp.value = ''; btn.disabled = false; btn.textContent = tx.save
          if (r.ok && r.j.ok) { msg.className = 'msg ok'; msg.textContent = T.ok + (r.j.count != null ? ' · ' + r.j.count : ''); chip.className = 'chip ok'; chip.textContent = T.connected }
          else { msg.className = 'msg bad'; msg.textContent = errText(r.j) }
        }).catch(function () { btn.disabled = false; btn.textContent = tx.save; msg.className = 'msg bad'; msg.textContent = T.bad })
      })
      c.appendChild(inp); c.appendChild(btn)
    }
    var gx = a.kind === 'browser' ? guideOf(a.app) : null
    c.appendChild(el('div', 'note', gx && gx.note ? gx.note : tx.note)); c.appendChild(msg)
    if (a.kind === 'slack') slackTabs(c, a, tx, chip, head)
    return c
  }

  // Slack has two ways in: a token (API) or a daily recap asked to Slackbot in Crew's browser
  function slackTabs(c, a, tx, chip, head) {
    var tokenBox = el('div', 'tabbox'); var botBox = el('div', 'tabbox')
    while (head.nextSibling) tokenBox.appendChild(head.nextSibling)
    var tabs = el('div', 'tabs'); var bt = el('button', 'tab', tx.tabToken), bb = el('button', 'tab', tx.tabBot); bt.type = bb.type = 'button'
    tabs.appendChild(bt); tabs.appendChild(bb)
    var ol = el('ol', 'plain'); tx.botSteps.forEach(function (x) { ol.appendChild(el('li', null, x)) }); botBox.appendChild(ol)
    var inp = el('input'); inp.placeholder = tx.botPh; inp.spellcheck = false; inp.autocomplete = 'off'; inp.value = a.slackbot || ''
    var msg = el('div', 'msg'); var sv = el('button', 'btn primary', tx.botSave); sv.type = 'button'
    sv.addEventListener('click', function () {
      if (!inp.value.trim()) return
      sv.disabled = true; msg.className = 'msg'; msg.textContent = ''
      api('/setup/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id, value: '', url: inp.value.trim(), values: { mode: 'slackbot' } }) }).then(function (r) {
        sv.disabled = false
        if (r.ok && r.j.ok) { msg.className = 'msg ok'; msg.textContent = T.ok; chip.className = 'chip ok'; chip.textContent = T.connected }
        else { msg.className = 'msg bad'; msg.textContent = errText(r.j) }
      }).catch(function () { sv.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
    })
    var ob = el('button', 'btn', tx.botOpen); ob.type = 'button'
    ob.addEventListener('click', function () {
      ob.disabled = true
      api('/setup/api/open-crew', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.id }) }).then(function (r) {
        ob.disabled = false
        if (r.ok && r.j.ok) { msg.className = 'msg ok'; msg.textContent = tx.botSent } else { msg.className = 'msg bad'; msg.textContent = errText(r.j) }
      }).catch(function () { ob.disabled = false; msg.className = 'msg bad'; msg.textContent = T.bad })
    })
    botBox.insertBefore(ob, null); botBox.appendChild(inp); botBox.appendChild(sv); botBox.appendChild(el('div', 'note', tx.botNote)); botBox.appendChild(msg)
    function pick(bot) { bt.classList.toggle('on', !bot); bb.classList.toggle('on', bot); tokenBox.hidden = bot; botBox.hidden = !bot }
    bt.addEventListener('click', function () { pick(false) }); bb.addEventListener('click', function () { pick(true) })
    c.appendChild(tabs); c.appendChild(tokenBox); c.appendChild(botBox)
    pick(!!a.slackbot && !a.connected)
  }

  function boot() {
    document.getElementById('t-title').textContent = T.title
    document.getElementById('t-sub').textContent = T.sub
    document.getElementById('t-safe').textContent = T.safe
    api('/setup/api/info').then(function (r) {
      var list = document.getElementById('list')
      if (!r.ok) { list.appendChild(el('div', 'card', T.expired)); return }
      if (r.j.lang && L[pick(r.j.lang)]) { LANG = pick(r.j.lang); T = L[LANG]; document.documentElement.lang = LANG; document.getElementById('t-title').textContent = T.title; document.getElementById('t-sub').textContent = T.sub; document.getElementById('t-safe').textContent = T.safe }
      var googleSpaces = []
      r.j.accounts.forEach(function (a) { if (a.kind === 'google' && googleSpaces.indexOf(a.space) < 0) googleSpaces.push(a.space) })
      googleSpaces.forEach(function (sp) { list.appendChild(prepCard(r.j, sp)) })
      r.j.accounts.forEach(function (a) { list.appendChild(a.kind === 'google' ? googleCard(a, r.j) : a.kind === 'token' && guideOf(a.app) ? tokenCard(a) : a.kind === 'microsoft' && guideOf(a.app) ? msCard(a) : plainCard(a)) })
    }).catch(function () { document.getElementById('list').appendChild(el('div', 'card', T.expired)) })
  }
  boot()
})()
