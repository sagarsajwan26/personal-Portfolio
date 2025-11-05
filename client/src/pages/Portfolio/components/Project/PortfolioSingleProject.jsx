import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import projectsList from '../../../../utils/project.json'
import Button from '../../../../Components/input/Button'
import SingleProjectDescription from './SingleProjectsComp/SingleProjectDescription'
import SingleProjectOverview from './SingleProjectsComp/SingleProjectOverview'
import SingleProjectGallery from './SingleProjectsComp/SingleProjectGallery'
import gsap from 'gsap'
import InterestedInWorkingTogether from './SingleProjectsComp/InterestedInWorkingTogether'
const PortfolioSingleProject = () => { 
  const navigate = useNavigate()
  const project = projectsList[0]
  const movingBall= useRef()

  const handleMouseMove= (e)=>{
    const x= e.clientX 
    const y= e.clientY 

    gsap.to(movingBall.current,{
      x: x-90,
      y: y-90,
      delay:0.2,
      duration: 0.5,
      ease: 'power2.out'
    }) 
    
    
  }


  useEffect(()=>{
let scrollTimeout ; 

    const handleScroll= ()=>{
      gsap.to(movingBall.current,{
        scale:1.7,
        duration:0.5,
        ease:'power2.out'
      })
    }

    clearTimeout(scrollTimeout)

    scrollTimeout= setTimeout(()=>{
      gsap.to(movingBall.current,{
        scale:1,
        duration:0.5,
        ease:'power2.out'
      })
    },100)

    window.addEventListener('scroll',handleScroll)
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }

  },[])

  return (
    <div  
    
    onMouseMove={(e)=>handleMouseMove(e)}
    
    className='min-h-screen w-full   pt-[12vh] font-[Urbanist] px-[6vw] relative'  >
      
      <div 
      ref={movingBall}
      className='fixed h-3 w-3 bg-black rounded-full z-[9999] pointer-events-none' ></div>
       <button  

         onClick={()=> navigate('/')}
  className="absolute bg-white text-black px-[1.5vw] py-[1vh] flex items-center justify-center rounded-full text-xl font-semibold border-black hover:bg-black hover:text-white border-2  transition-all duration-300 ease-in-out cursor-pointer gap-2 left-[6%] top-10"
>

  <svg
 className="fill-current transition-colors duration-300 ease-in-out"
  width="25px"
  height="25px"
  viewBox="0 0 92 92"
    
>
  <path
    id="XMLID_546_"
    d="M84,46c0,2.2-1.8,4-4,4H21.6l18.1,18.2c1.6,1.6,1.6,4.1,0,5.7C39,74.6,38,75,36.9,75c-1,0-2.1-0.4-2.8-1.2
	l-24.9-25c-1.6-1.6-1.6-4.1,0-5.6l24.9-25c1.6-1.6,4.1-1.6,5.7,0c1.6,1.6,1.6,4.1,0,5.7L21.6,42H80C82.2,42,84,43.8,84,46z"
  ></path>
</svg>
</button>

        <Button label={project.role} className='text-black bg-white rounded-full hover:text-white hover:bg-black mb-10' />
   
   <SingleProjectDescription project={project} />

   <SingleProjectOverview project={project} />

        <SingleProjectGallery gallery={project.screenshots} />
        <InterestedInWorkingTogether />
   
    </div>
  )
}

export default PortfolioSingleProject