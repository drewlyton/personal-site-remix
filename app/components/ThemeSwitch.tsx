import React from "react";
import { useTheme } from "../helpers/useTheme";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <label htmlFor="theme" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id="theme"
          type="checkbox"
          className="sr-only"
          checked={theme === "midnight"}
          onChange={toggleTheme}
        />

        <div
          className="
          block
          border-dashed border-2 border-black
          w-12
          h-6
          rounded-full
          dark:border-gray-50
        "
        ></div>

        <div
          className="
          transition-all
          dot
          absolute
          left-1
          top-1
          gradient-bg
          w-4
          h-4
          rounded-full
        "
        ></div>
      </div>
    </label>
  );
};

export default ThemeSwitch;
