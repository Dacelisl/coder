import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopService = createApi({
  reducerPath: 'shopService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://codercommerce-3b298-default-rtdb.firebaseio.com/',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),
  }),
});
export const { useGetCategoriesQuery } = shopService;
