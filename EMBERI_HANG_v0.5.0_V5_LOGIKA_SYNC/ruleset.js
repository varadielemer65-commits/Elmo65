// Emberi Hang – ruleset.js
// Szabálylabor export. Másold ezt a fájlt az Emberi Hang bővítmény gyökérmappájába ruleset.js néven.
(function(){
  window.EMBERI_HANG_RULESET = {
    "meta": {
      "name": "Emberi Hang szabálylabor",
      "version": "0.5.0-full-pattern-pack",
      "target": "hatter.js expanded category model",
      "exportedAt": "2026-05-24T07:40:12.312Z"
    },
    "categories": [
      {
        "id": "lifeThreat",
        "arrayName": "LIFE_THREATS",
        "icon": "🔴",
        "name": "Életellenes / testi fenyegetés",
        "level": 3,
        "priority": 600,
        "minSensitivity": 1,
        "color": "#ef4444",
        "title": "🔴 Emberi Hang figyelmeztetés",
        "body": "Életellenes vagy testi fenyegetést tartalmazó szöveg észlelve.",
        "rewrite": "Az indulat megfogalmazható testi fenyegetés nélkül is.",
        "opalMessage": "Állj meg egy pillanatra: ez már testi fenyegetésként hathat."
      },
      {
        "id": "sexualAggression",
        "arrayName": "SEXUAL_AGGRESSION",
        "icon": "●",
        "name": "Szexuális agresszió / testi autonómia megsértése",
        "level": 3,
        "priority": 500,
        "minSensitivity": 1,
        "color": "#ec4899",
        "title": "● Emberi Hang figyelmeztetés",
        "body": "Szexuális agressziót, kényszerítést vagy testi autonómiát sértő tartalom észlelve.",
        "rewrite": "A düh vagy vágy nem írhatja felül a másik testi autonómiáját.",
        "opalMessage": "Ez szexuális kényszerítésként vagy testi autonómia megsértéseként hathat."
      },
      {
        "id": "hateIncitement",
        "arrayName": "HATE_INCITEMENT",
        "icon": "⚫",
        "name": "Hergelés / gyűlöletkeltés / csoportkriminalizálás",
        "level": 2,
        "priority": 400,
        "minSensitivity": 2,
        "color": "#111827",
        "title": "⚫ Emberi Hang figyelmeztetés",
        "body": "Csoport elleni hergelő, gyűlöletkeltő vagy kollektív bűnösséget sugalló tartalom észlelve.",
        "rewrite": "A kritika legyen konkrét: ne bélyegezz meg egész embercsoportokat.",
        "opalMessage": "Ez egész csoportot tehet felelőssé vagy ellenséggé."
      },
      {
        "id": "dignity",
        "arrayName": "DIGNITY",
        "icon": "🟠",
        "name": "Méltóságsértés",
        "level": 2,
        "priority": 300,
        "minSensitivity": 2,
        "color": "#f97316",
        "title": "🟠 Emberi Hang figyelmeztetés",
        "body": "Megalázó, dehumanizáló vagy emberi méltóságot sértő tartalom észlelve.",
        "rewrite": "A kritika akkor is lehet erős, ha nem alázza meg a másik embert.",
        "opalMessage": "Ez a megfogalmazás sértheti az emberi méltóságot."
      },
      {
        "id": "personalInsult",
        "arrayName": "PERSONAL_INSULTS",
        "icon": "🟡",
        "name": "Személyes sértés",
        "level": 1,
        "priority": 200,
        "minSensitivity": 2,
        "color": "#eab308",
        "title": "🟡 Emberi Hang figyelmeztetés",
        "body": "Személyre irányuló sértő minősítés észlelve.",
        "rewrite": "Az érv erősebb marad, ha a személy helyett az állítást vagy viselkedést bírálod.",
        "opalMessage": "Ez személyeskedésként hathat."
      },
      {
        "id": "belittling",
        "arrayName": "BELITTLING",
        "icon": "🟣",
        "name": "Lekicsinylés / burkolt sértés",
        "level": 1,
        "priority": 100,
        "minSensitivity": 3,
        "color": "#a855f7",
        "title": "🟣 Emberi Hang figyelmeztetés",
        "body": "Lekicsinylő vagy burkoltan megalázó jelentésminta észlelve.",
        "rewrite": "Érdemes a valódi kifogást kimondani, nem a másik értékét kicsinyíteni.",
        "opalMessage": "Ez burkolt lekicsinylésként hathat."
      }
    ],
    "patterns": [
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "meg\\s*kel+\\s*(öl|lő|ver)|megöllek|kinyírlak|agyonverlek|betöröm\\s*a\\s*fejed|elvágom\\s*a\\s*torkod",
        "flags": "i",
        "severity": 5,
        "reason": "Élet vagy testi épség elleni közvetlen fenyegetés.",
        "tags": [
          "életellenes",
          "testi fenyegetés"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "tudod\\s*hol\\s*laksz|megtalállak|pórul\\s*jársz|meg\\s*fogod\\s*bánni",
        "flags": "i",
        "severity": 4,
        "reason": "Burkolt megtorlási vagy testi fenyegetés.",
        "tags": [
          "burkolt fenyegetés",
          "megtorlás"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "nem\\s*mondhatsz\\s*nemet|úgyis\\s*az\\s*enyém\\s*leszel|elveszem\\s*amit\\s*akarok|meger[őo]szakollak|er[őo]szakot\\s*teszek\\s*rajtad",
        "flags": "i",
        "severity": 5,
        "reason": "Szexuális kényszerítés vagy testi autonómia megsértése.",
        "tags": [
          "szexuális agresszió",
          "kényszerítés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "megbaszlak|megduglak|sz[eé]t\\s*baszlak|hatoljon\\s*bel[eé]d|bel[eé]d\\s*hatoljon",
        "flags": "i",
        "severity": 5,
        "reason": "Szexuális dominancia, agresszió vagy szexuális megalázás.",
        "tags": [
          "szexuális megalázás",
          "testi autonómia"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "mind(annyian|egyig)?\\s*(bűnözők|tolvajok|hazudnak|lopnak|korruptak)|ezek\\s*mind\\s*(ilyenek|bűnözők|tolvajok)",
        "flags": "i",
        "severity": 4,
        "reason": "Kollektív bűnösség vagy csoportkriminalizálás.",
        "tags": [
          "csoportkriminalizálás",
          "kollektív bűnösség"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "ki\\s*kell\\s*(irtani|takarítani|űzni)\\s*(őket|ezeket)|nem\\s*valók\\s*(közénk|ide|az\\s*országba)",
        "flags": "i",
        "severity": 5,
        "reason": "Csoport ellenségként kezelése, burkolt vagy direkt uszítás.",
        "tags": [
          "hergelés",
          "uszítás"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ők|ezek|azok|az ilyenek|ez a csoport)\\b.{0,40}\\b(mind|mindannyian|egytől egyig)\\b.{0,40}\\b(bűnösök|hibásak|felelősek|veszélyesek|kártékonyak)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Egész csoport kollektív felelőssé tétele.",
        "tags": [
          "kollektív bűnösség",
          "hergelés",
          "csoportáltalánosítás"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ők|ezek|azok|az ilyenek|ez a réteg|ez a társaság)\\b.{0,45}\\b(mind|általában|többségük|egytől egyig)?\\s*(bűnözők|tolvajok|csalók|élősködők|rendbontók|veszélyforrások)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Egy csoport kriminalizáló, általánosító minősítése.",
        "tags": [
          "csoportkriminalizálás",
          "általánosítás"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ők|ezek|azok|az ilyenek)\\b.{0,50}\\b(ellenségeink|fenyegetést jelentenek|veszélyt jelentenek|ellenünk vannak|tönkretesznek minket|rombolják az országot)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Csoport ellenségként vagy társadalmi fenyegetésként való beállítása.",
        "tags": [
          "ellenségképzés",
          "hergelés",
          "fenyegetéskeret"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ki kell|el kell|takarítani kell|el kell távolítani|nem szabad beengedni)\\b.{0,35}\\b(őket|ezeket|azokat|az ilyeneket)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Csoport eltávolítására vagy kirekesztésére buzdító minta.",
        "tags": [
          "kirekesztés",
          "eltávolítás",
          "uszításgyanú"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ők|ezek|azok|az ilyenek)\\b.{0,40}\\b(nem emberek|férgek|patkányok|söpredék|hulladék|csürhe|állatok)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Csoport dehumanizáló megnevezése.",
        "tags": [
          "dehumanizálás",
          "méltóságsértés",
          "hergelés"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ők|ezek|azok|az ilyenek)\\b.{0,40}\\b(nem valók ide|nem valók közénk|nincs helyük itt|nem részei a társadalomnak|nem tartoznak közénk)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Csoport társadalmi kirekesztése.",
        "tags": [
          "kirekesztés",
          "nem valók közénk",
          "csoportellenes keret"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(miattuk|ezek miatt|azok miatt|ennek a csoportnak köszönhetően)\\b.{0,50}\\b(romlik minden|megy tönkre az ország|nincs jövőnk|veszítjük el a biztonságunkat|lett ilyen rossz minden)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Társadalmi problémák egyetlen csoporthoz kötése, bűnbakképzés.",
        "tags": [
          "bűnbakképzés",
          "társadalmi hergelés"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(ők|ezek|azok|az ilyenek)\\b.{0,45}\\b(megfertőzik|beszennyezik|elárasztják|mérgezik|lerohanják|felzabálják)\\b.{0,30}\\b(a társadalmat|az országot|a várost|a közösséget|minket)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Csoportot fertőzésként, szennyezésként vagy invázióként leíró hergelő metafora.",
        "tags": [
          "fertőzésmetafora",
          "inváziós keret",
          "dehumanizálás"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(valakinek már tennie kellene valamit|ideje lenne rendet tenni|nem lehet tovább tűrni|majd a nép megoldja|elég volt belőlük)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Burkolt cselekvésre buzdítás csoport ellen.",
        "tags": [
          "burkolt uszítás",
          "rendteremtés-retorika"
        ]
      },
      {
        "categoryId": "hateIncitement",
        "kind": "regex",
        "pattern": "\\b(az ilyen emberek|az ilyenek|ezek a fajták|ez a fajta ember)\\b.{0,45}\\b(mindig|soha|csak|képtelenek|nem tudnak|nem akarnak)\\b.{0,45}\\b(normálisan viselkedni|beilleszkedni|dolgozni|együtt élni|szabályokat betartani)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Csoport lényegi, változtathatatlannak beállított negatív tulajdonsággal való azonosítása.",
        "tags": [
          "általánosítás",
          "lényegiesítés",
          "hergelés"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(agyonverlek|sz[eé]t\\s*verlek|össze\\s*verlek|eltöröm\\s*(a\\s*)?(kezed|lábad|orrod|állkapcsod)|beverem\\s*(a\\s*)?(fejed|pofád|arcod))\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Közvetlen testi bántalmazással fenyegetés.",
        "tags": [
          "testi fenyegetés",
          "közvetlen erőszak"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(elvágom|átvágom|felvágom)\\s*(a\\s*)?(torkod|nyakad)|\\b(megfojtalak|megfullasztalak|felgyújtalak)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Életet vagy súlyos testi épséget veszélyeztető fenyegetés.",
        "tags": [
          "életellenes",
          "súlyos fenyegetés"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(megtalállak|utánad\\s*megyek|rád\\s*szállok|levadászlak)\\b.{0,35}\\b(megbánod|bajod\\s*lesz|nem\\s*úszod\\s*meg|rosszul\\s*jársz)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Zaklató vagy megtorlást sejtető testi fenyegetés.",
        "tags": [
          "burkolt fenyegetés",
          "megtorlás"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(tudom\\s*hol\\s*laksz|ismerem\\s*a\\s*címed|megyek\\s*hozzád|ott\\s*várlak)\\b.{0,45}\\b(megbánod|elintézlek|bajod\\s*lesz|nem\\s*lesz\\s*jó\\s*vége)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Lakóhelyre vagy személyes elérhetőségre épített burkolt fenyegetés.",
        "tags": [
          "lakcímfenyegetés",
          "burkolt testi fenyegetés"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(eltaposlak|kinyírlak|kicsinállak|elteszlek\\s*láb\\s*alól|elintézlek)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Súlyos testi vagy életellenes erőszakot sejtető fenyegető kifejezés.",
        "tags": [
          "életellenes",
          "fenyegető fordulat"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(ha\\s*még\\s*egyszer|még\\s*egy\\s*ilyen|próbáld\\s*meg\\s*még\\s*egyszer)\\b.{0,55}\\b(megverlek|agyonverlek|eltöröm|beverem|elintézlek)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Feltételes, de konkrét testi megtorlást kilátásba helyező minta.",
        "tags": [
          "feltételes fenyegetés",
          "megtorlás"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(megöllek|kinyírlak|agyonverlek|megfojtalak|felgyújtalak)\\b.{0,25}\\b(komolyan|nem\\s*viccelek|esküszöm|hidd\\s*el)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Nyomatékosított életellenes vagy testi fenyegetés.",
        "tags": [
          "nyomatékosított fenyegetés",
          "életellenes"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "\\b(ne\\s*gyere\\s*a\\s*közelembe|jobb\\s*ha\\s*elkerülsz|kerülj\\s*el)\\b.{0,45}\\b(különben|mert)\\b.{0,35}\\b(bajod\\s*lesz|nem\\s*állok\\s*jót\\s*magamért|megütlek|megverlek)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Elkerülésre kényszerítő testi fenyegetés.",
        "tags": [
          "kényszerítés",
          "testi fenyegetés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(nem\\s*érdekel\\s*ha\\s*nemet\\s*mondasz|nem\\s*mondhatsz\\s*nemet|úgyis\\s*az\\s*enyém\\s*leszel|elveszem\\s*amit\\s*akarok)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Beleegyezést tagadó vagy szexuális kényszerítést sugalló minta.",
        "tags": [
          "beleegyezés tagadása",
          "szexuális kényszerítés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(meger[őo]szakollak|er[őo]szakot\\s*teszek\\s*rajtad|rád\\s*kényszerítem\\s*magam)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Közvetlen szexuális erőszakkal fenyegetés.",
        "tags": [
          "szexuális erőszak",
          "közvetlen fenyegetés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(fogdoslak|letapogatlak|hozzád\\s*nyúlok|megmarkollak)\\b.{0,35}\\b(akkor\\s*is|ha\\s*nem\\s*akarod|nem\\s*kérdezem|nem\\s*szólhatsz)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Testi autonómiát sértő, beleegyezés nélküli érintés mintája.",
        "tags": [
          "testi autonómia",
          "beleegyezés nélküli érintés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(megalázlak|betörlek|megtanítalak)\\b.{0,35}\\b(az\\s*ágyban|szexuálisan|a\\s*testeddel|a\\s*száddal)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Szexuális dominanciát vagy megalázást sugalló fenyegető minta.",
        "tags": [
          "szexuális megalázás",
          "dominancia"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(kényszerítelek|ráveszlek|nem\\s*hagyok\\s*békén)\\b.{0,45}\\b(szexre|lefeküdni|velem\\s*lenni|megtenni)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Szexuális kényszerítésre vagy nyomásgyakorlásra utaló minta.",
        "tags": [
          "szexuális nyomásgyakorlás",
          "kényszerítés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(a\\s*tested|a\\s*szád|a\\s*feneked|a\\s*melled)\\b.{0,35}\\b(az\\s*enyém|nekem\\s*jár|azt\\s*csinálok\\s*vele|nem\\s*te\\s*döntesz)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Másik ember testének birtoklását állító, testi autonómiát sértő minta.",
        "tags": [
          "testi autonómia",
          "birtoklás"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(ha\\s*nem\\s*adod|ha\\s*nem\\s*fekszel|ha\\s*nem\\s*teszed\\s*meg)\\b.{0,45}\\b(megbánod|kellemetlen\\s*lesz|bajod\\s*lesz|rád\\s*hozom\\s*a\\s*szégyent)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Szexuális cselekvéshez kötött zsarolás vagy fenyegetés.",
        "tags": [
          "szexuális zsarolás",
          "fenyegetés"
        ]
      },
      {
        "categoryId": "sexualAggression",
        "kind": "regex",
        "pattern": "\\b(megbaszlak|megduglak|sz[eé]t\\s*baszlak)\\b.{0,30}\\b(akkor\\s*is|ha\\s*nem\\s*akarod|nem\\s*kérdezlek|nem\\s*érdekel)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Durva szexuális agressziót és beleegyezés tagadását összekötő minta.",
        "tags": [
          "durva szexuális agresszió",
          "beleegyezés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(te|ti|ő|ők|maga|ez\\s*az\\s*ember)\\b.{0,35}\\b(nem\\s*is\\s*ember|embernek\\s*sem\\s*nevezhető|emberi\\s*roncs|emberi\\s*salak)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Emberi mivoltot tagadó, méltóságsértő minta.",
        "tags": [
          "dehumanizálás",
          "emberi méltóság"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(te|ti|ő|ők|maga)\\b.{0,35}\\b(féreg|patkány|söpredék|hulladék|csürhe|állat|parazita)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Személy vagy csoport dehumanizáló megnevezése.",
        "tags": [
          "dehumanizálás",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(undorító|visszataszító|gusztustalan|mocskos)\\b.{0,25}\\b(vagy|ember|alak|lény|senki)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Megvetést és emberi lealacsonyítást kifejező minta.",
        "tags": [
          "lealacsonyítás",
          "megvetés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(le\\s*kellene\\s*köpni|köpni\\s*való|szégyen\\s*hogy\\s*élsz|kár\\s*beléd\\s*a\\s*levegő)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "Emberi méltóságot súlyosan tagadó vagy megalázó fordulat.",
        "tags": [
          "megalázás",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(te|ti|ő|ők|maga)\\b.{0,40}\\b(semmirekellő|értéktelen|selejt|nyomorult|hitvány|alantas)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "A személy emberi értékét tagadó minősítés.",
        "tags": [
          "értéktagadás",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(ki\\s*kellene\\s*nevetni|nyilvánosan\\s*meg\\s*kellene\\s*alázni|szégyenpadra\\s*való|pellengérre\\s*való)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "Nyilvános megalázást normalizáló minta.",
        "tags": [
          "nyilvános megalázás",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(az\\s*életed|a\\s*létezésed|a\\s*jelenléted)\\b.{0,35}\\b(teher|szégyen|hiba|felesleges|értéktelen)\\b",
        "flags": "i",
        "severity": 5,
        "reason": "A személy létezésének értékét tagadó minta.",
        "tags": [
          "létezés értéktagadása",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "\\b(ilyen\\s*embert|az\\s*ilyet|téged)\\b.{0,35}\\b(nem\\s*kell\\s*komolyan\\s*venni|nem\\s*kár\\s*érte|nem\\s*számít|le\\s*kell\\s*írni)\\b",
        "flags": "i",
        "severity": 4,
        "reason": "A másik ember társadalmi vagy emberi értékének megtagadása.",
        "tags": [
          "leírás",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(te|ti|maga|magad|neked|nektek)\\b.{0,35}\\b(idióta|hülye|ostoba|barom|bunkó|primitív|korlátolt)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Személyre irányuló közvetlen sértő minősítés.",
        "tags": [
          "személyeskedés",
          "sértés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(te|ti|maga|magad)\\b.{0,35}\\b(hazug|képmutató|gyáva|aljas|hitvány|szánalmas)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Személy morális minősítésével támadó sértés.",
        "tags": [
          "morális sértés",
          "személyeskedés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(neked|veled|rólad)\\b.{0,35}\\b(felesleges\\s*vitatkozni|kár\\s*beszélni|nem\\s*lehet\\s*értelmesen\\s*beszélni|nincs\\s*értelme\\s*beszélni)\\b",
        "flags": "i",
        "severity": 2,
        "reason": "A vitapartner személyének sértő leértékelése.",
        "tags": [
          "személyeskedés",
          "vitahelyzet"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(te|maga|ti)\\b.{0,25}\\b(egy\\s*)?(vicc|bohóc|szégyen|katasztrófa|nulla)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Személyre irányuló sértő azonosítás.",
        "tags": [
          "sértő címkézés",
          "személyeskedés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(ennyire|ilyen)\\b.{0,20}\\b(hülye|ostoba|vak|korlátolt|tudatlan)\\b.{0,25}\\b(vagy|lehetsz|volnál)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Képességet vagy értelmet támadó személyes sértés.",
        "tags": [
          "értelmi sértés",
          "személyeskedés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(komolyan\\s*mondom|őszintén)\\b.{0,35}\\b(hülye\\s*vagy|idióta\\s*vagy|szánalmas\\s*vagy|nevetséges\\s*vagy)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Nyomatékosított személyes sértés.",
        "tags": [
          "nyomatékosított sértés",
          "személyeskedés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(a\\s*fejedben|az\\s*agyadban|nálad)\\b.{0,35}\\b(baj\\s*van|sötétség\\s*van|üresség\\s*van|zavar\\s*van)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "A személy értelmi állapotát sértő támadás.",
        "tags": [
          "értelmi minősítés",
          "személyeskedés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "\\b(te\\s*csak|te\\s*egy|maga\\s*egy)\\b.{0,30}\\b(troll|provokátor|hazudozó|képmutató|bajkeverő)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Személyt támadó, vitát lezáró címkézés.",
        "tags": [
          "címkézés",
          "személyeskedés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(csak\\s*ennyit\\s*tudsz|ennyi\\s*telik\\s*tőled|ennél\\s*többre\\s*nem\\s*vagy\\s*képes)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Képességet lekicsinylő, leértékelő minta.",
        "tags": [
          "képesség lekicsinylése",
          "burkolt sértés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(ez\\s*neked\\s*túl\\s*(magas|nehéz|bonyolult)|ehhez\\s*te\\s*(kevés|gyenge|kicsi)\\s*vagy)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "A másik értelmi vagy személyes képességét kicsinyíti.",
        "tags": [
          "lekezelés",
          "lekicsinylés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(senki\\s*nem\\s*kíváncsi\\s*rád|kit\\s*érdekel\\s*amit\\s*mondasz|a\\s*véleményed\\s*semmit\\s*nem\\s*ér)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "A megszólalás értékét tagadó lekicsinylés.",
        "tags": [
          "megszólalási érték tagadása",
          "lekicsinylés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(majd\\s*ha\\s*felnősz|majd\\s*ha\\s*értesz\\s*hozzá|előbb\\s*tanulj\\s*meg\\s*gondolkodni)\\b",
        "flags": "i",
        "severity": 2,
        "reason": "Leereszkedő, kompetenciát tagadó fordulat.",
        "tags": [
          "leereszkedés",
          "kompetencia tagadása"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(aranyos\\s*hogy\\s*próbálkozol|cuki\\s*hogy\\s*ezt\\s*gondolod|szép\\s*próbálkozás\\s*volt)\\b",
        "flags": "i",
        "severity": 2,
        "reason": "Gúnyos, burkoltan leértékelő minta.",
        "tags": [
          "gúny",
          "burkolt lekicsinylés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(nem\\s*vagy\\s*egy\\s*szinten|nem\\s*érsz\\s*fel\\s*hozzám|nem\\s*azonos\\s*liga|kis\\s*pályás\\s*vagy)\\b",
        "flags": "i",
        "severity": 3,
        "reason": "Hierarchikus leértékelés és felsőbbrendűségi keret.",
        "tags": [
          "hierarchikus leértékelés",
          "lekicsinylés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(ilyen\\s*szinten|ezen\\s*a\\s*szinten)\\b.{0,35}\\b(kár\\s*megszólalni|felesleges\\s*vitatkozni|nem\\s*érdemes\\s*beszélni)\\b",
        "flags": "i",
        "severity": 2,
        "reason": "A vitapartner szintjét leértékelő minta.",
        "tags": [
          "szintleértékelés",
          "vita lezárása"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "\\b(látszik\\s*hogy\\s*nem\\s*érted|fogalmad\\s*sincs|még\\s*az\\s*alapokat\\s*sem\\s*érted)\\b",
        "flags": "i",
        "severity": 2,
        "reason": "Tudást vagy megértést lenézően tagadó fordulat.",
        "tags": [
          "tudás lekicsinylése",
          "lekezelés"
        ]
      },
      {
        "categoryId": "dignity",
        "kind": "regex",
        "pattern": "nem\\s*is\\s*ember|emberi\\s*salak|féreg\\s*vagy|patkány\\s*vagy|hulladék\\s*vagy",
        "flags": "i",
        "severity": 5,
        "reason": "Személyre irányuló dehumanizálás.",
        "tags": [
          "dehumanizálás",
          "méltóságsértés"
        ]
      },
      {
        "categoryId": "personalInsult",
        "kind": "regex",
        "pattern": "(te|ti|ő|ők|maga).{0,30}(idióta|hülye|barom|bunkó|ostoba|hazug|gyáva)",
        "flags": "i",
        "severity": 3,
        "reason": "Személyre irányuló sértő minősítés.",
        "tags": [
          "személyes sértés"
        ]
      },
      {
        "categoryId": "belittling",
        "kind": "regex",
        "pattern": "csak\\s*ennyit\\s*tudsz|ennyi\\s*telik\\s*t[őo]led|ehhez\\s*(te\\s*)?(kevés|gyenge)\\s*vagy|senki\\s*nem\\s*kíváncsi\\s*rád",
        "flags": "i",
        "severity": 3,
        "reason": "Lekicsinylés vagy megszólalási érték tagadása.",
        "tags": [
          "lekicsinylés",
          "burkolt sértés"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "megöllek,\\s*te\\s*hülye",
        "flags": "i",
        "severity": 5,
        "reason": "Élet vagy testi épség elleni fenyegetésre utal.",
        "tags": [
          "életellenes",
          "testi fenyegetés"
        ]
      },
      {
        "categoryId": "lifeThreat",
        "kind": "regex",
        "pattern": "megöllek,\\s*te\\s*hülye",
        "flags": "i",
        "severity": 5,
        "reason": "Élet vagy testi épség elleni fenyegetésre utal.",
        "tags": [
          "életellenes",
          "testi fenyegetés"
        ]
      }
    ],
    "semanticRules": [
      {
        "name": "Erőszakos ige + testrész",
        "categoryId": "lifeThreat",
        "priority": 604,
        "severity": 5,
        "reason": "Erőszakos cselekvés és célzott testrész együtt testi fenyegetés.",
        "allGroups": [
          "violentVerb",
          "bodyTarget"
        ],
        "anyGroups": [],
        "groups": {
          "violentVerb": [
            "meg[oö]l",
            "kiny[ií]r",
            "agyonver",
            "sz[eé]t\\s*ver",
            "bet[oö]r[oö]m",
            "beverem",
            "elv[aá]gom"
          ],
          "bodyTarget": [
            "fejed",
            "sz[aá]d",
            "pof[aá]d",
            "torkod",
            "nyakad",
            "fogad",
            "arcod"
          ]
        }
      },
      {
        "name": "Szexuális kényszerítés + testi célzás",
        "categoryId": "sexualAggression",
        "priority": 505,
        "severity": 5,
        "reason": "Szexuális cselekvés/kényszerítés és testi célzás együtt testi autonómia sértése.",
        "allGroups": [
          "sexualCoercion",
          "bodyOrAutonomy"
        ],
        "anyGroups": [],
        "groups": {
          "sexualCoercion": [
            "nem\\s*mondhatsz\\s*nemet",
            "elveszem\\s*amit\\s*akarok",
            "meger[őo]szakol",
            "megbasz",
            "megdug",
            "hatol"
          ],
          "bodyOrAutonomy": [
            "tested",
            "bel[eé]d",
            "sz[aá]d",
            "segged",
            "feneked",
            "auton[oó]mi[aá]d"
          ]
        }
      },
      {
        "name": "Csoport + kollektív bűnösség",
        "categoryId": "hateIncitement",
        "priority": 405,
        "severity": 4,
        "reason": "Társadalmi csoport és kollektív bűnösség/kriminalizálás együtt.",
        "allGroups": [
          "groupPointer",
          "collectiveCrime"
        ],
        "anyGroups": [],
        "groups": {
          "groupPointer": [
            "ezek",
            "ők",
            "azok",
            "migr[aá]nsok",
            "rom[aá]k",
            "cig[aá]nyok",
            "zsid[oó]k",
            "liber[aá]lisok",
            "jobboldaliak",
            "baloldaliak"
          ],
          "collectiveCrime": [
            "mind",
            "mindannyian",
            "bűn[oö]zők",
            "tolvajok",
            "lopnak",
            "hazudnak",
            "élősködnek",
            "nem\\s*val[oó]k\\s*ide"
          ]
        }
      },
      {
        "name": "Feltételes testi megtorlás",
        "categoryId": "lifeThreat",
        "priority": 606,
        "severity": 5,
        "reason": "Feltételes fordulat és konkrét testi bántalmazás együtt fenyegetésként hathat.",
        "allGroups": [
          "conditionTrigger",
          "violentRetaliation"
        ],
        "anyGroups": [],
        "groups": {
          "conditionTrigger": [
            "ha\\s*még\\s*egyszer",
            "még\\s*egy\\s*ilyen",
            "próbáld\\s*meg\\s*még\\s*egyszer"
          ],
          "violentRetaliation": [
            "megver",
            "agyonver",
            "eltör",
            "bever",
            "elintéz",
            "bajod\\s*lesz"
          ]
        }
      },
      {
        "name": "Szexuális nyomás + következmény",
        "categoryId": "sexualAggression",
        "priority": 506,
        "severity": 5,
        "reason": "Szexuális követelés és fenyegető következmény együtt szexuális zsarolásként hathat.",
        "allGroups": [
          "sexualDemand",
          "threatConsequence"
        ],
        "anyGroups": [],
        "groups": {
          "sexualDemand": [
            "szex",
            "lefeksz",
            "velem\\s*lenni",
            "megtenni",
            "adod\\s*magad"
          ],
          "threatConsequence": [
            "megbánod",
            "bajod\\s*lesz",
            "kellemetlen\\s*lesz",
            "rád\\s*hozom\\s*a\\s*szégyent"
          ]
        }
      },
      {
        "name": "Dehumanizáló név + személyjelölő",
        "categoryId": "dignity",
        "priority": 305,
        "severity": 5,
        "reason": "Személyjelölő és dehumanizáló szó együtt méltóságsértés.",
        "allGroups": [
          "personPointer",
          "dehumanName"
        ],
        "anyGroups": [],
        "groups": {
          "personPointer": [
            "te",
            "ti",
            "ő",
            "ők",
            "maga",
            "ez\\s*az\\s*ember"
          ],
          "dehumanName": [
            "féreg",
            "patkány",
            "söpredék",
            "hulladék",
            "parazita",
            "nem\\s*is\\s*ember"
          ]
        }
      },
      {
        "name": "Névmás + sértő minősítés",
        "categoryId": "personalInsult",
        "priority": 205,
        "severity": 3,
        "reason": "Közvetlen megszólítás és negatív minősítés együtt személyeskedés.",
        "allGroups": [
          "directPointer",
          "insultWord"
        ],
        "anyGroups": [],
        "groups": {
          "directPointer": [
            "te",
            "ti",
            "maga",
            "neked",
            "nektek"
          ],
          "insultWord": [
            "idióta",
            "hülye",
            "ostoba",
            "barom",
            "bunkó",
            "hazug",
            "gyáva",
            "szánalmas"
          ]
        }
      },
      {
        "name": "Kompetencia-tagadás + megszólítás",
        "categoryId": "belittling",
        "priority": 105,
        "severity": 3,
        "reason": "A megszólított képességének vagy megszólalási értékének lekicsinylése.",
        "allGroups": [
          "belittleFrame",
          "directPointer"
        ],
        "anyGroups": [],
        "groups": {
          "belittleFrame": [
            "csak\\s*ennyit\\s*tudsz",
            "ennyi\\s*telik",
            "túl\\s*magas",
            "fogalmad\\s*sincs",
            "senki\\s*nem\\s*kíváncsi"
          ],
          "directPointer": [
            "te",
            "neked",
            "tőled",
            "rád",
            "hozzád"
          ]
        }
      }
    ],
    "dictionaries": {
      "negativeWords": [
        "hülye",
        "hülyék",
        "idióta",
        "ostoba",
        "buta",
        "barom",
        "bunkó",
        "primitív",
        "korlátolt",
        "aljas",
        "hitvány",
        "gyáva",
        "hazug",
        "képmutató",
        "senki",
        "értéktelen",
        "nyomorult",
        "szerencsétlen",
        "béna",
        "senkiházi",
        "szemét",
        "mocskos",
        "szarházi",
        "agyhalott",
        "szánalmas",
        "nevetséges",
        "bohóc",
        "nulla",
        "selejt",
        "hitvány",
        "alantas",
        "felesleges",
        "troll",
        "provokátor",
        "hazudozó",
        "bajkeverő"
      ],
      "positiveWords": [
        "jó",
        "szép",
        "okos",
        "ügyes",
        "kedves",
        "aranyos",
        "nagyszerű",
        "remek",
        "tehetséges",
        "bátor",
        "becsületes",
        "őszinte"
      ],
      "debateOk": [
        "szerintem",
        "véleményem",
        "gondolom",
        "azt hiszem",
        "nem értek egyet",
        "vitatkoz",
        "bírálom",
        "kritizálom",
        "döntés",
        "politika",
        "stratégia",
        "lépés",
        "terv",
        "ötlet volt"
      ],
      "groupTargets": [
        "ezek",
        "ők",
        "azok",
        "az ilyenek",
        "az ilyen emberek",
        "ez a csoport",
        "ez a réteg",
        "ez a társaság",
        "ezek a fajták",
        "ez a fajta ember",
        "migránsok",
        "romák",
        "cigányok",
        "zsidók",
        "liberálisok",
        "jobboldaliak",
        "baloldaliak",
        "vallási csoport",
        "kisebbség"
      ],
      "collectiveCrime": [
        "mind bűnözők",
        "mind lopnak",
        "mind hazudnak",
        "mind felelősek",
        "mind veszélyesek",
        "egytől egyig bűnösök",
        "ezek mind ilyenek",
        "nem valók ide",
        "nem valók közénk",
        "nincs helyük itt",
        "ki kell őket űzni",
        "ki kell őket takarítani",
        "el kell távolítani őket"
      ],
      "enemyFrames": [
        "ellenség",
        "ellenségeink",
        "veszélyt jelentenek",
        "fenyegetést jelentenek",
        "ellenünk vannak",
        "tönkreteszik az országot",
        "rombolják az országot",
        "elárasztanak minket",
        "élősködnek rajtunk",
        "megfertőzik a társadalmat",
        "beszennyezik az országot",
        "mérgezik a közösséget",
        "nem lehet tovább tűrni",
        "elég volt belőlük"
      ]
    },
    "personalFrames": [
      {
        "pattern": "^(te|ti|ő|ők|maga)\\s+\\S.{0,50}$",
        "flags": "i",
        "note": ""
      },
      {
        "pattern": "(te|ti|ő|ők|maga|magad)\\s+.{1,50}\\s+(vagy|vagytok|voltál|voltatok|lettél|lettetek|leszel|lesztek)",
        "flags": "i",
        "note": ""
      }
    ]
  };
  const rs = window.EMBERI_HANG_RULESET;
  // Kompatibilitási üres tömbök / aliasok régi hatter.js-patchekhez.
  rs.LIFE_THREATS = rs.LIFE_THREATS || [];
  rs.SEXUAL_AGGRESSION = rs.SEXUAL_AGGRESSION || [];
  rs.HATE_INCITEMENT = rs.HATE_INCITEMENT || [];
  rs.DIGNITY = rs.DIGNITY || [];
  rs.PERSONAL_INSULTS = rs.PERSONAL_INSULTS || [];
  rs.BELITTLING = rs.BELITTLING || [];
  window.LIFE_THREATS = rs.LIFE_THREATS;
  window.SEXUAL_AGGRESSION = rs.SEXUAL_AGGRESSION;
  window.HATE_INCITEMENT = rs.HATE_INCITEMENT;
  window.DIGNITY = rs.DIGNITY;
  window.PERSONAL_INSULTS = rs.PERSONAL_INSULTS;
  window.BELITTLING = rs.BELITTLING;
  window.THREATS = window.LIFE_THREATS;
  window.HATE_HERD = window.HATE_INCITEMENT;
  window.INSULTS = window.PERSONAL_INSULTS;
})();