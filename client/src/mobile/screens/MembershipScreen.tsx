import { useState } from "react";
import { B, T, SANS, SERIF } from "../theme";
import { Btn } from "../components/Btn";
import type { NavProps } from "../MobileApp";

const plans = [
  {
    id: "essential",
    name: "Essential",
    price: 149,
    perSession: 74,
    sessions: 2,
    color: B.tealAccent,
    features: ["2 IV sessions/month", "Member pricing on all IVs", "Priority booking", "Free nurse visit fee"],
  },
  {
    id: "performance",
    name: "Performance",
    price: 259,
    perSession: 65,
    sessions: 4,
    color: B.cyan,
    featured: true,
    features: ["4 IV sessions/month", "Member pricing on all IVs", "Priority booking", "Free add-ons ($70 value)", "Dedicated care coordinator"],
  },
  {
    id: "vip",
    name: "VIP Unlimited",
    price: 449,
    perSession: null,
    sessions: null,
    color: B.gold,
    features: ["Unlimited IV sessions", "Member pricing on all IVs", "Same-day priority booking", "All add-ons included", "Dedicated care coordinator", "Concierge wellness support"],
  },
];

const benefits = [
  { icon: "💉", title: "Member Pricing",       desc: "Save 25–30% on every IV session" },
  { icon: "📅", title: "Priority Scheduling",  desc: "Skip the waitlist, same-day slots" },
  { icon: "👩‍⚕️", title: "Nurse Continuity",    desc: "Request your preferred nurse" },
  { icon: "📦", title: "Shipped Discounts",     desc: "10% off all shipped-to-you products" },
  { icon: "💳", title: "HSA/FSA Eligible",      desc: "Use pre-tax health dollars" },
  { icon: "🎁", title: "Referral Rewards",      desc: "Give $25, get $25 for each friend" },
];

const faqs = [
  { q: "When am I billed?",              a: "Your membership renews automatically on the same date each month. You can cancel anytime from your account." },
  { q: "Can I change my plan?",          a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle." },
  { q: "Do sessions roll over?",         a: "Unused sessions do not roll over, but member pricing applies to any additional sessions you book." },
  { q: "Is there a cancellation fee?",   a: "No cancellation fees. Cancel anytime — your benefits remain until the end of your billing period." },
];

export function MembershipScreen({ goBack }: NavProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ position: "absolute", inset: 0, background: B.bg, zIndex: 150, display: "flex", flexDirection: "column", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui, padding: 0 }}>
          ← Back
        </button>
        <div style={{ ...T.product, fontSize: 16, color: B.textPrimary, flex: 1, textAlign: "center" }}>Membership</div>
        <div style={{ width: 48 }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Current plan banner */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ background: `linear-gradient(135deg, ${B.bgCard}, ${B.tealLight})`, border: `1px solid ${B.gold}30`, borderRadius: 16, padding: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -15, right: -15, width: 90, height: 90, background: `radial-gradient(circle, ${B.gold}15, transparent 70%)` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>💎</span>
                <div>
                  <div style={{ ...T.product, fontSize: 16, color: B.textPrimary }}>Performance Plan</div>
                  <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400 }}>Active since Jan 2025 · $259/mo</div>
                </div>
              </div>
              <span style={{ ...T.tag, fontSize: 9, color: B.cyan, background: `${B.cyan}15`, padding: "4px 12px", borderRadius: 20, border: `1px solid ${B.cyan}25` }}>Active</span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", ...T.ui, fontSize: 12, color: B.textSecondary, marginBottom: 8, fontWeight: 400 }}>
                <span>2 of 4 sessions used this month</span>
                <span style={{ color: B.cyan, fontWeight: 600 }}>50%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
                <div style={{ height: "100%", width: "50%", borderRadius: 3, background: `linear-gradient(90deg, ${B.tealAccent}, ${B.cyan})` }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ ...T.ui, fontSize: 12, color: B.textMuted, fontWeight: 400 }}>
                Savings this year: <span style={{ color: B.gold, fontWeight: 700 }}>$1,080</span>
              </div>
              <div style={{ ...T.ui, fontSize: 12, color: B.textMuted, fontWeight: 400 }}>
                Renews Apr 1
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div style={{ padding: "24px 20px 0" }}>
          <div style={{ ...T.heading, fontSize: 22, color: B.textPrimary, marginBottom: 4 }}>Change Your Plan</div>
          <div style={{ ...T.body, fontSize: 13, color: B.textMuted, marginBottom: 16 }}>All plans include member pricing and priority booking</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: plan.featured ? `linear-gradient(135deg, ${B.bgCard}, ${B.tealLight})` : B.bgCard,
                  border: `1px solid ${plan.featured ? plan.color + "50" : B.border}`,
                  borderRadius: 16,
                  padding: 18,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {plan.featured && (
                  <div style={{ position: "absolute", top: 14, right: 14, ...T.tag, fontSize: 9, color: B.cyan, background: `${B.cyan}15`, padding: "4px 10px", borderRadius: 20, border: `1px solid ${B.cyan}25` }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <div style={{ ...T.product, fontSize: 18, color: B.textPrimary }}>{plan.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: plan.color }}>${plan.price}</span>
                      <span style={{ ...T.ui, fontSize: 12, color: B.textMuted, fontWeight: 400 }}>/mo</span>
                    </div>
                    {plan.perSession && (
                      <div style={{ ...T.ui, fontSize: 11, color: B.textMuted, fontWeight: 400, marginTop: 2 }}>
                        ${plan.perSession}/session · {plan.sessions} sessions/mo
                      </div>
                    )}
                    {!plan.sessions && (
                      <div style={{ ...T.ui, fontSize: 11, color: B.gold, fontWeight: 600, marginTop: 2 }}>
                        Unlimited sessions included
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: plan.featured ? B.cyan : B.tealAccent, fontSize: 12 }}>✓</span>
                      <span style={{ ...T.body, fontSize: 12, color: B.textSecondary }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn
                  variant={plan.featured ? "primary" : "outline"}
                  fullWidth
                  style={{ padding: "12px 0", fontSize: 12 }}
                >
                  {plan.featured ? "CURRENT PLAN" : "SWITCH TO THIS PLAN"}
                </Btn>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div style={{ padding: "28px 20px 0" }}>
          <div style={{ ...T.heading, fontSize: 20, color: B.textPrimary, marginBottom: 16 }}>Member Benefits</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {benefits.map((b) => (
              <div key={b.title} style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{b.icon}</div>
                <div style={{ ...T.ui, fontSize: 13, fontWeight: 700, color: B.textPrimary, marginBottom: 4 }}>{b.title}</div>
                <div style={{ ...T.body, fontSize: 11, color: B.textMuted }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ padding: "28px 20px 0" }}>
          <div style={{ ...T.heading, fontSize: 20, color: B.textPrimary, marginBottom: 14 }}>FAQ</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${B.borderLight}` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "14px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ ...T.ui, fontSize: 14, color: B.textPrimary, fontWeight: 600, fontFamily: SANS }}>{faq.q}</span>
                  <span style={{ color: B.textMuted, fontSize: 16, flexShrink: 0, marginLeft: 10 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div style={{ ...T.body, fontSize: 13, color: B.textSecondary, paddingBottom: 14, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cancel */}
        <div style={{ padding: "20px 20px 32px", textAlign: "center" }}>
          <div style={{ ...T.body, fontSize: 12, color: B.textMuted, marginBottom: 8 }}>
            Need to cancel? No fees, cancel anytime.
          </div>
          <button style={{ background: "none", border: "none", color: "rgba(239,68,68,0.6)", ...T.ui, fontSize: 13, cursor: "pointer", fontFamily: SANS, textDecoration: "underline" }}>
            Cancel membership
          </button>
        </div>
      </div>
    </div>
  );
}
