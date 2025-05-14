const mysql = require("mysql2/promise");

let connection;

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
      queueLimit: 0
    });

    console.log("✅ Conexión exitosa a MySQL");
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
    process.exit(1);
  }
}

module.exports = {
  getConnection: () => connection,
  connectToMySQL
};

// Conectar inmediatamente
connectToMySQL();