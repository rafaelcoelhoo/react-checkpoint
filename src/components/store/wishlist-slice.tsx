import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product, WishlistState} from "../../models/Product";

const initialState: WishlistState = {
  items: [] as Product[],
  totalItemsQuantity: 0,
  totalPrice: 0
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    initializeWishlistFromLocalStorage(state) {
      const parsedWishlist = JSON.parse(localStorage.getItem("wishlist") ?? "{}");
      state.items = parsedWishlist.items ?? [];
      state.totalItemsQuantity = parsedWishlist.totalItemsQuantity ?? 0;
      state.totalPrice = parsedWishlist.totalPrice ?? 0;
    },
    addItemToWishlist(state, action: PayloadAction<Product>) {
      console.log('!')
      const previousWishlist = localStorage.getItem("wishlist");
      let prevWishlistData: WishlistState;
      if (previousWishlist) {
        prevWishlistData = JSON.parse(previousWishlist);
        state.items = prevWishlistData.items;
        state.totalItemsQuantity = prevWishlistData.totalItemsQuantity;
      }

      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.totalItemsQuantity++;
        state.items.push(newItem);
      }

        const locallyStoredWishlist = {
          items: state.items,
          totalItemsQuantity: state.totalItemsQuantity,
        };
        localStorage.setItem("wishlist", JSON.stringify(locallyStoredWishlist));

    },
    removeProductFromWishlist(state, action: PayloadAction<number>) {
      const id = action.payload;
      const indexToRemove = state.items.findIndex((item) => item.id === id);

      if (indexToRemove !== -1) {
        state.items.splice(indexToRemove, 1); // Using splice to remove the item at the found index
        state.totalItemsQuantity--;

        // Update local storage after modifying the state
        const locallyStoredWishlist = {
          items: state.items,
          totalItemsQuantity: state.totalItemsQuantity,
        };
        localStorage.setItem("wishlist", JSON.stringify(locallyStoredWishlist));
      }
      },
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;
