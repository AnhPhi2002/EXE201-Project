import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface cho state chính của Auth
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Interface cho error từ API
interface ErrorResponse {
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Action login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      return response.data;  
    } catch (error: any) {
      // Trả về lỗi dưới dạng object ErrorResponse
      return rejectWithValue(error.response?.data as ErrorResponse);
    }
  }
);

// Action đăng ký người dùng
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { email: string; name: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userData);
      return response.data; // Trả về dữ liệu từ API khi đăng ký thành công
    } catch (error: any) {
      // Trả về message từ API hoặc chuỗi lỗi mặc định
      return rejectWithValue(error.response?.data?.message || 'Đã xảy ra lỗi');
    }
  }
);

// Tạo slice cho Auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Xử lý logout
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('token');  // Xóa token khỏi localStorage khi người dùng logout
      localStorage.removeItem('role');  // Xóa role khỏi localStorage khi người dùng logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;  
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        // Lưu token và role vào localStorage
        const token = action.payload.token;
        const userRole = action.payload.role; // Lấy role từ phản hồi API
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole); // Lưu role vào localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // Gán thông báo lỗi từ action.payload (kiểu là ErrorResponse)
        state.error = (action.payload as ErrorResponse)?.message || 'Login failed';
      })

      // Xử lý đăng ký
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;  // Reset lỗi khi bắt đầu đăng ký
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // Gán thông báo lỗi từ action.payload (kiểu là string hoặc message từ ErrorResponse)
        state.error = (action.payload as ErrorResponse)?.message || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;
export type { AuthState };
export default authSlice.reducer;
