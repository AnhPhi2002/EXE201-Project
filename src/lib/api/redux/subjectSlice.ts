import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Subject {
  id: string;
  name: string;
  semester: string;
  description: string; // Thêm trường description
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

const API_URL = 'https://learnup.work/api';

// Fetch all subjects or by semester ID
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (semesterId: string | null, { rejectWithValue }) => {
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
      return rejectWithValue('Error fetching subjects');
    }
  }
);

// Fetch subject by ID
export const fetchSubjectById = createAsyncThunk(
  'subjects/fetchSubjectById',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/subjects/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching subject by ID');
    }
  }
);

// Create a new subject
export const createSubject = createAsyncThunk(
  'subjects/createSubject',
  async ({ name, semester, description }: { name: string; semester: string; description: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/subjects/${semester}/subjects`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating subject:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Error creating subject');
    }
  }
);

// Update an existing subject
export const updateSubject = createAsyncThunk(
  'subjects/updateSubject',
  async ({ id, name, semester, description }: { id: string; name: string; semester: string; description: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/subjects/${id}`,
        { name, semester, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating subject:", error);
      return rejectWithValue('Error updating subject');
    }
  }
);


// Delete a subject
export const deleteSubject = createAsyncThunk(
  'subjects/deleteSubject',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue('Error deleting subject');
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
        state.error = null;
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
