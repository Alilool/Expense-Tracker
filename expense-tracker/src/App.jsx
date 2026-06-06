import { useMemo, useState } from "react";
import Balance from "./components/Balance.jsx";
import Filters from "./components/Filters.jsx";
import Header from "./components/Header.jsx";
import Stats from "./components/Stats.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const baseFilters = ["All", "Income", "Expense", "Saving"];

export default function App() {
  // Main app state: this custom hook works like useState, but also saves to localStorage.
  const [transactions, setTransactions] = useLocalStorage(
    "expense-tracker-transactions",
    [],
  );
  const [activeFilter, setActiveFilter] = useState("All");

  // Derived values: these are calculated from transactions instead of stored separately.
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const savings = transactions
    .filter((transaction) => transaction.type === "saving")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const savingsWithdrawals = transactions
    .filter((transaction) => transaction.type === "saving-withdrawal")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const availableSavings = savings - savingsWithdrawals;

  const balance = income - expenses - availableSavings;

  // Build category filter buttons from the categories currently used in the list.
  const categoryFilters = useMemo(
    () =>
      [
        ...new Set(transactions.map((transaction) => transaction.category)),
      ].filter((category) => !baseFilters.includes(category)),
    [transactions],
  );

  const filters = [...baseFilters, ...categoryFilters];

  // The selected filter controls which transactions are passed to the list component.
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Income") return transaction.type === "income";
    if (activeFilter === "Expense") return transaction.type === "expense";
    if (activeFilter === "Saving") {
      return (
        transaction.type === "saving" ||
        transaction.type === "saving-withdrawal"
      );
    }
    return transaction.category === activeFilter;
  });

  const mostSpentCategory = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense",
    );

    if (expenseTransactions.length === 0) return "None";

    // Add expense amounts by category, then pick the category with the highest total spend.
    const categoryTotals = expenseTransactions.reduce((totals, transaction) => {
      totals[transaction.category] =
        (totals[transaction.category] || 0) + transaction.amount;
      return totals;
    }, {});

    return Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0];
  }, [transactions]);

  function handleAddTransaction(transaction) {
    // Add the new transaction at the top without mutating the old array.
    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);
  }

  function handleDeleteTransaction(id) {
    // Keep every item except the one whose id matches the deleted transaction.
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    );
  }

  function handleWithdrawSavings(transaction) {
    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);
  }

  return (
    <main className="app-shell">
      <Header />
      <Balance
        income={income}
        expenses={expenses}
        savings={availableSavings}
        balance={balance}
        onWithdrawSavings={handleWithdrawSavings}
      />

      <div className="content-grid">
        <div className="stack">
          <TransactionForm onAddTransaction={handleAddTransaction} />
          <Stats
            income={income}
            expenses={expenses}
            savings={availableSavings}
            balance={balance}
            mostSpentCategory={mostSpentCategory}
          />
        </div>

        <div className="stack">
          <Filters
            activeFilter={activeFilter}
            filters={filters}
            onChangeFilter={setActiveFilter}
          />
          <TransactionList
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </main>
  );
}
