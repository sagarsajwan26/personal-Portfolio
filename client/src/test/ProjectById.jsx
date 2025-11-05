import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Input from '../Components/input/Input'
import ArrayEditor from './ArrayEditor'
import EditImage from './EditImage'

const ProjectById = () => {
  const [project, setProject] = useState()
  const [loading, setLoading] = useState(false)
  const [editObjectData, setEditObjectData] = useState(true)
  const [editfeatures, setEditFeatures] = useState(false)
  const [editTechnologies, seteditTechnologies] = useState(true)
  const [editChallenges, seteditChallenges] = useState(false)
  const [editlessonsLearned, seteditlessonsLearned] = useState(false)
  const [editscreenshots, seteditscreenshots] = useState(false)
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGM2YmRlZTRhNjM0MzNhMzVmNjc0ZjEiLCJpYXQiOjE3NTgyNTc2ODIsImV4cCI6MTc1ODM0NDA4Mn0.t897NkAVAIMjxXOLm34n4p2gUUbdUK0g-jAW-mSD0o8'
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

  const fetchProject = async () => {
    const res = await axios.get(
      'http://localhost:3000/api/v1/project/68c9aa1b81f38bced52fcffe'
    )
    setProject(res.data.data)
    const details = res.data.data

    setprojectObjectDetails({
      projectTitle: details.projectTitle,
      description: details.description,
      role: details.role,
      duration: details.duration,
      teamSize: details.teamSize,
      isActive: details.isActive,
      repositoryUrl: details.repositoryUrl,
      liveDemoUrl: details.liveDemoUrl
    })
    settechnologies(details.technologies)
    setFeatures(details.features)
    setchallenges(details.challenges)
    setlessonsLearned(details.lessonsLearned)
    setscreenshots(details.screenshots)
  }

  useEffect(() => {
    fetchProject()
  }, [])
  const handleToogle = async checked => {
    try {
      const res = await axios.put(
        'http://localhost:3000/api/v1/project/editObjectdata/68c9a926f2aeef0c1962c493',
        { isActive: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setprojectObjectDetails(prev => ({
        ...prev,
        isActive: checked
      }))
    } catch (error) {
      console.log(error)
    }
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
      const res = await axios.put(
        'http://localhost:3000/api/v1/project/editObjectdata/68c9aa5d044af3458dd6148f',
        { ...projectObjectDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      setprojectObjectDetails(prev => ({ ...projectObjectDetails }))
    } catch (error) {
      console.log(error.message)
    }
  }


  const deleteProject= async(image)=>{
    try {
    
      const res= await axios.delete(`http://localhost:3000/api/v1/project/deleteProjectImage/68c9aa1b81f38bced52fcffe/${image._id}/${image.public_id}`,{
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':"application/json"
        }
      })
      console.log(res);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

 
  if (!project) return <div>loading</div>
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-10 text-gray-800'>
      {/* <div>
        <form onSubmit={handleUpdateData} className='relative'>
          {editObjectData ? (
            <>
              <button type='button' onClick={() => setEditObjectData(false)}>
                {' '}
                Close
              </button>
              <input
                type='checkbox'
                name=''
                id='isActive'
                checked={projectObjectDetails.isActive}
                onChange={handleEditObjectDataChange}
              />
              <Input 
              
                type='text'
                id='projectTitle'
                value={projectObjectDetails.projectTitle}
                onChange={handleEditObjectDataChange} />
              
              <input
                type='text'
                id='description'
                value={projectObjectDetails.description}
                onChange={handleEditObjectDataChange}
              />
              <input
                type='text'
                id='role'
                value={projectObjectDetails.role}
                onChange={handleEditObjectDataChange}
              />
              <input
                type='text'
                id='duration'
                value={projectObjectDetails.duration}
                onChange={handleEditObjectDataChange}
              />
              <input
                type='text'
                id='teamSize'
                value={projectObjectDetails.teamSize}
                onChange={handleEditObjectDataChange}
              />
              <input
                type='text'
                id='repositoryUrl'
                value={projectObjectDetails.repositoryUrl}
                onChange={handleEditObjectDataChange}
              />
              <input
                type='text'
                id='liveDemoUrl'
                value={projectObjectDetails.liveDemoUrl}
                onChange={handleEditObjectDataChange}
              />
              <button type='submit'>Update data</button>
            </>
          ) : (
            <>
              <button type='button' onClick={() => setEditObjectData(true)}>
                {' '}
                Edit
              </button>
            </>
          )}
        </form>
      </div> */}

     <ArrayEditor value={technologies} id='technologies' onChange={(e)=> settechnologies(e.target.value.split(','))}  />
     <ArrayEditor value={features} id='features' onChange={(e)=> setFeatures(e.target.value.split(','))}  />
     <ArrayEditor value={challenges} id='challenges' onChange={(e)=> setchallenges(e.target.value.split(','))}  />
     <ArrayEditor value={lessonsLearned} id='lessonsLearned' onChange={(e)=> setlessonsLearned(e.target.value.split(','))}  />

     
     {
      editscreenshots ?( <div 
      className='flex gap-[5vw]'
      >

         {screenshots?.map((image) => (
        <EditImage token={token} image={image} />
          ))}
          


      </div> ) :(
          <div className='mb-4'>
        <strong>Screenshots:</strong>
        <div className='grid grid-cols-2 gap-4 mt-2'>
          {screenshots?.map((image,idx) => (
            <div key={idx} className='border rounded p-2'>
              <img
                src={image.url}
                alt={image.caption}
                className='w-full h-40 object-cover rounded'
              />
              <p className='mt-1 text-center text-sm'>{image.caption}</p>
              <button onClick={()=>deleteProject(image)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div> 
      )
     }
     

     
      
    </div>
  )
}

export default ProjectById
