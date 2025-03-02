import React, { useState } from "react";
import { ProveedorTareas } from "./context/ContextoTareas.jsx";
import ListaTareas from "./componentes/ListaTareas.jsx";
import ModalTarea from "./componentes/ModalTarea.jsx";

const App = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <ProveedorTareas>
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-6">Administrador de Tareas</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4 transition"
        >
          + Nueva Tarea
        </button>
        <ListaTareas />
        {modalAbierto && <ModalTarea cerrarModal={() => setModalAbierto(false)} />}
      </div>
    </ProveedorTareas>
  );
};

export default App;
