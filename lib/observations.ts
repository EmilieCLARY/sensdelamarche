/**
 * Observations terrain. Elles priment sur les hypothèses du modèle.
 *
 * Pour en ajouter : ouvrir une issue « Observation » sur le dépôt, puis recopier
 * les valeurs ici dans une pull request. N'ajouter que ce qui a été vu sur place.
 */

/** Côté de la voiture 1 constaté pour un train donné. */
export type TrainObservation = {
  /** Numéro de train tel qu'imprimé sur le billet, ex. "7012". */
  train: string;
  /** Date du trajet, AAAA-MM-JJ. */
  date: string;
  /** Identifiant d'axe (voir AXES dans lib/tgv.ts). */
  axis: string;
  /** Extrémité de l'axe où se trouvait la voiture 1. */
  v1End: "a" | "b";
  /** Unité multiple (2 rames) ce jour-là ? */
  um?: boolean;
};

/** Orientation d'une place constatée, par rapport à la voiture 1. */
export type SeatObservation = {
  service: "inoui" | "ouigo";
  voiture: number;
  /** Numéro de place sur 2 chiffres (le préfixe de voiture est retiré). */
  seat: number;
  /** true si la place regarde vers la voiture 1. */
  facesV1: boolean;
  train?: string;
  date: string;
};

export const TRAIN_OBSERVATIONS: TrainObservation[] = [];

export const SEAT_OBSERVATIONS: SeatObservation[] = [];
