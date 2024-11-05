import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';

interface Semester {
  id: string;
  name: string;
  department: string;
}

interface SemesterState {
  semesters: Semester[];
  loading: boolean;
  error: string | null;
}

const initialState: SemesterState = {
  semesters: [],
  loading: false,
  error: null,
};

// Lấy danh sách kỳ học, có thể lấy theo `departmentId` nếu cần
export const fetchSemesters = createAsyncThunk(
  'semesters/fetchSemesters',
  async (departmentId: string | null = null, { rejectWithValue }) => {
    try {
      const url = departmentId ? `/api/semesters?department=${departmentId}` : '/api/semesters';
      const response = await axiosClient.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi lấy danh sách kỳ học');
    }
  }
);

export const createSemester = createAsyncThunk(
  'semesters/createSemester',
  async ({ name, departmentId }: { name: string; departmentId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/api/semesters`, { name, departmentId });
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi tạo kỳ học');
    }
  }
);

export const updateSemester = createAsyncThunk(
  'semesters/updateSemester',
  async ({ id, name, departmentId }: { id: string; name: string; departmentId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/semesters/${id}`, { name, departmentId });
      return response.data;
    } catch (error) {
      return rejectWithValue('Lỗi khi cập nhật kỳ học');
    }
  }
);

export const deleteSemester = createAsyncThunk(
  'semesters/deleteSemester',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/semesters/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Lỗi khi xóa kỳ học');
    }
  }
);

const semesterSlice = createSlice({
  name: 'semesters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSemesters.fulfilled, (state, action: PayloadAction<Semester[]>) => {
        state.loading = false;
        state.semesters = action.payload;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSemester.fulfilled, (state, action: PayloadAction<Semester>) => {
        state.semesters.push(action.payload);
      })
      .addCase(updateSemester.fulfilled, (state, action: PayloadAction<Semester>) => {
        const index = state.semesters.findIndex(sem => sem.id === action.payload.id);
        if (index !== -1) state.semesters[index] = action.payload;
      })
      .addCase(deleteSemester.fulfilled, (state, action: PayloadAction<string>) => {
        state.semesters = state.semesters.filter(sem => sem.id !== action.payload);
      });
  },
});

export default semesterSlice.reducer;
