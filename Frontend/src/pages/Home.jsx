import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoFilters from "../components/TodoFilters";
import Logo from "../components/Logo";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  // 🔐 Redirect to login if no token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-start pt-20 px-4">

      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-xl backdrop-blur-xl 
        bg-white/40 dark:bg-gray-800/60 
        border border-white/20 dark:border-gray-600/40"
      >

        {/* Title */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="flex justify-center mt-6 mb-8">
            <Logo size="lg" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">
            ToDo
          </h1>
        </div>

        {/* Input */}
        <TodoInput />

        {/* Todo List */}
        <TodoList />

        {/* Filters */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-300 
            dark:from-gray-900 dark:to-gray-800 
            flex justify-center items-start pt-20 px-4"
        >
          <TodoFilters />
        </div>

      </div>
    </div>
  );
}
