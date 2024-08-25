import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
    },

  description: {
    type: String, 
    required: true
    },

  address: { 
    type: String,
    required: true 
    },

  sellOrRent: { 
    type: String,
    required: true
    },

  parking: { 
    type: Boolean,
    default: false
    },

  furnished: { 
    type: Boolean,
    default: false
    },

  offer: { 
    type: Boolean,
    default: false
    },

  beds: { 
    type: Number,
    required: true
    },

  baths: { 
    type: Number,
    required: true 
    },

  regularPrice: { 
    type: Number, 
    required: true
 },

  discountedPrice: { 
    type: Number
 },

 images: { 
    type: [String], 
    required: true
 }, // Array of image URLs

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
 }, // Reference to the User model

});

const Listing = mongoose.model('Listing', ListingSchema);

export default Listing
