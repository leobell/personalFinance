import toast from "react-hot-toast"
import Logo from "../../components/logo/Logo"
import ThemeToggle from "../../components/themeToggle/ThemeToggle"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth/AuthContext"
import AuthVisual from "../../components/authVisual/AuthVisual"

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await login(email, password)
            navigate('/dashboard')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f9f9f7] p-6 dark:bg-[#0d0d0d]">
            <div className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900 lg:min-h-[600px]">
                <AuthVisual
                    title="Bentornato"
                    subtitle="Accedi per continuare a tracciare dove vanno i tuoi soldi, mese dopo mese."
                />

                <div className="relative flex flex-1 items-center justify-center px-6 py-12">
                    <ThemeToggle className="absolute right-6 top-6" />

                    <div className="w-full max-w-sm space-y-6">
                        <div className="flex justify-center lg:hidden">
                            <Logo iconSize={40} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Accedi</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Inserisci le tue credenziali per continuare.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-[#2a78d6] py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
                            >
                                {loading ? 'Accesso in corso...' : 'Accedi'}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                            Non hai un account?{' '}
                            <Link to="/register" className="font-medium text-[#2a78d6] dark:text-[#3987e5]">
                                Registrati
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default Login    
