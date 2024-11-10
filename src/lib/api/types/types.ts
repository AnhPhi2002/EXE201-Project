// src/types.ts
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
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role?: 'member_free' | 'member_premium'; // Đặt dấu '?' để biến role thành tùy chọn
  address?: string;
  phone?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  about?: string;
}

