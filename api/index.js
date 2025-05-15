// mitologia/api/index.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// ✅ CORS explícito para Vercel
const corsOptions = {
  origin: ["https://mitologia-front.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

// Conexiones a bases de datos
require("./db"); // MongoDB
require("./mysqlDB"); // MySQL

// Controladores
const diosesController = require("./controllers/diosesController");
const semidiosesController = require("./controllers/semidiosesController");
const lugaresController = require("./controllers/lugaresController");
const monstruosController = require("./controllers/monstruosController");
const leyendasController = require("./controllers/leyendasController");
const objetosController = require("./controllers/objetosController");

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
