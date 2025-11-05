import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { logger } from "../utils/logger.js";
import { loginUserValidator, registerUserValidator } from "../utils/validator.js";
import {User} from '../models/user.model.js'

export const registerUser= asyncHandler(async(req,res)=>{
    const {error} = registerUserValidator(req.body)
    if(error) throw new ApiError(400,'validation error', error)

        const {firstName, lastName, email, password, username}= req.body 

        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        })
        if(existingUser){
            throw new ApiError(409, 'User already exists')
        }
        const user = await User.create({
            firstName,
            lastName: lastName || '',
            email,
            password,
            username: username.toLowerCase()
        })

        if(!user){
            throw new ApiError(500, 'Something went wrong while registering the user')
        }

        return res.status(201).json(new ApiResponse(201,'Account created successfully',user))
 
})


export const loginUser= asyncHandler(async(req,res)=>{
    
    const {error} = loginUserValidator(req.body) 
    if(error) throw new ApiError(400, error.message, error) 
    const {username, password}= req.body 

        const checkUser = await User.findOne({username}).select('+password')
        
        if(!checkUser) throw new ApiError(400, 'no account found')
      
            
        const isPasswordCorrect = await checkUser.comparePassword(password)
        if(!isPasswordCorrect) throw new ApiError(400, 'invalid credentials')

        const token = checkUser.generateToken()

        return res.status(200).cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }).json(new ApiResponse(200, 'login successful', {user: checkUser, token}))


})


export const logoutUser = asyncHandler(async(req, res)=>{
   
    
    return res.status(200).clearCookie('token').json(new ApiResponse(200, 'logout successful'))
})