import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from '../types/types'; // Cập nhật đường dẫn tới UserProfile của bạn

// Thunk để lấy thông tin người dùng
export const fetchUserInfo = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch("https://learnup.work/api/auth/user-info", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch profile data");

      return await response.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch user information');
    }
  }
);

// Thunk để cập nhật thông tin người dùng
export const updateUserProfile = createAsyncThunk<
  void,
  UserProfile,
  { rejectValue: string }
>(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://learnup.work/api/auth/update/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error("Failed to update profile");
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  }
);

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user information';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update profile';
      });
  }
});

export const userReducer = userSlice.reducer;
