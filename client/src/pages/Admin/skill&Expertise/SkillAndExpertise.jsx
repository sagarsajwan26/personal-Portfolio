import React from 'react'
import { MdColorLens } from "react-icons/md";
import { IoCodeSlashOutline } from "react-icons/io5";
import { BsFilm } from "react-icons/bs";
import { useEffect } from 'react';
import { fetchSkills } from '../../../store/skills/skillThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Button from '../../../Components/input/Button';
import SkillCard from '../../../Components/Card/SkillCard';
import { useNavigate } from 'react-router-dom';

const SkillAndExpertise = () => {
const dispatch = useDispatch()
const {skills} = useSelector(state=> state.skill)
const [activeSkill, setActiveSkill] = useState()
const navigate= useNavigate()
    useEffect(()=>{
        dispatch(  fetchSkills()).then(res=>{
            setActiveSkill(res?.payload[0]?.category);
            
        })
    
    },[])

    

    const extraSkills= [
        {
        icon:MdColorLens,
        label:'design',
        description:'Visual design, branding, and user experience'
    },
     {
        icon:IoCodeSlashOutline,
        label:'Development',
        description:'Frontend and backend programming'
    },
     {
        icon:BsFilm,
        label:'Motion',
        description:'Animation and motion graphics'
    },

    

]


if(!skills) return <> loading</>

if(skills.length===0) return (
    <div className='min-h-screen px-[10vw] font-[Urbanist] mt-[12vh] flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-semibold mb-4 text-[#00000090]'>No Skills Found</h1>
        <p className='text-center text-lg mb-8 text-[#00000070]'>Start building your skill portfolio</p>
        <Button 
            onClick={() => navigate('/admin/homepage/skill/add')}
            className='rounded-full bg-black text-white hover:bg-gray-800 px-8 py-3 font-semibold text-lg border-2 border-black hover:border-gray-800 transition-all ease-in-out duration-300' 
            label='Add Your First Skill' 
        />
    </div>
)
 
const renderSkill= skills.filter(skill=> skill.category=== activeSkill)
console.log(renderSkill);



  return (
    <div className='min-h-screen px-[10vw] font-[Urbanist] mt-[12vh] ' >

    <div className='flex items-center justify-center flex-col ' >
        <h1 className='text-5xl text-center font-semibold mb-6'  >Skill & Expertise</h1>
        <p className='text-center text-2xl' >A comprehensive overview of my technical abilities and creative competencies

</p>
<hr className="w-[10vw] mt-4 h-[3px] bg-[#594d4d5c] border-0" />



    </div>
    <div className='grid grid-cols-3 mt-5 gap-[3vw]' >
        {extraSkills.map((item,idx)=>(
            <div 
            key={idx}
            className=' group flex flex-col items-center justify-center rounded-full border-2 border-[#38252569] p-5  ' >
               <span className='p-1 rounded-full border-2 border-white  group-hover:border-black transition-all ease-in-out duration-300' >
                 <item.icon  className='text-pink-400 text-3xl' /> 
               </span>
                <h1 className='text-center' >{item.label}</h1>
                <p className='text-center px-[2vw]' >{item.description}</p>
            </div>
        ))}
    </div>

    <div  className='mt-[10vw]' >
        <h1 className='text-4xl text-center font-bold text-[#00000090]' >Technical Proficiency</h1>
        <p className='text-center mt-5 ' >Detailed breakdown of skill levels and expertise</p>

        <div className='flex items-center justify-center gap-5 mt-[10vh]' >
            {
                skills?.map((item,idx)=>(
                    <Button key={idx} label={item.category} className={`rounded-full hover:bg-black hover:text-white ${activeSkill ===item.category ? "bg-black text-white" :null}`} onClick={()=>setActiveSkill(item.category)} />
                ))
            }
         

        </div > 

       <div className='relative  w-full h-full py-10 ' >
        <Button 
        onClick={()=> navigate('/admin/homepage/skill/add')}
        className='absolute rounded-full hover:bg-black hover:text-white top-0 right-0 font-bold text:lg border-2' label='Add Skill' />
         <div className='my-[10vh] grid lg:grid-cols-2 gap-5 '  >
          {
            renderSkill[0]?.data.map((item,idx)=>(
                    <SkillCard skill={item} key={idx} />
            ))
          }
        </div>
       </div>
    </div>

            

        
    </div>
  )
}

export default SkillAndExpertise