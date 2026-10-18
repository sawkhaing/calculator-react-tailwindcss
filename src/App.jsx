import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import Button from "./components/Button";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [input, setInput] = useState("0");
  const [history, setHistory] = useState([]);

  // 2. Fetch history function (from Lab 06 client-server requirement)
  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:8000/history");
      if (response.ok) {
        const data = await response.json();
        const serverList = Array.isArray(data)
          ? data
          : data && Array.isArray(data.history)
          ? data.history
          : null;
        if (serverList && serverList.length > 0) {
          setHistory(serverList);
        }
      }
    } catch {
      // Gracefully continue with local state if backend server is not running
      console.log("Server not reachable, maintaining local history.");
    }
  };

  // 2.1: The component is mounted => useEffect
  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClick = async (value) => {
    // 2.3: The Clear is clicked
    if (value === "AC") {
      setInput("0");
      setHistory([]);
      await fetchHistory();
      return;
    }

    if (value === "⌫") {
      if (input === "Error") {
        setInput("0");
      } else {
        setInput(input.length === 1 ? "0" : input.slice(0, -1));
      }
      return;
    }

    if (value === "±") {
      if (input === "0" || input === "Error") return;
      setInput((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
      return;
    }

    if (value === "%") {
      try {
        const num = parseFloat(input);
        if (!isNaN(num)) {
          setInput(String(num / 100));
        }
      } catch {
        setInput("Error");
      }
      return;
    }

    // 2.2: The = is clicked
    if (value === "=") {
      // Don't calculate or duplicate history if there is no operator
      const hasOperator = /[+−×÷/*-]/.test(input.replace(/^-/, ""));
      if (!hasOperator) return;

      try {
        const expr = input
          .replaceAll("÷", "/")
          .replaceAll("×", "*")
          .replaceAll("−", "-");
        // Safe evaluation
        const result = Function(`"use strict"; return (${expr})`)();
        const resultStr = String(result);

        // Lab 06 history tracking
        const calculation = `${input} = ${resultStr}`;
        setHistory((prev) => [...prev, calculation]);

        setInput(resultStr);

        // Fetch from server as required
        await fetchHistory();
      } catch {
        setInput("Error");
      }
      return;
    }

    // Number or operator
    setInput((prev) => {
      if (prev === "0" || prev === "Error") {
        return ["+", "−", "×", "÷"].includes(value) ? "0" + value : value;
      }
      return prev + value;
    });
  };

  const topRow = ["⌫", "AC", "%", "÷"];
  const rows = [
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="],
  ];

  return (
    // 3. Theme Provider
    <ThemeContext.Provider value={theme}>
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900"
        }`}
      >
        {/* 3. Light / Dark mode toggle with Moon / Sun icons */}
        <div className="w-80 flex justify-end mb-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2.5 rounded-full text-xl flex items-center justify-center cursor-pointer shadow-md transition-colors ${
              theme === "light"
                ? "bg-white text-gray-800 hover:bg-gray-200"
                : "bg-gray-800 text-yellow-300 hover:bg-gray-700"
            }`}
            title="Toggle theme"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Calculator Body (Lab 07 iOS design) */}
        <div
          className={`rounded-3xl p-5 shadow-2xl w-80 transition-colors ${
            theme === "light"
              ? "bg-white border border-gray-200"
              : "bg-black"
          }`}
        >
          {/* Display */}
          <div
            className={`text-right text-5xl font-light p-4 mb-2 overflow-x-auto select-none ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            {input}
          </div>

          {/* Top Row */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            {topRow.map((btn) => (
              <Button
                key={btn}
                label={btn}
                onClick={handleClick}
                isSpecial={btn !== "÷"}
                isOperator={btn === "÷"}
              />
            ))}
          </div>

          {/* Number/Operator Rows */}
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 mb-3">
              {row.map((btn) => {
                const isOperator = ["÷", "×", "−", "+", "=", "<"].includes(btn);
                const isSpecial = btn === "±";
                return (
                  <Button
                    key={btn}
                    label={btn}
                    onClick={handleClick}
                    isOperator={isOperator}
                    isSpecial={isSpecial}
                  />
                );
              })}
            </div>
          ))}

          {/* History Section (Merged from Lab 06) */}
          <div className="mt-4 pt-3 border-t border-gray-600/30">
            <div className="flex justify-between items-center mb-2">
              <h2
                className={`text-xs font-semibold uppercase tracking-wider ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                History ({history.length})
              </h2>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className={`text-[11px] px-2 py-0.5 rounded cursor-pointer transition ${
                    theme === "light"
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  Clear History
                </button>
              )}
            </div>

            <div
              className={`max-h-32 overflow-y-auto rounded p-2 text-xs font-mono ${
                theme === "light"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-800/80 text-gray-200"
              }`}
            >
              {history.length === 0 ? (
                <p className="opacity-50 text-center py-2">No history</p>
              ) : (
                <ul className="space-y-1">
                  {history.map((item, index) => (
                    <li key={index} className="text-right">
                      {typeof item === "string"
                        ? item
                        : item.expression
                        ? `${item.expression} = ${item.result}`
                        : JSON.stringify(item)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
