import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa kiểu AuthState
export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: {
    name: string | null;
    email: string | null;
    role: string | null;
  };
}

// Trạng thái ban đầu
const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  loading: false,
  error: null,
  user: {
    name: localStorage.getItem('name'),
    email: null,
    role: localStorage.getItem('role'),
  },
};

// URL API cơ bản
const API_URL = 'https://learnup.work/api/auth';

// Async Thunk để đăng nhập
export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, name, role } = response.data;

    // Lưu thông tin vào localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);

    return { name, role };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Async Thunk để đăng ký
export const registerUser = createAsyncThunk('auth/registerUser', async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// Slice quản lý Auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { name: null, email: null, role: null };
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ name: string; role: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = { ...state.user, name: action.payload.name, role: action.payload.role };
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
