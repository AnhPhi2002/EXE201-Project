import React from "react";
import { StudyRoomCard } from "./StudyRoomCard";

interface Post {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  resources: string;
}

const StudyRoomPage: React.FC = () => {
  const postData: Post[] = [
    {
      title: "Toán học nâng cao",
      description:
        "Tham gia buổi học tương tác với các chủ đề như giải tích, đại số tuyến tính và thống kê. Chúng tôi sẽ cùng giải bài tập thực hành và thảo luận các khái niệm quan trọng.",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      date: "07/11/2024",
      resources: "https://meet.google.com/xyz-abcd-123",
    },
    {
      title: "Giải bài tập Vật lý",
      description:
        "Buổi học nhóm hàng tuần tập trung vào cơ học, nhiệt động lực học và lý thuyết điện từ. Hãy mang đến những bài tập khó để cùng giải quyết.",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      date: "07/11/2024",
      resources: "https://meet.google.com/abc-xyz-789",
    },
    {
      title: "Thảo luận nhóm Hóa học",
      description:
        "Buổi học tương tác về các phản ứng hóa học hữu cơ, cấu trúc phân tử và khái niệm cân bằng hóa học.",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      date: "07/11/2024",
      resources: "https://meet.google.com/def-ghi-456",
    },
  ];

  const handleJoinStudyRoom = (link: string): void => {
    window.open(link, "_blank");
  };

  return (
    <div className="p-12 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {postData.map((post, index) => (
          <StudyRoomCard key={index} post={post} onJoin={() => handleJoinStudyRoom(post.resources)} />
        ))}
      </div>
    </div>
  );
};

export default StudyRoomPage;
