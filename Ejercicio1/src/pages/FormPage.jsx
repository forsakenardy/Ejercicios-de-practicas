import { useState } from "react";
import supabase from "../supabase/config";
import { Link } from "react-router-dom";

function FormPage({ getTask, handleButtonClick }) {
    const [task, setTask] = useState(''); //valor por default vacio
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevenimos el comportamiento natural del boton de actualizar la pagina

        const { data, error } = await supabase
            .from("ejercicio1")
            .insert([  //empleamos este metodo para crear una nueva tarea con las propiedades marcadas abajo
                { tarea: task, descripción: description }
            ]);

        if (error) {
            console.error("Error creating task:", error);
        } else {
            console.log("Task created successfully:");
            setTask('');
            setDescription('');
            getTask(); //actualizamos las tareas
        }
    }; // esta funcion nos permite manejar el submit del formulario, creando a nueva tarea y regresando los valores a ''

    return (
        <div className="form-container">
            <h2>Crear una nueva tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="task">Tarea</label>
                    <input
                        type="text"
                        id="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)} //creamos un nombre para la nueva tarea 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="botones">
                    <button onClick={handleButtonClick} className="boton-de-crear" type="submit">Crear tarea</button>
                    <Link to='/'><button onClick={handleButtonClick} className="boton-de-borrar">Volver a atras</button></Link>
                </div>
            </form>
        </div>
    );
}

export default FormPage;
