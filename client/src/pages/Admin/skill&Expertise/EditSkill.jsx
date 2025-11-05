import React, { useEffect, useRef, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { getSingleSkill, updateSkillData } from '../../../store/skills/skillThunk'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Input from '../../../Components/input/Input'
import { SKILL_CATEGORY_OPTION } from '../../../utils/data'
import Button from '../../../Components/input/Button'
import { IoCamera } from "react-icons/io5";

const EditSkill = () => {
    const [skillData, setSkillData]= useState({
        category:"",
        description:"",
        proficiencyLevel:"",
        skillIcon:'',
        name:'',
        public_id:"",
        categoryColor:"",
        yearsOfExperience:"",
        skillColor:''

    })
   const [uploadImage, setUploadImage] = useState() 



    const [loading,setLoading] = useState(false)
const {id} = useParams()
const dispatch = useDispatch()
const navigate = useNavigate()
const logoRef= useRef()

const {singleSkill} = useSelector(state=> state.skill)
useEffect(()=>{
    if(id) {
        dispatch(getSingleSkill(id)).then(res=> {
            if(res.meta.rejectedWithValue){
                toast.error(res?.payload?.message)
            }
            else{
                setSkillData({...res.payload})
            }
        })
    }
},[id, dispatch])


const handleOnChange=e=>{
    const {id, value} = e.target

    setSkillData(prev=> ({
        ...prev,[id]:value
    }))
}


const handleImageChange= (e)=>{
    try {
          const file= e.target.files[0]
          if(!file) return toast.error('iamge file is required')
            setUploadImage(file)

    } catch (error) {
      console.log('error while processing file',error.message);
      
    }
}

const handleUpdateData=async(e)=>{
  e.preventDefault()
  setLoading(true)

  
  try {
    const form = new FormData()
    form.append('name',skillData.name)
    form.append('category',skillData.category)
    form.append('description',skillData.description)
    form.append('proficiencyLevel',skillData.proficiencyLevel)
    form.append('categoryColor',skillData.categoryColor)
    form.append('yearsOfExperience', skillData.yearsOfExperience)
    if(uploadImage) {
        form.append('image', uploadImage)
    }
    
    const result = await dispatch(updateSkillData({form, skillId:skillData._id, public_id:skillData.public_id}))
    
    if(result.meta.rejectedWithValue) {
        toast.error(result.payload?.message || 'Update failed')
    } else {
        toast.success('Skill updated successfully')
        navigate('/admin/homepage/skills')
    }
    
  } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
  } finally{
    setLoading(false)
  }
}

const handleCancel = () => {
    navigate('/admin/skills')
}




if(!skillData.name && !loading) return <div className='flex justify-center items-center min-h-screen'>Loading...</div>

return (
    <div className='min-h-screen bg-white font-[Urbanist] pt-[12vh] px-4 md:px-8 lg:px-16'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#424040] font-[Besley] mb-2'>Edit Skill</h1>
          <p className='text-gray-600 text-lg'>Update your skill information</p>
        </div>

        
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <div className='flex justify-center mb-8'>
            <div className='relative group'>
              <div className='h-24 w-24 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-[#424040] transition-colors duration-300'>
                {skillData.skillIcon ? (
                  <img 
                    src={skillData.skillIcon} 
                    alt="Skill Icon" 
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='text-gray-400 text-center'>
                    <IoCamera className='text-3xl mx-auto mb-2' />
                    <p className='text-sm'>Upload Icon</p>
                  </div>
                )}
              </div>
              <label htmlFor='image' className='absolute -bottom-2 -right-2 bg-[#424040] text-white p-2 rounded-full hover:bg-[#2a2828] transition-colors duration-300 shadow-lg'>
                <IoCamera className='text-lg' />
              </label>
              <input ref={logoRef}  className='hidden' type="file" name="" id="image" onChange={handleImageChange} />
            </div>
          </div>

          <form onSubmit={handleUpdateData} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='group'>
                <label className='block text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>Skill Name</label>
                <Input 
                  id='name' 
                  value={skillData?.name} 
                  onChange={handleOnChange}
                  className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                  placeholder='e.g., React.js'
                />
              </div>

              <div className='group'>
                <label className='block text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>Years of Experience</label>
                <Input 
                  id='yearsOfExperience' 
                  value={skillData?.yearsOfExperience} 
                  onChange={handleOnChange}
                  className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                  placeholder='e.g., 3'
                  type='number'
                  min='0'
                  max='50'
                />
              </div>
            </div>

            <div className='group'>
              <label className='block text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>Description</label>
              <textarea 
                id='description' 
                value={skillData?.description} 
                onChange={handleOnChange}
                rows={4}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm resize-none'
                placeholder='Describe your experience and expertise with this skill...'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='group'>
                <label className='block text-sm font-bold text-[#424040] mb-3'>Category Color</label>
                <div className='relative'>
                  <input 
                    id='categoryColor' 
                    type='color'
                    value={skillData?.categoryColor} 
                    onChange={handleOnChange}
                    className='w-full h-12 border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none cursor-pointer hover:border-gray-300 transition-all duration-200 shadow-sm'
                  />
                  <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                    <div className='w-6 h-6 rounded-full border-2 border-white shadow-sm' style={{backgroundColor: skillData?.categoryColor}}></div>
                  </div>
                </div>
              </div>

              <div className='group'>
                <label className='block text-sm font-bold text-[#424040] mb-3'>Proficiency Level</label>
                <div className='relative'>
                  <select 
                    name="proficiencyLevel" 
                    id="proficiencyLevel" 
                    value={skillData?.proficiencyLevel}
                    onChange={handleOnChange}
                    className='w-full appearance-none border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 pr-12 cursor-pointer shadow-sm hover:border-gray-300 transition-all duration-200 text-base font-medium'
                  >
                    <option value="" disabled className='text-gray-400'>Select level</option>
                    <option value="Beginner" className='text-[#424040] py-2'>🟢 Beginner</option>
                    <option value="Intermediate" className='text-[#424040] py-2'>🟡 Intermediate</option>
                    <option value="Advanced" className='text-[#424040] py-2'>🟠 Advanced</option>
                    <option value="Expert" className='text-[#424040] py-2'>🔴 Expert</option>
                  </select>
                  <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className='group'>
              <label className='block text-sm font-bold text-[#424040] mb-3'>Category</label>
              <div className='relative'>
                <select 
                  name="category" 
                  id="category" 
                  value={skillData?.category}
                  onChange={handleOnChange}
                  className='w-full appearance-none border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 pr-12 cursor-pointer shadow-sm hover:border-gray-300 transition-all duration-200 text-base font-medium'
                >
                  <option value="" disabled className='text-gray-400'>Select a category</option>
                  {SKILL_CATEGORY_OPTION.map((item, idx) => (
                    <option key={idx} value={item} className='text-[#424040] py-2'>{item}</option>
                  ))}
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                  <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </div>
            </div>
              <div className='flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200'>
            <Button 
              type='submit'
              disabled={loading}
              label={loading ? 'Updating...' : 'Update Skill'}
              className='flex-1 bg-[#424040] text-white hover:bg-[#2a2828] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold py-3 px-6 border-none transition-all duration-300'
            />
            <button  
              type='button'
              onClick={handleCancel}
              className='flex-1 sm:flex-none px-6 py-3 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300'
            >
              Cancel
            </button>
          </div>
          </form>

          {/* Action Buttons */}
       
        </div>
      </div>
    </div>
  )
}

export default EditSkill