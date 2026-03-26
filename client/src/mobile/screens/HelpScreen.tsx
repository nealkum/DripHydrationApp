import { useState } from "react";
import { B, T, SANS } from "../theme";
import { Btn } from "../components/Btn";
import type { NavProps } from "../MobileApp";

const faqs = [
  {
    category: "Booking",
    items: [
      { q: "How quickly can a nurse arrive?", a: "Most appointments are available same-day. Average arrival time is 45–90 minutes after booking, depending on your city and time of day." },
      { q: "Can I reschedule or cancel?",     a: "Yes, you can reschedule or cancel for free up to 2 hours before your appointment. Changes can be made directly in the app." },
      { q: "Where do you offer service?",    a: "We serve over 100 cities across the US. Enter your zip code during booking to confirm availability in your area." },
    ],
  },
  {
    category: "Treatments",
    items: [
      { q: "Are there any side effects?",    a: "IV therapy is generally very safe. Some people experience mild bruising at the IV site. Our nurses are trained to minimize discomfort." },
      { q: "How long does a session take?",  a: "Most IV drips take 45–60 minutes. NAD+ therapy takes 2–4 hours. Your nurse will give you an accurate estimate at the start of your session." },
      { q: "Is a prescription required?",   a: "Most treatments do not require a prescription. Certain specialty treatments (ketamine, peptides) may require a brief medical consultation." },
    ],
  },
  {
    category: "Membership",
    items: [
      { q: "Can I pause my membership?",    a: "Yes, you can pause your membership for up to 2 months per year at no charge. Contact support or use the app to request a pause." },
      { q: "Do unused sessions expire?",    a: "Monthly sessions do not roll over, but member pricing applies to any additional sessions booked that month." },
    ],
  },
  {
    category: "Payment",
    items: [
      { q: "Do you accept HSA/FSA cards?",  a: "Yes! IV therapy is HSA/FSA eligible. Simply use your HSA or FSA card as your payment method during checkout." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, Apple Pay, Google Pay, and HSA/FSA cards." },
    ],
  },
];

export function HelpScreen({ goBack }: NavProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function sendMessage() {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: B.bg, zIndex: 150, display: "flex", flexDirection: "column", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui, padding: 0 }}>
          ← Back
        </button>
        <div style={{ ...T.product, fontSize: 16, color: B.textPrimary, flex: 1, textAlign: "center" }}>Help & FAQ</div>
        <div style={{ width: 48 }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Contact options */}
        <div style={{ padding: "20px 20px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { icon: "💬", label: "Live Chat",  sub: "2 min wait", action: () => setChatOpen(true) },
              { icon: "📞", label: "Call Us",    sub: "1-800-DRIP-IV", action: () => {} },
              { icon: "✉️", label: "Email",      sub: "24h response", action: () => {} },
            ].map((c) => (
              <button
                key={c.label}
                onClick={c.action}
                style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, padding: "14px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
              >
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <span style={{ ...T.ui, fontSize: 12, fontWeight: 700, color: B.textPrimary }}>{c.label}</span>
                <span style={{ ...T.body, fontSize: 10, color: B.textMuted }}>{c.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ padding: "8px 20px 32px" }}>
          <div style={{ ...T.heading, fontSize: 20, color: B.textPrimary, marginBottom: 16 }}>Frequently Asked Questions</div>
          {faqs.map((section) => (
            <div key={section.category} style={{ marginBottom: 24 }}>
              <div style={{ ...T.over, fontSize: 10, color: B.cyan, marginBottom: 8 }}>{section.category.toUpperCase()}</div>
              <div style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, overflow: "hidden" }}>
                {section.items.map((faq, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={i} style={{ borderBottom: i < section.items.length - 1 ? `1px solid ${B.borderLight}` : "none" }}>
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        style={{ width: "100%", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                      >
                        <span style={{ ...T.ui, fontSize: 13, color: B.textPrimary, fontWeight: 600, fontFamily: SANS, flex: 1, paddingRight: 10 }}>{faq.q}</span>
                        <span style={{ color: B.textMuted, fontSize: 16, flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div style={{ ...T.body, fontSize: 13, color: B.textSecondary, padding: "0 16px 14px", lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live chat sheet */}
      {chatOpen && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "flex-end", zIndex: 200 }}>
          <div style={{ width: "100%", background: B.bgCard, borderRadius: "20px 20px 0 0", borderTop: `1px solid ${B.border}`, display: "flex", flexDirection: "column", maxHeight: "70%" }}>
            <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${B.borderLight}` }}>
              <div>
                <div style={{ ...T.ui, fontSize: 15, fontWeight: 700, color: B.textPrimary }}>Live Chat</div>
                <div style={{ ...T.ui, fontSize: 11, color: B.cyan, fontWeight: 400 }}>● Online · 2 min avg response</div>
              </div>
              <button onClick={() => { setChatOpen(false); setSent(false); }} style={{ background: "none", border: "none", color: B.textMuted, fontSize: 22, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
              <div style={{ background: `${B.cyan}12`, border: `1px solid ${B.cyan}20`, borderRadius: "12px 12px 12px 4px", padding: "12px 14px", maxWidth: "80%", marginBottom: 16 }}>
                <div style={{ ...T.body, fontSize: 13, color: B.textPrimary }}>Hi Neal! 👋 I'm Maya, your Drip support specialist. How can I help you today?</div>
              </div>
              {sent && (
                <div style={{ background: B.bg, border: `1px solid ${B.border}`, borderRadius: "12px 12px 4px 12px", padding: "12px 14px", maxWidth: "80%", marginLeft: "auto", marginBottom: 16 }}>
                  <div style={{ ...T.body, fontSize: 13, color: B.textSecondary }}>Your message has been sent. We'll respond shortly!</div>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px 24px", borderTop: `1px solid ${B.borderLight}`, display: "flex", gap: 10 }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, padding: "12px 14px", background: B.bg, border: `1px solid ${B.border}`, borderRadius: 12, color: B.textPrimary, fontSize: 13, fontFamily: SANS, outline: "none" }}
              />
              <Btn style={{ padding: "12px 18px", fontSize: 12, flexShrink: 0 }} onClick={sendMessage}>SEND</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
