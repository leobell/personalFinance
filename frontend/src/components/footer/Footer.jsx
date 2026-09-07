import { Link } from "react-router-dom"
import Logo from "../logo/Logo"

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
                <Logo iconSize={24} />
                
                <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <Link to="/privacy" className="transition hover:text-slate-900 dark:hover:text-white">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="transition hover:text-slate-900 dark:hover:text-white">
                        Termini di Servizio
                    </Link>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} Flowly
                </p>
            </div>
        </footer>
  )
}

export default Footer
