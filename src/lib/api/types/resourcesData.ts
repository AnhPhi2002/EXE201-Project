// resourcesData.ts

export interface Resource {  // Đảm bảo rằng kiểu Resource được xuất
  id: number;
  title: string;
  description: string;
  fileUrls: string[]; // Mảng chứa URL của các file
  type: "pdf" | "video" | "quiz";  // Có thể là pdf, video, hoặc quiz
  subject: string;  // Mã chủ đề (subjectId)
  allowedRoles?: ('member_free' | 'member_premium')[]; // Mảng chứa các role cho phép (member_free, member_premium)
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "Bài báo nghiên cứu",
    description: "Truy cập hàng nghìn bài báo được đánh giá",
    fileUrls: ["https://example.com/research-paper.pdf"],
    type: "pdf",
    subject: "subjectId1",
    allowedRoles: ["member_free", "member_premium"],
  },
  {
    id: 2,
    title: "Bài giảng video",
    description: "Hướng dẫn và bài giảng video của chuyên gia",
    fileUrls: ["https://example.com/video-lecture.mp4"],
    type: "video",
    subject: "subjectId2",
    allowedRoles: ["member_premium"],
  },
  {
    id: 3,
    title: "Bài kiểm tra thực hành",
    description: "Bài kiểm tra toàn diện kèm lời giải",
    fileUrls: ["https://example.com/practice-test.pdf"],
    type: "quiz",
    subject: "subjectId3",
    allowedRoles: ["member_free", "member_premium"],
  }
];
