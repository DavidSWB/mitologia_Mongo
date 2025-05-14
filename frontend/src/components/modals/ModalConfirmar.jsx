import { Dialog } from "@headlessui/react";

function ModalConfirmar({ isOpen, onClose, onConfirm, nombre }) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded p-6 w-full max-w-sm text-center">
          <Dialog.Title className="text-lg font-bold mb-4">¿Eliminar a {nombre}?</Dialog.Title>
          <p className="mb-4">Esta acción no se puede deshacer.</p>
          <div className="flex justify-center space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Eliminar</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ModalConfirmar;
