// CLASE 1
// // const http = require("http"); Clase 1

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

// const app = http.createServer((req, res) => {
//   //   res.writeHead(200, { "Content-Type": "text/plain" }); Clase 1 Version 1
//   res.writeHead(200, { "Content-Type": "application/json" }); /*Clase 1 Version 2 */
//   res.end(JSON.stringify(notes));
// });

// const PORT = 3001;

// app.listen(PORT);
// console.log(`Tu app esta lista en http://localhost:${PORT}`);

//CLASE 2
const { response } = require("express");
const express = require("express");
const nodemon = require("nodemon");
const app = express();

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());
app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//Ruta principal
app.get("/", (req, res) => {
  res.send("<h1>Hola world</h1>");
});

//Obteniendo todos los recursos
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//Obteniendo un solo recurso
app.get("/api/notes/:id", (req, res) => {
  //   console.log(req.params);
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  //   console.log(note);

  if (note) {
    res.json(note);
  } else {
    res.status(400).end();
  }
});

//Borrando un recurso, utilizando el metodo .delete()
app.delete("/api/notes/:id", (req, res) => {
  //   console.log(req.params);
  const id = Number(req.params.id);
  const note = notes.filter((note) => note.id !== id);
  //   console.log(note);

  if (note) {
    res.json(note);
  } else {
    res.status(400).end();
  }
});

//Creando un recurso con el metodo post
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  // console.log(note);
  // console.log(req.headers);

  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
    date: new Date(),
  };

  notes = notes.concat(note);

  res.json(note);
});

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Tu servidor esta en http://localhost:${PORT}`);
});
