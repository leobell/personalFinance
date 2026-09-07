import { motion } from 'framer-motion'

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
}

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const MiniConnectAnim = () => {
    return (
        <svg viewBox="0 0 80 48" className="h-12 w-20">
            <motion.circle
                cx="14" cy="24" r="8"
                fill="#2a78d6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.1, duration: 0.4, ease: 'backOut' }}
            />
            <motion.path
                d="M22 24 L58 24"
                stroke="#6da7ec"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.circle
                cx="66" cy="24" r="8"
                fill="#1c5cab"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.8, duration: 0.4, ease: 'backOut' }}
            />
        </svg>
    )
}

const categoryColors = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4']

const MiniCategoryDots = () => {
    return (
        <svg viewBox="0 0 80 48" className="h-12 w-20">
            {categoryColors.map((color, i) => (
                <motion.circle
                    key={i}
                    cx={10 + i * 15}
                    cy="24"
                    r="7"
                    fill={color}
                    initial={{ scale: 0, y: 10 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.15 * i, duration: 0.4, ease: 'backOut' }}
                />
            ))}
        </svg>
    )
}

const chartBars = [
    { height: 20, color: '#6da7ec' },
    { height: 34, color: '#2a78d6' },
    { height: 14, color: '#6da7ec' },
    { height: 44, color: '#1c5cab' },
    { height: 28, color: '#2a78d6' }
]

const MiniBarChart = () => {
    return (
        <svg viewBox="0 0 80 48" className="h-12 w-20">
            {chartBars.map((bar, i) => (
                <motion.rect
                    key={i}
                    x={i * 17}
                    width="10"
                    rx="2"
                    fill={bar.color}
                    initial={{ height: 0, y: 48 }}
                    whileInView={{ height: bar.height, y: 48 - bar.height }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                />
            ))}
        </svg>
    )
}

const features = [
    {
        title: 'Collega le tue spese',
        description: 'Registra ogni transazione in pochi secondi, entrate e uscite, e tienile tutte in un unico posto.',
        visual: 'connect'
    },
    {
        title: 'Organizza per categoria',
        description: 'Crea le categorie che ti servono davvero — spesa, trasporti, abbonamenti — e assegna ogni transazione in un click.',
        visual: 'categories'
    },
    {
        title: 'Visualizza dove vanno i soldi',
        description: 'Un grafico chiaro per ogni mese: quanto hai speso, in cosa, e come cambia nel tempo.',
        visual: 'bars'
    }
]

const visualComponents = {
    connect: MiniConnectAnim,
    categories: MiniCategoryDots,
    bars: MiniBarChart
}

const Features = () => {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-5xl px-6 py-24"
        >
            <h2 className="mb-10 text-center text-2xl font-bold text-slate-700 dark:text-white sm:text-3xl">
                Cosa puoi fare con Flowly
            </h2>

            <div className="grid gap-8 sm:grid-cols-3">
                {features.map((feature) => {
                    const Visual = visualComponents[feature.visual]

                    return (
                        <motion.div
                            key={feature.title}
                            variants={item}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            <Visual />
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                        </motion.div>
                    )
                })}
            </div>
        </motion.section>
    )
}


export default Features