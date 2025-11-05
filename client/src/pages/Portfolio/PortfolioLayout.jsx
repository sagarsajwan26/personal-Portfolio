import React, { useEffect, useRef,lazy, Suspense } from 'react'


const PortfolioName = lazy(() => import('./components/PortfolioName'))
const PortfolioAboutMe = lazy(() => import('./components/PortfolioAboutMe'))
const PortfolioWorkExperience = lazy(() => import('./components/PortfolioWorkExperience'))
const PortfolioSkillAndExpertiese = lazy(() => import('./components/PortfolioSkillAndExpertiese'))
const PortfolioProjects = lazy(() => import('./components/Project/PortfolioProjects'))
const PortfolioQuotePage = lazy(() => import('./components/PortfolioQuotePage'))
const PortfolioContactPage = lazy(() => import('./components/PortfolioContactPage'))
const PortfolioOtherProject = lazy(() => import('./components/Project/PortfolioOtherProject'))

import  gsap from 'gsap'
import Loading from '../../Components/loading/Loading'
import { useDispatch } from 'react-redux'
import { getPortfolioDetails } from '../../store/portfolio/portfolioThunk'
const PortfolioLayout = () => {
  const dispatch = useDispatch()
const movingBall=useRef()
  const handleMouseMove= (e)=>{
    const x= e.clientX 
    const y = e.clientY 
      
      
    gsap.to(movingBall.current,{
      x:x-30,
      y: y-30,
      delay:0.2,
      duration: 0.5,
      ease: "power2.out"
    })

  }


  useEffect(()=>{
    let scrollTimeout;
    const handleScroll= ()=>{
          gsap.to(movingBall.current,{
            scaleX:1,
            duration:0.5,
            ease:"power2.out"
          })
    }


    if(scrollTimeout){
      clearTimeout(scrollTimeout)
    }
    scrollTimeout= setTimeout(()=>{
      gsap.to(movingBall.current,{
        scaleX:1,
        duration:0.5,
        ease:"power2.out"
      })
    },100)
    window.addEventListener('scroll', handleScroll)
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  useEffect(()=>{
    dispatch(getPortfolioDetails())
  },[])
  return (
    <div 
   
    onMouseMove={(e)=>handleMouseMove(e)}
    className='relative' >  
      <div 
       ref={movingBall}
      className='fixed h-3 w-3 rounded-full bg-black z-[9999] pointer-events-none hidden md:block' />
     
          <Suspense fallback={
            <div className='min-h-screen w-full flex items-center justify-center' >
              <Loading />
            </div>
          } >
      <PortfolioName />
      <PortfolioAboutMe />
      <PortfolioWorkExperience />
      <PortfolioSkillAndExpertiese/>
      <PortfolioProjects/> 
      <PortfolioQuotePage /> 
      <PortfolioOtherProject />

      <PortfolioContactPage/>
             </Suspense>
      
    </div>
  )
}

export default PortfolioLayout