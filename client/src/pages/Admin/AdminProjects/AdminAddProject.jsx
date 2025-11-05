import React, { useState } from 'react'
import Input from '../../../Components/input/Input'
import Button from '../../../Components/input/Button'
import { useDispatch } from 'react-redux'
import { AddProject } from '../../../store/projects/projectThunk'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminAddProject = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()
  // Single state object for form fields
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    technologies: [],
    features: [],
    repositoryUrl: '',
    liveDemoUrl: '',
    role: '',
    teamSize: 0,
    duration: '',
    challenges: [],
    lessonLearned: [],
    isActive: true,
  })

  const [images, setImages] = useState([])
  const [currImage, setCurrImage] = useState(null)
  const [aboutImage, setAboutImage] = useState('')

  const handleInputChange = (field, value, isArray = false) => {
    setFormData(prev => ({
      ...prev,
      [field]: isArray ? value.split(',').map(i => i.trim()) : value,
    }))
  }

  const handleImages = () => {
    if (!currImage) {
      toast.error('Image field cannot be empty')
      return
    }
    setImages(prev => [...prev, { currImage, aboutImage }])
    setCurrImage(null)
    setAboutImage('')
  }

  const handleAddProject = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = new FormData()
      
      // Append non-array fields
      form.append('projectTitle', formData.projectTitle)
      form.append('description', formData.description)
      form.append('repositoryUrl', formData.repositoryUrl)
      if(formData.liveDemoUrl) form.append('liveDemoUrl', formData.liveDemoUrl)
      form.append('role', formData.role)
      form.append('teamSize', formData.teamSize)
      form.append('duration', formData.duration)
      form.append('isActive', formData.isActive)
      
      // Append arrays correctly
      formData.technologies.forEach(tech => form.append('technologies', tech))
      formData.features.forEach(feature => form.append('features', feature))
      formData.challenges.forEach(challenge => form.append('challenges', challenge))
      formData.lessonLearned.forEach(lesson => form.append('lessonsLearned', lesson))
      
      // Append images and captions
      const captions = images.map(item => item.aboutImage)
      captions.forEach(caption => form.append('captions', caption))
      
      images.forEach((item, idx) => {
        form.append(`image_${idx}`, item.currImage)
      })

      const res = await dispatch(AddProject(form))
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success(`${res.payload.projectTitle} is added successfully`)
        navigate('/admin/homepage/projects')
      } else {
        toast.warn(res.payload?.errors || 'Failed to add project')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-white font-[Urbanist] pt-[12vh] px-4 md:px-8 lg:px-16'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#424040] font-[Besley] mb-2'>Add New Project</h1>
          <p className='text-gray-600 text-lg'>Create a new project for your portfolio</p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <form onSubmit={handleAddProject} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Project Title'
                type='text'
                value={formData.projectTitle}
                onChange={e => handleInputChange('projectTitle', e.target.value)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='Enter project title'
              />
              
              <Input
                label='Repository URL'
                type='url'
                value={formData.repositoryUrl}
                onChange={e => handleInputChange('repositoryUrl', e.target.value)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='https://github.com/...'
              />
            </div>

            <div className='group'>
              <label className='block text-sm font-bold text-[#424040] mb-3'>Description</label>
              <textarea
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                rows={4}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm resize-none'
                placeholder='Describe your project...'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Technologies (comma separated)'
                type='text'
                value={formData.technologies.join(',')}
                onChange={e => handleInputChange('technologies', e.target.value, true)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='React, Node.js, MongoDB'
              />
              
              <Input
                label='Features (comma separated)'
                type='text'
                value={formData.features.join(',')}
                onChange={e => handleInputChange('features', e.target.value, true)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='Authentication, Real-time chat'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <Input
                label='Live Demo URL'
                type='url'
                value={formData.liveDemoUrl}
                onChange={e => handleInputChange('liveDemoUrl', e.target.value)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='https://demo.com'
              />
              
              <Input
                label='Role'
                type='text'
                value={formData.role}
                onChange={e => handleInputChange('role', e.target.value)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='Full Stack Developer'
              />
              
              <Input
                label='Team Size'
                type='number'
                value={formData.teamSize}
                onChange={e => handleInputChange('teamSize', Number(e.target.value))}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='1'
                min='1'
              />
            </div>

            <Input
              label='Duration'
              type='text'
              value={formData.duration}
              onChange={e => handleInputChange('duration', e.target.value)}
              className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
              placeholder='3 months'
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Challenges (comma separated)'
                type='text'
                value={formData.challenges.join(',')}
                onChange={e => handleInputChange('challenges', e.target.value, true)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='Performance optimization, API integration'
              />
              
              <Input
                label='Lessons Learned (comma separated)'
                type='text'
                value={formData.lessonLearned.join(',')}
                onChange={e => handleInputChange('lessonLearned', e.target.value, true)}
                className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200 shadow-sm'
                placeholder='Better state management, Testing importance'
              />
            </div>

            <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
              <input
                type='checkbox'
                id='isActive'
                checked={formData.isActive}
                onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className='w-5 h-5 text-[#424040] border-2 border-gray-300 rounded focus:ring-[#424040] focus:ring-2'
              />
              <label htmlFor='isActive' className='text-sm font-medium text-[#424040]'>Active Project</label>
            </div>

            {/* Image Upload Section */}
            <div className='border-t border-gray-200 pt-6'>
              <h3 className='text-lg font-semibold text-[#424040] mb-4'>Project Images</h3>
              <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='group'>
                    <label className='block text-sm font-bold text-[#424040] mb-3'>Select Image</label>
                    <input
                      type='file'
                      onChange={e => setCurrImage(e.target.files[0])}
                      className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-3 text-base font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#424040] file:text-white hover:file:bg-[#2a2828] transition-all duration-200'
                      accept='image/*'
                    />
                  </div>
                  
                  <div className='group'>
                    <label className='block text-sm font-bold text-[#424040] mb-3'>Image Caption</label>
                    <input
                      type='text'
                      placeholder='Describe this image'
                      value={aboutImage}
                      onChange={e => setAboutImage(e.target.value)}
                      className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-3 text-base font-medium placeholder:text-gray-400 hover:border-gray-300 transition-all duration-200'
                    />
                  </div>
                </div>
                
                <button
                  type='button'
                  onClick={handleImages}
                  disabled={loading}
                  className='px-6 py-3 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50'
                >
                  Add Image
                </button>
                
                {images.length > 0 && (
                  <div className='mt-4'>
                    <p className='text-sm font-medium text-[#424040] mb-2'>Added Images: {images.length}</p>
                    <div className='flex flex-wrap gap-2'>
                      {images.map((img, idx) => (
                        <span key={idx} className='px-3 py-1 bg-[#424040] text-white text-xs rounded-full'>
                          {img.aboutImage || `Image ${idx + 1}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 bg-[#424040] text-white hover:bg-[#2a2828] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold py-4 px-6 border-none transition-all duration-300 text-base'
              >
                {loading ? 'Adding Project...' : 'Add Project'}
              </button>
              <button
                type='button'
                onClick={() => window.history.back()}
                className='flex-1 sm:flex-none px-6 py-4 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300 text-base'
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

export default AdminAddProject
