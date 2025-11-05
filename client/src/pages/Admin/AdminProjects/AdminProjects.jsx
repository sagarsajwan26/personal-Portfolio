import React, { useEffect, useState } from 'react'
import Button from '../../../Components/input/Button'
import {useDispatch, useSelector} from 'react-redux'
import { FetchAllProjectsForAdmin } from '../../../store/projects/projectThunk'
import ProjectCard from '../../../Components/Card/ProjectCard'
import { useNavigate } from 'react-router-dom'
 const AdminProjects = () => {
  const dispatch = useDispatch()
  const {adminProjects} = useSelector(state=> state.project)
  const [limit, setlimit]= useState(5)
  const [skip,setSkip] = useState(0)
  
  const navigate= useNavigate()
  


  
  useEffect(()=>{
dispatch(FetchAllProjectsForAdmin({limit, skip}))
  },[])
  return (
    <div className='min-h-screen mt-[12vh]' >
  <div  className='flex items-center justify-center flex-col font-[Urbanist] mb-[5vw]' >
        <h1 className='text-7xl font-semibold mb-5 text-[#0000009c]' >Project Portfolio</h1>
      <p className='text-xl w-[40vw]  text-center' >A curated collection of my recent work spanning digital design, development, and creaxltive solutions</p>
  </div>
<div className='flex flex-col items-center justify-center mb-5' >
    <h3 className='text-5xl font-semibold text-[#18181860] mb-5' >Featured Project</h3>
  <p className='text-lg text-center text-[#1e1b1bd3]' >Highlighted work showcasing recent achievements

</p>


</div>
<div className=' mx-auto w-[60vw]  flex items-center justify-center shadow-2xl rounded-3xl py-10' >
  <div className='flex flex-col justify-center items-center' >
<div className='lg:w-[50vw] mb-7 ' >
    <img className='h-full w-full object-cover rounded-2xl' src="https://imgs.search.brave.com/i-NURhIZBbQ1eGzMtnoRFUR57epvFu5ECvrchsWszto/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9vbmxp/bmUuY3NwLmVkdS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOS8w/OS9jc3BfYXJ0aWNs/ZS1hLWJlZ2lubmVy/cy1ndWlkZS10by1l/Y29tbWVyY2VfaGVh/ZGVyLmpwZw" alt="" />

</div  >
<div className='w-[50vw] flex flex-col items-start justify-center gap-5'>
      <h1 className='text-2xl font-semibold ' >Ecommerce Platform Redesign</h1>
    <p className='text-lg'  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptates hic officia at ab quisquam aliquam sint culpa optio veritatis repellat facilis accusantium architecto, deleniti animi eum nemo distinctio dicta Lorem, ipsum dolor sit amet consectetur adipisicing elit. In aliquid sequi ea eum iure rerum placeat pariatur dolor perferendis, quae illum excepturi recusandae temporibus quibusdam nulla dolores vero exercitationem inventore suscipit nostrum corrupti delectus eligendi. Asperiores reiciendis maxime dicta!...</p>
    <div className='flex items-center justify-center gap-5' >
      <span className='' >UI/UX Design</span>
      <span>UI/UX Design</span>
      <span>UI/UX Design</span>
    </div>
    <Button label='View case study' className='rounded-full hover:bg-black hover:text-white' />
</div>
</div>
</div>
<div className='flex my-[5vw] flex-col gap-[5vw] ' >
  <div className='flex items-center justify-center flex-col w-full relative' >
    <h3 className='text-4xl text-[#00000088] mb-5 font-semibold' >All projects</h3>
    <p className='text-xl text-[#1f181887]' >Complete portfolio of creative work and solutions</p>
    <span className='absolute right-[10%] ' >
      <Button 
    onClick={()=>navigate(`/admin/homepage/projects/add`)}
    label='Add new Project' className='rounded-full hover:bg-black hover:text-white' /></span>
  </div>

  <div className='grid lg:grid-cols-3 gap-6 px-10' >
    
    {
      adminProjects?.map((project,idx)=>(
        <ProjectCard key={idx} project={project} />
      ))
    }
  </div>
  
</div>
    </div>
  )
}

export default AdminProjects