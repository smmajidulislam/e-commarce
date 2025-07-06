// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // backend base url
    credentials: "include", // cookies support
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/updatePassword", // backend route path
        method: "POST",
        body: passwordData, // expects { password: "newPassword" }
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/forgotPassword",
        method: "POST",
        body: emailData, // expects { email: "user@example.com" }
      }),
    }),
    confirmCode: builder.mutation({
      query: (codeData) => ({
        url: "/confirmCode",
        method: "POST",
        body: codeData, // expects { email: "...", code: "123456" }
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogOutMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useConfirmCodeMutation,
} = authApi;

export default authApi;
