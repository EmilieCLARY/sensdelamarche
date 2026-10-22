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

/**
 * Niveau de preuve du côté de la voiture 1 sur un axe.
 * - "hypothese"  : repris de l'outil d'origine, aucune source.
 * - "temoignage" : rapporté par des cheminots / passionnés, non officiel.
 * - "observe"    : confirmé par des observations terrain (voir lib/observations.ts).
 */
export type EvidenceLevel = "hypothese" | "temoignage" | "observe";

export type Axis = Route & {
  id: string;
  label: string;
  /** Extrémité de l'axe où se trouve la voiture 1 selon la convention supposée, ou null si inconnue. */
  v1End: "a" | "b" | null;
  evidence: EvidenceLevel;
  note: string;
  source?: string;
};

const HYP = "Hypothèse reprise de l'outil d'origine (voiture 1 côté province), non sourcée.";

export const AXES: Axis[] = [
  {
    id: "paris-sud-est",
    label: "Paris Gare de Lyon ↔ Sud-Est",
    a: [...G.paris_gdl, ...G.idf],
    b: [...G.lyon, ...G.bourgogne, ...G.sud_est, ...G.med, ...G.alpes],
    v1End: "a",
    evidence: "temoignage",
    note:
      "Témoignage (2011) : la 1re classe serait placée côté Paris sur l'axe Sud-Est, ce qui met la voiture 1 côté Paris. Contredit l'hypothèse de l'outil d'origine. Rame inversée « fréquemment » selon le même témoin.",
    source: "https://www.cheminots.net/topic/26368-reservation-sens-de-la-marche/page/2/",
  },
  { id: "paris-atlantique", label: "Paris Montparnasse ↔ Atlantique / Sud-Ouest", a: [...G.paris_montp, ...G.idf], b: [...G.bretagne, ...G.atlantic_w, ...G.atlantic_sw, ...G.sud_ouest], v1End: "b", evidence: "hypothese", note: HYP },
  { id: "paris-nord", label: "Paris Nord ↔ Nord", a: [...G.paris_nord, ...G.idf], b: [...G.nord], v1End: "b", evidence: "hypothese", note: HYP },
  { id: "paris-est", label: "Paris Est ↔ Est", a: [...G.paris_est, ...G.idf], b: [...G.est], v1End: "b", evidence: "hypothese", note: HYP },
  { id: "nord-sud-est", label: "Nord ↔ Sud-Est", a: [...G.nord], b: [...G.lyon, ...G.bourgogne, ...G.sud_est, ...G.med], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "nord-atlantique", label: "Nord ↔ Atlantique / Sud-Ouest", a: [...G.nord], b: [...G.bretagne, ...G.atlantic_w, ...G.atlantic_sw, ...G.sud_ouest], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "nord-est", label: "Nord ↔ Est", a: [...G.nord], b: [...G.est], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "est-sud-est", label: "Est ↔ Sud-Est", a: [...G.est], b: [...G.lyon, ...G.bourgogne, ...G.sud_est, ...G.med], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "sud-ouest-sud-est", label: "Bordeaux / Sud-Ouest ↔ Sud-Est", a: [...G.atlantic_sw, ...G.sud_ouest], b: [...G.lyon, ...G.sud_est, ...G.med], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "ouest-sud-est", label: "Bretagne / Pays de la Loire ↔ Sud-Est", a: [...G.bretagne, ...G.atlantic_w], b: [...G.lyon, ...G.sud_est, ...G.med], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "ouest-nord", label: "Bretagne / Pays de la Loire ↔ Nord", a: [...G.bretagne, ...G.atlantic_w], b: [...G.nord], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "bordeaux-sud-ouest", label: "Bordeaux ↔ Sud-Ouest", a: [...G.atlantic_sw], b: [...G.sud_ouest], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "lyon-sud-est", label: "Lyon ↔ Sud-Est / Alpes", a: [...G.lyon], b: [...G.sud_est, ...G.med, ...G.alpes], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "lyon-sud-ouest", label: "Lyon ↔ Sud-Ouest", a: [...G.lyon], b: [...G.sud_ouest], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "bourgogne-sud-est", label: "Bourgogne ↔ Sud-Est", a: [...G.bourgogne], b: [...G.lyon, ...G.sud_est, ...G.med], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "ouest-sud-ouest", label: "Pays de la Loire ↔ Bordeaux / Sud-Ouest", a: [...G.atlantic_w], b: [...G.atlantic_sw, ...G.sud_ouest], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "bretagne-sud-ouest", label: "Bretagne ↔ Bordeaux / Sud-Ouest", a: [...G.bretagne], b: [...G.atlantic_sw, ...G.sud_ouest], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
  { id: "sud-ouest-med", label: "Sud-Ouest ↔ Méditerranée", a: [...G.sud_ouest], b: [...G.sud_est, ...G.med], v1End: null, evidence: "hypothese", note: "Axe province-province : aucune convention connue." },
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
