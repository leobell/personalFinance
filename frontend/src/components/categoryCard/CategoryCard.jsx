const CategoryCard = ({ category, onEdit, onDelete }) => (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
            <span className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: category.color }} />
            <p className="font-medium text-slate-900 dark:text-white">{category.name}</p>
        </div>

        <div className="flex items-center gap-2">
            <button
                onClick={() => onEdit(category)}
                aria-label={`Modifica ${category.name}`}
                className="text-slate-400 transition hover:text-[#2a78d6] dark:text-slate-500"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
            </button>
        
            <button
                onClick={() => onDelete(category.id)}
                aria-label={`Elimina ${category.name}`}
                className="text-slate-400 transition hover:text-[#e34948] dark:text-slate-500"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
            </button>
        </div>    
    </div>
)

export default CategoryCard