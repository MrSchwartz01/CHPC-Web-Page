# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

# Instalar dependencias (incluye devDependencies para poder compilar y usar Prisma CLI)
RUN npm install

# Generar Prisma Client y sincronizar esquema con la base SQLite
RUN npx prisma generate
RUN npx prisma db push

# Compilar el proyecto NestJS a dist
RUN npm run build


# Etapa 2: runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copiar package.json para referencia
COPY package*.json ./

# Copiar node_modules, build y archivos de Prisma desde la etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dev.db ./dev.db

# Exponer el puerto de la aplicación NestJS (configurado en main.ts)
EXPOSE 5000

# Comando por defecto: ejecutar la app compilada
CMD ["node", "dist/main.js"]
