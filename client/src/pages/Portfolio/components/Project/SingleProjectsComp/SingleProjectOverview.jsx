import React from 'react'

const SingleProjectOverview = ({project}) => {
  return (
    <div className='font-[Urbanist] py-[5vh] px-[6vw] bg-white'> 
      <h1 className='text-4xl font-bold mb-8 text-center'>Project Overview</h1>
      
      <div className='grid grid-cols-3 gap-8'>
        <div className='col-span-2 space-y-8'>
          <div>
            <h4 className='text-2xl font-semibold mb-4 text-[#424040]'>Challenges</h4>
            <div className='space-y-3'>
              {project.challenges.map((challenge, index) => (
                <p key={index} className='text-md leading-[1.4] text-gray-700 pl-4 border-l-2 border-gray-200'>{challenge}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-2xl font-semibold mb-4 text-[#424040]'>Key Features</h4>
            <div className='space-y-3'>
              {project.features.map((feature, index) => (
                <p key={index} className='text-md leading-[1.4] text-gray-700 pl-4 border-l-2 border-gray-200'>{feature}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-2xl font-semibold mb-4 text-[#424040]'>What I Learned</h4>
            <div className='space-y-3'>
              {project.lessonsLearned.map((learning, index) => (
                <p key={index} className='text-md leading-[1.4] text-gray-700 pl-4 border-l-2 border-gray-200'>{learning}</p>
              ))}
            </div>
          </div>
        </div>

        <div className='col-span-1 space-y-8'>
          <div className='bg-[#F9FAFB] p-6 rounded-lg'>
            <h4 className='text-xl font-semibold mb-6 text-[#424040]'>Project Info</h4>
            <div className='space-y-4'>
              <div className='border-b border-gray-200 pb-3'>
                <p className='text-sm text-gray-500 uppercase tracking-wide'>Year</p>
                <h5 className='text-lg font-medium'>{project.year || 2025}</h5>
              </div>
              <div className='border-b border-gray-200 pb-3'>
                <p className='text-sm text-gray-500 uppercase tracking-wide'>Duration</p>
                <h5 className='text-lg font-medium'>{project.duration || "3 months"}</h5>
              </div>
              <div className='border-b border-gray-200 pb-3'>
                <p className='text-sm text-gray-500 uppercase tracking-wide'>Team</p>
                <h5 className='text-lg font-medium'>{project.team || "Solo"}</h5>
              </div>
              <div>
                <p className='text-sm text-gray-500 uppercase tracking-wide'>Client</p>
                <h5 className='text-lg font-medium'>{project.client || 'Tech Flow Startup'}</h5>
              </div>
            </div>
          </div>

          <div>
            <h4 className='text-xl font-semibold mb-4 text-[#424040]'>Technologies Used</h4>
            <div className='flex flex-wrap gap-2'>
              {project.technologies.map((technology, index) => (
                <span key={index} className='px-3 py-1 text-sm rounded-full border-2 border-[#3331314e] bg-white hover:bg-gray-50 transition-colors'>
                  {technology.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default SingleProjectOverview