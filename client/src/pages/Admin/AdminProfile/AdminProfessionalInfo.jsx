import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Components/loading/Loading'
import AdminProfessionalDetailComponent from './Components/AdminProfessionalDetailComponent'
import Button from '../../../Components/input/Button'
import Input from '../../../Components/input/Input'
import { JOB_TYPE_OPTIONS } from '../../../utils/data'
import { addUserWorkExperience } from '../../../store/user/userThunk'

const AdminProfessionalInfo = () => {
  const {user} = useSelector(state=> state.user)
  const [addExperience, setAddExperience] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [experience, setexperience] = useState({
     company: "",
     description: "",
     startDate: "",
     endDate: "",
     position: "",
     type: "",
  })

  const handleDataChange= e=>{
    const {id, value} = e.target
    setexperience(prev=> ({
        ...prev, [id]:value
    }))
  }

  const handleAddExperience= async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(addUserWorkExperience(experience))
      setexperience({
        company: "",
        description: "",
        startDate: "",
        endDate: "",
        position: "",
        type: "",
      })
      setAddExperience(false)
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  if(!user) return <Loading />
  
  return (
    <div className='min-h-screen w-full flex items-center justify-center flex-col relative gap-8 md:gap-[4vw] my-10 md:my-[10vw] px-4 md:px-0'>
      <div className='w-full md:w-[80vw] max-w-6xl'>
        
        {/* Header Section */}
        <div className='flex flex-col md:flex-row items-center justify-between w-full mb-8 md:mb-[4vw] gap-6 md:gap-0'>
          <h1 className='text-4xl md:text-6xl lg:text-8xl text-center md:text-left'>Professional Experience</h1> 
        
      
        </div>
  <div className='flex justify-end my-5' >
            <Button 
            label={addExperience ? "Cancel" : "Add New"} 
            className='hover:text-white hover:bg-black transition-all duration-300' 
            onClick={()=> setAddExperience(!addExperience)} 
          />
        </div>
        {/* Add Experience Form */}
        {addExperience && (
          <div className='w-full mb-8 md:mb-[4vw] p-6 md:p-8 border border-black/10 rounded-2xl bg-white/50'>
            <h2 className='text-2xl md:text-3xl mb-6 text-center md:text-left'>Add New Experience</h2>
            
            <form onSubmit={handleAddExperience} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input 
                  value={experience.company} 
                  id='company' 
                  label='Company' 
                  onChange={handleDataChange} 
                  className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                />
                <Input  
                  value={experience.position} 
                  id='position' 
                  label='Position' 
                  onChange={handleDataChange} 
                  className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input 
                  type='date'  
                  value={experience.startDate} 
                  id='startDate' 
                  label='Start Date' 
                  onChange={handleDataChange} 
                  className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                />
                <Input 
                  type='date'  
                  value={experience.endDate} 
                  id='endDate' 
                  label='End Date' 
                  onChange={handleDataChange} 
                  className='border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3' 
                />
              </div>
              
              <div>
                <label htmlFor='type' className='block mb-2 font-medium'>Job Type</label>
                <select 
                  value={experience.type} 
                  id='type' 
                  onChange={handleDataChange} 
                  className='w-full border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3 transition-all duration-300'
                >
                  <option value=''>Select job type</option>
                  {
                    JOB_TYPE_OPTIONS.map((item,idx)=>(
                      <option key={idx} value={item}>{item}</option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <label htmlFor='description' className='block mb-2 font-medium'>Description</label>
                <textarea
                  value={experience.description} 
                  id='description' 
                  onChange={handleDataChange} 
                  rows={4}
                  className='w-full border-b-2 border-black/20 bg-transparent focus:border-black rounded-none px-0 py-3 resize-none transition-all duration-300'
                  placeholder='Describe your role and responsibilities...'
                />
              </div>
              
              <div className='flex justify-center pt-6'>
                <Button 
                  type='submit'
                  label={loading ? 'Adding...' : 'Add Experience'} 
                  disabled={loading}
                  className='hover:text-white hover:bg-black transition-all duration-300 disabled:opacity-50' 
                />
              </div>
            </form>
          </div>
        )}

        {/* Experience List */}
        {!addExperience && (
          <div className='space-y-6 md:space-y-8'>
            {
              user && user.workExperience.length > 0 ? (
                user.workExperience.map((exp,idx)=>(
                  <AdminProfessionalDetailComponent key={idx} experience={exp} />
                ))
              ) : (
                <div className='text-center py-12 md:py-[8vw]'>
                  <p className='text-lg md:text-xl opacity-60'>No work experience added yet</p>
                  <p className='text-sm md:text-base opacity-40 mt-2'>Click "Add New" to get started</p>
                </div>
              )
            }
          </div>
        )}
        
        {/* Decorative Element */}
        <div className='absolute bottom-4 md:bottom-[2vw] right-4 md:right-[2vw] opacity-20'>
          <svg width="20px" height="20px" className='md:w-[25px] md:h-[25px]' viewBox="0 0 24 24" fill="#000000">
            <path d="M18.364 8.95l-5.657-5.657a1 1 0 0 0-1.414 0L5.636 8.95a1 1 0 0 0 1.414 1.414L11 6.414V20a1 1 0 0 0 2 0V6.414l3.95 3.95a1 1 0 0 0 1.414-1.414z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AdminProfessionalInfo