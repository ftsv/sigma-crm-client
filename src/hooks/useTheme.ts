import React, { useEffect, useState } from 'react';

const storageName = 'Theme';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false)

  function toggleDarkMode() {
    localStorage.setItem(storageName, JSON.stringify({
      darkMode: !darkMode
    }));

    setDarkMode(!darkMode);
  }

  // initial state of Theme from localStorage at loading
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}')

    if (data && data.darkMode) {
      setDarkMode(data.darkMode);
    }
  }, []);

  return {darkMode, toggleDarkMode}
}
