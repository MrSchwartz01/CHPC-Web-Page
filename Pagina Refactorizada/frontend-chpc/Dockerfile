# Etapa 1: build de la app Vue
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY babel.config.js ./
COPY vue.config.js ./
COPY jsconfig.json ./
COPY public ./public
COPY src ./src

# Instalar dependencias
RUN npm install

# Construir la app para producción
RUN npm run build


# Etapa 2: servir estáticos con Nginx
FROM nginx:alpine AS runner

# El build de Vue genera por defecto la carpeta dist
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto por defecto de Nginx
EXPOSE 80

# Comando por defecto del contenedor
CMD ["nginx", "-g", "daemon off;"]
