import { useEffect } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from "../../context/auth/AuthContext"

const OAuth = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { loginWithToken } = useAuth()

    useEffect(() => {
        const handleCallback = async() => {
            const token = searchParams.get('token')

            if (!token) {
                toast.error('Something went wrong')
                navigate('/login')
                return
            }

            try {
                await loginWithToken(token)
                navigate('/dashboard')
            } catch (err) {
                toast.error('Something went wrong')
                navigate('/login')
            }
        }

        handleCallback()
    }, [])

    return <p className="p-6 text-slate-500 dark:text-slate-400">Accesso in corso...</p>
}

export default OAuth
