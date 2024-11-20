import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserProfile, User, UserRole } from '../types/types';

// Export rõ ràng UserState
export interface UserState {
  profile: UserProfile | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  profile: null,
  users: [],
  loading: false,
  error: null,
};

const API_URL = 'https://learnup.work/api';

// Thunk to delete a user
export const deleteUser = createAsyncThunk<void, string, { rejectValue: string }>(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
      return rejectWithValue('Failed to delete user');
    }
  }
);

// Thunk to fetch user profile
export const fetchUserInfo = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/auth/user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      return rejectWithValue('Failed to fetch user information');
    }
  }
);

// Thunk to fetch all users
export const fetchAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return rejectWithValue('Failed to fetch users');
    }
  }
);

// Thunk to update user profile
export const updateUserProfile = createAsyncThunk<void, UserProfile, { rejectValue: string }>(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/auth/update/${userData._id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return rejectWithValue('Failed to update profile');
    }
  }
);

// Thunk to update user role
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
        `${API_URL}/admin/user/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { userId, role };
    } catch (error) {
      console.error('Failed to update user role:', error);
      return rejectWithValue('Failed to update user role');
    }
  }
);

// Thunk to update user permissions
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
        `${API_URL}/admin/user/${userId}`,
        { role: 'staff', permissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { userId, permissions };
    } catch (error) {
      console.error('Failed to update user permissions:', error);
      return rejectWithValue('Failed to update user permissions');
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user information';
      })
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      // Update user profile
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
      // Update user role
      .addCase(updateUserRole.fulfilled, (state, action: PayloadAction<{ userId: string; role: UserRole }>) => {
        const { userId, role } = action.payload;
        const user = state.users.find((u) => u._id === userId);
        if (user) {
          user.role = role;
        }
      })
      // Update user permissions
      .addCase(updateUserPermissions.fulfilled, (state, action: PayloadAction<{ userId: string; permissions: string[] }>) => {
        const { userId, permissions } = action.payload;
        const user = state.users.find((u) => u._id === userId);
        if (user) {
          user.permissions = permissions;
        }
      })
      // Delete a user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.meta.arg);
      });
  },
});

// Export rõ ràng reducer
export const userReducer = userSlice.reducer;
