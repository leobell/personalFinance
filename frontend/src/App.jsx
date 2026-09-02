import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/auth/AuthContext'
import { ThemeProvider } from './context/theme/ThemeContext'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Transactions from './pages/transactions/Transactions'
import Categories from './pages/categories/Categories'
import Home from './pages/home/Home'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            } />
            <Route path="/categories" element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position='bottom-right' />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
