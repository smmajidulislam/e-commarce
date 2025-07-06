import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // তোমার API বেস URL অনুযায়ী পরিবর্তন করো
  }),
  tagTypes: ["productReports"],
  endpoints: (builder) => ({
    getProductReport: builder.query({
      query: () => "productReport",
      providesTags: ["productReports"],
    }),
  }),
});

export const { useGetProductReportQuery } = reportApi;

export default reportApi;
