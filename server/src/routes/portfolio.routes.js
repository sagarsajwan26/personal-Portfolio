import Router from 'express'
import { addPorfolioData, getPortfolioData } from '../controllers/portfolio.controller.js'
import {upload} from '../utils/multer.js'
import {verifyJWT} from '../middleware/verifyJWT.js'
const router= Router()

router.route('/').post(verifyJWT,upload.any(),addPorfolioData)
router.route('/').get(getPortfolioData)

export default router