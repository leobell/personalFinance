import { motion } from 'framer-motion'

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const AuthVisual = ({ title, subtitle }) => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative hidden overflow-hidden bg-gradient-to-br from-[#1c5cab] via-[#2a78d6] to-[#6da7ec] lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-10"
        >
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice">
                <circle cx="420" cy="620" r="160" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="40" />
                <circle cx="420" cy="620" r="160" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="40" strokeDasharray="180 1000" strokeLinecap="round" />
                <circle cx="420" cy="620" r="160" fill="none" stroke="#1baf7a" strokeOpacity="0.7" strokeWidth="40" strokeDasharray="90 1000" strokeDashoffset="-180" strokeLinecap="round" />

                <rect x="40" y="120" width="18" height="50" rx="4" fill="white" fillOpacity="0.3" />
                <rect x="66" y="90" width="18" height="80" rx="4" fill="white" fillOpacity="0.5" />
                <rect x="92" y="140" width="18" height="30" rx="4" fill="white" fillOpacity="0.3" />

                <circle cx="130" cy="300" r="5" fill="white" fillOpacity="0.5" />
                <circle cx="170" cy="330" r="5" fill="white" fillOpacity="0.35" />
                <circle cx="110" cy="350" r="5" fill="white" fillOpacity="0.5" />
            </svg>

            <motion.span variants={item} className="relative text-xl font-bold text-white">
                Flowly
            </motion.span>

            <div className="relative space-y-3">
                <motion.h2 variants={item} className="text-3xl font-bold text-white">
                    {title}
                </motion.h2>
                <motion.p variants={item} className="max-w-sm text-blue-100">
                    {subtitle}
                </motion.p>
            </div>
        </motion.div>
    )
}

export default AuthVisual