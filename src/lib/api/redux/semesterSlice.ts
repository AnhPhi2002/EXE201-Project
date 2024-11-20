import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Semester interface
export interface Semester {
  id: string;
  name: string;
  department: string;
}

// Define the state for the semester slice
export interface SemesterState {
  semesters: Semester[];
  loading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: SemesterState = {
  semesters: [],
  loading: false,
  error: null,
};

// API URL for semester operations
const API_URL = 'https://learnup.work/api/semesters';

// Async thunk to fetch all semesters
export const fetchSemesters = createAsyncThunk(
  'semesters/fetchSemesters',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching semesters:', error);
      return rejectWithValue('Error fetching semesters');
    }
  }
);

// Async thunk to create a new semester
export const createSemester = createAsyncThunk(
  'semesters/createSemester',
  async ({ name, departmentId }: { name: string; departmentId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/${departmentId}/semesters`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error creating semester:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Error creating semester');
    }
  }
);

// Async thunk to update an existing semester
export const updateSemester = createAsyncThunk(
  'semesters/updateSemester',
  async ({ id, name, departmentId }: { id: string; name: string; departmentId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/${id}`,
        { name, departmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating semester:', error);
      return rejectWithValue('Error updating semester');
    }
  }
);

// Async thunk to delete a semester
export const deleteSemester = createAsyncThunk(
  'semesters/deleteSemester',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      console.error('Error deleting semester:', error);
      return rejectWithValue('Error deleting semester');
    }
  }
);

// Create the slice
const semesterSlice = createSlice({
  name: 'semesters',
  initialState,
  reducers: {
    // You can define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchSemesters
      .addCase(fetchSemesters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSemesters.fulfilled, (state, action: PayloadAction<Semester[]>) => {
        state.loading = false;
        state.semesters = action.payload;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createSemester
      .addCase(createSemester.fulfilled, (state, action: PayloadAction<Semester>) => {
        state.semesters.push(action.payload);
      })
      .addCase(createSemester.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Handle updateSemester
      .addCase(updateSemester.fulfilled, (state, action: PayloadAction<Semester>) => {
        const index = state.semesters.findIndex((sem) => sem.id === action.payload.id);
        if (index !== -1) {
          state.semesters[index] = action.payload;
        }
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Handle deleteSemester
      .addCase(deleteSemester.fulfilled, (state, action: PayloadAction<string>) => {
        state.semesters = state.semesters.filter((sem) => sem.id !== action.payload);
      })
      .addCase(deleteSemester.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export the reducer
export default semesterSlice.reducer;
