
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useSelector } from 'react-redux'

const PortfolioSkillAndExpertiese = () => {
  const { data } = useSelector(state => state.portfolio)

  const containerRef = useRef()
  const headingRef = useRef()
  const skillsRef = useRef()
  const itemsRef = useRef([])
  const imageRef = useRef()

  const navigate = useNavigate()

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
   
    gsap.from(headingRef.current, {
      opacity: 0,
      x: -100,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      },
    })

    
    gsap.from(itemsRef.current, {
      opacity: 0,
      x: 200,
      stagger: 0.3,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    })

    // Animate image
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 1.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 20%',
        end: 'top -10%',
        scrub: true,
      },
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-2 items-center font-[Urbanist] my-10 md:my-[10vh] px-4 md:px-[10vw] gap-8 md:gap-[5vw] relative py-10 md:py-[10vh]"
    >
      {/* arrow decoration */}
      <span className="absolute left-[50%] bottom-4 md:top-[90%] opacity-[40%]">
        <svg
          fill="#000000"
          width="20px"
          height="20px"
          className="md:w-[25px] md:h-[25px]"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.364 8.95l-5.657-5.657a1 1 0 0 0-1.414 0L5.636 8.95a1 1 0 0 0 1.414 1.414L11 6.414V20a1 1 0 0 0 2 0V6.414l3.95 3.95a1 1 0 0 0 1.414-1.414z"></path>
        </svg>
      </span>

      {/* heading + image */}
      <div className="flex flex-col gap-6 md:gap-[3vw] items-center lg:items-start">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-8xl text-center lg:text-left leading-tight uppercase font-medium tracking-tighter"
        >
          Skill & <br />
          Expertise
        </h1>
        <div className="w-full md:w-[80%] flex items-center justify-center">
          <img
            ref={imageRef}
            className="h-48 md:h-64 lg:h-full w-full rounded-md object-cover"
            src="https://plus.unsplash.com/premium_photo-1664372145543-d60ba2756a7e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>

    
      <div
        ref={skillsRef}
        className="grid grid-cols-2 content-center gap-4 md:gap-[2vw] h-full relative"
      >
        <button
          onClick={() => navigate('/sagarsajwan/skills')}
          className="absolute bg-black text-white px-4 md:px-[1.5vw] py-2 md:py-[1vh] flex items-center justify-center rounded-full text-sm md:text-xl font-semibold hover:bg-white hover:text-black border-2 border-black transition-all duration-300 ease-in-out cursor-pointer gap-2 -bottom-4 md:bottom-10 right-0 md:right-10"
        >
          Check Out
          <svg
            className="fill-current transition-colors duration-300 ease-in-out"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.7071 6.29289C16.3166 5.90237 15.6834 5.90237 15.2929 6.29289C14.9024 6.68342 14.9024 7.31658 15.2929 7.70711L18.5858 11L3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L18.5858 13L15.2929 16.2929C14.9024 16.6834 14.9024 17.3166 15.2929 17.7071C15.6834 18.0976 16.3166 18.0976 16.7071 17.7071L21.7071 12.7071C22.0976 12.3166 22.0976 11.6834 21.7071 11.2929L16.7071 6.29289Z" />
          </svg>
        </button>

       
        {(() => {
          itemsRef.current = []
          return data?.skills?.map((item, idx) => (
            <li
              key={idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="text-lg md:text-2xl font-semibold text-[#6e6565] tracking-wider text-center lg:text-left"
            >
              {item._id}
            </li>
          ))
        })()}
      </div>
    </div>
  )
}

export default PortfolioSkillAndExpertiese

