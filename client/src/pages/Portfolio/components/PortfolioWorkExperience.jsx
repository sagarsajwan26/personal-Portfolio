import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

const PortfolioWorkExperience = () => {
  const headingRef= useRef()
  const jobTypeRef= useRef()
  const imageRef= useRef()
  const containerRef= useRef()
  gsap.registerPlugin(ScrollTrigger)
  
  useGSAP(()=>{
    // Animate heading
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        scrub:true
      }
    })
    
    // Animate bounce elements
    gsap.from('.bounce', {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.bounce',
        start: "top 85%",
        scrub:true
      }
    })
    
    // Animate image
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 85%",
        scrub:true
      }
    })
  }, [])
  return (
    <div ref={containerRef} className='min-h-screen px-4 md:px-[10vw] my-10 md:my-[10vh] flex flex-col items-center md:items-start justify-center gap-8 md:gap-[8vw] relative'>
      <span className='absolute left-[50%] bottom-4 md:top-[90%] opacity-[40%] ' >
        <svg
  fill="#000000"
  width="20px"
  height="20px"
  className='md:w-[25px] md:h-[25px]'
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M18.364 8.95l-5.657-5.657a1 1 0 0 0-1.414 0L5.636 8.95a1 1 0 0 0 1.414 1.414L11 6.414V20a1 1 0 0 0 2 0V6.414l3.95 3.95a1 1 0 0 0 1.414-1.414z"
  ></path>
</svg>

      </span>
     <h1  
     ref={headingRef}
     className='text-4xl md:text-6xl lg:text-8xl font-md leading-tight font-[Urbanist] text-center md:text-left overflow-hidden' >Work 
      <br />
      Experience</h1>

     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 w-full'>
      <div className='text-center md:text-left'>
        <h3 ref={jobTypeRef} className='text-xl md:text-2xl font-[Arsenica] mb-2'>Agency Work</h3> 
        <p className='bounce text-sm md:text-md font-[Urbanist] font-bold text-[#565656] mb-1'>Company Name</p>
        <p className='bounce text-sm md:text-md font-[Urbanist] font-bold text-[#565656] mb-1'>Second Company Name</p>
        <p className='bounce text-sm md:text-md font-[Urbanist] font-bold text-[#565656] mb-1'>JKIL Design Studio</p>
        <p className='bounce text-sm md:text-md font-[Urbanist] font-bold text-[#565656]'>Senior Developer</p>

      </div>
        <div className='text-center md:text-left'>
            <h3 className='text-xl md:text-2xl font-[Arsenica] mb-2'>Freelance Work</h3>
            <p className='text-sm md:text-md font-[Urbanist] font-bold text-[#565656] mb-1'>Company Name</p>
            <p className='text-sm md:text-md font-[Urbanist] font-bold text-[#565656]'>Second Company Name</p>
        </div>

        <div className='hidden lg:block'>

        </div>
        <div className='flex justify-center md:justify-end'>
          <img 
          ref={imageRef}
          className='w-48 md:w-full h-48 md:h-auto opacity-70 grayscale-50 rounded-md object-cover' src="https://images.unsplash.com/photo-1503467913725-8484b65b0715?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
     </div>
    
    </div>
  )
}

export default PortfolioWorkExperience