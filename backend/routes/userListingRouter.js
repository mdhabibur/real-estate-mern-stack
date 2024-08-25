import express from 'express'
import { createListing, getListings, deleteListing } from '../controllers/userListingController.js'
import { validateRequestToken } from '../utils/validateRequestToken.js'

const router = express.Router()

router.post('/create', validateRequestToken, createListing)
router.get('/get', validateRequestToken, getListings)
router.delete('/delete/:listingId', validateRequestToken, deleteListing )



export default router