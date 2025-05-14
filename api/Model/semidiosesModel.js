const mongoose = require("mongoose");

const semidiosSchema = new mongoose.Schema({
    nombre: String,
    mitologia: String,
    campamento: String,
    arma_herramienta: String,
    personalidad: String,
    color_cabello: String,
    habilidades: String,
    padre_divino: String,
    lugar_origen: String,
    enemigo_principal: String,
    estatus: String
});

const Semidios = mongoose.model("semidioses", semidiosSchema);

// CRUD
async function traerSemidioses() {
    return await Semidios.find();
}

async function traerSemidios(nombre) {
    return await Semidios.findOne({ nombre });
}

async function traerSemidiosId(id) {
    return await Semidios.findById(id);
}

async function agregarSemidios(...args) {
    const [nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus] = args;
    const nuevo = new Semidios({ nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus });
    return await nuevo.save();
}

async function eliminarSemidios(id) {
    const result = await Semidios.findByIdAndDelete(id);
    return result !== null;
}

async function modificarSemidiosId(id, ...args) {
    const [nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus] = args;
    return await Semidios.findByIdAndUpdate(
        id,
        { nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus },
        { new: true }
    );
}

module.exports = {
    traerSemidioses,
    traerSemidios,
    traerSemidiosId,
    agregarSemidios,
    eliminarSemidios,
    modificarSemidiosId
};
