import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoItem({ todo, index }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [date, setDate] = useState(todo.dueDate || ""); // ← NEW STATE

  const [saving, setSaving] = useState(false);    // ← NEW FOR SAVE LOADING
  const [deleting, setDeleting] = useState(false); // ← NEW FOR DELETE LOADING

  const handleSave = () => {
    if (!text.trim()) return;

    setSaving(true); // show loader

    setTimeout(() => {
      editTodo(todo.id, text, date);
      setSaving(false);
      setIsEditing(false);
    }, 300);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white/70 rounded-xl shadow-sm border">

      {/* LEFT SIDE INCLUDING NUMBER */}
      <div className="flex items-center gap-4">

        {/* Number */}
        <span className="text-xl font-semibold text-gray-700">
          {index + 1}.
        </span>

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-5 h-5"
        />

        {/* TEXT OR INPUT */}
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        ) : (
          <span
            className={`text-lg ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* RIGHT SIDE: DATE + BUTTONS */}
      <div className="flex items-center gap-4">

        {/* DUE DATE (Editable) */}
        {isEditing ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        ) : (
          <span className="text-sm text-gray-600">
            {todo.dueDate ? `Due: ${todo.dueDate}` : "No date"}
          </span>
        )}

        {/* EDIT / SAVE */}
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Edit
          </button>
        )}

        {/* DELETE BUTTON */}
        <button
          onClick={() => {
            setDeleting(true);
            setTimeout(() => deleteTodo(todo.id), 300);
          }}
          disabled={deleting}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
        >
          {deleting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </button>

      </div>
    </div>
  );
}
