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
const express = require("express");
const app = express();

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Tu servidor esta en http://localhost:${PORT}`);
});
