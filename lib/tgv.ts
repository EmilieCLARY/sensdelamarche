export const STATIONS: Record<string, string[]> = {
  "Paris & IDF": [
    "Paris Montparnasse", "Paris Gare de Lyon", "Paris Nord",
    "Paris Est", "Paris Bercy", "Paris Austerlitz",
    "Marne-la-Vallée", "Massy TGV", "Roissy CDG TGV",
  ],
  "Nord": ["Lille Europe", "Lille Flandres", "TGV Haute-Picardie", "Arras", "Douai"],
  "Est": ["Strasbourg", "Colmar", "Mulhouse", "Metz", "Nancy", "Reims Bezannes", "Bar-le-Duc"],
  "Bourgogne-Franche-Comté": [
    "Dijon", "Besançon Franche-Comté TGV", "Belfort-Montbéliard TGV",
    "Le Creusot TGV", "Mâcon-Loché TGV", "Chalon-sur-Saône",
  ],
  "Atlantique": [
    "Bordeaux St-Jean", "Nantes", "Rennes", "Le Mans",
    "Angers St-Laud", "La Rochelle", "Poitiers", "Angoulême",
    "Brest", "Lorient", "Auray", "Vannes", "Quimper", "St-Brieuc",
    "Laval", "Tours St-Pierre", "St-Nazaire",
  ],
  "Sud-Ouest": [
    "Toulouse Matabiau", "Montauban", "Agen", "Dax",
    "Bayonne", "Biarritz", "Hendaye", "Pau", "Tarbes", "Lourdes",
    "Arcachon",
  ],
  "Sud-Est": [
    "Lyon Part-Dieu", "Lyon Perrache", "Lyon St-Exupéry",
    "Marseille St-Charles", "Aix-en-Provence TGV", "Avignon TGV",
    "Montpellier St-Roch", "Nîmes", "Valence TGV",
    "Grenoble", "Chambéry", "Annecy", "St-Étienne Châteaucreux",
  ],
  "Méditerranée": [
    "Nice", "Cannes", "Antibes", "Toulon", "St-Raphaël",
    "Narbonne", "Béziers", "Agde", "Sète", "Perpignan",
  ],
  "Alpes (saisonnier)": [
    "Bourg-St-Maurice", "Aime-la-Plagne", "Moûtiers", "Albertville",
  ],
};

const G = {
  paris_gdl: ["Paris Gare de Lyon", "Paris Bercy"],
  paris_montp: ["Paris Montparnasse", "Paris Austerlitz"],
  paris_nord: ["Paris Nord"],
  paris_est: ["Paris Est"],
  idf: ["Marne-la-Vallée", "Massy TGV", "Roissy CDG TGV"],
  nord: ["Lille Europe", "Lille Flandres", "TGV Haute-Picardie", "Arras", "Douai"],
  est: ["Strasbourg", "Colmar", "Mulhouse", "Metz", "Nancy", "Reims Bezannes", "Bar-le-Duc"],
  bourgogne: ["Dijon", "Besançon Franche-Comté TGV", "Belfort-Montbéliard TGV", "Le Creusot TGV", "Mâcon-Loché TGV", "Chalon-sur-Saône"],
  lyon: ["Lyon Part-Dieu", "Lyon Perrache", "Lyon St-Exupéry"],
  sud_est: ["Marseille St-Charles", "Aix-en-Provence TGV", "Avignon TGV", "Montpellier St-Roch", "Nîmes", "Valence TGV", "Grenoble", "Chambéry", "Annecy", "St-Étienne Châteaucreux"],
  med: ["Nice", "Cannes", "Antibes", "Toulon", "St-Raphaël", "Narbonne", "Béziers", "Agde", "Sète", "Perpignan"],
  alpes: ["Bourg-St-Maurice", "Aime-la-Plagne", "Moûtiers", "Albertville"],
  bretagne: ["Rennes", "Brest", "Lorient", "Auray", "Vannes", "Quimper", "St-Brieuc", "Laval", "St-Nazaire"],
  atlantic_w: ["Nantes", "Angers St-Laud", "Le Mans", "Tours St-Pierre", "La Rochelle", "Poitiers"],
  atlantic_sw: ["Bordeaux St-Jean", "Angoulême", "Arcachon"],
  sud_ouest: ["Toulouse Matabiau", "Montauban", "Agen", "Dax", "Bayonne", "Biarritz", "Hendaye", "Pau", "Tarbes", "Lourdes"],
};

export type Route = { a: string[]; b: string[] };

export type Axis = Route & { id: string; label: string };

export const AXES: Axis[] = [
  { id: "paris-sud-est", label: "Paris Gare de Lyon ↔ Sud-Est", a: [...G.paris_gdl, ...G.idf], b: [...G.lyon, ...G.bourgogne, ...G.sud_est, ...G.med, ...G.alpes] },
  { id: "paris-atlantique", label: "Paris Montparnasse ↔ Atlantique / Sud-Ouest", a: [...G.paris_montp, ...G.idf], b: [...G.bretagne, ...G.atlantic_w, ...G.atlantic_sw, ...G.sud_ouest] },
  { id: "paris-nord", label: "Paris Nord ↔ Nord", a: [...G.paris_nord, ...G.idf], b: [...G.nord] },
  { id: "paris-est", label: "Paris Est ↔ Est", a: [...G.paris_est, ...G.idf], b: [...G.est] },
  { id: "nord-sud-est", label: "Nord ↔ Sud-Est", a: [...G.nord], b: [...G.lyon, ...G.bourgogne, ...G.sud_est, ...G.med] },
  { id: "nord-atlantique", label: "Nord ↔ Atlantique / Sud-Ouest", a: [...G.nord], b: [...G.bretagne, ...G.atlantic_w, ...G.atlantic_sw, ...G.sud_ouest] },
  { id: "nord-est", label: "Nord ↔ Est", a: [...G.nord], b: [...G.est] },
  { id: "est-sud-est", label: "Est ↔ Sud-Est", a: [...G.est], b: [...G.lyon, ...G.bourgogne, ...G.sud_est, ...G.med] },
  { id: "sud-ouest-sud-est", label: "Bordeaux / Sud-Ouest ↔ Sud-Est", a: [...G.atlantic_sw, ...G.sud_ouest], b: [...G.lyon, ...G.sud_est, ...G.med] },
  { id: "ouest-sud-est", label: "Bretagne / Pays de la Loire ↔ Sud-Est", a: [...G.bretagne, ...G.atlantic_w], b: [...G.lyon, ...G.sud_est, ...G.med] },
  { id: "ouest-nord", label: "Bretagne / Pays de la Loire ↔ Nord", a: [...G.bretagne, ...G.atlantic_w], b: [...G.nord] },
  { id: "bordeaux-sud-ouest", label: "Bordeaux ↔ Sud-Ouest", a: [...G.atlantic_sw], b: [...G.sud_ouest] },
  { id: "lyon-sud-est", label: "Lyon ↔ Sud-Est / Alpes", a: [...G.lyon], b: [...G.sud_est, ...G.med, ...G.alpes] },
  { id: "lyon-sud-ouest", label: "Lyon ↔ Sud-Ouest", a: [...G.lyon], b: [...G.sud_ouest] },
  { id: "bourgogne-sud-est", label: "Bourgogne ↔ Sud-Est", a: [...G.bourgogne], b: [...G.lyon, ...G.sud_est, ...G.med] },
  { id: "ouest-sud-ouest", label: "Pays de la Loire ↔ Bordeaux / Sud-Ouest", a: [...G.atlantic_w], b: [...G.atlantic_sw, ...G.sud_ouest] },
  { id: "bretagne-sud-ouest", label: "Bretagne ↔ Bordeaux / Sud-Ouest", a: [...G.bretagne], b: [...G.atlantic_sw, ...G.sud_ouest] },
  { id: "sud-ouest-med", label: "Sud-Ouest ↔ Méditerranée", a: [...G.sud_ouest], b: [...G.sud_est, ...G.med] },
];

/** Conservé pour compatibilité (getParisStation). */
export const ROUTES: Route[] = AXES;

export type Trip = { axis: Axis; from: "a" | "b"; to: "a" | "b" };

/** Identifie l'axe d'un trajet et le sens de parcours, ou null si non couvert. */
export function findTrip(dep: string, arr: string): Trip | null {
  for (const axis of AXES) {
    if (axis.a.includes(dep) && axis.b.includes(arr)) return { axis, from: "a", to: "b" };
    if (axis.b.includes(dep) && axis.a.includes(arr)) return { axis, from: "b", to: "a" };
  }
  return null;
}

export const PARIS_STATIONS = [
  "Paris Montparnasse", "Paris Gare de Lyon", "Paris Nord",
  "Paris Est", "Paris Bercy", "Paris Austerlitz",
];

export const PARIS_ABBR: Record<string, string> = {
  "Paris Montparnasse": "Montp.",
  "Paris Gare de Lyon": "Lyon",
  "Paris Nord": "Nord",
  "Paris Est": "Est",
  "Paris Bercy": "Bercy",
  "Paris Austerlitz": "Auster.",
};

const PARIS_FOR: Record<string, string> = {};
for (const route of ROUTES) {
  const paris = route.a.find((s) => s.startsWith("Paris "));
  if (paris) {
    for (const d of route.b) {
      if (!PARIS_FOR[d]) PARIS_FOR[d] = paris;
    }
  }
}

export function getParisStation(city: string): string {
  return city ? PARIS_FOR[city] || "Paris Gare de Lyon" : "Paris Gare de Lyon";
}

export function isParis(s: string): boolean {
  return PARIS_STATIONS.includes(s);
}

export const TOP_CITIES: Array<{ l: string; s: string[] }> = [
  { l: "Paris", s: PARIS_STATIONS },
  { l: "Lyon", s: ["Lyon Part-Dieu"] },
  { l: "Marseille", s: ["Marseille St-Charles"] },
  { l: "Bordeaux", s: ["Bordeaux St-Jean"] },
  { l: "Lille", s: ["Lille Europe"] },
  { l: "Toulouse", s: ["Toulouse Matabiau"] },
  { l: "Nantes", s: ["Nantes"] },
  { l: "Strasb.", s: ["Strasbourg"] },
];
