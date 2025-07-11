import React from 'react'

const Loader: React.FC = () => (
  <div className='flex items-center justify-center h-40'>
    <span className='relative flex h-16 w-16'>
      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 opacity-75'></span>
      <span className='relative inline-flex rounded-full h-16 w-16 bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500'></span>
    </span>
  </div>
)

export default Loader
