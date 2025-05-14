
const { Router } = require("express");
const router = Router();
const semidiosesModel = require("../Model/semidiosesModel");


router.get("/registroDivino/semidioses/obtenerTodos", async (req, res) => {
    try {
        const result = await semidiosesModel.traerSemidioses();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los Semidioses", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/semidioses/obtenerSemidiosPorNombre/:semidios", async (req, res) => {
    try {
        const semidios = String(req.params.semidios);
        const result = await semidiosesModel.traerSemidios(semidios);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener al Semidios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/semidioses/obtenerSemidiosPorId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await semidiosesModel.traerSemidiosId(id);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener al Semidios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/registroDivino/semidioses/agregarSemidios", async (req, res) => {
    try {
        const { nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus } = req.body;
        const result = await semidiosesModel.agregarSemidios(nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus);
        res.status(201).json({ message: "Semidios Agregado Correctamente"});
    } catch (error) {
        console.error("Error al agregar semidios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/registroDivino/semidioses/eliminarSemidiosPorId/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await semidiosesModel.eliminarSemidios(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Semidios eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar Semidios", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/registroDivino/semidioses/editarSemidiosPorId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus } = req.body;
        const result = await semidiosesModel.modificarSemidiosId(id, nombre, mitologia, campamento, arma_herramienta, personalidad, color_cabello, habilidades, padre_divino, lugar_origen, enemigo_principal, estatus);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Semidio no encontrado" });
        }
        res.status(200).json({ message: "Semidios actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar Semidios", error);
        res.status(422).json({ message: "Error interno del servidor - " + error.message });
    }
});

module.exports = router;
