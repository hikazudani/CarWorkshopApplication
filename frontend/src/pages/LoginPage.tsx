import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const destino =
    (location.state as { from?: string } | null)?.from ?? '/consertos'

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setErro(null)
    setCarregando(true)
    try {
      await signIn({ login, senha })
      navigate(destino, { replace: true })
    } catch {
      setErro('Login ou senha invalidos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="container">
      <form className="card card--narrow" onSubmit={handleSubmit}>
        <h1>Car Workshop</h1>
        <label htmlFor="login">Login</label>
        <input
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          autoComplete="username"
          required
        />
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          required
        />
        {erro && <p className="error">{erro}</p>}
        <button className="btn-full" type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
