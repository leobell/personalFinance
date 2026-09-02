import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../../components/logo/Logo'
import ThemeToggle from '../../components/themeToggle/ThemeToggle'

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.4 }
    }
}

const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const dataPoints = [
    { x: 350, y: 280 },
    { x: 620, y: 200 },
    { x: 900, y: 140 },
    { x: 1200, y: 80 }
]

const linePath = 'M0,320 C150,340 250,260 350,280 C450,300 500,180 620,200 C740,220 800,120 900,140 C1000,160 1050,60 1200,80'
const areaPath = `${linePath} L1200,400 L0,400 Z`

const Hero = () => {
    return (
        <div className="relative overflow-hidden dark:bg-[#0d0d0d]">
            <ThemeToggle className='absolute right-6 top-6  z-10'/>
            <div className="pointer-events-none absolute inset-0 flex justify-center">
                <div className="mt-20 h-105 w-175 rounded-full bg-[#2a78d6]/15 blur-3xl dark:bg-[#3987e5]/20" />
            </div>

            <svg
                viewBox="0 0 1200 400"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" className="[stop-color:#2a78d6] dark:[stop-color:#3987e5]" stopOpacity="0.3" />
                        <stop offset="100%" className="[stop-color:#2a78d6] dark:[stop-color:#3987e5]" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <motion.path
                    d={areaPath}
                    fill="url(#areaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                />

                <motion.path
                    d={linePath}
                    fill="none"
                    stroke="#2a78d6"
                    className="dark:stroke-[#3987e5]"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                />

                {dataPoints.map((point, i) => (
                    <motion.circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="#2a78d6"
                        className="dark:fill-[#3987e5]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + i * 0.15, duration: 0.3 }}
                    />
                ))}
            </svg>

            <motion.div
                className="absolute left-[6%] top-[36%] hidden sm:block"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ delay: 2.3, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
                >
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tracciato questo mese</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">€2.480</p>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute right-[7%] top-[18%] hidden sm:block"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ delay: 2.6, duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
                >
                    <p className="text-xs text-slate-500 dark:text-slate-400">Organizzate in</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">12 categorie</p>
                </motion.div>
            </motion.div>

            <motion.section
                variants={container}
                initial="hidden"
                animate="visible"
                className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-32 text-center"
            >
                <motion.div variants={item}>
                    <Logo iconSize={56} />
                </motion.div>

                <motion.h1 variants={item} className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    Track every euro. See where it goes.
                </motion.h1>

                <motion.p variants={item} className="max-w-xl text-lg text-slate-600 dark:text-slate-400">
                    Flowly collega le tue spese, le organizza in categorie e ti mostra ogni mese, con grafici puliti, dove finiscono davvero i tuoi soldi.
                </motion.p>

                <motion.div variants={item} className="flex gap-4">
                    <Link
                        to="/login"
                        className="rounded-lg bg-[#2a78d6] px-6 py-3 font-medium text-white transition hover:bg-[#1c5cab] dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
                    >
                        Accedi
                    </Link>
                    <Link
                        to="/register"
                        className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                    >
                        Registrati
                    </Link>
                </motion.div>
            </motion.section>
        </div>
    )
}

export default Hero
