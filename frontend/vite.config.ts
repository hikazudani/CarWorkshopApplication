import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// O backend Spring Boot nao expoe CORS. Em desenvolvimento, o Vite atua como
// proxy: as chamadas para /login e /consertos sao repassadas para o backend,
// de forma que o navegador enxerga tudo como mesma origem.
//
// O alvo do proxy vem da variavel de ambiente VITE_BACKEND_URL (ver .env).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:8080'

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/login': backendUrl,
        '/consertos': backendUrl,
      },
    },
  }
})
