"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeContextType = {
  theme: "system",
  setTheme: () => null,
}

const ThemeContext = createContext<ThemeContextType>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (defaultTheme === "system") {
      setTheme("system")
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }
    
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}