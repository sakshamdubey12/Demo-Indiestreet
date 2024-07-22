import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth/verify-otp`, verificationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/common/login`, loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    otpVerificationLoading: false,
    otpVerificationError: null,
    otpVerificationSuccess: null,
    user: {
      token: null,
      phoneNumber: null,
      email: null,
      role: null,
      isAuth: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('email', action.payload.email);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.otpVerificationLoading = true;
        state.otpVerificationError = null;
        state.otpVerificationSuccess = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.otpVerificationLoading = false;
        state.otpVerificationSuccess = action.payload.message;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otpVerificationLoading = false;
        state.otpVerificationError = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, phoneNumber, email, role } = action.payload;
        console.log(action.payload);
        state.user = {
          token,
          phoneNumber,
          email,
          role,
          isAuth: true,
        };
        localStorage.setItem('user', JSON.stringify(state.user));
        Cookies.set('token', token, { expires: 7 });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
