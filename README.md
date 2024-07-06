### Mini Carrinho de Compras com Express e PostgreSQL

Este repositório contém um projeto de exemplo de um mini carrinho de compras desenvolvido utilizando Node.js com Express e PostgreSQL como banco de dados.

#### Funcionalidades Implementadas:

- **CRUD de Produtos:** Permite criar e listar produtos.
- **Gerenciamento de Carrinho de Compras:** Adicionar e remover produtos do carrinho de compras.
- **Autenticação de Usuário:** Implementação básica de autenticação de usuário para acessar o carrinho de compras.

#### Tecnologias Utilizadas:

- **Node.js:** Plataforma de execução de código JavaScript.
- **Express:** Framework web para Node.js que facilita a criação de APIs.
- **PostgreSQL:** Banco de dados relacional utilizado para armazenar informações dos produtos e carrinho de compras.

#### Estrutura do Projeto:

- **`/src`**: Contém o código fonte do projeto.
  - **`/controllers`**: Controladores da aplicação que gerenciam as requisições HTTP.
  - **`/routes`**: Rotas da API REST utilizando Express.

#### Pré-requisitos:

- Node.js
- PostgreSQL

#### Como Executar o Projeto:

1. **Clone o repositório:**
   ```
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências:**
   ```
   npm install
   ```

3. **Configure o banco de dados:**
   - Crie um banco de dados PostgreSQL.
   - Configure as variáveis de ambiente no arquivo `.env` com as credenciais do banco de dados.

4. **Execute o projeto:**
   ```
   npm start
   ```

5. **Teste a API:**
   A API estará disponível em `http://localhost:3000`.
