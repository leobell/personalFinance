import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import Logo from '../logo/Logo'
import ThemeToggle from '../themeToggle/ThemeToggle'

const HomeIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
    </svg>
)

const ExchangeIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 7h11l-3-3" />
        <path d="M17 17H6l3 3" />
    </svg>
)

const TagIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
)

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { to: '/transactions', label: 'Transazioni', icon: ExchangeIcon },
    { to: '/categories', label: 'Categorie', icon: TagIcon }
]

const Layout = ({ children }) => {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-[#f9f9f7] dark:bg-[#0d0d0d]">
            <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Logo iconSize={28} />

                    <nav className="hidden gap-6 md:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition ${
                                        isActive
                                            ? 'text-[#2a78d6] dark:text-[#3987e5]'
                                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/settings"
                            aria-label="Impostazioni"
                            className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                                <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
                            </svg>
                        </Link>
                        <ThemeToggle />
                        <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:inline">{user?.name}</span>
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            Esci
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-8 pb-24 md:pb-8">
                {children}
            </main>

            <nav className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden">
                <div className="flex justify-around py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex flex-col items-center gap-1 px-4 py-1 text-xs font-medium transition ${
                                        isActive
                                            ? 'text-[#2a78d6] dark:text-[#3987e5]'
                                            : 'text-slate-500 dark:text-slate-400'
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </NavLink>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}

export default Layout