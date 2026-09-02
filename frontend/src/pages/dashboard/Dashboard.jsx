import { useEffect, useState } from "react"
import api from "../../api/client"
import { useAuth } from "../../context/auth/AuthContext"
import { formatCurrency } from "../../utils/formatCurrency/FormatCurrency"
import CategoryBarChart from "../../components/categoryBarChart/CategoryBarChart"
import MonthlyTrendChart from "../../components/monthlyTrendChart/MonthlyTrendChart"
import toast from 'react-hot-toast'

const currentDate = new Date()

const StatTile = ({ label, value, color, currency }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
    <p className="text-sm font-medium text-slate-500  dark:text-slate-400">{label}</p>
    <p className={`mt-2 text-3xl font-bold ${color}`}>
      {formatCurrency(value, currency)}
    </p>
  </div>
)

const Dashboard = () => {
  const { user } = useAuth()
  const [year] = useState(currentDate.getFullYear())
  const [month] = useState(currentDate.getMonth() + 1)
  const [trend, setTrend] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const { data } = await api.get('/transactions/summary/monthly-trend', { params: { year } })
        setTrend(data.trend)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchTrend()
  }, [year])

  if (loading) {
    return <p className="text-slate-500 dark:text-slate-400">Caricamento...</p>
  }

  const currentMonthRows = trend.filter((row) => new Date(row.month).getMonth() + 1 === month)
  const income = Number(currentMonthRows.find((row) => row.type === 'INCOME')?.total || 0)
  const expense = Number(currentMonthRows.find((row) => row.type === 'EXPENSE')?.total || 0)
  const net = income - expense

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Entrate" value={income} color="text-[#008300]" currency={user.currency} />
        <StatTile label="Uscite" value={expense} color="text-[#e34948]" currency={user.currency} />
        <StatTile label="Netto" value={net} color={net >= 0 ? 'text-[#008300]' : 'text-[#e34948]'} currency={user.currency} />
        
      </div>
      <CategoryBarChart year={year} month={month} currency={user.currency} />
      <MonthlyTrendChart trend={trend} currency={user.currency} />
    </div>
  )
}

export default Dashboard
