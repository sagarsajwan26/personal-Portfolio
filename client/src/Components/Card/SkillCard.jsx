import { useState } from 'react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../input/Button';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteSkillData } from '../../store/skills/skillThunk';

const SkillCard = ({skill}) => {
  const {isAuthenticated} = useSelector(state=> state.auth) 
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  
  const handleDelete = async ({ id, public_id }) => {
  setLoading(true);
  try {
    if (isAuthenticated) {
      await dispatch(deleteSkillData({ id: skill._id, public_id: skill.public_id }));
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div  className='col-span-1 flex  p-5 border-2 border-[#c9bebe] rounded-2xl hover:bg-[#d44d4dae] hover:text-white transition-all ease-in-out duration-300'  >
            <div className='flex flex-col  items-between justify-between w-full'>
              <div  className='flex items-center justify-start gap-6' >
                
                 <img className='h-10 w-10 p-2 bg-[#eae0e0] rounded-md object-cover' src={skill?.skillIcon || skill?.icon} alt="" /> <h4
                 className='text-2xl  font-bold '
                 >{skill?.name}</h4> </div>

                <p className='text-md font-medium px-2 pt-3 ' >{ skill?.description|| skill?.about}</p>
                </div>
                <div className='flex flex-col gap-2' >
                 <Button label='Edit' className='w-full rounded-full hover:bg-black hover:text-white flex items-center justify-between transition-all ease-in-out duration-300  gap-5 ' icon={ <FiEdit /> } onClick={()=> navigate(`/admin/homepage/skills/${skill._id}`)}  />
                 <Button 
                 disabled={loading}
                 label={`${loading ? 'Deleting...' : 'Delete'}`}  
                
                 onClick={()=> handleDelete({id:skill._id, public_id:skill.public_id})}  className='w-full rounded-full hover:bg-black hover:text-white flex items-center justify-between gap-5  transition-all ease-in-out duration-300 ' icon={<MdDelete />} />
                </div>

            </div>
  )
}

export default SkillCard