import { createContext, useContext, useEffect, useState } from "react"
import api from '../../api/client'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('flowly_user')

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password })
        const { token, user } = data.result

        localStorage.setItem('flowly_token', token)
        localStorage.setItem('flowly_user', JSON.stringify(user))
        setUser(user)
    }

    const register = async (name, email, password, currency) => {
        const { data } = await api.post('/auth/register', { name, email, password, currency })
        const { token, user } = data.result

        localStorage.setItem('flowly_token', token)
        localStorage.setItem('flowly_user', JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('flowly_token')
        localStorage.removeItem('flowly_user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)