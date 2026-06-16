# Car Workshop - Backend

API REST para gerenciamento de consertos de uma oficina mecanica, construida com
Spring Boot. Autenticacao via JWT, persistencia em JPA e schema versionado com
Flyway (migrations especificas por banco: H2 em desenvolvimento, PostgreSQL em
producao/Docker).

## Stack

- Java 21
- Spring Boot 3.3.4 (Web, Data JPA, Security, Validation)
- Flyway (migrations)
- H2 (desenvolvimento) / PostgreSQL (Docker)
- JWT (com.auth0:java-jwt)
- spring-dotenv (carrega o arquivo `.env` automaticamente)
- Lombok
- Maven

## Pre-requisitos

- JDK 21
- Maven (ou use o wrapper `./mvnw`)
- Docker (opcional, apenas para rodar com PostgreSQL via container)

## Configuracao

As configuracoes vem de variaveis de ambiente, consumidas em
`application.properties` no formato `${VAR:padrao}`. Em desenvolvimento, copie o
template e ajuste:

```bash
cp .env.example .env
```

Variaveis principais:

| Variavel              | Obrigatoria | Padrao                          | Descricao                                  |
|-----------------------|-------------|---------------------------------|--------------------------------------------|
| `SERVER_PORT`         | nao         | `8080`                          | Porta da API                               |
| `DB_URL`              | nao         | `jdbc:h2:file:./DATA/pw3api`    | URL JDBC do banco                          |
| `DB_USERNAME`         | nao         | `sa`                            | Usuario do banco                           |
| `DB_PASSWORD`         | nao         | (vazio)                         | Senha do banco                             |
| `H2_CONSOLE_ENABLED`  | nao         | `true`                          | Habilita o console web do H2               |
| `JWT_SECRET`          | sim         | -                               | Segredo do JWT; a app nao sobe sem ele     |
| `APP_ADMIN_LOGIN`     | nao         | (vazio)                         | Login do admin criado no primeiro startup  |
| `APP_ADMIN_PASSWORD`  | nao         | (vazio)                         | Senha do admin criado no primeiro startup  |

Variaveis exportadas no ambiente do SO tem precedencia sobre o arquivo `.env`.
Se `APP_ADMIN_LOGIN`/`APP_ADMIN_PASSWORD` ficarem vazios, nenhum usuario e criado
no startup.

## Executando em desenvolvimento (H2)

Garanta um `JWT_SECRET` no `.env`, depois:

```bash
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`. O console do H2 fica em
`http://localhost:8080/h2-console` (quando `H2_CONSOLE_ENABLED=true`).

## Executando com PostgreSQL (Docker)

A partir da raiz do repositorio, o `docker-compose.yml` orquestra banco, backend
e frontend. Configure o `.env` da raiz e suba:

```bash
docker compose up --build
```

O backend usa as migrations de `db/migration/postgresql`. O schema e versionado
pelo Flyway (`ddl-auto=none`); novas alteracoes de schema devem ser adicionadas
como novas migrations em ambos os diretorios (`h2` e `postgresql`), mantendo a
mesma versao e numeracao.

## Build

```bash
./mvnw clean package          # gera o jar em target/
./mvnw clean package -DskipTests   # sem rodar os testes
```

## Testes

```bash
./mvnw test
```

## Endpoints

Autenticacao:

| Metodo | Rota     | Descricao                                  |
|--------|----------|--------------------------------------------|
| POST   | `/login` | Autentica e retorna o token JWT            |

Consertos (requerem token JWT no header `Authorization: Bearer <token>`):

| Metodo | Rota                     | Descricao                              |
|--------|--------------------------|----------------------------------------|
| POST   | `/consertos`             | Cadastra um conserto                   |
| GET    | `/consertos`             | Lista consertos (paginado)             |
| GET    | `/consertos/relatorios`  | Lista os consertos ativos              |
| GET    | `/consertos/{id}`        | Busca um conserto por id               |
| PUT    | `/consertos`             | Atualiza um conserto                   |
| DELETE | `/consertos/{id}`        | Exclusao logica (marca como inativo)   |

## Estrutura

```
backend/
  src/main/java/com/lhjundi/car_workshop/
    config/        # inicializacao (ex.: seed do admin)
    controller/    # endpoints REST
    model/         # entidades e DTOs
    repository/    # repositorios JPA
    services/      # regras de negocio / autenticacao
    utils/         # seguranca (JWT, filtros) e tratamento de erros
  src/main/resources/
    application.properties
    db/migration/h2/          # migrations Flyway para H2
    db/migration/postgresql/  # migrations Flyway para PostgreSQL
```
