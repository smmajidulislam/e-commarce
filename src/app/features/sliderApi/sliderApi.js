import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["Slider"],
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => "/slider",
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Slider", id: _id })),
              { type: "Slider", id: "LIST" },
            ]
          : [{ type: "Slider", id: "LIST" }],
    }),

    getSliderById: builder.query({
      query: (id) => `/slider/${id}`,
      providesTags: (result, error, id) => [{ type: "Slider", id }],
    }),

    createSlider: builder.mutation({
      query: (data) => ({
        url: "/slider",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Slider", id: "LIST" }],
    }),

    updateSlider: builder.mutation({
      query: ({ id, data }) => ({
        url: `/slider/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Slider", id }],
    }),

    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `/slider/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Slider", id }],
    }),
  }),
});

export const {
  useGetSlidersQuery,
  useGetSliderByIdQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;

export default sliderApi;
