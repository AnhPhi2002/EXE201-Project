import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa interface Subject
export interface Subject {
  id: string;
  name: string;
  semester: string;
  description: string;
  resources: any[];
}

// Export rõ ràng SubjectState
export interface SubjectState {
  subjects: Subject[];
  subject: Subject | null;
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: SubjectState = {
  subjects: [],
  subject: null,
  loading: false,
  error: null,
};

const API_URL = 'https://learnup.work/api';

// Thunk lấy danh sách tất cả các subject hoặc theo semester ID
export const fetchSubjects = createAsyncThunk<Subject[], string | null, { rejectValue: string }>(
  'subjects/fetchSubjects',
  async (semesterId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const url = semesterId
        ? `${API_URL}/subjects?semester=${semesterId}`
        : `${API_URL}/subjects`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return rejectWithValue('Error fetching subjects');
    }
  }
);

// Thunk lấy thông tin một subject theo ID
export const fetchSubjectById = createAsyncThunk<Subject, string, { rejectValue: string }>(
  'subjects/fetchSubjectById',
  async (subjectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching subject by ID:', error);
      return rejectWithValue('Error fetching subject by ID');
    }
  }
);

// Thunk thêm mới một subject
export const createSubject = createAsyncThunk<Subject, { name: string; semester: string; description: string }, { rejectValue: string }>(
  'subjects/createSubject',
  async ({ name, semester, description }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/subjects/${semester}/subjects`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error creating subject:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Error creating subject');
    }
  }
);

// Thunk cập nhật thông tin một subject
export const updateSubject = createAsyncThunk<Subject, { id: string; name: string; semester: string; description: string }, { rejectValue: string }>(
  'subjects/updateSubject',
  async ({ id, name, semester, description }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/subjects/${id}`,
        { name, semester, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating subject:', error);
      return rejectWithValue('Error updating subject');
    }
  }
);

// Thunk xóa một subject
export const deleteSubject = createAsyncThunk<string, string, { rejectValue: string }>(
  'subjects/deleteSubject',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      console.error('Error deleting subject:', error);
      return rejectWithValue('Error deleting subject');
    }
  }
);

// Tạo subject slice
const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      // Fetch subject by ID
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      // Create subject
      .addCase(createSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.subjects.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.error = action.payload || null;
      })
      // Update subject
      .addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        const index = state.subjects.findIndex((sub) => sub.id === action.payload.id);
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.error = action.payload || null;
      })
      // Delete subject
      .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<string>) => {
        state.subjects = state.subjects.filter((sub) => sub.id !== action.payload);
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.error = action.payload || null;
      });
  },
});

// Export reducer
export default subjectSlice.reducer;
