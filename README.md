# Shortly-API

- Essa é uma API pensada para um front-end que gerencia urls. Essa aplicação é capaz de cadastrar um usuário e permitir o seu login. A aplicação pode encurtar uma url, armazena, redirecionar o usuário para a url cadastrada e mostrar um ranking de viws.

A url base dessa API é á:

```
https://shortly-api-fndq.onrender.com
```

# Rotas

Essa é uma rota **POST**, responsável por fazer o cadastro do usuário, e recebe a rota e o objeto, respectivamente, no formato:

```
/signup
```

```
{
    name: "João",
    email: "joao@driven.com.br",
    password: "driven",
    confirmPassword: "driven"
}
```

---

Essa é uma rota **POST**, que é responsável por fazer o login do usuário enviando um token. Essa rota recebe uma rota e um objeto, respectivamente, no formato:

```
/signin
```

```
{
    email: "joao@driven.com.br",
    password: "driven",
}
```

---

Essa rota **POST**, e recebe um token de validação com um _header_ `Authorization` no formato `Bearer TOKEN`. Ela é responsável por receber uma url e retornar uma "url" encurtada. Recebe uma rota e um objeto e retorna um indetificador da url, respectivamente, no formato:

```
/urls/shorten
```

```
{
	"url": "https://..."
}
```

```
{
	"shortUrl": "a8745bcf"
}
```

---

Essa é uma rota **GET** , que é responsável por retornar um objeto com a url cadastrada, de acordo com o id indicado no parametro da rota. Ela recebe um id como parâmetro da rota e retorna o seguinte objeto:

```
/urls/:id
```

```
{
	"id": 1,
	"shortUrl": "bd8235a0",
	"url": "https://..."
}
```

---

Essa é uma rota **GET**, que é responsável por direcionar o usuário para o link da url que ele requisitou, e atualizar o banco de dados com 1 visualização da url. Essa rota recebe o identificador da url como parâmetro da rota e redireciona o usuário para o link:

```
/urls/open/:shortUrl
```

---
Essa é uma rota **DELETE** (com autenticação _header_ `Authorization` no formato `Bearer TOKEN`), que é responsável por deletar uma url. Ela recebe um id como parâmetro da rota:

```
/urls/:id
```

---
Essa é uma rota **GET** (com autenticação _header_ `Authorization` no formato `Bearer TOKEN`). Ela é responsável por retornar os dados do usuário com todos as urls cadastradas:

```
/users/me
```
```
{
  "id": id do usuário,
	"name": nome do usuário,
	"visitCount": soma da quantidade de visitas de todos os links do usuário,
	"shortenedUrls": [
		{
			"id": 1,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		},
		{
			"id": 2,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		}
	]
}
```

---

Essa é uma rota **GET**, e é responsável por retornar o ranking dos usuários que estão com mais visualizações em suas urls, ela recebe a rota e retorna o objeto, respectivamente:

```
/ranking
```

```
[
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 5,
		"visitCount": 100000
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 3,
		"visitCount": 85453
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 10,
		"visitCount": 0
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 0,
		"visitCount": 0
	}
]
```