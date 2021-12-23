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
Rota responsável por realizar o cadastro de um novo usuário.

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
Mostra as informações do usuário logado.

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
Atualiza o avatar do usuário, essa rota de deve ser chamada após a criação do usuário, o formato dos dados no postman é form-data.


![image](https://user-images.githubusercontent.com/57105956/147297106-a2a4508c-ab2f-4db4-a8e3-2b29ff5dc088.png)


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
Função esqueci minha senha, envia um token para o email do usuário logado, para isso o email informado na requisição deve ser o mesmo email do login.

```json
{
	"email": "jhon@teste.com" 
}

```

-----------------------------------

#### *Reset password*

```
POST /password/reset
```
Após o envio do token através da rota acima (*POST /password/forgot*), é necessário chamar essa rota para a troca de senha, onde o token informado no email deve ser informado na requisição abaixo:

```json
{
	"password": "123456789",
	"password_confirmation": "123456789",
	"token": "8f16618a-3724-4f5d-b3e9-48fa0b500d40"
}

```

-----------------------------------

### Appointments:

#### *List all appointments*

```
GET /appointments
```
Rota responsável por listar todos os agendamentos realizados, sem nenhum tipo de condição where.


Retorna um array com vários agendamentos como abaixo:

```json
{
  "id": "7e672b7f-9526-450b-8972-39ef0f47d175",
  "provider_id": "e5c920ca-cd2c-4b0e-9e64-758797329b39",
  "user_id": "48822316-687a-4a01-bf72-766d4d1eedc5",
  "date": "2022-03-15T14:00:00.000Z",
  "created_at": "2021-12-21T05:42:05.149Z",
  "updated_at": "2021-12-21T05:42:05.149Z"
}

```
-----------------------------------

#### *Create appointment*

```
POST /appointments
```
Rota responsável por cadastrar um agendamento, o id do provedor de serviço poderá ser obtido pela rota (*GET /providers*), na sessão abaixo.

- O agendamento só poderá ser realizado entre 08:00 e 17:00.
- Não poderá ser realizado agendamento com o usuário logado ( com ele mesmo ).
- Não poderá ser realizado agendamento de uma data que já passou.

```json
{
	"provider_id": "5be30884-96e1-4dfa-9413-201f09f03c00",
	"date": "2022-03-23 17:00:00"	
}

```
Resposta:

```json
{
    "provider_id": "5be30884-96e1-4dfa-9413-201f09f03c00",
    "user_id": "b0c5a535-e681-47cb-9adc-6e36cf3d01c6",
    "date": "2022-03-23T20:00:00.000Z",
    "id": "0d6cd9ea-793a-463d-aa51-841e4785e28c",
    "created_at": "2021-12-24T01:20:14.239Z",
    "updated_at": "2021-12-24T01:20:14.239Z"
}

```
-----------------------------------

### Service providers:

#### *List providers*

```
GET /providers
```
Busca todos os provedores de serviços que estão cadastrado no banco, com excessão do usuário logado, pois o usuário não pode marcar um compromisso com ele mesmo.


Retorno é um array de providers com os dados abaixo:

```json
{
  "id": "e5c920ca-cd2c-4b0e-9e64-758797329b39",
  "name": "marta teste",
  "email": "marta@teste.com",
  "password": "$2a$08$lsNiccxBbBXTwVmVog2PJeQu58wiUfXWmrojbxP/Qw0SVglt8MQrG",
  "avatar": null,
  "created_at": "2021-12-21T05:40:03.068Z",
  "updated_at": "2021-12-21T05:40:03.068Z"
}

```
-----------------------------------

#### *Provider appointments*

```
GET /appointments/me
```
Consulta os agendamentos que o usuário logado possui, não tras agendamentos de outro usuário.

```json
{
	"year": 2022,
	"month": 3,
	"day": 22
}

```
Retorna um array com os agendamentos.


-----------------------------------

#### *Day availability*

```
GET /providers/provider_id/day-availability
```
Rota que verifica se o provedor de serviço esta disponivel no dia, mês e ano informado na requisição, é necessário informar o id do provedor de serviço diretamente na rota, esse id pode ser consultado na rota (*GET /providers*) **List providers**

A rota ficará algo assim *GET base_url/providers/48822316-687a-4a01-bf72-766d4d1eedc5/day-availability*

```json
{
	"day": 22,
	"month": 3,
	"year": 2022
}

```
Resposta:

```json
[
    {
        "hour": 8,
        "available": false
    },
    {
        "hour": 9,
        "available": false
    },
    {
        "hour": 10,
        "available": false
    },
    {
        "hour": 11,
        "available": false
    },
    {
        "hour": 12,
        "available": false
    },
    {
        "hour": 13,
        "available": false
    },
    {
        "hour": 14,
        "available": false
    },
    {
        "hour": 15,
        "available": false
    },
    {
        "hour": 16,
        "available": false
    },
    {
        "hour": 17,
        "available": false
    }
]

```
-----------------------------------

#### *Month availability*

```
GET /providers/provider_id/month-availability
```
Rota que verifica se o provedor de serviço esta disponivel no mês e ano informado na requisição, é necessário informar o id do provedor de serviço diretamente na rota.

Essa consulta pode ser realizada antes de realizar o agendamento.

A rota ficará algo assim *GET base_url/providers/1bbfd788-1831-4afc-8ac1-8efc4b29c8f3/month-availability*

```json
{
	"month": 3,
	"year": 2022
}

```
Resposta:

```json
[
    {
        "day": 1,
        "available": true
    },
    {
        "day": 2,
        "available": true
    },
    {
        "day": 3,
        "available": true
    },
    {
        "day": 4,
        "available": true
    },
    {
        "day": 5,
        "available": true
    },
    {
        "day": 6,
        "available": true
    },
    {
        "day": 7,
        "available": true
    },
    {
        "day": 8,
        "available": true
    },
    {
        "day": 9,
        "available": true
    },
    {
        "day": 10,
        "available": true
    },
    {
        "day": 11,
        "available": true
    },
    {
        "day": 12,
        "available": true
    },
    {
        "day": 13,
        "available": true
    },
    {
        "day": 14,
        "available": true
    },
    {
        "day": 15,
        "available": true
    },
    {
        "day": 16,
        "available": true
    },
    {
        "day": 17,
        "available": true
    },
    {
        "day": 18,
        "available": true
    },
    {
        "day": 19,
        "available": true
    },
    {
        "day": 20,
        "available": true
    },
    {
        "day": 21,
        "available": true
    },
    {
        "day": 22,
        "available": false
    },
    {
        "day": 23,
        "available": true
    },
    {
        "day": 24,
        "available": true
    },
    {
        "day": 25,
        "available": true
    },
    {
        "day": 26,
        "available": true
    },
    {
        "day": 27,
        "available": true
    },
    {
        "day": 28,
        "available": true
    },
    {
        "day": 29,
        "available": true
    },
    {
        "day": 30,
        "available": true
    },
    {
        "day": 31,
        "available": true
    }
]

```



## :notebook: Endpoints

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

## [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2FWallysonGalvao%2Frocketseat-gobarber%2Fmaster%2Fbackend%2Fendpoints.json)
