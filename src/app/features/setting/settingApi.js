import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  }),
  tagTypes: ["Setting"],
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: () => "/getSetting",
      providesTags: ["Setting"],
    }),
    updateSetting: builder.mutation({
      query: (data) => ({
        url: "/updateSetting",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    deleteLogo: builder.mutation({
      query: () => ({
        url: "/deleteLogo",
        method: "DELETE",
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const {
  useGetSettingQuery,
  useUpdateSettingMutation,
  useDeleteLogoMutation,
} = settingApi;

export default settingApi;
