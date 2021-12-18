<h1 align="center">
    <img alt="GoBarber" title="#GoBarber" src="./src/images/gobarber.png" width="250px" />
</h1>

<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#collision-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Rodando o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Endpoints</a>
</p>

<h2>
<strong>Backend</strong> da aplicação GoBarber:
</h2>

## 🚀 Sobre

Esse projeto foi desenvolvido durante o Bootcamp da Rocketseat. Trata-se de uma api para uma barbearia ficticia, a GoBarber, o backend foi realizado com (NodeJs).

## :collision: Funcionalidades

- Criar e gerenciar horários;
- Criar e gerenciar barbeiros;

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/) | [Express](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/) | [BCrycptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [Yarn](https://yarnpkg.com/) | [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/) | [Redis](https://redis.io/)

\* Para mais detalhes, veja o <kbd>[package.json](./package.json)</kbd>

## :zap: Rodando o projeto

### Backend

```bash
# Clone este repositório
$ git clone https://github.com/GiseleTrizotte/gostack_gobarber.git

# Entrar na raiz do projeto e rodar o comando:
$ yarn install

# Ainda na raiz do projeto, rodar o comando:
$ yarn start
```

Feito isso, acessar o endereço http://localhost:3333

Se desejar, pode rodar os testes do projeto, usando o seguinte comando:

```
$ yarn test
```

### DBeaver

È preciso ter o [DBeaver](https://dbeaver.com/) instalado em sua máquina, para gerenciamento de banco de dados postgreSQL

### MongoDB Compass

È preciso ter o [MongoDB_Compass](https://www.mongodb.com/try/download/compass) instalado em sua máquina, MongoDB Compass é uma interface visual para gerenciar os dados do mongo pois o DBeaver não suporta o MongoDB

### Docker

É preciso ter o [Docker](https://www.docker.com/) instaldo em sua máquina. Feito a instalação, rodar os seguintes comandos:

```bash
# Image do postgres com docker
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Iniciar o container
$ docker start database

# Executar as migrations:
$ yarn typeorm migration:run

# Image do mongoDB com docker
$ docker run --name mongodb -p 27017:27017 -d -t mongo

# Iniciar o container
$ docker start mongodb
```

## :notebook: Endpoints

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

## [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2FWallysonGalvao%2Frocketseat-gobarber%2Fmaster%2Fbackend%2Fendpoints.json)
