import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Resource {
  id: string;
  title: string;
  description?: string;
  fileUrls?: string[];
  type?: 'pdf' | 'video' | 'document';
  allowedRoles?: ('member_free' | 'member_premium')[];
  subject: string;
}

interface ResourceState {
  resources: Resource[];
  resource: Resource | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResourceState = {
  resources: [],
  resource: null,
  loading: false,
  error: null,
};

const API_URL = 'http://localhost:8080/api/resources';

// Fetch all resources
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
      return rejectWithValue('Error fetching all resources');
    }
  }
);

// Fetch resources by subject ID
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
      return rejectWithValue('Error fetching resources by subject');
    }
  }
);

// Fetch a single resource by ID
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
      return rejectWithValue('Error fetching resource by ID');
    }
  }
);

// Create a new resource
export const createResource = createAsyncThunk(
  'resources/createResource',
  async ({ subjectId, resourceData }: { subjectId: string; resourceData: Omit<Resource, 'id'> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/${subjectId}/resources`, resourceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error creating resource');
    }
  }
);

// Update an existing resource
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
      return rejectWithValue('Error updating resource');
    }
  }
);

// Delete a resource
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
      return rejectWithValue('Error deleting resource');
    }
  }
);

const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(createResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.resources.push(action.payload);
      })
      .addCase(createResource.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        const index = state.resources.findIndex((res) => res.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = action.payload;
        }
      })
      .addCase(updateResource.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteResource.fulfilled, (state, action: PayloadAction<string>) => {
        state.resources = state.resources.filter((res) => res.id !== action.payload);
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default resourceSlice.reducer;
