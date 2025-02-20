# Teddy Back

Este é um backend desenvolvido com **NestJS** e **TypeORM**, utilizando PostgreSQL como banco de dados.
É um sistema para gerenciamento de clientes

Para ver o front que roda esse back, acesse:
https://github.com/JadisDev/teddy-front.git

## 📦 Tecnologias utilizadas

- **NestJS 11**
- **TypeORM**
- **PostgreSQL**
- **JWT para autenticação**
- **Swagger para documentação da API**
- **Passport.js para autenticação**
- **Class-validator para validação**
- **Prettier e ESLint para formatação de código**

## 🚀 Como rodar o projeto

### 1️⃣ Clonar o repositório

```sh
git clone https://github.com/JadisDev/teddy-back.git
cd teddy-back
```

### 2️⃣ Criar o arquivo `.env`

Já deixei o .env no jeito

### 3️⃣ Subir os containers com Docker

Se você estiver usando **Docker Compose**, basta rodar:

```sh
docker-compose build
```

Isso irá construir a imagem do banco de dados PostgreSQL e a aplicação NestJS.

Para subir as duas aplicações juntas, use:

```sh
docker-compose up
```

### 4️⃣ Rodar as migrations e seeds

As migrations e seeds já são executadas automaticamente durante o build da aplicação.
Caso precise rodá-las manualmente:

```sh
npm run migration:run
npm run seed
```

### 5️⃣ Acessar a API

O servidor estará rodando em:

```
http://localhost:3000
```

E a documentação Swagger pode ser acessada em:

```
http://localhost:3000/api
```

## 🛠 Scripts disponíveis

- `npm run start` → Inicia o servidor.
- `npm run start:dev` → Inicia o servidor em modo de desenvolvimento.
- `npm run build` → Compila o projeto.
- `npm run migration:generate` → Gera uma nova migration.
- `npm run migration:run` → Executa as migrations pendentes.
- `npm run seed` → Roda os seeds do banco de dados.
- `npm run test` → Executa os testes.

---
