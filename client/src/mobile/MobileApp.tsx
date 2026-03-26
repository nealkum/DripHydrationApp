import { useState } from "react";
import { B, SANS } from "./theme";
import { TabBar } from "./components/TabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { TreatmentsScreen } from "./screens/TreatmentsScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { AccountScreen } from "./screens/AccountScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { TreatmentDetailScreen } from "./screens/TreatmentDetailScreen";
import { MembershipScreen } from "./screens/MembershipScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { ReferralScreen } from "./screens/ReferralScreen";
import { HelpScreen } from "./screens/HelpScreen";
import { EditProfileScreen } from "./screens/EditProfileScreen";

export type TabId = "home" | "tx" | "bk" | "ord" | "acc";

export type NavScreen =
  | { type: "treatment-detail"; slug: string }
  | { type: "membership" }
  | { type: "notifications" }
  | { type: "referral" }
  | { type: "help" }
  | { type: "edit-profile" };

export interface NavProps {
  navigate: (screen: NavScreen) => void;
  goBack: () => void;
  onTabChange: (tab: TabId) => void;
  openBooking: (slug?: string) => void;
}

export function MobileApp() {
  const [tab, setTab] = useState<TabId>("home");
  const [navStack, setNavStack] = useState<NavScreen[]>([]);
  const [booking, setBooking] = useState<{ open: boolean; slug?: string }>({ open: false });

  const currentScreen = navStack[navStack.length - 1] ?? null;

  function navigate(screen: NavScreen) {
    setNavStack((prev) => [...prev, screen]);
  }

  function goBack() {
    setNavStack((prev) => prev.slice(0, -1));
  }

  function openBooking(slug?: string) {
    setBooking({ open: true, slug });
  }

  function handleTabSelect(id: TabId) {
    if (id === "bk") {
      openBooking();
      return;
    }
    setTab(id);
    setNavStack([]);
  }

  const navProps: NavProps = { navigate, goBack, onTabChange: handleTabSelect, openBooking };

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
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: currentScreen ? 0 : 84 }}>
          {tab === "home" && <HomeScreen {...navProps} />}
          {tab === "tx" && <TreatmentsScreen {...navProps} />}
          {tab === "ord" && <OrdersScreen {...navProps} />}
          {tab === "acc" && <AccountScreen {...navProps} />}
        </div>

        {/* Bottom tab bar — hidden when a sub-screen is open */}
        {!currentScreen && <TabBar active={tab} onSelect={handleTabSelect} />}

        {/* Nav stack screens (slide over) */}
        {currentScreen?.type === "treatment-detail" && (
          <TreatmentDetailScreen slug={currentScreen.slug} {...navProps} />
        )}
        {currentScreen?.type === "membership" && (
          <MembershipScreen {...navProps} />
        )}
        {currentScreen?.type === "notifications" && (
          <NotificationsScreen {...navProps} />
        )}
        {currentScreen?.type === "referral" && (
          <ReferralScreen {...navProps} />
        )}
        {currentScreen?.type === "help" && (
          <HelpScreen {...navProps} />
        )}
        {currentScreen?.type === "edit-profile" && (
          <EditProfileScreen {...navProps} />
        )}

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
