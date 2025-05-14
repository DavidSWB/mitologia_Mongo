const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));
