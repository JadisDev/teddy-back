# Usa a versão 20 do Node.js (LTS estável)
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala o Nest CLI globalmente
RUN npm install -g @nestjs/cli

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# Instala as dependências sem conflitos de versão
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["sh", "./src/scripts/start.sh"]
