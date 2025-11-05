import React from 'react'
import { useState } from 'react'
import {toast} from  'react-toastify'
import axios from 'axios'
const ProjectAdding = () => {
    const [projectTitle, setProjectTitle] = useState('')
    const [description, setDescription]= useState('')
    const [technologies, settechnologies]= useState([])
    const [features, setfeatures]= useState([])
    const [repositoryUrl, setrepositoryUrl]= useState('')
    const [liveDemoUrl, setliveDemoUrl]= useState('')
    const [role, setrole]= useState('')
    const [teamSize, setteamSize]= useState(0)
    const [duration, setduration]= useState('')
    const [challenges, setchallenges]= useState([])
    const [lessonLearned, setlessonLearned]= useState([])
    const [images, setimages]= useState([])
    const [isActive, setisActive]= useState(true)
    const [currImage,setCurrImage] = useState()
    const [aboutImage,setAboutImage] = useState('')

const handleImages= (e)=>{
if(!currImage) return toast.error('image field cannot be empty')
  setimages(prev=> (
[
  ...prev,{ currImage,aboutImage }
]
  ))

  setCurrImage()
  setAboutImage('')
   
    
}

const handleAddProject= async(e)=>{
  e.preventDefault()

const form = new FormData()

form.append("projectTitle",projectTitle || null )
form.append("description" ,description||null)
form.append("repositoryUrl" ,repositoryUrl||null)
if(liveDemoUrl) form.append("liveDemoUrl" ,liveDemoUrl)
form.append("role" ,role||null)
form.append("teamSize" ,teamSize||null)
form.append("duration" ,duration||null)
form.append("isActive" ,isActive||null)
features.forEach(item => form.append('features', item))
technologies.forEach(item => form.append('technologies', item))
challenges.forEach(item => form.append('challenges', item))
lessonLearned.forEach(item => form.append('lessonsLearned', item))

images.forEach((item,idx)=>{
  form.append(`image_${idx}`,item.currImage)
  form.append(`captions[${idx}]`,item.aboutImage)
  
})

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGM2YmRlZTRhNjM0MzNhMzVmNjc0ZjEiLCJpYXQiOjE3NTgyMTU1MTYsImV4cCI6MTc1ODMwMTkxNn0.jYVbbbTZVxr2Y1-NWGpluX6pOojmrRAGAPZuzfD7vgk'
const res= await axios.post('http://localhost:3000/api/v1/project',form,{
  headers:{
    Authorization:`Bearer ${token}`,
    "Content-Type":"multipart/form-data"
  }
})



}



  return (
   <div className='bg-zinc-800 text-white min-h-screen p-4'>
      <form onSubmit={handleAddProject} >
        <label>
          Project Title:
          <input 
            type="text" 
            value={projectTitle} 
            onChange={(e) => setProjectTitle(e.target.value)} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Description:
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Technologies (comma separated):
          <input 
            type="text" 
            value={technologies.join(',')} 
            onChange={(e) => settechnologies(e.target.value.split(',').map(t => t.trim()))} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Features (comma separated):
          <input 
            type="text" 
            value={features.join(',')} 
            onChange={(e) => setfeatures(e.target.value.split(',').map(f => f.trim()))} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Repository URL:
          <input 
            type="url" 
            value={repositoryUrl} 
            onChange={(e) => setrepositoryUrl(e.target.value)} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Live Demo URL:
          <input 
            type="url" 
            value={liveDemoUrl} 
            onChange={(e) => setliveDemoUrl(e.target.value)} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Role:
          <input 
            type="text" 
            value={role} 
            onChange={(e) => setrole(e.target.value)} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Team Size:
          <input 
            type="number" 
            value={teamSize} 
           
            onChange={(e) => setteamSize(Number(e.target.value) )} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Duration:
          <input 
            type="text" 
            value={duration} 
            onChange={(e) => setduration(e.target.value)} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Challenges (comma separated):
          <input 
            type="text" 
            value={challenges.join(',')} 
            onChange={(e) => setchallenges(e.target.value.split(',').map(c => c.trim()))} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

        <label>
          Lesson Learned (comma separated):
          <input 
            type="text" 
            value={lessonLearned.join(',')} 
            onChange={(e) => setlessonLearned(e.target.value.split(',').map(l => l.trim()))} 
            className="block w-full my-2 p-2 text-white"
          />
        </label>

      

        <label className="flex items-center gap-2 my-4">
          <input 
            type="checkbox" 
            checked={isActive} 
            onChange={(e) => setisActive(e.target.checked)} 
          /> 
          Active Project
        </label>
          <button type="submit">Add Project</button>
      </form>
        <div>
            <input type="file" onChange={(e)=> setCurrImage(e.target.files[0])
            
            } />
                <input type="text" value={aboutImage} onChange={(e)=>setAboutImage(e.target.value)} />
                <button onClick={handleImages} >Add image</button>
        </div>  

    </div>
  )
}

export default ProjectAdding