import supabase from "../supabase/config";
import TareasPendientes from "./ListaPendientes";
import TareasEnCurso from "./ListaEnCurso";
import TareasRealizadas from "./ListaRealizadas";
import { Link } from 'react-router-dom';

function HomePage({ tasks, getTask, setTasks , handleButtonClick}) {

  const deleteTask = async (taskId) => {
    const { data, error } = await supabase
      .from("ejercicio1")
      .delete()
      .eq('id', taskId);
    // para borrar una tarea especifica de la base de datos usando el metodo delete
    // y coincidiendo el id de esta tarea con la que se quiere borrar
    if (error) {
      console.error("Error deleting task:", error);
    } else {
      console.log("Task deleted successfully:", data);
      getTask();
      // llamando la funcion
    }
  };

  const deleteAllTasks = async () => {
    const { data, error } = await supabase
      .from("ejercicio1")
      .delete()
      .gte('id', 0);
    // para borrar todas las tareas de la base de datos seleccionando a todos sus componentes
    if (error) {
      console.error("Error deleting all tasks:", error);
    } else {
      console.log("All tasks deleted successfully");
      getTask();
    }
  };

  return (
    // Aqui llamamos a la funcion deleteAllTasks al hacer click en el boton y enviamos deleteTask como prop a las demas paginas
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
        <Link to='/formulario'><button onClick={handleButtonClick} className="boton-de-crear">Crear una tarea</button></Link>
        <button className="boton-de-borrar" onClick={() => {
          deleteAllTasks()
          handleButtonClick()
        }
        }
          >Borrar todas las tareas</button>
      </div>
    </div>
  );
}

export default HomePage;
