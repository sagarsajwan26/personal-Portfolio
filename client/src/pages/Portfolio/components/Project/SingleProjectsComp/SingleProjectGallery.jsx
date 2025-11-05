import React from 'react'

const SingleProjectGallery = ({gallery}) => {
  console.log(gallery);
  
  return (
    <div className=' mt-[10vh] min-h-screen' > 

      <h1 className='text-5xl font-semibold text-center' >Project Gallery</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10' >
        {
          gallery.map((image, index) => (
            <div className='h-full w-[90%] flex items-center justify-center relative group cursor-pointer' >
              <img 
            
              key={index}
              className=' w-full h-full absolutet top-0 left-0 object-cover opacity-80 '
              src={image.url}
              />

              <p className='w-full text-center absolute bottom-0 left-0   p-2 bg-white/90 text-black opacity-0  transition-all ease-in-out group-hover:opacity-100 group-hover-bg-black/100 duration-300' >
                {image.caption} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur blanditiis repellendus recusandae quod asperiores nisi possimus repudiandae laboriosam tempore id reprehenderit fuga, esse sunt, beatae omnis minima consequuntur eaque vel.
              </p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default SingleProjectGallery