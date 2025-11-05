import React from 'react'
import Button from '../../../../../Components/input/Button'

const SingleProjectDescription = ({project}) => {
  return (
     <div className='grid grid-cols-1 lg:grid-cols-2 bg-[#F9FAFB] p-6 gap-6 lg:gap-0' >
      <div className='col-span-1 order-2 lg:order-1 px-6  flex flex-col justify-between' >
       <div className='' >
         <h1 className='text-4xl font-bold mb-5' >
         {project.projectTitle}
        </h1>
        <p className='text-md tracking-wide font-light ' > {project.description}</p>
       </div>
        <div className='flex gap-5 mt-5 ' >
          <Button label='live Demo' className='text-white bg-black hover:text-black hover:bg-white'  />
            <Button label='View Code' className='text-black bg-white hover:text-white hover:bg-black  '  />
        </div>
      </div>
      <div className='col-span-1 order-1 lg:order-2  px-10 ' >
        <img 
        className=' w-full object-cover'
        src={project.screenshots[0].url} alt="" />

      </div>
     

      </div>
  )
}

export default SingleProjectDescription