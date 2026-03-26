import { useState } from "react";
import { B, T, SANS } from "../theme";
import { Btn } from "../components/Btn";
import { useQuery } from "@tanstack/react-query";
import type { Treatment } from "@shared/schema";
import type { BookingConfirmation } from "../MobileApp";

interface BookingScreenProps {
  slug?: string;
  onClose: () => void;
  onConfirmed: (details: BookingConfirmation) => void;
}

type Step = "select" | "location" | "schedule" | "confirm";

const TIMES = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];
const DATES = ["Today, Mar 25","Tomorrow, Mar 26","Thu, Mar 27","Fri, Mar 28","Sat, Mar 29","Sun, Mar 30"];

const shippedSlugs = new Set([
  "weight-loss-semaglutide","weight-loss-tirzepatide","ketamine-therapy",
  "nad-injections","nad-nasal-spray","niagen-nr-injections",
  "peptide-sermorelin","peptide-cjc-ipamorelin","peptide-ghk-cu",
  "testosterone-trt","testosterone-enclomiphene","vitamin-b12","vitamin-lipostat",
]);

export function BookingScreen({ slug, onClose, onConfirmed }: BookingScreenProps) {
  const [step, setStep] = useState<Step>(slug ? "location" : "select");
  const [selectedSlug, setSelectedSlug] = useState(slug ?? "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data: treatments = [] } = useQuery<Treatment[]>({ queryKey: ["/api/treatments"] });
  const treatment = treatments.find((t) => t.slug === selectedSlug);
  const ivTreatments = treatments.filter((t) => !shippedSlugs.has(t.slug));

  const flowSteps: Step[] = slug
    ? ["location", "schedule", "confirm"]
    : ["select", "location", "schedule", "confirm"];
  const stepIdx = flowSteps.indexOf(step);

  function handleConfirm() {
    onConfirmed({
      treatmentName: treatment?.name ?? selectedSlug,
      date: selectedDate,
      time: selectedTime,
      address: `${address}, ${city}`,
      price: treatment ? Math.round(treatment.price / 100) : 0,
    });
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: B.bg, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        {stepIdx > 0
          ? <button onClick={() => setStep(flowSteps[stepIdx - 1])} style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui }}>← Back</button>
          : <span />
        }
        <div style={{ ...T.product, fontSize: 16, color: B.textPrimary }}>Book IV Therapy</div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: B.textMuted, fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "12px 0", flexShrink: 0 }}>
        {flowSteps.map((s, i) => (
          <div key={s} style={{ width: 28, height: 4, borderRadius: 2, background: stepIdx >= i ? B.cyan : `${B.cyan}25`, transition: "background 0.3s" }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 20px" }}>

        {/* Step 1: Select treatment */}
        {step === "select" && (
          <div>
            <div style={{ ...T.heading, fontSize: 22, color: B.textPrimary, marginBottom: 6 }}>Choose a Treatment</div>
            <div style={{ ...T.body, fontSize: 13, color: B.textMuted, marginBottom: 20 }}>All IV treatments include a licensed nurse visit</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ivTreatments.map((t) => (
                <div
                  key={t.id}
                  onClick={() => { setSelectedSlug(t.slug); setStep("location"); }}
                  style={{
                    background: selectedSlug === t.slug ? `${B.cyan}10` : B.bgCard,
                    border: `1px solid ${selectedSlug === t.slug ? B.cyan : B.border}`,
                    borderRadius: 14,
                    padding: "14px 16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ ...T.product, fontSize: 15, color: B.textPrimary }}>{t.name}</div>
                    <div style={{ ...T.ui, fontSize: 12, color: B.textMuted, fontWeight: 400, marginTop: 2 }}>{t.duration} min · Licensed nurse</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ ...T.price, fontSize: 16, color: B.textPrimary }}>${Math.round(t.price / 100)}</div>
                    <div style={{ ...T.ui, fontSize: 11, color: B.cyan, fontWeight: 600 }}>${Math.round(t.price * 0.75 / 100)} with membership</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === "location" && (
          <div>
            <div style={{ ...T.heading, fontSize: 22, color: B.textPrimary, marginBottom: 4 }}>Where should we go?</div>
            <div style={{ ...T.body, fontSize: 13, color: B.textMuted, marginBottom: 24 }}>Our nurse will come to you</div>

            {treatment && (
              <div style={{ background: `${B.cyan}10`, border: `1px solid ${B.cyan}25`, borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ ...T.product, fontSize: 14, color: B.textPrimary }}>{treatment.name}</div>
                <div style={{ ...T.price, fontSize: 14, color: B.cyan }}>${Math.round(treatment.price / 100)}</div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ ...T.ui, fontSize: 12, color: B.textMuted, display: "block", marginBottom: 6 }}>STREET ADDRESS</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Apt 4B"
                  style={{ width: "100%", padding: "13px 14px", background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, color: B.textPrimary, fontSize: 14, fontFamily: SANS, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ ...T.ui, fontSize: 12, color: B.textMuted, display: "block", marginBottom: 6 }}>CITY</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Los Angeles, CA"
                  style={{ width: "100%", padding: "13px 14px", background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, color: B.textPrimary, fontSize: 14, fontFamily: SANS, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ ...T.over, fontSize: 9, color: B.textMuted, marginBottom: 10 }}>SAVED ADDRESSES</div>
              {["Home · 123 Main St, Los Angeles", "Office · 456 Wilshire Blvd"].map((a, i) => (
                <div
                  key={i}
                  onClick={() => { setAddress(a.split("·")[1].trim()); setCity("Los Angeles, CA"); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: `1px solid ${B.borderLight}`, cursor: "pointer" }}
                >
                  <span>📍</span>
                  <span style={{ ...T.ui, fontSize: 13, color: B.textSecondary }}>{a}</span>
                </div>
              ))}
            </div>

            <Btn fullWidth style={{ marginTop: 24, padding: "14px 0", fontSize: 13 }} onClick={() => { if (address && city) setStep("schedule"); }}>
              CONTINUE
            </Btn>
            {(!address || !city) && (
              <div style={{ ...T.body, fontSize: 12, color: B.textMuted, textAlign: "center", marginTop: 8 }}>
                Please enter your address to continue
              </div>
            )}
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === "schedule" && (
          <div>
            <div style={{ ...T.heading, fontSize: 22, color: B.textPrimary, marginBottom: 4 }}>Pick a Date & Time</div>
            <div style={{ ...T.body, fontSize: 13, color: B.textMuted, marginBottom: 20 }}>Same-day appointments often available</div>

            <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 10 }}>DATE</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
              {DATES.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${selectedDate === d ? B.cyan : B.border}`, background: selectedDate === d ? `${B.cyan}15` : B.bgCard, color: selectedDate === d ? B.cyan : B.textSecondary, fontSize: 12, fontFamily: SANS, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {d}
                </button>
              ))}
            </div>

            <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 10 }}>TIME</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
              {TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{ padding: "12px", borderRadius: 12, border: `1px solid ${selectedTime === time ? B.cyan : B.border}`, background: selectedTime === time ? `${B.cyan}15` : B.bgCard, color: selectedTime === time ? B.cyan : B.textSecondary, fontSize: 13, fontFamily: SANS, fontWeight: 600, cursor: "pointer" }}
                >
                  {time}
                </button>
              ))}
            </div>

            <Btn fullWidth style={{ padding: "14px 0", fontSize: 13 }} onClick={() => { if (selectedDate && selectedTime) setStep("confirm"); }}>
              CONTINUE
            </Btn>
            {(!selectedDate || !selectedTime) && (
              <div style={{ ...T.body, fontSize: 12, color: B.textMuted, textAlign: "center", marginTop: 8 }}>
                Please select a date and time
              </div>
            )}
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === "confirm" && (
          <div>
            <div style={{ ...T.heading, fontSize: 22, color: B.textPrimary, marginBottom: 20 }}>Confirm Booking</div>

            <div style={{ background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 14, padding: 18, marginBottom: 16 }}>
              <div style={{ ...T.over, fontSize: 10, color: B.textMuted, marginBottom: 14 }}>BOOKING SUMMARY</div>
              {[
                { label: "Treatment", value: treatment?.name ?? selectedSlug },
                { label: "Date",      value: selectedDate },
                { label: "Time",      value: selectedTime },
                { label: "Address",   value: `${address}, ${city}` },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${B.borderLight}` : "none" }}>
                  <span style={{ ...T.ui, fontSize: 13, color: B.textMuted, fontWeight: 400 }}>{row.label}</span>
                  <span style={{ ...T.ui, fontSize: 13, color: B.textPrimary, fontWeight: 600, maxWidth: "55%", textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${B.border}` }}>
                <span style={{ ...T.product, fontSize: 15, color: B.textPrimary }}>Total</span>
                <span style={{ ...T.price, fontSize: 18, color: B.textPrimary }}>${treatment ? Math.round(treatment.price / 100) : "—"}</span>
              </div>
            </div>

            <div style={{ background: `${B.gold}08`, border: `1px solid ${B.gold}25`, borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
              <div style={{ ...T.ui, fontSize: 12, color: B.gold, fontWeight: 600, marginBottom: 4 }}>
                💎 Members save ${treatment ? Math.round(treatment.price * 0.25 / 100) : "—"}
              </div>
              <div style={{ ...T.body, fontSize: 12, color: B.textMuted }}>
                Join a membership to pay ${treatment ? Math.round(treatment.price * 0.75 / 100) : "—"} instead
              </div>
            </div>

            <Btn fullWidth style={{ padding: "15px 0", fontSize: 14 }} onClick={handleConfirm}>
              CONFIRM BOOKING
            </Btn>

            <div style={{ ...T.body, fontSize: 11, color: B.textMuted, textAlign: "center", marginTop: 12 }}>
              Free cancellation up to 2 hours before appointment
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
