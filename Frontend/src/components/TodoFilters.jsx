import { useTodos } from "../context/TodoContext";

export default function TodoFilters() {
  // MUST include todos here (INSIDE the component)
  const { filter, setFilter, todos, sortBy, setSortBy } = useTodos();

  // FILTER BUTTON with PENDING COUNT
  const btn = (name, label) => {
    let finalLabel = label;

    // Add pending count ONLY for "pending"
    if (name === "pending") {
      const pendingCount = todos.filter((t) => !t.completed).length;
      finalLabel = `${label} (${pendingCount})`;
    }

    return (
      <button
        onClick={() => setFilter(name)}
        className={`px-4 py-2 rounded-xl shadow-sm transition font-medium ${
          filter === name
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {finalLabel}
      </button>
    );
  };

  // SORTING BUTTON
  const sortBtn = (name, label) => (
    <button
      onClick={() => setSortBy(name)}
      className={`px-4 py-2 rounded-xl shadow-sm transition font-medium ${
        sortBy === name
          ? "bg-purple-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-4 items-center">
      
      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-4">
        {btn("all", "All")}
        {btn("completed", "Completed")}
        {btn("pending", "Pending")}
      </div>

      {/* SORTING BUTTONS */}
      <div className="flex justify-center gap-4 mt-2">
        {sortBtn("latest", "Latest")}
        {sortBtn("oldest", "Oldest")}
        {sortBtn("due-soon", "Due Soon")}
        {sortBtn("due-far", "Due Far")}
      </div>

    </div>
  );
}
