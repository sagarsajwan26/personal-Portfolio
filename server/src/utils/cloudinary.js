import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'


    cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET
    });
    

    export const uploadToCloudinary= async(fileBuffer)=>{
   if(!fileBuffer) return new Error('image is required')

    return new Promise((resolve,reject)=>{
        const uploadStream= cloudinary.uploader.upload_stream({resource_type:"auto"},
            (error, result)=>{
                if(error)reject(error) 
                  else  resolve(result)
            }
        )

        uploadStream.end(fileBuffer)

    })

    }

    export const deleteFromCloudinary= async(publicId)=>{
        if(!publicId) throw new Error('public id is required')
            return new Promise((resolve,reject)=>{
        cloudinary.uploader.destroy(publicId,(error,result)=>{
            if(error) reject(error)
                return resolve(result)
            
        })})
    }