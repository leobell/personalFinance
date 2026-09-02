import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import Layout from '../layout/Layout'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return null
    if (!user) return <Navigate to="/login" replace />

    return <Layout>{children}</Layout>
}

export default ProtectedRoute
