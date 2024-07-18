import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl:  process.env.NEXT_PUBLIC_BASE_URL}),
  endpoints: (builder) => ({
    forgetPassword: builder.mutation({
      query: (email) => ({
        
        url: 'user/auth/forget-password',
        method: 'POST',
        body:  email ,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `user/auth/forget-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const { useForgetPasswordMutation, useResetPasswordMutation } = authApi;
