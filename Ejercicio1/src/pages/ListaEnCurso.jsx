import React from 'react';
import supabase from "../supabase/config";
import { useState } from 'react';

function TareasEnCurso({ tasks, deleteTask, getTask, setTasks }) {

    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({ tarea: '', descripción: '' });

    const handleEdit = (task) => {
        setEditTaskId(task.id);
        setEditTask({ tarea: task.tarea, descripción: task.descripción });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("ejercicio1")
            .update({ tarea: editTask.tarea, descripción: editTask.descripción })
            .eq('id', editTaskId);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            console.log("Task updated successfully:", data);
            setTasks(prevTasks => prevTasks.map(task => task.id === editTaskId ? { ...task, ...editTask } : task));
            setEditTaskId(null);
            getTask();
        }
    };

    const enviarATareasPendientes = async (taskId) => {
        const { data, error } = await supabase
            .from("ejercicio1")
            .update({ estado: 'pendiente' })
            .eq('id', taskId);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            console.log("Task updated successfully:", data);
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, estado: 'pendiente' };
                }
                return task;
            });
            setTasks(updatedTasks);
            getTask();
        }
    };

    const enviarATareasRealizadas = async (taskId) => {
        const { data, error } = await supabase
            .from("ejercicio1")
            .update({ estado: 'realizada' })
            .eq('id', taskId);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            console.log("Task updated successfully:", data);
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, estado: 'realizada' };
                }
                return task;
            });
            setTasks(updatedTasks);
            getTask();
        }
    };

    const tareasEnCurso = tasks.filter(task => task.estado === 'en curso');

    return (
        <div className="contenido">
            {
                tareasEnCurso.map((task) => (
                    <div key={task.id} className="una-tarea">
                        {
                            editTaskId === task.id ? (
                                <form onSubmit={handleEditSubmit}>
                                    <input
                                        type="text"
                                        name="tarea"
                                        value={editTask.tarea}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <textarea
                                        name="descripción"
                                        value={editTask.descripción}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <button type="submit">Guardar</button>
                                    <button type="button" onClick={() => setEditTaskId(null)}>Cancelar</button>
                                </form>
                            ) : (
                                <>
                                    <h1 className="nombre-de-la-tarea">{task.tarea}</h1>
                                    <p>{task.descripción}</p>
                                    <div className='botones2'>
                                        <button className='boton-de-trasladar' onClick={() => enviarATareasPendientes(task.id)}>👈</button>
                                        <div className='editar-borrar'>
                                            <button className='boton-de-crear' onClick={() => handleEdit(task)}>Editar</button>
                                            <button className='boton-de-borrar' onClick={() => deleteTask(task.id)}>Borrar</button>
                                        </div>
                                        <button className='boton-de-trasladar' onClick={() => enviarATareasRealizadas(task.id)}>👉</button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default TareasEnCurso;

