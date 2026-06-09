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
.th-opalized::before {
  content: "";
  position: absolute !important;
  inset: 0 !important;
  z-index: 2147483645 !important;
  border-radius: inherit !important;
  background:
    radial-gradient(circle at 18% 12%, rgba(255,255,255,0.15), rgba(255,255,255,0.045) 42%, rgba(255,255,255,0.014) 74%),
    linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.018)),
    color-mix(in srgb, var(--th-opal-color, #c0392b) 13%, transparent) !important;
  border: 1.5px solid color-mix(in srgb, var(--th-opal-color, #c0392b) 44%, rgba(255,255,255,0.18)) !important;
  box-shadow:
    inset 0 0 18px rgba(255,255,255,0.15),
    0 0 0 3px color-mix(in srgb, var(--th-opal-color, #c0392b) 10%, transparent),
    0 0 20px color-mix(in srgb, var(--th-opal-color, #c0392b) 20%, transparent) !important;
  backdrop-filter: blur(13px) saturate(1.14) opacity(0.95) !important;
  -webkit-backdrop-filter: blur(13px) saturate(1.14) opacity(0.95) !important;
  pointer-events: none !important;
  animation: th-opal-pulse 2.15s ease-in-out infinite !important;
  transition: opacity 0.18s ease, backdrop-filter 0.18s ease, -webkit-backdrop-filter 0.18s ease !important;
}
@keyframes th-opal-pulse {
  0% {
    border-color: color-mix(in srgb, var(--th-opal-color, #c0392b) 38%, rgba(255,255,255,0.16));
    box-shadow: inset 0 0 16px rgba(255,255,255,0.13), 0 0 0 2px color-mix(in srgb, var(--th-opal-color, #c0392b) 8%, transparent), 0 0 15px color-mix(in srgb, var(--th-opal-color, #c0392b) 16%, transparent);
  }
  50% {
    border-color: color-mix(in srgb, var(--th-opal-color, #c0392b) 68%, rgba(255,255,255,0.24));
    box-shadow: inset 0 0 22px rgba(255,255,255,0.18), 0 0 0 5px color-mix(in srgb, var(--th-opal-color, #c0392b) 16%, transparent), 0 0 30px color-mix(in srgb, var(--th-opal-color, #c0392b) 30%, transparent);
  }
  100% {
    border-color: color-mix(in srgb, var(--th-opal-color, #c0392b) 38%, rgba(255,255,255,0.16));
    box-shadow: inset 0 0 16px rgba(255,255,255,0.13), 0 0 0 2px color-mix(in srgb, var(--th-opal-color, #c0392b) 8%, transparent), 0 0 15px color-mix(in srgb, var(--th-opal-color, #c0392b) 16%, transparent);
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
  color: var(--th-opal-color, #c0392b) !important;
  text-shadow: 0 2px 4px rgba(45,45,45,0.82), 0 0 3px rgba(45,45,45,0.68) !important;
  pointer-events: none !important;
  transition: opacity 0.18s ease !important;
}
.th-opalized:hover::before {
  background:
    radial-gradient(circle at 18% 12%, rgba(255,255,255,0.12), rgba(255,255,255,0.032) 42%, rgba(255,255,255,0.010) 74%),
    linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.014)),
    color-mix(in srgb, var(--th-opal-color, #c0392b) 11%, transparent) !important;
}
.th-opalized.th-opal-revealed::before,
.th-opalized.th-opal-revealed::after {
  opacity: 0 !important;
}
.th-opalized.th-opal-revealed {
  cursor: default !important;
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

  const DEFAULTS = { enabled: true, blurIncoming: true, warnOutgoing: true, sensitivity: 2 };
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

  // Érzékenység változás fogadása a popuptól — tartalék útvonal,
  // ha egy böngésző/oldal késve adná tovább a storage.onChanged eseményt.
  chrome.runtime.onMessage.addListener((msg) => {
    if (!msg || msg.type !== 'EH_SETTINGS_CHANGE') return;
    if (msg.settings && typeof msg.settings === 'object') {
      settings = { ...settings, ...msg.settings };
    }
    scheduleRescan('runtime-message');
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
        priority: 95,
        level: 3, blur: true, type: 'sexual',
        title: '🟤 Emberi Hang figyelmeztetés',
        body: 'Szexuális agressziót, kényszerítést vagy testi autonómiát sértő tartalom észlelve.',
        rewrite: 'A düh vagy indulat megfogalmazható erőszakos, szexuálisan fenyegető kép nélkül is.'
      });
    }

    // Erőszakos ige + célzott testrész: piros.
    if (has(violentVerb) && has(bodyTarget)) {
      hits.push({
        priority: 104,
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
        priority: has(penetration) ? 94 : 82,
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
        priority: 81,
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
        priority: 90,
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
    try { return Math.max(1, Math.min(3, parseInt(settings.sensitivity) || 2)); }
    catch(_) { return 2; }
  }

  function classify(raw) {
    const n = normalize(raw);
    const s = squish(n);
    const c = crush(raw);
    const sens = getSens();

    const hits = [];

    hits.push(...semanticHits(raw).filter(h => h.type === 'threat' || h.type === 'sexual' || sens >= 2));

    if (THREATS.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 100,
        level: 3, blur: true, type: 'threat',
        title: '🔴 Emberi Hang figyelmeztetés',
        body: 'Személy elleni fenyegető, életveszélyes vagy testi erőszakot kilátásba helyező tartalom észlelve.',
        rewrite: 'Nagyon erős felháborodást érzek — de az erőszak útja nem vezet sehova. Próbáljuk megfogalmazni azt, ami valóban fáj — erőszak nélkül.'
      });
    }

    if (SEXUAL_AGGRESSION.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 95,
        level: 3, blur: true, type: 'sexual',
        title: '🟤 Emberi Hang figyelmeztetés',
        body: 'Szexuális agressziót, kényszerítést vagy testi autonómiát sértő tartalom észlelve.',
        rewrite: 'A testi autonómia és emberi méltóság tisztelete alapvető. A düh vagy indulat megfogalmazható szexuális fenyegetés nélkül is.'
      });
    }

    if (sens >= 2 && HATE_HERD.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 90,
        level: 2, blur: true, type: 'hate',
        title: '⚫ Emberi Hang figyelmeztetés',
        body: 'Hergelő, csoportot kriminalizáló vagy embercsoport elleni feszültséget fokozó tartalom észlelve.',
        rewrite: 'Lehet társadalmi problémáról határozottan beszélni anélkül is, hogy egy egész embercsoportot kollektíven bűnösnek neveznénk.'
      });
    }

    if (sens >= 2 && DIGNITY.some(p => p.test(n) || p.test(s) || p.test(c))) {
      hits.push({
        priority: 80,
        level: 2, blur: true, type: 'dignity',
        title: '🟠 Emberi Hang figyelmeztetés',
        body: 'Méltóságot sértő tartalom észlelve.',
        rewrite: 'Lehet szenvedélyesen vitázni, lehet mélyen nem érteni egyet — de embernek kell maradni.'
      });
    }

    if (sens >= 2 && (isSzemélyesSértés(raw) || (!DEBATE_OK.test(n) && ([...INSULTS, ...PERSONAL_INSULTS].some(p => p.test(n) || p.test(s) || p.test(c)))))) {
      hits.push({
        priority: 60,
        level: 1, blur: true, type: 'insult',
        title: '🟡 Emberi Hang figyelmeztetés',
        body: 'Személyes sértést tartalmazó szöveg észlelve.',
        rewrite: 'Ugyanezt a gondolatot el lehet mondani úgy is, hogy az érv erős maradjon, de a hangnem ne bántson.'
      });
    }

    if (sens >= 3 && !DEBATE_OK.test(n) && BELITTLING.some(p => p.test(n) || p.test(s))) {
      hits.push({
        priority: 40,
        level: 2, blur: true, type: 'belittling',
        title: '🟣 Emberi Hang figyelmeztetés',
        body: 'Lekicsinylő vagy megalázó tartalom észlelve.',
        rewrite: 'A kritika maradhat erős — de a másik embert egyenlőként kezelve is el lehet mondani.'
      });
    }

    if (!hits.length) return null;
    hits.sort((a, b) => b.priority - a.priority);
    return hits[0];
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
        badge: '🔴 Fenyegetés',
        detail: 'A tartalom személy elleni fenyegetést, életveszélyt vagy testi erőszakot jelezhet. Ezért a rendszer az aktuális szabályok szerint eltakarja.'
      },
      sexual: {
        color: '#7f1d5f', bg: '#fff0fa', text: '#3d0b2e',
        soft: 'rgba(127,29,95,0.17)', glow: 'rgba(127,29,95,0.36)',
        softStrong: 'rgba(127,29,95,0.29)', glowStrong: 'rgba(127,29,95,0.52)',
        badge: '🟤 Szexuális agresszió',
        detail: 'A tartalom szexuális kényszerítést, megalázó határsértést vagy testi autonómiát sértő fenyegetést hordozhat.'
      },
      hate: {
        color: '#2f3542', bg: '#f2f4f7', text: '#20242b',
        soft: 'rgba(47,53,66,0.18)', glow: 'rgba(47,53,66,0.34)',
        softStrong: 'rgba(47,53,66,0.31)', glowStrong: 'rgba(47,53,66,0.50)',
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

    if (result.blur) {
      // Olvasási/komment módban nem csak CSS filtert használunk,
      // hanem egy tényleges opálos fedőréteget is. Ez sokkal stabilabb
      // Facebook/YouTube/komment motorok transformált DOM-jában is.
      el.classList.add('th-opalized');
      el.dataset.thOpalLabel = style.badge + ' – takart tartalom';
      el.dataset.thOpalInfo = style.detail || 'A tartalom az aktuális Emberi Hang szabályrendszer szerint takarásra került.';
      el.style.setProperty('--th-opal-color', style.color);
      el.style.setProperty('--th-opal-bg', style.bg);
      el.style.setProperty('--th-opal-text', style.color);

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
    el.classList.remove('th-processed', 'th-opalized', 'th-opal-revealed');
    delete el.dataset.thProcessed;
    delete el.dataset.thOpalLabel;
    delete el.dataset.thOpalInfo;
    el.style.removeProperty('--th-opal-color');
    el.style.removeProperty('--th-opal-bg');
    el.style.removeProperty('--th-opal-text');

    const next = el.nextElementSibling;
    if (next && (next.classList.contains('th-badge') || next.classList.contains('th-detail-panel'))) {
      next.remove();
    }
  }

  function clearAllModerationMarks() {
    document.querySelectorAll('.th-detail-panel, .th-badge').forEach(n => n.remove());
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
