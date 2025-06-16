# === DEPENDÊNCIAS ===
node_modules/
.pnp/
.pnp.js

# === BUILD / PRODUÇÃO ===
# Vite e React build output
dist/
build/

# === TESTES ===
coverage/

# === VARIÁVEIS DE AMBIENTE ===
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# === LOGS ===
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# === CONFIGURAÇÕES DE EDITORES ===
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# === TYPESCRIPT ===
*.tsbuildinfo

# === FRONTEND ===
# cache do Vite
.vite/

# === BACKEND ===
# dados temporários ou de desenvolvimento do MongoDB (se existir)
dump/
# log de servidor local
logs/
*.log

# === SISTEMA OPERACIONAL ===
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# === DEPLOY ===
# Output de build do Vercel (caso use export estático, por precaução)
.vercel/

# === EXTRAS ===
# Caso use o React Query DevTools persistindo estado:
react-query-devtools.json

# Caso use Axios ou outras libs que salvem mocks locais:
mocks/

# === DOCKER ===
# Arquivos de configuração do Docker
.docker/
# Volumes do Docker
docker-volumes/
# Arquivos de log do Docker
*.docker.log
