import { useState } from "react";
import { B, T, SANS } from "../theme";
import { Btn } from "../components/Btn";
import type { NavProps } from "../MobileApp";

export function EditProfileScreen({ goBack }: NavProps) {
  const [firstName, setFirstName] = useState("Neal");
  const [lastName, setLastName] = useState("Kumar");
  const [email, setEmail] = useState("neal@driphydration.com");
  const [phone, setPhone] = useState("(310) 555-0100");
  const [dob, setDob] = useState("1990-06-15");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => { setSaved(false); goBack(); }, 1500);
  }

  const input = (label: string, value: string, onChange: (v: string) => void, type = "text") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ ...T.over, fontSize: 10, color: B.textMuted, display: "block", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "13px 14px", background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12, color: B.textPrimary, fontSize: 14, fontFamily: SANS, outline: "none", boxSizing: "border-box" }}
      />
    </div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, background: B.bg, zIndex: 150, display: "flex", flexDirection: "column", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui, padding: 0 }}>
          Cancel
        </button>
        <div style={{ ...T.product, fontSize: 16, color: B.textPrimary, flex: 1, textAlign: "center" }}>Edit Profile</div>
        <button
          onClick={handleSave}
          style={{ background: "none", border: "none", color: B.cyan, fontSize: 14, cursor: "pointer", fontFamily: SANS, ...T.ui, fontWeight: 700 }}
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
        {/* Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${B.tealAccent}, ${B.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>
            NK
          </div>
          <button style={{ background: "none", border: "none", color: B.cyan, ...T.ui, fontSize: 13, cursor: "pointer", fontFamily: SANS }}>
            Change Photo
          </button>
        </div>

        {input("FIRST NAME", firstName, setFirstName)}
        {input("LAST NAME", lastName, setLastName)}
        {input("EMAIL", email, setEmail, "email")}
        {input("PHONE NUMBER", phone, setPhone, "tel")}
        {input("DATE OF BIRTH", dob, setDob, "date")}

        <div style={{ marginBottom: 16 }}>
          <label style={{ ...T.over, fontSize: 10, color: B.textMuted, display: "block", marginBottom: 6 }}>BIOLOGICAL SEX</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["Male", "Female", "Prefer not to say"].map((opt) => (
              <button
                key={opt}
                style={{ flex: 1, padding: "12px 4px", borderRadius: 10, border: `1px solid ${opt === "Male" ? B.cyan : B.border}`, background: opt === "Male" ? `${B.cyan}12` : B.bgCard, color: opt === "Male" ? B.cyan : B.textSecondary, fontSize: 12, fontFamily: SANS, cursor: "pointer" }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <Btn fullWidth style={{ padding: "14px 0", fontSize: 13 }} onClick={handleSave}>
            {saved ? "SAVED ✓" : "SAVE CHANGES"}
          </Btn>
        </div>

        <div style={{ marginTop: 24, padding: "16px", background: B.bgCard, border: `1px solid ${B.border}`, borderRadius: 12 }}>
          <div style={{ ...T.ui, fontSize: 13, fontWeight: 700, color: B.textPrimary, marginBottom: 8 }}>Security</div>
          <button style={{ background: "none", border: "none", color: B.cyan, ...T.ui, fontSize: 13, cursor: "pointer", fontFamily: SANS, display: "block", marginBottom: 10 }}>
            Change Password
          </button>
          <button style={{ background: "none", border: "none", color: B.cyan, ...T.ui, fontSize: 13, cursor: "pointer", fontFamily: SANS, display: "block" }}>
            Enable Face ID / Biometrics
          </button>
        </div>
      </div>
    </div>
  );
}
