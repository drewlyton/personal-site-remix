import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

type themeContextValue = {
  theme: themeValue;
  toggleTheme: () => any;
};

const Theme = createContext<themeContextValue>({
  theme: "apache",
  toggleTheme: () => {}
});

type themeValue = "apache" | "midnight";

function switchThemeValue(oldValue: themeValue): themeValue {
  return oldValue === "apache" ? "midnight" : "apache";
}

export const ThemeContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<themeValue>("apache");

  useEffect(() => {
    setTheme(
      (oldValue) => (localStorage.getItem("theme") as themeValue) || oldValue
    );
  }, []);

  useEffect(() => {
    theme === "apache"
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((oldValue) => {
      const newValue = switchThemeValue(oldValue);
      localStorage.setItem("theme", newValue);
      return newValue;
    });
  }, [setTheme]);

  const contextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme
    };
  }, [theme, toggleTheme]);
  return <Theme.Provider value={contextValue}>{children}</Theme.Provider>;
};

export const useTheme = () => useContext(Theme);
