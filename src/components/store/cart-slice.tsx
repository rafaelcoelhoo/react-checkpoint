import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CartProduct, CartState} from "../../models/Product";

const initialState: CartState = {
  items: [] as CartProduct[],
  totalCartPrice: 0,
  totalCartQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCartFromLocalStorage(state) {
      const cart = JSON.parse(localStorage.getItem("cart") ?? "{}");

      state.items = cart.items ?? [];
      state.totalCartPrice = cart.totalCartPrice ?? 0;
      state.totalCartQuantity = cart.totalCartQuantity ?? 0;
    },
    addItemToCart(state, action: PayloadAction<CartProduct>) {
      const previousCart = JSON.parse(localStorage.getItem("cart") ?? "{}");
      state.items = previousCart.items ?? [];
      state.totalCartPrice = previousCart.totalCartPrice ?? 0;
      state.totalCartQuantity = previousCart.totalCartQuantity ?? 0;

      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalCartQuantity++;

      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalItemPrice += newItem.totalItemPrice;
      }

      const totalPrice = state.items.map((product) => product.totalItemPrice);
      const totalQuantity = state.items.map((product) => product.quantity);

      state.totalCartPrice = totalPrice.reduce((prev, curr) => prev + curr, 0);
      state.totalCartQuantity = totalQuantity.reduce((prev, curr) => prev + curr, 0);

      const locallyStoredCart: CartState = {
        items: state.items,
        totalCartPrice: state.totalCartPrice,
        totalCartQuantity: state.totalCartQuantity,
      };

      localStorage.setItem("cart", JSON.stringify(locallyStoredCart));
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalCartQuantity--;

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalCartPrice -= existingItem.price;
        } else {
          existingItem.quantity--;
          existingItem.totalItemPrice -= existingItem.price;
          state.totalCartPrice -= existingItem.price;
        }
      }

      const locallyStoredCart: CartState = {
        items: state.items,
        totalCartPrice: state.totalCartPrice,
        totalCartQuantity: state.totalCartQuantity,
      };

      localStorage.setItem("cart", JSON.stringify(locallyStoredCart));
    },
    clearCart(state) {
      state.items = [];
      state.totalCartPrice = 0;
      state.totalCartQuantity = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
