import { useEffect, useState, useRef } from "react"
import api from "../../api/client"
import toast from 'react-hot-toast'
import CategoryCard from "../../components/categoryCard/CategoryCard"
import { Helmet } from 'react-helmet-async'

const categoryPalette = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948']

const getSuggestedColor = (categories) => {
    const usageCount = categoryPalette.map((color) =>
        categories.filter((category) => category.color === color).length
    )
    const minUsage = Math.min(...usageCount)
    const index = usageCount.indexOf(minUsage)
    return categoryPalette[index]
}

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    type:'EXPENSE',
    color: categoryPalette[0]
  })
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const { data } = await api.get('/categories')
        setCategories(data.categories)
        setFormData((prev) => ({
          ...prev,
          color: getSuggestedColor(data.categories)
        }))
      } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDelete = async(id) => {
    try {
      const { data } = await api.delete(`/categories/${id}`)
      setCategories((prev) => prev.filter((category) => category.id !== id))
      toast.success(data.message)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleEdit = async(category) => {
    setEditingId(category.id)
    setFormData({ name: category.name, type: category.type, color: category.color })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', type: 'EXPENSE', color: getSuggestedColor(categories) })
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingId) {
        const { data } = await api.patch(`/categories/${editingId}`, formData)
        setCategories((prev) => prev.map((category) => (category.id === editingId ? data.category : category)))
        toast.success(data.message)
        handleCancelEdit()
      } else {
        const { data } = await api.post('/categories', formData)
        const updated = [...categories, data.category]
        setCategories(updated)
        setFormData({ name:'', type: 'EXPENSE', color: getSuggestedColor(updated) })
        toast.success(data.message)
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

  const incomeCategories = categories.filter((category) => category.type === 'INCOME')
  const expenseCategories = categories.filter((category) => category.type === 'EXPENSE')

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Categorie - Flowly</title>
      </Helmet>
      
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Categorie</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

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
          <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Colore</p>
          <div className="flex flex-wrap gap-2">
            {categoryPalette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, color }))}
                className={`h-7 w-7 rounded-full ${formData.color === color ? 'ring-2 ring-slate-900 ring-offset-2 dark:ring-white dark:ring-offset-slate-900' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Scegli colore ${color}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#2a78d6] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
          >
            {submitting ? 'Salvataggio...' : editingId ? 'Salva modifiche' : 'Aggiungi categoria'}
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

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Entrate</h2>
          {incomeCategories.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Nessuna categoria di entrata.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {incomeCategories.map((category) => (
                <CategoryCard key={category.id} category={category} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Uscite</h2>
          {expenseCategories.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Nessuna categoria di uscita.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expenseCategories.map((category) => (
                <CategoryCard key={category.id} category={category} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
