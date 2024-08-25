import express from 'express'
import { createListing } from '../controllers/userListingController.js'
import { validateRequestToken } from '../utils/validateRequestToken.js'

const router = express.Router()

router.post('/create', validateRequestToken, createListing)



export default router