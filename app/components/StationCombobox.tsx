"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STATIONS } from "@/lib/tgv";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabledStation?: string;
  accent: string;
};

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f\-]/g, "").toLowerCase();

export function StationCombobox({ value, onChange, placeholder, disabledStation, accent }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h, { passive: true });
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("touchstart", h);
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return STATIONS;
    const q = norm(query);
    const r: Record<string, string[]> = {};
    for (const [g, st] of Object.entries(STATIONS)) {
      const m = st.filter((s) => norm(s).includes(q));
      if (m.length) r[g] = m;
    }
    return r;
  }, [query]);

  const total = Object.values(filtered).flat().length;

  const pick = (s: string) => {
    onChange(s);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={open ? query : value || ""}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          style={{
            width: "100%",
            padding: "12px 40px 12px 12px",
            fontSize: 16,
            fontFamily: "'DM Sans', system-ui",
            border: open ? `2px solid ${accent}` : "2px solid #e5e5e5",
            borderRadius: open ? "10px 10px 0 0" : 10,
            background: "#fff",
            color: "#1a1a1a",
            boxSizing: "border-box",
            outline: "none",
            WebkitAppearance: "none",
          }}
        />
        {value && !open && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setQuery("");
            }}
            aria-label="Effacer"
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "none",
              background: "#eee",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#999",
              fontFamily: "system-ui",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            x
          </button>
        )}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: `2px solid ${accent}`,
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            maxHeight: 260,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {total === 0 ? (
            <div style={{ padding: "16px", fontSize: 14, color: "#aaa" }}>Aucune gare trouvée</div>
          ) : (
            Object.entries(filtered).map(([g, sts]) => (
              <div key={g}>
                <div
                  style={{
                    padding: "10px 14px 4px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#bbb",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                  }}
                >
                  {g}
                </div>
                {sts.map((s) => {
                  const dis = s === disabledStation;
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => !dis && pick(s)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 14px",
                        fontSize: 15,
                        fontFamily: "'DM Sans', system-ui",
                        border: "none",
                        cursor: dis ? "default" : "pointer",
                        background: s === value ? accent + "15" : "transparent",
                        color: dis ? "#ccc" : s === value ? accent : "#333",
                        fontWeight: s === value ? 600 : 400,
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
