import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { logger } from "../utils/logger.js";
import {  } from "../utils/validator.js";
import {User} from '../models/user.model.js'
import { uploadToCloudinary } from "../utils/cloudinary.js";




export const getUserData= asyncHandler(async(req,res)=>{
    const user= await User.find().select('-password').lean()
    if(user.length==0) throw new ApiError(404,'user not found')
        return res.status(200).json(new ApiResponse(200,  'user data fetched successfully',user[0] || []))
})


export const updateUserData= asyncHandler(async(req,res)=>{
 const {firstName, lastName, email,  username, bio , title, aboutMe } =req.body 
    if(!firstName && !lastName && !email && !username && !bio && !title && !aboutMe){
        throw new ApiError(400, 'fields are needed to be updated')
    }



        let updateData= {...req.body}
        


        const updatedUserData= await User.findByIdAndUpdate(req.user._id,{
                $set:updateData
        },{new:true})
        
        if(!updatedUserData){
            throw new ApiError(500, 'Something went wrong while updating user data')
        }
        return res.status(200).json(
            new ApiResponse(200,  'User data updated successfully',updatedUserData)
        )




})

export const updateUserProfilePic= asyncHandler(async(req,res)=>{
    const profilePic = req.file 
    if(!profilePic){
        throw new ApiError(400, 'Profile pic is required')
    }



    const uploadedImage= await uploadToCloudinary(profilePic.buffer)
    if(!uploadedImage){
        throw new ApiError(500, 'Something went wrong while uploading profile pic')
    }

   
    

    const user=  await User.findByIdAndUpdate(req.user._id,{
        profileImage:uploadedImage.secure_url
    })
   
    
    return res.status(200).json(
        new ApiResponse(200, user, 'Profile pic updated successfully')
    )


    

})  
export const addUserWorkExperience= asyncHandler(async(req,res)=>{
 
    
        const {company, position, type,startDate, endDate, isCurrent, description} = req.body
            if(!company) throw new ApiError(400, 'company is required')
            if(!position) throw new ApiError(400, 'position is required')
            const newExperience= await User.findByIdAndUpdate(req.user._id,{
                $push:{
                workExperience:req.body
                }
            },{new:true})
           
            

            if(!newExperience) throw new ApiError(404,'user not found ')
                return res.status(200).json(new ApiResponse(200,'Your experience has been added',newExperience))
})

export const updateuserWorkExperience= asyncHandler(async(req,res)=>{
    const {id} = req.params 
    if(!id) throw new ApiError(401,'experience id is missing')
         const {company, position, type,startDate, endDate, isCurrent, description} = req.body 
        if(!company && !position && !type && !startDate && !endDate  && !isCurrent && !description  ) throw new ApiError(401,'at least one field is required to update')

            let updateData={}
            if(company) updateData['workExperience.$.company']= company
            if(position) updateData['workExperience.$.position']= position
            if(type) updateData['workExperience.$.type']= type
            if(startDate) updateData['workExperience.$.startDate']= startDate
            if(endDate) updateData['workExperience.$.endDate']= endDate
            if(typeof isCurrent !== "undefined") updateData['workExperience.$.isCurrent']= isCurrent
            if(description) updateData['workExperience.$.description']= description
          
           
        
            const updateExperience= await User.findOneAndUpdate({_id:req.user._id, "workExperience._id":id} ,{
                $set: updateData
            },{new:true})
         
            
            if(!updateExperience) throw new ApiError(404,'experience not found')
                return res.status(200).json(new ApiResponse(200,'experience updated successfully',updateExperience))
})


export const updateUserContactInfo=asyncHandler(async(req,res)=>{
    console.log(req.body);
    
        const {email, phone, address, city, state, zipCode}= req.body 
    if(  !email && !phone && !address && !city && !state && !zipCode  ) throw new ApiError(401,'at least one field is required to update')
        let updateData= { ...req.body } 
  

    const update= await User.findByIdAndUpdate(req.user._id,{
        $set : {
            contactInfo:updateData
        }
        
    },{
        new:true
    })
    if(!update) throw new ApiError(404,'user not found')
        return res.status(200).json(new ApiResponse(200,'contact info updated successfully' , update))


})

export const updateUserSocialLinkData= asyncHandler(async(req,res)=>{
console.log(req.body);

       const {linkedin, github, twitter, website,instagram}= req.body 
    if(  !linkedin && !github && !twitter && !website && !instagram  ) throw new ApiError(401,'at least one field is required to update')
        let updateData= {...req.body } 
   


    const update= await User.findByIdAndUpdate(req.user._id,{
        $set : {
            socialLinks:updateData
        }
        
    },{
        new:true
    })
    if(!update) throw new ApiError(404,'user not found')
        return res.status(200).json(new ApiResponse(200,'contact info updated successfully' , update))

})


export const deleteUserExperience= asyncHandler(async(req,res)=>{
    const {id}= req.params
    const user= await User.findByIdAndUpdate(req.user._id,{
        $pull:{
            workExperience:{
                _id:id
            }
        }
    },{new:true})

    return res.status(200).json(new ApiResponse(200,'Experience has been removed',user))
})

export const updateUserPassword= asyncHandler(async(req, res)=>{

    const {password, confirmPassword, oldPassword}= req.body 

    let user= await User.findById(req.user._id).select("+password")
    
    const isOldPasswordCorrect= user.comparePassword(oldPassword)
    if(!oldPassword) throw new ApiError(401,"you are not authorize to change password")
    if(password !== confirmPassword) throw new ApiError(401,"password and confirm password must be same")
        
        user= await User.findByIdAndUpdate(req.user._id,{
            password
        },{new:true})

        return res.status(200).json(new ApiResponse(200,'password updated successfully',{}))

})



