import { Dialog } from "@headlessui/react";

function ModalEditar({ isOpen, onClose, form, setForm, onUpdate }) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">Editar Dios</Dialog.Title>
          <div className="space-y-2">
            {Object.keys(form).map((key) => (
              <input
                key={key}
                className="w-full border rounded p-2"
                placeholder={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">Cancelar</button>
              <button onClick={onUpdate} className="px-4 py-2 rounded bg-blue-500 text-white">Actualizar</button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ModalEditar;
