import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateProjectImage } from '../../../../store/projects/projectThunk';

const EditImage = ({image,projectId}) => {
    
    
const [imageData, editImageData] = useState(image)
const [activeImage, setActiveImage] = useState(image?.url)
const dispatch= useDispatch()

const handleUpdateImage= async(e)=>{
    e.preventDefault()

    const form= new FormData()
  
    form.append('image', imageData?.url)
    form.append('caption', imageData?.caption)
    form.append('public_id', imageData?.public_id)    

    dispatch(updateProjectImage({projectId, ImageId:image._id, form})).then(res=>{
        console.log(res);
        
    })

 


}
const handleImage=(e)=>{
    const file= e.target.files[0]
    setActiveImage(URL.createObjectURL(file))
    editImageData({...imageData, url:file})

}
    


    return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-10 h-10 bg-[#424040] rounded-lg flex items-center justify-center'>
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
        </div>
        <h3 className='text-xl font-bold text-[#424040]'>Edit Image</h3>
      </div>
      
      <form onSubmit={handleUpdateImage} className='space-y-6'>
        <div className='relative group'>
          <div className='w-full max-w-sm mx-auto relative overflow-hidden rounded-xl'>
            <img className='w-full h-48 object-cover border-2 border-gray-200 group-hover:border-[#424040] transition-colors duration-200' src={activeImage} alt={imageData?.caption || 'Project image'} />
            <div className='absolute  group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center'>
              <svg className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
              </svg>
            </div>
          </div>
        </div>
        
        <div className='group'>
          <label className='flex items-center gap-2 text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
            </svg>
            Update Image
          </label>
          <input 
            type="file" 
            onChange={handleImage}
            className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-3 text-base font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#424040] file:text-white hover:file:bg-[#2a2828] transition-all duration-200 hover:border-gray-300'
            accept='image/*'
          />
        </div>
        
        <div className='group'>
          <label className='flex items-center gap-2 text-sm font-bold text-[#424040] mb-3 group-focus-within:text-[#2a2828] transition-colors'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
            </svg>
            Caption
          </label>
          <input 
            type="text" 
            value={imageData?.caption} 
            onChange={(e) => editImageData({...imageData, caption: e.target.value})}
            className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-3 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200'
            placeholder='Enter image caption'
          />
        </div>
        
        <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
          <button 
            type="submit"
            className='flex-1 flex items-center justify-center gap-2 bg-[#424040] text-white hover:bg-[#2a2828] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold py-3 px-6 transition-all duration-300'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
            </svg>
            Update Image
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditImage