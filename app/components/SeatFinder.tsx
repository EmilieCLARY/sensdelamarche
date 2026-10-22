"use client";

import { useMemo, useState } from "react";
import { StationCombobox } from "./StationCombobox";
import { findTrip, getParisStation, isParis, PARIS_ABBR, TOP_CITIES } from "@/lib/tgv";
import { estimate, parseSeat, type Confidence } from "@/lib/orientation";
import { REPO_URL } from "@/lib/site";

const CONF_LABEL: Record<Confidence, string> = {
  aucune: "Inconnu",
  faible: "Confiance faible",
  moyenne: "Confiance moyenne",
  elevee: "Confiance élevée",
};

function observationUrl(p: { train: string; dep: string; arr: string; voiture: number | null; seat: string }) {
  const q = new URLSearchParams({
    template: "observation.yml",
    title: `Observation ${p.train || "train ?"} ${p.dep} → ${p.arr}`,
    train: p.train,
    trajet: `${p.dep} → ${p.arr}`,
    voiture: p.voiture ? String(p.voiture) : "",
    place: p.seat,
  });
  return `${REPO_URL}/issues/new?${q.toString()}`;
}

type Props = {
  defaultTrain?: "ouigo" | "inoui";
  defaultDep?: string;
  defaultArr?: string;
};

const L: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "#aaa",
  textTransform: "uppercase",
  letterSpacing: 1,
  display: "block",
  marginBottom: 8,
};

function Pills({
  value,
  otherValue,
  onSelect,
  accent,
  accentBg,
}: {
  value: string;
  otherValue: string;
  onSelect: (s: string) => void;
  accent: string;
  accentBg: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        marginBottom: 8,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        paddingBottom: 2,
      }}
    >
      {TOP_CITIES.map((c) => {
        const active = c.l === "Paris" ? isParis(value) : c.s.includes(value);
        return (
          <button
            type="button"
            key={c.l}
            onClick={() => onSelect(c.l === "Paris" ? getParisStation(otherValue) : c.s[0])}
            style={{
              padding: "7px 14px",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', system-ui",
              borderRadius: 20,
              cursor: "pointer",
              border: active ? `1.5px solid ${accent}` : "1.5px solid #e0e0e0",
              background: active ? accentBg : "#fff",
              color: active ? accent : "#666",
              whiteSpace: "nowrap",
              flexShrink: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {c.l}
            {c.l === "Paris" && active && (
              <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.7 }}>
                {PARIS_ABBR[value] || ""}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Rame({
  rame,
  label,
  selected,
  onSelect,
  accent,
  accentBg,
}: {
  rame: number[];
  label: string | null;
  selected: number | null;
  onSelect: (v: number) => void;
  accent: string;
  accentBg: string;
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      {label && (
        <div style={{ fontSize: 10, color: "#bbb", fontWeight: 600, marginBottom: 3, textAlign: "center" }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", background: "#f7f7f7", borderRadius: 12, padding: "6px 4px" }}>
        <div
          style={{
            width: 18,
            height: 32,
            borderRadius: "7px 3px 3px 7px",
            background: accent,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#FFD700" }} />
        </div>
        <div style={{ display: "flex", gap: 2, flex: 1, padding: "0 2px", minWidth: 0 }}>
          {rame.map((v) => {
            const sel = selected === v;
            return (
              <button
                type="button"
                key={v}
                onClick={() => onSelect(v)}
                style={{
                  flex: 1,
                  height: 32,
                  minWidth: 0,
                  padding: 0,
                  borderRadius: 3,
                  border: sel ? `2px solid ${accent}` : "2px solid transparent",
                  background: sel ? accentBg : "#fff",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', system-ui",
                  fontSize: 11,
                  fontWeight: 700,
                  color: sel ? accent : "#999",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {v}
              </button>
            );
          })}
        </div>
        <div
          style={{
            width: 18,
            height: 32,
            borderRadius: "3px 7px 7px 3px",
            background: accent,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#FFD700" }} />
        </div>
      </div>
    </div>
  );
}

export default function SeatFinder({ defaultTrain = "ouigo", defaultDep = "", defaultArr = "" }: Props) {
  const [trainType, setTrainType] = useState<"ouigo" | "inoui">(defaultTrain);
  const [doubleUnit, setDoubleUnit] = useState(true);
  const [sel, setSel] = useState<number | null>(null);
  const [seatNum, setSeatNum] = useState("");
  const [dep, setDepRaw] = useState(defaultDep);
  const [arr, setArrRaw] = useState(defaultArr);
  const [train, setTrain] = useState("");

  const setDep = (v: string) => {
    setDepRaw(v);
    if (isParis(arr)) setArrRaw(getParisStation(v));
  };
  const setArr = (v: string) => {
    setArrRaw(v);
    if (isParis(dep)) setDepRaw(getParisStation(v));
  };

  const accent = trainType === "ouigo" ? "#E5007D" : "#6E1E78";
  const accentBg = trainType === "ouigo" ? "#FFF0F6" : "#F3EDF5";
  const rA = [1, 2, 3, 4, 5, 6, 7, 8];
  const rB = [11, 12, 13, 14, 15, 16, 17, 18];

  const trip = useMemo(() => (dep && arr ? findTrip(dep, arr) : null), [dep, arr]);

  const parsed = useMemo(() => parseSeat(parseInt(seatNum), sel), [seatNum, sel]);
  const eSeat = parsed?.seat ?? null;
  const upper = parsed?.upper ?? false;

  const est = useMemo(() => {
    if (!sel || !parsed || !trip) return null;
    const r = estimate({ service: trainType, dep, arr, voiture: sel, seatRaw: parseInt(seatNum), train });
    return r.status === "ok" ? r : null;
  }, [sel, parsed, trip, trainType, dep, arr, seatNum, train]);
  const result = est?.result ?? null;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        padding: "1.25rem 0.75rem 2rem",
        color: "#1a1a1a",
        WebkitTextSizeAdjust: "100%",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { id: "ouigo" as const, label: "OUIGO", c: "#E5007D", bg: "#FFF0F6" },
          { id: "inoui" as const, label: "INOUI", c: "#6E1E78", bg: "#F3EDF5" },
        ].map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => {
              setTrainType(t.id);
              setSel(null);
            }}
            style={{
              flex: 1,
              padding: "11px 0",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'DM Sans', system-ui",
              border: trainType === t.id ? `2px solid ${t.c}` : "2px solid #e5e5e5",
              borderRadius: 10,
              background: trainType === t.id ? t.bg : "#fff",
              color: trainType === t.id ? t.c : "#bbb",
              cursor: "pointer",
              letterSpacing: 1,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 4 }}>
        <label style={L}>Départ</label>
        <Pills value={dep} otherValue={arr} onSelect={setDep} accent={accent} accentBg={accentBg} />
        <StationCombobox value={dep} onChange={setDep} placeholder="Rechercher une gare..." accent={accent} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "2px 0" }}>
        <button
          type="button"
          onClick={() => {
            const t = dep;
            setDepRaw(arr);
            setArrRaw(t);
          }}
          disabled={!dep && !arr}
          aria-label="Inverser"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid #e5e5e5",
            background: "#fff",
            cursor: dep || arr ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#bbb",
            opacity: dep || arr ? 1 : 0.35,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ↕
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={L}>Arrivée</label>
        <Pills value={arr} otherValue={dep} onSelect={setArr} accent={accent} accentBg={accentBg} />
        <StationCombobox
          value={arr}
          onChange={setArr}
          placeholder="Rechercher une gare..."
          disabledStation={dep}
          accent={accent}
        />
      </div>

      {trip === null && dep && arr && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: "#FFF8E7",
            border: "1px solid #F0D68A",
            fontSize: 13,
            color: "#8B6914",
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          Trajet non reconnu dans les axes TGV couverts.
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <label style={{ ...L, marginBottom: 0 }}>Voiture</label>
          <button
            type="button"
            onClick={() => {
              setDoubleUnit(!doubleUnit);
              setSel(null);
            }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "'DM Sans', system-ui",
              border: "1.5px solid #ddd",
              background: "#fff",
              color: "#999",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {doubleUnit ? "UM (2 rames)" : "US (1 rame)"}
          </button>
        </div>
        <Rame rame={rA} label={doubleUnit ? "Rame 1" : null} selected={sel} onSelect={setSel} accent={accent} accentBg={accentBg} />
        {doubleUnit && (
          <Rame rame={rB} label="Rame 2" selected={sel} onSelect={setSel} accent={accent} accentBg={accentBg} />
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={L}>Numéro de place</label>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="899"
            value={seatNum}
            onChange={(e) => setSeatNum(e.target.value)}
            placeholder="Ex: 205 ou 05"
            style={{
              flex: 1,
              padding: "12px",
              fontSize: 18,
              fontFamily: "'DM Sans', system-ui",
              border: "2px solid #e5e5e5",
              borderRadius: 10,
              background: "#fff",
              color: "#1a1a1a",
              fontWeight: 600,
              boxSizing: "border-box",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
          {eSeat !== null && (
            <span
              style={{
                fontSize: 12,
                color: "#888",
                padding: "6px 10px",
                background: "#f3f3f3",
                borderRadius: 8,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {upper ? "Salle haute" : "Salle basse"}
            </span>
          )}
        </div>
        {parsed?.threeDigits && (
          <div style={{ fontSize: 11, color: "#bbb", marginTop: 5 }}>
            Place {String(parsed.seat).padStart(2, "0")} (numéro 3 chiffres détecté)
          </div>
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={L}>N° de train (facultatif)</label>
        <input
          type="text"
          inputMode="numeric"
          value={train}
          onChange={(e) => setTrain(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Ex: 7012 — améliore la prévision si le train a été observé"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: 16,
            fontFamily: "'DM Sans', system-ui",
            border: "2px solid #e5e5e5",
            borderRadius: 10,
            background: "#fff",
            color: "#1a1a1a",
            boxSizing: "border-box",
          }}
        />
      </div>

      {est && result && (
        <div
          style={{
            borderRadius: 14,
            padding: "20px 16px",
            background:
              result === "forward"
                ? "linear-gradient(135deg, #E8FAF0, #D0F0E0)"
                : result === "backward"
                  ? "linear-gradient(135deg, #FFF3E0, #FFE6CC)"
                  : "#f4f4f4",
            textAlign: "center",
            marginBottom: 20,
            border:
              result === "forward" ? "2px solid #A8E6C3" : result === "backward" ? "2px solid #FFD49E" : "2px solid #e0e0e0",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 4 }}>
            {result === "forward" ? "→" : result === "backward" ? "←" : "?"}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: result === "forward" ? "#1B7A42" : result === "backward" ? "#B8600A" : "#555",
              marginBottom: 4,
            }}
          >
            {result === "forward"
              ? "Probablement dans le sens de la marche"
              : result === "backward"
                ? "Probablement dos à la marche"
                : est.ifV1Ahead
                  ? "Ça dépend du sens de la rame"
                  : "Place non couverte par les plans connus"}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#777", marginBottom: 8 }}>
            {CONF_LABEL[est.confidence]} · Voit. {sel} · Place {seatNum} · {upper ? "Salle haute" : "Salle basse"}
          </div>
          {est.ifV1Ahead && (
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>
              Le jour J, regarde où est la voiture 1 (afficheur du quai ou composition SNCF Connect) :
              <br />
              voiture 1 côté <strong>{arr}</strong> →{" "}
              {est.ifV1Ahead === "forward" ? "sens de la marche" : "dos à la marche"} ; côté <strong>{dep}</strong> →{" "}
              {est.ifV1Ahead === "forward" ? "dos à la marche" : "sens de la marche"}.
            </div>
          )}
          <details style={{ marginTop: 10, textAlign: "left", fontSize: 12, color: "#666" }}>
            <summary style={{ cursor: "pointer" }}>Pourquoi ce résultat ?</summary>
            <ul style={{ margin: "6px 0 0", paddingLeft: 18, lineHeight: 1.5 }}>
              {est.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <div style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px 16px" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#999",
            margin: "0 0 4px",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Prévision, pas garantie
        </p>
        <p style={{ fontSize: 12, color: "#888", margin: 0, lineHeight: 1.6 }}>
          L&apos;orientation de chaque place vient de plans d&apos;aménagement lus place par place (TGV
          Duplex 2N, Euroduplex et Duplex 1re génération pour l&apos;instant). Le sens de la rame, lui, n&apos;est pas connu à la
          réservation : il le devient avec les observations d&apos;un même numéro de train. Tu as pris ce
          train ? Indique où était la voiture 1 et dans quel sens était ta place.
        </p>
        <a
          href={observationUrl({ train, dep, arr, voiture: sel, seat: seatNum })}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 8,
            fontSize: 11,
            color: "#E5007D",
            textDecoration: "underline",
            textDecorationColor: "rgba(229, 0, 125, 0.3)",
            textUnderlineOffset: 2,
          }}
        >
          Signaler une observation
        </a>
      </div>
    </div>
  );
}
