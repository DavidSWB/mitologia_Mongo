// src/pages/Monstruos.jsx
import { useEffect, useState } from "react";
import ModalAgregar from "../components/modals/ModalAgregar";
import ModalEditar from "../components/modals/ModalEditar";
import ModalConfirmar from "../components/modals/ModalConfirmar";

function Monstruos() {
  const defaultForm = {
    nombre: "",
    mitologia: "",
    descripcion: "",
    enemigo_principal: "",
    habilidad_principal: "",
    nivel_peligro: ""
  };

  const [monstruos, setMonstruos] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [selected, setSelected] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const fetchMonstruos = async () => {
    const res = await fetch("http://mitologia-mongo.onrender.com/registroDivino/monstruos/obtenerTodos");
    const data = await res.json();
    setMonstruos(data);
  };

  const agregar = async () => {
    await fetch("http://mitologia-mongo.onrender.com/registroDivino/monstruos/agregarMonstruo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowAgregar(false);
    setForm(defaultForm);
    fetchMonstruos();
  };

  const actualizar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/monstruos/editarMonstruoPorId/${selected.id_monstruo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowEditar(false);
    setSelected(null);
    setForm(defaultForm);
    fetchMonstruos();
  };

  const eliminar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/monstruos/eliminarMonstruoPorId/${selected.id_monstruo}`, {
      method: "DELETE"
    });
    setShowConfirmar(false);
    setSelected(null);
    fetchMonstruos();
  };

  useEffect(() => {
    fetchMonstruos();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowAgregar(true)}>Agregar Monstruo</button>
      </div>

      <ModalAgregar isOpen={showAgregar} onClose={() => setShowAgregar(false)} onAdd={agregar} form={form} setForm={setForm} />
      <ModalEditar isOpen={showEditar} onClose={() => setShowEditar(false)} onUpdate={actualizar} form={form} setForm={setForm} />
      <ModalConfirmar isOpen={showConfirmar} onClose={() => setShowConfirmar(false)} onConfirm={eliminar} nombre={selected?.nombre} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {monstruos.map((m) => (
          <div key={m.id_monstruo} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{m.nombre}</h2>
            <p><strong>Habilidad:</strong> {m.habilidad_principal}</p>
            <p><strong>Nivel:</strong> {m.nivel_peligro}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(m); setForm(m); setShowEditar(true); }}>Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(m); setShowConfirmar(true); }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Monstruos;
