import { createSlice } from "@reduxjs/toolkit";

const productLayoutSlice = createSlice({
  name: "productLayout",
  initialState: true,
  reducers: {
    setProductLayout: (state, action) => {
      return action.payload;
    },
  },
});
export const { setProductLayout } = productLayoutSlice.actions;
export default productLayoutSlice.reducer;
