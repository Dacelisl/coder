import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authServiceRTK = createApi({
  reducerPath: 'authServiceRTK',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/',
  }),
  endpoints: (builder) => ({
    singup: builder.mutation({
      query: (auth) => ({
        url: 'accounts:signUp?key=AIzaSyDoE4djLxsUItvW6W2-Qm47vVJD7DEifcA',
        method: 'POST',
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: (auth) => ({
        url: 'accounts:signInWithPassword?key=AIzaSyDoE4djLxsUItvW6W2-Qm47vVJD7DEifcA',
        method: 'POST',
        body: auth,
      }),
    }),
  }),
});

export const { useLoginMutation, useSingupMutation } = authServiceRTK;
