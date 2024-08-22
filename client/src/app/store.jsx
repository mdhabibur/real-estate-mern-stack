import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/auth/authSlice.jsx'

import storage from 'redux-persist/lib/storage' // default to local storage fro web
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'


//persist configuration
const persistConfig = {
    key: 'root',
    storage
}

//persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth:  persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})


//create a persistor
export const persistor = persistStore(store)