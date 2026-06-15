import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarConserto } from '../api/consertos'

const ESTADO_INICIAL = {
  entrada: '',
  saida: '',
  mecanicoNome: '',
  mecanicoExperiencia: '',
  marca: '',
  modelo: '',
  cor: '',
  ano: '',
}

export default function NovoConsertoPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)

  function update(campo: keyof typeof ESTADO_INICIAL, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setErro(null)
    setSalvando(true)
    try {
      await criarConserto({
        entrada: form.entrada,
        saida: form.saida,
        mecanico: {
          nome: form.mecanicoNome,
          experiencia: form.mecanicoExperiencia || undefined,
        },
        veiculo: {
          marca: form.marca,
          modelo: form.modelo,
          cor: form.cor || undefined,
          ano: form.ano,
        },
      })
      navigate('/consertos')
    } catch {
      setErro('Nao foi possivel cadastrar. Verifique os campos e tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Novo conserto</h1>

        <div className="row">
          <div>
            <label htmlFor="entrada">Entrada (dd/MM/aaaa)</label>
            <input
              id="entrada"
              placeholder="01/06/2026"
              value={form.entrada}
              onChange={(e) => update('entrada', e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="saida">Saida (dd/MM/aaaa)</label>
            <input
              id="saida"
              placeholder="05/06/2026"
              value={form.saida}
              onChange={(e) => update('saida', e.target.value)}
              required
            />
          </div>
        </div>

        <fieldset>
          <legend>Mecanico</legend>
          <label htmlFor="mecanicoNome">Nome</label>
          <input
            id="mecanicoNome"
            value={form.mecanicoNome}
            onChange={(e) => update('mecanicoNome', e.target.value)}
            required
          />
          <label htmlFor="mecanicoExperiencia">Experiencia</label>
          <input
            id="mecanicoExperiencia"
            value={form.mecanicoExperiencia}
            onChange={(e) => update('mecanicoExperiencia', e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Veiculo</legend>
          <div className="row">
            <div>
              <label htmlFor="marca">Marca</label>
              <input
                id="marca"
                value={form.marca}
                onChange={(e) => update('marca', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="modelo">Modelo</label>
              <input
                id="modelo"
                value={form.modelo}
                onChange={(e) => update('modelo', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="cor">Cor</label>
              <input
                id="cor"
                value={form.cor}
                onChange={(e) => update('cor', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ano">Ano (aaaa)</label>
              <input
                id="ano"
                placeholder="2020"
                value={form.ano}
                onChange={(e) => update('ano', e.target.value)}
                required
              />
            </div>
          </div>
        </fieldset>

        {erro && <p className="error">{erro}</p>}

        <div className="row" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/consertos')}
          >
            Cancelar
          </button>
          <button type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  )
}
