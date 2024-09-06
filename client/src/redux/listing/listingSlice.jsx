import { createSlice } from "@reduxjs/toolkit";
import { deleteListing, getListingDetails, getListings, getRecentOfferListings, getRecentRentListings, getRecentSellListings } from "./listingApi.jsx";

const initialState = {
	listings: [],
	getListingsLoading: false,
	getListingsError: null,
	getListingsSuccess: null,

	listing: {},
	fetchListingLoading: false,
	fetchListingError: null,
	fetchListingSuccess: null,

	recentOfferListings: [],
	getRecentOfferListingsLoading: false,
	getRecentOfferListingsError: null,
	getRecentOfferListingsSuccess: null,

	recentRentListings: [],
	getRecentRentListingsLoading: false,
	getRecentRentListingsError: null,
	getRecentRentListingsSuccess: null,

	recentSellListings: [],
	getRecentSellListingsLoading: false,
	getRecentSellListingsError: null,
	getRecentSellListingsSuccess: null,
	

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

		resetListings: (state) => {
			state.listings = []
		}
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




			.addCase(getRecentOfferListings.pending, (state) => {
				state.getRecentOfferListingsLoading = true;
				state.getRecentOfferListingsError = null;
			})
			.addCase(getRecentOfferListings.fulfilled, (state, action) => {
				state.getRecentOfferListingsLoading = false;
				state.getRecentOfferListingsError = null;
				state.recentOfferListings = action.payload.listings;
				state.getRecentOfferListingsSuccess = action.payload.message;
			})
			.addCase(getRecentOfferListings.rejected, (state, action) => {
				state.getRecentOfferListingsLoading = false;
				state.getRecentOfferListingsSuccess = null;
				state.getRecentOfferListingsError = action.payload;
			})




			.addCase(getRecentRentListings.pending, (state) => {
				state.getRecentRentListingsLoading = true;
				state.getRecentRentListingsError = null;
			})
			.addCase(getRecentRentListings.fulfilled, (state, action) => {
				state.getRecentRentListingsLoading = false;
				state.getRecentRentListingsError = null;
				state.recentRentListings = action.payload.listings;
				state.getRecentRentListingsSuccess = action.payload.message;
			})
			.addCase(getRecentRentListings.rejected, (state, action) => {
				state.getRecentRentListingsLoading = false;
				state.getRecentRentListingsSuccess = null;
				state.getRecentRentListingsError = action.payload;
			})



//
			.addCase(getRecentSellListings.pending, (state) => {
				state.getRecentSellListingsLoading = true;
				state.getRecentSellListingsError = null;
			})
			.addCase(getRecentSellListings.fulfilled, (state, action) => {
				state.getRecentSellListingsLoading = false;
				state.getRecentSellListingsError = null;
				state.recentSellListings = action.payload.listings;
				state.getRecentSellListingsSuccess = action.payload.message;
			})
			.addCase(getRecentSellListings.rejected, (state, action) => {
				state.getRecentSellListingsLoading = false;
				state.getRecentSellListingsSuccess = null;
				state.getRecentSellListingsError = action.payload;
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

export const { setListingTimerOff, resetListings } = listing.actions;
export default listing.reducer;
