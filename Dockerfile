# Use the official PHP 8.1 FPM image as the base image
FROM php:8.1-fpm

# Set the working directory inside the container
WORKDIR /var/www/html

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libzip-dev \
    zip \
    unzip \
    libxml2-dev \
    git

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip xml

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the composer.json and composer.lock files to the container
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-scripts --no-autoloader --ignore-platform-reqs

# Copy the rest of the application code
COPY . .

COPY artisan .

# Generate the autoload files
RUN composer dump-autoload --optimize

# Expose port 8000 (change if necessary)
EXPOSE 8000

# Start the Laravel development server
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
