import express from 'express'
import { updateUserProfile } from '../controllers/userProfileController.js'
import { validateRequestToken } from '../utils/validateRequestToken.js'

const router = express.Router()

router.put('/update/:id', validateRequestToken, updateUserProfile)


export default router
