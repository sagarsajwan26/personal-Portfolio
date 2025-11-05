import React from 'react'

const Overview = ({icon, value, label}) => {
  return (
      <div className='col-span-1 flex flex-col items-center justify-center group border-2 rounded-lg p-6 hover:shadow-2xl hover:shadow-[#53434389] transition-all ease-in-out duration-300' > 
                 <span className='p-3 rounded-full border-2 border-white group-hover:border-black transition-all ease-in-out duration-300' >
  {icon && React.createElement(icon, { className: 'text-2xl' })}
</span>

   
                     <h1 className='group-hover:font-bold transition-all ease-in-out duration-300 text-md gap-10 ' >{value || 0}</h1>
                       <p className='text-lg ' >{label || ''}</p>
   
               </div>
  )
}

export default Overview