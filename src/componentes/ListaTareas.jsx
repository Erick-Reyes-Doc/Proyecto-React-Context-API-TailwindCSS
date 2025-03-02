import React, { useState } from "react";
import { useTarea } from "../context/ContextoTareas.jsx";
import ItemTarea from "./ItemTarea.jsx";
import ModalTarea from "./ModalTarea.jsx";

const ListaTareas = () => {
    const { tareas } = useTarea();
    const [filtro, setFiltro] = useState("todas");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

    const tareasFiltradas = tareas.filter((tarea) => {
        if (filtro === "pendientes") return !tarea.completada;
        if (filtro === "finalizadas") return tarea.completada;
        return true;
    });

    const abrirModal = (tarea = null) => {
        setTareaSeleccionada(tarea);
        setModalAbierto(true);
    };

    return (
        <div className="w-full max-w-3xl">
            <div className="flex justify-around mb-4">
                <button onClick={() => setFiltro("todas")} className="bg-gray-700 hover:bg-gray-500 text-white px-3 py-1 rounded">Todas</button>
                <button onClick={() => setFiltro("pendientes")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Pendientes</button>
                <button onClick={() => setFiltro("finalizadas")} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Finalizadas</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tareasFiltradas.map((tarea) => (
                    <ItemTarea key={tarea.id} tarea={tarea} abrirModal={abrirModal} />
                ))}
            </div>

            {modalAbierto && <ModalTarea cerrarModal={() => setModalAbierto(false)} tareaEditar={tareaSeleccionada} />}
        </div>
    );
};

export default ListaTareas;
