import React from "react";
import { useTarea } from "../context/ContextoTareas.jsx";

const ItemTarea = ({ tarea, abrirModal }) => {
    const { alternarCompletar, eliminarTarea } = useTarea();

    return (
        <div className={`p-4 rounded-lg shadow-md transition transform hover:scale-105 ${tarea.completada ? "bg-green-600" : "bg-gray-800"
            }`}>
            <h2 className="text-lg font-semibold">{tarea.nombre}</h2>
            <p className="text-sm opacity-80">{tarea.descripcion}</p>
            <div className="flex justify-between items-center mt-3">
                <span className={tarea.completada ? "text-green-300" : "text-yellow-300"}>
                    {tarea.completada ? "Completada" : "Pendiente"}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => abrirModal(tarea)}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => eliminarTarea(tarea.id)}
                        className="text-red-400 hover:text-red-600"
                    >
                        🗑️
                    </button>
                    <input
                        type="checkbox"
                        checked={tarea.completada}
                        onChange={() => alternarCompletar(tarea.id)}
                        className="w-5 h-5 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ItemTarea;
