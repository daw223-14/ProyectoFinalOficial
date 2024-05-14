# Usa una imagen base de PHP con Apache
FROM php:8.0-apache

# Instala git y unzip (necesarios para Composer)
RUN apt-get update \
    && apt-get install -y git unzip \
    && rm -rf /var/lib/apt/lists/*

# Instala Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Establece el directorio de trabajo
WORKDIR /var/www/html
RUN docker-php-ext-install mysqli pdo pdo_mysql
# Copia los archivos composer.json y composer.lock
COPY composer.json composer.lock ./

# Instala las dependencias utilizando Composer
RUN composer install --no-scripts --no-autoloader

# Copia el resto de tu aplicación
COPY . .

# Genera el autoload de Composer
RUN composer dump-autoload --optimize

# Expone el puerto 80 para que Apache pueda servir la aplicación
EXPOSE 80

# Inicia el servidor Apache cuando se inicie el contenedor
CMD ["apache2-foreground"]
