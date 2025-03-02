import { createContext, useContext, useEffect, useState } from "react";

const ContextoTareas = createContext();

export const ProveedorTareas = ({ children }) => {
    const [tareas, setTareas] = useState(() => {
        const tareasGuardadas = localStorage.getItem("tareas");
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    });

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }, [tareas]);

    const agregarTarea = (tarea) => {
        setTareas([...tareas, tarea]);
    };

    const actualizarTarea = (tareaActualizada) => {
        setTareas(tareas.map((tarea) => (tarea.id === tareaActualizada.id ? tareaActualizada : tarea)));
    };

    const alternarCompletar = (id) => {
        setTareas(tareas.map((tarea) => (tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea)));
    };

    const eliminarTarea = (id) => {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
    };

    return (
        <ContextoTareas.Provider value={{ tareas, agregarTarea, actualizarTarea, alternarCompletar, eliminarTarea }}>
            {children}
        </ContextoTareas.Provider>
    );
};

export const useTarea = () => useContext(ContextoTareas);
