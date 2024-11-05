import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';

interface Subject {
  id: string;
  name: string;
  semester: string;
  resources: any[];
}

interface SubjectState {
  subjects: Subject[];
  subject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  subject: null,
  loading: false,
  error: null,
};

// Lấy danh sách môn học
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (semesterId: string | null = null, { rejectWithValue }) => {
    try {
      const url = semesterId ? `/api/subjects?semester=${semesterId}` : '/api/subjects';
      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi lấy danh sách môn học');
    }
  }
);

// Lấy chi tiết môn học bằng ID
export const fetchSubjectById = createAsyncThunk(
  'subjects/fetchSubjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/subjects/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi lấy chi tiết môn học');
    }
  }
);

export const createSubject = createAsyncThunk(
  'subjects/createSubject',
  async ({ name, semester }: { name: string; semester: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/api/subjects`, { name, semester });
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi tạo môn học');
    }
  }
);

export const updateSubject = createAsyncThunk(
  'subjects/updateSubject',
  async ({ id, name, semester }: { id: string; name: string; semester: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/subjects/${id}`, { name, semester });
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi cập nhật môn học');
    }
  }
);

export const deleteSubject = createAsyncThunk(
  'subjects/deleteSubject',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/subjects/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Lỗi khi xóa môn học');
    }
  }
);

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.subjects.push(action.payload);
      })
      .addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        const index = state.subjects.findIndex(sub => sub.id === action.payload.id);
        if (index !== -1) state.subjects[index] = action.payload;
      })
      .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<string>) => {
        state.subjects = state.subjects.filter(sub => sub.id !== action.payload);
      });
  },
});

export default subjectSlice.reducer;
