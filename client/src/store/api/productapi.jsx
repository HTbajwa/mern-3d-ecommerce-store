import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:8000/api/product",
      prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('ecomustoken'); // Retrieve the token from local storage
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getProductByCategory: builder.query({
        query: ({id,url}) => ({
          url: `product-by-category/${id}/?${url}`,
          method:'GET'
        })
      }),
      getSingleProduct: builder.query({
        query: (id) => ({
          url: `/product-detail/${id}`,
          method:'GET'
        })
      }),
      getProductBySearch: builder.query({
        query: (name) => {
          if (!name || name.trim().length === 0) {
            // Skip the request if search term is empty
            console.log("Search term is empty, skipping API call.");
            return { url: '', method: 'GET' }; // Returning an empty query to skip
          }
          return {
            url: `search/${name}`,
            method: 'GET',
          };
        },
        // Use skip if the search term is empty or contains only spaces
        skip: (args) => !args || args.trim().length === 0,
      }),
      // Other queries here...
    }),
  });
  
  export const {useGetProductByCategoryQuery,useGetSingleProductQuery,useGetProductBySearchQuery } = productApi
  