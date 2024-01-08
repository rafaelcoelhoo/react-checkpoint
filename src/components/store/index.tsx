import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import wishlistSlice from "./wishlist-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        wishlist: wishlistSlice.reducer,
        cart: cartSlice.reducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
