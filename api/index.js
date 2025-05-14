// backend/index.js

const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // ← importante para permitir conexión con el frontend
const app = express();

// Conexión a MongoDB
require("./db");

// Importar todos los controladores
const diosesController = require("./controllers/diosesController");
const semidiosesController = require("./controllers/semidiosesController");
const lugaresController = require("./controllers/lugaresController");

// Middleware
app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use(diosesController);
app.use(semidiosesController);
app.use(lugaresController);

// Iniciar servidor
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
