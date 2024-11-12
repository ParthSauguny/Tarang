import React from 'react'

function Sidebar() {
  return (
    <div className='bg-violet-950 flex flex-col h-screen w-1/6'>
        <button className='mx-auto mt-4 border-4 border-slate-400 bg-black text-white rounded-2xl p-2 font-semibold font-serif'>+ New Chat</button>
        <div className='border-2 border-gray-300 text-center text-yellow-200 text-2xl mx-auto px-14 py-2 mt-4 h-screen overflow-y-scroll'>
          <ul>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            <li>jksjks</li>
            
          </ul>
        </div>
        <div className='text-center text-yellow-200 text-2xl'>
          -----------------
        </div>
        <h1 className='text-center text-rose-300'> Made by Parth Sauguny </h1>
    </div>
  )
}

export default Sidebar