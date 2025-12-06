// src/components/Logo.jsx
export default function Logo({ size = "lg" }) {
  const iconSize =
    size === "lg" ? "w-12 h-12" : "w-9 h-9";

  const textSize =
    size === "lg"
      ? "text-3xl md:text-4xl"
      : "text-xl md:text-2xl";

  return (
    <div className="flex items-center gap-3">
      {/* Moving + glowing icon */}
      <div
        className={`relative flex items-center justify-center ${iconSize} rounded-2xl
        bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400
        shadow-lg shadow-blue-300/50 animate-bounce`}
      >
        {/* inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm animate-pulse" />

        {/* checkmark icon */}
        <span className="relative text-2xl font-bold text-white">
          ✓
        </span>
      </div>

      {/* Brand text */}
      <span
        className={`${textSize} font-extrabold tracking-tight text-gray-900`}
      >
       
      </span>
    </div>
  );
}
