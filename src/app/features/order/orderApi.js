import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/order/admin",
      providesTags: ["Order"],
    }),
    getOrders: builder.query({
      query: ({ page = 1, limit = 10, user }) => {
        // URL query parameters তৈরি করছি
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);
        if (user) {
          params.append("user", user);
        }

        return {
          url: `/order?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useLazyGetOrderByIdQuery,
} = orderApi;
export default orderApi;
