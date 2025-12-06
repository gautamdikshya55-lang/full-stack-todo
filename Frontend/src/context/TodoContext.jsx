import { createContext, useContext, useState, useEffect } from "react";
import { getTodos, addTodoAPI, updateTodoAPI, deleteTodoAPI } from "../services/todos";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("latest");

  const token = localStorage.getItem("token");

  // ⭐ LOAD TODOS FROM BACKEND
  useEffect(() => {
    if (!token) return;

    async function load() {
      setLoading(true);

      const data = await getTodos(token);

      if (Array.isArray(data)) {
        const cleaned = data.map(todo => ({
          ...todo,
          dueDate: todo.dueDate ? todo.dueDate.split("T")[0] : ""
        }));
        setTodos(cleaned);
      }

      setLoading(false);
    }

    load();
  }, [token]);

  // ⭐ ADD TODO
  const addTodo = async (text, dueDate) => {
    if (!token) return;

    setLoading(true);

    const newTodo = await addTodoAPI({ text, dueDate }, token);

    if (newTodo && newTodo.id) {
      setTodos(prev => [
        {
          ...newTodo,
          dueDate: newTodo.dueDate ? newTodo.dueDate.split("T")[0] : ""
        },
        ...prev,
      ]);
    }

    setLoading(false);
  };

  // ⭐ TOGGLE TODO COMPLETION
  const toggleTodo = async (id) => {
    const current = todos.find(t => t.id === id);
    if (!current) return;

    const updated = await updateTodoAPI(id, { completed: !current.completed }, token);

    if (updated && updated.id) {
      setTodos(prev =>
        prev.map(t =>
          t.id === id ? { ...t, completed: updated.completed } : t
        )
      );
    }

    setFilter("completed");
  };

  // ⭐ EDIT TODO TEXT + DATE
  const editTodo = async (id, newText, newDate) => {
    const updated = await updateTodoAPI(id, { text: newText, dueDate: newDate }, token);

    if (updated && updated.id) {
      setTodos(prev =>
        prev.map(t =>
          t.id === id
            ? {
                ...t,
                text: updated.text,
                dueDate: updated.dueDate ? updated.dueDate.split("T")[0] : "",
              }
            : t
        )
      );
    }
  };

  // ⭐ DELETE TODO
  const deleteTodo = async (id) => {
    await deleteTodoAPI(id, token);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // ⭐ SORT TODOS
  const sortTodos = (list) => {
    let sorted = [...list];

    if (sortBy === "latest") sorted.sort((a, b) => b.id - a.id);
    if (sortBy === "oldest") sorted.sort((a, b) => a.id - b.id);

    if (sortBy === "due-soon") {
      sorted.sort(
        (a, b) =>
          new Date(a.dueDate || Infinity) -
          new Date(b.dueDate || Infinity)
      );
    }

    if (sortBy === "due-far") {
      sorted.sort(
        (a, b) =>
          new Date(b.dueDate || 0) -
          new Date(a.dueDate || 0)
      );
    }

    return sorted;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        editTodo,
        deleteTodo,

        filter,
        setFilter,

        sortBy,
        setSortBy,
        sortTodos,

        loading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
