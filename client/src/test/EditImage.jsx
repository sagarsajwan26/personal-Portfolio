import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const EditImage = ({image,token}) => {
    console.log(token);
    
const [imageData, editImageData] = useState(image)
const [activeImage, setActiveImage] = useState(image?.url)

const handleUpdateImage= async(e)=>{
    e.preventDefault()
    console.log(imageData);
    const form= new FormData()
  
    form.append('image', imageData?.url)
    form.append('caption', imageData?.caption)
    form.append('public_id', imageData?.public_id)    
    const res= await axios.put('http://localhost:3000/api/v1/project/updateProjectImage/68c9aa5d044af3458dd6148f/68c9aa5d044af3458dd61490',form,{
        headers:{
                "Authorization":`Bearer ${token}`,
                'Content-Type':"multipart/form-data"
        }
    })
   
    console.log(res);
    


}
const handleImage=(e)=>{
    const file= e.target.files[0]
    setActiveImage(URL.createObjectURL(file))
    editImageData({...imageData, url:file})

}
    


    return (
    <form onSubmit={handleUpdateImage} className='' >
        <img  className='h-50 w-50' src={activeImage} alt="" /> 
        <input type="file"  onChange={handleImage} />
        <input type="text" value={imageData?.caption} onChange={(e)=>editImageData({...imageData,caption:e.target.value})} />
        <button type="submit">
            Update
        </button>
    </form>
  )
}

export default EditImage