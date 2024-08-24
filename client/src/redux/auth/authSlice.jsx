import { createSlice } from "@reduxjs/toolkit";
import { signInUser, updateUserProfile, signOut, deleteUser } from "./authApi.jsx";


const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    success: null
}

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        setTimerOff: (state) => {
            state.error = null
            state.success = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.currentUser = action.payload.user
                state.success = action.payload.message

            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false
                state.success = null
                state.error = action.payload

            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.currentUser = action.payload.updatedUser
                state.success = action.payload.message

            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false
                state.success = null
                state.error = action.payload

            })
            .addCase(signOut.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.currentUser = null
                state.success = action.payload.message

            })
            .addCase(signOut.rejected, (state, action) => {
                state.loading = false
                state.success = null
                state.error = action.payload

            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.currentUser = null
                state.success = action.payload.message

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.success = null
                state.error = action.payload

            })
    }

})

export const {setTimerOff} = authSlice.actions
export default authSlice.reducer