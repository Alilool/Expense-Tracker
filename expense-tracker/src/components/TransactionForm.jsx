import { PlusCircle } from "lucide-react";
import { useState } from "react";

const categories = [
  "Food",
  "Job",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Travel",
  "Education",
  "Other",
];

export default function TransactionForm({ onAddTransaction }) {
  // Controlled inputs: React state is the source of truth for every form field.
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [errorMessage, setErrorMessage] = useState("");
  const categoryOptions = type === "saving" ? ["Saving"] : categories;

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const numericAmount = Number(amount);

    // Basic validation keeps empty titles and invalid amounts out of the list.
    if (!cleanTitle) {
      setErrorMessage("Please enter a transaction title.");
      return;
    }

    if (!amount.trim()) {
      setErrorMessage("Please enter a transaction amount.");
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage("Please enter an amount greater than 0.");
      return;
    }

    // Send the completed transaction object up to App, where the list state lives.
    onAddTransaction({
      id:
        crypto.randomUUID && window.isSecureContext
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2), // Unique ID for this example only. Don't use in production.
      title: cleanTitle,
      amount: numericAmount,
      type,
      category,
      createdAt: new Date().toISOString(),
    });

    // Reset the form after a successful add so it is ready for the next transaction.
    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setErrorMessage("");
  }

  function handleTypeChange(newType) {
    setType(newType);
    setErrorMessage("");

    if (newType === "saving") {
      setTitle("Saving");
      setCategory("Saving");
      return;
    }

    if (type === "saving") {
      setTitle("");
      setCategory("Food");
    }
  }

  function handleAmountChange(newAmount) {
    if (Number.isNaN(Number(newAmount)) || Number(newAmount) < 0) {
      setErrorMessage("Please enter a valid number for the amount.");
      return;
    }

    if (Number(newAmount) > 9999999999) {
      setErrorMessage("Amount number can't exceed 10 digits.");
      return;
    }
    setAmount(newAmount);
    setErrorMessage("");
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Add Transaction</h2>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Burger"
            {...(type === "saving" ? { disabled: true } : {})}
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            value={amount}
            onChange={(event) => {
              handleAmountChange(event.target.value);
            }}
            placeholder="120"
          />
        </label>

        <fieldset>
          <legend>Type</legend>
          <div className="segmented-control">
            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={(event) => handleTypeChange(event.target.value)}
              />
              <span>Income</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={(event) => handleTypeChange(event.target.value)}
              />
              <span>Expense</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="saving"
                checked={type === "saving"}
                onChange={(event) => handleTypeChange(event.target.value)}
              />
              <span>Saving</span>
            </label>
          </div>
        </fieldset>

        <label>
          Category
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setErrorMessage("");
            }}
          >
            {categoryOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button" type="submit">
          <PlusCircle size={18} />
          Add
        </button>

        {errorMessage && (
          <p className="form-error" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
