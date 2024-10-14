import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Lấy token từ localStorage (hoặc Redux store)
const token = localStorage.getItem('token'); // Kiểm tra cách bạn lưu trữ token

// API base URL
const API_URL = 'http://localhost:8080/api';

// Interface cho các đối tượng dữ liệu
export interface Department {
  _id: string;
  name: string;
  code: string;
}

export interface Semester {
  _id: string;
  name: string;
  subjects: string[];
}

export interface Subject {
  _id: string;
  name: string;
}

export interface Resource {
  _id: string;
  title: string;
  description: string;
  fileUrls: string[];
  type: string;
}

// Khai báo kiểu dữ liệu cho state
export interface DepartmentState {  // <-- Chú ý phần export
  departments: Department[];
  semesters: { [key: string]: Semester[] };
  subjects: { [key: string]: Subject[] };
  resources: { [key: string]: Resource[] };
  loading: boolean;
  error: string | null;
}

// Trạng thái khởi tạo
const initialState: DepartmentState = {
  departments: [],
  semesters: {},
  subjects: {},
  resources: {},
  loading: false,
  error: null,
};

// Thiết lập instance của axios với headers bao gồm Authorization
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',  // Thêm token vào header
    },
  });

// Async thunk để lấy danh sách ngành học
export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
    const response = await axiosInstance.get('/departments');  // Sử dụng axiosInstance
    return response.data;
  });
  
  // Async thunk để lấy danh sách học kỳ theo ngành học
  export const fetchSemesters = createAsyncThunk(
    'departments/fetchSemesters',
    async (departmentId: string) => {
      const response = await axiosInstance.get(`/semesters/${departmentId}`);  // Sử dụng axiosInstance
      return { departmentId, semesters: response.data };
    }
  );
  
  // Async thunk để lấy danh sách môn học theo học kỳ
  export const fetchSubjects = createAsyncThunk(
    'departments/fetchSubjects',
    async (semesterId: string) => {
      const response = await axiosInstance.get(`/subjects/${semesterId}`);  // Sử dụng axiosInstance
      return { semesterId, subjects: response.data };
    }
  );
  
  // Async thunk để lấy danh sách tài liệu cho môn học
  export const fetchResources = createAsyncThunk(
    'departments/fetchResources',
    async ({ subjectId, page = 1, limit = 10 }: { subjectId: string; page?: number; limit?: number }) => {
      const response = await axiosInstance.get(`/resources/${subjectId}/resources`, {
        params: { page, limit },
      });
      return { subjectId, resources: response.data };
    }
  );

// Tạo slice
const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch departments';
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        const { departmentId, semesters } = action.payload;
        state.semesters[departmentId] = semesters; // Sử dụng id ngành học để lưu học kỳ
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        const { semesterId, subjects } = action.payload;
        state.subjects[semesterId] = subjects; // Sử dụng id học kỳ để lưu môn học
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        const { subjectId, resources } = action.payload;
        state.resources[subjectId] = resources; // Sử dụng id môn học để lưu tài liệu
      });
  },
});

export default departmentSlice.reducer;
