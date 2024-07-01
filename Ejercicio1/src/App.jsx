import supabase from './supabase/config'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [tasks, setTasks] = useState([])

  const getTask = async () => {
    const { data: tasks, error } = await supabase.from("ejercicio1").select('*');
    if (error) {
      console.log("hay algun arror", error);
      return;
    }
    else {
      console.log("data lista", tasks);
      setTasks(tasks);
    }
  }
  useEffect(() => {
    getTask();
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage tasks={tasks} setTasks={setTasks} getTask={getTask} />} />
        <Route path='/formulario' element={<FormPage  getTask={getTask}/>} />
      </Routes>
    </>

  )
}

export default App
