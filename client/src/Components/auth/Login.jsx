import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import Input from '../input/Input'
import Button from '../input/Button'
import {toast} from 'react-toastify'
import { Link, useNavigate  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAdmin } from '../../store/auth/authThunk'

const Login = () => {
  const dispatch = useDispatch()
   const [username,setUsername] = useState('')
   const [isLoading, setisLoading] = useState(false)
   const [password,setPassword] = useState('')
  const navigate= useNavigate()
   const handleLogin= async (e)=>{
    e.preventDefault()
    try {
        dispatch(loginAdmin({username,password})).then(res=>{
         if(res.meta.rejectedWithValue){
          toast.error(res.payload.error)
         }
         else if(res.meta.requestStatus==='fulfilled') {
            toast.success('login successful')
            navigate('/admin/homepage')
            
         }
         
          
        })
      
    } catch (err) {
      console.error('Login failed:', err)
     toast.error(err.message || "login failed")
    }
   }

   
  return (
    <div className='h-screen w-full flex items-center justify-center bg-white relative'>
      {/* Background decoration */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-20 left-20 w-32 h-32 rounded-full bg-[#424040] flex items-center justify-center'> 
    

        </div>
        <div className='absolute bottom-20 right-20 w-24 h-24 rounded-2xl bg-[#424040] rotate-12'></div>
      </div>
      
      <div className='w-[500px] flex flex-col items-center justify-center gap-8 font-[Urbanist] relative z-10'>
        {/* Logo and Title */}
        <div className='flex items-center gap-4 flex-col'>
          <img 
            className='h-20 w-20 rounded-full object-cover opacity-70 shadow-lg'
            src={logo} alt="Admin Logo" 
          />
          <p className='text-2xl font-semibold text-[#424040] font-[Besley]'>Admin Portal</p>
        </div> 

        {/* Login Form */}
        <form onSubmit={handleLogin} className='w-full max-w-md flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
          <div className='text-center mb-4'>
            <h1 className='text-3xl font-bold text-[#424040] font-[Besley] mb-2'>Welcome Back</h1>
            <p className='text-gray-600 font-[Urbanist]'>Sign in to manage your portfolio</p>
          </div>

          <div className='flex flex-col gap-4'>
            <Input 
              label='Username' 
              type='text'  
              value={username} 
              onChange={(e)=>setUsername(e.target.value)} 
              className='w-full border border-gray-300 rounded-xl focus:border-[#424040] focus:outline-none text-[#424040] bg-gray-50' 
              placeholder='Enter your username'
            />
            <Input 
              label='Password' 
              type='password'  
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}  
              className='w-full border border-gray-300 rounded-xl focus:border-[#424040] focus:outline-none text-[#424040] bg-gray-50' 
              placeholder='Enter your password'
            />
          </div>
      
          <Button 
            disabled={isLoading} 
            label={isLoading ? 'Logging in...' : 'Login'} 
            className='w-full bg-[#424040] text-white hover:bg-[#2a2828] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold py-3 border-none transition-all duration-300' 
            type='submit' 
          />
          
         
        </form>

        <Link className='flex items-center justify-center gap-5 border-2 border-black px-5 py-2 rounded-full hover:bg-black hover:text-white transition-all ease-in-out duration-300' to='/' >
        <svg
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
 xmlnsXlink="http://www.w3.org/1999/xlink"
  width="20px"
  height="20px"
  viewBox="0 0 92 92"
  fill="currentColor"
>
  <path
    id="XMLID_546_"
    d="M84,46c0,2.2-1.8,4-4,4H21.6l18.1,18.2c1.6,1.6,1.6,4.1,0,5.7C39,74.6,38,75,36.9,75c-1,0-2.1-0.4-2.8-1.2
	l-24.9-25c-1.6-1.6-1.6-4.1,0-5.6l24.9-25c1.6-1.6,4.1-1.6,5.7,0c1.6,1.6,1.6,4.1,0,5.7L21.6,42H80C82.2,42,84,43.8,84,46z"
  ></path>
</svg>
 back to Portfolio </Link>
      </div>
    </div>
  )
}

export default Login