const { getConnection } = require("../mysqlDB");
const connection = getConnection();

async function traerMonstruos() {
  const [rows] = await connection.query("SELECT * FROM monstruos");
  return rows;
}

async function traerMonstruoPorNombre(nombre) {
  const [rows] = await connection.query("SELECT * FROM monstruos WHERE nombre = ?", [nombre]);
  return rows;
}

async function traerMonstruoPorId(id) {
  const [rows] = await connection.query("SELECT * FROM monstruos WHERE id_monstruo = ?", [id]);
  return rows;
}

async function agregarMonstruo(nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro) {
  const [result] = await connection.query(
    "INSERT INTO monstruos (nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro]
  );
  return result;
}

async function eliminarMonstruo(id) {
  const [result] = await connection.query("DELETE FROM monstruos WHERE id_monstruo = ?", [id]);
  return result;
}

async function modificarMonstruo(id, nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro) {
  const [result] = await connection.query(
    "UPDATE monstruos SET nombre = ?, mitologia = ?, descripcion = ?, enemigo_principal = ?, habilidad_principal = ?, nivel_peligro = ? WHERE id_monstruo = ?",
    [nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro, id]
  );
  return result;
}

module.exports = {
  traerMonstruos,
  traerMonstruoPorNombre,
  traerMonstruoPorId,
  agregarMonstruo,
  eliminarMonstruo,
  modificarMonstruo
};
