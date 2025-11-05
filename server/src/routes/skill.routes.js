import Router from 'express'
import { addSkill, deleteSkill, getSkillById, getSkills, updateSkill } from '../controllers/skill.controller.js'
import {verifyJWT} from '../middleware/verifyJWT.js'
import { upload } from '../utils/multer.js' 
const router= Router()

router.route('/').get(getSkills)
router.route('/add').post(verifyJWT, upload.single('image'), addSkill)
router.route('/:id/:public_id').put(verifyJWT, upload.single('image'),updateSkill)

router.route('/:id/:public_id').delete(verifyJWT, deleteSkill)
router.route('/:id').get( getSkillById)




export default router 