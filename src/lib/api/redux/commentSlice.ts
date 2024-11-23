import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://learnup.work/api';

export interface CreateCommentData {
  postId: string;
  content: string;
  images: string[];
}

// Interfaces
export interface Comment {
  _id: string;
  postId: string;
  authorId: {
    _id: string;
    name: string;
    avatar? :string;
  };
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchCommentsByPostId = createAsyncThunk<Comment[], string, { rejectValue: string }>(
  'comments/fetchCommentsByPostId',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/comments/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch comments');
    }
  }
);

// Sửa lại addComment thunk
export const addComment = createAsyncThunk<Comment, CreateCommentData, { rejectValue: string }>(
  "comments/addComment",
  async (commentData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      // Log dữ liệu trước khi gửi
      console.log('Sending comment data:', commentData);

      const response = await axios.post(
        `${API_URL}/comments/posts/${commentData.postId}/comments`,
        {
          postId: commentData.postId,
          content: commentData.content,
          images: JSON.stringify(commentData.images), // Đảm bảo gửi JSON array
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      

      // Log response từ server
      console.log('Server response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error in addComment:', error);
      return rejectWithValue("Failed to add comment");
    }
  }
);


export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async ({ id, content }: { id: string; content: string }) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://learnup.work/api/comments/${id}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }
  );
  

export const deleteComment = createAsyncThunk<string, string, { rejectValue: string }>(
  'comments/deleteComment',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete comment');
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.unshift(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex((comment) => comment._id === action.payload._id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
        state.comments = state.comments.filter((comment) => comment._id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
