import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, Author } from '../types/types';

// Define the state type for posts
export interface PostState {
  posts: Post[];
  authors: Record<string, Author>;
  currentPost: Post | null;
  relatedPosts: Post[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PostState = {
  posts: [],
  authors: {},
  currentPost: null,
  relatedPosts: [],
  loading: false,
  error: null,
};

// Thunk for fetching all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://learnup.work/api/posts');
  const data = await response.json();
  return data.map((post: Post) => ({
    ...post,
    image: post.image || 'https://via.placeholder.com/300',
  }));
});

// Thunk for fetching a single post by ID
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://learnup.work/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch post. Status: ${response.status}`);
  }
  return await response.json();
});

// Thunk for fetching author data by ID
export const fetchAuthorById = createAsyncThunk('posts/fetchAuthorById', async (authorId: string) => {
  const response = await fetch(`https://learnup.work/api/auth/user/${authorId}`);
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

// Thunk for fetching related posts
export const fetchRelatedPosts = createAsyncThunk(
  'posts/fetchRelatedPosts',
  async ({ tags, excludeId }: { tags: string[]; excludeId: string }) => {
    const response = await fetch('https://learnup.work/api/posts');
    const allPosts: Post[] = await response.json();

    // Filter related posts by tags, excluding the current post
    const relatedPosts = allPosts.filter(
      (post) => post._id !== excludeId && post.tags.some((tag) => tags.includes(tag))
    );

    return relatedPosts;
  }
);

// Thunk for adding a new post
export const addPost = createAsyncThunk('posts/addPost', async (post: Partial<Post>) => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://learnup.work/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  return await response.json();
});

// Thunk for updating an existing post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, post }: { id: string; post: Partial<Post> }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://learnup.work/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    return await response.json();
  }
);

// Thunk for deleting a post
export const deletePost = createAsyncThunk('posts/deletePost', async (id: string) => {
  const token = localStorage.getItem('token');
  await fetch(`https://learnup.work/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
});

// Create slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updatePostState: (state, action: PayloadAction<{ id: string; post: Partial<Post> }>) => {
      const index = state.posts.findIndex((post) => post._id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload.post };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post by ID';
      })
      .addCase(fetchAuthorById.fulfilled, (state, action: PayloadAction<Author>) => {
        state.authors[action.payload._id] = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch author data';
      })
      .addCase(fetchRelatedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.relatedPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch related posts';
        state.loading = false;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export const { clearError, updatePostState } = postSlice.actions;
export default postSlice.reducer;
