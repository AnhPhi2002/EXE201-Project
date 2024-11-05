import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axios-client';

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

// Fetch tất cả tài liệu
export const fetchAllResources = createAsyncThunk(
  'resources/fetchAllResources',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/api/resources/all-resources');
      return response.data.resources;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy tất cả tài liệu');
    }
  }
);

// Fetch tài liệu theo subject ID
export const fetchResourcesBySubject = createAsyncThunk(
  'resources/fetchResourcesBySubject',
  async (subjectId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/resources/${subjectId}/resources?page=1&limit=10`);
      return response.data.resources;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy tài liệu theo môn học');
    }
  }
);

// Fetch một tài liệu bằng ID
export const fetchResourceById = createAsyncThunk(
  'resources/fetchResourceById',
  async (resourceId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/resources/${resourceId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy tài liệu');
    }
  }
);

// Tạo mới tài liệu
export const createResource = createAsyncThunk(
  'resources/createResource',
  async ({ subjectId, resourceData }: { subjectId: string; resourceData: Omit<Resource, 'id'> }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/api/resources/${subjectId}/resources`, resourceData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo tài liệu');
    }
  }
);

// Cập nhật tài liệu
export const updateResource = createAsyncThunk(
  'resources/updateResource',
  async ({ id, resourceData }: { id: string; resourceData: Partial<Resource> }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/resources/${id}`, resourceData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật tài liệu');
    }
  }
);

// Xóa tài liệu
export const deleteResource = createAsyncThunk(
  'resources/deleteResource',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/resources/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa tài liệu');
    }
  }
);

const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tất cả tài liệu
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

      // Fetch tài liệu theo subject ID
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

      // Fetch một tài liệu bằng ID
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

      // Tạo mới tài liệu
      .addCase(createResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.loading = false;
        state.resources.push(action.payload);
      })
      .addCase(createResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Cập nhật tài liệu
      .addCase(updateResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.loading = false;
        const index = state.resources.findIndex((res) => res.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = action.payload;
        }
      })
      .addCase(updateResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xóa tài liệu
      .addCase(deleteResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResource.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.resources = state.resources.filter((res) => res.id !== action.payload);
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resourceSlice.reducer;
