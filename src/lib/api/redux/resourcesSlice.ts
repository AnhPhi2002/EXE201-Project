import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho subject
interface Subject {
  _id: string;
  name: string;
  semester: string;
  resources: Resource[];
}

interface Resource {
  _id: string;
  title: string;
  description: string;
  fileUrls: string[];
  type: string;
  allowedRoles: string[];
}

interface ResourcesState {
  resources: Resource[];
  subject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResourcesState = {
  resources: [],
  subject: null, // Thêm subject vào state
  loading: false,
  error: null,
};

// Thunk để fetch resources dựa vào subjectId
export const fetchResourcesBySubject = createAsyncThunk(
  'resources/fetchResourcesBySubject',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Token is missing');
      }

      const response = await axios.get(`http://localhost:8080/api/resources/${subjectId}/resources?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Failed to load resources');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Thunk để fetch thông tin môn học dựa vào subjectId
export const fetchSubjectById = createAsyncThunk(
  'resources/fetchSubjectById',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Token is missing');
      }

      const response = await axios.get(`http://localhost:8080/api/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Failed to load subject');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourcesBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourcesBySubject.fulfilled, (state, action: PayloadAction<{ resources: Resource[] }>) => {
        state.loading = false;
        state.resources = action.payload.resources;
      })
      .addCase(fetchResourcesBySubject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Xử lý việc fetch subject
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.subject = action.payload; // Cập nhật subject vào state
      })
      .addCase(fetchSubjectById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resourcesSlice.reducer;
