const express = require("express");
const API = require("./api/api.json");
const app = express();

app.use(express.json());

const getQuantPeople = () => {
  return API.length;
};

let fechaActual = new Date();

//Ruta principal
app.get("/info", (req, res) => {
  res.send(`
  <div>
  <h2>La lista de telefonos tiene informacion de ${getQuantPeople()} personas</h2>
  <h2>${fechaActual}</h2>
  </div>
  `);
});

//Obteniendo todos los datos
app.get("/api/persons", (req, res) => {
  res.json(API);
});

//Obteniendo los datos de una persona en particular
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = API.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res
      .status(400)
      .end({ error: "no se pudo encontrar el usuario con ese id" });
  }
});

//Borrando los datos de una persona
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = API.filter((p) => p.id !== id);

  if (person) {
    res.json(person);
  } else {
    res.status(400).end({ error: "no se pudo borrar el usuario con ese id" });
  }
});

//Crear nuevos datos

const generateId = () => {
  return new Date().getTime();
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "name missed" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "number missed" });
  }

  const repeated = API.find((p) => p.name === body.name);
  // console.log(repeated);

  if (repeated) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  API.push(person);

  res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Tu servidor esta en http://localhost:${PORT}`);
});
