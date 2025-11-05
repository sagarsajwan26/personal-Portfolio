import React from 'react'

const PortfolioQuotePage = () => {
  return (
    <div className='min-h-screen my-10 md:my-[10vw] px-4 md:px-[10vw] py-10 md:py-[10vw] relative flex flex-col justify-center' >
       <span className='absolute left-[50%] bottom-4 md:top-[100%] opacity-[40%]' >
        <svg
  fill="#000000"
  width="20px"
  height="20px"
  className='md:w-[25px] md:h-[25px]'
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M18.364 8.95l-5.657-5.657a1 1 0 0 0-1.414 0L5.636 8.95a1 1 0 0 0 1.414 1.414L11 6.414V20a1 1 0 0 0 2 0V6.414l3.95 3.95a1 1 0 0 0 1.414-1.414z"
  ></path> 
</svg>

</span>
     <div className='text-[15vw] md:text-[10vw] text-center uppercase tracking-normal font-[Urbanist] font-semibold' > I Was </div>



     <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 md:-mt-[5vw]' >
       <span className='text-[15vw] md:text-[10vw] text-center uppercase tracking-normal font-[Besley] font-semibold text-[#807c7c]' >Created</span> 
       <div className='h-24 w-32 md:h-[10vw] md:w-[15vw] overflow-hidden rounded-lg md:rounded-none' >  
        <img 
        className='h-full w-full object-cover' 
       
        src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
         </div>
     <div
     className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 md:-mt-[5vw]'
     >
       <div className='h-24 w-32 md:h-[10vw] md:w-[15vw] overflow-hidden rounded-lg md:rounded-none order-2 md:order-1' >
        
      <img  
       className='h-full w-full object-cover'
      src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div> <span 
      className='text-[15vw] md:text-[10vw] text-center uppercase tracking-normal font-[Urbanist] font-semibold order-1 md:order-2'
      >to create</span> </div>
    </div>
  )
}

export default PortfolioQuotePage