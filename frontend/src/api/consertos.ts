import api from './client'
import type {
  AtualizacaoConserto,
  Conserto,
  ConsertoResumo,
  NovoConserto,
} from '../types'

// GET /consertos/relatorios -> lista de consertos ativos (resumo).
export async function listarConsertos(): Promise<ConsertoResumo[]> {
  const { data } = await api.get<ConsertoResumo[]>('/consertos/relatorios')
  return data
}

// GET /consertos/{id} -> detalhamento.
export async function buscarConserto(id: number): Promise<Conserto> {
  const { data } = await api.get<Conserto>(`/consertos/${id}`)
  return data
}

// POST /consertos -> cria e retorna o detalhamento.
export async function criarConserto(payload: NovoConserto): Promise<Conserto> {
  const { data } = await api.post<Conserto>('/consertos', payload)
  return data
}

// PUT /consertos -> atualiza saida / dados do mecanico.
export async function atualizarConserto(
  payload: AtualizacaoConserto,
): Promise<Conserto> {
  const { data } = await api.put<Conserto>('/consertos', payload)
  return data
}

// DELETE /consertos/{id} -> exclusao logica.
export async function excluirConserto(id: number): Promise<void> {
  await api.delete(`/consertos/${id}`)
}
