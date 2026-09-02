const Logo = ({ iconSize = 32, showTagline = false, className = '' }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <svg width={iconSize} height={iconSize} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 14 L46 14 C54 30 38 45 46 60 C54 75 38 90 46 104 L24 104 Z" fill="#6da7ec" className="dark:fill-[#86b6ef]" />
                <path d="M24 14 L96 14 L96 34 C80 42 65 26 50 34 C35 42 30 26 24 34 Z" fill="#1c5cab" className="dark:fill-[#2a78d6]" />
                <path d="M24 50 L82 50 L82 68 C68 76 55 60 42 68 C34 73 30 62 24 68 Z" fill="#2a78d6" className="dark:fill-[#3987e5]" />
                <circle cx="50" cy="100" r="15" fill="#1baf7a" stroke="#fcfcfb" strokeWidth="4" className="dark:fill-[#199e70] dark:stroke-[#1a1a19]" />
                <text x="50" y="106" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="700" fill="white">$</text>
            </svg>
            <div className="flex flex-col">
                <span className="text-xl font-bold leading-none text-[#2a78d6] dark:text-[#3987e5]">Flowly</span>
                {showTagline && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">See where your money goes.</span>
                )}
            </div>
        </div>
    )
}

export default Logo
