import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoInput() {
  const { addTodo, todos, loading } = useTodos();

  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  // Today date for validation (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // Check if duplicate exists
  const isDuplicate = todos.some(
    (t) => t.text.trim().toLowerCase() === text.trim().toLowerCase()
  );

  const handleSubmit = () => {
    setError(""); // clear previous errors
    const trimmed = text.trim();

    // 1️⃣ EMPTY validation
    if (!trimmed) {
      setError("Task cannot be empty.");
      return;
    }

    // 2️⃣ MEANINGFUL words (NO "hi", "hey", "ok", "hmm")
    const forbiddenShort = ["hi", "hey", "ok", "hmm", "yo", "kk", "no"];
    if (forbiddenShort.includes(trimmed.toLowerCase())) {
      setError("Please enter a meaningful task.");
      return;
    }

    // 3️⃣ Must contain at least 2 real words
    if (trimmed.split(" ").length < 2) {
      setError("Task must contain at least 2 meaningful words.");
      return;
    }

    // 4️⃣ MIN LENGTH validation
    if (trimmed.length < 3) {
      setError("Task must be at least 3 characters.");
      return;
    }

    // 5️⃣ MAX LENGTH validation
    if (trimmed.length > 100) {
      setError("Task is too long (max 100 characters).");
      return;
    }

    // 6️⃣ Reject repeated characters (like aaaaaa)
    if (/^(.)\1{3,}$/i.test(trimmed)) {
      setError("Task looks invalid. Try writing a real task.");
      return;
    }

    // 7️⃣ Reject symbol-only tasks (@@@@, ####)
    if (/^[^a-zA-Z0-9]+$/.test(trimmed)) {
      setError("Task cannot contain only symbols.");
      return;
    }

    // 8️⃣ DUPLICATE validation
    if (isDuplicate) {
      setError("This task already exists!");
      return;
    }

    // 9️⃣ Invalid date
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      setError("Invalid date selected.");
      return;
    }

    // 🔟 Past date validation
    if (dueDate && dueDate < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    // SUCCESS → Add todo
    addTodo(trimmed, dueDate);

    // Reset fields
    setText("");
    setDueDate("");
  };

  return (
    <div className="flex flex-col gap-3 mb-6">

      {/* TEXT INPUT */}
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm 
          bg-white/70 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-300
          focus:ring-2 focus:ring-blue-400 transition"
      />

      {/* DATE INPUT */}
      <input
        type="date"
        value={dueDate}
        min={today}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm
          bg-white/70 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:ring-2 focus:ring-blue-400 transition"
      />

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm font-medium">{error}</p>
      )}

      {/* ADD BUTTON WITH SPINNER */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-6 py-3 rounded-xl shadow-lg transition active:scale-95 
          ${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Adding...
          </span>
        ) : (
          "Add"
        )}
      </button>

    </div>
  );
}
