// subjectsData.ts
export interface Subject {
  id: string;
  name: string;
  description: string;
  semester: string;
  resources: string[];
}

export const subjectsData: Subject[] = [
  {
    id: "1", // ID của môn học "Toán học"
    name: "Toán học",
    description: "Môn học về các chủ đề giải tích, đại số, và xác suất thống kê.",
    semester: "semesterId1",
    resources: ["resourceId1", "resourceId2"],
  },
  {
    id: "2", // ID của môn học "Vật lý"
    name: "Vật lý",
    description: "Môn học về cơ học, điện từ học và vật lý lượng tử.",
    semester: "semesterId2",
    resources: ["resourceId3", "resourceId4"],
  },
  {
    id: "3", // ID của môn học "Hóa học"
    name: "Hóa học",
    description: "Nghiên cứu về các hợp chất hóa học, phản ứng hóa học, và nguyên tử.",
    semester: "semesterId1",
    resources: ["resourceId5", "resourceId6"],
  },
  {
    id: "4", // ID của môn học "Sinh học"
    name: "Sinh học",
    description: "Học về sinh học phân tử, di truyền học, và sinh thái học.",
    semester: "semesterId3",
    resources: ["resourceId7", "resourceId8"],
  },
];
