import { useEffect, useState } from "react";
import ModalAgregar from "../components/modals/ModalAgregar";
import ModalEditar from "../components/modals/ModalEditar";
import ModalConfirmar from "../components/modals/ModalConfirmar";

function Lugares() {
  const defaultForm = {
    nombre: "",
    tipo: "",
    region: "",
    pais: "",
    fundacion: "",
    lider_actual: "",
    numero_habitantes: "",
    descripcion: "",
    importancia: "",
    conectado_con: ""
  };

  const [lugares, setLugares] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [selected, setSelected] = useState(null);

  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const fetchLugares = async () => {
    const res = await fetch("http://mitologia-mongo.onrender.com/registroDivino/lugares/obtenerTodos");
    const data = await res.json();
    setLugares(data);
  };

  const agregar = async () => {
    await fetch("http://mitologia-mongo.onrender.com/registroDivino/lugares/agregarLugar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowAgregar(false);
    setForm(defaultForm);
    fetchLugares();
  };

  const actualizar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/lugares/editarLugarPorId/${selected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setShowEditar(false);
    setSelected(null);
    setForm(defaultForm);
    fetchLugares();
  };

  const eliminar = async () => {
    await fetch(`http://mitologia-mongo.onrender.com/registroDivino/lugares/eliminarLugarPorId/${selected._id}`, {
      method: "DELETE"
    });
    setShowConfirmar(false);
    setSelected(null);
    fetchLugares();
  };

  useEffect(() => {
    fetchLugares();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAgregar(true)}
        >
          Agregar Lugar
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
        {lugares.map((lugar) => (
          <div key={lugar._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{lugar.nombre}</h2>
            <p><strong>Región:</strong> {lugar.region}</p>
            <p><strong>Importancia:</strong> {lugar.importancia}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(lugar); setForm(lugar); setShowEditar(true); }}>
                Editar
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => { setSelected(lugar); setShowConfirmar(true); }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lugares;
