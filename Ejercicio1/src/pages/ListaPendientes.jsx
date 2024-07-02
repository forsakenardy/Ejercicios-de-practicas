import { useState } from 'react';
import supabase from "../supabase/config";

function TareasPendientes({ tasks, deleteTask, getTask, setTasks }) {
    const [editTaskId, setEditTaskId] = useState(null); // Estado para manejar el modo de edición
    const [editTask, setEditTask] = useState({ tarea: '', descripción: '' }); // Estado para la tarea que se está editando

    const enviarATareasEnCurso = async (taskId) => {
        const { data, error } = await supabase
            .from("ejercicio1")
            .update({ estado: 'en curso' })
            .eq('id', taskId);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            console.log("Task updated successfully")
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, estado: 'en curso' }; // comparamos el id de la base de datos con el id de nuestra tarea actual y devolvemos el estado cambiado
                }
                return task;
            });
            setTasks(updatedTasks); //actualizar el valor de la tarea
            getTask();
        }
        //esta funcion me permite cambiar el valor del estado (propiedad existente en la base de datos con valor pendiente por default)
    };

    const handleEdit = (task) => {
        setEditTaskId(task.id);
        setEditTask({ tarea: task.tarea, descripción: task.descripción });
    };
    //aqui cambiamos al estado de edicion

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prevState => ({ ...prevState, [name]: value }));
    };


    const handleEditSubmit = async (e) => {
        e.preventDefault(); //prevenimos el comportamiento natural del boton de actualizar la pagina
        const { data, error } = await supabase
            .from("ejercicio1")
            .update({ tarea: editTask.tarea, descripción: editTask.descripción }) //cambiamos al nuevo valor de la tarea
            .eq('id', editTaskId); //especificamente la tarea seleccionada

        if (error) {
            console.error("Error updating task:", error);
        } else {
            console.log("Task updated successfully:", data);
            setTasks(prevTasks => prevTasks.map(task => task.id === editTaskId ? { ...task, ...editTask } : task));// aactualizamos el valor de la tarea con el valor de la edicion
            setEditTaskId(null); // cerramos el modo edicion
            getTask(); // actualizamos las tareas
        }
    };

    const tareasPendientes = tasks.filter(task => task.estado === 'pendiente'); //filtramos para que solo se muestren las tareas con estado pendiente

    return (
        <div className="contenido">
            {
                tareasPendientes.map((task) => (
                    <div key={task.id} className="una-tarea">
                        {
                            editTaskId === task.id ? (
                                <form className='edit-form' onSubmit={handleEditSubmit}>
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
                                    <div className='botones2'>
                                        <button className='boton-de-crear' type="submit">Guardar</button>
                                        <button className='boton-de-borrar' type="button" onClick={() => setEditTaskId(null)}>Cancelar</button>
                                    </div>
                                </form>
                            ) : (    //cambio de modo edicion a modo normal
                                <>
                                    <h1 className="nombre-de-la-tarea">{task.tarea}</h1>
                                    <p>{task.descripción}</p>
                                    <div className='botones2'>
                                        <div className='editar-borrar'>
                                            <button className='boton-de-crear' onClick={() => handleEdit(task)}>Editar</button>
                                            <button className='boton-de-borrar' onClick={() => deleteTask(task.id)}>Borrar</button>
                                        </div>
                                        <button className='boton-de-trasladar' onClick={() => enviarATareasEnCurso(task.id)}>👉</button>
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
