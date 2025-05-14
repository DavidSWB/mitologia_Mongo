// microDioses/Model/diosesModel.js
const mongoose = require("mongoose");

// Esquema del modelo de Dios
const diosSchema = new mongoose.Schema({
    nombre: String,
    mitologia: String,
    titulo: String,
    simbolo: String,
    atributos: String,
    personalidad: String,
    enemigo_principal: String,
    descendencia: String,
    lugar_id: String // puedes usar mongoose.Schema.Types.ObjectId si enlazas con otra colección
});

// Modelo
const Dios = mongoose.model("dioses", diosSchema);

// Funciones CRUD

async function traerDioses() {
    return await Dios.find();
}

async function traerDiosPorNombre(nombre) {
    return await Dios.findOne({ nombre });
}

async function traerDiosPorId(id) {
    return await Dios.findById(id);
}

async function agregarDios(nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id) {
    const nuevo = new Dios({ nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id });
    return await nuevo.save();
}

async function eliminarDios(id) {
    return await Dios.findByIdAndDelete(id);
}

async function modificarDiosPorId(id, nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id) {
    return await Dios.findByIdAndUpdate(id, {
        nombre,
        mitologia,
        titulo,
        simbolo,
        atributos,
        personalidad,
        enemigo_principal,
        descendencia,
        lugar_id
    }, { new: true }); // Devuelve el documento actualizado
}

// Exportación
module.exports = {
    traerDioses,
    traerDiosPorNombre,
    traerDiosPorId,
    agregarDios,
    eliminarDios,
    modificarDiosPorId
};
