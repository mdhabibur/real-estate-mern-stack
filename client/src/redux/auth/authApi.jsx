import { createAsyncThunk } from "@reduxjs/toolkit";



export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async (credentials, {rejectWithValue}) => {

        try {
            const response = await fetch(credentials.url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials.formData)
            })

            const data =  await response.json()

            console.log("data: ", data)

            if(data.success === false){
                return rejectWithValue(data?.error || 'Sign in failed')
            }

            return data
            
        } catch (error) {
            console.log("error: ", error)
            return rejectWithValue('an error occurred during sign-in in client end')
           
            
        }

    }

)