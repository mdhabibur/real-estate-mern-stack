import { createSlice } from "@reduxjs/toolkit";
import { deleteListing, getListingDetails, getListings } from "./listingApi.jsx";

const initialState = {
	listings: [],
	getListingsLoading: false,
	getListingsError: null,
	getListingsSuccess: null,

	listing: {},
	fetchListingLoading: false,
	fetchListingError: null,
	fetchListingSuccess: null,

	deleteListingsLoading: false,
	deleteListingsError: null,
	deleteListingsSuccess: null,
	
};

const listing = createSlice({
	name: "listing",
	initialState,
	reducers: {
		setListingTimerOff: (state) => {
			state.getListingsError = null;
			state.getListingsSuccess = null;

			state.fetchListingError = null;
			state.fetchListingSuccess = null;
			
			state.deleteListingsError = null;
			state.deleteListingsSuccess = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getListings.pending, (state) => {
				state.getListingsLoading = true;
				state.getListingsError = null;
			})
			.addCase(getListings.fulfilled, (state, action) => {
				state.getListingsLoading = false;
				state.getListingsError = null;
				state.listings = action.payload.listings;
				state.getListingsSuccess = action.payload.message;
			})
			.addCase(getListings.rejected, (state, action) => {
				state.getListingsLoading = false;
				state.getListingsSuccess = null;
				state.getListingsError = action.payload;
			})


			.addCase(getListingDetails.pending, (state) => {
				state.fetchListingLoading = true;
				state.fetchListingError = null;
			})
			.addCase(getListingDetails.fulfilled, (state, action) => {
				state.fetchListingLoading = false;
				state.fetchListingError = null;
				state.listing = action.payload.listing;
				state.fetchListingSuccess = action.payload.message;
			})
			.addCase(getListingDetails.rejected, (state, action) => {
				state.fetchListingLoading = false;
				state.fetchListingSuccess = null;
				state.fetchListingError = action.payload;
			})

			
			.addCase(deleteListing.pending, (state) => {
				state.deleteListingsLoading = true;
				state.deleteListingsError = null;
			})
			.addCase(deleteListing.fulfilled, (state, action) => {
				state.deleteListingsLoading = false;
				state.deleteListingsError = null;
				state.listings = state.listings.filter((listing) => listing._id !== action.payload.listing._id)
				state.deleteListingsSuccess = action.payload.message;
			})
			.addCase(deleteListing.rejected, (state, action) => {
				state.deleteListingsLoading = false;
				state.deleteListingsError = action.payload;
				state.deleteListingsSuccess = null;
				
			});
	},
});

export const { setListingTimerOff } = listing.actions;
export default listing.reducer;
