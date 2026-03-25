import { B, T } from "../theme";

interface SectionHeaderProps {
  children: React.ReactNode;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ children, action, onAction }: SectionHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <div style={{ ...T.heading, fontSize: 20, color: B.textPrimary }}>{children}</div>
      {action && (
        <span
          style={{ ...T.ui, fontSize: 12, color: B.cyan, fontWeight: 600, cursor: "pointer" }}
          onClick={onAction}
        >
          {action}
        </span>
      )}
    </div>
  );
}
