import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Transactions</h2>
        <span>
          {transactions.length === 0
            ? "No transactions yet"
            : `${transactions.length} transaction${transactions.length > 1 ? "s" : ""}`}
        </span>
      </div>

      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {/* map() turns each transaction object into a reusable TransactionItem component. */}
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-state">No transactions match this filter.</p>
      )}
    </section>
  );
}
