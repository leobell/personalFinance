import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../context/auth/AuthContext"
import Logo from "../../components/logo/Logo"
import ThemeToggle from "../../components/themeToggle/ThemeToggle"
import AuthVisual from "../../components/authVisual/AuthVisual"

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    name:'',
    email:'',
    password:'',
    currency:'EUR'
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegisterData({
      ...registerData,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const { name, email, password, currency } = registerData

    try {
      await register(name, email, password, currency)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f9f7] p-6 dark:bg-[#0d0d0d]">
      <div className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900 lg:min-h-[600px]">
        <AuthVisual
          title="Inizia a tracciare le tue finanze"
          subtitle="Crea un account e scopri in pochi minuti dove vanno davvero i tuoi soldi ogni mese."
        />

        <div className="relative flex flex-1 items-center justify-center px-6 py-12">
          <ThemeToggle className="absolute right-6 top-6" />

          <div className="w-full max-w-sm space-y-6">
            <div className="flex justify-center lg:hidden">
                <Logo iconSize={40} />
            </div>

            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Registrati</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Crea il tuo account per iniziare.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={registerData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
              </div>

              <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={registerData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
              </div>

              <div>
                <label htmlFor="currency" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Valuta
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={registerData.currency}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollaro USA ($)</option>
                  <option value="GBP">Sterlina (£)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#2a78d6] py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
              >
                {loading ? 'Creazione account...' : 'Registrati'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Hai già un account?{' '}
              <Link to="/login" className="font-medium text-[#2a78d6] dark:text-[#3987e5]">
                Accedi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
