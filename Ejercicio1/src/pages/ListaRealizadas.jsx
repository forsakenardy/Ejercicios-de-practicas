import supabase from "../supabase/config";

function TareasRealizadas({ tasks, deleteTask }) {
    
    return (
        <div className="contenido">
        {
            tasks.map((task) => (
                <div key={task.id} className="una-tarea">
                    {
                        <>
                            <h1 className="nombre-de-la-tarea">{task.tarea}</h1>
                            <p>{task.descripción}</p>
                            <div className='botones2'>
                            <button className='boton-de-trasladar' >👈</button>
                                <div className='editar-borrar'>
                                    <button className='boton-de-crear' >Editar</button>
                                    <button className='boton-de-borrar' onClick={() => deleteTask(task.id)}>Borrar</button>
                                </div>

                            </div>
                        </>

                    }
                </div>
            ))
        }
    </div>
    );
}

export default TareasRealizadas;
