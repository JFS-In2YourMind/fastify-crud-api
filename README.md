Fastify CRUD API 

API leve e minimalista construída com Node.js + Fastify, ideal para operações CRUD básicas em aplicações web e mobile.
Foco em rapidez, simplicidade e baixo consumo de recursos.

 Funcionalidades

✅ Health check (/health)

✅ Listagem de itens (GET /items)

✅ Detalhe de item (GET /items/:id)

✅ Criação de item (POST /items)

✅ Atualização de item (PUT /items/:id)

✅ Exclusão de item (DELETE /items/:id)

 Como rodar o projeto
# Clonar o repositório
git clone https://github.com/JFS-In2YourMind/fastify-crud-api.git
cd fastify-crud-api

# Instalar dependências
npm install

# Rodar o servidor
npm run dev


Servidor disponível em:
 http://localhost:3333

 Estrutura
fastify-crud-api/
├── src/
│   └── server.js   # servidor Fastify e rotas CRUD
├── package.json
└── README.md

🛠️ Tecnologias

Node.js

Fastify

@fastify/cors

 Objetivo

Este projeto foi desenvolvido como parte de um desafio da DIO para praticar a construção de APIs simples e eficientes em Node.js, aplicando boas práticas de CRUD com Fastify.
