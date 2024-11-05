import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';

interface Department {
  id: string;
  name: string;
  code: string;
}

interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

// Lấy danh sách các phòng ban
export const fetchDepartments = createAsyncThunk(
  'departments/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/api/departments');
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi lấy danh sách phòng ban');
    }
  }
);

// Tạo mới phòng ban
export const createDepartment = createAsyncThunk(
  'departments/createDepartment',
  async ({ name, code }: { name: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/api/departments', { name, code });
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi tạo phòng ban');
    }
  }
);

// Cập nhật phòng ban
export const updateDepartment = createAsyncThunk(
  'departments/updateDepartment',
  async ({ id, name, code }: { id: string; name: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/departments/${id}`, { name, code });
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi cập nhật phòng ban');
    }
  }
);

// Xóa phòng ban
export const deleteDepartment = createAsyncThunk(
  'departments/deleteDepartment',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/departments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Lỗi khi xóa phòng ban');
    }
  }
);

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
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
      .addCase(updateDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        const index = state.departments.findIndex(dept => dept.id === action.payload.id);
        if (index !== -1) state.departments[index] = action.payload;
      })
      .addCase(deleteDepartment.fulfilled, (state, action: PayloadAction<string>) => {
        state.departments = state.departments.filter(dept => dept.id !== action.payload);
      });
  },
});

export default departmentSlice.reducer;
