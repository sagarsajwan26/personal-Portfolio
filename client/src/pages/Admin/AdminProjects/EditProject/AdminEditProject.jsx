import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ArrayEditor from './ArrayEditor'
import EditImage from './EditImage'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from "react-router";
import {toast} from 'react-toastify'
import Input from '../../../../Components/input/Input'
import { deleteProjecImage, fetchProjectById, handleStringProjectData } from '../../../../store/projects/projectThunk'
import Button from '../../../../Components/input/Button'
const AdminEditProject = () => {

  const {projectId} = useParams()
  const {singleProject} = useSelector(state=> state.project)
  const navigate= useNavigate()
  
  

  const [project, setProject] = useState()
  const [loading, setLoading] = useState(false)
  const [editObjectData, setEditObjectData] = useState(false)
  const [editfeatures, setEditFeatures] = useState(false)
  const [editTechnologies, seteditTechnologies] = useState(true)
  const [editChallenges, seteditChallenges] = useState(false)
  const [editlessonsLearned, seteditlessonsLearned] = useState(false)
  const [editscreenshots, seteditscreenshots] = useState(false)
  
  const [projectObjectDetails, setprojectObjectDetails] = useState({
    projectTitle: '',
    description: '',
    role: '',
    duration: '',
    teamSize: '',
    isActive: true,
    repositoryUrl: '',
    liveDemoUrl: ''
  })
  const [features, setFeatures] = useState([])
  const [technologies, settechnologies] = useState([])
  const [challenges, setchallenges] = useState([])
  const [lessonsLearned, setlessonsLearned] = useState([])
  const [screenshots, setscreenshots] = useState([])
  const dispatch = useDispatch()
const fetchProject = async () => {
  try {
    const res = await dispatch(fetchProjectById(projectId))
    const details = res.payload
    setProject(details)

    setprojectObjectDetails({
      projectTitle: details?.projectTitle || '',
      description: details?.description || '',
      role: details?.role || '',
      duration: details?.duration || '',
      teamSize: details?.teamSize || '',
      isActive: details?.isActive,
      repositoryUrl: details?.repositoryUrl || '',
      liveDemoUrl: details?.liveDemoUrl || ''
    })

    settechnologies(details?.technologies || [])
    setFeatures(details?.features || [])
    setchallenges(details?.challenges || [])
    setlessonsLearned(details?.lessonsLearned || [])
    setscreenshots(details?.screenshots || [])
  } catch (error) {
    console.error("Failed to fetch project:", error)
  }
}

  useEffect(() => {
    fetchProject()
  }, [])
  const handleToogle = async checked => {
   
    
    dispatch(handleStringProjectData({projectId,isActive: checked})).then(res=> {
      console.log(res);
      
     setprojectObjectDetails(prev=> ({
      ...prev,isActive:!projectObjectDetails.isActive
     }))
    }
    )
    // try {
    //   const res = await axios.put(
    //     'http://localhost:3000/api/v1/project/editObjectdata/68c9a926f2aeef0c1962c493',
    //     { isActive: checked },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     }
    //   )
    //   setprojectObjectDetails(prev => ({
    //     ...prev,
    //     isActive: checked
    //   }))
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const handleEditObjectDataChange = e => {
    const { id, type, value, checked } = e.target
    if (id == 'isActive') return handleToogle(checked)
    setprojectObjectDetails(prev => ({
      ...prev,
      [id]: value
    }))
  }
  const handleUpdateData = async e => {
    e.preventDefault()
    try {
      
    await dispatch(handleStringProjectData({...projectObjectDetails,projectId})).then(res=>{
     
    
      
      if(res.meta.requestStatus==="fulfilled"){
        toast.success('your data has been updated')
      }
      else {
      
        
        toast.error(res.payload.message || "internal server error")
      }
    })

   
    } catch (error) {
      console.log(error.message)
    }
  }


  const deleteProjectImage= async(image)=>{
    try {
     
    
      


      await dispatch(deleteProjecImage({projectId:project._id, imageId:image._id,publicId:image.public_id  })).then(res=>{

        
         if(res.meta.rejectedWithValue){
          toast.error(res.payload.error ||  "internal server Error")
         }
         else{
          toast.success('project image has been deleted successfully')
          setscreenshots(prev=> prev.filter(id=> id._id !==image._id)
          )
         
          

          
          
         }
      }
      
      )


    
      
      
    } catch (error) {
      console.log(error);
      
    }
  }


 
  if (!project) return <div>loading</div>
  return (
    <div className='min-h-screen bg-white font-[Urbanist] pt-[12vh] px-4 md:px-8 lg:px-16'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#424040] font-[Besley] mb-2'>Edit Project</h1>
          <p className='text-gray-600 text-lg'>Update your project information</p>
        </div>
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-[#424040]'>Project Details</h2>
              <button 
                type='button' 
                onClick={() => setEditObjectData(!editObjectData)}
                className='px-4 py-2 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300'
              >
                {editObjectData ? 'Cancel' : 'Edit'}
              </button>
            </div>
          <form onSubmit={handleUpdateData} className='relative'>
          {editObjectData ? (
            <>
              
             
              <label className="relative inline-flex items-center cursor-pointer">
  <input  
   name=''
                id='isActive'
               
                onChange={handleEditObjectDataChange} 
  type="checkbox" 
  checked={projectObjectDetails.isActive} 
  className="sr-only peer" />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#424040]
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full 
                  peer-checked:after:border-white"></div>
  <span className="ml-3 text-sm font-medium text-[#424040]">Active Project</span>
</label>


              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input 
                    label='Project Title'
                    type='text'
                    id='projectTitle'
                    value={projectObjectDetails.projectTitle}
                    onChange={handleEditObjectDataChange}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                  <Input 
                    label='Role'
                    type='text'
                    id='role'
                    value={projectObjectDetails.role}
                    onChange={handleEditObjectDataChange}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                </div>
                
                <Input 
                  label='Description'
                  type='text'
                  id='description'
                  value={projectObjectDetails.description}
                  onChange={handleEditObjectDataChange}
                  className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                />
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input 
                    label='Duration'
                    type='text'
                    id='duration'
                    value={projectObjectDetails.duration}
                    onChange={handleEditObjectDataChange}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                  <Input 
                    label='Team Size'
                    type='text'
                    id='teamSize'
                    value={projectObjectDetails.teamSize}
                    onChange={handleEditObjectDataChange}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input 
                    label='Repository URL'
                    type='text'
                    id='repositoryUrl'
                    value={projectObjectDetails.repositoryUrl}
                    onChange={handleEditObjectDataChange}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                  <Input 
                    label='Live Demo URL'
                    type='text'
                    id='liveDemoUrl'
                    value={projectObjectDetails.liveDemoUrl}
                    onChange={handleEditObjectDataChange}
                    className='w-full border-2 border-gray-200 rounded-xl focus:border-[#424040] focus:ring-4 focus:ring-[#424040]/10 focus:outline-none text-[#424040] bg-white px-4 py-4 text-base font-medium'
                  />
                </div>
              </div>

              <div className='pt-6 border-t border-gray-200 mt-8'>
                <Button 
                  label="Update Data" 
                  type='submit'
                  className='bg-[#424040] text-white hover:bg-[#2a2828] rounded-xl font-semibold py-3 px-6 transition-all duration-300'
                />
              </div>
             
            </>
          ) : (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Project Title</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{projectObjectDetails.projectTitle || 'Not set'}</p>
                </div>
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Role</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{projectObjectDetails.role || 'Not set'}</p>
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-bold text-[#424040] mb-2'>Description</label>
                <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{projectObjectDetails.description || 'Not set'}</p>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Duration</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{projectObjectDetails.duration || 'Not set'}</p>
                </div>
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Team Size</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl'>{projectObjectDetails.teamSize || 'Not set'}</p>
                </div>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Repository URL</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl break-all'>{projectObjectDetails.repositoryUrl || 'Not set'}</p>
                </div>
                <div>
                  <label className='block text-sm font-bold text-[#424040] mb-2'>Live Demo URL</label>
                  <p className='text-gray-700 bg-gray-50 px-4 py-3 rounded-xl break-all'>{projectObjectDetails.liveDemoUrl || 'Not set'}</p>
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-bold text-[#424040] mb-2'>Status</label>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  projectObjectDetails.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {projectObjectDetails.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className='pt-6 border-t border-gray-200'>
                <button type='button' onClick={() => setEditObjectData(true)} className='px-6 py-3 bg-[#424040] text-white hover:bg-[#2a2828] rounded-xl font-semibold transition-all duration-300'>
                  Edit Project Details
                </button>
              </div>

            
            </div>
          )}
          </form>
        </div>

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <ArrayEditor value={technologies} projectId={projectId} id='technologies' onChange={(e)=> settechnologies(e.target.value.split(','))} />
          <ArrayEditor value={features} projectId={projectId} id='features' onChange={(e)=> setFeatures(e.target.value.split(','))} />
          <ArrayEditor value={challenges} projectId={projectId} id='challenges' onChange={(e)=> setchallenges(e.target.value.split(','))} />
          <ArrayEditor value={lessonsLearned} projectId={projectId} id='lessonsLearned' onChange={(e)=> setlessonsLearned(e.target.value.split(','))} />
        </div>

     
        <div className='mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-[#424040]'>Project Images</h2>
            <button 
              onClick={() => seteditscreenshots(!editscreenshots)}
              className='px-4 py-2 border-2 border-[#424040] text-[#424040] hover:bg-[#424040] hover:text-white rounded-xl font-semibold transition-all duration-300'
            >
              {editscreenshots ? 'View Mode' : 'Edit Mode'}
            </button>
          </div>
          
          {editscreenshots ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
             <div>
               {screenshots?.map((image, idx) => (
                <EditImage key={idx} image={image} projectId={project._id} />
              ))}

             </div>

            
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      
               {screenshots?.map((image, idx) => (
                <div key={idx} className='border-2 border-gray-200 rounded-xl p-4 hover:border-[#424040] transition-all duration-200'>
                  <img
                    src={image.url}
                    alt={image.caption}
                    className='w-full h-40 object-cover rounded-lg mb-3'
                  />
                  <p className='text-center text-sm text-[#424040] font-medium mb-3'>{image.caption}</p>
                  <button 
                    onClick={() => deleteProjectImage(image)}
                    className='w-full px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg font-semibold transition-all duration-300'
                  >
                    Delete
                  </button>
                </div>
              ))}
  
       <div className='border-2 border-gray-200 flex items-center justify-center rounded-xl p-4 hover:border-[#424040] transition-all duration-200' >
        <Button label='Add ScreenShot' className='hover:text-white hover:bg-black rounded-full' onClick={()=> navigate(`/admin/homepage/project/addScreenshot/${project._id}`)} />
       </div>
            </div>
          )}
        </div>
        </div>
      </div>
    
  )
}

export default AdminEditProject