import { test } from "node:test";
import assert from "node:assert/strict";
import { estimate, parseSeat, seatFacesV1, predictV1End } from "./orientation.ts";
import { AXES, findTrip } from "./tgv.ts";
import { LAYOUTS } from "./layouts.ts";
import type { TrainObservation } from "./observations.ts";

const nord = AXES.find((a) => a.id === "paris-nord")!;
const faces = (voiture: number, raw: number) =>
  seatFacesV1("inoui", voiture, parseSeat(raw, voiture)!, []).facesV1;

test("numéro 3 chiffres : préfixe retiré, salle détectée", () => {
  assert.deepEqual(parseSeat(258, 2), { seat: 58, upper: true, threeDigits: true, warning: undefined });
  assert.equal(parseSeat(258, 12)?.warning, undefined);
  assert.match(parseSeat(358, 2)!.warning!, /ne correspond pas/);
  assert.equal(parseSeat(100, 1)?.seat, 0);
  assert.equal(parseSeat(0, 2), null);
});

test("plans Duplex : places lues sur les plans", () => {
  // Voiture 5 salle basse : 500 dos à la voiture 1, 504 vers la voiture 1 (face à face autour du porte-bagages).
  assert.equal(faces(5, 500), false);
  assert.equal(faces(5, 504), true);
  assert.equal(faces(5, 536), true);
  // Voiture 8 salle haute.
  assert.equal(faces(8, 840), false);
  assert.equal(faces(8, 852), true);
  // 1re classe, voiture 1 : place isolée 100.
  assert.equal(faces(1, 100), true);
  assert.equal(faces(1, 179), false);
  // Salle haute voiture 6 (numérotation Seat61) : 668 vers la voiture 1.
  assert.equal(faces(6, 668), true);
  assert.equal(faces(7, 760), false);
  // Rame 2 (voitures 11 à 18) : même plan.
  assert.equal(faces(15, 504), true);
});

test("plan : chaque place n'est classée qu'une fois et les effectifs collent au plan", () => {
  const expected: Record<string, Record<number, number>> = {
    "duplex-2n-euroduplex": { 1: 60, 2: 60, 3: 60, 5: 76, 6: 80, 7: 80, 8: 92 },
    "duplex-1g": { 1: 62, 2: 60, 3: 60, 5: 78, 8: 92 },
    "ouigo-duplex": { 1: 84, 2: 86, 3: 86, 5: 86, 6: 86, 7: 86, 8: 96 },
  };
  for (const l of LAYOUTS) {
    const counts = expected[l.id];
    for (const [car, c] of Object.entries(l.cars)) {
      const overlap = c.toward.filter((s) => c.away.includes(s));
      assert.deepEqual(overlap, [], `${l.id} voiture ${car}`);
      if (counts[+car]) assert.equal(c.toward.length + c.away.length, counts[+car], `voiture ${car}`);
    }
  }
});

test("place hors plan, voiture bar, OUIGO : inconnu", () => {
  // Voiture 1 salle basse : les deux plans divergent, 103 aussi.
  assert.equal(faces(1, 112), null);
  assert.equal(faces(1, 103), null);
  assert.equal(faces(4, 412), null);
});

test("plan OUIGO : lecture des captures et numérotation", () => {
  const o = (voiture: number, raw: number) =>
    seatFacesV1("ouigo", voiture, parseSeat(raw, voiture, "ouigo")!, []).facesV1;
  // Voiture 5 salle basse : 501-520 dos à la voiture 1, 521-540 vers la voiture 1 (carrés autour des tables).
  assert.equal(o(5, 504), false);
  assert.equal(o(5, 524), true);
  // Voiture 8 salle haute : 900 dos, 904 vers la voiture 1 ; le préfixe 9 est accepté en voiture 8.
  assert.equal(parseSeat(904, 8, "ouigo")?.seat, 104);
  assert.equal(o(8, 900), false);
  assert.equal(o(8, 904), true);
  assert.equal(o(18, 904), true);
  // Voiture 1 salle basse, places isolées.
  assert.equal(o(1, 107), false);
  assert.equal(o(1, 103), true);
  // Places latérales exclues.
  assert.equal(o(5, 545), null);
  // OUIGO : 140 est en salle basse, INOUI : en salle haute.
  assert.equal(parseSeat(140, 1, "ouigo")?.upper, false);
  assert.equal(parseSeat(140, 1, "inoui")?.upper, true);
});

test("observation de place prioritaire sur le plan", () => {
  const r = seatFacesV1("inoui", 5, parseSeat(504, 5)!, [
    { service: "inoui", voiture: 5, seat: 4, facesV1: false, date: "2026-10-22" },
  ]);
  assert.equal(r.facesV1, false);
});

test("sans observation du train : résultat inconnu mais réponse conditionnelle", () => {
  const r = estimate(
    { service: "inoui", voiture: 5, seatRaw: 504, dep: "Lille Europe", arr: "Paris Nord" },
    { trains: [], seats: [] },
  );
  assert.ok(r.status === "ok");
  assert.equal(r.result, "unknown");
  assert.equal(r.ifV1Ahead, "forward");
});

test("observations d'un train : majorité, confiance et sens", () => {
  const obs: TrainObservation[] = Array.from({ length: 5 }, (_, i) => ({
    train: "7012",
    date: `2026-10-0${i + 1}`,
    axis: "paris-nord",
    v1End: "a", // voiture 1 côté Paris
  }));
  const p = predictV1End(nord, "7012", obs);
  assert.equal(p.v1End, "a");
  assert.equal(p.confidence, "elevee");
  assert.equal(predictV1End(nord, "7020", obs).v1End, null);

  const base = { service: "inoui" as const, voiture: 5, seatRaw: 504, train: "7012" };
  const toParis = estimate({ ...base, dep: "Lille Europe", arr: "Paris Nord" }, { trains: obs, seats: [] });
  const toLille = estimate({ ...base, dep: "Paris Nord", arr: "Lille Europe" }, { trains: obs, seats: [] });
  assert.ok(toParis.status === "ok" && toLille.status === "ok");
  // Voiture 1 en tête vers Paris, la place 504 regarde la voiture 1 : sens de la marche.
  assert.equal(toParis.result, "forward");
  assert.equal(toLille.result, "backward");
  assert.equal(toParis.confidence, "moyenne"); // limitée par l'incertitude sur le type de rame
});

test("trajet non couvert", () => {
  assert.deepEqual(
    estimate({ service: "ouigo", voiture: 5, seatRaw: 12, dep: "Marseille St-Charles", arr: "Nice" }),
    { status: "trajet-inconnu" },
  );
  assert.equal(findTrip("Paris Nord", "Lille Europe")?.to, "b");
});
