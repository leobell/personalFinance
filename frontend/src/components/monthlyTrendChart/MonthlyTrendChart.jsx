import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency/FormatCurrency'
import { useTheme } from '../../context/theme/ThemeContext'

const monthNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']

const buildMonthlyData = (trend) => {
    return monthNames.map((label, index) => {
        const rows = trend.filter((row) => new Date(row.month).getMonth() === index)
        const income = Number(rows.find((row) => row.type === 'INCOME')?.total || 0)
        const expense = Number(rows.find((row) => row.type === 'EXPENSE')?.total || 0)
        return { month: label, income, expense }
    })
}

const MonthlyTrendChart = ({ trend, currency }) => {
    const { theme } = useTheme()
    const data = buildMonthlyData(trend)

    const tickColor = theme === 'dark' ? '#c3c2b7' : '#52514e'
    const gridColor = theme === 'dark' ? '#2c2c2a' : '#e1e0d9'
    const surfaceColor = theme === 'dark' ? '#1a1a19' : '#fcfcfb'
    const borderColor = theme === 'dark' ? '#2c2c2a' : '#e1e0d9'
    const inkColor = theme === 'dark' ? '#ffffff' : '#0b0b0b'

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Entrate e uscite nell'anno</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ left: 0, right: 0 }}>
                    <CartesianGrid stroke={gridColor} vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={false} />
                    <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip
                        formatter={(value) => formatCurrency(Number(value), currency)}
                        contentStyle={{ borderRadius: 8, backgroundColor: surfaceColor, border: `1px solid ${borderColor}` }}
                        labelStyle={{ color: inkColor }}
                        itemStyle={{ color: inkColor }}
                    />
                    <Legend wrapperStyle={{ fontSize: 13, color: tickColor }} />
                    <Bar dataKey="income" name="Entrate" fill="#008300" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" name="Uscite" fill="#e34948" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )

}

export default MonthlyTrendChart
