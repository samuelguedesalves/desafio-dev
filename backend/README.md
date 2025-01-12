# Backend

A aplicação tem como intuito o parseamento arquivos CNAB.
Através do upload de um arquivo, as informações serão
parseadas e salvas para posteriores consultas.

Informações:
- elixir v1.12
- phoenix v1.6.6
- Postgres Database

## Executando aplicação
A aplicação necessita de uma base de dados. 
Verifique a base de dados e os parâmetros de conexão presentes
no arquivo `{dev | test | prod}.exs`.

Executando o comando abaixo a aplicação irá compilar e em 
seguinda se tudo estiver correto ela iniciará o servidor.

```bash
mix phx.server

...
Generated backend app
[info] Running BackendWeb.Endpoint with cowboy 2.9.0 at 127.0.0.1:4000 (http)
[info] Access BackendWeb.Endpoint at http://localhost:4000
```


## Rotas

### Criar conta de usuário
Para criar uma conta é necessário informar o
**nome**, **email**, e uma **senha** de 6 dígitos.
A Partir de então vai ser possível fazer a autenticação
e ter acesso às funcionalidades da api.

> URL: http://localhost:4000/api/user/create

```javascript
// REQUEST
// METHOD: POST

// BODY
{
	"email": "banana@email.com",
	"name": "banana",
	"password": "123456"
}
```

```javascript
// RESPONSE
// BODY
{
	"message": "created user",
	"token": "eyJhbG...",
	"user": {
		"id": 1,
		"name": "banana",
		"email": "banana@email.com",
		"inserted_at": "2022-06-07T16:57:25",
		"updated_at": "2022-06-07T16:57:25"
	}
}
```

### Autenticação de conta de usuário
Os tokens de autenticação tem validade de 24 horas
a partir de sua criação, após o seguinte período ele
será expirado e então será necessário refazer a
autenticação do usuário. Para isso é necessário o
email e senha do usuário.


> URL: http://localhost:4000/api/user/auth

```javascript
// REQUEST
// METHOD: POST

// BODY
{
	"email": "banana@email.com",
	"password": "123456"
}

```

```javascript
// RESPONSE
// BODY
{
	"message": "user is authenticated",
	"token": "eyJhbG...",
	"user": {
		"id": 1,
		"name": "samuel",
		"email": "samuel@email.com",
		"inserted_at": "2022-06-07T16:57:25",
		"updated_at": "2022-06-07T16:57:25"
	}
}
```

### Envio de arquivo CNAB
Através desta rota é possível fazer o upload de arquivos CNAB,
após o envio eles serão parseados e salvos para consultas posteriores.

> URL: http://localhost:4000/api/cnab/upload

> :warning: O arquivo deve ser enviado utilizando a codificação `multipart/form-data`.

```javascript
// REQUEST
// METHOD: POST

// MULTIPART FORM
fiel_name: file

// HEADER
authorization: bearer eyJhbG...

```

```javascript
// RESPONSE
// BODY
[
	{
		"amount": 14200,
		"card": "4753****3153",
		"cpf": "09620676017",
		"date": "2019-03-01",
		"hour": "15:34:53",
		"id": 1,
		"inserted_at": "2022-06-07T17:04:00",
		"shop_name": "BAR DO JOÃO",
		"shop_owner": "JOÃO MACEDO",
		"type": "Financiamento",
		"updated_at": "2022-06-07T17:04:00"
	},
  ...
]
```

### Listar todas as transações de CNAB já processadas pelo usuário
Lista todas as transações de CNAB já processadas pelo usuário.

> URL: http://localhost:4000/api/cnab/list

```javascript
// REQUEST
// METHOD: GET

// HEADER
authorization: bearer eyJhbG...
```

```javascript
// RESPONSE
// BODY
[
	{
		"amount": 14200,
		"card": "4753****3153",
		"cpf": "09620676017",
		"date": "2019-03-01",
		"hour": "15:34:53",
		"id": 1,
		"inserted_at": "2022-06-07T17:04:00",
		"shop_name": "BAR DO JOÃO",
		"shop_owner": "JOÃO MACEDO",
		"type": "Financiamento",
		"updated_at": "2022-06-07T17:04:00"
	},
  ...
]
```
