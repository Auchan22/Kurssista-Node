CLASE 1: Servidor Web Simple

Podemos crear un servidor web sencillo por medio del modulo http, permitiendonos mostrar codigo en un servidor creado por nosotros mismos.
El codigo de este servidor sera el siguiente:

const http = require('http')

const app = http.createServer((request, response) => {
response.writeHead(200, { 'Content-Type': 'text/plain' })
response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

→ const http = require('http'): estamos importando el modulo de servidor web integrado en Node.
→ http.createServer: es una funcion, que nos permite crear nuestro servidor. Recibe 2 parametros:
_ request: es el pedido del lado del cliente al servidor.
_ response: es lo que el servidor va a devolver. En este caso, devolvera un encabezado, especificando el tipo de respuesta (response.writeHead), y el contenido de esta respuesta (response.end).
Esta funcion es un manejador de eventos, que se llama cada vez que se realiza una solicitud HTTP a la direccion de nuestro server. Esta solicitud, se responde con un estado "200", y nos devuelve un contenido
→ app.listen(): por medio de esta funcion, "escuchamos" nuestro servidor.

CLASE 2: Usando Express

Nuestro codigo de servidor se puede ver "facilitado" por medio del uso de la librería "Express". Para poder usar express en nuestro proyecto, la deberemos importar, y utilizarla como una funcion.
Por medio de la funcion 'app.get(param1, param2)', vamos a poder definir las rutas que queramos de nuestra aplicacion:
↔ param1: es la ruta o url de nuestra aplicación.
↔ param2: recibe un controlador de eventos del tipo (req, res) =>{}
§´req´: el contenedor de la informacion solicitada por medio del protocolo HTTP.
§´res´: nos permite definir como se respondera la solicitud. Por medio del metodo res.send(), podemos responder la solicitud. Express, sin importar la respuesta, establece automaticamente el header "Content-Type".
En el caso que enviamos el JSON, la transformacion de este objeto se da automatica por medio de express.

CLASE 3: Nodemon

Nodemon es un paquete que observa los archivos en el directorio en donde se inicia nodemon, y si algun archivo cambia, nodemon reinicia automaticamente la aplicacion node.

CLASE 10: Json-parser
Json-parser es un middleware que incorpora Express y nos permite tomar los datos JSON de una solicitud y transformarlos en un objeto Javascript. Se utiliza de la siguiente forma: app.use(express.json()).
Con la ayuda de Insomnia, vamos a poder crear un nuevo elemento en nuestra lista, y verificar que los datos se envian dentro del body.
