import React, { createContext, useState } from "react";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [themeData, setThemeData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme ? JSON.parse(savedTheme) : null;
  });

  return (
    <ThemeContext.Provider
      value={{ themeData, setThemeData, selectedTheme, setSelectedTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
