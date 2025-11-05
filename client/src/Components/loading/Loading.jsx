import React from 'react'
import logo from '../../assets/logo.png'
const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center '>
    <img className='h-40 w-40 rounded-full opacity '  src={logo} alt="" />
    </div>
  )
}

export default Loading