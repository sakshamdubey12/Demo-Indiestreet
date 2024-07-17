import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const getToken = () => {
  const token = Cookies.get("token");
  if (token) {
    const decode = jwt.decode(token);
    return { token, userId: decode.userId };
  } else {
    return { token: null, userId: null };
  }
};

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const { token } = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: `/user/address/get-address`,
        method: "GET",
      }),
    }),
    addAddress: builder.mutation({
      query: (addressData) => {
        const { userId } = getToken();
        return {
          url: `/user/address/add-address`,
          method: "POST",
          body: {
            address:addressData.address,
            pincode:addressData.pincode,
            city:addressData.city,
            state:addressData.state,
            addressType:addressData.type
          },
        };
      },
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/user/address/delete-address/${addressId}`,
        method: "DELETE",
      }),
    }),
    setPrimaryAddress: builder.mutation({
      query: (addressId) => ({
        url: `/user/address/set-primary-address/${addressId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useSetPrimaryAddressMutation,
} = addressApi;
