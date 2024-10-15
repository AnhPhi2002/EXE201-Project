// departmentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/departments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message || 'Something went wrong');
  }
});

export const fetchSemesters = createAsyncThunk('departments/fetchSemesters', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/semesters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message || 'Something went wrong');
  }
});

// Thêm Thunk để lấy danh sách môn học dựa vào `semesterId`
export const fetchSubjects = createAsyncThunk('departments/fetchSubjects', async (semesterId: string, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/subjects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        semester: semesterId,  // Lọc theo semesterId
      },
    });
    return response.data;  // Trả về danh sách môn học
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message || 'Something went wrong');
  }
});

type DepartmentState = {
  departments: any[];
  semesters: any[];
  subjects: any[];
  loading: boolean;
  error: string | null;
};

const initialState: DepartmentState = {
  departments: [],
  semesters: [],
  subjects: [],  // Thêm subjects vào state
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.semesters = action.payload;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;  // Cập nhật subjects khi lấy được dữ liệu
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default departmentSlice.reducer;
