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