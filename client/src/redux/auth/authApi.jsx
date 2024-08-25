import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
	"auth/signInUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
				credentials: "include",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.error || "Sign in failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-in in FE");
		}
	}
);

export const updateUserProfile = createAsyncThunk(
	"auth/updateUserProfile",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
			});

			const data = await response.json();
			console.log("updated profile: ", data);

			//backend error response
			if (data.success === false) {
				return rejectWithValue(data?.error || "profile update failed");
			}

			//backend success
			return data;
		} catch (error) {
			//frontend error
			console.log("error: ", error);
			return rejectWithValue("an error occurred during profile update in FE");
		}
	}
);

export const signOut = createAsyncThunk(
	"auth/signOut",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url);

			const data = await response.json();
			console.log("signed out: ", data);

			//backend error response
			if (data.success === false) {
				return rejectWithValue(data?.error || "signed out failed");
			}

			//backend success
			return data;
		} catch (error) {
			//frontend error
			console.log("error: ", error);
			return rejectWithValue("an error occurred during signed out in FE");
		}
	}
);


export const deleteUser = createAsyncThunk(
	"auth/deleteUser",
	async (credentials, { rejectWithValue }) => {
		try {
            const response = await fetch(credentials.url, {
				method: "DELETE",
			});


			const data = await response.json();
			console.log("user delete: ", data);

			//backend error response
			if (data.success === false) {
				return rejectWithValue(data?.error || "user delete failed");
			}

			//backend success
			return data;
		} catch (error) {
			//frontend error
			console.log("error: ", error);
			return rejectWithValue("an error occurred during user delete in FE");
		}
	}
);

