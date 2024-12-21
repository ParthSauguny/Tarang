import React from 'react'
import {Link} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'

function Homepage() {
  return (
    <div>
        <h1 className='text-center text-rose-300 text-4xl'>Welcome to the Chatbot</h1>
        <h2 className='text-center text-rose-300 text-2xl'>Please Login or Signup to continue</h2>

        <Link to='/user/signup' element={<Signup/>}>
            <button className='rounded-2xl bg-black text-white p-2 font-semibold font-serif'>
                Signup
            </button>
        </Link>
        <Link to='/user/login' element={<Login/>}>
            <button className='rounded-2xl bg-black text-white p-2 font-semibold font-serif'>
                Login
            </button>
        </Link>
    </div>
  )
}

export default Homepage