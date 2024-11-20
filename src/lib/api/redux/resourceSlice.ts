import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Resource and ResourceState interfaces
export interface Resource {
  id: string;
  title: string;
  description?: string;
  fileUrls?: string[];
  type?: 'pdf' | 'video' | 'document';
  allowedRoles?: ('member_free' | 'member_premium')[];
  subject: string;
}

export interface ResourceState {
  resources: Resource[];
  resource: Resource | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ResourceState = {
  resources: [],
  resource: null,
  loading: false,
  error: null,
};

const API_URL = 'https://learnup.work/api/resources';

// Async thunk to fetch all resources
export const fetchAllResources = createAsyncThunk(
  'resources/fetchAllResources',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/all-resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.resources;
    } catch (error) {
      console.error('Error fetching all resources:', error);
      return rejectWithValue('Error fetching all resources');
    }
  }
);

// Async thunk to fetch resources by subject ID
export const fetchResourcesBySubject = createAsyncThunk(
  'resources/fetchResourcesBySubject',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${subjectId}/resources?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.resources;
    } catch (error) {
      console.error('Error fetching resources by subject:', error);
      return rejectWithValue('Error fetching resources by subject');
    }
  }
);

// Async thunk to fetch a single resource by ID
export const fetchResourceById = createAsyncThunk(
  'resources/fetchResourceById',
  async (resourceId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${resourceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching resource by ID:', error);
      return rejectWithValue('Error fetching resource by ID');
    }
  }
);

// Async thunk to create a new resource
export const createResource = createAsyncThunk(
  'resources/createResource',
  async (
    { subjectId, resourceData }: { subjectId: string; resourceData: Omit<Resource, 'id'> },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/${subjectId}/resources`, resourceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating resource:', error);
      return rejectWithValue('Error creating resource');
    }
  }
);

// Async thunk to update an existing resource
export const updateResource = createAsyncThunk(
  'resources/updateResource',
  async ({ id, resourceData }: { id: string; resourceData: Partial<Resource> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/${id}`, resourceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating resource:', error);
      return rejectWithValue('Error updating resource');
    }
  }
);

// Async thunk to delete a resource
export const deleteResource = createAsyncThunk(
  'resources/deleteResource',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      console.error('Error deleting resource:', error);
      return rejectWithValue('Error deleting resource');
    }
  }
);

// Create the resource slice
const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all resources
      .addCase(fetchAllResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllResources.fulfilled, (state, action: PayloadAction<Resource[]>) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchAllResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch resources by subject
      .addCase(fetchResourcesBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourcesBySubject.fulfilled, (state, action: PayloadAction<Resource[]>) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchResourcesBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch a single resource by ID
      .addCase(fetchResourceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourceById.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.loading = false;
        state.resource = action.payload;
      })
      .addCase(fetchResourceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create a new resource
      .addCase(createResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.resources.push(action.payload);
      })
      .addCase(createResource.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update a resource
      .addCase(updateResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        const index = state.resources.findIndex((res) => res.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = action.payload;
        }
      })
      .addCase(updateResource.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete a resource
      .addCase(deleteResource.fulfilled, (state, action: PayloadAction<string>) => {
        state.resources = state.resources.filter((res) => res.id !== action.payload);
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export the reducer
export default resourceSlice.reducer;
