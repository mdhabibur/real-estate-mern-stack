import { createSlice } from "@reduxjs/toolkit";
import { signInUser } from "./authApi.jsx";


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
        signOut: (state) => {
            state.currentUser = null 
        },
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
    }

})

export const {signOut, setTimerOff} = authSlice.actions
export default authSlice.reducer