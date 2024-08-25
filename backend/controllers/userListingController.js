import Listing from "../models/Listing.js";
import { errorHandler } from "../utils/errorHandler.js";


export const createListing = async (req, res, next) => {

  try {
    const {
      name,
      description,
      address,
      sellOrRent,
      parking,
      furnished,
      offer,
      beds,
      baths,
      regularPrice,
      discountedPrice,
      images,
      userRef
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !address ||
      !sellOrRent ||
      !beds ||
      !baths ||
      !regularPrice ||
      images.length === 0 || 
      !userRef
    ) {
      return next(errorHandler(400, 'Please fill in all required fields.'));
    }

    // Create a new listing
    const newListing = new Listing({
      name,
      description,
      address,
      sellOrRent,
      parking,
      furnished,
      offer,
      beds,
      baths,
      regularPrice,
      discountedPrice,
      images,
      user: userRef, // Assuming you have user authentication
    });

    // Save the listing to the database
    const savedListing = await newListing.save();

    return res.status(201).send({ message: 'Listing created successfully!', listing: savedListing });

  } catch (error) {
    console.error('Error creating listing:', error);
    return next(errorHandler(500, 'listing creation failed BE.'));
  }
};



export const getListings = async (req, res, next) => {

  try {

    const listings = await Listing.find({user: req.user.userId})

    if(!listings){
      return next(errorHandler(400, "no listings found"))
    }

    return res.status(200).send({ message: 'Listing fetched successfully!', listings: listings});
    
  } catch (error) {

    console.error('Error fetching listing:', error);
    return next(errorHandler(500, 'listing fetching failed BE.'));
    
  }
  

}

export const deleteListing = async (req, res, next) => {

  const listingId = req.params.listingId
  
  try {

    const listing = await Listing.findById(listingId)

    if(!listing){
      return next(errorHandler(400, "no listing found"))
    }

    //now check that the one who want to delete the listing actually he uploaded that listing

    //req.user.userId is a string value decoded from jwt token and listing.user is an object id
    if(req.user.userId !== listing.user.toString()){
      return next(errorHandler(401, "not allowed to delete others listing"))
    }

    const listingDeleted = await Listing.findByIdAndDelete(listingId).populate('user')

    return res.status(201).send({ message: 'Listing deleted successfully!', listing: listingDeleted, requestedUser: req.user.userId, listingCreator: listing.user});
    
  } catch (error) {

    console.error('Error deleting listing:', error);
    return next(errorHandler(500, 'listing deleting failed BE.'));
    
  }

}

