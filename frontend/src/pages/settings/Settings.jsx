import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../../context/auth/AuthContext"
import api from "../../api/client"
import { Helmet } from 'react-helmet-async'

const Settings = () => {
    const { user, updateUser, logout } = useAuth()
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({
        name: user.name,
        currency: user.currency
    })
    const [profileSubmitting, setProfileSubmitting] = useState(false)

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [passwordSubmitting, setPasswordSubmitting] = useState(false)

    const [deleting, setDeleting] = useState(false)

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setProfileData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProfileSubmit = async(e) => {
        e.preventDefault()
        setProfileSubmitting(true)

        try {
            const { data } = await api.patch('/users/me', profileData)
            updateUser(data.user)
            toast.success(data.message)
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setProfileSubmitting(false)
        }
    }

    const handlePasswordSubmit = async(e) => {
        e.preventDefault()
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setPasswordSubmitting(true)

        try {
            const { data } = await api.patch('/users/me/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            })
            toast.success(data.message)
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
        } finally {
            setPasswordSubmitting(false)
        }
    }
    const handleDeleteAccount = async() => {
        const confirmed = window.confirm(
            'Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile e cancellerà tutte le tue categorie e transazioni.'
        )

        if (!confirmed) return

        setDeleting(true)

        try {
            await api.delete('/users/me')
            logout()
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong')
            setDeleting(false)
        }
    }

    return (
        <div className="max-w-2xl space-y-8">
            <Helmet>
                <title>Impostazioni - Flowly</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Impostazioni</h1>

            <form onSubmit={handleProfileSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profilo</h2>

                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Nome
                    </label>
                    <input
                        id="name"
                        name="name" 
                        type="text"
                        required
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    />
                </div>

                <div>
                    <label htmlFor="currency" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Valuta
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        value={profileData.currency}
                        onChange={handleProfileChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dollaro USA ($)</option>
                        <option value="GBP">Sterlina (£)</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={profileSubmitting}
                    className="rounded-lg bg-[#2a78d6] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
                >
                    {profileSubmitting ? 'Salvataggio...' : 'Salva modifiche'}
                </button>
            </form>

            {user.provider === 'local' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sicurezza</h2>

                    <div>
                        <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Password attuale
                        </label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            required
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Nuova password
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            required
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Conferma nuova password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#2a78d6] focus:ring-2 focus:ring-[#2a78d6]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={passwordSubmitting}
                        className="rounded-lg bg-[#2a78d6] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1c5cab] disabled:opacity-60 dark:bg-[#3987e5] dark:hover:bg-[#2a78d6]"
                    >
                        {passwordSubmitting ? 'Salvataggio...' : 'Cambia password'}
                    </button>
                </form>
            )}

            <div className="space-y-4 rounded-2xl border border-[#e34948]/30 bg-white p-6 dark:border-[#e34948]/40 dark:bg-slate-900">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Account</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Eliminare l'account cancella permanentemente tutte le tue categorie e transazioni. Questa azione non può essere annullata.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="rounded-lg border border-[#e34948] px-5 py-2 text-sm font-medium text-[#e34948] transition hover:bg-[#e34948] hover:text-white disabled:opacity-60"
                >
                    {deleting ? 'Eliminazione...' : 'Elimina account'}
                </button>
            </div>
        </div>
    )
}

export default Settings
