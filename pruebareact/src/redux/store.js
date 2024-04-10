import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer
    })
})
