import jwt from 'jsonwebtoken'


export const verifyJWT = (req,res,next)=>{
    const  token = req?.cookies?.token ||  req?.headers?.authorization.split(' ')[1]
    if(!token){
        throw new ApiError(401,'Unauthorized Request')
    } 
    
    try {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET) 
            if(!decodeToken){
                throw new ApiError(401, 'Unauthorized Request')
            }
            req.user= decodeToken
            next()
        

    } catch (error) {
            return res.status(401).json({
                status:'error',
                message:'Invalid Token'
            })
    }
}