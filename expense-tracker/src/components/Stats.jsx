import { BarChart3 } from "lucide-react";

export default function Stats({
  income,
  expenses,
  savings,
  balance,
  mostSpentCategory,
}) {
  return (
    <section className="panel stats-panel">
      <div className="section-heading">
        <h2>Dashboard Stats</h2>
        <BarChart3 size={20} />
      </div>
      {/* Definition lists are a semantic fit for label/value dashboard stats. */}
      <dl className="stats-grid">
        <div>
          <dt>Total Income</dt>
          <dd>{income} EGP</dd>
        </div>
        <div>
          <dt>Total Expenses</dt>
          <dd>{expenses} EGP</dd>
        </div>
        <div>
          <dt>Total Savings</dt>
          <dd>{savings} EGP</dd>
        </div>
        <div>
          <dt>Balance</dt>
          <dd>{balance} EGP</dd>
        </div>
        <div>
          <dt>Most Spent On Category</dt>
          <dd>{mostSpentCategory}</dd>
        </div>
      </dl>
    </section>
  );
}
