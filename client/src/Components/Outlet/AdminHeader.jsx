import React from 'react'
import logo from '../../assets/logo.png'
import { TbLogout2 } from "react-icons/tb";
import {HEADER_LIST} from '../../utils/data'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import {useDispatch} from 'react-redux'
import { logoutAdmin } from '../../store/auth/authThunk';
const AdminHeader = () => {
  const navigate= useNavigate()
const dispatch = useDispatch()
  const handleLogout= async()=>{
    try {
    dispatch(logoutAdmin()).then(res=>{
      console.log(res);
      
    })
        
    } catch (error) {
     toast.error(error?.data?.error || "Logout failed.")

    }
  }
  
  return (
    <div className='fixed top-2 md:top-4 left-0 h-[8vh] w-full font-[Urbanist] z-50 px-2 md:px-0'>
      <header className='w-full md:w-[90%] lg:w-[80%] bg-[#1b1919e2] h-full mx-auto rounded-full flex items-center justify-between px-3 md:pl-2 md:pr-9'>
        <span className='w-8 h-8 md:w-[50px] md:h-[50px] rounded-full overflow-hidden flex-shrink-0'>
          <img className='w-full h-full object-cover' src={logo} alt="" />
        </span>

        <nav className='flex items-center gap-2 md:gap-6 text-white capitalize'>
          {HEADER_LIST.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.to}
              className='hover:text-red-300 transition-colors duration-200 p-1 md:p-0'
            >
              <span className='hidden md:inline'>{item.label}</span>
              <item.icon className='text-lg md:hidden' />
            </Link>
          ))}
          
          <button
          onClick={()=>handleLogout() }
          className='flex items-center gap-1 md:gap-3 rounded-full px-2 md:px-3 py-1 text-white border-2 capitalize text-sm md:text-xl hover:text-black hover:bg-white transition-all ease-in-out duration-300'>
            <span className='hidden md:inline'>Logout</span>
            <TbLogout2 className='md:hidden text-lg' />
          </button>
        </nav>
      </header>
    </div>
  )
}

export default AdminHeader