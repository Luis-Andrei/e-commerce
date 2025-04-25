# Sistema de E-commerce

Sistema completo de e-commerce com painel administrativo e monitor de impressão.

## Estrutura do Projeto

```
/meu-ecommerce/
│
├── frontend/                  # Loja virtual (React, Next.js)
│   ├── public/               # Arquivos estáticos
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Requisições para a API
│   │   ├── hooks/           # Custom hooks
│   │   └── styles/          # Estilos globais e temas
│   ├── .env                 # Variáveis de ambiente
│   └── vite.config.ts       # Configuração do Vite
│
├── admin-panel/             # Painel administrativo
│   ├── src/                # Código fonte
│   └── public/             # Arquivos estáticos
│
├── backend/                # API REST
│   ├── src/
│   │   ├── controllers/    # Controladores da API
│   │   ├── routes/        # Rotas da API
│   │   ├── models/        # Modelos do banco de dados
│   │   ├── services/      # Lógica de negócio
│   │   ├── middlewares/   # Middlewares
│   │   └── config/        # Configurações
│   ├── .env              # Variáveis de ambiente
│   └── server.js         # Ponto de entrada
│
├── scripts/              # Scripts utilitários
│   ├── imprimir_notas.py # Monitor de impressão
│   └── sync_estoque.py   # Sincronização de estoque
│
├── database/            # Dados do banco
│   └── mongo/
│       ├── dump/       # Backups
│       └── seed.js     # Dados iniciais
│
├── docs/               # Documentação
│   ├── API.md         # Documentação da API
│   └── ESTRUTURA.md   # Estrutura do projeto
│
├── devops/            # Infraestrutura
│   ├── Dockerfile     # Configuração Docker
│   ├── docker-compose.yml
│   └── github-actions/
│       └── deploy.yml # CI/CD
│
├── .gitignore
├── README.md
└── LICENSE
```

## Requisitos

- Node.js 16+
- Python 3.8+
- MongoDB 4.4+
- Docker e Docker Compose (opcional)

## Instalação e Execução

### Frontend (Loja Virtual)

```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:3000`

### Backend (API)

```bash
cd backend
npm install
npm start
```

API disponível em: `http://localhost:5000`

### Painel Administrativo

```bash
cd admin-panel
npm install
npm run dev
```

Acesse: `http://localhost:3001`

### Scripts Utilitários

1. Monitor de Impressão:
```bash
cd scripts
pip install -r requirements.txt
python imprimir_notas.py
```

2. Sincronização de Estoque:
```bash
cd scripts
python sync_estoque.py
```

## API REST

Endpoints principais:

- `/api/products` - Produtos
- `/api/orders` - Pedidos
- `/api/users` - Usuários
- `/api/auth` - Autenticação
- `/api/admin` - Administração

Documentação completa: `http://localhost:5000/api-docs`

## Docker

Para executar todo o ambiente:

```bash
docker-compose up
```

## Monitor de Impressão

O script `imprimir_notas.py` monitora a pasta `C:\notas_filcar` e imprime automaticamente PDFs. Características:

- Monitoramento contínuo
- Impressão automática
- Logs detalhados
- Tratamento de erros
- Evita duplicação

## Contribuição

1. Fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 