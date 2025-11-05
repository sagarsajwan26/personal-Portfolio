import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import skillRoutes from './routes/skill.routes.js'
import projectRoutes from './routes/project.routes.js'
import contactRoutes from './routes/contact.routes.js'
import porfolioRouter from './routes/portfolio.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'
import { errorHandler } from './middleware/errorHandler.js'
const app= express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:3000"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))




app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/skill',skillRoutes)
app.use('/api/v1/project',projectRoutes)
app.use('/api/v1/contact', contactRoutes)
app.use('/api/v1/portfolio',porfolioRouter)
app.use('/api/v1/dashboard',dashboardRouter)

app.get('/',(req,res)=>{
    res.send('my profile server is working properly')
})

app.use(errorHandler)

export {app}
