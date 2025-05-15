import { useEffect, useState } from "react";
import ModalAgregar from "../components/modals/ModalAgregar";
import ModalEditar from "../components/modals/ModalEditar";
import ModalConfirmar from "../components/modals/ModalConfirmar";

function Semidioses() {
  const defaultForm = {
    nombre: "",
    mitologia: "",
    campamento: "",
    arma_herramienta: "",
    personalidad: "",
    color_cabello: "",
    habilidades: "",
    padre_divino: "",
    lugar_origen: "",
    enemigo_principal: "",
    estatus: ""
  };

  const [semidioses, setSemidioses] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [selected, setSelected] = useState(null);

  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const fetchSemidioses = async () => {
    const res = await fetch("http://mitologia-mongo.onrender.com/registroDivino/semidioses/obtenerTodos");
    const data = await res.json();
    setSemidioses(data);
  };

  const agregar = async () => {
    await fetch("http://mitologia-mongo.onrender.com/registroDivino/semidioses/agregarSemidios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowAgregar(false);
    setForm(defaultForm);
    fetchSemidioses();
  };

  const actualizar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/semidioses/editarSemidiosPorId/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowEditar(false);
    setSelected(null);
    setForm(defaultForm);
    fetchSemidioses();
  };

  const eliminar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/semidioses/eliminarSemidiosPorId/${selected._id}`, {
      method: "DELETE"
    });
    setShowConfirmar(false);
    setSelected(null);
    fetchSemidioses();
  };

  useEffect(() => {
    fetchSemidioses();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAgregar(true)}
        >
          Agregar Semidios
        </button>
      </div>

      <ModalAgregar
        isOpen={showAgregar}
        onClose={() => setShowAgregar(false)}
        onAdd={agregar}
        form={form}
        setForm={setForm}
      />
      <ModalEditar
        isOpen={showEditar}
        onClose={() => setShowEditar(false)}
        onUpdate={actualizar}
        form={form}
        setForm={setForm}
      />
      <ModalConfirmar
        isOpen={showConfirmar}
        onClose={() => setShowConfirmar(false)}
        onConfirm={eliminar}
        nombre={selected?.nombre}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {semidioses.map((s) => (
          <div key={s._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{s.nombre}</h2>
            <p><strong>Campamento:</strong> {s.campamento}</p>
            <p><strong>Padre Divino:</strong> {s.padre_divino}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(s); setForm(s); setShowEditar(true); }}>
                Editar
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(s); setShowConfirmar(true); }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Semidioses;
