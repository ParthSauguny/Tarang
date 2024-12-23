import { createRoot } from 'react-dom/client'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Layout from './layout.jsx'
import './App.css'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Mainarea from './Components/mainarea.jsx'
import Homepage from './Components/Homepage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/dashboard' element={<Mainarea/>}/>
        <Route path='/user/signup' element={<Signup/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route/>
      </Route>
    </Routes>
  <ToastContainer/>
  </BrowserRouter>
)
