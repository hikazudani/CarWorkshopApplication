# Car Workshop Application

Aplicação de gerenciamento de oficina (consertos de veículos), organizada como
**monorepo** com backend e frontend separados.

```
.
├── backend/             # API REST em Java 21 + Spring Boot (Spring Security + JWT)
│   ├── Dockerfile.backend    # imagem da API (Maven -> JRE 21)
│   └── Dockerfile.database   # imagem do PostgreSQL
├── frontend/            # SPA em React + TypeScript (Vite)
│   └── Dockerfile.frontend   # build do Vite servido por nginx
└── docker-compose.yml   # orquestra os 3 serviços
```

## Rodando com Docker (recomendado)

O Docker Compose sobe os três serviços de uma vez:

| Serviço    | Imagem / build                 | Função                                   |
| ---------- | ------------------------------ | ---------------------------------------- |
| `db`       | `backend/Dockerfile.database`  | Banco PostgreSQL (volume `pgdata`)       |
| `backend`  | `backend/Dockerfile.backend`   | API Spring Boot                          |
| `frontend` | `frontend/Dockerfile.frontend` | SPA React via nginx (+ proxy para a API) |

```bash
cp .env.example .env     # senhas, JWT_SECRET e admin inicial
docker compose up --build
```

Acesse o frontend em `http://localhost:5173`. O nginx faz proxy de `/login` e
`/consertos` para o backend, evitando CORS. As variáveis ficam em `.env` (veja
`.env.example`): credenciais do Postgres, `JWT_SECRET`, admin inicial
(`APP_ADMIN_LOGIN` / `APP_ADMIN_PASSWORD`) e portas do host. O admin é criado no
primeiro start — nenhuma credencial fica versionada.

Para parar e remover os dados do banco:

```bash
docker compose down -v
```

## Desenvolvimento local (sem Docker)

Suba o backend e, em outro terminal, o frontend. Depois acesse
`http://localhost:5173` e faça login.

### Backend

API Spring Boot com JWT e banco H2 em arquivo (`backend/DATA`), rodando em
`http://localhost:8080`.

```bash
cd backend
./mvnw spring-boot:run
```

O `application.properties` usa o formato `${VAR:padrão}`, então a aplicação roda
com os padrões de desenvolvimento sem nenhuma variável definida. Via
**spring-dotenv**, um `backend/.env` é carregado automaticamente — copie
`backend/.env.example` e ajuste. Variáveis exportadas no SO têm precedência
sobre o `.env`.

| Variável             | Padrão                       | Descrição                    |
| -------------------- | ---------------------------- | ---------------------------- |
| `SERVER_PORT`        | `8080`                       | Porta da API                 |
| `DB_URL`             | `jdbc:h2:file:./DATA/pw3api` | URL do banco                 |
| `DB_USERNAME`        | `sa`                         | Usuário do banco             |
| `DB_PASSWORD`        | _(vazio)_                    | Senha do banco               |
| `H2_CONSOLE_ENABLED` | `true`                       | Habilita o console web do H2 |
| `JWT_SECRET`         | `12345678`                   | Segredo do JWT (troque em produção) |

Exemplo (PowerShell):

```powershell
$env:JWT_SECRET = "um-segredo-forte"
.\mvnw.cmd spring-boot:run
```

**Endpoints** (rotas protegidas exigem `Authorization: Bearer <token>`):

| Método | Rota                    | Descrição                          | Auth |
| ------ | ----------------------- | ---------------------------------- | ---- |
| POST   | `/login`                | Autentica e retorna o token JWT    | Não  |
| GET    | `/consertos`            | Lista paginada de consertos        | Sim  |
| GET    | `/consertos/relatorios` | Lista de consertos ativos (resumo) | Sim  |
| GET    | `/consertos/{id}`       | Detalha um conserto                | Sim  |
| POST   | `/consertos`            | Cadastra um conserto               | Sim  |
| PUT    | `/consertos`            | Atualiza saída / dados do mecânico | Sim  |
| DELETE | `/consertos/{id}`       | Exclusão lógica                    | Sim  |

### Frontend

SPA em React + TypeScript que consome a API. Em desenvolvimento, o proxy do Vite
repassa as chamadas para o backend (`:8080`), evitando CORS. Detalhes em
[`frontend/README.md`](frontend/README.md).

```bash
cd frontend
npm install
npm run dev
```