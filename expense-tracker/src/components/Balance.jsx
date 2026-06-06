import { ArrowDownCircle, ArrowUpCircle, PiggyBank, Scale } from "lucide-react";
import { useState } from "react";

export default function Balance({
  income,
  expenses,
  savings,
  balance,
  onWithdrawSavings,
}) {
  const [withdrawAmount, setWithdrawAmount] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const numericAmount = Number(withdrawAmount);
    if (numericAmount <= 0 || numericAmount > savings) {
      return;
    }
    onWithdrawSavings({
      id: crypto.randomUUID(),
      title: "Savings Withdrawal",
      amount: numericAmount,
      type: "saving-withdrawal",
      category: "Saving",
    });
    setWithdrawAmount("");
  }

  return (
    <section className="balance-grid" aria-label="Balance summary">
      <article className="summary-panel primary">
        <Scale size={22} />
        <span>Balance</span>
        <strong>{balance} EGP</strong>
      </article>
      <article className="summary-panel income">
        <ArrowUpCircle size={22} />
        <span>Income</span>
        <strong>{income} EGP</strong>
      </article>
      <article className="summary-panel expense">
        <ArrowDownCircle size={22} />
        <span>Expenses</span>
        <strong>{expenses} EGP</strong>
      </article>
      <article className="summary-panel saving">
        <PiggyBank size={22} />
        <span>Savings</span>
        <strong>{savings} EGP</strong>
        <form className="withdraw-form" onSubmit={handleSubmit}>
          <input
            min="1"
            max={savings}
            type="number"
            value={withdrawAmount}
            onChange={(event) => setWithdrawAmount(event.target.value)}
            placeholder="Take amount"
            disabled={savings <= 0}
          />
          <button type="submit" disabled={savings <= 0}>
            Take
          </button>
        </form>
      </article>
    </section>
  );
}
