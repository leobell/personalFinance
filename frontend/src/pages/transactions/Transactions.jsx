import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import api from "../../api/client"
import { useAuth } from "../../context/auth/AuthContext"
import TransactionRow from "../../components/transactionRow/TransactionRow"
import { Helmet } from 'react-helmet-async'

const Transactions = () => {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ 
    amount: '', 
    description: '', 
    date: '', 
    type: 'EXPENSE', 
    categoryId: '' 
  })
  const formRef = useRef(null)

  const filteredCategories = categories.filter((category) => category.type === formData.type)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const [transactionsRes, categoriesRes] = await Promise.all([
          api.get('/transactions'),
          api.get('/categories')
        ])
        setTransactions(transactionsRes.data.transactions)
        setCategories(categoriesRes.data.categories)
      } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'type') {
      const nextCategories = categories.filter((category) => category.type === value)
      setFormData((prev) => ({ ...prev, type: value, categoryId: nextCategories[0]?.id ?? '' }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (transaction) => {
    setEditingId(transaction.id)
    setFormData({
      amount: transaction.amount,
      description: transaction.description || '',
      date: transaction.date.slice(0, 10),
      type: transaction.type,
      categoryId: transaction.categoryId
    })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ 
      amount: '', 
      description: '', 
      date: '', 
      type: 'EXPENSE', 
      categoryId: '' 
    })
  }

  const handleDelete = async(id) => {
    try {
      const { data } = await api.delete(`/transactions/${id}`)
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
      toast.success(data.message)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingId) {
        const { data } = await api.patch(`/transactions/${editingId}`, formData)
        setTransactions((prev) => prev.map((transaction) => (transaction.id === editingId ? data.transaction : transaction)))
        toast.success(data.message)
        handleCancelEdit()
      } else {
        const { data } = await api.post('/transactions', formData)
        setTransactions((prev) => [data.transaction, ...prev])
        toast.success(data.message)
        setFormData({ amount: '', description: '', date: '', type: 'EXPENSE', categoryId: '' })
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-slate-500 dark:text-slate-400">Caricamento...</p>
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Transazioni - Flowly</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transazioni</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="EXPENSE">Uscita</option>
            <option value="INCOME">Entrata</option>
          </select>
        </div>

        <div>
          <label htmlFor="categoryId" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Categoria
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="" disabled>Seleziona una categoria</option>
            {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Importo
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Data
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Descrizione (opzionale)
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#2a78d6] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
          >
            {submitting ? 'Salvataggio...' : editingId ? 'Salva modifiche' : 'Aggiungi transazione'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Annulla modifica
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {transactions.length === 0 ? (
          <p className="p-6 text-sm text-slate-500 dark:text-slate-400">Nessuna transazione registrata.</p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                currency={user.currency}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Transactions
