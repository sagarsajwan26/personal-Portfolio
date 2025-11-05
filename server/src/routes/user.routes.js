import Router from 'express'
import { addUserWorkExperience, deleteUserExperience, getUserData, updateUserContactInfo, updateUserData, updateUserProfilePic, updateUserSocialLinkData, updateuserWorkExperience } from '../controllers/user.controller.js'
import {verifyJWT} from '../middleware/verifyJWT.js'
import { upload } from '../utils/multer.js'

const router= Router()
    router.route('/').get(getUserData)
    router.route('/updateData').put( verifyJWT, updateUserData)
    router.route('/updateProfilePic').post(verifyJWT,upload.single('profilePic'),  updateUserProfilePic)
    router.route('/addUserWorkExperience').post(verifyJWT, addUserWorkExperience)
    router.route('/updateUserWorkExperience/:id').put(verifyJWT, updateuserWorkExperience)
    router.route('/updateUserContactInfo').put(verifyJWT, updateUserContactInfo)
    router.route('/updateUserSocialLinkData').put(verifyJWT, updateUserSocialLinkData)
    router.route('/deleteUserExperience/:id').delete(verifyJWT, deleteUserExperience)


export default router 