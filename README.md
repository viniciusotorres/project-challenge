# Challenge Backend

Este é o backend do projeto **Challenge**, desenvolvido com **Spring Boot**. Ele fornece uma API REST para a gestão de produtos, incluindo operações de criação, leitura, atualização e exclusão.

## Versões

- Java 17
- SpringBoot 3.3.4

## Dependências

- Spring Boot Starter Data JPA: Para integração com o banco de dados.
- Spring Boot Starter Web: Para criar a API REST.
- H2 Database: Banco de dados em memória para desenvolvimento.
- Lombok: Para reduzir o código boilerplate.
- Spring Boot Starter Test: Para testes.
- Spring Boot Starter Validation: Para validação de dados.
- Springdoc OpenAPI: Para documentação da API.

## Documentação da API

- A documentação da API está disponível em /swagger-ui.html após iniciar a aplicação.

## Configuração

Este projeto utiliza o banco de dados H2 em memória para desenvolvimento. Não é necessária nenhuma configuração adicional para rodar o projeto localmente.

## Configuração CORS

A configuração de CORS permite que o frontend se comunique com o backend. A configuração atual permite requisições do http://localhost:4200.

### Clonar o Repositório

- git clone https://github.com/seu-usuario/challenge-backend.git
- cd challenge-backend

## Executando o Projeto

- mvn spring-boot:run

- A aplicação estará disponível em http://localhost:8080.



