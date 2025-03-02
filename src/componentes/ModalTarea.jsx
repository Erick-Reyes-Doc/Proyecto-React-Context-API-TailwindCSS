import React, { useState, useEffect } from "react";
import { useTarea } from "../context/ContextoTareas.jsx";
import { createPortal } from "react-dom";

const ModalTarea = ({ cerrarModal, tareaEditar }) => {
    const { agregarTarea, actualizarTarea } = useTarea();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (tareaEditar) {
            setNombre(tareaEditar.nombre);
            setDescripcion(tareaEditar.descripcion);
        }
    }, [tareaEditar]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;

        if (tareaEditar) {
            actualizarTarea({ ...tareaEditar, nombre, descripcion });
        } else {
            agregarTarea({ id: Date.now(), nombre, descripcion, completada: false });
        }
        cerrarModal();
    };

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{tareaEditar ? "Editar Tarea" : "Nueva Tarea"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="border p-2 w-full mb-2 bg-gray-800 text-white rounded"
                    />
                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="border p-2 w-full mb-2 bg-gray-800 text-white rounded"
                    ></textarea>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        {tareaEditar ? "Actualizar" : "Guardar"}
                    </button>
                    <button onClick={cerrarModal} className="mt-2 text-red-400 w-full">Cancelar</button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default ModalTarea;
