import { findTrip, type Axis } from "./tgv.ts";
import { LAYOUTS, type Layout } from "./layouts.ts";
import {
  SEAT_OBSERVATIONS,
  TRAIN_OBSERVATIONS,
  type SeatObservation,
  type TrainObservation,
} from "./observations.ts";

export type Service = "inoui" | "ouigo";
export type Facing = "forward" | "backward";
export type Confidence = "aucune" | "faible" | "moyenne" | "elevee";

const RANK: Record<Confidence, number> = { aucune: 0, faible: 1, moyenne: 2, elevee: 3 };
const minConf = (a: Confidence, b: Confidence): Confidence => (RANK[a] <= RANK[b] ? a : b);

export type ParsedSeat = {
  /** Place sans le préfixe de voiture (258 en voiture 2 → 58 ; 904 en voiture 8 → 104). */
  seat: number;
  upper: boolean;
  /** Le numéro saisi était sur 3 chiffres. */
  threeDigits: boolean;
  /** Avertissement si le préfixe ne correspond pas à la voiture. */
  warning?: string;
};

/**
 * Lit un numéro de place. TGV INOUI (depuis décembre 2025) et OUIGO utilisent 3 chiffres :
 * le premier est le chiffre des unités de la voiture (place 58 en voiture 2 ou 12 → 258).
 * Salle basse jusqu'à 39 sur INOUI, jusqu'à 40 sur OUIGO.
 */
export function parseSeat(raw: number, voiture: number | null, service: Service = "inoui"): ParsedSeat | null {
  if (!Number.isInteger(raw) || raw < 1 || raw > 999) return null;
  const threeDigits = raw >= 100;
  let seat = threeDigits ? raw % 100 : raw;
  let warning: string | undefined;
  if (threeDigits && voiture !== null) {
    const prefix = Math.floor(raw / 100);
    if (prefix === (voiture % 10) + 1 && raw % 100 < 10) seat = 100 + (raw % 100); // OUIGO voiture 8 : 900 à 904
    else if (prefix !== voiture % 10) warning = `Le préfixe ${Math.floor(raw / 100)} ne correspond pas à la voiture ${voiture} : vérifie ton billet.`;
  }
  const upper = service === "ouigo" ? seat > 40 : seat >= 40;
  return { seat, upper, threeDigits, warning };
}

type SeatFacing = { facesV1: boolean | null; confidence: Confidence; reason: string };

function fromLayout(layout: Layout, voiture: number, seat: number): boolean | null {
  const car = layout.cars[voiture > 10 ? voiture - 10 : voiture];
  if (!car) return null;
  if (car.toward.includes(seat)) return true;
  if (car.away.includes(seat)) return false;
  return null;
}

/** Orientation de la place par rapport à la voiture 1, indépendamment du sens de circulation. */
export function seatFacesV1(
  service: Service,
  voiture: number,
  seat: ParsedSeat,
  observations: SeatObservation[] = SEAT_OBSERVATIONS,
  layouts: Layout[] = LAYOUTS,
): SeatFacing {
  const obs = observations.filter(
    (o) => o.service === service && o.voiture % 10 === voiture % 10 && o.seat === seat.seat,
  );
  if (obs.length > 0) {
    const yes = obs.filter((o) => o.facesV1).length;
    if (yes !== 0 && yes !== obs.length) {
      return {
        facesV1: null,
        confidence: "aucune",
        reason: "Observations contradictoires pour cette place : l'aménagement varie selon les rames.",
      };
    }
    return {
      facesV1: yes > 0,
      confidence: "moyenne",
      reason: `Orientation de la place observée sur le terrain (${obs.length} fois).`,
    };
  }

  const known = layouts
    .filter((l) => l.services.includes(service))
    .map((l) => ({ l, v: fromLayout(l, voiture, seat.seat) }))
    .filter((x): x is { l: Layout; v: boolean } => x.v !== null);

  if (known.length === 0) {
    return {
      facesV1: null,
      confidence: "aucune",
      reason: "Cette place ne figure dans aucun plan d'aménagement vérifié.",
    };
  }
  const values = new Set(known.map((k) => k.v));
  if (values.size > 1) {
    return {
      facesV1: null,
      confidence: "aucune",
      reason: `L'orientation dépend du type de rame (${known.map((k) => k.l.label).join(", ")}).`,
    };
  }
  const labels = known.map((k) => k.l.label).join(", ");
  return {
    facesV1: known[0].v,
    confidence: "moyenne",
    reason: `${known.length > 1 ? "Les plans concordent" : "Selon le plan"} : ${labels}. Sur une rame d'un autre type (Océane, TGV M…), l'orientation peut différer.`,
  };
}

type V1Prediction = { v1End: "a" | "b" | null; confidence: Confidence; reason: string };

/**
 * Côté où se trouvera la voiture 1. Sur TGV Duplex, la rame peut circuler dans un sens
 * ou dans l'autre : seules les observations d'un même numéro de train permettent une prévision.
 */
export function predictV1End(
  axis: Axis,
  train: string | undefined,
  observations: TrainObservation[] = TRAIN_OBSERVATIONS,
): V1Prediction {
  const num = train?.trim();
  if (num) {
    const obs = observations.filter((o) => o.train === num && o.axis === axis.id);
    if (obs.length > 0) {
      const a = obs.filter((o) => o.v1End === "a").length;
      const end = a * 2 >= obs.length ? "a" : "b";
      const share = Math.max(a, obs.length - a) / obs.length;
      const pct = Math.round(share * 100);
      const confidence: Confidence =
        obs.length >= 5 && share >= 0.9 ? "elevee" : obs.length >= 3 && share >= 0.75 ? "moyenne" : "faible";
      return {
        v1End: end,
        confidence,
        reason: `Train ${num} : voiture 1 du même côté dans ${pct} % des ${obs.length} observations.`,
      };
    }
  }
  return {
    v1End: null,
    confidence: "aucune",
    reason: `Une rame TGV peut circuler dans un sens ou dans l'autre : sans observation${
      num ? ` du train ${num}` : " de ce train"
    }, on ne peut pas savoir à l'avance de quel côté sera la voiture 1.`,
  };
}

export type EstimateInput = {
  service: Service;
  dep: string;
  arr: string;
  voiture: number;
  seatRaw: number;
  train?: string;
};

export type Estimate =
  | { status: "trajet-inconnu" }
  | { status: "place-invalide" }
  | {
      status: "ok";
      seat: ParsedSeat;
      /** Réponse la plus probable, ou "unknown". */
      result: Facing | "unknown";
      confidence: Confidence;
      /** Réponse si la voiture 1 est en tête du train (côté gare d'arrivée). */
      ifV1Ahead: Facing | null;
      reasons: string[];
    };

export function estimate(
  input: EstimateInput,
  data: { trains?: TrainObservation[]; seats?: SeatObservation[]; layouts?: Layout[] } = {},
): Estimate {
  const trip = findTrip(input.dep, input.arr);
  if (!trip) return { status: "trajet-inconnu" };
  const seat = parseSeat(input.seatRaw, input.voiture, input.service);
  if (!seat) return { status: "place-invalide" };

  const reasons: string[] = [];
  if (seat.warning) reasons.push(seat.warning);

  const sf = seatFacesV1(input.service, input.voiture, seat, data.seats, data.layouts);
  reasons.push(sf.reason);
  const v1 = predictV1End(trip.axis, input.train, data.trains);
  reasons.push(v1.reason);

  const ifV1Ahead: Facing | null = sf.facesV1 === null ? null : sf.facesV1 ? "forward" : "backward";
  if (sf.facesV1 === null || v1.v1End === null) {
    return { status: "ok", seat, result: "unknown", confidence: "aucune", ifV1Ahead, reasons };
  }
  const v1Ahead = v1.v1End === trip.to;
  const result: Facing = sf.facesV1 === v1Ahead ? "forward" : "backward";
  return {
    status: "ok",
    seat,
    result,
    confidence: minConf(sf.confidence, v1.confidence),
    ifV1Ahead,
    reasons,
  };
}
