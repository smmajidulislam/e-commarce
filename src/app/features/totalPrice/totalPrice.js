import { createSlice } from "@reduxjs/toolkit";

const totalPriceSlice = createSlice({
  name: "totalPrice",
  initialState: 0,
  reducers: {
    setOrderTotalPrice: (state, action) => {
      // action.payload = array of products with totalPrice
      const total = action.payload.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      return total;
    },
  },
});

export const { setOrderTotalPrice } = totalPriceSlice.actions;
export const selectOrderTotalPrice = (state) => state.totalPrice;
export default totalPriceSlice.reducer;
