import React, { createContext, useContext } from 'react'
import lightTheme from '../../assets/themes/light.json'

const themesContext = createContext();

function useThemes() {
  return useContext(themesContext);
}

function useTheme() {
  return useThemes()["light"]
}

function ProvideThemes({ children }) {
  const themes = {
    "light": lightTheme
  }

  return (
    <themesContext.Provider value={themes}>
      {children}
    </themesContext.Provider>
  )
}

export {
  themesContext,
  useThemes,
  useTheme,
  ProvideThemes,
} 