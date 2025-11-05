import React from 'react'
import Button from '../../../../../Components/input/Button'

const InterestedInWorkingTogether = () => {
  return (
    <div className='h-full w-full my-[10vw] bg-[#F9FAFB] py-10' >
        
        <h1 className='text-5xl font-[Urbanist] font-bold text-center mb-10 '  >
            Interested In Working Together
        </h1>
            <p className='text-2xl font-[Urbanist] text-center mb-10' >I'm always open to discussing new projects and opportunities. Let's create something amazing together.</p>

            <div className='w-full flex items-center justify-center gap-[2vw]' >
                <Button label='Start a project' className='text-white bg-black hover:text-black hover:bg-white' />
                <Button label="View Resume" className='hover:text-white hover:bg-black ' />
            </div>
    </div>
  )
}

export default InterestedInWorkingTogether