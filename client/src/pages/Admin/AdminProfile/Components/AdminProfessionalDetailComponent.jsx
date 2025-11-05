import React from 'react'
import { useState } from 'react'
import Input from '../../../../Components/input/Input'
import Loading from '../../../../Components/loading/Loading'
import { JOB_TYPE_OPTIONS } from '../../../../utils/data'
import Button from '../../../../Components/input/Button'
import { useDispatch } from 'react-redux'
import { deleteUserWorkExperience, udpateUserWorkExperience } from '../../../../store/user/userThunk'

const AdminProfessionalDetailComponent = ({experience}) => {
    const [editExperience, setEditExperience]= useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [experienceDetail, setExperienceDetails]= useState({
        company:experience.company || "",
        description:experience.description || "",
        startDate:experience.startDate ? experience.startDate.split('T')[0] : "",
        endDate:experience.endDate ? experience.endDate.split('T')[0] : "",
        position:experience.position || "",
        type:experience.type || "",
    })
    
    const handleValueChange= (e)=>{
        const {id, value} = e.target
        setExperienceDetails(prev=> ({
            ...prev, [id]:value
        }))
    }

    const handleSubmit = async e=>{
        e.preventDefault()
        setLoading(true)
        try {
            await dispatch(udpateUserWorkExperience({id:experience._id, data:experienceDetail}))
            setEditExperience(false)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const handleDelete=async e=>{
        try {
       await     dispatch(deleteUserWorkExperience(experience._id))
        } catch (error) {
            console.log(error);
                        
        }
    }
    
    if(!experience) return <Loading />
    
    return (
        <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
            {editExperience ? (
                <div className='space-y-6'>
                    <div className='flex justify-between items-center border-b pb-4'>
                        <h3 className='text-xl font-medium'>Edit Experience</h3>
                        <Button 
                            label='Cancel' 
                            onClick={()=> setEditExperience(false)} 
                            className='bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                        />
                    </div>
                    
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Input  
                                label='Company'  
                                id='company' 
                                value={experienceDetail.company} 
                                onChange={handleValueChange}
                                className='border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
                            />
                            <Input  
                                label='Position'  
                                id='position' 
                                value={experienceDetail.position} 
                                onChange={handleValueChange}
                                className='border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
                            />
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Input  
                                label='Start Date'  
                                id='startDate' 
                                type='date'
                                value={experienceDetail.startDate} 
                                onChange={handleValueChange}
                                className='border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
                            />
                            <Input  
                                label='End Date'  
                                id='endDate' 
                                type='date'
                                value={experienceDetail.endDate} 
                                onChange={handleValueChange}
                                className='border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
                            />
                        </div>
                        
                        <div>
                            <label htmlFor='type' className='block mb-1 font-medium'>Job Type</label>
                            <select 
                                id='type' 
                                value={experienceDetail.type} 
                                onChange={handleValueChange}
                                className='w-full px-5 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all ease-in-out duration-300'
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
                            <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
                            <textarea
                                id='description'
                                value={experienceDetail.description}
                                onChange={handleValueChange}
                                rows={4}
                                className='w-full px-5 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all ease-in-out duration-300 resize-none'
                                placeholder='Describe your role and responsibilities...'
                            />
                        </div>
                        
                        <div className='flex justify-end pt-4'>
                            <Button 
                                type='submit' 
                                label={loading ? 'Updating...' : 'Update'} 
                                disabled={loading}
                                className='bg-black text-white hover:bg-gray-800 border-black disabled:opacity-50 disabled:cursor-not-allowed'
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div className='space-y-4'>
                    <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                            <h3 className='text-xl font-semibold text-gray-900'>{experience.position}</h3>
                            <p className='text-lg text-gray-600 mt-1'>{experience.company}</p>
                            <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                                <span>{experience.startDate ? new Date(experience.startDate).toLocaleDateString() : ''} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</span>
                                {experience.type && (
                                    <span className='px-2 py-1 bg-gray-100 rounded-full text-xs'>
                                        {experience.type}
                                    </span>
                                )}
                            </div>
                        </div>
                      <div className='flex flex-col gap-5 ' >
                          <Button 
                            label='Edit' 
                            onClick={()=> setEditExperience(true)} 
                            className='bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300 text-sm'
                        />
                        <Button 
                            label='Delete' 
                            onClick={handleDelete} 
                            className='bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300 text-sm'
                        />
                      </div>
                    </div>
                    
                    {experience.description && (
                        <div className='pt-3 border-t border-gray-100'>
                            <p className='text-gray-700 leading-relaxed'>{experience.description}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdminProfessionalDetailComponent