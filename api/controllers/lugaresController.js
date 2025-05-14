const { Router } = require("express");
const router = Router();
const lugaresModel = require("../Model/lugaresModel");

router.get("/registroDivino/lugares/obtenerTodos", async (req, res) => {
    try {
        const result = await lugaresModel.traerLugares();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los lugares", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/lugares/obtenerLugarPorNombre/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const result = await lugaresModel.traerLugar(nombre);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener el lugar", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/registroDivino/lugares/obtenerLugarPorId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await lugaresModel.traerLugarId(id);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener el lugar por ID", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/registroDivino/lugares/agregarLugar", async (req, res) => {
    try {
        const { nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con } = req.body;
        await lugaresModel.agregarLugar(nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con);
        res.status(201).json({ message: "Lugar agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar lugar", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/registroDivino/lugares/eliminarLugarPorId/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const success = await lugaresModel.eliminarLugar(id);
        if (!success) {
            return res.status(404).json({ message: "Lugar no encontrado" });
        }
        res.status(200).json({ message: "Lugar eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar lugar", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/registroDivino/lugares/editarLugarPorId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con } = req.body;
        const result = await lugaresModel.modificarLugarId(id, nombre, tipo, region, pais, fundacion, lider_actual, numero_habitantes, descripcion, importancia, conectado_con);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Lugar no encontrado" });
        }
        res.status(200).json({ message: "Lugar actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar lugar", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
