import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getAllCartItem: builder.query({
      query: () => ({
        url:'cart',
        method:'GET'
      })
    }),
    patchCategory: builder.mutation({
        query: ({ data, id }) => {
          const formData = new FormData();
          if (data.category_image) {
            formData.append("category_image", data.category_image);
          }
          formData.append("name", data.name); // Add other fields as needed
      
          return {
            url: `category/${id}`,
            method: "PATCH",
            body: formData,
            credentials: "include",
          };
        },
        invalidatesTags: ["Category"],
      }),
    deleteCart: builder.mutation({
        query: (id) => ({
          url: `cart/${id}`,
          method:'DELETE'
        })
      }),
  }),
})

export const { useGetAllCartItemQuery, usePatchCategoryMutation,useDeleteCartMutation } = cartApi