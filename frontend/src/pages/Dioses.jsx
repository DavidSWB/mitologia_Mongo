import { useEffect, useState } from "react";
import DiosCard from "../components/cards/DiosCard";
import ModalAgregar from "../components/modals/ModalAgregar";
import ModalEditar from "../components/modals/ModalEditar";
import ModalConfirmar from "../components/modals/ModalConfirmar";

export default function Dioses() {
  const defaultForm = {
    nombre: "",
    mitologia: "",
    titulo: "",
    simbolo: "",
    atributos: "",
    personalidad: "",
    enemigo_principal: "",
    descendencia: "",
    lugar_id: "",
  };

  const [dioses, setDioses] = useState([]);
  const [form, setForm] = useState(defaultForm);

  // Modales
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const [selected, setSelected] = useState(null);

  const fetchDioses = async () => {
    try {
      const res = await fetch("http://mitologia-mongo.onrender.com/registroDivino/dioses/obtenerTodos");
      const data = await res.json();
      setDioses(data);
    } catch (error) {
      console.error("Error al obtener dioses:", error);
    }
  };

  const agregarDios = async () => {
    try {
      await fetch("http://mitologia-mongo.onrender.com/registroDivino/dioses/agregarDios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowAgregar(false);
      setForm(defaultForm);
      fetchDioses();
    } catch (error) {
      console.error("Error al agregar dios:", error);
    }
  };

  const actualizarDios = async () => {
    try {
      await fetch(`http://mitologia-mongo.onrender.com/registroDivino/dioses/editarDiosPorId/${selected.id_dios}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowEditar(false);
      setSelected(null);
      setForm(defaultForm);
      fetchDioses();
    } catch (error) {
      console.error("Error al editar dios:", error);
    }
  };

  const eliminarDios = async () => {
    try {
      await fetch(`http://mitologia-mongo.onrender.com/registroDivino/dioses/eliminarDiosPorId/${selected._id}`, {
        method: "DELETE",
      });
      setShowConfirmar(false);
      setSelected(null);
      fetchDioses();
    } catch (error) {
      console.error("Error al eliminar dios:", error);
    }
  };

  useEffect(() => {
    fetchDioses();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowAgregar(true)}
        >
          Agregar Dios
        </button>
      </div>

      <ModalAgregar
        isOpen={showAgregar}
        onClose={() => setShowAgregar(false)}
        onAdd={agregarDios}
        form={form}
        setForm={setForm}
      />

      <ModalEditar
        isOpen={showEditar}
        onClose={() => setShowEditar(false)}
        form={form}
        setForm={setForm}
        onUpdate={actualizarDios}
      />

      <ModalConfirmar
        isOpen={showConfirmar}
        onClose={() => setShowConfirmar(false)}
        onConfirm={eliminarDios}
        nombre={selected?.nombre}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dioses.map((dios) => (
          <DiosCard
            key={dios._id}
            dios={dios}
            onEdit={(d) => {
              setSelected(d);
              setForm(d);
              setShowEditar(true);
            }}
            onDelete={(d) => {
              setSelected(d);
              setShowConfirmar(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
