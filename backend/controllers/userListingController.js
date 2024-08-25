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

