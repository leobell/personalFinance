import toast from "react-hot-toast"
import Logo from "../../components/logo/Logo"
import ThemeToggle from "../../components/themeToggle/ThemeToggle"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth/AuthContext"
import AuthVisual from "../../components/authVisual/AuthVisual"
import { Helmet } from 'react-helmet-async'


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
            <Helmet>
                <title>Accedi - Flowly</title>
                <meta name="description" content="Accedi a Flowly per continuare a tracciare le tue finanze." />
            </Helmet>
            <div className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900 lg:min-h-150">
                <AuthVisual
                    title="Bentornato"
                    subtitle="Accedi per continuare a tracciare dove vanno i tuoi soldi, mese dopo mese."
                />

                <div className="relative flex flex-1 items-center justify-center px-6 py-12">
                    <Link
                        to="/"
                        className="absolute left-6 top-6 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                        Home
                    </Link>
                    <ThemeToggle className="absolute right-6 top-6" />

                    <div className="w-full max-w-sm space-y-6">
                        <div className="flex justify-center lg:hidden">
                            <Logo iconSize={40} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Accedi</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Inserisci le tue credenziali per continuare.</p>
                        </div>

                        <a
                            href={`${import.meta.env.VITE_API_URL}/auth/google`}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continua con Google
                        </a>

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
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm font-medium text-[#1c5cab] dark:text-[#3987e5]">
                                    Password dimenticata?
                                </Link>
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
                            <Link to="/register" className="font-medium text-[#1c5cab] dark:text-[#3987e5]">
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
