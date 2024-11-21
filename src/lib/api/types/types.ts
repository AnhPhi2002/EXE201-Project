// src/types.ts

export type UserRole = 'admin' | 'staff' | 'member_free' | 'member_premium';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role?: UserRole;
  address?: string;
  phone?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  about?: string;
  birthDate?: Date;
  permissions?: string[];
}

export interface User extends UserProfile {
  createdAt?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Semester {
  id: string;
  name: string;
  departmentId: string;
}

export interface Subject {
  id: string;
  name: string;
  semesterId: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string; // `description` có thể là `undefined`
  fileUrls?: string[];
  type?: 'pdf' | 'video' | 'document';
  allowedRoles?: ('member_free' | 'member_premium')[];
  subject: string;
}

export interface PaymentState {
  loading: boolean;
  error: string | null;
  checkoutUrl: string | null;
}

export interface RootState {
  payment: PaymentState;
  user: UserState;
  posts: PostState;
}

export interface PostState {
  posts: Post[];
  authors: Record<string, Author>; // Lưu thông tin author theo ID
  loading: boolean;
  error: string | null;
}


export interface UserState {
  profile: UserProfile | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: { _id: string };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface Author {
  _id: string;
  name: string;
  avatar: string;
}
