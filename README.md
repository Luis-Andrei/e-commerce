# 🛍️ Sistema de E-commerce

[![Node.js Version](https://img.shields.io/badge/node.js-16%2B-green.svg)](https://nodejs.org/)
[![MongoDB Version](https://img.shields.io/badge/mongodb-4.4%2B-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

Sistema completo de e-commerce com painel administrativo, monitor de impressão e **cardápio digital moderno para a Lancheria 3 Alianças**, desenvolvido com tecnologias modernas e escaláveis.

---

## 🍔 Cardápio Digital Lancheria 3 Alianças

- **Visual moderno, aconchegante e responsivo** (desktop e mobile)
- **Fidelidade ao cardápio físico**: nomes, descrições e preços iguais ao impresso
- **Carrinho de compras flutuante**: sempre visível, com modal detalhado
- **Cálculo automático da taxa de entrega** conforme bairro
- **Finalização de pedido via WhatsApp** (resumo pronto para envio)
- **Cadastro de usuário e endereço**
- **Navegação rápida** entre seções do cardápio
- **Ajustes visuais**: imagens grandes, layout compacto, preços alinhados, botões modernos
- **Persistência do carrinho** (mesmo após recarregar a página)

---

## ✨ Funcionalidades

- 🛒 Loja virtual completa
- 🍔 Cardápio digital responsivo e fiel ao físico
- 🛒 Carrinho flutuante com modal e integração WhatsApp
- 👨‍💼 Painel administrativo
- 📊 Monitor de impressão
- 🔄 Sincronização de estoque
- 🔐 Sistema de autenticação
- 📱 Design responsivo
- 🚀 API RESTful
- 📦 Docker support

## 🏗️ Estrutura do Projeto

```
/meu-ecommerce/
│
├── frontend/                  # Loja virtual (React, Vite)
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

## 📋 Pré-requisitos

- Node.js 16+
- Python 3.8+
- MongoDB 4.4+
- Docker e Docker Compose (opcional)

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/Luis-Andrei/e-commerce.git
cd e-commerce
```

### 2. Configuração do Ambiente

#### Backend
```bash
cd backend
cp .env.example .env  # Configure as variáveis de ambiente
npm install
```

#### Frontend
```bash
cd frontend
cp .env.example .env  # Configure as variáveis de ambiente
npm install
```

### 3. Configuração das Variáveis de Ambiente

#### Frontend (.env)
```env
# Configurações da API
VITE_API_URL=http://localhost:5000/api

# Configurações da Aplicação
VITE_APP_NAME=Meu E-commerce
VITE_APP_DESCRIPTION=Um e-commerce simples e eficiente
VITE_APP_VERSION=1.0.0

# Chaves de API
VITE_GOOGLE_MAPS_API_KEY=sua-chave-do-google-maps
```

#### Backend (.env)
```env
# Configurações do Servidor
PORT=5000
NODE_ENV=development

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/ecommerce
MONGODB_USER=
MONGODB_PASS=

# Configurações de Autenticação
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRES_IN=24h
```

### 4. Iniciando os Serviços

#### Backend (API)
```bash
cd backend
npm run dev
```
API disponível em: `http://localhost:5000`

#### Frontend (Loja Virtual)
```bash
cd frontend
npm run dev
```
Acesse: `http://localhost:3000`

#### Painel Administrativo
```bash
cd admin-panel
npm run dev
```
Acesse: `http://localhost:3001`

### 5. Scripts Utilitários

#### Monitor de Impressão
```bash
cd scripts
python imprimir_notas.py
```

#### Sincronização de Estoque
```bash
cd scripts
python sync_estoque.py
```

## 🐳 Docker

Para executar todo o ambiente usando Docker:

```bash
docker-compose up
```

## 📚 Documentação

- [Documentação da API](docs/API.md)
- [Estrutura do Projeto](docs/ESTRUTURA.md)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Luis Andrei** - *Desenvolvedor Principal* - [GitHub](https://github.com/Luis-Andrei)

## 🙏 Agradecimentos

- A todos os contribuidores que ajudaram a melhorar este projeto
- À comunidade open source por todas as ferramentas utilizadas 