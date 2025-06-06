import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopService = createApi({
  reducerPath: 'shopService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://codercommerce-3b298-default-rtdb.firebaseio.com/',
  }),
  tagTypes: ['Categories', 'Products', 'Orders'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'categories.json',
      providesTags: ['Categories'],
    }),

    getProducts: builder.query({
      query: () => 'products.json',
      providesTags: ['Products'],
    }),

    getOrders: builder.query({
      query: () => '/orders.json',
      transformResponse: (responseData) => {
        if (!responseData) return [];
        return Object.entries(responseData).map(([id, order]) => ({
          id,
          ...order,
        }));
      },
    }),

    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'orders.json',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}.json`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
} = shopService;
