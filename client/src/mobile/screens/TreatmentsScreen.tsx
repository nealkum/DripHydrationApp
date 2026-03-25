import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { B, T, SANS } from "../theme";
import { Stars } from "../components/Stars";
import { Btn } from "../components/Btn";
import { bestForMap } from "@/lib/treatment-data";
import type { Treatment } from "@shared/schema";

const CATEGORIES = ["All", "IV Therapy", "Shipped", "Specialty"];

const shippedSlugs = new Set([
  "weight-loss-semaglutide","weight-loss-tirzepatide","ketamine-therapy",
  "nad-injections","nad-nasal-spray","niagen-nr-injections",
  "peptide-sermorelin","peptide-cjc-ipamorelin","peptide-ghk-cu",
  "testosterone-trt","testosterone-enclomiphene","vitamin-b12","vitamin-lipostat",
]);

const specialtySlugs = new Set(["iron-iv","ketamine-iv","exosome-iv"]);

function getTxCategory(t: Treatment & { categorySlug?: string }): string {
  if (t.categorySlug === "specialty-ivs") return "Specialty";
  if (shippedSlugs.has(t.slug)) return "Shipped";
  return "IV Therapy";
}

function isPopular(slug: string) {
  return ["myers-cocktail-plus","nad-iv-therapy","hangover-iv","recovery-performance"].includes(slug);
}

interface TreatmentsScreenProps {
  onBook: (slug: string) => void;
}

export function TreatmentsScreen({ onBook }: TreatmentsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const { data: treatments = [] } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments"],
  });

  const filtered = treatments.filter((t) => {
    const cat = getTxCategory(t as any);
    const matchCat = activeCategory === "All" || cat === activeCategory;
    const matchQ = !query
      || t.name.toLowerCase().includes(query.toLowerCase())
      || (t.description ?? "").toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const memberPrice = (price: number) => Math.round(price * 0.75 / 100);
  const basePrice = (price: number) => Math.round(price / 100);
  const isShipped = (t: Treatment) => shippedSlugs.has(t.slug);

  return (
    <div style={{ fontFamily: SANS }}>
      <div style={{ padding: "16px 20px 10px" }}>
        <div style={{ ...T.hero, fontSize: 28, color: B.textPrimary }}>Treatments</div>
      </div>

      {/* Search */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: B.bgCard, borderRadius: 12, padding: "12px 14px", border: `1px solid ${B.border}` }}>
          <span style={{ fontSize: 15, color: B.textMuted }}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treatments, symptoms..."
            style={{ border: "none", background: "none", outline: "none", flex: 1, ...T.body, fontSize: 14, color: B.textPrimary, fontFamily: SANS }}
          />
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 18px", overflowX: "auto" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            style={{
              ...T.btn,
              padding: "9px 20px",
              borderRadius: 24,
              border: activeCategory === c ? "none" : `1px solid ${B.border}`,
              background: activeCategory === c ? `linear-gradient(135deg, ${B.tealAccent}, ${B.cyan})` : "transparent",
              color: activeCategory === c ? "#fff" : B.textSecondary,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: SANS,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Treatment list */}
      <div style={{ padding: "0 20px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((t) => {
          const shipped = isShipped(t);
          const popular = isPopular(t.slug);
          const price = basePrice(t.price);
          const mp = shipped ? null : memberPrice(t.price);

          return (
            <div
              key={t.id}
              style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 14, padding: 16, display: "flex", gap: 14, position: "relative", cursor: "pointer" }}
            >
              {shipped && (
                <div style={{ position: "absolute", top: 10, right: 10, ...T.tag, fontSize: 8, color: B.gold, background: `${B.gold}15`, padding: "3px 8px", borderRadius: 6, border: `1px solid ${B.gold}25` }}>
                  📦 SHIPPED
                </div>
              )}
              {popular && !shipped && (
                <div style={{ position: "absolute", top: 10, right: 10, ...T.tag, fontSize: 8, color: B.cyan, background: `${B.cyan}15`, padding: "3px 8px", borderRadius: 6, border: `1px solid ${B.cyan}25` }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ flex: 1 }}>
                <span style={{ display: "inline-block", ...T.tag, fontSize: 9, color: B.cyan, background: `${B.cyan}10`, padding: "3px 10px", borderRadius: 6, marginBottom: 8, border: `1px solid ${B.cyan}18` }}>
                  {bestForMap[t.slug]?.label.replace("Best for: ", "BEST FOR: ") ?? `BEST FOR: ${t.name.toUpperCase()}`}
                </span>
                <div style={{ ...T.product, fontSize: 16, color: B.textPrimary, marginBottom: 6 }}>{t.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                  <Stars rating={5} size={10} />
                  <span style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400 }}>4.9 (2,150)</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ ...T.price, fontSize: 20, color: B.textPrimary }}>${price}</span>
                  {mp && <span style={{ ...T.ui, fontSize: 12, fontWeight: 600, color: B.cyan }}>${mp} member</span>}
                  {shipped && !mp && <span style={{ ...T.ui, fontSize: 12, color: B.textMuted, fontWeight: 400 }}>/month</span>}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flexShrink: 0 }}>
                <Btn style={{ padding: "11px 22px", fontSize: 12 }} onClick={() => onBook(t.slug)}>
                  BOOK NOW
                </Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
