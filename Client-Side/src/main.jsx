import { createRoot } from 'react-dom/client'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Layout from './layout.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/user/signup' element={<Signup/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route/>
      </Route>
    </Routes>
  </BrowserRouter>
)
