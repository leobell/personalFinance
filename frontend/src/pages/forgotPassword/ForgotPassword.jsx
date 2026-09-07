import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import api from '../../api/client'
import Logo from '../../components/logo/Logo'
import ThemeToggle from '../../components/themeToggle/ThemeToggle'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await api.post('/auth/forgot-password', { email })
            toast.success(data.message)
            setSent(true)
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#f9f9f7] px-6 dark:bg-[#0d0d0d]">
            <Helmet>
                <title>Password dimenticata - Flowly</title>
            </Helmet>

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

            <div className="w-full max-w-sm space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex justify-center">
                    <Logo iconSize={40} />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Password dimenticata</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Inserisci la tua email, ti manderemo un link per reimpostarla.
                    </p>
                </div>

                {sent ? (
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Se esiste un account con questa email, ti abbiamo inviato un link per reimpostare la password. Controlla la tua casella di posta.
                    </p>
                ) : (
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#2a78d6] py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
                        >
                            {loading ? 'Invio...' : 'Invia link di reset'}
                        </button>
                    </form>
                )}

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    <Link to="/login" className="font-medium text-[#1c5cab] dark:text-[#3987e5]">
                        Torna al login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
