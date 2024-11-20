import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface cho Department
export interface Department {
  id: string;
  name: string;
  code: string;
}

// Interface cho trạng thái của slice
export interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
}

// Khởi tạo trạng thái ban đầu
const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

const API_URL = 'https://learnup.work/api/departments';

// Thunk để lấy danh sách phòng ban
export const fetchDepartments = createAsyncThunk(
  'departments/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching departments');
    }
  }
);

// Thunk để tạo phòng ban mới
export const createDepartment = createAsyncThunk(
  'departments/createDepartment',
  async ({ name, code }: { name: string; code: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        API_URL,
        { name, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error creating department');
    }
  }
);

// Thunk để cập nhật phòng ban
export const updateDepartment = createAsyncThunk(
  'departments/updateDepartment',
  async ({ id, name, code }: { id: string; name: string; code: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/${id}`,
        { name, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error updating department');
    }
  }
);

// Thunk để xóa phòng ban
export const deleteDepartment = createAsyncThunk(
  'departments/deleteDepartment',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error deleting department');
    }
  }
);

// Tạo slice
const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[]>) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        const index = state.departments.findIndex((dept) => dept.id === action.payload.id);
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteDepartment.fulfilled, (state, action: PayloadAction<string>) => {
        state.departments = state.departments.filter((dept) => dept.id !== action.payload);
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export reducer và action
export const { clearError } = departmentSlice.actions;
export default departmentSlice.reducer;
