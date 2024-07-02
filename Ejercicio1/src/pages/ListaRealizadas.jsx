import React from 'react';
import supabase from "../supabase/config";
import { useState } from 'react';

function TareasRealizadas({ tasks, deleteTask, getTask, setTasks, handleButtonClick }) {
    //Aqui empleamos la misma logica de la lista Pendiente
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTask, setEditTask] = useState({ tarea: '', descripción: '' });

    const enviarATareasEnCurso = async (taskId) => {
        const { data, error } = await supabase
            .from("ejercicio1")
            .update({ estado: 'en curso' })
            .eq('id', taskId);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            console.log("Task updated successfully");
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, estado: 'en curso' };
                }
                return task;
            });
            setTasks(updatedTasks);
            getTask();
        }
    };
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
            console.log("Task updated successfully");
            setTasks(prevTasks => prevTasks.map(task => task.id === editTaskId ? { ...task, ...editTask } : task));
            setEditTaskId(null);
            getTask();
        }
    };

    const tareasRealizadas = tasks.filter(task => task.estado === 'realizada');

    return (
        <div className="contenido">
            {
                tareasRealizadas.map((task) => (
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
                                    <button onClick={handleButtonClick} className='boton-de-crear' type="submit">Guardar</button>
                                    <button type="button" onClick={() => {
                                        handleButtonClick()
                                        setEditTaskId(null)
                                    }
                                    }>Cancelar</button>
                                </form>
                            ) : (
                                <>
                                    <h1 className="nombre-de-la-tarea">{task.tarea}</h1>
                                    <p>{task.descripción}</p>
                                    <div className='botones2'>
                                        <button className='boton-de-trasladar' onClick={() => {
                                            handleButtonClick()
                                            enviarATareasEnCurso(task.id)
                                        }
                                        }>👈</button>
                                        <div className='editar-borrar'>
                                            <button className='boton-de-crear' onClick={() => {
                                                handleButtonClick()
                                                handleEdit(task)
                                            }
                                            }>Editar</button>
                                            <button className='boton-de-borrar' onClick={() => {
                                                handleButtonClick()
                                                deleteTask(task.id)
                                            }
                                            }>Borrar</button>
                                        </div>

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

export default TareasRealizadas;
