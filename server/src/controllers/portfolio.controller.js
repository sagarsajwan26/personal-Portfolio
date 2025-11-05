import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { logger } from "../utils/logger.js";
import {  } from "../utils/validator.js";
import {Portfolio} from '../models/portfolio.model.js'
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import {Skill} from '../models/skill.models.js'
import { Project } from "../models/project.model.js";
import {Contact} from '../models/contact.model.js'
export const addPorfolioData= asyncHandler(async(req,res)=>{
    
    
    const allImg= req.files

    const {subtitle, aboutMe} = req.body

    const images= await Promise.all(allImg.map(async(img)=>{
        const result= await uploadToCloudinary(img.buffer)

        return { url: result.secure_url, public_id: result.public_id, fieldname: img.fieldname} 
    }))
    if(images.length ==0 ||  images[0] == undefined ) throw new  ApiError(400,'image upload failed')


  
const grouped = images.reduce((result, item)=>{
    const key = item.fieldname 

 
 if(!result[key])  result[key] =[]
 result[key].push(item)


 
 return result
    

   
},{})



    
    
        
    const portfolio= await Portfolio.create({
        owner:req.user._id,
        logo:grouped.logo[0],
        subtitle,
        aboutMe,
        aboutImages:grouped.aboutImages,
        skillandExpertiesImage:{
            url:grouped.skillandExpertiesImage[0].url,
            public_id:grouped.skillandExpertiesImage[0].public_id
        },
        quoteImages:grouped.quoteImages,

    })

if(!portfolio) throw new ApiError(500,'error while creating portfolio')
    return res.status(200).json(new ApiResponse(200,'portfolio',portfolio))

})


export const getPortfolioData= asyncHandler(async(req,res)=>{
    const portfolio= await Portfolio.find().populate("owner" ,'contactInfo profileImage firstName lastName email').lean()
   
    
    const skills= await Skill.aggregate([{
        $group:{
            _id:"$category",
           
        }
    }])
  const projects= await Project.aggregate([{
    $group:{
        _id:"$screenshots"
    }
  }])
  
  
  const highlightsProject= await Project.find().sort({createdAt:-1}).limit(3).lean()

    return res.status(200).json(new ApiResponse(200,'portfolio data fetched',{
        portfolio:portfolio[0] || {},
        skills,
        projects,
        highlightsProject
    }))
})

export const updatePortfolioData= asyncHandler(async(req,res)=>{
    let updateData= {...req.body} 

    const {id} = req.params 
    const data= await Portfolio.findOneAndUpdate({_id:id, owner:req.user._id},{
        $set:updateData
    },{new:true})

    if(!data) throw new ApiError(200,'update failed')

    return res.status(200).json(new ApiResponse(200,'data updated',data))

})


export const updatePortfolioArrayImages= asyncHandler(async(req,res)=>{
    const {id, public_id} =req.params 
    const image= req.file
 
    
    const uploadImage= await uploadToCloudinary(image.buffer)
    if(!uploadImage) throw new ApiError(500,'image upload failed')
      const deleteResult = await deleteFromCloudinary(public_id);
  if (!deleteResult) throw new ApiError(500, 'Failed to delete old image');

   const portfolio= await Portfolio.findById(id) 
   if(!portfolio) throw new ApiError(404,'no record found')
    const arrayToCheck= ['aboutImages','quoteImages']

   let updated= false; 
   for (const arrName of arrayToCheck){
    const images= portfolio[arrName]
    if(!images) continue 


    const idx= images.findIndex(img=> img.public_id)
    if(idx!==-1){
        portfolio[arrName][idx].url=uploadImage.secure_url;
        portfolio[arrName][idx].public_id=uploadImage.public_id;
        updated=true;
        break;
    }
    
   }

   if(!updated) throw new ApiError(404,'image not found in portfolio')

    await portfolio.save()
return res.status(200).json(new ApiResponse(200,'portfolio image updated',portfolio))
})


export const updatePortfolioObjectImage= asyncHandler(async(req,res)=>{
    const file= req.file 
    const {public_id} = req.params

    const deleteImageFromCloudinary= await deleteFromCloudinary(public_id)

    const image= await uploadToCloudinary(file.buffer)

    let data= {
        url:image.secure_url,
        public_id:image.public_id
    }
    const portfolio= await Portfolio.findOne({owner:req.user._id})
    if(!portfolio) throw new ApiError(404,'Sorry no such portfolio found')
    portfolio[file.fieldname]=await data
    
    await portfolio.save()


        return res.status(200).json(new ApiResponse(200,'portfolio updated',portfolio))

})