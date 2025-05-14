const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Conexiones a bases de datos
require("./db"); // Conexión a MongoDB
require("./mysqlDB"); // Nueva conexión para MySQL

// Importar controladores
const diosesController = require("./controllers/diosesController");
const semidiosesController = require("./controllers/semidiosesController");
const lugaresController = require("./controllers/lugaresController");
const monstruosController = require("./controllers/monstruosController");
const leyendasController = require("./controllers/leyendasController");
const objetosController = require("./controllers/objetosController");

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use(diosesController);
app.use(semidiosesController);
app.use(lugaresController);
app.use(monstruosController);
app.use(leyendasController);
app.use(objetosController);

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});