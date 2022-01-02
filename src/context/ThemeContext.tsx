import React from 'react';
import { useTheme } from '../hooks/useTheme';

function noop() {}

export const ThemeContext = React.createContext({
  darkMode: false,
  toggleDarkMode: noop,
})

const ThemeProvider: React.FC = ({children}) => {

  const {darkMode, toggleDarkMode} = useTheme();

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;