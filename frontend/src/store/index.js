import { configureStore } from "@reduxjs/toolkit";
import prodSlice from "./prodRoute.js";
import authSlice from "./auth.js";

const store = configureStore({
    reducer: {
        prod: prodSlice,
        auth: authSlice,
    }
});

export default store;