// src/redux/features/userSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserProfile, User, UserRole } from '../types/types';

interface UserState {
  profile: UserProfile | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  users: [],
  loading: false,
  error: null,
};

// Thunk để xóa người dùng
export const deleteUser = createAsyncThunk<void, string, { rejectValue: string }>(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://learnup.work/api/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue('Failed to delete user');
    }
  }
);

// Fetch user profile info
export const fetchUserInfo = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get("https://learnup.work/api/auth/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch user information');
    }
  }
);

// Fetch all users for dashboard
export const fetchAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://learnup.work/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.users;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

// Thunk to update user profile
export const updateUserProfile = createAsyncThunk<
  void,
  UserProfile,
  { rejectValue: string }
>(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://learnup.work/api/auth/update/${userData._id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  }
);

// Update user role
export const updateUserRole = createAsyncThunk<
  { userId: string; role: UserRole },
  { userId: string; role: UserRole },
  { rejectValue: string }
>(
  'user/updateRole',
  async ({ userId, role }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `https://learnup.work/api/admin/user/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { userId, role };
    } catch (error) {
      return rejectWithValue('Failed to update user role');
    }
  }
);

// Update user permissions
export const updateUserPermissions = createAsyncThunk<
  { userId: string; permissions: string[] },
  { userId: string; permissions: string[] },
  { rejectValue: string }
>(
  'user/updatePermissions',
  async ({ userId, permissions }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `https://learnup.work/api/admin/user/${userId}`,
        { role: 'staff', permissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { userId, permissions };
    } catch (error) {
      return rejectWithValue('Failed to update user permissions');
    }
  }
);

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
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
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
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { userId, role } = action.payload;
        const user = state.users.find(u => u._id === userId);
        if (user) {
          user.role = role;
        }
      })
      .addCase(updateUserPermissions.fulfilled, (state, action) => {
        const { userId, permissions } = action.payload;
        const user = state.users.find(u => u._id === userId);
        if (user) {
          user.permissions = permissions;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.meta.arg);
      });
  }
});

export const userReducer = userSlice.reducer;
