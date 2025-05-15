// src/pages/Leyendas.jsx
import { useEffect, useState } from "react";
import ModalAgregar from "../components/modals/ModalAgregar";
import ModalEditar from "../components/modals/ModalEditar";
import ModalConfirmar from "../components/modals/ModalConfirmar";

function Leyendas() {
  const defaultForm = {
    titulo: "",
    mitologia: "",
    protagonista: "",
    antagonista: "",
    resumen: "",
    ubicacion: ""
  };

  const [leyendas, setLeyendas] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [selected, setSelected] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const fetchLeyendas = async () => {
    const res = await fetch("http://mitologia-mongo.onrender.com/registroDivino/leyendas/obtenerTodos");
    const data = await res.json();
    setLeyendas(data);
  };

  const agregar = async () => {
    await fetch("http://mitologia-mongo.onrender.com/registroDivino/leyendas/agregarLeyenda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowAgregar(false);
    setForm(defaultForm);
    fetchLeyendas();
  };

  const actualizar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/leyendas/editarLeyendaPorId/${selected.id_leyenda}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowEditar(false);
    setSelected(null);
    setForm(defaultForm);
    fetchLeyendas();
  };

  const eliminar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/leyendas/eliminarLeyendaPorId/${selected.id_leyenda}`, {
      method: "DELETE"
    });
    setShowConfirmar(false);
    setSelected(null);
    fetchLeyendas();
  };

  useEffect(() => {
    fetchLeyendas();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowAgregar(true)}>Agregar Leyenda</button>
      </div>

      <ModalAgregar isOpen={showAgregar} onClose={() => setShowAgregar(false)} onAdd={agregar} form={form} setForm={setForm} />
      <ModalEditar isOpen={showEditar} onClose={() => setShowEditar(false)} onUpdate={actualizar} form={form} setForm={setForm} />
      <ModalConfirmar isOpen={showConfirmar} onClose={() => setShowConfirmar(false)} onConfirm={eliminar} nombre={selected?.titulo} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {leyendas.map((l) => (
          <div key={l.id_leyenda} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{l.titulo}</h2>
            <p><strong>Mitología:</strong> {l.mitologia}</p>
            <p><strong>Ubicación:</strong> {l.ubicacion}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(l); setForm(l); setShowEditar(true); }}>Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(l); setShowConfirmar(true); }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leyendas;
