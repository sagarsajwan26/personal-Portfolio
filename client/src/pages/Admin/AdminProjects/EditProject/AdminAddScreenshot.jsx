import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../Components/input/Button'
import { useDispatch } from 'react-redux'
import { addScreenShot } from '../../../../store/projects/projectThunk'
import { toast } from 'react-toastify'

const AdminAddScreenshot = () => {
    const {projectId} = useParams()
    const [image, setImage]= useState()
    const [imagePrev, setImagePrev] = useState('')
    const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate= useNavigate()
    const handleImage= async(e)=>{
        const file= e.target.files[0]
        setImage(file)
        setImagePrev(URL.createObjectURL(file))

    }
    const handleAddImage = async(e)=>{
        e.preventDefault()

        if(!image) toast.error('Image file is required')
            if(!description) toast.error('caption is required')
        const form = new FormData()
        form.append('image', image)
        form.append('caption',description)


        await dispatch(addScreenShot({projectId, form})).then(res=>{
           
            if(res.meta.requestStatus==='fulfilled'){
                toast.success("screenshot added")
                navigate(-1)
            }
            else if(res.meta.rejectedWithValue) {
                   
            }
        })
    }
  
    return (
    <div className='min-h-screen bg-white font-[Urbanist] pt-[12vh] px-4 md:px-8 lg:px-16'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#424040] font-[Besley] mb-2'>Add Screenshot</h1>
          <p className='text-gray-600 text-lg'>Add a new image to your project</p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <form onSubmit={handleAddImage} className='space-y-8'>
            {/* Image Preview */}
            {imagePrev && (
              <div className='relative group'>
                <div className='w-full max-w-md mx-auto relative overflow-hidden rounded-xl'>
                  <img 
                    className='w-full h-64 object-cover border-2 border-gray-200 group-hover:border-[#424040] transition-colors duration-200' 
                    src={imagePrev} 
                    alt='Preview' 
                  />
                  <div className='absolute  group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center'>
                    <svg className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            {/* File Upload */}
            <div className='group'>
              <label className='flex items-center gap-2 text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                Select Image
              </label>
              <input 
                type="file" 
                onChange={handleImage}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-3 text-base font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#424040] file:text-white hover:file:bg-[#2a2828] transition-all duration-200 hover:border-gray-300'
                accept='image/*'
                required
              />
            </div>
            
            {/* Caption */}
            <div className='group'>
              <label className='flex items-center gap-2 text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
                </svg>
                Image Caption
              </label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 resize-none'
                placeholder='Describe this image...'
                required
              />
            </div>
            
            {/* Submit Button */}
            <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
              <button 
                type='submit'
                className='flex-1 flex items-center justify-center gap-2 bg-[#424040] text-white hover:bg-[#2a2828] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold py-4 px-6 transition-all duration-300'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Add Screenshot
              </button>
              <button 
                type='button'
                onClick={() => window.history.back()}
                className='flex-1 sm:flex-none px-6 py-4 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAddScreenshot