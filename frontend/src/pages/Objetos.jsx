// src/pages/Objetos.jsx
import { useEffect, useState } from "react";
import ModalAgregar from "../components/modals/ModalAgregar";
import ModalEditar from "../components/modals/ModalEditar";
import ModalConfirmar from "../components/modals/ModalConfirmar";

function Objetos() {
  const defaultForm = {
    nombre: "",
    mitologia: "",
    descripcion: "",
    portador_famoso: "",
    poder_principal: ""
  };

  const [objetos, setObjetos] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [selected, setSelected] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const fetchObjetos = async () => {
    const res = await fetch("http://mitologia-mongo.onrender.com/registroDivino/objetos/obtenerTodos");
    const data = await res.json();
    setObjetos(data);
  };

  const agregar = async () => {
    await fetch("http://mitologia-mongo.onrender.com/registroDivino/objetos/agregarObjeto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowAgregar(false);
    setForm(defaultForm);
    fetchObjetos();
  };

  const actualizar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/objetos/editarObjetoPorId/${selected.id_objeto}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowEditar(false);
    setSelected(null);
    setForm(defaultForm);
    fetchObjetos();
  };

  const eliminar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/objetos/eliminarObjetoPorId/${selected.id_objeto}`, {
      method: "DELETE"
    });
    setShowConfirmar(false);
    setSelected(null);
    fetchObjetos();
  };

  useEffect(() => {
    fetchObjetos();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowAgregar(true)}>Agregar Objeto</button>
      </div>

      <ModalAgregar isOpen={showAgregar} onClose={() => setShowAgregar(false)} onAdd={agregar} form={form} setForm={setForm} />
      <ModalEditar isOpen={showEditar} onClose={() => setShowEditar(false)} onUpdate={actualizar} form={form} setForm={setForm} />
      <ModalConfirmar isOpen={showConfirmar} onClose={() => setShowConfirmar(false)} onConfirm={eliminar} nombre={selected?.nombre} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {objetos.map((o) => (
          <div key={o.id_objeto} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{o.nombre}</h2>
            <p><strong>Mitología:</strong> {o.mitologia}</p>
            <p><strong>Poder:</strong> {o.poder_principal}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(o); setForm(o); setShowEditar(true); }}>Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(o); setShowConfirmar(true); }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Objetos;
