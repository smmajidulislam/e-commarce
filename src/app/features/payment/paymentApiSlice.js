const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");
const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
    }),
    createPaymentStripe: builder.mutation({
      query: (data) => ({
        url: "/stripe",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCreatePaymentMutation, useCreatePaymentStripeMutation } =
  paymentApi;
export default paymentApi;
