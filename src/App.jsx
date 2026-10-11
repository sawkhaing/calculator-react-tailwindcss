import { useState } from 'react';

export default function App() {
  const [input, setInput] = useState("0");

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("0");
    } else if (value === "⌫") {
      if (input === "Error") {
        setInput("0");
        return;
      } else {
        setInput(input.length === 1 ? "0" : input.slice(0, -1));
      }
    } else if (value === "=") {
      try {
        const expr = input
          .replaceAll("÷", "/")
          .replaceAll("×", "*")
          .replaceAll("x", "*")
          .replaceAll("%", "/100");
        // Safe evaluation
        const result = Function(`"use strict"; return (${expr})`)();
        setInput(String(result));
      } catch {
        setInput("Error");
      }
    } else if (value === "±") {
      if (input === "0" || input === "Error") return;
      setInput(input.startsWith("-") ? input.slice(1) : "-" + input);
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  const buttons = [
    { label: "⌫", type: "top" },
    { label: "AC", type: "top" },
    { label: "%", type: "top" },
    { label: "÷", type: "top" },

    { label: "7", type: "num" },
    { label: "8", type: "num" },
    { label: "9", type: "num" },
    { label: "×", type: "op" },

    { label: "4", type: "num" },
    { label: "5", type: "num" },
    { label: "6", type: "num" },
    { label: "-", type: "op" },

    { label: "1", type: "num" },
    { label: "2", type: "num" },
    { label: "3", type: "num" },
    { label: "+", type: "op" },

    { label: "±", type: "num" },
    { label: "0", type: "num" },
    { label: ".", type: "num" },
    { label: "=", type: "op" },
  ];

  const getButtonStyle = (type) => {
    const base = "aspect-square rounded-full flex items-center justify-center text-2xl font-medium cursor-pointer select-none transition active:scale-95 hover:opacity-80 ";
    if (type === "top") return base + "bg-neutral-600 text-white";
    if (type === "op") return base + "bg-orange-500 text-white font-semibold";
    return base + "bg-neutral-800 text-white";
  };

  return (
    <main className="min-h-screen bg-neutral-200 flex items-center justify-center p-4">
      <div className="w-[320px] bg-black p-6 rounded-[36px] shadow-2xl flex flex-col justify-end">
        {/* Display */}
        <div className="h-28 flex items-end justify-end px-3 pb-3 overflow-hidden">
          <span className="text-white text-5xl font-light tracking-tight truncate select-none">
            {input}
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleClick(btn.label)}
              className={getButtonStyle(btn.type)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
