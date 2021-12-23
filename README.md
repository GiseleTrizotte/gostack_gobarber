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
teste


## :notebook: Endpoints

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

## [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2FWallysonGalvao%2Frocketseat-gobarber%2Fmaster%2Fbackend%2Fendpoints.json)
