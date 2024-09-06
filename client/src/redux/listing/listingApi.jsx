import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListings = createAsyncThunk(
	"listing/getListings",
	async (credentials, { rejectWithValue }) => {
		try {

			//the same getListings function is for advance search query for get listings and normal /api/user/listings/get for showing a user's listing when showListing btn is clicked

			let response; 

			if(credentials.queryParams){

				console.log("query params: ", credentials.queryParams)

				const url = credentials.url
				const urlWithQueryParams = `${url}${credentials.queryParams}`
				response = await fetch(urlWithQueryParams, {
					method: "GET",
				});

			}else {
				response = await fetch(credentials.url, {
					method: "GET",
				})
			}


			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "fetching listing failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during fetching listing in FE");
		}	
	}
);

export const getRecentOfferListings = createAsyncThunk(
	"listing/getRecentOfferListings",
	async (credentials, { rejectWithValue }) => {
		try {

			//the same getListings function is for advance search query for get listings and normal /api/user/listings/get for showing a user's listing when showListing btn is clicked

			let response; 

			if(credentials.queryParams){

				console.log("query params: ", credentials.queryParams)

				const url = credentials.url
				const urlWithQueryParams = `${url}${credentials.queryParams}`
				response = await fetch(urlWithQueryParams, {
					method: "GET",
				});

			}else {
				response = await fetch(credentials.url, {
					method: "GET",
				})
			}


			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "fetching offer listing failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during fetching offer listing in FE");
		}	
	}
);


export const getRecentRentListings = createAsyncThunk(
	"listing/getRecentRentListings",
	async (credentials, { rejectWithValue }) => {
		try {

			//the same getListings function is for advance search query for get listings and normal /api/user/listings/get for showing a user's listing when showListing btn is clicked

			let response; 

			if(credentials.queryParams){

				console.log("query params: ", credentials.queryParams)

				const url = credentials.url
				const urlWithQueryParams = `${url}${credentials.queryParams}`
				response = await fetch(urlWithQueryParams, {
					method: "GET",
				});

			}else {
				response = await fetch(credentials.url, {
					method: "GET",
				})
			}


			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "fetching rent offer listing failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during fetching rent offer listing in FE");
		}	
	}
);

export const getRecentSellListings = createAsyncThunk(
	"listing/getRecentSellListings",
	async (credentials, { rejectWithValue }) => {
		try {

			//the same getListings function is for advance search query for get listings and normal /api/user/listings/get for showing a user's listing when showListing btn is clicked

			let response; 

			if(credentials.queryParams){

				console.log("query params: ", credentials.queryParams)

				const url = credentials.url
				const urlWithQueryParams = `${url}${credentials.queryParams}`
				response = await fetch(urlWithQueryParams, {
					method: "GET",
				});

			}else {
				response = await fetch(credentials.url, {
					method: "GET",
				})
			}


			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "fetching rent offer listing failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during fetching rent offer listing in FE");
		}	
	}
);

export const getListingDetails = createAsyncThunk(
	"listing/getListingDetails",
	async (credentials, { rejectWithValue }) => {

		try {
			const response = await fetch(credentials.url, {
				method: "GET",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "fetching listing details failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during fetching listing details in FE");
		}
	}
);

export const deleteListing = createAsyncThunk(
	"listing/deleteListing",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "DELETE",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "delete listing failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during delete a listing in FE");
		}
	}
);