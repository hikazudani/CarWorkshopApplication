# Car Workshop — Frontend

Frontend simples em **React + TypeScript (Vite)** para consumir a API do
backend Spring Boot deste repositório.

## Funcionalidades

- Login com JWT (`POST /login`), token guardado em `localStorage`
- Rotas protegidas (redireciona ao login sem token; logout limpa a sessão)
- Listagem de consertos ativos (`GET /consertos/relatorios`)
- Cadastro de conserto (`POST /consertos`)
- Exclusão lógica de conserto (`DELETE /consertos/{id}`)

> Parte do monorepo **Car Workshop** — o backend fica em [`../backend`](../backend).
> Veja o [README da raiz](../README.md) para a visão geral.

## Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:8080` (`cd ../backend && ./mvnw spring-boot:run`)

## Como executar

```bash
cd frontend
cp .env.example .env   # ajuste se necessario
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Variáveis de ambiente

Definidas em `.env` (use `.env.example` como base; o `.env` não é versionado).
Apenas variáveis com prefixo `VITE_` ficam acessíveis ao código.

| Variável             | Padrão                  | Descrição                                                       |
| -------------------- | ----------------------- | --------------------------------------------------------------- |
| `VITE_API_BASE_URL`  | _(vazio)_               | Base URL do axios. Vazio = usa o proxy do Vite (dev).           |
| `VITE_BACKEND_URL`   | `http://localhost:8080` | Alvo do proxy de dev (`/login` e `/consertos` vão para ele).    |

## CORS

O backend **não** expõe configuração de CORS. Em desenvolvimento isso é
resolvido pelo **proxy do Vite** (ver `vite.config.ts`): o navegador faz
requisições para a mesma origem (`:5173`) e o Vite as repassa ao backend
(`:8080`).

Para um **deploy de produção** (frontend e backend em origens diferentes),
habilite CORS no backend, por exemplo:

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("https://seu-front.exemplo.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
        }
    };
}
```
