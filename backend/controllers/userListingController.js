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

export const updatedListing = async (req, res, next) => {

  const listingId = req.params.listingId
  try {
    const listingToUpdate = await Listing.findById(listingId)
    if(!listingToUpdate){
      return next(404, "listing not found")
    }
    if(req.user.userId !== listingToUpdate.user.toString()){
      return next(401, "not allowed to update others listing")
    }

    const updatedListing = await Listing.findByIdAndUpdate(listingId, req.body, {new: true})
    
    return res.status(201).send({ message: 'Listing updated successfully!', listing: updatedListing });

  } catch (error) {

    console.error('Error updating listing:', error);
    return next(errorHandler(500, 'listing update failed BE.'));
    
  }

}



export const getListings = async (req, res, next) => {

  try {

    const listings = await Listing.find({user: req.user.userId})

    if(!listings){
      return next(errorHandler(404, "no listings found"))
    }

    return res.status(200).send({ message: 'Listings fetched successfully!', listings: listings});
    
  } catch (error) {

    console.error('Error fetching listings:', error);
    return next(errorHandler(500, 'listings fetching failed BE.'));
    
  }
  

}


export const searchListings = async (req, res, next) => {

  try {
    const queryParams = req.query
    console.log("query params: ", queryParams)

    /*
    queryParams object is like the following object: 
    {
        "searchTerm": "modern3",
        "type": "rentOrSale",
        "parking": "false",
        "furnished": "true",
        "offer": "false",
        "sortBy": "oldest"
    }

    */

    const {searchTerm, type, parking, furnished, offer, sortBy, limit} = queryParams

    let query = {}

    if(searchTerm && searchTerm !== undefined && searchTerm !== "undefined" && searchTerm !== ""){
      query.name = {$regex: searchTerm, $options: 'i'}
    }

    if(type){
      if(type !== "rentOrSale" && type !== "undefined" && type !== undefined && type !== "false"){
        query.sellOrRent = type
      }
      else {
        query.sellOrRent = {$in: ["rent", "sell"]}
      }
    }else {
      query.sellOrRent = {$in: ["rent", "sell"]}
    }

    if(parking && parking !== "undefined" && parking !== undefined && parking !== "false"){
      query.parking = parking === true || parking === 'true'
    }

    else {
      query.parking = {$in: [true, false]}
    }



    if(furnished && furnished !== "undefined" && furnished !== undefined && furnished !== "false"){
      query.furnished = furnished === true || furnished === 'true'
    }

    else {
      query.furnished = {$in: [true, false]}
    }


    if(offer && offer !== "undefined" && offer !== undefined && offer !== "false"){
      query.offer = offer === true || offer === 'true'
    }
    else {
      query.offer = {$in: [true, false]}
    }



    let sortOptions = {}

    if(sortBy && sortBy !== "undefined" && sortBy !== undefined && sortBy !== "false"){
      
      if(sortBy === 'price-low-to-high'){
        sortOptions.regularPrice = 1 //ascending order
      }
      else if(sortBy === 'price-high-to-low'){
        sortOptions.regularPrice = -1 //descending order
      }
      else if(sortBy === 'latest'){
        sortOptions.createdAt = -1 //descending
      }
      else if(sortBy === 'oldest'){
        sortOptions.createdAt = 1
      }

    }else {
      if(sortBy === 'undefined' || sortBy === undefined){

        //the default "price-high-to-low" sent from client
        sortOptions.regularPrice = -1 //descending order


      }
      else {
        //the another default
        sortOptions.createdAt = -1 //latest

      }
    }
  
    const listings = await Listing.find(query).sort(sortOptions).limit(Number(limit) || 0)

    if(!listings || listings.length === 0) {
      return next(errorHandler(404, "no listings found"))
    }

    return res.status(200).send({
      message: 'Listings fetched successfully!',
      listings: listings,
      queryParams,
      listingSize: listings.length
    })
    
  } catch (error) {

    console.error('Error fetching search listings:', error);
    return next(errorHandler(500, 'listings fetching failed BE.'));
    
  }



}



export const getListingDetails = async (req, res, next) => {

  try {
    const listing = await Listing.findById(req.params.listingId).populate("user")

    if(!listing){
      return next(errorHandler(404, "listing not found"))
    }

    return res.status(200).send({ message: 'Listing fetched successfully!', listing: listing});
    
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

