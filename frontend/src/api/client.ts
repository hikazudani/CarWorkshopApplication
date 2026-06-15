import axios from 'axios'

export const TOKEN_KEY = 'cw_token'

// baseURL vem de VITE_API_BASE_URL (ver .env). Vazia (padrao) faz as
// requisicoes irem para a mesma origem, onde o proxy do Vite (vite.config.ts)
// repassa /login e /consertos para o backend. Em producao, defina a URL real.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
})

// Injeta o token JWT (quando existir) em toda requisicao.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Se o token expirar/for invalido, limpa a sessao e volta para o login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem(TOKEN_KEY)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default api
