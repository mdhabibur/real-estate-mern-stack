import { createSlice } from "@reduxjs/toolkit";
import { deleteListing, getListings } from "./listingApi.jsx";

const initialState = {
	listings: [],
	getListingsLoading: false,
	getListingsError: null,
	getListingsSuccess: null,

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
