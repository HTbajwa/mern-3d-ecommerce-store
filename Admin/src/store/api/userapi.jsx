import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gettoken } from "../../Localstorage/Store"; // Ensure this function fetches the stored token

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers) => {
      const token = gettoken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Users'], // Enables cache invalidation
  endpoints: (builder) => ({
    
    // GET All Users
    getAllUsers: builder.query({
      query: () => ({ url: 'user', method: 'GET' }),
      providesTags: ['Users'],
    }),

    // GET Single User
    getSingleUser: builder.query({
      query: (id) => ({ url: `user/${id}`, method: 'GET' }),
      providesTags: ['Users'],
    }),

    // POST Category
    postCategory: builder.mutation({
      query: (data) => ({
        url: 'category',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: ['Users'],
    }),

    // PATCH User
    patchUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `user/${id}`,
        method: "PATCH",
       
        body: JSON.stringify(data), // Ensure correct format
        credentials: "include", // Important if using authentication
      }),
      invalidatesTags: ["Users"],
    }),
    // DELETE User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  usePostCategoryMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = userApi;
