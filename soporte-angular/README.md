Nombre del estudiante:
Ignacio Fuentes

Nombre del proyecto:
Sistema de gestión de soporte tecnico.

Descripción del proyecto:
Aplicación web para registrar, consultar, editar y eliminar tickets de soporte tecnico,
listando por prioridad.

Tecnologias utilizadas:

Frontend: 
Angular 22, Angular Router, formularios reactivos (ReactiveFormsModule HttpClient, TypeScript, HTML, CSS)

Backend:
Node.js, Express, cors, mysql2, dotenv

Base de datos: MySQL

Conexión y comunicación entre capas: 
api rest (http/json)

Guardado de progreso: 
Git, Github.

Requisitos de instalación:

Node.js (versión 20 o superior)
npm (gestor de paquetes de Node)
Angular CLI 22 (npm install -g @angular/cli)
MySQL 8

Creación de la base de datos:
1.-Entrar al MySQL 8.0 Command Line Client usando la contraseña.
2.-Ejecutar el archivo schema.sql que está en la raíz del proyecto: source C:/ruta/del/proyecto/EV2-angularSoporteTecnico/schema.sql

3.-Comprobar que se creó la tabla con los 3 tickets de prueba: SELECT * FROM soporte_db.tickets;
(schema.sql crea la base de datos soporte_db, la tabla tickets con sus campos y 3 tickets de prueba)

Variable de conexión con MySQL en el proyecto (api-soporte/.env):

DB_PASSWORD=(aqui va la contraseña de MySQL)

Pasos de ejecución del backend:
1.-Entrar a la carpeta donde se aloja el backend (api-soporte): cd api-soporte

2.-Instalar las dependencias: npm install

3.-Iniciar el servidor: node server.js

4.-Ir al navegador y colocar la URL correspondiente: http://localhost:3000/api/tickets

Pasos de ejecución del frontend:
1.-Entrar a la carpeta donde se aloja el frontend (soporte-angular): cd soporte-angular

2.-Instalar las dependencias: npm install

3.-Iniciar el servidor de desarrollo: ng serve --open

4.-Ir al navegador y colocar la URL correspondiente: http://localhost:4200

Listado de endpoints ubicados en la api:

GET /api/tickets (app.get): Obtiene la lista completa de todos los tickets registrados en la base de datos.

GET /api/tickets/:id (app.get): Busca y retorna los datos de un ticket específico mediante su id, si no existe responde 404.

POST /api/tickets (app.post): Recibe los datos de un nuevo ticket desde el formulario, valida que vengan todos los campos (si falta alguno responde 400) y lo guarda en la base de datos (responde 201).

PUT /api/tickets/:id (app.put): Actualiza la información de un ticket existente según su id, valida los campos y responde 404 si el ticket no existe.

DELETE /api/tickets/:id (app.delete): Elimina el registro de un ticket de la base de datos según su id.

Funcionalidades implementadas:
Listado de tickets obtenidos desde MySQL.
Registro de tickets mediante formulario con validaciones.
Edición de tickets, el formulario carga los datos del ticket según el id de la ruta.
Eliminación de tickets con confirmación previa.
Colores distintos según la prioridad (Baja, Media, Alta) y el estado (Pendiente, En Proceso, Resuelto).
Mensajes de validación por campo en el formulario.
Mensaje de error cuando la API no responde, con botón para reintentar.
Los datos se mantienen al recargar Angular y al reiniciar la API.

Estructura del proyecto:
schema.sql: Script para crear la base de datos, la tabla tickets y los datos de prueba.

Backend (api-soporte):
server.js: Punto de entrada de la API, configuración de Express y definición de los endpoints REST.
db.js: Conexión (pool) a la base de datos MySQL usando la contraseña del archivo .env.

Frontend (soporte-angular):
app.config.ts: Configuración de la aplicación, activa las rutas (provideRouter) y el cliente HTTP (provideHttpClient).
app.routes.ts: Navegación entre las vistas de la aplicación.
models/ticket.ts: Interfaz Ticket con la estructura de un ticket.
services/tickets.ts: Servicio para la comunicación y peticiones HTTP a la API.
components/cabecera: Título de la aplicación.
components/menu: Menú de navegación.
components/tickets: Listado de tickets, colores por estado y prioridad, y botón de eliminar.
components/formulario-ticket: Formulario para registrar y editar tickets con sus validaciones.

Declaración de uso de IA:

IA utilizada: Claude

Se usa IA principalmente para seguir una guía paso a paso basada en las Actividades Formativas 04, 05 y 06 y en la pauta de la evaluación, para revisar que el proyecto cumpliera la rúbrica, para conocer que hacen elementos que se desconoce su función general, y para resolver errores que aparecieron durante el desarrollo.

Pruebas realizadas:
1.-Prueba de listado (GET): Se abrió la vista Tickets y se mostraron los tickets guardados en MySQL.
2.-Prueba de registro (POST): Se creó un ticket desde el formulario de Angular y se comprobó en MySQL.
3.-Prueba de edición (PUT): Se editó un ticket, se cambió su estado, se recargó la página y el cambio se mantuvo.
4.-Prueba de eliminación (DELETE): Se eliminó un ticket aceptando la confirmación y desapareció de la vista y de MySQL. Al presionar Cancelar no se eliminó.
5.-Prueba de validación: Se envió el formulario vacío y aparecieron los mensajes en rojo, sin enviar datos a la API.
6.-Prueba de error: Se detuvo la API y al recargar la vista apareció el mensaje "No fue posible cargar los tickets" con el botón Reintentar.
7.-Prueba de persistencia: Se reinició la API y los tickets seguían disponibles.
8.-Prueba de compilación: ng build terminó sin errores.

Prueba de guardado:

mysql> SELECT * FROM soporte_db.tickets;
+----+-------------------------+-----------------+-------------------------------------------------------------+-------------------+-----------+------------+---------------------+
| id | asunto                  | solicitante     | descripcion                                                 | categoria         | prioridad | estado     | fechaRegistro       |
+----+-------------------------+-----------------+-------------------------------------------------------------+-------------------+-----------+------------+---------------------+
|  1 | Impresora no imprime    | Ana Torres      | La impresora de recepción muestra error de papel atascado.  | Hardware          | Media     | Pendiente  | 2026-10-29 17:46:30 |
|  2 | Sin acceso a internet   | Luis Rojas      | El laboratorio 2 no tiene conexión desde la mañana.         | Redes             | Alta      | En Proceso | 2026-10-29 17:46:30 |
|  3 | Restablecer contraseña  | Carla Muñoz     | La usuaria no puede ingresar a su correo institucional.     | Cuentas y accesos | Baja      | Resuelto   | 2026-10-29 17:46:30 |
|  4 | Problemas de conexión   | Ignacio Fuentes | Hay problemas de conexión en el router desde hace días.     | Hardware          | Media     | En Proceso | 2026-10-29 19:43:22 |
+----+-------------------------+-----------------+-------------------------------------------------------------+-------------------+-----------+------------+---------------------+
4 rows in set (0.00 sec)