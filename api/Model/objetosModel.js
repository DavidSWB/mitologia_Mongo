const { getConnection } = require("../mysqlDB");
const connection = getConnection();

async function traerObjetos() {
  const [rows] = await connection.query("SELECT * FROM objetos_memorables");
  return rows;
}

async function traerObjetoPorId(id) {
  const [rows] = await connection.query("SELECT * FROM objetos_memorables WHERE id_objeto = ?", [id]);
  return rows;
}

async function traerObjetoPorNombre(nombre) {
  const [rows] = await connection.query("SELECT * FROM objetos_memorables WHERE nombre = ?", [nombre]);
  return rows;
}

async function agregarObjeto(nombre, mitologia, descripcion, portador_famoso, poder_principal) {
  const [result] = await connection.query(
    "INSERT INTO objetos_memorables (nombre, mitologia, descripcion, portador_famoso, poder_principal) VALUES (?, ?, ?, ?, ?)",
    [nombre, mitologia, descripcion, portador_famoso, poder_principal]
  );
  return result;
}

async function eliminarObjeto(id) {
  const [result] = await connection.query("DELETE FROM objetos_memorables WHERE id_objeto = ?", [id]);
  return result;
}

async function modificarObjeto(id, nombre, mitologia, descripcion, portador_famoso, poder_principal) {
  const [result] = await connection.query(
    "UPDATE objetos_memorables SET nombre = ?, mitologia = ?, descripcion = ?, portador_famoso = ?, poder_principal = ? WHERE id_objeto = ?",
    [nombre, mitologia, descripcion, portador_famoso, poder_principal, id]
  );
  return result;
}

module.exports = {
  traerObjetos,
  traerObjetoPorId,
  traerObjetoPorNombre,
  agregarObjeto,
  eliminarObjeto,
  modificarObjeto
};
