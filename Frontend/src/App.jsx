import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { TodoProvider } from "./context/TodoContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";

// ----- THEME DROPDOWN COMPONENT -----
function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 
        rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 
        transition flex items-center gap-1"
      >
        Theme ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 
          shadow-lg rounded-lg p-2 border border-gray-200 dark:border-gray-700 z-50"
        >
          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 
            dark:hover:bg-gray-700 rounded"
          >
            Light
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 
            dark:hover:bg-gray-700 rounded"
          >
            Dark
          </button>
        </div>
      )}
    </div>
  );
}

// -------- LOGIN / LOGOUT BUTTONS --------
function AuthButtons() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex items-center gap-4">
      {!token ? (
        <>
          <Link
            to="/login"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100 
            hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100 
            hover:text-blue-600 transition"
          >
            Register
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="px-3 py-1 font-semibold bg-red-500 text-white rounded-lg 
          hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
}

// ----- MAIN APP -----
function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <BrowserRouter>

          {/* NAVBAR */}
          <nav
            className="w-full bg-white/70 dark:bg-gray-900 backdrop-blur-md 
            border-b border-gray-300 dark:border-gray-700 shadow-sm"
          >
            <div
              className="max-w-6xl mx-auto px-6 py-4 
              flex justify-between items-center"
            >
              {/* LEFT SIDE LINKS */}
              <div className="flex gap-10">
                <Link
                  to="/"
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 
                  hover:text-blue-600 transition"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="text-2xl font-bold text-gray-800 dark:text-gray-100 
                  hover:text-blue-600 transition"
                >
                  About
                </Link>
              </div>

              {/* RIGHT SIDE - THEME & LOGIN/LOGOUT */}
              <div className="flex items-center gap-6">
                <ThemeDropdown />
                <AuthButtons />
              </div>
            </div>
          </nav>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

        </BrowserRouter>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
