import Router from 'express'
import { addContactDetails } from '../controllers/contact.controller.js'

const router= Router()

router.route('/').post(addContactDetails)

export default router