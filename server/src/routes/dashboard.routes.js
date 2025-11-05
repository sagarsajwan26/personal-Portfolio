import Router  from 'express'
import { verifyJWT } from '../middleware/verifyJWT.js'
import { adminDashboardDetails } from '../controllers/dashboard.controller.js'

const router= Router()
router.route('/').get(verifyJWT,adminDashboardDetails)

export default router 
