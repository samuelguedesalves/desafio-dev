# CNAB Parser

![CNAB Parser](./assets/preview.gif)

A aplicação tem como função o perseamento de arquivos CNAB.
Os dados são tratados e inseridos em uma base de dados 
e podem ser consultados posteriormente pelo usuário.

> Arquivo CNAB: [CNAB.txt](./CNAB.txt)

## Tecnologias

- Elixir
- Phoenix
- Typescript
- React
- Postgres

A API foi construída utilizando a linguagem Elixir com o 
framework web Phoenix, e mais algumas bibliotecas. A API 
conta com autenticação JWT em algumas rotas. 
A base de dados utilizada é o Postgres.


O Front-end foi construído com React utilizando Typescript.

## Documentação da API

É possivel ver a documentação das API e as suas rotas [AQUI](./backend/README.md).

## Documentação do Front-end

É possivel ver a documentação do Front-end [AQUI](./frontend/README.md).

## Executando aplicação com Docker compose
Para executar as aplicações de forma simultânea é necessário 
ter o **docker** e **docker compose** instalado em sua máquina
e usar o seguinte comando:

```bash
# build
docker-compose build

# mount
docker-compose up
```
Os container serão montados e configurados, e se tudo ocorrer bem
alguns logs semelhantes ao abaixo estarão em seu terminal.

```bash
...
db_1     | 2022-06-17 21:55:01.262 UTC [1] LOG:  database system is ready to accept connections

...
back_1   | Iniciando servidor web Phoenix...
back_1   | [info] Running BackendWeb.Endpoint with cowboy 2.9.0 at 127.0.0.1:4000 (http)
back_1   | [info] Access BackendWeb.Endpoint at http://localhost:4000

...
front_1  | You can now view frontend in the browser.
front_1  | 
front_1  |   Local:            http://localhost:3000
front_1  |   On Your Network:  http://172.18.0.4:3000

```

Pronto, agora a aplicação está executando.
- Front-end - http://localhost:3000.
- Back-end - http://localhost:4000.