import { B, T, SANS } from "../theme";

type TabId = "home" | "tx" | "bk" | "ord" | "acc";

interface TabBarProps {
  active: TabId;
  onSelect: (id: TabId) => void;
}

const tabs = [
  { id: "home" as TabId, label: "Home",       icon: "⌂" },
  { id: "tx"   as TabId, label: "Treatments", icon: "⊕" },
  { id: "bk"   as TabId, label: "Book",       icon: "+", center: true },
  { id: "ord"  as TabId, label: "Orders",     icon: "≡" },
  { id: "acc"  as TabId, label: "Account",    icon: "◯" },
];

export function TabBar({ active, onSelect }: TabBarProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(15,43,43,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${B.border}`,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        padding: "6px 0 20px",
        zIndex: 100,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          style={{
            border: "none",
            background: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            padding: "4px 12px",
            fontFamily: SANS,
          }}
        >
          {t.center ? (
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${B.tealAccent}, ${B.cyan})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 28,
                fontWeight: 300,
                marginTop: -20,
                boxShadow: `0 4px 20px rgba(91,191,191,0.4)`,
                border: "3px solid rgba(255,255,255,0.1)",
                lineHeight: 1,
              }}
            >
              +
            </div>
          ) : (
            <span
              style={{
                fontSize: 20,
                lineHeight: 1,
                opacity: active === t.id ? 1 : 0.5,
                color: active === t.id ? B.cyan : B.textMuted,
              }}
            >
              {t.icon}
            </span>
          )}
          <span
            style={{
              ...T.ui,
              fontSize: 10,
              fontWeight: active === t.id ? 600 : 400,
              color: active === t.id ? B.cyan : B.textMuted,
            }}
          >
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
