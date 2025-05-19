import React from 'react'

const Card = () => {
  return (
    <div className='flex flex-col bg-orange-500 rounded-xl p-4 w-60 h-64 justify-between'>
      <div className='w-10 h-10 bg-orange-300 rounded-lg flex items-center justify-center mb-8'>
        <span className='text-white text-2xl font-bold'>+</span>
      </div>
      <div className='flex flex-col mt-auto'>
        <h1 className='text-white text-lg font-semibold mb-1'>New Meeting</h1>
        <p className='text-orange-100 text-base'>Setup a new recording</p>
      </div>
    </div>
  )
}

export default Card