import {logger} from '../utils/logger.js'
import { ApiError } from '../utils/ApiError.js'

export const errorHandler= (err,req,res,next)=>{
        logger.error(err)

        if(err instanceof ApiError ){
            return res.status(err.statusCode).json({
                status:'error',
                error:err.message,
                errors:err.errors || null ,
                stack: process.env.NODE_ENV==='production' ? undefined :err.stack
            })
        }

       return   res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
}