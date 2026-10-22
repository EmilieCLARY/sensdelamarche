# Sens de la marche TGV (fork)

Outil web gratuit qui indique l'orientation d'une place TGV par rapport à la voiture 1, puis la règle à appliquer le jour du départ : **mon siège est-il dans le sens de la marche ?**

Fork de [tonoid/sensdelamarche](https://github.com/tonoid/sensdelamarche) qui remplace le modèle d'origine (carrés alternés + sens déduit du trajet) par des plans relevés place par place et des observations de terrain.

Site : `https://<compte>.github.io/<dépôt>/` (renseigné par le workflow Pages).

## À quoi ça sert

Sur un TGV Duplex, une partie des voyageurs est forcément dos à la marche, ce qui peut gâcher un long trajet pour les personnes sensibles au mal des transports.

L'outil répond en deux temps, à partir du trajet, du numéro de voiture et du numéro de place :

1. l'orientation de la place **par rapport à la voiture 1**, lue sur le plan du type de rame;
2. la règle à appliquer le jour J, car le côté où se trouve la voiture 1 n'est pas connu à la réservation (il n'est prévu que si ce numéro de train a été observé).

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
git clone https://github.com/EmilieCLARY/sensdelamarche.git
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
| `npm test`      | Tests du modèle (`node --test`, 14 tests) |

Node ≥ 22.6 est requis : `npm test` utilise l'effacement de types (`--experimental-strip-types`), indisponible sur Node 20.

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
├── tgv.ts                  Axes et gares (STATIONS, AXES, findTrip) : sert à
│                           valider un trajet, sans convention de sens
├── layouts.ts              Plans relevés place par place (toward / away par voiture)
├── observations.ts         Observations terrain (train → côté de la voiture 1,
│                           place → orientation) : vide au démarrage
├── orientation.ts          parseSeat, seatFacesV1, predictV1End, estimate
├── site.ts                 SITE_URL / BASE_PATH / REPO_URL (une seule source)
└── orientation.test.ts     Tests du modèle

public/
├── .nojekyll               Empêche Jekyll sur GitHub Pages
├── llms.txt                Pointeurs LLM (format Answer.AI)
└── llms-full.txt           Contenu complet structuré pour LLM

.github/workflows/
└── deploy.yml              Build + deploy GitHub Pages sur push main
```

## Méthodologie

Deux données indépendantes, jamais une formule :

1. **Orientation de la place par rapport à la voiture 1** (`lib/layouts.ts`). Chaque voiture porte deux listes : les places qui regardent vers la voiture 1 (`toward`) et celles qui lui tournent le dos (`away`), relevées sur de vrais plans — Seat61 2026 pour les Duplex 2N/Euroduplex, un plan "Duplex 1re génération" pour les rames plus anciennes, les captures de l'option "Choix de la place" pour les OUIGO densifiés. Aucune règle d'alternance n'est appliquée : les plans réels ne suivent ni les groupes de 4, ni les paires/impaires, ni les étages.

2. **Côté de la voiture 1** (`lib/observations.ts`). Une rame Duplex peut circuler dans les deux sens; la SNCF ne garantit pas l'ordre des voitures à la réservation. L'hypothèse "voiture 1 côté province" de l'outil d'origine n'a pas de source. Le côté n'est donc prévu qu'à partir d'observations d'un même numéro de train, avec une confiance qui dépend du nombre de relevés; des observations contradictoires annulent la prévision.

`estimate()` renvoie `forward`, `backward` ou `unknown`, une confiance (minimum des deux sources) et `ifV1Ahead`, la réponse si la voiture 1 est côté gare d'arrivée. Tant qu'aucune observation n'existe, l'outil n'annonce pas de sens : il affiche la règle à appliquer sur le quai.

Hypothèses non vérifiées, assumées et affichées :

- les voitures 11 à 18 réutilisent le plan des voitures 1 à 8 (symétrie de la rame 2 non contrôlée sur le terrain);
- les rames Océane, Atlantique/Réseau et TGV M ne sont pas relevées;
- quatre places de la voiture 1 divergent entre les deux générations de Duplex (103, 110, 111, 112) et la place PMR 106 n'est relevée que sur un plan.

En cas de doute, le plan de voiture affiché sur le quai ou dans SNCF Connect fait foi.

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

- Bug ou suggestion : ouvre une [issue](https://github.com/EmilieCLARY/sensdelamarche/issues).
- Observation terrain (côté de la voiture 1, orientation d'une place) : utilise le modèle d'issue "Observation", puis recopie les valeurs dans `lib/observations.ts` dans une pull request.
- Correction de plan : modifie `lib/layouts.ts` en citant la source, puis `npm test` et `npm run build` doivent passer. Les tests vérifient notamment que les deux plans INOUI ne divergent que sur les places documentées.

## Indépendance

Projet indépendant, non affilié, parrainé ou endossé par la SNCF, SNCF Voyageurs, TGV INOUI ou OUIGO. Les noms et logos de ces marques restent la propriété de leurs détenteurs respectifs et sont mentionnés à titre descriptif.

## Éditeur

Outil d'origine créé par [tonoid.com](https://tonoid.com). Fork et modèle de fiabilité maintenus par EmilieCLARY.

## Licence

Le code est publié sous licence MIT (voir [`LICENSE`](./LICENSE) si présent). Le contenu textuel peut être cité librement avec attribution à ce site.
