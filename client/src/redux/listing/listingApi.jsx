import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListings = createAsyncThunk(
	"listing/getListings",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "GET",
			});

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