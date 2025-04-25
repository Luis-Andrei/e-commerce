# Documentação da API

## Autenticação

Todas as requisições que requerem autenticação devem incluir o header:
```
Authorization: Bearer <token>
```

## Endpoints

### Autenticação

#### POST /api/auth/register
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

#### POST /api/auth/login
Autentica um usuário.

**Request Body:**
```json
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

### Produtos

#### GET /api/products
Lista todos os produtos.

**Query Parameters:**
- `page` (opcional): Número da página
- `limit` (opcional): Itens por página
- `category` (opcional): Filtrar por categoria
- `search` (opcional): Buscar por termo

#### GET /api/products/:id
Obtém detalhes de um produto.

#### POST /api/products
Cria um novo produto (requer autenticação de admin).

**Request Body:**
```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 99.99,
  "stock": 100,
  "category": "Categoria",
  "images": ["url1", "url2"]
}
```

### Pedidos

#### GET /api/orders
Lista pedidos do usuário autenticado.

#### POST /api/orders
Cria um novo pedido.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "id_do_produto",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "Rua Exemplo",
    "number": "123",
    "city": "Cidade",
    "state": "Estado",
    "zipCode": "12345-678"
  }
}
```

### Usuários

#### GET /api/users/profile
Obtém perfil do usuário autenticado.

#### PUT /api/users/profile
Atualiza perfil do usuário.

**Request Body:**
```json
{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

## Códigos de Resposta

- 200: Sucesso
- 201: Criado
- 400: Requisição inválida
- 401: Não autorizado
- 403: Proibido
- 404: Não encontrado
- 500: Erro interno do servidor

## Paginação

Respostas paginadas incluem:

```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10,
    "limit": 10
  }
}
``` 