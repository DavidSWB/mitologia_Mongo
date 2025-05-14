const { Router } = require("express");
const router = Router();
const diosesModel = require("../Model/diosesModel");

router.get("/registroDivino/dioses/obtenerTodos", async (req, res) => {
    try {
        const result = await diosesModel.traerDioses();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los Dioses", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/dioses/obtenerDiosPorNombre/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const result = await diosesModel.traerDiosPorNombre(nombre);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener al Dios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/dioses/obtenerDiosPorId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await diosesModel.traerDiosPorId(id);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener al Dios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/registroDivino/dioses/agregarDios", async (req, res) => {
    try {
        const { nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id } = req.body;
        const result = await diosesModel.agregarDios(nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id);
        res.status(201).json({ message: "Dios agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar Dios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/registroDivino/dioses/eliminarDiosPorId/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await diosesModel.eliminarDios(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Dios no encontrado" });
        }
        res.status(200).json({ message: "Dios eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar Dios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/registroDivino/dioses/editarDiosPorId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id } = req.body;
        const result = await diosesModel.modificarDiosPorId(id, nombre, mitologia, titulo, simbolo, atributos, personalidad, enemigo_principal, descendencia, lugar_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Dios no encontrado" });
        }
        res.status(200).json({ message: "Dios actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar Dios", error);
        res.status(422).json({ message: "Error interno del servidor - " + error.message });
    }
});

module.exports = router;
