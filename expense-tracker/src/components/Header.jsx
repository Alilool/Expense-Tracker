import { WalletCards } from "lucide-react";

export default function Header() {
  return (
    // Header is presentational: it does not need state or event handlers.
    <header className="app-header">
      <div className="brand-mark" aria-hidden="true">
        <WalletCards size={28} />
      </div>
      <div>
        <p className="eyebrow">Personal finance</p>
        <h1>Expense Tracker</h1>
      </div>
    </header>
  );
}
