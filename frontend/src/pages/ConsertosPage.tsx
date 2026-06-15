import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { excluirConserto, listarConsertos } from '../api/consertos'
import type { ConsertoResumo } from '../types'

export default function ConsertosPage() {
  const navigate = useNavigate()
  const [consertos, setConsertos] = useState<ConsertoResumo[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  async function carregar() {
    setCarregando(true)
    setErro(null)
    try {
      setConsertos(await listarConsertos())
    } catch {
      setErro('Nao foi possivel carregar os consertos.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function handleExcluir(id: number) {
    if (!confirm('Excluir este conserto?')) return
    try {
      await excluirConserto(id)
      setConsertos((atual) => atual.filter((c) => c.id !== id))
    } catch {
      setErro('Nao foi possivel excluir o conserto.')
    }
  }

  return (
    <div className="container">
      <div className="actions">
        <h1>Consertos</h1>
        <button onClick={() => navigate('/consertos/novo')}>
          Novo conserto
        </button>
      </div>

      {erro && <p className="error">{erro}</p>}
      {carregando ? (
        <p className="muted">Carregando...</p>
      ) : consertos.length === 0 ? (
        <p className="muted">Nenhum conserto cadastrado.</p>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Entrada</th>
                <th>Saida</th>
                <th>Mecanico</th>
                <th>Marca</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {consertos.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.entrada}</td>
                  <td>{c.saida}</td>
                  <td>{c.nome}</td>
                  <td>{c.marca}</td>
                  <td>
                    <button
                      className="danger"
                      onClick={() => handleExcluir(c.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
