import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

type themeContextValue = {
  theme: ThemeValue;
  toggleTheme: () => any;
};

const Theme = createContext<themeContextValue>({
  theme: "apache",
  toggleTheme: () => {}
});

type ThemeValue = "apache" | "midnight";

function switchThemeValue(oldValue: ThemeValue): ThemeValue {
  return oldValue === "apache" ? "midnight" : "apache";
}

export const ThemeContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeValue>("apache");

  useEffect(() => {
    // Restore theme from localstorage if we've got one
    setTheme(
      (oldValue) => (localStorage.getItem("theme") as ThemeValue) || oldValue
    );
  }, []);

  useEffect(() => {
    // When theme value changes, update the document body
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
