import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'https://learnup.work/api';
const API_URL = 'http://localhost:8080/api';

// Interfaces
export interface Author {
  _id: string;
  name: string;
  avatar: string;
}

export interface CreateCommentData {
  subjectId: string;
  content: string;
  images: string[];
}

export interface ReplyCommentData {
  subjectId: string;
  parentCommentId: string;
  content: string;
  images: string[];
}

export interface Comment {
  _id: string;
  subjectId: string;
  authorId: {
    _id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  parentCommentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentState {
  comments: Comment[];
  authors: Record<string, Author>; // Cache for authors
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  authors: {},
  loading: false,
  error: null,
};

// Thunks
export const fetchAuthorById = createAsyncThunk('posts/fetchAuthorById', async (authorId: string) => {
  const response = await fetch(`${API_URL}/auth/user/${authorId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch author data. Status: ${response.status}`);
  }
  const authorData = await response.json();
  return {
    _id: authorData.user._id,
    name: authorData.user.name,
    avatar: authorData.user.avatar || 'https://via.placeholder.com/50',
  };
});

export const fetchCommentsBySubjectId = createAsyncThunk<Comment[], string, { rejectValue: string }>(
  'comments/fetchCommentsBySubjectId',
  async (subjectId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}/comments/subjects/${subjectId}/comments`);
      console.log('API Response:', response.data);  // Kiểm tra dữ liệu trả về từ API
      const comments = response.data;

      const uniqueAuthorIds = Array.from(new Set(comments.map((comment: Comment) => comment.authorId._id)));
      await Promise.all(
        uniqueAuthorIds.map(async (authorId) => {
          const authorResponse = await axios.get(`${API_URL}/auth/user/${authorId}`);
          dispatch(addAuthorToCache(authorResponse.data.user));
        })
      );

      return comments;
    } catch (error) {
      console.error('Fetch Comments Error:', error);
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
        `${API_URL}/comments/subjects/${commentData.subjectId}/comments`,
        commentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
  async ({ subjectId, parentCommentId, content, images }, { rejectWithValue, getState }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/comments/subjects/${subjectId}/comments/${parentCommentId}/replies`,
        { content, images },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    .addCase(fetchCommentsBySubjectId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
      console.log('Fetched Comments:', action.payload);  // Kiểm tra dữ liệu đã được lưu vào store chưa
      state.comments = action.payload;
      const newAuthors = action.payload.reduce((acc, comment) => {
        if (!state.authors[comment.authorId._id]) {
          acc[comment.authorId._id] = comment.authorId;
        }
        return acc;
      }, {} as Record<string, Author>);
      state.authors = { ...state.authors, ...newAuthors }; // Cache authors
    })
    
      .addCase(fetchCommentsBySubjectId.rejected, (state, action) => {
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
      })
      .addCase(fetchAuthorById.fulfilled, (state, action: PayloadAction<Author>) => {
        state.authors[action.payload._id] = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch author data';
      });
  },
});

export default commentSlice.reducer;