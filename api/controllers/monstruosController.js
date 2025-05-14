const { Router } = require("express");
const router = Router();
const model = require("../Model/monstruosModel");

router.get("/registroDivino/monstruos/obtenerTodos", async (req, res) => {
    try {
        const data = await model.traerMonstruos();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener monstruos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/monstruos/obtenerMonstruoPorNombre/:nombre", async (req, res) => {
    try {
        const data = await model.traerMonstruoPorNombre(req.params.nombre);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener monstruo por nombre:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/monstruos/obtenerMonstruoPorId/:id", async (req, res) => {
    try {
        const data = await model.traerMonstruoPorId(req.params.id);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener monstruo por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/registroDivino/monstruos/agregarMonstruo", async (req, res) => {
    try {
        const { nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro } = req.body;
        await model.agregarMonstruo(nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro);
        res.status(201).json({ message: "Monstruo agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar monstruo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/registroDivino/monstruos/eliminarMonstruoPorId/:id", async (req, res) => {
    try {
        const result = await model.eliminarMonstruo(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Monstruo no encontrado" });
        }
        res.json({ message: "Monstruo eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar monstruo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/registroDivino/monstruos/editarMonstruoPorId/:id", async (req, res) => {
    try {
        const { nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro } = req.body;
        const result = await model.modificarMonstruo(req.params.id, nombre, mitologia, descripcion, enemigo_principal, habilidad_principal, nivel_peligro);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Monstruo no encontrado" });
        }
        res.json({ message: "Monstruo actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar monstruo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
