import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, filter, sortTodos } = useTodos();   // ⭐ added sortTodos

  const filtered =
    filter === "completed"
      ? todos.filter((t) => t.completed)
      : filter === "pending"
      ? todos.filter((t) => !t.completed)
      : todos;

  if (filtered.length === 0)
    return (
      <p className="text-center text-gray-700 mb-4 animate-pulse">
        No tasks found.
      </p>
    );

  return (
    <div className="space-y-3">

      {/* ⭐ SORT BEFORE DISPLAYING */}
      {sortTodos(filtered).map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
      ))}

    </div>
  );
}
