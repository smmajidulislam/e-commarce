import { createSlice } from "@reduxjs/toolkit";

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: false,
  reducers: {
    setCategoryProduct: (state, action) => action.payload,
  },
});

export default categoryProductSlice.reducer;
export const { setCategoryProduct } = categoryProductSlice.actions;
