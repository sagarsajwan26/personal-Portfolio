import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { logger } from "../utils/logger.js";
import {  } from "../utils/validator.js";
import {Contact} from '../models/contact.model.js'
import { sendMail } from "../utils/nodemailer.js";


export const addContactDetails= asyncHandler(async(req,res)=>{
   
    const {firstName, lastName, email, subject, message } =req.body

    if(!firstName  || !email || !subject || !message){
        throw new ApiError(400, "All fields are required")
    }

    const mail= await sendMail(firstName, lastName, email, subject, message)
  if(!mail) throw new ApiError(500,'unable to send message please try again later')
    const contactDetails= await Contact.create({
        firstName,
        lastName :lastName || "",
        email,
        subject,
        message
    })

    return res.status(200).json(new ApiResponse(200, contactDetails, "Email has been sent"))

    
})

