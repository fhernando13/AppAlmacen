FROM node:20.11.1-alpine AS node
# Directorio donde se mantendran los archivos de la app
WORKDIR /app
# Copiar el package.json y el package-lock en nuestro WORKDIR
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copiar todos los archivos
COPY . .

# Construir la aplicacion lista para produccion, puede no incluir el # flag --prod
RUN npm run build 

# Stage 2
FROM nginx:stable

COPY --from=node /app/dist/almacen/ /usr/share/nginx/html

EXPOSE 80