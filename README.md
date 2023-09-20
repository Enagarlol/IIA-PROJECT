# *INGLES INDIVIDUAL APP - BACKEND IIA*

**Producto a elaborar.**
*Creacion de una aplicación modular para la administracion de usuarios, reporte de avance, candelarizacion, agenda 
y cancelacion de programas para usuarios, captacion de informacion y control administrativo interno.*

### Requisitos previos

*Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:*

- [Node.js](https://nodejs.org/) (versión X.X.X)
- [git](https://git-scm.com) (versión X.X.X)
- [Xampp](https://www.apachefriends.org/es/index.html) (versión X.X.X)
- Otros requisitos...

## Instalación

 *Desde tu terminal ejecute cualquiera de los siguientes comandos*
 
`npm install`

`npm i`

*Cuando se ejecuta `npm install` o `npm i` en el directorio del proyecto, npm buscará en el archivo package.json, identificará todas las dependencias listadas 
en la sección "dependencies" y las descargará e instalará en un directorio llamado node_modules en el mismo directorio delproyecto.* 

## Migración

 *Una vez que se han instalado todas las dependencias necesarias para el proyecto, el siguiente paso es realizar una migración de la base de datos. 
 Esto es esencial para garantizar que la estructura de la base de datos esté alineada con los requisitos de la aplicación. Para llevar a cabo este proceso, ejecutaremos el siguiente comando:*

`npx prisma migrate dev --name init`

*Este comando, ejecutado en el entorno de desarrollo, desencadenará el proceso de migración de la base de datos y le dará un nombre significativo a esta migración, en este caso, "init".*

## Ejecucción 

 *Una vez que se ha completado la instalación de las dependencias y se ha realizado la migración necesaria de nuestra base de datos, 
 el siguiente paso es ejecutar el proyecto en sí. Para llevar a cabo esta tarea, utilizaremos el siguiente comando:*

 `npm run dev`

 *Este comando se encargará de iniciar y ejecutar la aplicación.*
