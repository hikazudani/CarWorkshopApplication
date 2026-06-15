import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import ConsertosPage from './pages/ConsertosPage'
import NovoConsertoPage from './pages/NovoConsertoPage'

function Layout({ children }: { children: ReactNode }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <header className="topbar">
        <nav>
          <a href="/consertos">Consertos</a>
        </nav>
        <button className="secondary" onClick={handleSignOut}>
          Sair
        </button>
      </header>
      {children}
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/consertos"
          element={
            <Layout>
              <ConsertosPage />
            </Layout>
          }
        />
        <Route
          path="/consertos/novo"
          element={
            <Layout>
              <NovoConsertoPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/consertos" replace />} />
    </Routes>
  )
}
