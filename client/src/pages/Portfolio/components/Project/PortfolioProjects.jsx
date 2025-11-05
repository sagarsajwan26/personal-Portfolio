import React from 'react'
import { useNavigate } from 'react-router-dom'

const PortfolioProjects = () => {
  const navigate= useNavigate()
  return (
  <div className='h-screen my-[10vw] px-[10vw]  py-[10vw] relative' > 
  <span className='absolute left-[50%] top-[110%] opacity-[40%]' >
        <svg
  fill="#000000"
  width="25px"
  height="25px"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M18.364 8.95l-5.657-5.657a1 1 0 0 0-1.414 0L5.636 8.95a1 1 0 0 0 1.414 1.414L11 6.414V20a1 1 0 0 0 2 0V6.414l3.95 3.95a1 1 0 0 0 1.414-1.414z"
  ></path>
</svg>

      </span>
   <button 
  onClick={()=> navigate("/sagarsajwan/projects")}

  className="absolute bg-black text-white px-[1.5vw] py-[1vh] flex items-center justify-center rounded-full text-xl font-semibold hover:bg-white hover:text-black border-2 border-black transition-all duration-300 ease-in-out cursor-pointer gap-2 bottom-10 right-[20%]"
>

  
  Check Out 
  <svg 
    className="fill-current transition-colors duration-300 ease-in-out"
    width="25px"
    height="25px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.7071 6.29289C16.3166 5.90237 15.6834 5.90237 15.2929 6.29289C14.9024 6.68342 14.9024 7.31658 15.2929 7.70711L18.5858 11L3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L18.5858 13L15.2929 16.2929C14.9024 16.6834 14.9024 17.3166 15.2929 17.7071C15.6834 18.0976 16.3166 18.0976 16.7071 17.7071L21.7071 12.7071C22.0976 12.3166 22.0976 11.6834 21.7071 11.2929L16.7071 6.29289Z"
    />
  </svg>
</button>
        <h1 className='text-7xl text-center uppercase mb-[5vw] tracking-tight font-[Urbanist] font-semibold ' >Portfolio Highlights</h1>

     <div className='grid grid-cols-3 gap-[3vw]  h-full' >
         {[1,2,3].map((item,idx)=>(
          <div className={` flex flex-col items-center ${idx===1 ? "justify-end": null}`} >

             <div className='mb-4' >
               <img className='h-full w-full object-cover'  src="https://imgs.search.brave.com/czbTygfudg5Qy_vKsoEypDA72vUVDH1SZibfyViyzJ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kMXpy/dWY5ZGI2MnA4cy5j/bG91ZGZyb250Lm5l/dC8yMDI1LzA4L1do/YXQtSXMtRWNvbW1l/cmNlLUEtQ29tcHJl/aGVuc2l2ZS1HdWlk/ZS03Njh4NDA0Lndl/YnA" alt="" />
             </div>
             <div> 
               <h1 className='text-xl mb-2 font-[Urbanist] font-semibold ' >Ecommerce Platform</h1>
               <p className='text-md font-[Urbanist] leading-[1.2]' > Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorem deleniti quod sequi assumenda sed animi eligendi enim repellat quisquam.... </p>
             </div>
            
          </div>
        ))}
     </div>
  </div>
  )
}

export default PortfolioProjects