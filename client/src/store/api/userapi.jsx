import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/user", prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('ecomustoken'); // Retrieve the token from local storage
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },}),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
        query: () => ({
          url: `/userinfo`,
          method:'GET'
        })
      }),
    postCreateUser: builder.mutation({
        query: (data) => ({
          url: `/register`,
          method:'POST',
          body:data
        })
      }),
    postLoginUser: builder.mutation({
        query: (data) => ({
          url: `/login`,
          method:'POST',
          body:data
        })
      }),
    patchUser: builder.mutation({
        query: (data) => ({
          url: `/`,
          method:'PATCH',
          body:data
        })
      }),
  }),
})

export const { useGetUserInfoQuery,usePostCreateUserMutation,usePostLoginUserMutation,usePatchUserMutation } = userApi