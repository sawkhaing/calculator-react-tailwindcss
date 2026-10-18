import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function Button({ label, onClick, isOperator, isSpecial }) {
  const theme = useContext(ThemeContext);

  let style = "";

  if (isOperator) {
    style = "bg-orange-500 text-white";
  } else if (isSpecial) {
    style =
      theme === "light"
        ? "bg-gray-300 text-black hover:bg-gray-400"
        : "bg-gray-500 text-white hover:bg-gray-400";
  } else {
    style =
      theme === "light"
        ? "bg-gray-200 text-black hover:bg-gray-300"
        : "bg-gray-700 text-white hover:bg-gray-600";
  }

  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={`${style} text-2xl rounded-full flex items-center justify-center hover:opacity-80 w-16 h-16 transition-colors`}
    >
      {label}
    </button>
  );
}
