import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import api from '../../api/client'
import Logo from '../../components/logo/Logo'
import ThemeToggle from '../../components/themeToggle/ThemeToggle'

const VerifyEmail = () => {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        const verify = async () => {
            const token = searchParams.get('token')

            if (!token) {
                setStatus('error')
                return
            }

            try {
                await api.post('/auth/verify-email', { token })
                setStatus('success')
            } catch (err) {
                setStatus('error')
            }
        }

        verify()
    }, [])

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#f9f9f7] px-6 text-center dark:bg-[#0d0d0d]">
            <Helmet>
                <title>Verifica email - Flowly</title>
            </Helmet>

            <ThemeToggle className="absolute right-6 top-6" />

            <div className="w-full max-w-sm space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex justify-center">
                    <Logo iconSize={40} />
                </div>

                {status === 'loading' && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Verifica in corso...</p>
                )}

                {status === 'success' && (
                    <>
                        <p className="text-sm text-slate-600 dark:text-slate-300">La tua email è stata verificata con successo.</p>
                        <Link to="/dashboard" className="inline-block rounded-lg bg-[#2a78d6] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]">
                            Vai alla Dashboard
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Il link non è valido o è scaduto. Puoi richiederne uno nuovo dalla Dashboard.</p>
                        <Link to="/login" className="inline-block rounded-lg bg-[#2a78d6] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]">
                            Torna al login
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail