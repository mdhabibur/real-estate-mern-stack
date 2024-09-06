import express from 'express'
import { createListing, getListings, getListingDetails, updatedListing, deleteListing, searchListings } from '../controllers/userListingController.js'
import { validateRequestToken } from '../utils/validateRequestToken.js'

const router = express.Router()

router.post('/create', validateRequestToken, createListing)
router.get('/get', validateRequestToken, getListings)
router.put('/edit/:listingId', validateRequestToken, updatedListing)
router.delete('/delete/:listingId', validateRequestToken, deleteListing )

//advance search
router.get('/search', searchListings)

//single listing 
router.get('/:listingId', validateRequestToken, getListingDetails)





export default router