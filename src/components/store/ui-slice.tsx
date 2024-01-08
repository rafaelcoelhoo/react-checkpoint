import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, wishlistIsVisible: false },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
      state.cartIsVisible ? document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto";
      const rootElement = document.getElementById('root');
      if (rootElement) {
        state.cartIsVisible
            ? rootElement.setAttribute('inert', 'true')
            : rootElement.removeAttribute('inert');
      }
    },
    toggleWishlist(state) {
      state.wishlistIsVisible = !state.wishlistIsVisible;
      state.wishlistIsVisible ? document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto";
      const rootElement = document.getElementById('root');
      if (rootElement) {
        state.wishlistIsVisible
            ? rootElement.setAttribute('inert', 'true')
            : rootElement.removeAttribute('inert');
      }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
