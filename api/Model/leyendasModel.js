const { getConnection } = require("../mysqlDB");
const connection = getConnection();

async function traerLeyendas() {
  const [rows] = await connection.query("SELECT * FROM leyendas");
  return rows;
}

async function traerLeyendaPorId(id) {
  const [rows] = await connection.query("SELECT * FROM leyendas WHERE id_leyenda = ?", [id]);
  return rows;
}

async function agregarLeyenda(titulo, mitologia, protagonista, antagonista, resumen, ubicacion) {
  const [result] = await connection.query(
    "INSERT INTO leyendas (titulo, mitologia, protagonista, antagonista, resumen, ubicacion) VALUES (?, ?, ?, ?, ?, ?)",
    [titulo, mitologia, protagonista, antagonista, resumen, ubicacion]
  );
  return result;
}

async function eliminarLeyenda(id) {
  const [result] = await connection.query("DELETE FROM leyendas WHERE id_leyenda = ?", [id]);
  return result;
}

async function modificarLeyenda(id, titulo, mitologia, protagonista, antagonista, resumen, ubicacion) {
  const [result] = await connection.query(
    "UPDATE leyendas SET titulo = ?, mitologia = ?, protagonista = ?, antagonista = ?, resumen = ?, ubicacion = ? WHERE id_leyenda = ?",
    [titulo, mitologia, protagonista, antagonista, resumen, ubicacion, id]
  );
  return result;
}

module.exports = {
  traerLeyendas,
  traerLeyendaPorId,
  agregarLeyenda,
  eliminarLeyenda,
  modificarLeyenda
};
