import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/loginSlice";

export default configureStore({
    reducer: {
        user: userReducer,
    },
});