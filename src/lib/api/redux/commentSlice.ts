import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://learnup.work/api';
export interface Author {
  _id: string;
  name: string;
  avatar: string;
}

export interface CreateCommentData {
  postId: string;
  content: string;
  images: string[];
}

export interface ReplyCommentData {
  postId: string;
  parentCommentId: string;
  content: string;
  images: string[];
}

export interface Comment {
  _id: string;
  postId: string;
  authorId: Author; // Đảm bảo `authorId` có đầy đủ thông tin
  content: string;
  images?: string[];
  parentCommentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentState {
  comments: Comment[];
  authors: Record<string, Author>; // Lưu cache author
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  authors: {},
  loading: false,
  error: null,
};

// Interfaces


// Fetch comments and author details
export const fetchCommentsByPostId = createAsyncThunk<Comment[], string, { rejectValue: string }>(
  'comments/fetchCommentsByPostId',
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}/comments/posts/${postId}/comments`);
      const comments = response.data;

      // Fetch all unique authors in parallel
      const uniqueAuthorIds = Array.from(new Set(comments.map((comment: Comment) => comment.authorId._id)));
      await Promise.all(
        uniqueAuthorIds.map(async (authorId) => {
          const authorResponse = await axios.get(`${API_URL}/auth/user/${authorId}`);
          dispatch(addAuthorToCache(authorResponse.data.user)); // Cập nhật Redux với thông tin author
        })
      );

      return comments;
    } catch (error) {
      return rejectWithValue('Failed to fetch comments');
    }
  }
);

export const addAuthorToCache = createAsyncThunk<Author, Author>('comments/addAuthorToCache', async (author) => author);
export const addComment = createAsyncThunk<Comment, CreateCommentData, { rejectValue: string; state: any }>(
  'comments/addComment',
  async (commentData, { rejectWithValue, getState }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/comments/posts/${commentData.postId}/comments`,
        commentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add author details from the current user profile
      const state = getState() as { user: { profile: { _id: string; name: string; avatar?: string } } };
      const currentUser = state.user.profile;

      const commentWithAuthor = {
        ...response.data,
        authorId: {
          _id: currentUser._id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
      };

      return commentWithAuthor;
    } catch (error) {
      return rejectWithValue('Failed to add comment');
    }
  }
);

export const replyToComment = createAsyncThunk<Comment, ReplyCommentData, { rejectValue: string; state: any }>(
  'comments/replyToComment',
  async ({ postId, parentCommentId, content, images }, { rejectWithValue, getState }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/comments/posts/${postId}/comments/${parentCommentId}/reply`,
        { content, images },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add author details from the current user profile
      const state = getState() as { user: { profile: { _id: string; name: string; avatar?: string } } };
      const currentUser = state.user.profile;

      const replyWithAuthor = {
        ...response.data,
        authorId: {
          _id: currentUser._id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
      };

      return replyWithAuthor;
    } catch (error) {
      return rejectWithValue('Failed to reply to comment');
    }
  }
);

export const updateComment = createAsyncThunk<Comment, { id: string; content: string }, { rejectValue: string }>(
  'comments/updateComment',
  async ({ id, content }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `${API_URL}/comments/${id}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update comment');
    }
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
    .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.loading = false;
    })
    .addCase(fetchCommentsByPostId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch comments';
    })
    .addCase(addAuthorToCache.fulfilled, (state, action: PayloadAction<Author>) => {
      state.authors[action.payload._id] = action.payload;
    })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.unshift(action.payload);
      })
      .addCase(replyToComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
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
