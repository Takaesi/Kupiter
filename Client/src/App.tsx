import './App.css'
import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default App
