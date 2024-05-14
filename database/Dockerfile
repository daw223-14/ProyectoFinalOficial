# Utiliza la imagen oficial de MySQL como base
FROM mysql:8.0.32

# Variables de entorno para configurar la base de datos
ENV MYSQL_ROOT_PASSWORD=root 
ENV MYSQL_DATABASE=cycle 

# Copia los archivos SQL de inicialización (si los tienes) al directorio /docker-entrypoint-initdb.d/
# Por ejemplo, si tienes un archivo llamado init.sql en el mismo directorio que este Dockerfile,
# lo copiarías así:
COPY cycle.sql /docker-entrypoint-initdb.d/
RUN chmod 755 /docker-entrypoint-initdb.d/cycle.sql

# Expone el puerto 3306 para que otros servicios puedan acceder a la base de datos
EXPOSE 3306

# Agregar el comando para utilizar mysql_native_password
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
