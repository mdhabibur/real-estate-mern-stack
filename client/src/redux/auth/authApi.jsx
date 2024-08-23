import { createAsyncThunk } from "@reduxjs/toolkit";



export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async (credentials, {rejectWithValue}) => {

        try {
            const response = await fetch(credentials.url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials.formData),
                credentials: 'include'
            })

            const data =  await response.json()

            console.log("data: ", data)

            if(data.success === false){
                return rejectWithValue(data?.error || 'Sign in failed')
            }

            return data
            
        } catch (error) {
            console.log("error: ", error)
            return rejectWithValue('an error occurred during sign-in in CE')
           
            
        }

    }

)


export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await fetch(credentials.url, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials.formData)
            })

            const data = await response.json()
            console.log("updated profile: ", data)

            //backend error response
            if(data.success === false){
                return rejectWithValue(data?.error || 'profile update failed')
            }

            //backend success
            return data

        } catch (error) {
            //frontend error
            console.log("error: ", error)
            return rejectWithValue('an error occurred during profile update in CE')

            
        }
    }
)