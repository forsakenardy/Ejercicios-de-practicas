import { useState } from "react";
import supabase from "../supabase/config";
import { Link } from "react-router-dom";

function FormPage({ getTask }) {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("ejercicio1")
            .insert([
                { tarea: task, descripción: description }
            ]);

        if (error) {
            console.error("Error creating task:", error);
        } else {
            console.log("Task created successfully:", data);
            // Reset the form
            setTask('');
            setDescription('');
            getTask();
        }
    };

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
                        onChange={(e) => setTask(e.target.value)}
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
                    <button className="boton-de-crear" type="submit">Crear tarea</button>
                    <Link to='/'><button className="boton-de-borrar">Volver a atras</button></Link>
                </div>
            </form>
        </div>
    );
}

export default FormPage;
