EMBERI HANG v0.3.2 – Web Store safe tesztbuild

- Szabályalapú működés, AI/API ág leválasztva.
- Csökkentett jogosultság: csak storage.
- Nincs tabs/scripting/background injektálás.
- Content script deklaráltan fut a manifestben megadott oldalakon.
- Popupban nincs API-kulcs mező.
- Középső empatikus panel bevitelnél, opálosítás olvasási módban.

Megjegyzés: ez nem helyettesít hivatalos biztonsági auditot vagy Chrome Web Store review-t.


## Szabálylabor kapcsolat

A bővítmény `ruleset.js` fájlból is képes szabályokat betölteni. Részletek: `README_RULESET.md`.


## v0.4.2 kétfokozatú érzékenység

- Enyhe: opálosan takarja az életellenes/testi fenyegetést, a szexuális agressziót és a hergelést/gyűlöletkeltést. A méltóságsértés, személyes sértés és lekicsinylés látható marad, de sárga háromszög figyelmeztető jelzést kap.
- Erős: minden ismert kategóriát opálosan takar.
- A régi közepes fokozat megszűnt.

## Aktiválás frissítés után

A popupban az **OLDAL FRISSÍTÉSE** gomb már nem csak újratölti az oldalt, hanem megpróbálja ellenőrizni is, hogy az Emberi Hang content script tényleg elindult-e. Ha nincs visszajelzés, a figyelmeztetés látható marad, és kézi újrafrissítést vagy böngésző-újraindítást kér.

## Jelszavas törlésvédelem

A Chrome biztonsági modellje nem engedi, hogy egy normál bővítmény jelszóval megakadályozza saját eltávolítását. Ilyen jellegű kényszerített telepítés csak felügyelt/enterprise környezetben, rendszergazdai házirenddel lehetséges. A bővítményen belül később készülhet külön „beállítászár”, de az nem védi ki a Chrome-ból történő eltávolítást.
