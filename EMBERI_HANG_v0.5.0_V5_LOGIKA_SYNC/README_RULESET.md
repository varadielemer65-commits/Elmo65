# Emberi Hang ruleset.js kapcsolat

Ez a build a Szabálylaborból exportált `ruleset.js` fájlt tudja betölteni.

## Használat

1. A Szabálylaborban válaszd az **Emberi Hang ruleset.js** exportot.
2. A letöltött fájl neve legyen: `ruleset.js`.
3. Másold be a bővítmény gyökérmappájába a meglévő `ruleset.js` helyére.
4. A Chrome bővítmény oldalon töltsd újra a bővítményt.
5. A már megnyitott weboldalakat frissítsd vagy indítsd újra a böngészőt.

## Visszafelé kompatibilitás

Ha a `ruleset.js` hiányzik, üres, vagy hibás adatot tartalmaz, a `hatter.js` régi beépített szabályai tovább működnek.

## Támogatott mezők

A találat objektum mezői:

- `type`
- `level`
- `priority`
- `title`
- `body`
- `rewrite`
- `opalMessage`
- `reason`
- `matchedPattern`

## Array-nevek

- `LIFE_THREATS`
- `SEXUAL_AGGRESSION`
- `HATE_INCITEMENT`
- `DIGNITY`
- `PERSONAL_INSULTS`
- `BELITTLING`

Régi aliasok:

- `THREATS` → `LIFE_THREATS`
- `HATE_HERD` → `HATE_INCITEMENT`
- `INSULTS` → `PERSONAL_INSULTS`

## v0.4.2 érzékenységi pontosítás

Az érzékenységi csúszka most két dolgot külön választ:

- **Opálos takarás**: erősebb beavatkozás.
- **⚠️ jelzés**: a szöveg látható marad, de a komment elején figyelmeztető ikon jelenik meg. Az ikonra kattintva rövid kategória-magyarázat nyílik.

Szintek:

1. **Enyhe**: opál = életellenes/testi fenyegetés, szexuális agresszió, hergelés/gyűlöletkeltés. A többi kategória csak ⚠️ jelzést kap.
2. **Közepes**: opál = az előző három + méltóságsértés. A személyes sértés és lekicsinylés csak ⚠️ jelzést kap.
3. **Erős**: minden kategória opálos takarást kap.

A hergelés kategória opálszövege olvashatóbb világos feliratot kapott a sötét opálfelületen.

## 0.4.2.3 javítás

A főprogram most a `window.EMBERI_HANG_RULESET.patterns` listát elsődleges szabályforrásként olvassa.
Ez azért fontos, mert a Szabálylabor exportban a valódi minták a `patterns[]` listában vannak,
és nem a kompatibilitási alias tömbökben. A találatok így megőrzik a kategória-prioritást,
a súlyosságot, az okot és a `matchedPattern` értéket.

Teszt:
`Megöllek, te hülye.` → gyenge állásban is 🔴 Életellenes / testi fenyegetésként kell opálosodjon.


## Szabálylabor kivétellisták

A főprogram most már a `window.EMBERI_HANG_RULESET.dictionaries` alatt érkező kivétellistákat is figyelembe veszi:

- `positiveExceptions` – jóindulatú / támogató kivételek;
- `debateOk` – vita, politikai-jogi, tényellenőrző kivételek;
- `neutralExceptions` – semleges / nem szabályozandó kivételek.

A kritikus kategóriákat – életellenes/testi fenyegetés és szexuális agresszió – ezek a kivételek nem némítják el.


## V5 indexált ruleset támogatás

Ez a build támogatja a Szabálylabor V5 `entries[]` alapú exportját.

A fő döntési modell:
- gyenge fokozatban opálosodik: `lifeThreat`, `sexualAggression`, `hateIncitement`;
- erős fokozatban ezek mellett opálosodik az összevont `humanOffense`;
- `positiveException`, `debateException`, `neutralException` + `action: "ignore"` kivételként működik;
- `uncertain` / `learn` nem opálosít, tanítandó jelzésként marad a ruleset-ben;
- a hergelés V5 `signals` mezője pontszámként növeli a prioritást;
- az irónia/szarkazmus `tone` módosítóként működik, nem automatikus kivételként.
