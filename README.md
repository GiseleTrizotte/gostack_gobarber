<h1 align="center">
    <img alt="GoBarber" title="#GoBarber" src="./src/images/gobarber.png" width="250px" />
</h1>

<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#collision-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Rodando o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
   <a href="#mag-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Endpoints</a>
</p>

<h2>
<strong>Backend</strong> da aplicação GoBarber.
</h2>

## 🚀 Sobre

Esse projeto foi desenvolvido durante o Bootcamp da Rocketseat. Trata-se de uma api para uma barbearia ficticia, a GoBarber, o backend foi realizado com (NodeJs).

Foi utilizado 3 bancos de dados diferentes por propósitos educacionais.

- PostgresSQL ( Banco relacional )
- MongoDB ( Banco NoSQL )
- Redis ( Armazenamento de cache, filas )

## :collision: Funcionalidades

- Criar e gerenciar horários;
- Criar e gerenciar barbeiros;

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/) | [Express](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/) | [BCrypt](https://github.com/dcodeIO/bcrypt.js#readme)
- [Yarn](https://yarnpkg.com/) | [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/) | [Redis](https://redis.io/)

\* Para mais detalhes, veja o <kbd>[package.json](./package.json)</kbd>

## :zap: Rodando o projeto


### DBeaver

È preciso ter o [DBeaver](https://dbeaver.com/) instalado em sua máquina, para gerenciamento de banco de dados postgreSQL

### MongoDB Compass

È preciso ter o [MongoDB_Compass](https://www.mongodb.com/try/download/compass) instalado em sua máquina, MongoDB Compass é uma interface visual para gerenciar os dados do mongo pois o DBeaver não suporta o MongoDB

### Docker

É preciso ter o [Docker](https://www.docker.com/) instaldo em sua máquina. 

```bash
# Clone este repositório
$ git clone https://github.com/GiseleTrizotte/gostack_gobarber.git

# Image do postgres com docker
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
$ docker start database

# Image do mongoDB com docker
$ docker run --name mongodb -p 27017:27017 -d -t mongo
$ docker start mongodb

# Image do Redis com docker
$ docker run --name redis -p 6379:6379 -d -t redis:alpine
$ docker start redis

# Entrar na raiz do projeto e rodar o comando:
$ yarn install

# Executar as migrations:
$ yarn typeorm migration:run

# Ainda na raiz do projeto, rodar o comando:
$ yarn dev:server
```

Feito isso, acessar o endereço http://localhost:3333 através do postman ou insomnia.

Se desejar, pode rodar os testes do projeto, usando o seguinte comando:

```
$ yarn test
```

## :mag: Rotas

### Session:

Cria um token para o usuário realizar as requisições da API, é necessário que o usuário já um tenha cadastro.

:exclamation: Para acessar qualquer rota, é necessário estar logado.

```json
{
  "email": "jhon@teste.com",
  "password": "123456"
}

```

Resposta:

```json
{
  "user": {
  "id": "b0c5a535-e681-47cb-9adc-6e36cf3d01c6",
  "name": "Jhon doe teste",
  "email": "jhon@teste.com",
  "avatar": "cf9433a985b908ba3070-ppp.png",
  "created_at": "2021-12-23T20:45:40.134Z",
  "updated_at": "2021-12-23T20:54:46.508Z",
  "avatar_url": "http://localhost:3333/files/cf9433a985b908ba3070-ppp.png"
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAyODczMjcsImV4cCI6MTY0MDM3MzcyNywic3ViIjoiYjBjNWE1MzUtZTY4MS00N2NiLTlhZGMtNmUzNmNmM2QwMWM2In0.cCDcnWmkctTZylHGKkUjtIvcPcQ4IuDfppeq4VkWj5U"
}

```

--------------------------------------------------

### Users:

#### *Create User*

```
POST /users
```
Rota responsável por realizar o cadastro de um novo usuário

```json
{
  "name": "Jhon doe teste",
  "email": "jhon@teste.com",
  "password": "123456"
}

```
Resposta:

```json
{
  "name": "jhon doe teste",
  "email": "jhon@teste.com",
  "id": "e864fc87-e135-47d3-8d8c-2298e164423d",
  "created_at": "2021-12-23T22:16:33.631Z",
  "updated_at": "2021-12-23T22:16:33.631Z",
  "avatar_url": null
}

```
-----------------------------------

#### *Show profile*

```
GET /profile
```
Lista as informações do usuário logado.

Resposta:

```json
{
  "id": "b0c5a535-e681-47cb-9adc-6e36cf3d01c6",
  "name": "Jhon doe teste",
  "email": "jhon@teste.com",
  "avatar": "cf9433a985b908ba3070-ppp.png",
  "created_at": "2021-12-23T20:45:40.134Z",
  "updated_at": "2021-12-23T20:54:46.508Z",
  "avatar_url": "http://localhost:3333/files/cf9433a985b908ba3070-ppp.png"
}

```
-----------------------------------

#### *Update avatar*

```
PATCH /users/avatar
```
Atualiza o avatar do usuário.


Resposta:

```json
{
    "id": "b0c5a535-e681-47cb-9adc-6e36cf3d01c6",
    "name": "Jhon doe teste",
    "email": "jhon@teste.com",
    "avatar": "b08eb58dabebbc970ff1-ppp.png",
    "created_at": "2021-12-23T20:45:40.134Z",
    "updated_at": "2021-12-23T22:46:37.555Z",
    "avatar_url": "http://localhost:3333/files/b08eb58dabebbc970ff1-ppp.png"
}

```
-----------------------------------

#### *Update profile*

```
PUT /profile
```
Atualiza as informações do cadastro do usuário.

```json
{
	"name": "Jhon doe teste",
	"email": "jhon@teste.com",
	"old_password": "123456",
	"password": "1234",
	"password_confirmation": "1234"
}

```
Resposta:

```json
{
    "id": "b0c5a535-e681-47cb-9adc-6e36cf3d01c6",
    "name": "Jhon doe teste",
    "email": "jhon@teste.com",
    "avatar": "b08eb58dabebbc970ff1-ppp.png",
    "created_at": "2021-12-23T20:45:40.134Z",
    "updated_at": "2021-12-23T22:49:17.849Z",
    "avatar_url": "http://localhost:3333/files/b08eb58dabebbc970ff1-ppp.png"
}

```
-----------------------------------

#### *Forgot password*

```
POST /password/forgot
```
Envia email ao usuário com o token para realizar a troca de senha.

```json
{
	"email": "jhon@teste.com" 
}

```

-----------------------------------









## :notebook: Endpoints

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

## [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2FWallysonGalvao%2Frocketseat-gobarber%2Fmaster%2Fbackend%2Fendpoints.json)
