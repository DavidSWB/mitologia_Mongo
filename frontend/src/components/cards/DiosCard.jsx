function DiosCard({ dios, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{dios.nombre}</h2>
        <p><strong>Mitología:</strong> {dios.mitologia}</p>
      </div>
      <div className="space-x-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => onEdit(dios)}>
          Editar
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(dios)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default DiosCard;
