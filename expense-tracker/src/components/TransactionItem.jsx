import { Trash2 } from "lucide-react";

export default function TransactionItem({ transaction, onDeleteTransaction }) {
  const addsToBalance =
    transaction.type === "income" || transaction.type === "saving-withdrawal";
  // Income is displayed with +, while expenses and savings reduce available balance.
  const signedAmount = `${addsToBalance ? "+" : "-"}${transaction.amount}`;
  const readableType = transaction.type.replace("-", " ");
  const createdDate = transaction.createdAt
    ? new Date(transaction.createdAt)
    : null;
  const readableDate = createdDate
    ? `${createdDate.toLocaleDateString()} At ${String(createdDate.getHours()).padStart(2, "0")} : ${String(createdDate.getMinutes()).padStart(2, "0")}`
    : "No date";

  return (
    <li className={`transaction-item ${transaction.type}`}>
      <div className="transaction-main">
        <span className="transaction-title">{transaction.title}</span>
        <span className="transaction-meta">
          <span className="transaction-category">{transaction.category}</span>
          <time dateTime={transaction.createdAt}>{readableDate}</time>
        </span>
      </div>
      <strong className="transaction-amount">{signedAmount} EGP</strong>
      <span className="transaction-type">{readableType}</span>
      <button
        className="icon-button"
        type="button"
        onClick={() => onDeleteTransaction(transaction.id)}
        aria-label={`Delete ${transaction.title}`}
        title={`Delete ${transaction.title}`}
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
