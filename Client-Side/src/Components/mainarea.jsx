import React from 'react'

function Mainarea() {
  return (
    <div className='bg-slate-500 w-5/6'>
        <h1 className='text-center text-7xl font-semibold font-serif py-4 text-violet-950'> Tarang </h1>
        <div className='h-2/3 border-2 border-black rounded-lg m-4'>
          
        </div>

        <div className='mx-auto flex justify-center align-bottom'>
          <input className='w-1/2 justify-center mx-4 border-2 outline-none border-black rounded-2xl text-xl' type="text" />
          <button className='px-5 py-1 rounded-lg border-x-2 border-y-4 border-violet-800 hover:bg-violet-500'> ➢ </button>
        </div>
    </div>
  )
}

export default Mainarea