// postsData.ts

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  image: string;  // URL của ảnh
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Toán học",
    content: "Hướng dẫn đầy đủ về giải tích nâng cao và thống kê",
    authorId: "userId1",
    tags: ["math", "calculus", "statistics"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904"
  },
  {
    id: 2,
    title: "Vật lý",
    content: "Tài liệu học tập toàn diện về cơ học lượng tử",
    authorId: "userId2",
    tags: ["physics", "quantum mechanics"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa"
  },
  {
    id: 3,
    title: "Hóa học",
    content: "Hướng dẫn chi tiết về hóa học hữu cơ và vô cơ",
    authorId: "userId3",
    tags: ["chemistry", "organic", "inorganic"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1603126957548-75de25e9dc15"
  },
  {
    id: 4,
    title: "Sinh học",
    content: "Tài liệu đầy đủ về sinh học phân tử và di truyền học",
    authorId: "userId4",
    tags: ["biology", "molecular biology", "genetics"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69"
  }
];
