import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import projectsList from '../../../../utils/project.json'
import Button from '../../../../Components/input/Button'
import Input from '../../../../Components/input/Input'
import ProjectCard from '../../../../Components/Card/ProjectCard'
const PortfolioProjectsList = () => {
  const navigate= useNavigate()
  const [project, setProject] = useState(projectsList)

  
    return (
    <div className='font-[Urbanist] min-h-screen pt-[5vh] relative' >
        <button  

         onClick={()=> navigate('/')}
  className="absolute bg-white text-black px-[1.5vw] py-[1vh] flex items-center justify-center rounded-full text-xl font-semibold border-black hover:bg-black hover:text-white border-2  transition-all duration-300 ease-in-out cursor-pointer gap-2 left-10 top-10"
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
      <div  >
        <h1 className='text-7xl text-center font-bold mb-5 ' >Signature Works</h1>
          <p className='text-2xl text-center font-medium leading-[0.9] w-[60%]  mx-auto ' >A collection of projects that showcase my skills in web development, mobile apps, UI/UX design, and open source contributions. Each project represents a unique challenge and learning experience.</p>
          
          
      </div >
        <div className='flex  h-[5vh] gap-3  my-10 w-[50%] mx-auto ' >
         <Input
  placeholder="Search"
  className="w-full border border-black rounded-2xl py-2 px-5"
/>

          <Button label='Search' className='border-1 border-black hover:text-white hover:bg-black rounded-full  w-[20%] ' />
        </div>
        <div className=' grid grid-cols-3 gap-[3vw] px-[5vw]' >
          {
            projectsList.map((item,idx)=>(
                <ProjectCard project={item} />
            ))
          }

        </div>

    </div>
  )
}

export default PortfolioProjectsList