import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // e.g. http://localhost:5000/api/
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "getUsers", // ✅ matches router.get("/getUsers")
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `getUser/${id}`, // ✅ matches router.get("/getUserById/:id")
    }),
    getUserByEmail: builder.query({
      query: (email) => `getUserByEmail/${email}`,
    }),
    getUserByPhone: builder.query({
      query: (phone) => `getUserByPhone/${phone}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `updateUser/${id}`, // ✅ matches router.put("/updateUser/:id")
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `deleteUser/${id}`, // ✅ matches router.delete("/deleteUser/:id")
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "createUser", // ✅ matches router.post("/createUser")
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useGetUserByPhoneQuery,
} = userApi;

export default userApi;
