import React from 'react'
import Button from '../input/Button'
import { FaGithub } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { FaTrash }  from 'react-icons/fa6'
import { FaEdit } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../store/projects/projectThunk'
import { toast } from 'react-toastify'

const ProjectCard = ({ project }) => {
  const { isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleProjectDelete= async()=>{
    await dispatch(deleteProject(project._id)).then(res=>{
      console.log(res);
      if(res.meta.rejectedWithValue){
        toast.error(error.payload.message)
      }
      else{
        toast.success("Project deleted successful")
      }
    })
  }

  return (
    <div
    
      className='relative p-4 border-2 border-[#433d3d38]  shadow-2xl'
    >
      {isAuthenticated && (
        <span className='absolute z-99 top-3 right-3 flex gap-2 bg-white rounded-full'>
          <Button
          onClick={()=> navigate(`/admin/homepage/project/edit/${project._id}`)}
            label=''
            icon={<FaEdit />}
            className='rounded-full hover:text-green-400 hover:bg-black'
          />
          <Button
            label=''
            onClick={handleProjectDelete}
            icon={<FaTrash />}
            className='rounded-full flex items-center justify-center hover:text-red-400 hover:bg-black'
          />
        </span>
      )}

      <div className='w-full'>
      
      <div className='h-[30vh] relative group' >
          <img
          onClick={() => navigate(`/sagarsajwan/projects/${project.projectTitle}`)}
          className= ' group-hover:blur-md h-full w-full object-cover cursor-pointer absolute transition-all ease-in-out duration-300 '
          src={project.screenshots?.[0]?.url || ''}
          alt={project.projectTitle}
        />
        <span className='absolute top-[50%] left-[50%] -translate-[50%] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 '   ><Button label='View' className='rounded-full'  /> </span>
      </div>

        <div>
          <h2 className='text-xl font-semibold text-[#14141480] mt-6 mb-3'>
            {project.projectTitle}
          </h2>
          <p className='text-md leading-[1.2]'>
            {project.description?.length > 150
              ? project.description.slice(0, 150) + '...'
              : project.description}
          </p>

          <div className='flex gap-2 mt-3 mb-3'>
            {project.technologies?.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className='px-4 py-2 text-xs rounded-full border-2 border-[#3331314e] cursor-pointer'
              >
                {tech.split(' ')[0]}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className='px-4 py-2 text-xs rounded-full border-2 border-[#3331314e] cursor-pointer bg-[#04040415]'>
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className='flex gap-2 w-full'>
          <a
            href={project.liveDemoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full'
            onClick={e => e.stopPropagation()}
          >
            <Button
              label='View Live Demo'
              className='text-md rounded-lg hover:bg-black hover:text-white w-full cursor-pointer'
            />
          </a>

          <a
            href={project.repositoryUrl}
            target='_blank'
            rel='noopener noreferrer'
            onClick={e => e.stopPropagation()}
          >
            <Button
              label=''
              icon={<FaGithub />}
              className='text-md rounded-lg hover:bg-black hover:text-white cursor-pointer'
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
