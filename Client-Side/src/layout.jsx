import {Outlet} from 'react-router-dom'
import Navbar from './Components/Navbar'

function Layout() {
  return (
    <>
      <Navbar/>
      Welcome to Tarang.
      <Outlet/>
    </>
  )
}

export default Layout