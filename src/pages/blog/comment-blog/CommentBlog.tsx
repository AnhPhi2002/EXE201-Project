import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSend } from "react-icons/fi";

interface User {
  _id: string;
  name: string;
  avatar: string;
}

interface Comment {
  _id: string;
  postId: string | null;
  videoId: string | null;
  authorId: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CommentBlogProps {
  postId: string | null;
  videoId: string | null;
  currentUser: User | null;
}

const CommentBlog: React.FC<CommentBlogProps> = ({ postId, videoId, currentUser }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: "1",
      postId: "post123",
      videoId: null,
      authorId: "user1",
      content: "This is an amazing feature! Love the implementation.",
      author: {
        name: "Sarah Johnson",
        avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      createdAt: "2024-01-20T10:30:00",
      updatedAt: "2024-01-20T10:30:00"
    },
    {
      _id: "2",
      postId: "post123",
      videoId: null,
      authorId: "user2",
      content: "Great work on this project. The attention to detail is impressive.",
      author: {
        name: "Michael Chen",
        avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36"
      },
      createdAt: "2024-01-20T11:15:00",
      updatedAt: "2024-01-20T11:15:00"
    }
  ]);

  const [newComment, setNewComment] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const maxCharacters = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        _id: Date.now().toString(),
        postId: postId || null,
        videoId: videoId || null,
        authorId: currentUser?._id || "currentUser",
        content: newComment,
        author: {
          name: currentUser?.name || "Current User",
          avatar: currentUser?.avatar || "images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleEdit = (id: string) => {
    const comment = comments.find((c) => c._id === id);
    if (comment) {
      setEditingId(id);
      setEditContent(comment.content);
    }
  };

  const handleUpdate = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment._id === id
          ? {
              ...comment,
              content: editContent,
              updatedAt: new Date().toISOString()
            }
          : comment
      )
    );
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment._id !== id));
  };

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-4xl  p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border border-gray-300 rounded-[2rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            rows={3}
            maxLength={maxCharacters}
            aria-label="Comment input"
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500">
            {newComment.length}/{maxCharacters}
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          disabled={!newComment.trim()}
        >
          <FiSend className="w-4 h-4" />
          Submit
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white p-6 rounded-[2rem] shadow-md transition duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={`https://${comment.author.avatar}`}
                  alt={comment.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{comment.author.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                    {comment.createdAt !== comment.updatedAt && " (edited)"}
                  </p>
                </div>
              </div>
              {currentUser?._id === comment.authorId && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200"
                    aria-label="Edit comment"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition duration-200"
                    aria-label="Delete comment"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {editingId === comment._id ? (
              <div className="mt-4 space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-[1.5rem] hover:bg-gray-300 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-700">{comment.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBlog;
