import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PaymentState } from '../types/types';

const apiClient = axios.create({
  baseURL: 'https://learnup.work/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fix: createPayment không cần tham số
export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/payment/upgrade');
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue('Payment creation failed');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Payment creation failed');
    }
  }
);

const initialState: PaymentState = {
  loading: false,
  error: null,
  checkoutUrl: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.checkoutUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload.checkoutUrl;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;