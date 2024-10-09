import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Trash } from 'lucide-react'; // Import icon từ lucide-react
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar từ shadcn/ui

interface Article {
  id: number;
  code: string;
  title: string;
  description: string;
  author: string;
  date: string;
  bgColor: string;
  avatarUrl?: string;
}

interface Reply {
  id: number;
  articleId: number;
  author: string;
  content: string;
  likes: number;
  avatarUrl?: string;
}

const QuestionDetailPage: React.FC = () => {
  // Dữ liệu các bài viết
  const initialArticles: Article[] = [
    {
      id: 1,
      code: "SE392",
      title: "How to improve React performance?",
      description: "Discussing best practices to optimize React applications...",
      author: 'Alice',
      date: '2024-09-10 10:00',
      bgColor: "#00FF75",
      avatarUrl: "https://i.pravatar.cc/150?img=1", // Avatar URL
    },
    {
      id: 2,
      code: "IB101",
      title: "JavaScript: Hoisting vs Scoping",
      description: "An in-depth discussion on JavaScript hoisting and scoping...",
      author: 'Bob',
      date: '2024-09-11 14:15',
      bgColor: "#4DF4E7",
      avatarUrl: "https://i.pravatar.cc/150?img=2", // Avatar URL
    },
  ];

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [replies, setReplies] = useState<Reply[]>([]); // State lưu trữ các câu trả lời
  const [replyContent, setReplyContent] = useState<string>(''); // Nội dung trả lời hiện tại
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null); // ID bài viết đang trả lời

  // Xử lý submit trả lời
  const handleReplySubmit = (articleId: number) => {
    if (replyContent.trim()) {
      const newReply: Reply = {
        id: replies.length + 1,
        articleId,
        author: 'User', // Tên mặc định người dùng
        content: replyContent,
        likes: 0, // Khởi tạo số like là 0
        avatarUrl: "https://i.pravatar.cc/150?img=3", // Avatar cho người trả lời
      };
      setReplies([...replies, newReply]);
      setReplyContent(''); // Xóa nội dung trả lời sau khi submit
      setActiveArticleId(null); // Ẩn khung trả lời
    }
  };

  // Xử lý like hoặc delike câu trả lời
  const handleLike = (replyId: number) => {
    setReplies(
      replies.map((reply) =>
        reply.id === replyId
          ? { ...reply, likes: reply.likes === 0 ? reply.likes + 1 : reply.likes - 1 }
          : reply
      )
    );
  };

  // Xử lý xóa bài viết
  const handleDeleteArticle = (articleId: number) => {
    setArticles(articles.filter(article => article.id !== articleId));
    setReplies(replies.filter(reply => reply.articleId !== articleId)); // Xóa luôn câu trả lời liên quan
  };

  // Xử lý xóa câu trả lời
  const handleDeleteReply = (replyId: number) => {
    setReplies(replies.filter(reply => reply.id !== replyId));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 px-[10%]">
      <h1 className="text-3xl font-bold mb-6 text-center">Forum</h1>
      <div className="space-y-6">
        {/* Hiển thị các bài viết */}
        {articles.map((article) => (
          <div key={article.id} className="bg-white shadow-md rounded-lg p-6 relative">
            {/* Nút xóa bài viết */}
            <button
              onClick={() => handleDeleteArticle(article.id)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800"
            >
              <Trash className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                {/* Avatar người đăng */}
                <Avatar className="w-10 h-10">
                  <AvatarImage src={article.avatarUrl} alt={article.author} />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-2xl font-semibold">{article.title}</h2>
                  <p className="text-sm text-gray-500">
                    Posted by {article.author} on {article.date}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{article.description}</p>

            {/* Nút Reply */}
            <button
              onClick={() => setActiveArticleId(article.id)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <MessageCircle className="w-5 h-5" /> <span>Reply</span>
            </button>

            {/* Hiển thị các câu trả lời */}
            <div className="mt-4 space-y-4">
              {replies
                .filter((reply) => reply.articleId === article.id)
                .map((reply) => (
                  <div
                    key={reply.id}
                    className="flex justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Avatar người trả lời */}
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={reply.avatarUrl} alt={reply.author} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-semibold text-gray-700">{reply.author}:</span>
                        <p className="text-gray-600">{reply.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Nút Like/Delike */}
                      <button
                        onClick={() => handleLike(reply.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                      >
                        <ThumbsUp className="w-5 h-5" /> <span>{reply.likes}</span>
                      </button>
                      {/* Nút xóa câu trả lời */}
                      <button
                        onClick={() => handleDeleteReply(reply.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Khung nhập câu trả lời */}
            {activeArticleId === article.id && (
              <div className="mt-6">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleReplySubmit(article.id)}
                  className="bg-blue-600 text-white mt-3 px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetailPage;
