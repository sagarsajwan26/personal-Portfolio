import React, { useEffect, useState } from 'react'
import Button from '../../../Components/input/Button'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosCamera } from "react-icons/io";
import {useDispatch, useSelector} from 'react-redux'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import { getuserDetails } from '../../../store/user/userThunk';
import {PROFESSIONAL_TYPES} from '../../../utils/data'
import Loading from '../../../Components/loading/Loading';
const AdminProfile = () => {
 
  const {user} = useSelector(state=> state.user)
  const dispatch= useDispatch()
  const navigate= useNavigate()
  console.log(user);
  const location= useLocation()


useEffect(()=>{
  dispatch(getuserDetails())
},[])

if(!user) return < Loading /> 
  return (
    <div className='mt-[12vh] px-[10vw]' >
        <div className='flex items-center justify-between' >
          <div className='flex items-center justify-center gap-5' >
            <Button icon={<IoIosArrowRoundBack />}   className='flex items-center justify-center gap-5 rounded-full hover:bg-black hover:text-white text-3xl  '  /> 
            <h2 className='text-2xl font-semibold text-[#000000a8]' >Profile Settings</h2>
          </div>
           <div className='flex  items-center justify-center gap-5' >
          <Button label='Cancel' className='rounded-full hover:bg-black hover:text-white' />
          <Button label='Save Changes' className='rounded-full hover:bg-black hover:text-white' />
        </div>
        </div>
        <div className='grid grid-cols-5 mt-[5vh] ' >
            <div className='col-span-1' >
             <div  className= ' h-24 w-24 relative ' >
              <img className='h-24 w-24 object-cover  rounded-full  ' src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D" alt="" />
             
                  <label className='h-10 w-10  z-99 absolute -right-3  flex items-center justify-center rounded-full top-14 text-2xl'><IoIosCamera /> 
                    <input hidden type="file" name="" id="" />
                   </label>
                
             </div>
            </div>
            <div className='col-span-4  ' >
               <div className='flex items-center justify-start gap-7' >
                   {
                    PROFESSIONAL_TYPES.map((item,idx)=>(
                      <Link  to={item.to} key={idx} className={`border-2 px-6 py-3  flex items-center justify-center gap-5  rounded-full ${location.pathname === item.to ? "bg-[#000000d4] text-white" :"bg-white text-black"} transition-all ease-in-out duration-300`} > <item.icon /> {item.label} </Link>
                    ))
                  }
               </div>
                  <div>

                    <Outlet  />
                  </div>


                  
            </div>
        </div>

    </div>
  )
}

export default AdminProfile