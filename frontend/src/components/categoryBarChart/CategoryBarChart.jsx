import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import api from "../../api/client"
import { formatCurrency } from "../../utils/formatCurrency/FormatCurrency"

const CategoryBarChart = ({ year, month, currency }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        api.get('/transactions/summary/by-category', { params: { year, month } })
            .then(({data}) => {
                const sorted = [...data.summary].sort((a, b) => Number(b.total) - Number(a.total))
                setData(sorted)
            })
            .finally(() => setLoading(false))
    }, [year, month])

    if (loading) {
        return <p className="text-slate-500 dark:text-slate-400">Caricamento...</p>
    }

    if (data.length === 0) {
        return <p className="text-slate-500 dark:text-slate-400">Nessuna spesa registrata questo mese.</p>
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Spesa per categoria</h2>
            <ResponsiveContainer width="100%" height={data.length * 48 + 20}>
                <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="category" width={100} tick={{ fill: 'currentColor', fontSize: 13 }} />
                    <Tooltip
                        formatter={(value) => formatCurrency(Number(value), currency)}
                        contentStyle={{ borderRadius: 8 }}
                    />
                    <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={24}>
                        {data.map((entry) => (
                            <Cell key={entry.category} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CategoryBarChart
