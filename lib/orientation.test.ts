import { test } from "node:test";
import assert from "node:assert/strict";
import { estimate, parseSeat, seatFacesV1, predictV1End } from "./orientation.ts";
import { AXES, findTrip } from "./tgv.ts";
import type { TrainObservation } from "./observations.ts";

const nord = AXES.find((a) => a.id === "paris-nord")!;

test("numéro 3 chiffres : préfixe retiré, salle détectée", () => {
  assert.deepEqual(parseSeat(258, 2), { seat: 58, upper: true, threeDigits: true, warning: undefined });
  assert.equal(parseSeat(258, 12)?.warning, undefined);
  assert.match(parseSeat(358, 2)!.warning!, /ne correspond pas/);
  assert.equal(parseSeat(0, 2), null);
  assert.equal(parseSeat(300, 3), null);
});

test("les places 1 à 4 forment une même rangée (bug d'origine corrigé)", () => {
  const f = (n: number) => seatFacesV1("ouigo", 5, parseSeat(n, 5)!).facesV1;
  assert.equal(f(1), f(4));
  assert.notEqual(f(4), f(5));
  assert.equal(f(5), f(8));
  assert.equal(f(40), f(43));
  assert.notEqual(f(43), f(44));
});

test("1re classe et voiture bar INOUI : inconnu", () => {
  assert.equal(seatFacesV1("inoui", 1, parseSeat(12, 1)!).facesV1, null);
  assert.equal(seatFacesV1("inoui", 13, parseSeat(12, 13)!).facesV1, null);
  assert.equal(seatFacesV1("inoui", 4, parseSeat(12, 4)!).facesV1, null);
  assert.notEqual(seatFacesV1("ouigo", 1, parseSeat(12, 1)!).facesV1, null);
});

test("observation de place prioritaire sur le modèle", () => {
  const model = seatFacesV1("ouigo", 5, parseSeat(1, 5)!).facesV1;
  const r = seatFacesV1("ouigo", 5, parseSeat(1, 5)!, [
    { service: "ouigo", voiture: 5, seat: 1, facesV1: !model, date: "2026-10-22" },
  ]);
  assert.equal(r.facesV1, !model);
  assert.equal(r.confidence, "moyenne");
});

test("aller et retour donnent des résultats opposés pour la même place", () => {
  const base = { service: "ouigo" as const, voiture: 5, seatRaw: 12 };
  const go = estimate({ ...base, dep: "Lille Europe", arr: "Paris Nord" });
  const back = estimate({ ...base, dep: "Paris Nord", arr: "Lille Europe" });
  assert.ok(go.status === "ok" && back.status === "ok");
  assert.notEqual(go.result, "unknown");
  assert.notEqual(go.result, back.result);
  assert.equal(go.confidence, "faible");
});

test("axe province-province : résultat inconnu mais réponse conditionnelle fournie", () => {
  const r = estimate({ service: "ouigo", voiture: 5, seatRaw: 12, dep: "Lille Europe", arr: "Lyon Part-Dieu" });
  assert.ok(r.status === "ok");
  assert.equal(r.result, "unknown");
  assert.notEqual(r.ifV1Ahead, null);
});

test("trajet non couvert", () => {
  assert.deepEqual(estimate({ service: "ouigo", voiture: 5, seatRaw: 12, dep: "Marseille St-Charles", arr: "Nice" }), {
    status: "trajet-inconnu",
  });
});

test("observations d'un train : majorité et confiance", () => {
  const obs: TrainObservation[] = Array.from({ length: 5 }, (_, i) => ({
    train: "7012",
    date: `2026-10-0${i + 1}`,
    axis: "paris-nord",
    v1End: "a",
  }));
  const p = predictV1End(nord, "7012", obs);
  assert.equal(p.v1End, "a");
  assert.equal(p.confidence, "elevee");
  // Un autre train n'est pas concerné.
  assert.equal(predictV1End(nord, "7020", obs).v1End, nord.v1End);
});

test("une observation de train inverse le résultat issu de l'hypothèse", () => {
  const input = { service: "ouigo" as const, voiture: 5, seatRaw: 12, dep: "Lille Europe", arr: "Paris Nord", train: "7012" };
  const hyp = estimate(input, { trains: [] });
  const opposite = nord.v1End === "a" ? "b" : "a";
  const seen = estimate(input, {
    trains: [{ train: "7012", date: "2026-10-01", axis: "paris-nord", v1End: opposite }],
  });
  assert.ok(hyp.status === "ok" && seen.status === "ok");
  assert.notEqual(hyp.result, seen.result);
});

test("tous les axes ont une note et les stations résolvent", () => {
  for (const a of AXES) assert.ok(a.note.length > 0, a.id);
  assert.equal(findTrip("Paris Nord", "Lille Europe")?.to, "b");
});
