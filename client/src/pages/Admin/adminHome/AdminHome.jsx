import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardDetails } from '../../../store/dashboard/dashboardThunk'
import { SiProtondrive } from "react-icons/si";
import { GrTechnology } from "react-icons/gr";
import { IoMailSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";

import logo from '../../../assets/logo.png'
import Overview from '../../../Components/Card/Admin/Dashboard/Overview';
import ProjectCard from '../../../Components/Card/ProjectCard';
import SkillCard from '../../../Components/Card/SkillCard';
const AdminHome = () => {
const dispatch = useDispatch()
const {dashboard} = useSelector(state=> state.dashboard)


console.log(dashboard);


  
  useEffect(()=>{
    dispatch(getDashboardDetails())
  },[])
  return (
    <div className='mt-[12vh] min-h-screen  font-[Urbanist]' >
        
        <div className=' flex flex-col items-center justify-center gap-5  font-[Urbanist]' >
         <span className='h-30 w-30 rounded-full overflow-hidden broder-8 border-[#110f0f]' >
           <img className='h-full w-full object-cover ' src={logo} alt="" />
         </span>
         <h1 className='text-5xl font-semibold text-[#594d4ded]' >Creative Dashboard </h1>
          <p className='text-xl font-medium ' >Welcome Back Sagar Sajwan</p>
          <hr className='w-[20vw] text-[#594d4d5c]' />
        </div>

        <div className='px-[10vw]' >
          <h1 className='text-3xl text-center mb-[5vw] ' >Overveiw</h1 >
          <div className='grid lg:grid-cols-4 gap-7 ' >
            
           <Overview icon={SiProtondrive}  value={dashboard?.projectDetail?.total}  label='Active Projects' />
           <Overview icon={GrTechnology}  value={dashboard?.skillsDetail?.total}  label='Total Skills' />
           <Overview icon={IoMailSharp}  value={dashboard?.contactDetails?.unRead}  label='UnRead messages' />
           <Overview icon={FaRegEye}  value={dashboard?.publicView?.total}  label='Total Visits' />

      
          </div>
        </div>

      <div className='px-[10vw] mt-[10vw]' >
        <h1 className='text-4xl text-center mb-[2vw]' >
          Recent Pojects
        </h1 >
        <p className='text-center mb-5 text-xl' >Latest projects and achievements</p>

          <div className='grid  lg:grid-cols-2 gap-[2vw]' >
            {
              dashboard?.projectDetail?.recentProjects.map((item,idx)=>(
                <ProjectCard project={item} key={idx} />
              ))
            }
          </div>

      </div>

          <div className='my-[10vw] px-[10vw]' >
                <h1 className='text-4xl font-semibold text-center mb-5' >Recent Skills</h1>
                <p className='text-xl  text-center mb-6' >Building bridges between frontend flair and backend power</p>
                
                <div className='grid grid-cols-2 gap-[2vw] ' >
                  {
                    dashboard?.skillsDetail?.recentSkills.map((item,idx)=>(
                   <SkillCard skill={item} key={idx} />
                    ))
                  }
                </div>
          </div>
    
    </div>
  )
}

export default AdminHome