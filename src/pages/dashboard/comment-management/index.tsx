import React, { useState, ChangeEvent } from 'react';
import { FiTrash2, FiMessageCircle, FiFilter, FiRefreshCw, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Định nghĩa kiểu dữ liệu cho Author, Reply và Comment
interface Author {
  name: string;
  avatar: string;
}
//// 
interface Reply {
  _id: string;
  content: string;
  author: Author;
  createdAt: string;
}

interface Comment {
  _id: string;
  postId: string | null;
  videoId: string | null;
  authorId: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
}

const CommentDashboard: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: '1',
      postId: 'post123',
      videoId: null,
      authorId: 'user1',
      content: 'This is an amazing feature! Love the implementation.',
      author: {
        name: 'Sarah Johnson',
        avatar: 'images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      createdAt: '2024-01-20T10:30:00',
      updatedAt: '2024-01-20T10:30:00',
      replies: [],
    },
    {
      _id: '2',
      postId: 'post123',
      videoId: null,
      authorId: 'user2',
      content: 'Great work on this project. The attention to detail is impressive.',
      author: {
        name: 'Michael Chen',
        avatar: 'images.unsplash.com/photo-1599566150163-29194dcaad36',
      },
      createdAt: '2024-01-20T11:15:00',
      updatedAt: '2024-01-20T11:15:00',
      replies: [],
    },
    {
      _id: '3',
      postId: null,
      videoId: 'video789',
      authorId: 'user3',
      content: 'The video editing is superb! Keep up the great work.',
      author: {
        name: 'Emma Wilson',
        avatar: 'images.unsplash.com/photo-1438761681033-6461ffad8d80',
      },
      createdAt: '2024-01-20T12:00:00',
      updatedAt: '2024-01-20T12:00:00',
      replies: [],
    },
  ]);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyContent('');
  };

  const handleSaveReply = (commentId: string) => {
    const newReply: Reply = {
      _id: Date.now().toString(),
      content: replyContent,
      author: {
        name: 'Current User',
        avatar: 'images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
      createdAt: new Date().toISOString(),
    };

    setComments((prevComments) => prevComments.map((comment) => (comment._id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment)));
    setReplyingTo(null);
    toast.success('Reply added successfully!');
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      toast.success('Comment deleted successfully!');
    }
  };

  const handleDeleteReply = (commentId: string, replyId: string) => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter((reply) => reply._id !== replyId),
              }
            : comment,
        ),
      );
      toast.success('Reply deleted successfully!');
    }
  };

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredComments = comments
    .filter((comment) => {
      if (filterStatus === 'posts') return comment.postId && !comment.videoId;
      if (filterStatus === 'videos') return comment.videoId;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const stats = {
    total: comments.length,
    posts: comments.filter((c) => c.postId && !c.videoId).length,
    videos: comments.filter((c) => c.videoId).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
              <FiMessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Post Comments</p>
                <p className="text-2xl font-semibold text-green-600">{stats.posts}</p>
              </div>
              <FiMessageCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Video Comments</p>
                <p className="text-2xl font-semibold text-yellow-600">{stats.videos}</p>
              </div>
              <FiMessageCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Comments</option>
                  <option value="posts">Post Comments</option>
                  <option value="videos">Video Comments</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <FiRefreshCw className="text-gray-500" />
                <select
                  value={sortOrder}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value)}
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-500">Showing {filteredComments.length} comments</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredComments.map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={`https://${comment.author.avatar}`}
                    alt={comment.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/50'; // Fallback nếu ảnh lỗi
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{comment.author.name}</h3>
                    <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                    <p className="mt-2 text-gray-600">{comment.content}</p>

                    {/* Hiển thị reply */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply._id} className="pl-4 border-l-2 border-gray-200">
                            <div className="flex items-start space-x-3">
                              <img
                                src={`https://${reply.author.avatar}`}
                                alt={reply.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/50'; // Fallback nếu ảnh lỗi
                                }}
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{reply.author.name}</p>
                                <p className="text-sm text-gray-600">{reply.content}</p>
                                <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                              </div>
                              <button onClick={() => handleDeleteReply(comment._id, reply._id)} className="p-1 text-gray-400 hover:text-red-500" aria-label="Delete reply">
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Form thêm reply */}
                    {replyingTo === comment._id && (
                      <div className="mt-4">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Write a reply..."
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button onClick={() => setReplyingTo(null)} className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800">
                            Cancel
                          </button>
                          <button onClick={() => handleSaveReply(comment._id)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end items-center space-x-2">
                  <button onClick={() => handleReply(comment._id)} className="p-2 text-gray-500 hover:text-blue-500">
                    <FiMessageSquare />
                  </button>
                  <button onClick={() => handleDelete(comment._id)} className="p-2 text-gray-500 hover:text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CommentDashboard;
