// store.js
import { configureStore } from "@reduxjs/toolkit";
import authApi from "../features/auth/authApi";
import productApi from "../features/product/productApi";
import orderApi from "../features/order/orderApi";
import categoryApi from "../features/category/categoryApi";
// একটা সিম্পল slice (example)

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      categoryApi.middleware
    ),
});

export default store;
