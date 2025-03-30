# 🧠 Let's Code — Vytvoř si tlačítko!
> [!NOTE]
> Demo projektu je k dispozici na [této stránce](https://tlacitko.lets-code.cz).

Next.js open source projekt vytvořený pod 24 hodin za účelem otestování vibe-codingu různých modelů pomocí Visual Studio Code + Cline rozšíření.
Jedná se o menší stránku nabízející vytvoření tlačítka pro TailwindCSS v známém no-code prostředí, pomocí kterého se dají měnit barvy a velikosti tlačítka a jeho obsahu.

Tlačítko se dá následně velice jednoduše vyexportovat do schránky a vložit kamkoliv je potřeba. Styl tlačítka a kód se aktualizuje v reálném čase a ovládání je velice intuitivní.

## 🛠️ Jak spustit projekt?
### Vývojové prostředí:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Otevři [http://localhost:3000](http://localhost:3000) v prohlížeči a stránku si můžeš prohlédnout.

### Spuštění na svém serveru (produkce):
```bash
git clone ... nebo gh clone ...
npm install
npm run build
npm run start
```

## 💻 Použité modely při testování
Modely byly používané převážně pro logiku ovládání inputů, vybírání barev, uplatňování stylů na tlačítku a další podobné úkoly. UI/UX nebylo generované umělou inteligencí.
| Model | % naprogramovaného kódu projektu | Hodnocení |
| --- | --- | --- |
| OpenAI o3-mini [REASONING] | 30 % | 7/10 (dobrá rychlost, nízké kontextové okno, občasné halucinace a self-gaslighting) |
| Google Gemini 2.0 Flash | 10 % | 5/10 (vysoká rychlost, malá inteligence, problémy s během) |
| Google Gemini 2.5 Pro [REASONING] | 25 % | 9/10 (vysoká rychlost, vysoká inteligence, milion tokenů kontextové okno, většina kódu byla na první pokus funkční a správně) |
