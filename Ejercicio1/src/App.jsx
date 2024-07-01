import supabase from './supabase/config'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/formulario' element={<FormPage />} />
      </Routes>
    </>

  )
}

export default App
