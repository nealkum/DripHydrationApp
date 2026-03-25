import { useState } from "react";
import { B, SANS } from "./theme";
import { TabBar } from "./components/TabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { TreatmentsScreen } from "./screens/TreatmentsScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { BookingScreen } from "./screens/BookingScreen";

type TabId = "home" | "tx" | "bk" | "ord" | "acc";

export function MobileApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [booking, setBooking] = useState<{ open: boolean; slug?: string }>({ open: false });

  function handleBook(slug?: string) {
    setBooking({ open: true, slug });
  }

  function handleTabSelect(id: TabId) {
    if (id === "bk") {
      handleBook();
      return;
    }
    setTab(id);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", background: "#0a1f1f", padding: "16px 0", fontFamily: SANS }}>
      {/* Phone frame */}
      <div
        style={{
          width: 390,
          minHeight: 844,
          background: B.bg,
          borderRadius: 44,
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Status bar notch */}
        <div style={{ height: 54, background: B.bg, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
          <div style={{ width: 126, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 84 }}>
          {tab === "home" && <HomeScreen />}
          {(tab === "tx") && <TreatmentsScreen onBook={handleBook} />}
          {tab === "ord" && <OrdersScreen />}
          {tab === "acc" && <AccountScreen />}
        </div>

        {/* Bottom tab bar */}
        <TabBar active={tab} onSelect={handleTabSelect} />

        {/* Booking overlay */}
        {booking.open && (
          <BookingScreen
            slug={booking.slug}
            onClose={() => setBooking({ open: false })}
          />
        )}
      </div>
    </div>
  );
}
