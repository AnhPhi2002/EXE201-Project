import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

const API_URL = 'http://localhost:8080/api/semesters';

export const fetchSemesters = createAsyncThunk(
  'semesters/fetchSemesters',
  async (departmentId: string | null = null, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const url = departmentId 
        ? `${API_URL}?department=${departmentId}` 
        : API_URL;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching semesters');
    }
  }
);

export const createSemester = createAsyncThunk(
  'semesters/createSemester',
  async ({ name, departmentId }: { name: string; departmentId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await axios.post(
        `${API_URL}/${departmentId}/semesters`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Error creating semester:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Error creating semester');
    }
  }
);

export const updateSemester = createAsyncThunk(
  'semesters/updateSemester',
  async ({ id, name, departmentId }: { id: string; name: string; departmentId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/${id}`,
        { name, departmentId },  // Gửi departmentId thay vì department
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error updating semester');
    }
  }
);

export const deleteSemester = createAsyncThunk('semesters/deleteSemester', async (id: string, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return rejectWithValue('Error deleting semester');
  }
});

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
      .addCase(createSemester.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateSemester.fulfilled, (state, action: PayloadAction<Semester>) => {
        const index = state.semesters.findIndex(sem => sem.id === action.payload.id);
        if (index !== -1) {
          state.semesters[index] = action.payload;
        }
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteSemester.fulfilled, (state, action: PayloadAction<string>) => {
        state.semesters = state.semesters.filter(sem => sem.id !== action.payload);
      })
      .addCase(deleteSemester.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default semesterSlice.reducer;
