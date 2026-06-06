export default function Filters({ activeFilter, filters, onChangeFilter }) {
  return (
    <section className="filters" aria-label="Transaction filters">
      {/* Each button updates App's activeFilter state. */}
      {filters.map((filter) => (
        <button
          className={
            activeFilter === filter ? "filter-button active" : "filter-button"
          }
          key={filter}
          onClick={() => onChangeFilter(filter)}
          type="button"
        >
          {filter}
        </button>
      ))}
    </section>
  );
}
