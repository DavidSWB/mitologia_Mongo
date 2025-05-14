const mongoose = require("mongoose");

const lugarSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    region: String,
    pais: String,
    fundacion: String,
    lider_actual: String,
    numero_habitantes: Number,
    descripcion: String,
    importancia: String,
    conectado_con: String
});

const Lugar = mongoose.model("lugares", lugarSchema);

// CRUD
async function traerLugares() {
    return await Lugar.find();
}

async function traerLugar(nombre) {
    return await Lugar.findOne({ nombre });
}

async function traerLugarId(id) {
    return await Lugar.findById(id);
}

async function agregarLugar(...args) {
    const [nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con] = args;
    const nuevo = new Lugar({ nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con });
    return await nuevo.save();
}

async function eliminarLugar(id) {
    const result = await Lugar.findByIdAndDelete(id);
    return result !== null;
}

async function modificarLugarId(id, ...args) {
    const [nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con] = args;
    return await Lugar.findByIdAndUpdate(
        id,
        { nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con },
        { new: true }
    );
}

module.exports = {
    traerLugares,
    traerLugar,
    traerLugarId,
    agregarLugar,
    eliminarLugar,
    modificarLugarId
};
