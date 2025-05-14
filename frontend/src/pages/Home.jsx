import { useState } from "react";
import Dioses from "./Dioses";
import Semidioses from "./Semidioses";
import Lugares from "./Lugares";

const SECCIONES = ["dioses", "semidioses", "lugares"];

function Home() {
  const [index, setIndex] = useState(0);

  const avanzar = () => setIndex((prev) => (prev + 1) % SECCIONES.length);
  const retroceder = () => setIndex((prev) => (prev - 1 + SECCIONES.length) % SECCIONES.length);

  const seccion = SECCIONES[index];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Registro Divino Mongo- {seccion.charAt(0).toUpperCase() + seccion.slice(1)}</h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={retroceder}
          className="text-2xl bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          ⟵
        </button>

        <div className="text-lg font-semibold capitalize">{seccion}</div>

        <button
          onClick={avanzar}
          className="text-2xl bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          ⟶
        </button>
      </div>

      {seccion === "dioses" && <Dioses />}
      {seccion === "semidioses" && <Semidioses />}
      {seccion === "lugares" && <Lugares />}
    </div>
  );
}

export default Home;
