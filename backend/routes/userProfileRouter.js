import express from 'express'
import { updateUserProfile, signOutUser, deleteUserProfile } from '../controllers/userProfileController.js'
import { validateRequestToken } from '../utils/validateRequestToken.js'

const router = express.Router()

router.put('/update/:id', validateRequestToken, updateUserProfile)

router.get('/signout', validateRequestToken ,signOutUser)

router.delete('/delete/:id', validateRequestToken ,deleteUserProfile)


export default router
