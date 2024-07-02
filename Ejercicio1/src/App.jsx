import supabase from './supabase/config'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import { useState, useEffect, useRef } from 'react'
import click from './media/click.mp3'
import './App.css'

function App() {

  const audioRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const playSound = () => {
    audioRef.current.play();
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
    playSound();
  };


  const [tasks, setTasks] = useState([])

  const getTask = async () => {
    const { data: tasks, error } = await supabase.from("ejercicio1").select('*');
    if (error) {
      console.log("hay algun arror", error);
      return;
    }
    else {
      setTasks(tasks);
    }
  }
  // Aqui obtengo la lista de tareas de mi base de datos
  useEffect(() => {
    getTask();
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage
          tasks={tasks}
          setTasks={setTasks}
          handleButtonClick={handleButtonClick}
          getTask={getTask} />} />
        <Route path='/formulario' element={<FormPage getTask={getTask} handleButtonClick={handleButtonClick} />} />
      </Routes>
      <audio ref={audioRef} src={click} />
    </>
    //rutas con propiedades enviadas
  )
}

export default App
