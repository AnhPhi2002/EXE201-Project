import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Subject {
  id: string;
  name: string;
  semester: string;  // Thay đổi từ semesterId sang semester để khớp với API
  resources: any[];
}

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

const API_URL = 'http://localhost:8080/api';

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/subjects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue('Error fetching subjects');
  }
});

export const createSubject = createAsyncThunk(
  'subjects/createSubject',
  async ({ name, semesterId }: { name: string; semesterId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }

      // Đảm bảo URL bao gồm `semesterId` trong đường dẫn
      const response = await axios.post(
        `${API_URL}/subjects/${semesterId}/subjects`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating subject:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Error creating subject');
    }
  }
);



export const updateSubject = createAsyncThunk(
  'subjects/updateSubject',
  async ({ id, name, semester }: { id: string; name: string; semester: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/subjects/${id}`,  // Đảm bảo URL đúng
        { name, semester },  // Sử dụng "semester" thay vì "semesterId"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating subject:", error);
      return rejectWithValue('Error updating subject');
    }
  }
);


// Xóa môn học
export const deleteSubject = createAsyncThunk('subjects/deleteSubject', async (id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/subjects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return rejectWithValue('Error deleting subject');
  }
});

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
      .addCase(createSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.subjects.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        const index = state.subjects.findIndex((sub) => sub.id === action.payload.id);
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<string>) => {
        state.subjects = state.subjects.filter((sub) => sub.id !== action.payload);
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default subjectSlice.reducer;
