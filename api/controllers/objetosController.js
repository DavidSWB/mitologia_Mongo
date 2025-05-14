const { Router } = require("express");
const router = Router();
const model = require("../Model/objetosModel");

router.get("/registroDivino/objetos/obtenerTodos", async (req, res) => {
    try {
        const data = await model.traerObjetos();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener objetos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/objetos/obtenerObjetoPorId/:id", async (req, res) => {
    try {
        const data = await model.traerObjetoPorId(req.params.id);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener objeto por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/objetos/obtenerObjetoPorNombre/:nombre", async (req, res) => {
    try {
        const data = await model.traerObjetoPorNombre(req.params.nombre);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener objeto por nombre:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/registroDivino/objetos/agregarObjeto", async (req, res) => {
    try {
        const { nombre, mitologia, descripcion, portador_famoso, poder_principal } = req.body;
        await model.agregarObjeto(nombre, mitologia, descripcion, portador_famoso, poder_principal);
        res.status(201).json({ message: "Objeto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar objeto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/registroDivino/objetos/eliminarObjetoPorId/:id", async (req, res) => {
    try {
        const result = await model.eliminarObjeto(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Objeto no encontrado" });
        }
        res.json({ message: "Objeto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar objeto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/registroDivino/objetos/editarObjetoPorId/:id", async (req, res) => {
    try {
        const { nombre, mitologia, descripcion, portador_famoso, poder_principal } = req.body;
        const result = await model.modificarObjeto(req.params.id, nombre, mitologia, descripcion, portador_famoso, poder_principal);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Objeto no encontrado" });
        }
        res.json({ message: "Objeto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar objeto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
