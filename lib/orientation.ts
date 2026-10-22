import { findTrip, type Axis } from "./tgv.ts";
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
  /** Numéro sur 2 chiffres (1-99). */
  seat: number;
  upper: boolean;
  /** Le numéro saisi était sur 3 chiffres. */
  threeDigits: boolean;
  /** Avertissement si le préfixe ne correspond pas à la voiture. */
  warning?: string;
};

/**
 * Lit un numéro de place. Depuis décembre 2025, les TGV INOUI utilisent 3 chiffres :
 * le premier est le chiffre des unités de la voiture (place 58 en voiture 2 ou 12 → 258).
 * Places 1-39 en salle basse, 40 et plus en salle haute.
 */
export function parseSeat(raw: number, voiture: number | null): ParsedSeat | null {
  if (!Number.isInteger(raw) || raw < 1 || raw > 999) return null;
  const threeDigits = raw >= 100;
  const seat = threeDigits ? raw % 100 : raw;
  if (seat < 1) return null;
  let warning: string | undefined;
  if (threeDigits && voiture !== null && Math.floor(raw / 100) !== voiture % 10) {
    warning = `Le préfixe ${Math.floor(raw / 100)} ne correspond pas à la voiture ${voiture} : vérifie ton billet.`;
  }
  return { seat, upper: seat >= 40, threeDigits, warning };
}

type SeatFacing = { facesV1: boolean | null; confidence: Confidence; reason: string };

/** Orientation de la place par rapport à la voiture 1, indépendamment du sens de circulation. */
export function seatFacesV1(
  service: Service,
  voiture: number,
  seat: ParsedSeat,
  observations: SeatObservation[] = SEAT_OBSERVATIONS,
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
      reason: `Orientation de la place observée sur le terrain (${obs.length} fois). L'aménagement peut toutefois différer d'une rame à l'autre.`,
    };
  }

  const unit = voiture % 10;
  if (service === "inoui" && unit >= 1 && unit <= 3) {
    return {
      facesV1: null,
      confidence: "aucune",
      reason:
        "Voiture de 1re classe : rangées de 3 sièges (2+1) et, sur les rames Océane, sièges pivotés au terminus. Le modèle ne s'applique pas.",
    };
  }
  if (service === "inoui" && unit === 4) {
    return {
      facesV1: null,
      confidence: "aucune",
      reason: "Voiture bar : aménagement particulier, non modélisé.",
    };
  }

  // Modèle non vérifié : carrés de 4 places alternés à chaque rangée (2+2),
  // inversés en salle haute et entre voitures paires/impaires.
  const idx = seat.upper ? seat.seat - 40 : seat.seat - 1;
  let facesV1 = Math.floor(idx / 4) % 2 === 0;
  if (seat.upper) facesV1 = !facesV1;
  if (unit % 2 === 0) facesV1 = !facesV1;
  return {
    facesV1,
    confidence: "faible",
    reason:
      "Orientation de la place estimée par un modèle non vérifié (carrés alternés). Les Duplex récents ont surtout des sièges en rangées « avion » : le modèle peut être faux.",
  };
}

type V1Prediction = { v1End: "a" | "b" | null; confidence: Confidence; reason: string };

/** Côté où se trouvera la voiture 1, d'après les observations du train puis la convention de l'axe. */
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
  if (axis.v1End === null) {
    return { v1End: null, confidence: "aucune", reason: `${axis.label} : ${axis.note}` };
  }
  return {
    v1End: axis.v1End,
    confidence: "faible",
    reason: `${axis.label} : ${axis.note}${num ? ` Aucune observation pour le train ${num}.` : ""}`,
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
  data: { trains?: TrainObservation[]; seats?: SeatObservation[] } = {},
): Estimate {
  const trip = findTrip(input.dep, input.arr);
  if (!trip) return { status: "trajet-inconnu" };
  const seat = parseSeat(input.seatRaw, input.voiture);
  if (!seat) return { status: "place-invalide" };

  const reasons: string[] = [];
  if (seat.warning) reasons.push(seat.warning);

  const sf = seatFacesV1(input.service, input.voiture, seat, data.seats);
  reasons.push(sf.reason);
  const v1 = predictV1End(trip.axis, input.train, data.trains);
  reasons.push(v1.reason);
  if (input.voiture > 10) {
    reasons.push("Voitures 11 à 18 : on suppose la 2e rame orientée comme la 1re, ce qui n'est pas garanti.");
  }

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
