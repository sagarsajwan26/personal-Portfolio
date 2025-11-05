import Router from 'express'
import { addProject, addScreenShot, deleteProject, deleteProjectImage, getProjectById, getProjects, getProjectsForuser, updateprojectArrayData, updateProjectImages, updateProjectStringData } from '../controllers/project.controller.js'
import { verifyJWT } from '../middleware/verifyJWT.js'
import { upload } from '../utils/multer.js' 

const router= Router()
router.route('/').post(verifyJWT,upload.any() ,addProject)
router.route('/getProjects').get(verifyJWT,getProjects)
router.route('/getProjectsForuser').get(getProjectsForuser)
router.route('/:id').get(getProjectById)
router.route('/editObjectdata/:id').put(verifyJWT, updateProjectStringData)
router.route('/updateprojectArrayData/:id').put(verifyJWT, updateprojectArrayData)
router.route('/updateProjectImage/:projectId/:imageId').put(verifyJWT, upload.single('image'), updateProjectImages)
router.route('/deleteProjectImage/:projectId/:imageId/:public_id').delete(verifyJWT,deleteProjectImage)
router.route('/addScreenshot/:projectId').post(verifyJWT, upload.single('image'),addScreenShot)
router.route('/deleteProject/:projectId').delete(verifyJWT, deleteProject)
export default router 