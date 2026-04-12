# sensdelamarche.fr

Outil web gratuit qui répond en quelques secondes à la question : **mon siège TGV est-il dans le sens de la marche ?**

Site en production : [sensdelamarche.fr](https://sensdelamarche.fr)

## À quoi ça sert

Sur un TGV Duplex (la grande majorité des rames INOUI et OUIGO), les sièges sont disposés par groupes de 4 en face-à-face. La moitié des voyageurs est donc dos à la marche, ce qui peut gâcher un long trajet pour les personnes sensibles au mal des transports.

L'outil calcule l'orientation d'une place à partir de quatre informations présentes sur le billet :

1. le trajet (gare de départ, gare d'arrivée)
2. le numéro de voiture
3. le numéro de place
4. l'étage (salle basse ou salle haute, déterminé automatiquement)

Le résultat s'affiche immédiatement, sans compte, sans publicité, sans tracking.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- React 19
- Export statique (`output: "export"`)
- Déployé sur [GitHub Pages](https://pages.github.com) via GitHub Actions

Aucune dépendance runtime côté serveur. Toute la logique de calcul tourne dans le navigateur.

## Développement local

```bash
git clone https://github.com/tonoid/sensdelamarche.git
cd sensdelamarche
npm install
npm run dev
```

Ouvre [localhost:3000](http://localhost:3000).

### Scripts

| Commande        | Effet                                   |
| --------------- | --------------------------------------- |
| `npm run dev`   | Serveur de développement avec hot-reload |
| `npm run build` | Build statique dans `/out`              |
| `npm run start` | Sert le build sur le port 3000          |
| `npm run lint`  | ESLint                                  |

## Structure du projet

```
app/
├── layout.tsx              Metadata global, JSON-LD Organization + WebSite
├── page.tsx                Accueil + outil + FAQ
├── tgv-inoui/page.tsx      Landing "sens de la marche TGV INOUI"
├── tgv-ouigo/page.tsx      Landing "sens de la marche OUIGO"
├── comment-savoir/page.tsx Guide complet + HowTo JSON-LD
├── voiture-1/page.tsx      Particularités de la voiture 1
├── faq/page.tsx            10 Q/R avec FAQPage JSON-LD
├── a-propos/page.tsx       Méthodologie, indépendance, open source
├── sitemap.ts              /sitemap.xml dynamique
├── robots.ts               /robots.txt (autorise GPTBot, ClaudeBot, etc.)
├── globals.css             Tailwind v4
└── components/
    ├── SeatFinder.tsx      Widget interactif (client)
    ├── StationCombobox.tsx Recherche de gare
    ├── SiteHeader.tsx
    ├── SiteFooter.tsx
    └── AnswerBox.tsx       Encart "Réponse courte" (optimisé LLM)

lib/
└── tgv.ts                  Logique pure : STATIONS, ROUTES, getDirection,
                            getSeatOrientation

public/
├── CNAME                   sensdelamarche.fr
├── .nojekyll               Empêche Jekyll sur GitHub Pages
├── llms.txt                Pointeurs LLM (format Answer.AI)
└── llms-full.txt           Contenu complet structuré pour LLM

.github/workflows/
└── deploy.yml              Build + deploy GitHub Pages sur push main
```

## Méthodologie

Le calcul applique trois règles publiques des schémas TGV Duplex :

1. **Alternance par groupes de 4.** Les sièges 01-04 sont orientés d'un côté, 05-08 de l'autre, et ainsi de suite tout au long de la voiture.
2. **Inversion pair/impair.** Les voitures paires et impaires ont leurs sièges en miroir.
3. **Inversion salle basse / salle haute.** Les places 1 à 39 sont en salle basse, 40 et plus en salle haute, avec alternance inversée entre les deux étages.

Le sens de circulation est déduit de la table des axes TGV français (`lib/tgv.ts`). Pour chaque trajet reconnu, l'outil identifie l'extrémité V1 (avant de la rame, côté province) puis combine cette information avec la règle d'alternance.

L'estimation est très fiable sur les rames Duplex standard. Certaines rames (Euroduplex, Atlantique, Réseau) peuvent présenter des variations mineures. En cas de doute, le plan de voiture affiché sur le quai ou sur SNCF Connect fait foi.

## SEO et GEO

Le site est optimisé pour l'indexation Google et la citation par les moteurs génératifs (ChatGPT Search, Perplexity, Gemini, Claude) :

- Export statique SSG, HTML complet côté serveur
- Metadata API par page (OG, Twitter cards, canonical)
- JSON-LD riche : `WebSite`, `Organization`, `SoftwareApplication`, `Article`, `FAQPage`, `HowTo`, `BreadcrumbList`, `AboutPage`
- `/llms.txt` (format Answer.AI) et `/llms-full.txt` pour les LLM
- `robots.txt` autorise explicitement GPTBot, ClaudeBot, PerplexityBot, Google-Extended et 16 autres bots IA
- Encarts "Réponse courte" sur chaque page, format optimal pour extraction par LLM

## Contribuer

Les contributions sont bienvenues.

- Bug ou suggestion : ouvre une [issue](https://github.com/tonoid/sensdelamarche/issues).
- Correction ou amélioration : ouvre une pull request. Pour les ajouts de trajets ou de gares, modifie `lib/tgv.ts` puis vérifie que `npm run build` passe.

## Indépendance

Projet indépendant, non affilié, parrainé ou endossé par la SNCF, SNCF Voyageurs, TGV INOUI ou OUIGO. Les noms et logos de ces marques restent la propriété de leurs détenteurs respectifs et sont mentionnés à titre descriptif.

## Éditeur

Site développé et maintenu par [tonoid.com](https://tonoid.com), artisan micro-startup basé à Bordeaux. Fait avec ♥ sur un MacBook Pro M4 Pro.

## Licence

Le code est publié sous licence MIT (voir [`LICENSE`](./LICENSE) si présent). Le contenu textuel peut être cité librement avec attribution à `sensdelamarche.fr`.
