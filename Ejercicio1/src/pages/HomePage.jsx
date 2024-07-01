import supabase from "../supabase/config";
import TareasPendientes from "./ListaPendientes";
import TareasEnCurso from "./ListaEnCurso";
import TareasRealizadas from "./ListaRealizadas";
import { Link } from 'react-router-dom';

function HomePage({ tasks, getTask, setTasks }) {

  const deleteTask = async (taskId) => {
    const { data, error } = await supabase
      .from("ejercicio1")
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      console.log("Task deleted successfully:", data);
      getTask();
    }
  };

    return (

            <div className="lista-completa">
              <div className="listas-de-tareas">
                <div className="tareas">
                  <h2>Lista de tareas <br /> pendientes</h2>
                  <TareasPendientes tasks={tasks} getTask={getTask} setTasks={setTasks} deleteTask={deleteTask} />
                </div>
                <div className="tareas">
                  <h2>Lista de tareas <br /> en curso</h2>
                  <TareasEnCurso tasks={tasks} getTask={getTask} setTasks={setTasks} deleteTask={deleteTask} />
                </div>
                <div className="tareas">
                  <h2>Lista de tareas <br /> realizadas</h2>
                  <TareasRealizadas tasks={tasks} getTask={getTask} setTasks={setTasks} deleteTask={deleteTask} />
                </div>
              </div>
              <div className="botones">
                <Link to='/formulario'><button className="boton-de-crear">Crear una tarea</button></Link>
                <button className="boton-de-borrar">Borrar todas las tareas</button>
              </div>
            </div>
          );
}
export default HomePage;
