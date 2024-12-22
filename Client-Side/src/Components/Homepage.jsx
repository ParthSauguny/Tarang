import React from 'react'
import {Link} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'

function Homepage() {
  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-center text-red-500 text-6xl font-black font-serif'>Welcome to the Chatbot</h1>
        <h2 className='text-center text-red-500 text-4xl font-black font-serif'>Please Login or Signup to continue</h2>

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