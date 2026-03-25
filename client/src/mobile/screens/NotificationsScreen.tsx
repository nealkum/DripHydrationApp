import { B, T, SANS } from "../theme";
import type { NavProps } from "../MobileApp";

const notifications = [
  {
    icon: "👩‍⚕️",
    title: "Nurse Sarah K. is on her way",
    body: "ETA: 25 minutes · Recovery & Performance IV",
    time: "Just now",
    unread: true,
    accent: B.cyan,
  },
  {
    icon: "📅",
    title: "Appointment Confirmed",
    body: "Tomorrow, Mar 26 at 2:00 PM · Your home",
    time: "2 hours ago",
    unread: true,
    accent: B.cyan,
  },
  {
    icon: "💎",
    title: "2 sessions remaining this month",
    body: "Use your Performance Plan sessions before Apr 1",
    time: "Yesterday",
    unread: false,
    accent: B.gold,
  },
  {
    icon: "⭐",
    title: "Rate your last visit",
    body: "How was your NAD+ IV Therapy with David R.?",
    time: "3 days ago",
    unread: false,
    accent: B.gold,
  },
  {
    icon: "📦",
    title: "Semaglutide delivered",
    body: "Your March shipment was delivered on Mar 13",
    time: "Mar 13",
    unread: false,
    accent: B.tealAccent,
  },
  {
    icon: "🎁",
    title: "Referral bonus earned",
    body: "Your friend Jessica signed up — $25 credit added",
    time: "Mar 10",
    unread: false,
    accent: B.gold,
  },
  {
    icon: "💊",
    title: "Upcoming shipment reminder",
    body: "Your Semaglutide ships in 7 days",
    time: "Mar 3",
    unread: false,
    accent: B.tealAccent,
  },
];

export function NotificationsScreen({ goBack }: NavProps) {
  return (
    <div style={{ position: "absolute", inset: 0, background: B.bg, zIndex: 150, display: "flex", flexDirection: "column", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui, padding: 0 }}>
          ← Back
        </button>
        <div style={{ ...T.product, fontSize: 16, color: B.textPrimary, flex: 1, textAlign: "center" }}>Notifications</div>
        <button style={{ background: "none", border: "none", color: B.cyan, fontSize: 12, cursor: "pointer", fontFamily: SANS, ...T.ui }}>
          Mark all read
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {notifications.map((n, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              padding: "16px 20px",
              borderBottom: `1px solid ${B.borderLight}`,
              background: n.unread ? `${B.cyan}05` : "transparent",
              position: "relative",
            }}
          >
            {n.unread && (
              <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 6, height: 6, borderRadius: "50%", background: B.cyan }} />
            )}
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${n.accent}15`, border: `1px solid ${n.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {n.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...T.ui, fontSize: 13, fontWeight: 600, color: B.textPrimary, marginBottom: 2 }}>{n.title}</div>
              <div style={{ ...T.body, fontSize: 12, color: B.textSecondary, lineHeight: 1.4, marginBottom: 4 }}>{n.body}</div>
              <div style={{ ...T.ui, fontSize: 10, color: B.textMuted, fontWeight: 400 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
