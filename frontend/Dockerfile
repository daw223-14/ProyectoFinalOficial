# Usa la imagen base de Node.js
FROM node:alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json
COPY package.json .

# Instala las dependencias
RUN yarn install

# Copia el resto de tu aplicación
COPY . .

# Compila tu aplicación
RUN yarn build

# Expone el puerto 80 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 80

# Comando para iniciar tu aplicación
CMD ["yarn", "start"]