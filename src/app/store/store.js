// store.js
import { configureStore } from "@reduxjs/toolkit";
import authApi from "../features/auth/authApi";
import paymentApi from "../features/payment/paymentApiSlice";
import productApi from "../features/product/productApi";
import orderApi from "../features/order/orderApi";
import categoryApi from "../features/category/categoryApi";
import categoryReducer from "../features/category/categorySlice";
import wishlistReducer from "../features/wishlishtSlice/wishlist";
import profileTabReducer from "../features/profileTabSlice/profileTabSlice";
import totalPriceReducer from "../features/totalPrice/totalPrice";
import Productlayout from "../features/productLayout/productLayout";
import userApi from "../features/adminUserList/userapi";
import reportApi from "../features/reportApi/reportApi";
import settingApi from "../features/setting/settingApi";
import categoryProduct from "../features/adminLayout/categoryProduct";
import sliderApi from "../features/sliderApi/sliderApi";
// একটা সিম্পল slice (example)

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [sliderApi.reducerPath]: sliderApi.reducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    profileTab: profileTabReducer,
    totalPrice: totalPriceReducer,
    productLayout: Productlayout,
    adminProductLayout: categoryProduct,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      categoryApi.middleware,
      paymentApi.middleware,
      userApi.middleware,
      reportApi.middleware,
      settingApi.middleware,
      sliderApi.middleware
    ),
});

export default store;
