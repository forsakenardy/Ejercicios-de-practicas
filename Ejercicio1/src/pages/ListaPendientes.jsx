import React, { useState } from 'react';
import supabase from "../supabase/config";

function TareasPendientes({ tasks, deleteTask, getTask, setTasks }) {
    const [editTaskId, setEditTaskId] = useState(null); // Estado para manejar el modo de edición
    const [editTask, setEditTask] = useState({ tarea: '', descripción: '' }); // Estado para la tarea que se está editando

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

    return (
        <div className="contenido">
            {
                tasks.map((task) => (
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
                                        <div className='editar-borrar'>
                                            <button className='boton-de-crear' onClick={() => handleEdit(task)}>Editar</button>
                                            <button className='boton-de-borrar' onClick={() => deleteTask(task.id)}>Borrar</button>
                                        </div>
                                        <button className='boton-de-trasladar'>👉</button>
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

export default TareasPendientes;
