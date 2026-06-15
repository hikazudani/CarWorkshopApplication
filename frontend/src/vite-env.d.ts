/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL das chamadas da API (vazia = usa o proxy do Vite). */
  readonly VITE_API_BASE_URL?: string
  /** Alvo do proxy de dev do Vite (para onde /login e /consertos vao). */
  readonly VITE_BACKEND_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
