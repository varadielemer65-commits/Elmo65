const manifestVersion = chrome.runtime.getManifest().version;

const defaults = { enabled: true, blurIncoming: true, warnOutgoing: true, sensitivity: 1 };

const sensitivityTexts = {
  1: '🟢 Enyhe — opál: élet/testi fenyegetés + szexuális agresszió + hergelés; a többi csak ⚠️ jelzés',
  2: '🔴 Erős — opálosan takarja: életellenes/testi fenyegetés, szexuális agresszió, hergelés/gyűlöletkeltés, méltóságsértés, személyes sértés és lekicsinylés'
};

function updateSensitivityVisual(value) {
  const section = document.querySelector('.sensitivity-section');
  const sensitivity = document.getElementById('sensitivity');
  const val = Math.max(1, Math.min(2, parseInt(value) || 1));
  if (section) {
    section.classList.toggle('sens-1', val === 1);
    section.classList.toggle('sens-2', val === 2);
  }
  if (sensitivity) {
    sensitivity.style.setProperty('--eh-sens-color', val === 1 ? '#22c55e' : '#ef4444');
    sensitivity.style.setProperty('--eh-sens-glow', val === 1 ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getActiveTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab || null;
  } catch (_) {
    return null;
  }
}

function isSupportedPage(tab) {
  const url = tab && tab.url ? tab.url : '';
  return /^https?:\/\//i.test(url);
}

async function pingContentScript(tabId, timeoutMs = 700) {
  if (!tabId) return { ok: false, reason: 'no-tab' };
  try {
    const ping = chrome.tabs.sendMessage(tabId, { type: 'EH_PING', version: manifestVersion });
    const timeout = new Promise(resolve => setTimeout(() => resolve({ ok: false, reason: 'timeout' }), timeoutMs));
    const response = await Promise.race([ping, timeout]);
    if (response && response.ok) return { ok: true, response };
    return { ok: false, reason: 'no-response' };
  } catch (err) {
    return { ok: false, reason: err && err.message ? err.message : 'send-failed' };
  }
}

function setRefreshNoticeText(text) {
  const notice = document.getElementById('refreshNotice');
  if (!notice) return;
  const p = notice.querySelector('p');
  if (p) p.textContent = text;
}

async function markVersionActivated() {
  try { await chrome.storage.local.set({ ehLastActivatedVersion: manifestVersion }); } catch (_) {}
  const notice = document.getElementById('refreshNotice');
  if (notice) notice.hidden = true;
}

async function updateRefreshNotice() {
  const notice = document.getElementById('refreshNotice');
  if (!notice) return;

  const tab = await getActiveTab();
  if (!tab || !isSupportedPage(tab)) {
    notice.hidden = true;
    return;
  }

  const ping = await pingContentScript(tab.id, 900);
  if (ping.ok) {
    await markVersionActivated();
    return;
  }

  notice.hidden = false;
  setRefreshNoticeText('Új telepítés vagy frissítés után frissítsd az aktuális oldalt. A gomb után a popup ellenőrzi, hogy az Emberi Hang motor tényleg elindult-e.');
}

async function waitForContentScript(tabId) {
  for (let i = 0; i < 18; i++) {
    await sleep(i < 3 ? 450 : 700);
    const ping = await pingContentScript(tabId, 900);
    if (ping.ok) return true;
  }
  return false;
}

async function refreshCurrentPage() {
  const notice = document.getElementById('refreshNotice');
  const btn = document.getElementById('refreshPage');
  const tab = await getActiveTab();

  if (!tab || !isSupportedPage(tab)) {
    if (notice) notice.hidden = false;
    setRefreshNoticeText('Ezen az oldalon a Chrome nem engedi a bővítmény futását. Nyiss meg egy támogatott weboldalt, például YouTube-ot vagy egy hírportált.');
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'FRISSÍTÉS ÉS ELLENŐRZÉS...';
    }
    setRefreshNoticeText('Az oldal frissül. Várj pár másodpercet: ellenőrzöm, hogy az Emberi Hang motor tényleg elindult-e.');

    await chrome.tabs.reload(tab.id);
    const ready = await waitForContentScript(tab.id);

    if (ready) {
      await markVersionActivated();
    } else {
      if (notice) notice.hidden = false;
      setRefreshNoticeText('Az oldal frissült, de a védelem visszajelzése még nem érkezett meg. Frissítsd még egyszer az oldalt, vagy indítsd újra a böngészőt.');
    }
  } catch (_) {
    if (notice) notice.hidden = false;
    setRefreshNoticeText('Kérlek frissítsd kézzel az aktuális oldalt. Utána a védelem élőben reagál.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'OLDAL FRISSÍTÉSE';
    }
  }
}

async function loadSettings() {
  const s = await chrome.storage.sync.get(defaults);
  for (const k of ['enabled', 'blurIncoming', 'warnOutgoing']) {
    const el = document.getElementById(k);
    if (el) el.checked = s[k];
  }
  const sens = Math.max(1, Math.min(2, parseInt(s.sensitivity) || 1));
  if (s.sensitivity !== sens) await chrome.storage.sync.set({ sensitivity: sens });
  const sensitivity = document.getElementById('sensitivity');
  const desc = document.getElementById('sensitivityDesc');
  if (sensitivity) sensitivity.value = sens;
  if (desc) desc.textContent = sensitivityTexts[sens];
  updateSensitivityVisual(sens);
}

async function notifyActiveTab(settingsPatch) {
  const tab = await getActiveTab();
  if (!tab || !tab.id || !isSupportedPage(tab)) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'EH_SETTINGS_CHANGE', settings: settingsPatch });
  } catch (_) {
    // Ha az oldalban még nem fut a content script, a storage.onChanged sem fog hatni.
    // Ilyenkor az aktiválási panel maradjon látható, hogy a felhasználó frissítsen.
    await updateRefreshNotice();
  }
}

async function saveSetting(e) {
  const patch = { [e.target.id]: e.target.checked };
  await chrome.storage.sync.set(patch);
  await notifyActiveTab(patch);
}

async function saveSensitivity(e) {
  const val = Math.max(1, Math.min(2, parseInt(e.target.value) || 1));
  const patch = { sensitivity: val };
  await chrome.storage.sync.set(patch);
  await notifyActiveTab(patch);
  const desc = document.getElementById('sensitivityDesc');
  if (desc) desc.textContent = sensitivityTexts[val];
  updateSensitivityVisual(val);
}

const sensitivity = document.getElementById('sensitivity');
if (sensitivity) sensitivity.addEventListener('input', saveSensitivity);

for (const k of ['enabled', 'blurIncoming', 'warnOutgoing']) {
  const el = document.getElementById(k);
  if (el) el.addEventListener('change', saveSetting);
}

const refreshBtn = document.getElementById('refreshPage');
if (refreshBtn) refreshBtn.addEventListener('click', refreshCurrentPage);

const restartHelpBtn = document.getElementById('showRestartHelp');
const restartHelp = document.getElementById('restartHelp');
if (restartHelpBtn && restartHelp) {
  restartHelpBtn.addEventListener('click', () => {
    restartHelp.hidden = !restartHelp.hidden;
  });
}

const copyRestartBtn = document.getElementById('copyRestartUrl');
if (copyRestartBtn) {
  copyRestartBtn.addEventListener('click', async () => {
    const status = document.getElementById('restartCopyStatus');
    try {
      await navigator.clipboard.writeText('chrome://restart');
      if (status) status.textContent = 'Kimásolva. Illeszd a címsorba, ha szeretnéd újraindítani a Chrome-ot.';
    } catch (_) {
      if (status) status.textContent = 'Nem sikerült másolni. Írd be kézzel: chrome://restart';
    }
  });
}

loadSettings().then(updateRefreshNotice);
