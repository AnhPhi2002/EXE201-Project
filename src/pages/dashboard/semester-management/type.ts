// types.ts

export interface Department {
    id: string;
    name: string;
    code: string;
    semesters?: Semester[]; // Dùng `semesters` nếu cần, có thể là tùy chọn
  }
  
  export interface Semester {
    id: string;
    name: string;
    department: string;
    subjects?: any[]; // Tùy chọn `subjects` nếu cần
  }
  