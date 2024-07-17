import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const initialAuthState = {
  isAuth: false,
  userData: null,
};

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("persist:userData");
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return initialAuthState;
};

const authDataSlice = createSlice({
  name: "authData",
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.userData = action.payload.userData;
      console.log(state.userData);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "persist:userData",
          JSON.stringify({ isAuth: state.isAuth, userData: state.userData })
        );
      }
    },
    clearAuth: (state) => {
      state.isAuth = false;
      state.userData = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("persist:userData");
      }
      Cookies.remove("token");
    },
  },
});

export const { setAuth, clearAuth } = authDataSlice.actions;

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/common/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            const { token, ...userData } = data;
            Cookies.set("token", token, { expires: 7 });
            dispatch(setAuth({ isAuth: true, userData }));
          }
        } catch (error) {
          console.log("Login failed", error);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/user/auth/signup",
        method: "POST",
        body: user,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            localStorage.setItem("userDetails", JSON.stringify(userData)); // Store user details in localStorage
            dispatch(setAuth({ isAuth: true, userData }));
          }
        } catch (error) {
          console.log("Registration failed", error);
        }
      },
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/user/auth/verify-otp',
        method: 'POST',
        body: { email, otp },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
  }),
})
})
export const { useLoginMutation, useRegisterUserMutation,useVerifyOtpMutation  } = authSlice;

export const logout = () => (dispatch) => {
  dispatch(clearAuth());
};

export const selectIsAuth = (state) => state.authData.isAuth;
export const selectUserData = (state) => state.authData.userData;

export default authDataSlice.reducer;
