import { B, T, SANS } from "../theme";

interface BtnProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  style?: React.CSSProperties;
  onClick?: () => void;
  fullWidth?: boolean;
}

export function Btn({ children, variant = "primary", style: sx, onClick, fullWidth }: BtnProps) {
  const base: React.CSSProperties = {
    ...T.btn,
    fontSize: 12,
    borderRadius: 10,
    cursor: "pointer",
    border: "none",
    padding: "12px 22px",
    textAlign: "center",
    display: "inline-block",
    width: fullWidth ? "100%" : undefined,
    fontFamily: SANS,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      background: `linear-gradient(135deg, ${B.tealAccent}, ${B.cyan})`,
      color: "#fff",
      boxShadow: `0 4px 14px ${B.cyan}25`,
    },
    outline: {
      ...base,
      background: "transparent",
      color: B.textSecondary,
      border: `1px solid ${B.border}`,
    },
    ghost: {
      ...base,
      background: `${B.cyan}10`,
      color: B.cyan,
      border: `1px solid ${B.cyan}30`,
    },
  };

  return (
    <button style={{ ...variants[variant], ...sx }} onClick={onClick}>
      {children}
    </button>
  );
}
