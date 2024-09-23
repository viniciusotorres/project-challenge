## Challenge Project
- Este projeto é uma aplicação full-stack chamada Challenge, que consiste em um frontend desenvolvido com Angular e um backend desenvolvido com Spring Boot. A aplicação permite a gestão de produtos, com operações de criação, leitura, atualização e exclusão.

# Descrição Front-End
- O frontend é uma aplicação Angular que utiliza uma interface moderna e responsiva. Ele se comunica com o backend via API REST.

## Dependências

- @angular/material: Componentes de UI do Angular Material.
- tailwindcss: Framework CSS para estilização.


## Scripts

- start: Inicia o servidor de desenvolvimento (ng serve).
- build: Compila o projeto para produção (ng build).

# Execução

- git clone <[CHALLENGE]([https://github.com/viniciusotorres/project-challenge/tree/main/frontend](https://github.com/viniciusotorres/project-challenge.git))>
- cd challenge-frontend
- npm install
- npm start
- A aplicação estará disponível em http://localhost:4200.



# Descrição Back-End

O backend é uma API REST construída com Spring Boot. Ele gerencia produtos e fornece endpoints para operações CRUD.

# Dependências

- Spring Boot Starter Data JPA: Integração com o banco de dados.
- Spring Boot Starter Web: Para criar a API REST.
- H2 Database: Banco de dados em memória para desenvolvimento.
- Lombok: Reduz código boilerplate.
- Springdoc OpenAPI: Documentação da API.
  
# Configuração
- O projeto utiliza o banco de dados H2 em memória, sem necessidade de configuração adicional para rodar localmente.

# Configuração CORS
- Permite que o frontend se comunique com o backend. A configuração atual permite requisições do http://localhost:4200.

#Execução

- git clone <[CHALLENGE]([https://github.com/viniciusotorres/project-challenge/tree/main/frontend](https://github.com/viniciusotorres/project-challenge.git))>
- cd challenge-backend
- Execute a aplicação:
- mvn spring-boot:run
- A aplicação estará disponível em http://localhost:8080.

## Documentação da API
- A documentação da API pode ser acessada em /swagger-ui.html após iniciar a aplicação.

# Execução Conjunta

# Inicie o backend (Spring Boot):

- cd challenge-backend
- mvn spring-boot:run
  
# Inicie o frontend (Angular):

- cd challenge-frontend
- npm start
  
## Agora, o frontend estará disponível em http://localhost:4200 e se comunicará com o backend disponível em http://localhost:8080.

# Desafios Extras feitos

- Criar uma barra de notificações (snackbar) que aparece ao salvar, atualizar
ou excluir um produto.
- Documentação da API utilizando Swagger.
