import { useState } from "react";
import { B, T, SANS, SERIF } from "../theme";
import { Btn } from "../components/Btn";
import type { NavProps } from "../MobileApp";

const REFERRAL_URL = "https://drip.hy/neal-kumar";
const REFERRAL_MSG = `I've been using Drip Hydration for IV therapy and it's incredible. Use my link and we both get $25 off: ${REFERRAL_URL}`;
const REFERRAL_SUBJECT = "Try Drip Hydration – Get $25 Off Your First IV";

const referrals = [
  { name: "Jessica M.",  date: "Mar 10", status: "Booked",    reward: "$25 earned",  color: "#4ade80" },
  { name: "Brian T.",    date: "Feb 3",  status: "Booked",    reward: "$25 earned",  color: "#4ade80" },
  { name: "Priya K.",    date: "Jan 18", status: "Booked",    reward: "$25 earned",  color: "#4ade80" },
  { name: "Marcus L.",   date: "Mar 22", status: "Signed up", reward: "Pending",     color: "#f59e0b" },
];

export function ReferralScreen({ goBack }: NavProps) {
  const [copied, setCopied] = useState(false);
  const [activeShare, setActiveShare] = useState<string | null>(null);

  function copyLink() {
    navigator.clipboard?.writeText(REFERRAL_URL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function shareViaText() {
    setActiveShare("text");
    window.open(`sms:?body=${encodeURIComponent(REFERRAL_MSG)}`, "_self");
    setTimeout(() => setActiveShare(null), 1500);
  }

  function shareViaEmail() {
    setActiveShare("email");
    window.open(
      `mailto:?subject=${encodeURIComponent(REFERRAL_SUBJECT)}&body=${encodeURIComponent(REFERRAL_MSG)}`,
      "_self"
    );
    setTimeout(() => setActiveShare(null), 1500);
  }

  function shareViaiMessage() {
    setActiveShare("imessage");
    // iMessage uses the same sms: scheme on iOS
    window.open(`sms:?body=${encodeURIComponent(REFERRAL_MSG)}`, "_self");
    setTimeout(() => setActiveShare(null), 1500);
  }

  async function shareLink() {
    setActiveShare("link");
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: REFERRAL_SUBJECT,
          text: REFERRAL_MSG,
          url: REFERRAL_URL,
        });
      } catch {
        // user dismissed — that's fine
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(REFERRAL_URL).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    setTimeout(() => setActiveShare(null), 1500);
  }

  const totalEarned = referrals.filter((r) => r.status === "Booked").length * 25;
  const totalUsed = 50;
  const balance = totalEarned - totalUsed;

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
        <div style={{ padding: "28px 24px 24px", textAlign: "center", background: `linear-gradient(180deg, ${B.bgCard} 0%, ${B.bg} 100%)`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, background: `radial-gradient(circle, ${B.gold}12, transparent 70%)` }} />
          <div style={{ fontSize: 52, marginBottom: 16 }}>🎁</div>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 30, color: B.textPrimary, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Give $25, Get $25
          </div>
          <div style={{ ...T.body, fontSize: 14, color: B.textSecondary, lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
            Share your link. When a friend books their first IV, you both get $25 in credit.
          </div>
        </div>

        {/* Credit stats */}
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ background: `linear-gradient(135deg, ${B.bgCard}, ${B.tealLight})`, border: `1px solid ${B.gold}30`, borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 4 }}>Credit Balance</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: B.gold }}>${balance}</div>
                <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400, marginTop: 2 }}>Ready to use on next booking</div>
              </div>
              <span style={{ fontSize: 40 }}>💰</span>
            </div>
            <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${B.borderLight}`, paddingTop: 14 }}>
              {[
                { label: "Total earned",    value: `$${totalEarned}` },
                { label: "Friends referred", value: referrals.length.toString() },
                { label: "Pending",          value: `$${referrals.filter((r) => r.status !== "Booked").length * 25}` },
              ].map((stat, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? `1px solid ${B.borderLight}` : "none" }}>
                  <div style={{ ...T.price, fontSize: 18, color: B.textPrimary }}>{stat.value}</div>
                  <div style={{ ...T.ui, fontSize: 10, color: B.textMuted, fontWeight: 400, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Share link */}
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 10 }}>Your Referral Link</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div
              onClick={copyLink}
              style={{ flex: 1, background: B.bgCard, border: `1px solid ${copied ? B.cyan : B.border}`, borderRadius: 12, padding: "13px 14px", ...T.ui, fontSize: 13, color: copied ? B.cyan : B.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "pointer", transition: "all 0.2s" }}
            >
              {REFERRAL_URL}
            </div>
            <Btn
              variant={copied ? "ghost" : "primary"}
              style={{ padding: "13px 18px", fontSize: 12, flexShrink: 0, minWidth: 72 }}
              onClick={copyLink}
            >
              {copied ? "✓ COPIED" : "COPY"}
            </Btn>
          </div>
          {copied && (
            <div style={{ ...T.body, fontSize: 12, color: B.cyan, textAlign: "center", marginTop: 8 }}>
              Link copied to clipboard!
            </div>
          )}
        </div>

        {/* Share buttons */}
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 10 }}>SHARE VIA</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { key: "text",     label: "Text Message",  icon: "💬", bg: "#1d9bf0",  action: shareViaText     },
              { key: "email",    label: "Email",          icon: "✉️", bg: B.tealAccent, action: shareViaEmail  },
              { key: "imessage", label: "iMessage",       icon: "📱", bg: "#34c759",  action: shareViaiMessage },
              { key: "link",     label: "More Options",   icon: "⋯",  bg: B.bgCard,   action: shareLink        },
            ].map((share) => {
              const isActive = activeShare === share.key;
              return (
                <button
                  key={share.key}
                  onClick={share.action}
                  style={{
                    padding: "14px 10px",
                    borderRadius: 12,
                    background: isActive ? `${share.bg}cc` : share.bg,
                    border: `1px solid ${share.bg === B.bgCard ? B.border : "transparent"}`,
                    color: share.bg === B.bgCard ? B.textSecondary : "#fff",
                    cursor: "pointer",
                    fontFamily: SANS,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "opacity 0.15s, transform 0.1s",
                    transform: isActive ? "scale(0.97)" : "scale(1)",
                    opacity: isActive ? 0.8 : 1,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{isActive ? "↗" : share.icon}</span>
                  <span style={{ ...T.ui, fontSize: 11, fontWeight: 600 }}>{isActive ? "Opening..." : share.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ ...T.heading, fontSize: 18, color: B.textPrimary, marginBottom: 14 }}>How It Works</div>
          {[
            { n: "1", t: "Share your link",   d: "Send it to a friend who could use IV therapy — via text, email, or social" },
            { n: "2", t: "They sign up",       d: "Friend creates a Drip account using your referral link" },
            { n: "3", t: "They book & pay",    d: "Friend books their first treatment (any IV service)" },
            { n: "4", t: "You both get $25",   d: "$25 credit is added to both accounts automatically" },
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

        {/* Terms callout */}
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>ℹ️</span>
            <div style={{ ...T.body, fontSize: 11, color: B.textMuted, lineHeight: 1.6 }}>
              Credits expire 12 months from issue date. Friend must be a first-time Drip customer. Does not apply to shipped products. No limit on referrals.
            </div>
          </div>
        </div>

        {/* Referral history */}
        <div style={{ padding: "0 20px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <div style={{ ...T.heading, fontSize: 18, color: B.textPrimary }}>Referral History</div>
            <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400 }}>{referrals.length} friends</div>
          </div>
          <div style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 14, overflow: "hidden" }}>
            {referrals.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: i < referrals.length - 1 ? `1px solid ${B.borderLight}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${B.cyan}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ ...T.ui, fontSize: 13, fontWeight: 700, color: B.cyan }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ ...T.ui, fontSize: 13, fontWeight: 600, color: B.textPrimary }}>{r.name}</div>
                    <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400 }}>{r.status} · {r.date}</div>
                  </div>
                </div>
                <span style={{ ...T.ui, fontSize: 12, fontWeight: 700, color: r.color }}>{r.reward}</span>
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
