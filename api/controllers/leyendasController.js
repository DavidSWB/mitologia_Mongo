const { Router } = require("express");
const router = Router();
const model = require("../Model/leyendasModel");

router.get("/registroDivino/leyendas/obtenerTodos", async (req, res) => {
    try {
        const data = await model.traerLeyendas();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener leyendas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/leyendas/obtenerLeyendaPorId/:id", async (req, res) => {
    try {
        const data = await model.traerLeyendaPorId(req.params.id);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener leyenda:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/registroDivino/leyendas/agregarLeyenda", async (req, res) => {
    try {
        const { titulo, mitologia, protagonista, antagonista, resumen, ubicacion } = req.body;
        await model.agregarLeyenda(titulo, mitologia, protagonista, antagonista, resumen, ubicacion);
        res.status(201).json({ message: "Leyenda agregada correctamente" });
    } catch (error) {
        console.error("Error al agregar leyenda:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/registroDivino/leyendas/eliminarLeyendaPorId/:id", async (req, res) => {
    try {
        const result = await model.eliminarLeyenda(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Leyenda no encontrada" });
        }
        res.json({ message: "Leyenda eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar leyenda:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/registroDivino/leyendas/editarLeyendaPorId/:id", async (req, res) => {
    try {
        const { titulo, mitologia, protagonista, antagonista, resumen, ubicacion } = req.body;
        const result = await model.modificarLeyenda(req.params.id, titulo, mitologia, protagonista, antagonista, resumen, ubicacion);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Leyenda no encontrada" });
        }
        res.json({ message: "Leyenda actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar leyenda:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
