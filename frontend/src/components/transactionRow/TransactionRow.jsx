import { formatCurrency } from "../../utils/formatCurrency/FormatCurrency"

const TransactionRow = ({ transaction, currency, onEdit, onDelete }) => (
    <li className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: transaction.category.color }} />
            <div>
                <p className="font-medium text-slate-900 dark:text-white">
                    {transaction.description || transaction.category.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    {transaction.category.name} · {new Date(transaction.date).toLocaleDateString('it-IT')}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <p className={`font-semibold ${transaction.type === 'INCOME' ? 'text-[#008300]' : 'text-[#e34948]'}`}>
                {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(Number(transaction.amount), currency)}
            </p>

            <button
                onClick={() => onEdit(transaction)}
                aria-label="Modifica transazione"
                className="text-slate-400 transition hover:text-[#1c5cab] dark:text-slate-500"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
            </button>

            <button
                onClick={() => onDelete(transaction.id)}
                aria-label="Elimina transazione"
                className="text-slate-400 transition hover:text-[#e34948] dark:text-slate-500"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
            </button>
        </div>
    </li>
)

export default TransactionRow