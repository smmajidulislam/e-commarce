import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find((item) => item._id === action.payload._id);
      if (!exists) {
        state.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    },

    removeFromWishlist: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.find((p) => p._id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.find((p) => p._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
      }
    },
    selectWishlist: (state) => state.wishlist,
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  increaseQuantity,
  decreaseQuantity,
} = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist;

export const selectWishlistTotal = (state) =>
  state.wishlist.reduce((total, item) => total + item.totalPrice, 0);

export default wishlistSlice.reducer;
