import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

export const VendorAPI = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVendorDetails: builder.query({
      query: () => "/admin/vendor/vendors-details",
    }),
    updateVendor: builder.mutation({
      query: ({ vendorID, data }) => ({
        url: `/admin/vendor/verify-vendor/${vendorID}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetVendorDetailsQuery, useVerifyVendorMutation, useUpdateVendorMutation } = VendorAPI;
