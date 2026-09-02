import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('flowly_theme')

        if (stored) return stored

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        const root = document.documentElement

        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        localStorage.setItem('flowly_theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)