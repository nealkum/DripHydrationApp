import { useState } from "react";
import { B, T, SANS, SERIF } from "../theme";
import { Btn } from "../components/Btn";
import type { NavProps } from "../MobileApp";

const referrals = [
  { name: "Jessica M.", date: "Mar 10", status: "Signed up", reward: "$25 earned" },
  { name: "Brian T.",   date: "Feb 3",  status: "Signed up", reward: "$25 earned" },
  { name: "Priya K.",   date: "Jan 18", status: "Signed up", reward: "$25 earned" },
];

export function ReferralScreen({ goBack }: NavProps) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: B.bg, zIndex: 150, display: "flex", flexDirection: "column", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui, padding: 0 }}>
          ← Back
        </button>
        <div style={{ ...T.product, fontSize: 16, color: B.textPrimary, flex: 1, textAlign: "center" }}>Refer a Friend</div>
        <div style={{ width: 48 }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Hero */}
        <div style={{ padding: "28px 24px 24px", textAlign: "center", background: `linear-gradient(180deg, ${B.bgCard} 0%, ${B.bg} 100%)` }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎁</div>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: B.textPrimary, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Give $25, Get $25
          </div>
          <div style={{ ...T.body, fontSize: 14, color: B.textSecondary, lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
            Share your link. When a friend books their first IV, you both get $25 in credit.
          </div>
        </div>

        {/* Credit balance */}
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ background: `linear-gradient(135deg, ${B.bgCard}, ${B.tealLight})`, border: `1px solid ${B.gold}30`, borderRadius: 16, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 4 }}>Your Credit Balance</div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: B.gold }}>$75</div>
              <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400, marginTop: 2 }}>From 3 successful referrals</div>
            </div>
            <span style={{ fontSize: 40 }}>💰</span>
          </div>
        </div>

        {/* Share link */}
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 10 }}>Your Referral Link</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, padding: "13px 14px", ...T.ui, fontSize: 13, color: B.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              drip.hy/neal-kumar
            </div>
            <Btn
              variant={copied ? "ghost" : "primary"}
              style={{ padding: "13px 20px", fontSize: 12, flexShrink: 0 }}
              onClick={copyLink}
            >
              {copied ? "COPIED!" : "COPY"}
            </Btn>
          </div>
        </div>

        {/* Share buttons */}
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Share via Text",  icon: "💬", bg: "#1d9bf0" },
              { label: "Share via Email", icon: "✉️", bg: B.tealAccent },
              { label: "Share via iMessage", icon: "📱", bg: "#34c759" },
              { label: "Share Link",      icon: "🔗", bg: B.bgCard },
            ].map((share) => (
              <button
                key={share.label}
                style={{ padding: "14px 10px", borderRadius: 12, background: share.bg, border: `1px solid ${share.bg === B.bgCard ? B.border : "transparent"}`, color: "#fff", cursor: "pointer", fontFamily: SANS, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
              >
                <span style={{ fontSize: 22 }}>{share.icon}</span>
                <span style={{ ...T.ui, fontSize: 11, fontWeight: 600 }}>{share.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ ...T.heading, fontSize: 18, color: B.textPrimary, marginBottom: 14 }}>How It Works</div>
          {[
            { n: "1", t: "Share your link", d: "Send it to a friend who could use IV therapy" },
            { n: "2", t: "They book & pay",  d: "Friend books their first treatment using your link" },
            { n: "3", t: "You both get $25", d: "Credit is applied to your next booking automatically" },
          ].map((step, i, arr) => (
            <div key={step.n} style={{ display: "flex", gap: 14, paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${B.tealAccent}, ${B.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ ...T.ui, fontSize: 12, fontWeight: 700, color: "#fff" }}>{step.n}</span>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: `${B.cyan}25`, marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 4, paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                <div style={{ ...T.ui, fontSize: 13, fontWeight: 700, color: B.textPrimary }}>{step.t}</div>
                <div style={{ ...T.body, fontSize: 12, color: B.textMuted, marginTop: 2 }}>{step.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Referral history */}
        <div style={{ padding: "0 20px 32px" }}>
          <div style={{ ...T.heading, fontSize: 18, color: B.textPrimary, marginBottom: 14 }}>Referral History</div>
          <div style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 14, overflow: "hidden" }}>
            {referrals.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: i < referrals.length - 1 ? `1px solid ${B.borderLight}` : "none" }}>
                <div>
                  <div style={{ ...T.ui, fontSize: 13, fontWeight: 600, color: B.textPrimary }}>{r.name}</div>
                  <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400 }}>{r.status} · {r.date}</div>
                </div>
                <span style={{ ...T.ui, fontSize: 12, fontWeight: 700, color: B.gold }}>{r.reward}</span>
              </div>
            ))}
          </div>
          <div style={{ ...T.body, fontSize: 12, color: B.textMuted, textAlign: "center", marginTop: 12 }}>
            No limit — keep referring and earning
          </div>
        </div>
      </div>
    </div>
  );
}
