const mysql = require("mysql2/promise");

let connection = null;

async function connectToMySQL() {
  try {
    connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log("✅ Conexión exitosa a MySQL");
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
    process.exit(1);
  }
}

function getConnection() {
  if (!connection) {
    throw new Error("La conexión a MySQL no está disponible aún.");
  }
  return connection;
}

module.exports = {
  getConnection,
  connectToMySQL
};

connectToMySQL();
