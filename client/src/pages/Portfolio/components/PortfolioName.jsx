import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import logo from '../../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../../../Components/loading/Loading';
const PortfolioName = () => {
  const { data } = useSelector(state=> state.portfolio)
 console.log(data);
 
  
  const navigate = useNavigate()
  const [countClick, setCountClick] = useState(0)


  const container = useRef()

const nameRef= useRef()
const portfolioRef = useRef()
const imageRef= useRef()

const handleMouseMove=(e)=>{
 
const x= e.clientX 
const y= e.clientY 

gsap.to(imageRef.current,{
    x: x-550,
    y: y-400,
    duration: 0.5,
    ease: "power2.out"
})
  
}
gsap.registerPlugin(SplitText)
useGSAP(()=>{
  document.fonts.ready.then(() => {
    const text= new SplitText(nameRef.current,{type:'words, chars'})
    const portfoiotext= new SplitText(portfolioRef.current, {type:'words, chars'})

  gsap.from(text.chars,{
     duration:1,
    x:500,
    autoAlpha:0,
    stagger:0.2,
    delay:0.04
  })

    gsap.from(portfoiotext.chars,{
      duration:1,
      x:-500,
      autoAlpha:0,
      stagger:0.2,
      delay:0.04
    })
  })
})


if(!data) return <Loading />

  return (
    <div 
       onMouseMove={handleMouseMove} className='min-h-screen w-full flex items-center justify-center relative mb-10 md:mb-[10vw] px-4 md:px-0'>
        <span
        onClick={()=>  {
          setCountClick(countClick+1)
          if(countClick===2){
            navigate('/admin/auth')
          }
             setTimeout(()=>{
              setCountClick(0)
          },3000)
        }
       
        }
        className='w-12 h-12 md:w-20 md:h-20 absolute top-4 left-4 md:top-10 md:left-5' >
          <img 
          
          className='h-full w-full rounded-full object-cover opacity-70 ' src={logo} alt="" />
        </span>
        <div className='h-auto md:h-[60vh] w-full md:w-[50vw] flex flex-col justify-center items-center relative py-8 md:py-0'>
          <span className='w-32 md:w-[20vw] absolute -z-5 hidden md:block' >
            <img 
             ref={imageRef}
       
            className='h-full w-full rounded-2xl object-cover opacity-70 rotate-12' src={data?.portfolio?.owner?.profileImage || "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"} alt="" />
          </span>
<div className='h-full w-full flex items-center justify-between flex-col gap-8 md:gap-0'>
  
          <h1  
          ref={nameRef}
          className='text-4xl md:text-6xl lg:text-7xl font-semibold font-[Besley] text-[#424040] text-center uppercase' >{data?.portfolio?.owner?.firstName}  {data?.owner?.lastName} </h1>

        <div className='w-full flex flex-col items-center justify-center text-center'>
          
          <h2 
          ref={portfolioRef}
          className='text-[15vw] md:text-[9vw] font-bold font-[Urbanist]' >PORTFOLIO</h2>
          <p className='text-sm md:text-base'>Illustrator and Designer </p>
        </div>
</div>
        </div>
        <span 
        className='absolute bottom-4 md:top-[90%] opacity-[30%]'
        >
          <svg
  fill="#000000"
  width="20px"
  height="20px"
  className='md:w-[25px] md:h-[25px]'
  viewBox="0 0 35 35"
  data-name="Layer 2"
  id="a79254cb-3f14-4275-904f-2c1744762c58"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17.5,34.75A12.9,12.9,0,0,1,4.61,21.86V13.14a12.89,12.89,0,0,1,25.78,0v8.72A12.9,12.9,0,0,1,17.5,34.75Zm0-32A10.4,10.4,0,0,0,7.11,13.14v8.72a10.39,10.39,0,0,0,20.78,0V13.14A10.4,10.4,0,0,0,17.5,2.75Z"
  ></path>
  <path
    d="M17.5,15.844a1.25,1.25,0,0,1-1.25-1.25V8.376a1.25,1.25,0,0,1,2.5,0v6.218A1.25,1.25,0,0,1,17.5,15.844Z"
  ></path>
</svg>

        </span>

    </div>
  )
}

export default PortfolioName