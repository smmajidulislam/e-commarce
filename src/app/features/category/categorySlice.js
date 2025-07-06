// features/category/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null,
  page: 1,
  limit: 10,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 1; // ক্যাটেগরি চেঞ্জ হলে পেজ রিসেট করে ১ করা হলো
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setSelectedCategory, setPage, setLimit } = categorySlice.actions;
export default categorySlice.reducer;
