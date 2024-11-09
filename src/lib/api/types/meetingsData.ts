// meetingsData.ts
export interface Meeting {
  id: number;
  title: string;
  description: string;
  meetLink: string;
  startTime: string;
  endTime: string;
  subjectId: string; // Thêm trường subjectId
}

export const meetingsData: Meeting[] = [
  {
    id: 1,
    title: "Lập trình Web Cơ Bản",
    description: "Khóa học về lập trình web cho người mới bắt đầu.",
    meetLink: "https://meet.example.com/room1",
    startTime: "2024-11-10T10:00:00Z",
    endTime: "2024-11-10T12:00:00Z",
    subjectId: "1", // Liên kết với môn học "Toán học"
  },
  {
    id: 2,
    title: "Lập trình Python",
    description: "Khóa học về lập trình Python từ cơ bản đến nâng cao.",
    meetLink: "https://meet.example.com/room2",
    startTime: "2024-11-11T14:00:00Z",
    endTime: "2024-11-11T16:00:00Z",
    subjectId: "2", // Liên kết với môn học "Vật lý"
  },
  {
    id: 3,
    title: "Phát triển game Unity",
    description: "Khóa học phát triển game với Unity.",
    meetLink: "https://meet.example.com/room3",
    startTime: "2024-11-12T09:00:00Z",
    endTime: "2024-11-12T11:00:00Z",
    subjectId: "3", // Liên kết với môn học "Hóa học"
  },
];
