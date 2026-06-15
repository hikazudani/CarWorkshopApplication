import api from './client'
import type { Credenciais, TokenJWT } from '../types'

// POST /login -> { token }
export async function login(credenciais: Credenciais): Promise<string> {
  const { data } = await api.post<TokenJWT>('/login', credenciais)
  return data.token
}
