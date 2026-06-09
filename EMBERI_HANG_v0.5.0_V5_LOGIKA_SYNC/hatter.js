// Emberi Hang - háttér service worker (v0.3)
// content.js NINCS - minden logika itt van inline befecskendezve

// ── CSS inline (styles.css tartalma) ──────────────────────────────────────────
const INLINE_CSS = `
.th-blurred {
  filter: blur(6px) !important;
  -webkit-filter: blur(6px) !important;
  transition: filter 0.2s !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  position: relative !important;
  z-index: 1 !important;
  isolation: isolate !important;
}
.th-blurred:hover {
  filter: none !important;
  -webkit-filter: none !important;
}
.th-blur-wrapper {
  filter: blur(6px) !important;
  -webkit-filter: blur(6px) !important;
  transition: filter 0.2s !important;
  cursor: pointer !important;
  display: inline-block !important;
  max-width: 100% !important;
}
.th-blur-wrapper:hover {
  filter: none !important;
  -webkit-filter: none !important;
}
.th-blur-fallback-wrapper {
  color: transparent !important;
  background: #888 !important;
  border-radius: 3px !important;
  user-select: none !important;
}
.th-blur-fallback-wrapper:hover {
  color: inherit !important;
  background: transparent !important;
}
/* Fallback: ha a filter nem működik, szöveg helyett ████ jelenik meg */
.th-blurred-fallback {
  color: transparent !important;
  background: #888 !important;
  border-radius: 3px !important;
  cursor: pointer !important;
  user-select: none !important;
}
.th-blurred-fallback:hover {
  color: inherit !important;
  background: transparent !important;
}
.th-badge {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  background: #c0392b;
  color: #fff;
  border-radius: 4px;
  font-size: 11px;
  font-family: sans-serif;
  vertical-align: middle;
}
.th-warning-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
  background: linear-gradient(145deg, #fff 0%, var(--th-bg, #fff0f0) 100%);
  border: 4px solid var(--th-color, #c0392b);
  border-radius: 22px;
  padding: 22px 26px 18px;
  width: min(460px, calc(100vw - 36px));
  max-width: 460px;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 15px;
  color: var(--th-text, #3a1111);
  box-shadow:
    0 0 0 6px var(--th-soft, rgba(192,57,43,0.16)),
    0 0 24px 7px var(--th-glow, rgba(192,57,43,0.34)),
    0 16px 46px rgba(0,0,0,0.24);
  animation: th-glow 1.65s ease-in-out infinite;
}
@keyframes th-glow {
  0%   { box-shadow: 0 0 0 5px var(--th-soft, rgba(192,57,43,0.14)), 0 0 18px 4px var(--th-glow, rgba(192,57,43,0.26)), 0 16px 46px rgba(0,0,0,0.22); }
  50%  { box-shadow: 0 0 0 10px var(--th-soft-strong, rgba(192,57,43,0.25)), 0 0 34px 10px var(--th-glow-strong, rgba(192,57,43,0.44)), 0 16px 46px rgba(0,0,0,0.30); }
  100% { box-shadow: 0 0 0 5px var(--th-soft, rgba(192,57,43,0.14)), 0 0 18px 4px var(--th-glow, rgba(192,57,43,0.26)), 0 16px 46px rgba(0,0,0,0.22); }
}
.th-warning-box h3 {
  margin: 0 0 10px;
  color: var(--th-color, #c0392b);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.th-warning-box p {
  margin: 6px 0;
  color: var(--th-text, #3a1111);
  line-height: 1.5;
}
.th-warning-box button {
  margin-top: 12px;
  margin-right: 8px;
  padding: 7px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.1s;
  border: 2.5px solid;
}
.th-warning-box #th-use-rewrite {
  background: #d4f7e0;
  color: #1a6b3a;
  border-color: #2ecc71;
}
.th-warning-box #th-use-rewrite:hover {
  background: #2ecc71;
  color: #fff;
  transform: scale(1.04);
}
.th-warning-box #th-close, .th-warning-box #th-understood {
  background: #fde8e8;
  color: #8b1a1a;
  border-color: #e74c3c;
}
.th-warning-box #th-close:hover, .th-warning-box #th-understood:hover {
  background: var(--th-color, #e74c3c);
  color: #fff;
  transform: scale(1.04);
}
.th-highlight {
  background: linear-gradient(180deg, transparent 60%, rgba(140,60,180,0.5) 60%) !important;
  border-bottom: 2px solid rgba(140,60,180,0.8) !important;
  border-radius: 2px !important;
  cursor: help !important;
  transition: background 0.2s !important;
  display: inline !important;
}
.th-highlight:hover {
  background: rgba(140,60,180,0.15) !important;
}
.th-detail-panel {
  display: inline-block;
  position: relative;
  margin-left: 6px;
  padding: 8px 28px 8px 12px;
  background: #fff;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 12px;
  font-family: sans-serif;
  color: #333;
  max-width: 320px;
  line-height: 1.5;
  box-shadow: 0 3px 12px rgba(0,0,0,0.12);
  vertical-align: middle;
  animation: th-fadein 0.15s ease;
}
@keyframes th-fadein {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.th-detail-close {
  position: absolute;
  top: 4px;
  right: 8px;
  cursor: pointer;
  color: #aaa;
  font-size: 13px;
  font-weight: bold;
}
.th-detail-close:hover { color: #555; }
.th-warning-box.th-calm-down {
  animation: th-calm-out 0.55s ease forwards !important;
}
@keyframes th-calm-out {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
}
.th-empathy-line {
  margin-top: 10px !important;
  padding-top: 9px !important;
  border-top: 1px solid var(--th-soft, rgba(0,0,0,0.12)) !important;
  font-weight: 650 !important;
}

/* Stabil olvasási/komment opálosítás: puha, élő, kattintásra nyíló opálréteg */
.th-opalized {
  position: relative !important;
  display: inline-block !important;
  max-width: 100% !important;
  min-height: 1.7em !important;
  border-radius: 14px !important;
  overflow: visible !important;
  isolation: isolate !important;
  cursor: pointer !important;
  transition: filter 0.18s ease, opacity 0.18s ease !important;
  margin-bottom: 6px !important;
}
.th-opalized:not(.th-opal-revealed) > * {
  filter: blur(3.8px) contrast(0.58) saturate(0.82) !important;
  opacity: 0.24 !important;
  transition: filter 0.18s ease, opacity 0.18s ease !important;
}
.th-opalized.th-opal-revealed > * {
  filter: none !important;
  opacity: 1 !important;
}
.th-opalized::before {
  content: "";
  position: absolute !important;
  inset: 0 !important;
  z-index: 2147483645 !important;
  border-radius: inherit !important;
  background:
    radial-gradient(circle at 18% 12%, rgba(255,255,255,0.20), rgba(255,255,255,0.06) 38%, rgba(10,14,24,0.54) 76%),
    linear-gradient(135deg, rgba(248,250,252,0.34), rgba(15,23,42,0.68)),
    color-mix(in srgb, var(--th-opal-color, #c0392b) 28%, rgba(10,14,24,0.76)) !important;
  border: 1.5px solid color-mix(in srgb, var(--th-opal-color, #c0392b) 52%, rgba(255,255,255,0.18)) !important;
  box-shadow:
    inset 0 0 34px rgba(255,255,255,0.14),
    inset 0 0 58px rgba(8,12,20,0.40),
    0 0 0 4px color-mix(in srgb, var(--th-opal-color, #c0392b) 11%, transparent),
    0 0 34px color-mix(in srgb, var(--th-opal-color, #c0392b) 22%, transparent) !important;
  backdrop-filter: blur(28px) saturate(1.08) contrast(0.54) brightness(0.92) !important;
  -webkit-backdrop-filter: blur(28px) saturate(1.08) contrast(0.54) brightness(0.92) !important;
  pointer-events: none !important;
  animation: th-opal-pulse 2.6s ease-in-out infinite !important;
  transition: opacity 0.18s ease, backdrop-filter 0.18s ease, -webkit-backdrop-filter 0.18s ease !important;
}
.th-opalized[data-th-opal-type="hate"]::before {
  background:
    linear-gradient(118deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0) 42%,
      rgba(191,219,254,0.00) 44%,
      rgba(255,255,255,0.72) 46%,
      rgba(147,197,253,0.95) 47%,
      rgba(255,255,255,0.34) 49%,
      rgba(255,255,255,0) 52%,
      rgba(255,255,255,0) 100%),
    radial-gradient(circle at 18% 12%, rgba(255,255,255,0.17), rgba(255,255,255,0.04) 38%, rgba(8,12,20,0.58) 76%),
    linear-gradient(135deg, rgba(219,234,254,0.20), rgba(15,23,42,0.72)),
    color-mix(in srgb, var(--th-opal-color, #111827) 32%, rgba(7,10,18,0.82)) !important;
  background-size: 260% 100%, auto, auto, auto !important;
  background-position: 150% 0, 0 0, 0 0, 0 0 !important;
  animation: th-opal-pulse 2.9s ease-in-out infinite, th-hate-electric 8.5s ease-in-out infinite !important;
}
.th-opalized[data-th-opal-type="threat"]::before {
  background:
    linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,99,99,0.00) 18%,
      rgba(255,108,108,0.18) 28%,
      rgba(255,72,72,0.34) 40%,
      rgba(255,108,108,0.16) 54%,
      rgba(255,255,255,0) 72%,
      rgba(255,255,255,0) 100%),
    radial-gradient(circle at 18% 12%, rgba(255,255,255,0.18), rgba(255,255,255,0.05) 38%, rgba(18,14,18,0.48) 76%),
    linear-gradient(135deg, rgba(255,245,245,0.26), rgba(44,10,10,0.72)),
    color-mix(in srgb, var(--th-opal-color, #c0392b) 34%, rgba(18,10,10,0.80)) !important;
  background-size: 220% 100%, auto, auto, auto !important;
  background-position: -120% 0, 0 0, 0 0, 0 0 !important;
  animation: th-opal-pulse 2.3s ease-in-out infinite, th-threat-wave 4.8s ease-in-out infinite !important;
}
@keyframes th-opal-pulse {
  0% {
    border-color: color-mix(in srgb, var(--th-opal-color, #c0392b) 34%, rgba(255,255,255,0.14));
    box-shadow: inset 0 0 18px rgba(255,255,255,0.10), 0 0 0 2px color-mix(in srgb, var(--th-opal-color, #c0392b) 8%, transparent), 0 0 18px color-mix(in srgb, var(--th-opal-color, #c0392b) 15%, transparent);
  }
  50% {
    border-color: color-mix(in srgb, var(--th-opal-color, #c0392b) 60%, rgba(255,255,255,0.20));
    box-shadow: inset 0 0 24px rgba(255,255,255,0.14), 0 0 0 6px color-mix(in srgb, var(--th-opal-color, #c0392b) 14%, transparent), 0 0 36px color-mix(in srgb, var(--th-opal-color, #c0392b) 26%, transparent);
  }
  100% {
    border-color: color-mix(in srgb, var(--th-opal-color, #c0392b) 34%, rgba(255,255,255,0.14));
    box-shadow: inset 0 0 18px rgba(255,255,255,0.10), 0 0 0 2px color-mix(in srgb, var(--th-opal-color, #c0392b) 8%, transparent), 0 0 18px color-mix(in srgb, var(--th-opal-color, #c0392b) 15%, transparent);
  }
}
@keyframes th-hate-electric {
  0%, 61%, 100% {
    background-position: 155% 0, 0 0, 0 0, 0 0;
  }
  64% {
    background-position: 72% 0, 0 0, 0 0, 0 0;
  }
  65% {
    background-position: 68% 0, 0 0, 0 0, 0 0;
  }
  66% {
    background-position: 54% 0, 0 0, 0 0, 0 0;
  }
  68% {
    background-position: 26% 0, 0 0, 0 0, 0 0;
  }
  70% {
    background-position: -22% 0, 0 0, 0 0, 0 0;
  }
}
@keyframes th-threat-wave {
  0%, 100% {
    background-position: -120% 0, 0 0, 0 0, 0 0;
  }
  50% {
    background-position: 135% 0, 0 0, 0 0, 0 0;
  }
}
.th-opalized::after {
  content: "⚠️  " attr(data-th-opal-label);
  position: absolute !important;
  inset: 0 !important;
  z-index: 2147483646 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  padding: 6px 12px !important;
  box-sizing: border-box !important;
  font-family: 'Segoe UI', Arial, sans-serif !important;
  font-size: 13px !important;
  font-weight: 850 !important;
  line-height: 1.2 !important;
  color: #facc15 !important;
  text-shadow: 0 2px 4px rgba(45,45,45,0.82), 0 0 3px rgba(45,45,45,0.68) !important;
  pointer-events: none !important;
  transition: opacity 0.18s ease !important;
}
.th-opalized:hover::before {
  background:
    radial-gradient(circle at 18% 12%, rgba(255,255,255,0.18), rgba(255,255,255,0.060) 38%, rgba(18,24,38,0.38) 76%),
    linear-gradient(135deg, rgba(248,250,252,0.35), rgba(30,41,59,0.48)),
    color-mix(in srgb, var(--th-opal-color, #c0392b) 20%, rgba(15,23,42,0.60)) !important;
}
.th-opalized.th-opal-revealed::before,
.th-opalized.th-opal-revealed::after {
  opacity: 0 !important;
}
.th-opalized.th-opal-revealed {
  cursor: default !important;
}


/* Kategória-specifikus PEREM-effektek:
   Nem az opál alatt futnak, hanem a keret/fénygyűrű körül, ezért láthatók maradnak erős takarás mellett is. */
.th-opalized[data-th-opal-type="hate"]:not(.th-opal-revealed) {
  animation: th-hate-frame-electric 7.5s ease-in-out infinite !important;
}
.th-opalized[data-th-opal-type="threat"]:not(.th-opal-revealed) {
  animation: th-threat-frame-redwave 4.6s ease-in-out infinite !important;
}

@keyframes th-hate-frame-electric {
  0%, 55%, 100% {
    box-shadow:
      0 0 0 2px rgba(17,24,39,0.18),
      0 0 18px rgba(17,24,39,0.26) !important;
  }
  58% {
    box-shadow:
      -8px 0 0 1px rgba(255,255,255,0.72),
      -2px 0 16px rgba(191,219,254,0.92),
      0 0 30px rgba(147,197,253,0.50) !important;
  }
  60% {
    box-shadow:
      5px 0 0 1px rgba(219,234,254,0.90),
      0 0 22px rgba(255,255,255,0.88),
      0 0 38px rgba(96,165,250,0.62) !important;
  }
  62% {
    box-shadow:
      12px 0 0 1px rgba(191,219,254,0.62),
      0 0 18px rgba(147,197,253,0.76),
      0 0 28px rgba(255,255,255,0.38) !important;
  }
  67% {
    box-shadow:
      0 0 0 2px rgba(17,24,39,0.18),
      0 0 20px rgba(147,197,253,0.26) !important;
  }
}

@keyframes th-threat-frame-redwave {
  0%, 100% {
    box-shadow:
      0 0 0 2px rgba(192,57,43,0.10),
      0 0 18px rgba(192,57,43,0.22) !important;
  }
  45% {
    box-shadow:
      0 0 0 5px rgba(239,68,68,0.17),
      0 0 30px rgba(239,68,68,0.44),
      0 0 46px rgba(127,29,29,0.32) !important;
  }
  58% {
    box-shadow:
      0 0 0 8px rgba(239,68,68,0.10),
      0 0 40px rgba(248,113,113,0.36),
      0 0 60px rgba(185,28,28,0.24) !important;
  }
}





/* Emberi Hang – finom jelzés azoknak a kategóriáknak, amelyeket az adott érzékenység nem takar opállal */
.th-soft-flagged {
  position: relative !important;
}
.th-soft-marker {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 22px !important;
  height: 22px !important;
  min-width: 22px !important;
  margin: 0 6px 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: #facc15 !important;
  font-size: 21px !important;
  line-height: 1 !important;
  cursor: help !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.82), 0 0 6px color-mix(in srgb, var(--th-marker-color, #eab308) 35%, transparent) !important;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.55)) !important;
  vertical-align: text-top !important;
}
.th-soft-marker:hover {
  transform: translateY(-1px) scale(1.08) !important;
  color: color-mix(in srgb, #facc15 72%, var(--th-marker-color, #eab308)) !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.88), 0 0 10px color-mix(in srgb, var(--th-marker-color, #eab308) 55%, transparent) !important;
}
.th-marker-info {
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 2147483647 !important;
  width: min(430px, calc(100vw - 36px)) !important;
  padding: 16px 18px !important;
  border-radius: 18px !important;
  border: 2px solid var(--th-marker-color, #eab308) !important;
  background: rgba(17,24,39,0.96) !important;
  color: #f8fafc !important;
  font-family: 'Segoe UI', Arial, sans-serif !important;
  box-shadow: 0 18px 50px rgba(0,0,0,0.38), 0 0 22px color-mix(in srgb, var(--th-marker-color, #eab308) 24%, transparent) !important;
}
.th-marker-info strong {
  display: block !important;
  margin-bottom: 8px !important;
  color: var(--th-marker-color, #eab308) !important;
  font-size: 16px !important;
}
.th-marker-info p {
  margin: 0 0 8px !important;
  font-size: 14px !important;
  line-height: 1.45 !important;
}
.th-marker-info small {
  display: block !important;
  color: #cbd5e1 !important;
  line-height: 1.45 !important;
}
.th-marker-info button {
  margin-top: 12px !important;
  padding: 7px 14px !important;
  border: 0 !important;
  border-radius: 999px !important;
  background: var(--th-marker-color, #eab308) !important;
  color: #111827 !important;
  font-weight: 800 !important;
  cursor: pointer !important;
}

`;


// ── A content script logikája (korábban content.js volt) ──────────────────────
function contentScriptMain() {
  // Symbol alapú flag – weboldal JS nem tudja hamisítani
  const _FLAG = Symbol.for('emberiHang.loaded.cleanCenterPanel.v7');
  if (window[_FLAG]) return;
  window[_FLAG] = true;

  // Tisztított build: nincs régi jobb alsó toast/panelkód, nincs folyamatos panel-irtó.
  // Telepítés után a már nyitott oldalakat frissíteni kell, hogy régi befecskendezett kód ne maradjon életben.

  // ════════════════════════════════════════════════════════════════
  // EMBERI HANG – Alapelv:
  // Nem elhallgattat. Nem ítélkezik. Nem gyűlöl. Emlékeztet.
  //
  // SZABAD:  politikai vita, kritika, szenvedélyes vélemény
  // FIGYEL:  személyes sértés, durva hangnem
  // VÉDI:    emberi méltóság, testi épség, élet
  // ════════════════════════════════════════════════════════════════

  const DEFAULTS = { enabled: true, blurIncoming: true, warnOutgoing: true, sensitivity: 1 };
  let settings = { ...DEFAULTS };
  let lastWarningAt = 0;

  async function loadSettings() {
    try { settings = await chrome.storage.sync.get(DEFAULTS); }
    catch (_) { settings = { ...DEFAULTS }; }
  }
  let rescanTimer = null;
  function scheduleRescan(reason = 'settings') {
    clearTimeout(rescanTimer);
    rescanTimer = setTimeout(() => {
      try {
        refreshModerationState(reason);
      } catch (err) {
        console.warn('Emberi Hang: újraértékelés sikertelen', err);
      }
    }, 120);
  }

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    let relevant = false;
    for (const [k, v] of Object.entries(changes)) {
      if (k in DEFAULTS) {
        settings[k] = v.newValue;
        relevant = true;
      }
    }
    if (relevant) scheduleRescan('storage-change');
  });

  // Popup ↔ content script kapcsolat.
  // EH_PING: a popup ezzel ellenőrzi, hogy az oldalban tényleg fut-e az Emberi Hang motor.
  // EH_SETTINGS_CHANGE: tartalék útvonal, ha a storage.onChanged esemény késve érkezne.
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || typeof msg !== 'object') return false;

    if (msg.type === 'EH_PING') {
      try {
        sendResponse({
          ok: true,
          app: 'Emberi Hang',
          version: chrome.runtime.getManifest().version,
          ruleset: !!window.EMBERI_HANG_RULESET
        });
      } catch (_) {
        sendResponse({ ok: true, app: 'Emberi Hang' });
      }
      return true;
    }

    if (msg.type === 'EH_SETTINGS_CHANGE') {
      if (msg.settings && typeof msg.settings === 'object') {
        settings = { ...settings, ...msg.settings };
      }
      scheduleRescan('runtime-message');
      try { sendResponse({ ok: true }); } catch (_) {}
      return true;
    }

    return false;
  });

  // ── Szöveg normalizálás ──────────────────────────────────────────
  function normalize(text) {
    return (text || '')
      .toLowerCase()
      .replace(/[3]/g,'e').replace(/[4@]/g,'a').replace(/[0]/g,'o').replace(/[1]/g,'i').replace(/!/g,' ')
      .replace(/([a-záéíóöőúüű])\1{2,}/gi,'$1$1') // 3+ ismétlés → 2 (kurrrva→kurva, de kell marad kell)
      .replace(/[\s\-_*\.]+/g,' ')
      .trim();
  }
  // Összeírt szavak szétválasztás nélkül vizsgálva (pl. "dehülyevagy")
  function squish(text) {
    return text.replace(/\s/g,'');
  }
  // Csak 3+ ismétlések → 1 (kereséshez, nem displayhez)
  function crush(text) {
    return squish(normalize(text)).replace(/([a-záéíóöőúüű])\1+/gi,'$1');
  }

  // ── A 3 védendő kategória ────────────────────────────────────────
  // SZINT 3 – Élet és testi épség fenyegetése
  // KÜLÖN – Szexuális agresszió / testi autonómia megsértése
  // SZINT 2 – Emberi méltóság megsértése (dehumanizálás)
  // SZINT 1 – Durva személyes sértés (emlékeztető, nem blokk)
  //
  // Ami SOHA nem szűrünk: politikai vélemény, kritika, vita

  const THREATS = [
    // Élet kioltásának fenyegetése
    /meg\s*kel+\s*(öl|lő|ver)/i,          // "meg kell ölni"
    /ki\s*kel+\s*(irtan|végezn|lőn)/i,
    /fel\s*kel+\s*akasztan/i,
    /agyon\s*kel+\s*ver/i,
    /hal[aá]lt\s+(érdemel|kíván|hoz)/i,
    /pusztulj(on|anak)\s*(el|mind)?/i,
    /tűnj(ön)?\s*(el\s*örökre|föld\s*színéről)/i,
    /irtsd?\s*(ki|le)\s*(őket|mind|valamennyit)/i,
    /dög(ölj|öljetek|ljenek)/i,
    /lőjék?\s*(le|agyon)/i,
    /verjék?\s*(agyon|halálra)/i,
    /öljük?\s*(meg|le)/i,
    /megöllek|agyonverlek|megölöm|szétvágom|szétváglak|felrobbantlak|kicsinállak|kicsinállak|kinyírlak|elintézlek|leszámolok\s*veled|megkeserülöd|betöröm\s*a\s*fejed|beverem\s*a\s*(fejed|szádat|képed)|beütöm\s*a\s*pofád|szétverem\s*a\s*képed|elvágom\s*a\s*torkodat|kitöröm\s*a\s*nyakad|megtalállak|tudod\s*hol\s*laksz|megjárod|pórul\s*jársz|felnyársallak|nyársra\s*húzlak|kibelezlek|kiontom\s*a\s*beled|kibaszom\s*a\s*fogad|szét\s*baszom\s*a\s*fejed|szét\s*csapom\s*a\s*fejed|szétcsapom\s*a\s*fejed|szétbaszom\s*a\s*fejed/i,
    /agyonverlek/i,
    /megölöm/i
  ];


  const SEXUAL_AGGRESSION = [
    // Szexuális bántalmazás / kényszerítés / testi autonómia megsértése.
    // Külön kategória: nem életellenes fenyegetés, hanem intim határsértés és kényszerítés.
    /meg\s*foglak\s*er[őo]szakolni|meger[őo]szakollak|meg\s*er[őo]szakollak|er[őo]szakot\s*teszek\s*rajtad/i,
    /nem\s*mondhatsz\s*nemet|úgyis\s*az\s*eny[eé]m\s*leszel|majd\s*elveszem\s*amit\s*akarok|nem\s*k[eé]rdezlek/i,
    /megkurlak|megbaszlak|megbasszlak|megbaszom\s*a\s*(sz[aá]d|segged|feneked|pof[aá]d|tested)|meg\s*baszom\s*a\s*(sz[aá]d|segged|feneked|pof[aá]d|tested)|megduglak|meg\s*duglak|szétbaszlak|sz[eé]t\s*baszlak/i,
    /megbaszom\s*(a\s*)?(sz[aá]d|segged|feneked)|meg\s*baszom\s*(a\s*)?(sz[aá]d|segged|feneked)|megbaszlak|megduglak|meg\s*duglak/i,
    /hatoljon\s*bel[eé]d|l[oó]szersz[aá]m\s+hatoljon\s*bel[eé]d|hengeres\s+l[oó]szersz[aá]m/i,
    /(hatoljon|nyomuljon|ker[uü]lj[oö]n|dugjon|b[uú]jjon)\s+\S+\s*(segg|fen[eé]k|lyuk|tested|b[eé]led)/i
  ];


  const HATE_HERD = [
    // Csoportkriminalizálás / kollektív bűnösség / hergelő általánosítás.
    // Cél: ne politikai véleményt szűrjön, hanem embercsoportot kollektíven bűnösnek,
    // veszélyesnek vagy emberalattinak beállító kommunikációs mintákat.
    /\b(ezek|azok|ők|mind|mindannyian|egyik\s*sem|az\s*összes|ez\s*a\s*(réteg|fajta|banda|csürhe|népség))\b.{0,70}\b(bűnöző(k)?|tolvaj(ok)?|hazug(ok)?|korrupt(ak)?|élősködő(k)?|veszélyes(ek)?|fertőz(nek|őek)?|mérgez(nek|őek)?)\b/i,
    /\b(mind|mindegyik|egyik\s*sem|az\s*összes)\b.{0,50}\b(lop|lopnak|csal|csalnak|hazudik|hazudnak|rombol|rombolnak|pusztít|pusztítanak)\b/i,
    /\b(ezek|azok|ők|ez\s*a\s*(réteg|fajta|banda|csürhe|népség))\b.{0,80}\b(miatt|miattuk)\b.{0,80}\b(pusztul|romlik|tart\s*itt|megy\s*tönkre|veszélyben\s*van)\b/i,
    /\b(nem\s*emberek|embernek\s*sem\s*nevezném|állatok\s*ezek|férgek\s*ezek|patkányok\s*ezek|csótányok\s*ezek)\b/i,
    /\b(ezeket|azokat|őket|mindet|az\s*összeset)\b.{0,50}\b(el\s*kellene\s*takarítani|ki\s*kellene\s*szorítani|el\s*kellene\s*hallgattatni|ki\s*kellene\s*zárni)\b/i,
    /\b(persze|nyilván|ugye)\b.{0,45}\b(ezek|azok|ők|az\s*ilyen(ek)?)\b.{0,60}\b(mindig\s*ártatlanok|soha\s*nem\s*hibásak|csak\s*áldozatok|megint\s*ártatlanok)\b/i,
    /\b(ilyen\s*emberek|ez\s*a\s*népség|ez\s*a\s*réteg|ez\s*a\s*fajta)\b.{0,70}\b(nem\s*való(k)?|nem\s*érdemel(nek)?|ne\s*szóljon\s*bele|fogja\s*be|maradjon\s*csendben)\b/i
  ];

  const DIGNITY = [
    // Szexuális erőszakra utalás (burkolt is)
    /(hatoljon|nyomuljon|kerüljön|dugjon|bújjon)\s+\S+\s*(segg|fenék|fen[eé]k[eé]be|segg[eé]be|lyuk[aá]ba|tested|b[eé]led)/i,
    /(hengeres|hosszú|vastag|merev)\s+\S+\s+(hatoljon|menjen|kerüljön|nyomuljon)/i,
    /\S+\s+(fenekedbe|seggébe|lyukadba)\s+(hatoljon|menjen|bújjon|kerüljön)/i,
    /meger[öo]szakol/i,

    // Megalázó / lealacsonyító személyminősítések
    /\b(de\s*)?paraszt\s*(vagy|vagytok|voltál|voltatok|leszel|lesztek)\b/i,
    /\b(te|ti|maga|maguk|ő|ők)\b.{0,24}\b(paraszt|proli|suttyó|tuskó|csicska)\b/i,
    /\b(hüly[eé]bb|but[aá]bb|ostob[aá]bb|primit[ií]vebb|korl[aá]toltabb)\s*(vagy|vagytok|voltál|voltatok|leszel|lesztek)?\s*(az\s*)?(átlagnál|átlagosnál|mindenkinél|nálam|nála|náluk)\b/i,
    /\b(te|ti|maga|maguk|ő|ők)\b.{0,24}\b(hüly[eé]bb|but[aá]bb|ostob[aá]bb|primit[ií]vebb|korl[aá]toltabb)\s*(vagy|vagytok|voltál|voltatok|leszel|lesztek)?\b/i,
    /\b(az\s*)?átlagnál\s*(is\s*)?(hüly[eé]bb|but[aá]bb|ostob[aá]bb|primit[ií]vebb|korl[aá]toltabb)\s*(vagy|vagytok|voltál|voltatok)\b/i,
    /\b(de\s*)?(szánalmas|nevetséges|siralm(as|asak)|tragikus)\s*(vagy|vagytok|voltál|voltatok)\b/i,

    // Dehumanizálás – csak személyre irányítva
    /\b(te|ő|ez\s+az\s+ember)\b.{0,40}(féreg\s*vagy|patkány\s*vagy|nem\s*is\s*ember|emberi\s*salak)/i,
    /(féregvagy|patkányvagy|nemisember)/i,   // összeírt forma
    /söpred[eé]k|csürhe|emberi\s*salak/i,
    // Embereket állathoz/tárgyhoz hasonlítás – személyre irányulva
    /(te|ti|ő|ők|maga)\s*.{0,15}(állat(ok)?|barmok?|f[eé]rgek?|f[eé]reg|patk[aá]nyok?|patk[aá]ny|mocskok?|szemetek?|hulladék)/i,
    /(állatok|barmok|férgek|patkányok|mocskok)\s*(vagytok|vagy|voltatok)/i,
    /^(ti|ők)\s+.{0,5}(állatok?|barmok?|mocskok?|férgek?|patkányok?|szemetek?)/i,
    // Csoportgyűlölet
    /(piszkos|büdös|rohadt)\s*(zsidó|cigány|néger|migráns|roma)/i,
    /mind(annyian|egyig)\s+(bűnöző|hazudnak|lopnak|korrupt)/i
  ];

  const INSULTS = [
    /(te|ő|maga|ti|maguk|ők).{0,30}(idióta|hülye|barom|agyhalott|bunkó|debil|aljas|mocskos|geci|picsa|fasz|kurva|szarházi)/i,
    /(vagy|vagytok).{0,20}(idióta|hülye|barom|agyhalott|bunkó)/i,
    /kussolj|krepálj/i,
  ];

  // ── Magyar névmások teljes rendszere ────────────────────────────
  // E/1: én, engem | E/2: te, téged, neked | E/3: ő, őt, neki
  // T/1: mi, minket | T/2: ti, titeket, nektek | T/3: ők, őket, nekik
  // + igei személyek: vagy, vagytok, voltál, lettél, leszel...
  const NÉVMÁS = /\b(te|téged|neked|veled|rád|tőled|nálad|ti|titeket|nektek|veletek|rátok|ő|őt|neki|vele|rá|tőle|nála|ők|őket|nekik|velük|maga|magad|maguk)\b/i;
  const IGE_SZEMÉLYES = /(vagy|vagytok|voltál|voltatok|lettél|lettetek|leszel|lesztek|vagy\s*te|te\s*vagy)/i;

  const PERSONAL_INSULTS = [
    // ── Névmás + sértő szó (E/2, E/3, T/2, T/3) ──
    /(te|téged|ti|titeket|ő|őt|ők|őket|maga|magad|maguk)\s*.{0,30}(hülye|idióta|barom|agyhalott|bunkó|debil|paraszt|proli|suttyó|tuskó|csicska|kurva|geci|picsa|fasz|aljas|mocskos|szarházi|nyomorult|alávaló|gazember|ostoba|buta|primitív|műveletlen|korlátolt|szerencsétlen|tehetségtelen|béna|senkiházi|hitvány|gyáva|hazug|képmutató)/i,

    // ── Sértő szó + igei személyrag (vagy/vagytok/voltál...) ──
    /(hülye|idióta|barom|agyhalott|bunkó|debil|paraszt|proli|suttyó|tuskó|csicska|kurva|geci|picsa|aljas|mocskos|szarházi|ostoba|buta|primitív|műveletlen|korlátolt|szerencsétlen|béna|senkiházi|hitvány|gyáva|hazug|képmutató)\s*.{0,20}(vagy|vagytok|voltál|voltatok|lettél|lettetek|leszel|lesztek)/i,

    // ── Fordított sorrend: igei alak + sértő szó ──
    /(vagy|vagytok|voltál|voltatok|lettél|lettetek)\s*.{0,20}(hülye|idióta|barom|bunkó|debil|ostoba|buta|primitív|korlátolt|szerencsétlen|béna|hitvány|gyáva|hazug)/i,

    // ── Névmás + negatív jelző + vagy ──
    /(te|ti|ő|ők)\s*.{0,10}(olyan|ilyen|mekkora|de\s*nagy|de\s*komoly)\s*.{0,15}(hülye|idióta|barom|ostoba|buta)/i,

    // ── "Ti hülyék vagytok" típus (T/2 alany + főnév sértés) ──
    /(ti|ők|önök)\s*.{0,20}(hülyék|idiótái?k|bunkók|ostobák|primitívek|hazugok|gyávák|képmutatók|baromcsorda)/i,
    /(ti|ők)\s*.{0,10}(vagytok|voltak|lesztek).{0,20}(hülye|idióta|ostoba|buta|primitív|korlátolt)/i,
    /vagytok.{0,20}(hülyék|idiótái?k|legostobább|legprimitívebb|leghülyébb)/i,
    /ti\s*mind\s*(idiótái?|hülyék|ostobák|primitívek)/i,

    // ── Milyen + sértő szó + vagy ──
    /(milyen|de|micsoda|akkora)\s*(hülye|idióta|barom|ostoba|buta|primitív|korlátolt|béna|hitvány|gyáva)\s*(vagy|vagytok|ő|voltál)/i,

    // ── Összeírt személyes formák ──
    /tehülye|dehülye|mihülyék|tihülyék|őhülye|dehülyevagy|tihülyékvagytok/i,
    /hülye.{0,8}vagy|idióta.{0,8}vagy|barom.{0,8}vagy/i,
    /hülyék.{0,8}vagytok|idiótái?k.{0,8}vagytok|ostobák.{0,8}vagytok/i,

    // ── Egyéb személyes formák ──
    /(te|ő|neked|neki|nektek|nekik).{0,20}kurv[aá]/i,
    /kurv[aá]{1,2}(nyád|n[yj]ád|anyád|apád|életét|istenit)/i,
    /gecifej|szarfej|faszkép|seggfej/i,
    /fogd.{0,4}be.{0,6}(szád|pofád)/i,
    /kus+olj|krepálj/i,
    /menj.{0,4}(fenébe|pokolba|francba)/i,
    /hitvány\s*(képmutató|alak|senki|fráter)|képmutató\s*(hitvány|alak)/i,
  ];

  // Standalone sértő szavak – kimenő szövegnél önmagukban is figyelmeztetnek
  // Személyre irányuló sértések – a szó előtt vagy után névmás/személyes forma
  // "hülye döntés" → SZABAD | "te hülye" / "hülye vagy" / "milyen hülye vagy" → TILTOTT

  // Vita-szavak: ezek jelenlétében a személyes sértés szintjét csökkentjük

  // ── Lekicsinylő minták – emberi méltóságot sértenek finoman ──────
  const BELITTLING = [
    // Csoportos lesöprés
    /mit\s*(is\s*)?(várunk|vársz|várhat(unk|sz)?)\s*(az?\s*)?(ilyenektől|ezektől|tőlük)/i,
    /hát\s*persze.{0,20}(ilyenektől|ezektől|tőle|tőlük)/i,
    /ilyen\s*(ember(ek)?től|néptől|alakoktól)\s*mi(t|\s*mást)\s*vár/i,
    /ez\s*(nekik|neked|neki)\s*.{0,10}(már\s*)?(sok|nehéz|bonyolult|magas|összetett)/i,
    /értik?\s*(ők|ezek)\s*(ezt\s*)?(egyáltalán|vajon)/i,
    /ezektől\s*(mi\s*)?(mást\s*)?(nem\s*)?(is\s*)?várhat/i,

    // Személyes lekicsinylés
    /csak\s*ennyit\s*tudsz\??/i,
    /hüly[eé]bb\s*(vagy|vagytok)?\s*(az\s*)?átlagnál/i,
    /(az\s*)?átlagnál\s*(is\s*)?(hüly[eé]bb|but[aá]bb|ostob[aá]bb)\s*(vagy|vagytok)/i,
    /ennyi\s*telik\s*t[őo]led\??/i,
    /ehhez\s*(te\s*)?(kevés|gyenge)\s*vagy/i,
    /a\s*v[eé]lem[eé]nyed\s*(semmit\s*)?nem\s*[ée]r/i,
    /senki\s*nem\s*k[ií]v[aá]ncsi\s*r[aá]d/i,
    /te\s*még\s*nem\s*tartasz\s*ott/i,
    /ez\s*neked\s*(túl\s*)?(bonyolult|sok|magas)/i,
    /maradj\s*a\s*kaptafánál/i,
    /nem\s*a\s*te\s*szintednek\s*való/i,
    /okosabb\s*emberekre\s*(kellene\s*)?(hallgatni|bízni)/i,
    /mikor\s*fogsz\s*már\s*(végre\s*)?felnőni/i,
    /te\s*(úgysem|sohasem|sosem)\s*(érted?\s*)?(meg)?/i,

    // Emberi tulajdonságot elvevő jelzők – személyre irányulva
    /(csak\s*egy?\s*)?(pojáca|báb|marionett)\s+(vagy|ő)\b/i,
    /(te|ő|ez\s*az?\s*(ember|alak|fráter)).{0,20}(pojáca|báb|marionett|uszító|propagandista)/i,

    // Gúnyos elvárás
    /persze.{0,15}pont\s*(tőle|tőlük|ettől)/i,
    /természetes.{0,20}(ilyenektől|ezektől|tőlük)/i,
  ];


  // ── Fordított logika: személyes keret + negatív szó = sértés ────
  // Ez minden negatív szóra működik, nem csak a felsoroltakra!
  const SZEMÉLYES_KERET = [
    // Ige nélküli névmondatok: "Ti mocskok vagytok" / "Ti állatok"
    /^(te|ti|ő|ők|maga)\s+\S.{0,50}$/i,  // bármilyen "Ti X" forma

    /(te|ti|ő|ők|maga|magad)\s+.{1,50}\s+(vagy|vagytok|voltál|voltatok|lettél|lettetek|leszel|lesztek)/i,
    /(vagy|vagytok|voltál|voltatok)\s+.{1,40}(te|ti|ő|ők|leg\w+)/i,
    /(milyen|de|micsoda|akkora|mekkora)\s+.{1,40}(vagy|vagytok|voltál)/i,
    /(te|ti|ő|ők|maga)\s+(egy\s+)?\S+(\s+\S+){0,3}$/i,
  ];

  const NEGATÍV_SZÓ = /leghülye|leghülyébb|hülyébb|butább|ostobább|primitívebb|korlátoltabb|legostobább|legprimitívebb|leggonoszabb|leghitványabb|leggyávább|leghazugabb|hülye|hülyék|állat|állatok|barom|barmok|mocsok|mocskok|mocskos|férgek|patkányok|szemetek|söpredék|csürhe|hulladék|gazemberek|alávalók|hitványak|gyávák|hazugok|képmutatók|idiótái?k|bunkók|parasztok|prolik|suttyók|tuskók|csicskák|debilék|idióta|idiótái?k|ostoba|ostobák|buta|barom|primitív|műveletlen|korlátolt|aljas|komisz|gonosz|hitvány|gyáva|hazug|képmutató|szemét|szemetek|rohadt|undorító|förtelmes|senki|értéktelen|nyomorult|szerencsétlen|béna|senkiházi|gazember|alávaló|mocskos|szarházi|geci|kurva|picsa|debil|bunkó|paraszt|proli|suttyó|tuskó|csicska|agyhalott/i;

  const POZITÍV_SZÓ = /jó|szép|okos|ügyes|kedves|aranyos|nagyszerű|remek|csodálatos|tehetséges|bátor|becsületes|őszinte/i;

  function isSzemélyesSértés(text) {
    const n = normalize(text);
    return SZEMÉLYES_KERET.some(p => p.test(n))
      && NEGATÍV_SZÓ.test(n)
      && !POZITÍV_SZÓ.test(n)
      && !DEBATE_OK.test(n);
  }

  const DEBATE_OK = /szerintem|véleményem|gondolom|azt\s*hiszem|nem\s*értek\s*egyet|vitatkoz|bírálom|kritizálom|döntés|döntése|politika|stratégia|lépés|terv|ötlet\s+volt/i;



  // ── Szabálylabor / ruleset.js kompatibilitási adapter ───────────────
  // Ha a manifest előbb betöltötte a ruleset.js fájlt, innen fokozatosan átvehetők
  // a Szabálylaborból exportált minták. Ha nincs ruleset.js, a régi beépített
  // tömbök változatlanul működnek.
  const EH_RULESET = (typeof window !== 'undefined' && window.EMBERI_HANG_RULESET) ? window.EMBERI_HANG_RULESET : null;
  const EH_RULESET_CATEGORY_BY_ARRAY = Object.create(null);
  const EH_RULESET_CATEGORY_BY_ID = Object.create(null);
  let EH_EXTERNAL_SEMANTIC_RULES = [];
  let EH_EXTERNAL_PATTERN_RULES = [];
  let EH_EXTERNAL_V5_ENTRIES = [];

  function ehSafeRegex(pattern, flags) {
    if (pattern instanceof RegExp) return pattern;
    try { return new RegExp(String(pattern || ''), (flags || 'i').includes('u') ? (flags || 'i') : (flags || 'i') + 'u'); }
    catch (_) { return null; }
  }

  function ehCategoryFallback(arrayName, categoryId) {
    const typeMap = {
      LIFE_THREATS: 'threat', THREATS: 'threat', lifeThreat: 'threat',
      SEXUAL_AGGRESSION: 'sexual', sexualAggression: 'sexual',
      HATE_INCITEMENT: 'hate', HATE_HERD: 'hate', hateIncitement: 'hate',
      DIGNITY: 'dignity', dignity: 'dignity',
      PERSONAL_INSULTS: 'insult', INSULTS: 'insult', personalInsult: 'insult',
      BELITTLING: 'belittling', belittling: 'belittling', humanOffense: 'human', positiveException: 'ignore', debateException: 'ignore', neutralException: 'ignore', uncertain: 'learn'
    };
    const type = typeMap[arrayName] || typeMap[categoryId] || 'insult';
    const base = {
      threat: { type:'threat', level:3, priority:600, minSensitivity:1, title:'🔴 Emberi Hang figyelmeztetés', body:'Életellenes vagy testi fenyegetést tartalmazó szöveg észlelve.', rewrite:'Az indulat megfogalmazható testi fenyegetés nélkül is.', opalMessage:'Állj meg egy pillanatra: ez már testi fenyegetésként hathat.' },
      sexual: { type:'sexual', level:3, priority:500, minSensitivity:1, title:'● Emberi Hang figyelmeztetés', body:'Szexuális agressziót, kényszerítést vagy testi autonómiát sértő tartalom észlelve.', rewrite:'A düh vagy vágy nem írhatja felül a másik testi autonómiáját.', opalMessage:'Ez szexuális kényszerítésként vagy testi autonómia megsértéseként hathat.' },
      hate: { type:'hate', level:2, priority:400, minSensitivity:2, title:'⚫ Emberi Hang figyelmeztetés', body:'Csoport elleni hergelő, gyűlöletkeltő vagy kollektív bűnösséget sugalló tartalom észlelve.', rewrite:'A kritika legyen konkrét: ne bélyegezz meg egész embercsoportokat.', opalMessage:'Feszültség van ebben a térben… de ne akarjuk tovább fokozni.' },
      dignity: { type:'dignity', level:2, priority:300, minSensitivity:2, title:'🟠 Emberi Hang figyelmeztetés', body:'Megalázó, dehumanizáló vagy emberi méltóságot sértő tartalom észlelve.', rewrite:'A kritika akkor is lehet erős, ha nem alázza meg a másik embert.', opalMessage:'Ez a megfogalmazás sértheti az emberi méltóságot.' },
      insult: { type:'insult', level:1, priority:200, minSensitivity:2, title:'🟡 Emberi Hang figyelmeztetés', body:'Személyre irányuló sértő minősítés észlelve.', rewrite:'Az érv erősebb marad, ha a személy helyett az állítást vagy viselkedést bírálod.', opalMessage:'Ez személyeskedésként hathat.' },
      belittling: { type:'belittling', level:1, priority:100, minSensitivity:2, title:'🟣 Emberi Hang figyelmeztetés', body:'Lekicsinylő vagy burkoltan megalázó jelentésminta észlelve.', rewrite:'Érdemes a valódi kifogást kimondani, nem a másik értékét kicsinyíteni.', opalMessage:'A lekicsinylés gyakran mélyebb sebet hagy, mint gondolnánk.' },
      human: { type:'human', level:1, priority:300, minSensitivity:2, title:'🟠 Emberi Hang figyelmeztetés', body:'Emberi méltóságot vagy személyt sértő tartalom észlelve.', rewrite:'A kritika maradhat erős, ha közben nem a másik ember értékét támadja.', opalMessage:'Ez a megfogalmazás emberi méltóságot vagy személyt sértőként hathat.' },
      ignore: { type:'ignore', level:0, priority:0, minSensitivity:99, title:'✅ Emberi Hang kivétel', body:'Kivételként tanított tartalom.', rewrite:'', opalMessage:'' },
      learn: { type:'learn', level:0, priority:10, minSensitivity:99, title:'⚪ Emberi Hang tanítandó jelzés', body:'Kétséges, tanítandó tartalom.', rewrite:'', opalMessage:'' }
    };
    return base[type];
  }

  function ehBuildHit(cat, matchedPattern, reason, sourcePriority, extra) {
    const f = ehCategoryFallback(cat && cat.arrayName, cat && cat.id);
    const hit = {
      priority: Number(sourcePriority || cat?.priority || f.priority || 0),
      level: Number(cat?.level || f.level || 1),
      blur: true,
      type: cat?.type || f.type,
      title: cat?.title || f.title,
      body: cat?.body || f.body,
      rewrite: cat?.rewrite || f.rewrite,
      opalMessage: cat?.opalMessage || f.opalMessage,
      reason: reason || 'Szabálylabor mintaegyezés.',
      matchedPattern: String(matchedPattern || '')
    };
    if (extra) Object.assign(hit, extra);
    return ehPolishV5Hit(hit);
  }

  function ehPolishV5Hit(hit) {
    if (!hit) return hit;
    if (hit.type === 'human') {
      const sev = Number(hit.severity || 0);
      const subtype = hit.subtype || '';
      if (sev >= 5 || subtype === 'dignity') {
        hit.title = '🟠 Emberi Hang figyelmeztetés';
        hit.body = 'Emberi méltóságot sértő vagy dehumanizáló megfogalmazás észlelve.';
        hit.opalMessage = 'Ez a megfogalmazás sértheti az emberi méltóságot.';
      } else if (sev === 4 || subtype === 'personalInsult') {
        hit.title = '🟡 Emberi Hang figyelmeztetés';
        hit.body = 'Személyre irányuló sértő minősítés észlelve.';
        hit.opalMessage = 'Ez személyeskedésként hathat.';
      } else if (sev === 3 || subtype === 'belittling') {
        hit.title = '🟣 Emberi Hang figyelmeztetés';
        hit.body = 'Lekicsinylő vagy lekezelő megfogalmazás észlelve.';
        hit.opalMessage = 'A lekicsinylés gyakran mélyebb sebet hagy, mint gondolnánk.';
      } else {
        hit.title = '🟠 Emberi Hang jelzés';
        hit.body = 'Bántó árnyalatú, személyre húzó megfogalmazás észlelve.';
        hit.opalMessage = 'Ez a mondat bántó árnyalatú lehet.';
      }
    }
    if ((hit.tone === 'irony' || hit.tone === 'sarcasm') && hit.type !== 'ignore') {
      hit.reason = (hit.reason || '') + ' Hangnem: irónia/szarkazmus módosító.';
    }
    return hit;
  }

  function ehPushExternalArray(arrayName, targetArray) {
    if (!EH_RULESET || !Array.isArray(targetArray)) return;
    const raw = EH_RULESET[arrayName];
    if (!Array.isArray(raw)) return;
    raw.forEach(item => {
      const re = ehSafeRegex(item && item.pattern ? item.pattern : item, item && item.flags ? item.flags : 'i');
      if (re) targetArray.push(re);
    });
  }

  function ehInstallRuleset() {
    if (!EH_RULESET) return;
    (EH_RULESET.categories || []).forEach(c => {
      if (c && c.arrayName) EH_RULESET_CATEGORY_BY_ARRAY[c.arrayName] = c;
      if (c && c.id) EH_RULESET_CATEGORY_BY_ID[c.id] = c;
    });

    // Tömbös ruleset.js támogatás.
    ehPushExternalArray('LIFE_THREATS', THREATS);
    ehPushExternalArray('THREATS', THREATS);
    ehPushExternalArray('SEXUAL_AGGRESSION', SEXUAL_AGGRESSION);
    ehPushExternalArray('HATE_INCITEMENT', HATE_HERD);
    ehPushExternalArray('HATE_HERD', HATE_HERD);
    ehPushExternalArray('DIGNITY', DIGNITY);
    ehPushExternalArray('PERSONAL_INSULTS', PERSONAL_INSULTS);
    ehPushExternalArray('INSULTS', PERSONAL_INSULTS);
    ehPushExternalArray('BELITTLING', BELITTLING);

    // Szabálylabor JSON/JS export támogatás: patterns[] string-regexekkel.
    (EH_RULESET.patterns || []).forEach(p => {
      const cat = EH_RULESET_CATEGORY_BY_ID[p.categoryId] || EH_RULESET_CATEGORY_BY_ARRAY[p.arrayName];
      if (!cat || p.enabled === false) return;
      const re = ehSafeRegex(p.pattern, p.flags || 'i');
      if (!re) return;
      const target = cat.arrayName === 'LIFE_THREATS' ? THREATS
        : cat.arrayName === 'SEXUAL_AGGRESSION' ? SEXUAL_AGGRESSION
        : cat.arrayName === 'HATE_INCITEMENT' ? HATE_HERD
        : cat.arrayName === 'DIGNITY' ? DIGNITY
        : cat.arrayName === 'PERSONAL_INSULTS' ? PERSONAL_INSULTS
        : cat.arrayName === 'BELITTLING' ? BELITTLING
        : null;
      if (target) target.push(re);
    });

    // A Szabálylabor export legfontosabb része: patterns[].
    // Ezeket külön is megőrizzük, hogy ne vesszen el a kategória-prioritás,
    // severity, reason és matchedPattern információ. A régi tömbökbe push-olás
    // csak visszafelé kompatibilitás; a döntésben ez az elsődleges út.
    EH_EXTERNAL_PATTERN_RULES = Array.isArray(EH_RULESET.patterns) ? EH_RULESET.patterns.filter(p => p && p.enabled !== false) : [];
    EH_EXTERNAL_SEMANTIC_RULES = Array.isArray(EH_RULESET.semanticRules) ? EH_RULESET.semanticRules.filter(r => r && r.enabled !== false) : [];
    EH_EXTERNAL_V5_ENTRIES = Array.isArray(EH_RULESET.entries) ? EH_RULESET.entries.filter(e => e && e.text && e.action !== 'disabled') : [];
  }


  function ehEscapeRegex(s) {
    return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function ehHuBoundaryPattern(raw) {
    return '(?<![a-záéíóöőúüű])' + ehEscapeRegex(normalize(raw)).replace(/\s+/g, '\\s+') + '(?![a-záéíóöőúüű])';
  }

  function ehV5CategoryToInternal(category, severity, subtype) {
    if (category === 'lifeThreat') return 'threat';
    if (category === 'sexualAggression') return 'sexual';
    if (category === 'hateIncitement') return 'hate';
    if (category === 'humanOffense') return 'human';
    if (category === 'positiveException' || category === 'debateException' || category === 'neutralException') return 'ignore';
    if (category === 'uncertain') return 'learn';
    if (category === 'dignity') return 'human';
    if (category === 'personalInsult') return 'human';
    if (category === 'belittling') return 'human';
    return 'human';
  }

  function ehV5CategoryMeta(entry) {
    const category = entry.category || entry.categoryId;
    const type = ehV5CategoryToInternal(category, entry.severity, entry.subtype);
    const basePriority = category === 'lifeThreat' ? 600
      : category === 'sexualAggression' ? 500
      : category === 'hateIncitement' ? 400
      : category === 'humanOffense' ? 300
      : category === 'dignity' ? 300
      : category === 'personalInsult' ? 300
      : category === 'belittling' ? 300
      : category === 'uncertain' ? 10
      : 0;
    return Object.assign(ehCategoryFallback(null, category), { id: category, type, priority: basePriority });
  }

  function ehV5EntryRegex(entry) {
    if (!entry || !entry.text) return null;
    if (entry.type === 'regex') return ehSafeRegex(entry.text, entry.flags || 'i');
    return ehSafeRegex(ehHuBoundaryPattern(entry.text), 'i');
  }

  function ehV5HateSignalScore(signals) {
    const pts = (EH_RULESET && EH_RULESET.hateScoring && EH_RULESET.hateScoring.points) || {
      group:1, general:1, crime:2, scapegoat:2, exclude:3, dehuman:3, incite:4, irony:2,
      groupPointer:1, collectiveGeneralization:1, criminalizingClaim:2, exclusionFrame:3, dehumanization:3, removalIncitement:4
    };
    let score = 0;
    Object.keys(signals || {}).forEach(k => { if (signals[k]) score += Number(pts[k] || 0); });
    return score;
  }

  function ehV5EntryHits(raw) {
    if (!EH_EXTERNAL_V5_ENTRIES.length) return [];
    const n = normalize(raw);
    const s = squish(n);
    const text = String(raw || '');
    const hits = [];
    EH_EXTERNAL_V5_ENTRIES.forEach(entry => {
      const re = ehV5EntryRegex(entry);
      if (!re) return;
      const testOne = (value) => { try { re.lastIndex = 0; return re.test(value); } catch(_) { return false; } };
      if (!(testOne(text) || testOne(n) || testOne(s))) return;

      const cat = ehV5CategoryMeta(entry);
      const severity = Number(entry.severity || 0);
      let priority = Number(cat.priority || 0) + severity;
      let reason = entry.note || 'Szabálylabor V5 bejegyzés egyezés.';
      let type = cat.type;

      if (entry.category === 'hateIncitement') {
        const signalScore = ehV5HateSignalScore(entry.signals || {});
        priority += signalScore;
        if (signalScore) reason += ' Hergelés-pontszám: ' + signalScore + '.';
      }
      if (entry.tone === 'irony' || entry.tone === 'sarcasm') priority += 1;

      hits.push(ehBuildHit(cat, entry.text, reason, priority, {
        type,
        action: entry.action || (type === 'ignore' ? 'ignore' : 'opal'),
        severity,
        subtype: entry.subtype || '',
        tone: entry.tone || 'neutral',
        signals: entry.signals || {},
        source: 'ruleset-v5',
        entryId: entry.id || '',
        tags: entry.tags || []
      }));
    });
    return hits;
  }

  function ehV5HasIgnoreException(raw, hits) {
    if (!EH_EXTERNAL_V5_ENTRIES.length) return false;
    const n = normalize(raw);
    const text = String(raw || '');
    return EH_EXTERNAL_V5_ENTRIES.some(entry => {
      if (!entry || entry.action !== 'ignore') return false;
      const re = ehV5EntryRegex(entry);
      if (!re) return false;
      try { re.lastIndex = 0; return re.test(text) || re.test(n); } catch(_) { return false; }
    }) && !(hits || []).some(h => h.type === 'threat' || h.type === 'sexual');
  }

  function ehV5FilterHits(hits, raw) {
    if (!hits || !hits.length) return hits;
    if (ehV5HasIgnoreException(raw, hits)) {
      hits = hits.filter(h => h.type === 'threat' || h.type === 'sexual');
    }
    return hits.filter(h => h.type !== 'ignore' && h.type !== 'learn');
  }


  function ehExternalPatternHits(raw) {
    if (!EH_EXTERNAL_PATTERN_RULES.length) return [];
    const n = normalize(raw);
    const s = squish(n);
    const c = crush(raw);
    const text = String(raw || '');
    const hits = [];
    EH_EXTERNAL_PATTERN_RULES.forEach(p => {
      const cat = EH_RULESET_CATEGORY_BY_ID[p.categoryId] || EH_RULESET_CATEGORY_BY_ARRAY[p.arrayName] || ehCategoryFallback(p.arrayName, p.categoryId);
      if (!cat) return;
      const re = ehSafeRegex(p.pattern, p.flags || 'i');
      if (!re) return;
      // Mivel ugyanazt a RegExp objektumot többször teszteljük, global flag esetén
      // mindig nullázzuk a lastIndex-et. Így az exportált regexek stabilan működnek.
      const testOne = (value) => { try { re.lastIndex = 0; return re.test(value); } catch(_) { return false; } };
      if (testOne(text) || testOne(n) || testOne(s) || testOne(c)) {
        const basePriority = Number(cat.priority || ehCategoryFallback(cat.arrayName, cat.id).priority || 0);
        const severity = Number(p.severity || 0);
        hits.push(ehBuildHit(cat, p.pattern, p.reason || 'Szabálylabor mintaegyezés.', basePriority + severity));
      }
    });
    return hits;
  }


  function ehIsSimpleBareWordPattern(pattern) {
    return typeof pattern === 'string'
      && /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű0-9_]+$/.test(pattern)
      && pattern.length <= 32;
  }

  function ehBoundaryPattern(pattern) {
    const escaped = String(pattern).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Magyar ékezetes szavaknál a \b nem mindig elég megbízható,
    // ezért saját, whitespace/punctuation alapú határolót használunk.
    return '(^|[\\s.,;:!?()\\[\\]{}"„”«»\\-])' + escaped + '(?=$|[\\s.,;:!?()\\[\\]{}"„”«»\\-])';
  }

  function ehRulePatternMatches(pattern, n, s) {
    let re = ehSafeRegex(pattern, 'i');
    if (re && (re.test(n) || re.test(s))) return true;
    // A Szabálylabor jelentéscsoportjaiban előforduló rövid, sima szavakat
    // csak önálló szóként fogadjuk el. Így a "mind" nem talál be a "Minden" szóba.
    if (ehIsSimpleBareWordPattern(pattern)) {
      re = ehSafeRegex(ehBoundaryPattern(pattern), 'i');
      return !!(re && re.test(n));
    }
    return false;
  }

  function isNeutralLegalOrFactCheckText(raw) {
    const n = normalize(raw);
    const neutralSignals = [
      /hivatalos\s+(állami\s+)?(és\s+)?bírósági\s+iratok/i,
      /bírósági\s+iratok/i,
      /bizonyítatlan\s+feltételezés/i,
      /nem\s+igazolt\s+tény/i,
      /igazolt\s+tény/i,
      /jogi\s+és\s+politikai\s+felelősség/i,
      /a\s+döntést\s+aláírták/i,
      /ellenjegyezték/i,
      /nem\s+mutatnak/i,
      /jelenleg\s+a\s+politikai\s+csatározások/i,
      /nem\s+pedig\s+igazolt\s+tény/i,
      /tény/i,
      /állítás/i
    ];
    const hostileSignals = [
      /mind\s+(bűnözők|tolvajok|hazugok|férgek|patkányok|söpredék)/i,
      /(ki|el)\s+kell(ene)?\s+(irtani|takarítani|űzni|zárni|hallgattatni)/i,
      /nem\s+valók\s+(ide|közénk)/i,
      /nem\s+emberek/i,
      /férgek|patkányok|csótányok|söpredék|hulladék/i
    ];
    const neutralCount = neutralSignals.reduce((sum, re) => sum + (re.test(n) ? 1 : 0), 0);
    const hostile = hostileSignals.some(re => re.test(n));
    return neutralCount >= 2 && !hostile;
  }


  function ehGetRulesetDictionaryList(name) {
    try {
      const rs = window.EMBERI_HANG_RULESET || {};
      const dict = rs.dictionaries || {};
      return Array.isArray(dict[name]) ? dict[name] : [];
    } catch(_) {
      return [];
    }
  }

  function ehPhraseListMatches(raw, list) {
    if (!list || !list.length) return false;
    const n = normalize(raw);
    return list.some(item => {
      const phrase = normalize(item);
      if (!phrase) return false;
      const re = ehSafeRegex(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'i');
      return !!(re && re.test(n));
    });
  }

  function isPositiveExceptionText(raw) {
    const list = ehGetRulesetDictionaryList('positiveExceptions');
    return ehPhraseListMatches(raw, list);
  }

  function isNeutralExceptionText(raw) {
    const list = ehGetRulesetDictionaryList('neutralExceptions');
    return ehPhraseListMatches(raw, list);
  }

  function isDebateExceptionText(raw) {
    const list = ehGetRulesetDictionaryList('debateOk');
    return ehPhraseListMatches(raw, list);
  }

  function filterRulesetExceptionHits(hits, raw) {
    if (!hits || !hits.length) return hits;

    // A semleges kivétel azt jelenti: ezt a kifejezést a felhasználó nem akarja szabályoztatni.
    // Biztonsági tartalék: közvetlen élet/testi fenyegetés és szexuális agresszió esetén nem némítjuk.
    const hasCritical = hits.some(h => h.type === 'threat' || h.type === 'sexual');
    if (isNeutralExceptionText(raw) && !hasCritical) return [];

    // Jóindulatú kivétel: pozitív/támogató fordulatok. Ezek ne váljanak hergeléssé,
    // személyes sértéssé vagy lekicsinyléssé, de kritikus kategóriát ne írjanak felül.
    if (isPositiveExceptionText(raw) && !hasCritical) {
      hits = hits.filter(h => !['hate', 'insult', 'belittling'].includes(h.type));
    }

    // Vita/politikai-jogi kivétel: a vita, kritika, jogi/tényellenőrző nyelv
    // ne legyen automatikusan személyeskedés/hergelés, ha nincs valódi uszító elem.
    if (isDebateExceptionText(raw) && !hasCritical) {
      hits = hits.filter(h => !['hate', 'insult', 'belittling'].includes(h.type));
    }

    return hits;
  }



  function scoreHateIncitement(raw) {
    const n = normalize(raw);
    const squished = squish(n);
    const tests = [
      { key:'groupPointer', points:1, re:/\b(ezek|azok|ők|őket|az ilyenek|ilyen emberek|ez a réteg|ez a csoport|ez a társaság|ezek a fajták|ez a fajta ember)\b/i },
      { key:'collectiveGeneralization', points:1, re:/(^|[\s.,;:!?()"'„”\-])(mind|mindannyian|mindegyik|az összes|egyik sem|egytől egyig|mindig|soha)(?=$|[\s.,;:!?()"'„”\-])/i },
      { key:'criminalizingClaim', points:2, re:/\b(bűnözők|tolvajok|csalók|élősködők|korruptak|veszélyesek|kártékonyak|rendbontók|veszélyforrások|hibásak|felelősek)\b/i },
      { key:'exclusionFrame', points:3, re:/\b(nem valók közénk|nem valók ide|nincs helyük itt|nem tartoznak közénk|nem részei a társadalomnak|ki kell zárni|nem szabad beengedni)\b/i },
      { key:'dehumanization', points:3, re:/\b(nem emberek|férgek|patkányok|csótányok|söpredék|hulladék|csürhe|állatok|paraziták)\b/i },
      { key:'removalIncitement', points:4, re:/\b(ki kell(ene)?\s*(takarítani|irtani|űzni)|el kell(ene)?\s*(távolítani|takarítani|hallgattatni|űzni)|takarítani kell|irtani kell)\b/i },
      { key:'scapegoating', points:2, re:/\b(miattuk|ezek miatt|azok miatt)\b.{0,50}\b(romlik|pusztul|tönkre|nincs jövőnk|tart itt|elveszítjük)\b/i },
      { key:'enemyFrame', points:2, re:/\b(ellenségeink|veszélyt jelentenek|fenyegetést jelentenek|ellenünk vannak|rombolják az országot|tönkretesznek minket)\b/i }
    ];
    let score = 0;
    const reasons = [];
    tests.forEach(t => {
      try {
        if (t.re.test(n) || t.re.test(squished)) {
          score += t.points;
          reasons.push(t.key + '+' + t.points);
        }
      } catch(_) {}
    });
    return { score, threshold: 4, reasons };
  }

  function downgradeWeakHateHits(hits, raw) {
    if (!hits || !hits.length) return hits;
    if (!hits.some(h => h.type === 'hate')) return hits;

    const score = scoreHateIncitement(raw);
    if (score.score >= score.threshold) {
      hits.forEach(h => {
        if (h.type === 'hate') {
          h.reason = (h.reason || h.body || 'Hergelés / csoportkriminalizálás.') +
            ' Pontozás: ' + score.score + ' / küszöb ' + score.threshold +
            (score.reasons.length ? ' (' + score.reasons.join(', ') + ').' : '.');
          h.matchedPattern = h.matchedPattern || 'hate-score:' + score.score;
        }
      });
      return hits;
    }
    return hits.filter(h => h.type !== 'hate');
  }


  function filterContextualFalsePositives(hits, raw) {
    if (!hits || !hits.length) return hits;
    if (isNeutralLegalOrFactCheckText(raw)) {
      return hits.filter(h => h.type !== 'hate');
    }
    return hits;
  }


  function ehExternalSemanticHits(raw) {
    if (!EH_EXTERNAL_SEMANTIC_RULES.length) return [];
    const n = normalize(raw);
    const s = squish(n);
    const hits = [];
    EH_EXTERNAL_SEMANTIC_RULES.forEach(rule => {
      const cat = EH_RULESET_CATEGORY_BY_ID[rule.categoryId] || ehCategoryFallback(null, rule.categoryId);
      const groups = rule.groups || {};
      const groupMatches = Object.create(null);
      Object.keys(groups).forEach(name => {
        groupMatches[name] = (groups[name] || []).some(pattern => {
          return ehRulePatternMatches(pattern, n, s);
        });
      });
      const allOk = (rule.allGroups || []).every(name => groupMatches[name]);
      const anyGroups = rule.anyGroups || [];
      const anyOk = anyGroups.length ? anyGroups.some(name => groupMatches[name]) : true;
      if (allOk && anyOk) {
        const matchedGroups = Object.keys(groupMatches).filter(k => groupMatches[k]).join(', ');
        hits.push(ehBuildHit(cat, rule.name || matchedGroups, rule.reason || ('Jelentéscsoport egyezés: ' + matchedGroups), Number(rule.priority || cat.priority || 0)));
      }
    });
    return hits;
  }

  ehInstallRuleset();

  // ── Szabályalapú jelentés-kombinációk ───────────────────────────
  // Nem AI: kifejezéscsoportokat nézünk együtt. Cél: kreatív, burkolt,
  // metaforikus agresszió / megalázás jobb felismerése.
  function semanticHits(raw) {
    const n = normalize(raw);
    const s = squish(n);
    const hits = [];

    const has = (patterns) => patterns.some(p => p.test(n) || p.test(s));

    const penetration = [
      /hatol(jon|ni|na)?\s*(bel[eé]d|bel[eé]tek|bele)/i,
      /hengeres\s*l[oó]szersz[aá]m\s*hatol(jon)?/i,
      /(bel[eé]d|bel[eé]tek)\s*(hatol|menjen|ker[uü]lj[oö]n|nyomuljon|dugjon)/i,
      /dug(jon|lak|na|ni)?\s*(bel[eé]d|bel[eé]tek|meg)?/i,
      /megbasz(om|lak|na|ni|omaz)?|meg\s*basz(om|lak|na|ni)?|megbassz(om|lak)?/i,
      /megbaszom\s*(a\s*)?(sz[aá]d|segged|feneked)|meg\s*baszom\s*(a\s*)?(sz[aá]d|segged|feneked)/i,
      /megdug(lak|na|ni)?|meg\s*dug(lak|na|ni)?/i
    ];
    const sexualBody = [
      /sz[aá]d|segg(ed|e|be|edet)?|fenek(ed|e|edet|edbe)?|goly[oó](id|idat|k)|pina|pics[aá]d|fasz|farod|lyukad|tested|bel[eé]d|bel[eé]tek/i
    ];
    const coercion = [
      /nem\s*mondhatsz\s*nemet|nem\s*k[eé]rdezlek|[uú]gyis\s*megkaplak|az\s*eny[eé]m\s*leszel|elveszem\s*amit\s*akarok/i
    ];
    const animalGrotesque = [
      /l[oó]|szam[aá]r|diszn[oó]|kutya|állat|l[oó]szersz[aá]m|hengeres\s*l[oó]szersz[aá]m/i
    ];
    const violentVerb = [
      /meg[oö]l|kiny[ií]r|kibelez|felakaszt|megfojt|feldarabol|ny[aá]rsra\s*h[uú]z|sz[eé]t\s*ver|sz[eé]tver|sz[eé]t\s*csap|sz[eé]tcsap|sz[eé]t\s*basz|sz[eé]tbasz|bet[oö]r[oö]m|beverem|elv[aá]gom/i
    ];
    const bodyTarget = [
      /fejed|sz[aá]d|pof[aá]d|torkod|nyakad|beled|fogad|arcod|kopony[aá]d/i
    ];
    const humiliation = [
      /nyalja\s*(a\s*)?(goly[oó]idat|segged|feneked)|goly[oó]idat\s*nyalja/i,
      /csak\s*ennyit\s*tudsz|ennyi\s*telik\s*t[őo]led|ehhez\s*kev[eé]s\s*vagy|az\s*[aá]tlagn[aá]l\s*(is\s*)?(h[uü]ly[eé]bb|but[aá]bb|ostob[aá]bb)/i,
      /a\s*v[eé]lem[eé]nyed\s*(semmit\s*)?nem\s*[ée]r|senki\s*nem\s*k[ií]v[aá]ncsi\s*r[aá]d/i
    ];

    // Direkt szexuális agresszió / kényszerítés: mindig piros.
    if (has(coercion) || (has(penetration) && (has(sexualBody) || /bel[eé]d|bel[eé]tek/i.test(n)))) {
      hits.push({
        priority: 500,
        level: 3, blur: true, type: 'sexual',
        title: '🟤 Emberi Hang figyelmeztetés',
        body: 'Szexuális agressziót, kényszerítést vagy testi autonómiát sértő tartalom észlelve.',
        rewrite: 'A düh vagy indulat megfogalmazható erőszakos, szexuálisan fenyegető kép nélkül is.'
      });
    }

    // Erőszakos ige + célzott testrész: piros.
    if (has(violentVerb) && has(bodyTarget)) {
      hits.push({
        priority: 604,
        level: 3, blur: true, type: 'threat',
        title: '🔴 Emberi Hang figyelmeztetés',
        body: 'Személy elleni testi erőszakot vagy életveszélyes fenyegetést tartalmazó szöveg észlelve.',
        rewrite: 'Erős felháborodást erőszakos fenyegetés nélkül is ki lehet fejezni.'
      });
    }

    // Groteszk állatos + szexuális/testrészes kép: legalább méltóságsértés,
    // behatolással együtt piros.
    if (has(animalGrotesque) && has(sexualBody)) {
      hits.push({
        priority: has(penetration) ? 504 : 304,
        level: has(penetration) ? 3 : 2,
        blur: true,
        type: has(penetration) ? 'sexual' : 'dignity',
        title: has(penetration) ? '🟤 Emberi Hang figyelmeztetés' : '🟠 Emberi Hang figyelmeztetés',
        body: has(penetration)
          ? 'Burkolt, szexualizált agressziót vagy testi autonómiát sértő tartalom észlelve.'
          : 'Szexualizált, megalázó vagy méltóságot sértő tartalom észlelve.',
        rewrite: 'A sértő, megalázó kép helyett érdemes a valódi kifogást megfogalmazni.'
      });
    }

    if (has(humiliation)) {
      hits.push({
        priority: 304,
        level: 2, blur: true, type: 'dignity',
        title: '🟠 Emberi Hang figyelmeztetés',
        body: 'Megalázó vagy emberi méltóságot sértő tartalom észlelve.',
        rewrite: 'A kritika akkor is lehet erős, ha közben nem alázza meg a másik embert.'
      });
    }

    const groupMarkers = [
      /\b(ezek|azok|ők|mind|mindannyian|egyik\s*sem|az\s*összes|ilyen\s*emberek|ez\s*a\s*(réteg|fajta|banda|csürhe|népség))\b/i
    ];
    const collectiveBlame = [
      /\b(bűnöző(k)?|tolvaj(ok)?|hazug(ok)?|korrupt(ak)?|élősködő(k)?|veszélyes(ek)?|fertőz(nek|őek)?|mérgez(nek|őek)?)\b/i,
      /\b(lopnak|csalnak|hazudnak|rombolnak|pusztítanak|miattuk\s*(pusztul|romlik|tart\s*itt|megy\s*tönkre))\b/i,
      /\b(nem\s*emberek|embernek\s*sem|állatok|férgek|patkányok|csótányok)\b/i,
      /\b(el\s*kellene\s*takarítani|ki\s*kellene\s*szorítani|el\s*kellene\s*hallgattatni|ki\s*kellene\s*zárni)\b/i
    ];
    if (has(groupMarkers) && has(collectiveBlame)) {
      hits.push({
        priority: 400,
        level: 2, blur: true, type: 'hate',
        title: '⚫ Emberi Hang figyelmeztetés',
        body: 'Hergelő, csoportot kriminalizáló vagy embercsoport elleni feszültséget fokozó tartalom észlelve.',
        rewrite: 'Lehet társadalmi problémáról határozottan beszélni anélkül is, hogy egy egész embercsoportot kollektíven bűnösnek neveznénk.'
      });
    }

    return hits;
  }

  // Kimenő szöveg külön osztályozása – ugyanazt a poti-szabályt követi, mint a fő osztályozó
  function classifyOutgoing(raw) {
    const sens = getSens();

    // Előbb a normál, prioritásos osztályozás fut le.
    // Ez már figyelembe veszi: 1=csak fenyegetés, 2=sértés/méltóság is, 3=lekicsinylés is.
    const result = classify(raw);
    if (result) return result;

    // Ha a Szabálylabor kivételként tanította, a kimenő mezőben se figyelmeztessen rá.
    if (ehV5HasIgnoreException(raw, []) || isNeutralExceptionText(raw) || isPositiveExceptionText(raw) || isDebateExceptionText(raw)) return null;

    // Standalone / beviteli mezős személyes sértés csak közepes vagy erős szinten jelezzen.
    // Így 1-es, gyenge állásban nem ugrik fel például egy sima „hülye” jelzésre.
    if (sens < 2) return null;

    const n = normalize(raw);
    const s = squish(n);
    if (isSzemélyesSértés(raw) || (!DEBATE_OK.test(n) && PERSONAL_INSULTS.some(p => p.test(n) || p.test(s)))) {
      return {
        level: 1,
        blur: true,
        type: 'insult',
        title: '🟡 Emberi Hang figyelmeztetés',
        body: 'Személyes sértést tartalmazó szöveg észlelve.',
        rewrite: 'Ugyanezt a gondolatot el lehet mondani úgy is, hogy az érv erős maradjon, de a hangnem ne bántson.'
      };
    }
    return null;
  }

  // Érzékenység biztonságos lekérése
  function getSens() {
    try { return Math.max(1, Math.min(2, parseInt(settings.sensitivity) || 1)); }
    catch(_) { return 1; }
  }

  function shouldOpalizeType(type, sens) {
    // V5 kétfokozatú érzékenységi logika:
    // 1 – Gyenge: csak a három kritikus fő kategória opálosodik:
    //     életellenes/testi fenyegetés, szexuális agresszió, hergelés.
    // 2 – Erős: ezek mellett az összevont emberi méltóság / személy elleni sértés is opálosodik.
    if (sens >= 2) return true;
    return ['threat', 'sexual', 'hate'].includes(type);
  }

  function applySensitivityToHit(hit, sens) {
    if (!hit) return hit;
    if (hit.action === 'ignore' || hit.action === 'learn') return null;
    hit.blur = shouldOpalizeType(hit.type, sens);
    hit.markerOnly = !hit.blur;
    return hit;
  }

  function classify(raw) {
    const n = normalize(raw);
    const s = squish(n);
    const c = crush(raw);
    const sens = getSens();

    const hits = [];

    // 1) Elsődleges: Szabálylaborból exportált ruleset.patterns teljes metaadatokkal.
    // Így a lifeThreat / sexualAggression / hateIncitement prioritás nem veszhet el
    // akkor sem, ha a régi kompatibilitási tömbök üresek vagy csak regexet tartalmaznak.
    hits.push(...ehV5EntryHits(raw));
    hits.push(...ehExternalPatternHits(raw));
    hits.push(...ehExternalSemanticHits(raw));
    hits.push(...semanticHits(raw));

    if (THREATS.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 600,
        level: 3, blur: true, type: 'threat',
        title: '🔴 Emberi Hang figyelmeztetés',
        body: 'Életellenes vagy testi fenyegetést tartalmazó szöveg észlelve.',
        rewrite: 'Nagyon erős felháborodást érzek — de az erőszak útja nem vezet sehova. Próbáljuk megfogalmazni azt, ami valóban fáj — erőszak nélkül.'
      });
    }

    if (SEXUAL_AGGRESSION.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 500,
        level: 3, blur: true, type: 'sexual',
        title: '🟤 Emberi Hang figyelmeztetés',
        body: 'Szexuális agressziót, kényszerítést vagy testi autonómiát sértő tartalom észlelve.',
        rewrite: 'A testi autonómia és emberi méltóság tisztelete alapvető. A düh vagy indulat megfogalmazható szexuális fenyegetés nélkül is.'
      });
    }

    if (HATE_HERD.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 400,
        level: 2, blur: true, type: 'hate',
        title: '⚫ Emberi Hang figyelmeztetés',
        body: 'Hergelő, csoportot kriminalizáló vagy embercsoport elleni feszültséget fokozó tartalom észlelve.',
        rewrite: 'Lehet társadalmi problémáról határozottan beszélni anélkül is, hogy egy egész embercsoportot kollektíven bűnösnek neveznénk.'
      });
    }

    if (DIGNITY.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 300,
        level: 2, blur: true, type: 'dignity',
        title: '🟠 Emberi Hang figyelmeztetés',
        body: 'Méltóságot sértő tartalom észlelve.',
        rewrite: 'Lehet szenvedélyesen vitázni, lehet mélyen nem érteni egyet — de embernek kell maradni.'
      });
    }

    if (isSzemélyesSértés(raw) || (!DEBATE_OK.test(n) && ([...INSULTS, ...PERSONAL_INSULTS].some(p => p.test(n) || p.test(s) || p.test(c))))) {
      hits.push({
        priority: 200,
        level: 1, blur: true, type: 'insult',
        title: '🟡 Emberi Hang figyelmeztetés',
        body: 'Személyes sértést tartalmazó szöveg észlelve.',
        rewrite: 'Ugyanezt a gondolatot el lehet mondani úgy is, hogy az érv erős maradjon, de a hangnem ne bántson.'
      });
    }

    if (!DEBATE_OK.test(n) && BELITTLING.some(p => p.test(n) || p.test(s))) {
      hits.push({
        priority: 100,
        level: 2, blur: true, type: 'belittling',
        title: '🟣 Emberi Hang figyelmeztetés',
        body: 'Lekicsinylő vagy megalázó tartalom észlelve.',
        rewrite: 'A kritika maradhat erős — de a másik embert egyenlőként kezelve is el lehet mondani.'
      });
    }

    const scoredHits = downgradeWeakHateHits(hits, raw);
    const contextualHits = filterContextualFalsePositives(scoredHits, raw);
    const rulesetFilteredHits = filterRulesetExceptionHits(contextualHits, raw);
    const filteredHits = ehV5FilterHits(rulesetFilteredHits, raw);
    if (!filteredHits.length) return null;
    filteredHits.sort((a, b) => b.priority - a.priority);
    return applySensitivityToHit(filteredHits[0], sens);
  }

  // ── UI ──────────────────────────────────────────────────────────
  function escapeHtml(s) {
    return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }

  function setEditableText(el, text) {
    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
      el.value = text; el.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (el.isContentEditable) {
      el.innerText = text; el.dispatchEvent(new InputEvent('input', { bubbles: true }));
    }
  }

  // ── Sértő szó kiemelése – XSS-biztos textNode alapú megközelítés ──
  function highlightOffensiveWord(el, text) {
    // Contenteditable esetén NEM módosítjuk a DOM-ot (fókusz elveszne)
    // Csak textarea/input esetén alkalmazunk vizuális jelzést
    if (!el) return;
    if (el.isContentEditable) {
      // Contenteditable: csak a border-bottom jelzés az elemen
      el.style.setProperty('outline', '2px solid rgba(140,60,180,0.6)', 'important');
      el.style.setProperty('border-radius', '4px', 'important');
      setTimeout(() => {
        el.style.removeProperty('outline');
        el.style.removeProperty('border-radius');
      }, 4000);
      return;
    }
    if (el.tagName !== 'TEXTAREA' && el.tagName !== 'INPUT') return;
    // Textarea/input: háttér jelzés
    el.style.setProperty('box-shadow', '0 0 0 2px rgba(140,60,180,0.5)', 'important');
    setTimeout(() => el.style.removeProperty('box-shadow'), 4000);
    try {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const nodesToReplace = [];

      // Összegyűjtjük az érintett szövegcsomópontokat
      let node;
      while ((node = walker.nextNode())) {
        if (NEGATÍV_SZÓ.test(node.nodeValue)) {
          nodesToReplace.push(node);
        }
      }

      // Biztonságos csere: createTextNode + span, NEM innerHTML
      for (const textNode of nodesToReplace) {
        const parts = textNode.nodeValue.split(NEGATÍV_SZÓ);
        const matches = textNode.nodeValue.match(new RegExp(NEGATÍV_SZÓ.source, 'gi')) || [];
        if (parts.length < 2) continue;

        const frag = document.createDocumentFragment();
        parts.forEach((part, idx) => {
          // Sima szöveg – biztonságos createTextNode
          frag.appendChild(document.createTextNode(part));
          if (idx < matches.length) {
            const span = document.createElement('span');
            span.className = 'th-highlight';
            span.title = 'Emberi Hang: sértő kifejezés';
            // createTextNode = XSS-mentes!
            span.appendChild(document.createTextNode(matches[idx]));
            frag.appendChild(span);
          }
        });

        textNode.parentNode.replaceChild(frag, textNode);
      }
    } catch(_) {}
  }

  // Kattintásra előugró figyelmeztetés a kimenő szövegnél
  function attachClickWarning(el, text, result) {
    // Ha már van rajta listener, ne adjunk hozzá még egyet
    if (el.dataset.thWarningAttached) return;
    el.dataset.thWarningAttached = '1';

    const handler = () => {
      // Csak akkor ugrik fel ha még mindig sértő a szöveg
      const current = (el.value || el.innerText || '').trim();
      if (!classifyOutgoing(current)) {
        el.removeEventListener('click', handler);
        return;
      }
      showWarning(current, result, el);
    };
    el.addEventListener('click', handler);
  }

  function getCategoryStyle(result) {
    const type = result.type || (result.level === 3 ? 'threat' : result.level === 2 ? 'dignity' : 'insult');
    const styles = {
      threat: {
        color: '#c0392b', bg: '#fff0f0', text: '#4a1010',
        soft: 'rgba(192,57,43,0.16)', glow: 'rgba(192,57,43,0.34)',
        softStrong: 'rgba(192,57,43,0.27)', glowStrong: 'rgba(192,57,43,0.48)',
        badge: '🔴 Életellenes testi fenyegetés',
        detail: 'A tartalom életellenes vagy testi fenyegetést jelezhet. Ezért a rendszer az aktuális szabályok szerint kezeli.'
      },
      sexual: {
        color: '#ec4899', bg: '#fff0fa', text: '#3d0b2e',
        soft: 'rgba(236,72,153,0.17)', glow: 'rgba(236,72,153,0.36)',
        softStrong: 'rgba(236,72,153,0.29)', glowStrong: 'rgba(236,72,153,0.52)',
        badge: '🟤 Szexuális agresszió',
        detail: 'A tartalom szexuális kényszerítést, megalázó határsértést vagy testi autonómiát sértő fenyegetést hordozhat.'
      },
      hate: {
        color: '#111827', bg: '#e5e7eb', text: '#f8fafc',
        soft: 'rgba(17,24,39,0.20)', glow: 'rgba(17,24,39,0.38)',
        softStrong: 'rgba(17,24,39,0.34)', glowStrong: 'rgba(17,24,39,0.54)',
        badge: '⚫ Hergelés',
        detail: 'A tartalom embercsoport elleni hergelést, kollektív bűnösséget vagy dehumanizáló általánosítást hordozhat.'
      },
      dignity: {
        color: '#e67e22', bg: '#fff5e8', text: '#4a2a08',
        soft: 'rgba(230,126,34,0.16)', glow: 'rgba(230,126,34,0.34)',
        softStrong: 'rgba(230,126,34,0.27)', glowStrong: 'rgba(230,126,34,0.48)',
        badge: '🟠 Méltóságsértés',
        detail: 'A tartalom az emberi méltóságot, értéket vagy önbecsülést sértő megfogalmazást tartalmazhat.'
      },
      insult: {
        color: '#d4a017', bg: '#fffbe6', text: '#4a3a05',
        soft: 'rgba(212,160,23,0.18)', glow: 'rgba(212,160,23,0.34)',
        softStrong: 'rgba(212,160,23,0.30)', glowStrong: 'rgba(212,160,23,0.48)',
        badge: '🟡 Személyes sértés',
        detail: 'A tartalom személyre irányuló bántó vagy sértő minősítést tartalmazhat.'
      },
      belittling: {
        color: '#8e44ad', bg: '#f8efff', text: '#351044',
        soft: 'rgba(142,68,173,0.16)', glow: 'rgba(142,68,173,0.34)',
        softStrong: 'rgba(142,68,173,0.27)', glowStrong: 'rgba(142,68,173,0.48)',
        badge: '🟣 Lekicsinylés',
        detail: 'A tartalom lekicsinylő, leértékelő vagy fölényeskedő hangnemet hordozhat.'
      }
    };
    return styles[type] || styles.insult;
  }


  function getReflectionQuote() {
    const quotes = [
      { text: 'Isten a maga képére teremtette az embert.', author: 'Mózes 1:27' },
      { text: 'Tiszteld magadban az embert, s úgy embertársaidban is meg fogod becsülni.', author: 'Kölcsey Ferenc' },
      { text: 'Nem elég embernek lenni — embernek is kell maradni.', author: 'Márai Sándor' },
      { text: 'A szavaknak súlya van.', author: 'Emberi Hang' },
      { text: 'Aki emberként szól, hidat épít ott is, ahol vita van.', author: 'Emberi Hang' }
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }


  function getEmpathyLine(result, isInputWarning) {
    const type = result.type || '';
    if (type === 'threat') return 'Álljunk meg egy pillanatra: a félelemkeltő vagy erőszakos szavak nagyon mély nyomot hagyhatnak.';
    if (type === 'sexual') return 'A testi autonómia és emberi méltóság tisztelete alapvető érték.';
    if (type === 'hate') return 'Feszültség van ebben a térben… de ne akarjuk tovább fokozni.';
    if (type === 'dignity') return 'A méltóság sérülése sokszor mélyebb fájdalmat okoz, mint egy egyszerű vita.';
    if (type === 'belittling') return 'A lenézés is tud sebet ejteni. Érdemes a gondolatot a másik leértékelése nélkül megfogalmazni.';
    return 'A szavaknak súlya van. Egy rövid szünet néha segít emberibb hangot találni.';
  }

  function closeWarningBox(box) {
    if (!box || !box.isConnected) return;
    box.classList.add('th-calm-down');
    setTimeout(() => { try { box.remove(); } catch (_) {} }, 560);
  }

  function appendText(parent, tag, text, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text || '';
    parent.appendChild(el);
    return el;
  }

  function appendParagraph(parent, text, strong) {
    const p = document.createElement('p');
    if (strong) {
      const b = document.createElement('strong');
      b.textContent = text || '';
      p.appendChild(b);
    } else {
      p.textContent = text || '';
    }
    parent.appendChild(p);
    return p;
  }

  function showWarning(originalText, result, targetEl) {
    const now = Date.now();
    if (now - lastWarningAt < 1500) return;
    lastWarningAt = now;
    document.querySelectorAll('.th-warning-box, #emberi-hang-center-warning-v2').forEach(el => el.remove());

    const box = document.createElement('div');
    const style = getCategoryStyle(result);
    box.id = 'emberi-hang-center-warning-v2';
    box.className = 'th-warning-box th-center-only-warning';
    box.style.position = 'fixed';
    box.style.top = '50%';
    box.style.left = '50%';
    box.style.right = 'auto';
    box.style.bottom = 'auto';
    box.style.transform = 'translate(-50%, -50%)';
    box.style.zIndex = '2147483647';
    box.style.setProperty('--th-color', style.color);
    box.style.setProperty('--th-bg', style.bg);
    box.style.setProperty('--th-text', style.text);
    box.style.setProperty('--th-soft', style.soft);
    box.style.setProperty('--th-glow', style.glow);
    box.style.setProperty('--th-soft-strong', style.softStrong);
    box.style.setProperty('--th-glow-strong', style.glowStrong);

    const isInputWarning = !!targetEl;
    const defaultBody = isInputWarning
      ? 'A beírt szöveg az aktuális érzékenységi szint alapján figyelmeztetést váltott ki.'
      : 'A tartalom az aktuális érzékenységi szint alapján opálosítva lett.';
    const actionText = isInputWarning
      ? 'Gondold át:'
      : 'A tartalom az aktuális érzékenységi szint alapján opálosítva lett.';
    const empathyLine = getEmpathyLine(result, isInputWarning);
    const quote = getReflectionQuote();

    appendText(box, 'h3', result.title || '⚠️ Emberi Hang figyelmeztetés');
    appendParagraph(box, result.body || defaultBody);

    if (isInputWarning) {
      const question = document.createElement('p');
      question.className = 'th-question-block';
      const questionLead = document.createElement('span');
      questionLead.textContent = actionText;
      const questionStrong = document.createElement('strong');
      questionStrong.textContent = 'BIZTOSAN ÍGY SZERETNÉD ELKÜLDENI?';
      question.appendChild(questionLead);
      question.appendChild(document.createElement('br'));
      question.appendChild(questionStrong);
      box.appendChild(question);
    } else {
      appendParagraph(box, actionText, true);
    }

    if (result.rewrite) {
      const p = document.createElement('p');
      p.className = 'th-suggestion-block';
      const label = document.createElement('strong');
      label.textContent = 'Javaslat:';
      const br = document.createElement('br');
      const em = document.createElement('em');
      em.textContent = result.rewrite;
      p.appendChild(label);
      p.appendChild(br);
      p.appendChild(em);
      box.appendChild(p);
    }

    appendParagraph(box, empathyLine);

    const quoteP = document.createElement('p');
    quoteP.className = 'th-quote-line';
    const quoteEm = document.createElement('em');
    quoteEm.appendChild(document.createTextNode('„' + quote.text + '”'));
    quoteP.appendChild(quoteEm);
    quoteP.appendChild(document.createElement('br'));
    const small = document.createElement('small');
    small.textContent = '— ' + quote.author;
    quoteP.appendChild(small);
    box.appendChild(quoteP);

    const useBtn = document.createElement('button');
    useBtn.id = 'th-use-rewrite';
    useBtn.textContent = 'Javaslat bemásolása';
    if (!result.rewrite) useBtn.style.display = 'none';
    box.appendChild(useBtn);

    const understood = document.createElement('button');
    understood.id = 'th-understood';
    understood.textContent = 'MEGÉRTETTEM';
    box.appendChild(understood);

    document.body.appendChild(box);
    understood.addEventListener('click', () => closeWarningBox(box));
    useBtn.addEventListener('click', () => {
      if (targetEl && result.rewrite) setEditableText(targetEl, result.rewrite);
      closeWarningBox(box);
    });
  }


  function removeSoftMarker(el) {
    if (!el || !el._thSoftMarker) return;
    try { el._thSoftMarker.remove(); } catch(_) {}
    el._thSoftMarker = null;
  }

  function showSoftMarkerInfo(result, style) {
    document.querySelectorAll('.th-marker-info').forEach(n => n.remove());
    const panel = document.createElement('div');
    panel.className = 'th-marker-info';
    panel.style.setProperty('--th-marker-color', style.color);

    const title = document.createElement('strong');
    title.textContent = style.badge;
    panel.appendChild(title);

    const p = document.createElement('p');
    p.textContent = result.body || style.detail || 'Az Emberi Hang jelzést adott erre a megfogalmazásra.';
    panel.appendChild(p);

    const small = document.createElement('small');
    small.textContent = result.rewrite || style.detail || 'A tartalom nem lett kitakarva ezen az érzékenységi szinten, csak figyelmeztető jelzést kapott.';
    panel.appendChild(small);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Értem';
    btn.addEventListener('click', () => panel.remove());
    panel.appendChild(btn);

    document.body.appendChild(panel);
    setTimeout(() => { try { panel.remove(); } catch(_) {} }, 9000);
  }

  function addSoftMarker(el, result, style) {
    if (el._thSoftMarker) return;
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'th-soft-marker';
    marker.title = style.badge + ' – kattints a magyarázathoz';
    marker.textContent = '⚠︎';
    marker.style.setProperty('--th-marker-color', style.color);
    marker.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      showSoftMarkerInfo(result, style);
    }, true);
    try {
      el.parentNode.insertBefore(marker, el);
      el._thSoftMarker = marker;
      el.classList.add('th-soft-flagged');
      el.style.setProperty('--th-opal-color', style.color);
    } catch(_) {}
  }

  function applyToElement(el, result) {
    // Egy kommenthez csak EGY opálréteg tartozhat.
    // Ha egy szülő és egy gyerek elem is találat lenne, a szülő nyer,
    // a belső rétegeket töröljük, hogy ne legyen dupla takarás.
    if (el.classList.contains('th-processed')) return;
    if (el.closest('.th-opalized')) return;
    el.querySelectorAll('.th-processed, .th-opalized, [data-th-processed], [data-th-opal-label]').forEach(resetElementModeration);

    el.dataset.thProcessed = '1';
    el.classList.add('th-processed');

    const style = getCategoryStyle(result);

    if (!result.blur) {
      addSoftMarker(el, result, style);
      return;
    }

    if (result.blur) {
      // Olvasási/komment módban nem csak CSS filtert használunk,
      // hanem egy tényleges opálos fedőréteget is. Ez sokkal stabilabb
      // Facebook/YouTube/komment motorok transformált DOM-jában is.
      el.classList.add('th-opalized');
      el.dataset.thOpalLabel = style.badge + ' – takart tartalom';
      el.dataset.thOpalInfo = style.detail || 'A tartalom az aktuális Emberi Hang szabályrendszer szerint takarásra került.';
      const normalizedOpalType = (result.type === 'lifeThreat' || result.type === 'LIFE_THREATS') ? 'threat'
        : (result.type === 'hateIncitement' || result.type === 'HATE_INCITEMENT') ? 'hate'
        : (result.type || 'insult');
      el.dataset.thOpalType = normalizedOpalType;
      el.style.setProperty('--th-opal-color', style.color);
      el.style.setProperty('--th-opal-bg', style.bg);
      el.style.setProperty('--th-opal-text', style.text || style.color);

      // Kattintásra ideiglenesen megnyitjuk a takarást.
      // Ha az egér elhagyja az elemet, vagy máshová kattint a felhasználó,
      // automatikusan visszaopálosodik.
      const closeOpal = () => {
        el.classList.remove('th-opal-revealed');
      };

      el.addEventListener('click', function revealOpalized(ev) {
        el.classList.add('th-opal-revealed');
      }, true);

      el.addEventListener('mouseleave', closeOpal, true);
      el.addEventListener('blur', closeOpal, true);
      el.addEventListener('focusout', closeOpal, true);
      document.addEventListener('pointerdown', (ev) => {
        if (!el.contains(ev.target)) closeOpal();
      }, true);
    }

    // Komment/olvasási módban nem teszünk külön badge-et vagy mini-panelt az elem mellé.
    // Így nincs második vizuális réteg, csak az egyetlen opálfelület.
  }

  function resetElementModeration(el) {
    if (!el || el.nodeType !== 1) return;
    el.classList.remove('th-processed', 'th-opalized', 'th-opal-revealed', 'th-soft-flagged');
    removeSoftMarker(el);
    delete el.dataset.thProcessed;
    delete el.dataset.thOpalLabel;
    delete el.dataset.thOpalInfo;
    delete el.dataset.thOpalType;
    el.style.removeProperty('--th-opal-color');
    el.style.removeProperty('--th-opal-bg');
    el.style.removeProperty('--th-opal-text');

    const next = el.nextElementSibling;
    if (next && (next.classList.contains('th-badge') || next.classList.contains('th-detail-panel'))) {
      next.remove();
    }
  }

  function clearAllModerationMarks() {
    document.querySelectorAll('.th-detail-panel, .th-badge, .th-soft-marker, .th-marker-info').forEach(n => n.remove());
    document.querySelectorAll('.th-processed, .th-opalized, [data-th-processed], [data-th-opal-label]').forEach(resetElementModeration);
  }

  function refreshModerationState(reason = 'manual') {
    // A popupban állított pipák/poti azonnal érvényesüljön, oldalfrissítés nélkül.
    // Fontos: előbb mindent visszaállítunk, majd csak az aktuális szabály szerint takarunk újra.
    clearAllModerationMarks();
    closeWarningBox();
    if (settings.enabled && settings.blurIncoming) {
      scanPage();
    }
    console.log('Emberi Hang: élő beállításfrissítés lefutott:', reason, settings);
  }

  // ── Bejövő tartalom figyelése ───────────────────────────────────
  // Kisebb, természetes szövegblokkokat vizsgálunk.
  // Fontos: NEM vizsgálunk teljes article/section elemeket, mert akkor több kategória
  // egyetlen nagy piros lepellel takaródna. Cél: egy komment / egy bekezdés / egy kódblokk = egy opál.
  const TH_CANDIDATE_SELECTOR = [
    'p', 'li', 'blockquote', 'td', 'pre',
    '[id="content-text"]',
    'yt-attributed-string',
    'span[dir="auto"]',
    'div[dir="auto"]',
    '[data-testid*="comment"]',
    '[class*="comment-content"]', '[class*="CommentContent"]',
    '[class*="message-content"]', '[class*="MessageContent"]'
  ].join(',');

  function hasCandidateDescendant(el) {
    if (!el || !el.querySelectorAll) return false;
    return Array.from(el.querySelectorAll(TH_CANDIDATE_SELECTOR)).some(child => child !== el);
  }

  function checkElement(el) {
    if (!settings.enabled || !settings.blurIncoming) return;
    if (!el || el.nodeType !== 1) return;
    if (el.dataset.thProcessed) return;
    if (el.closest('.th-opalized')) return;
    if (el.querySelector && el.querySelector('.th-opalized')) return;
    if (['SCRIPT','STYLE','NOSCRIPT','HEAD','IFRAME','BUTTON','TEXTAREA','INPUT'].includes(el.tagName)) return;
    if (el.classList.contains('th-badge') || el.closest('.th-warning-box')) return;

    // Ha egy nagyobb konténerben vannak kisebb jelölt blokkok, ne a szülőt takarjuk.
    // Így a tesztben a fenyegetés/méltóság/sértés/lekicsinylés külön színű opált kap.
    if (hasCandidateDescendant(el) && !['PRE','P','LI','BLOCKQUOTE','TD'].includes(el.tagName)) return;

    const text = (el.innerText || el.textContent || '').replace(/\s+/g,' ').trim();
    if (text.length < 5 || text.length > 900) return;
    const result = classify(text);
    if (result) applyToElement(el, result);
  }

  function getScanCandidates(root = document) {
    const nodes = Array.from(root.querySelectorAll ? root.querySelectorAll(TH_CANDIDATE_SELECTOR) : []);
    // Rövidebb / belsőbb blokkok előre, hogy ne szülő konténer nyerjen.
    return nodes
      .filter(el => el && el.nodeType === 1)
      .sort((a, b) => (a.querySelectorAll('*').length - b.querySelectorAll('*').length));
  }

  function scanPage() {
    getScanCandidates(document)
      .slice(0, 650)
      .forEach(checkElement);
  }

  function startObserver() {
    new MutationObserver(mutations => {
      if (!settings.enabled || !settings.blurIncoming) return;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches(TH_CANDIDATE_SELECTOR)) checkElement(node);
          getScanCandidates(node).slice(0, 120).forEach(checkElement);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  // ── Kimenő szöveg figyelése ─────────────────────────────────────
  let outTimer = null;
  document.addEventListener('input', e => {
    if (!settings.enabled || !settings.warnOutgoing) return;
    const el = e.target;
    if (!el || (!el.isContentEditable && el.tagName !== 'TEXTAREA' && el.tagName !== 'INPUT')) return;
    clearTimeout(outTimer);
    outTimer = setTimeout(async () => {
      const text = (el.value || el.innerText || '').trim();
      if (text.length < 5) return;

      // Először gyors helyi szűrő
      const localResult = classifyOutgoing(text);
      if (localResult) {
        highlightOffensiveWord(el, text);
        showWarning(text, localResult, el);
        attachClickWarning(el, text, localResult);
        return;
      }

      // Web Store safe tesztverzió: AI/API ág leválasztva, csak szabályalapú elemzés fut.
    }, 900);
  }, true);

  // ── Indítás ─────────────────────────────────────────────────────
  (async function init() {
    await loadSettings();
    // Beviteli mód: középső empatikus panel.
    // Olvasási/komment mód: ugyanaz a szabályrendszer, de csak opálosítás + jelvény, felugró panel nélkül.
    scanPage();
    startObserver();
    console.log('Emberi Hang aktív v0.3.9: stabil egyopál, input panel, komment opál.');
  })();
}


// Content scriptként közvetlenül indul.
contentScriptMain();
