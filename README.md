Manual para levantar el proyecto en local

Front End Angular 18
•	1.-Descargar e Instalar Node versión estable (LTS)

Comandos necesarios para instalar Angular
•	npm install -g @angular/cli

Comando para levantar local Angular 
esta en la raíz del proyecto C:\xampp\htdocs\Ejercicio1
•	npm install
•	npm start

Laravel 11
•	1.-Descargar e instalar Composer

Comandos para levantar en local Laravel
Esta es la ruta del proyecto C:\xampp\htdocs\Ejercicio1\api-rest
•	composer install
•	php artisan serve

configuración de mysql en laravel
en el archivo C:\xampp\htdocs\Ejercicio1\api-rest\.env
agregar estas líneas
DB_CONNECTION=mysql
DB_HOST=127.0.0.1    
DB_PORT=3306        
DB_DATABASE=agenda 
DB_USERNAME=root  
DB_PASSWORD="" 

Después creas la base de datos agenda.

Migrar BD de laravel a mysql
El siguiente comando es para migrar las tablas a la BD agenda.
•	php artisan migrate
