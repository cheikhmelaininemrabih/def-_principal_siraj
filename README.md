# Village Numérique Résistant – L'Aventure NIRD

Application web narrative, interactive et libre qui illustre comment un établissement scolaire peut résister aux Big Tech grâce à la démarche **NIRD** (Numérique Inclusif, Responsable, Durable). Construite pour le Défi Principal de la Nuit de l'Info 2025.

## Fonctionnalités clefs
- **Carte du Village Résistant animée** : parallax, cycle jour/nuit, PNJ pingouins/robots et 7 bâtiments cliquables (Studio Résistant inclus).
- **NIRD Labs** : comic strip dynamique, city-builder, escape room, potion lab, film SVG, aventure narrative, impact visualizer, Linux Resurrection Machine.
- **Simulateurs avancés** : Big Tech Surveillance (cookies/pubs/trackers), Eco Simulator, Impact Visualizer, Linux Resurrection Machine.
- **Progression locale & NIRD Score** : badges, modules complétés, idées communautaires et indicateurs (autonomie, vie privée, CO₂, inclusion, créativité) stockés dans `localStorage`.
- **Contribution Portal** : soumissions d'idées, recycleries, témoignages et ressources libres filtrables par catégorie.
- **Assistant IA “Petit Gaulois Numérique”** : chatbot OpenAI (clé personnelle) qui accompagne les missions.
- **Animations Framer Motion + SVG** : transitions cartoon, badges animés, mini film (60s) et dashboards fluides.

## Modules du village
| Bâtiment | Contenu | Badge principal |
| --- | --- | --- |
| Atelier Réemploi | Mini-jeu diagnostic pour prolonger la vie d'un PC | Réparateur du Village |
| Maison Linux | Simulation terminal + Linux Resurrection Machine | Admin Linux Niveau 12 & Réparateur d’Obélix-PC |
| Bibliothèque Libre | Quiz express sur les logiciels libres | Sage du Libre |
| Tour Big Tech | Tower-defense + Surveillance Simulator (cookies, popups, trackers) | Bouclier Numérique & Dompteur de BigTech |
| Salle des Éco-Délégués | Eco Simulator + Impact Visualizer animé | Éco-Guerrier & Éco-Héro |
| Forge de la Communauté | Contribution Portal (idées, recyclerie, ressources) | Forgeron Libre |
| Studio Résistant (Labs) | BD dynamique, city-builder, escape room, potion lab, film SVG, aventure narrative | Auteur BD, Architecte NIRD, Gaulois Libre, Maître Escape, Réalisateur NIRD... |

## NIRD Labs (sélection)
- **Dynamic Comic Strip Generator** : canvas + SVG libres, punchline personnalisée, export PNG, badges `Auteur BD Résistant` et `Explorateur du Studio`.
- **Build-Your-Own Resistant Village** : city-builder (grid 4x4) avec points Réemploi / Logiciels libres / Inclusion / Vie privée → NIRD Index.
- **Surveillance Simulator** : cookies espions, popups façon Tetris, pubs rebondissantes, trackers suivant la souris, badge `Dompteur de BigTech`.
- **Linux Resurrection Machine** : étapes interactives (spywares, nettoyage, installation libre) + log terminal, gains CO₂/budget.
- **Digital Escape Room** : 3 énigmes (alternative libre, commande Wi-Fi, outils privacy) avec timer 150 s.
- **Impact Visualizer** : graphique animé CO₂, déchets, budget, liberté logicielle, trackers bloqués.
- **Narrative Adventure** : Choose Your Own NIRD (directeur du lycée Carnot) avec stats Autonomie/Inclusion/Vie privée → badge `Gaulois Libre`.
- **Libre Software Potion Lab** : mixe potions (Liberté, Durabilité, Inclusion, Anti-BigTech) avec animations et stats.
- **Interactive Animated Short** : film SVG de 60 s retraçant la résistance NIRD.

## Architecture technique
- **Framework** : Next.js 16 (App Router) + TypeScript
- **Style** : Tailwind CSS 4 + design system maison
- **Animations** : Framer Motion
- **Icônes** : Tabler Icons (MIT)
- **Stockage** : `localStorage` uniquement (`nird_progress`, `nird_score`, `nird_ideas`)

Arborescence principale :
```
src/
 ├─ app/ (routes : /, /village, /village/*, /labs, /badges, /about-nird, /credits)
 ├─ components/ (VillageMap, mini-jeux, quiz, simulateurs, badges)
 ├─ data/ (bâtiments, quiz, projets forge)
 └─ lib/ (progression, localStorage utils, moteurs de mini-jeux)
```

## Lancer le projet
```bash
npm install
npm run dev
```
Ouvre ensuite http://localhost:3000 pour parcourir le village.

### Assistant IA (OpenAI)
1. Copie `.env.example` en `.env.local`.
2. Renseigne `OPENAI_API_KEY=sk-...` (clé personnelle).
3. Redémarre `npm run dev` puis ouvre le widget "Petit Gaulois" en bas à droite.

### Tests rapides
- `npm run lint` : vérifie les règles ESLint / Next.js.
- Chaque module fonctionne hors-ligne (localStorage) et ne nécessite aucun backend.

## Déploiement Vercel
1. `npm run build` pour vérifier la compilation.
2. `vercel` ou déploiement via l'UI Vercel (projet Next.js statique + RSC pris en charge).
3. Partager l'URL publique exigée par le cahier des charges.

## Licence & ressources
- Code et contenus sous **MIT License** (voir `LICENSE`).
- Assets libres recommandés : Tabler Icons, unDraw / OpenClipart (non inclus mais compatibles).

Bon voyage au cœur du Village Numérique Résistant !
