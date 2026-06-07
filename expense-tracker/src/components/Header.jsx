import { Moon, Sun, WalletCards } from "lucide-react";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="brand-mark" aria-hidden="true">
        <WalletCards size={28} />
      </div>
      <div className="header-copy">
        <p className="eyebrow">Personal finance</p>
        <h1>Expense Tracker</h1>
      </div>
      <button
        className="theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
