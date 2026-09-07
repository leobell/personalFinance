import { Link } from 'react-router-dom'
import Logo from '../../components/logo/Logo'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#f9f9f7] px-6 text-center dark:bg-[#0d0d0d]">
            <Helmet>
                <title>Pagina non trovata - Flowly</title>
            </Helmet>
            <Logo iconSize={40} />

            <div className="space-y-2">
                <h1 className="text-6xl font-bold text-[#2a78d6] dark:text-[#3987e5]">404</h1>
                <p className="text-lg font-medium text-slate-900 dark:text-white">Pagina non trovata</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    La pagina che cerchi non esiste o è stata spostata.
                </p>
            </div>

            <Link
                to="/"
                className="rounded-lg bg-[#2a78d6] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
            >
                Torna alla home
            </Link>
        </div>
    )
}

export default NotFound
