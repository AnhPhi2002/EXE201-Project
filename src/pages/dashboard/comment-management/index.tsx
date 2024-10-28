import React, { useState } from "react";
import { Edit, Trash2, Send, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  postId: string | null;
  videoId: string | null;
  authorId: string;
  author: string;
  avatar: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const CommentManagementDashboard: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "507f1f77bcf86cd799439011",
      postId: "507f1f77bcf86cd799439012",
      videoId: null,
      authorId: "507f1f77bcf86cd799439013",
      author: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      content: "This is a great post! Very informative and well-written.",
      images: [
        "https://images.unsplash.com/photo-1555421689-491a97ff2040",
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "507f1f77bcf86cd799439014",
      postId: null,
      videoId: "507f1f77bcf86cd799439015",
      authorId: "507f1f77bcf86cd799439016",
      author: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      content: "I completely agree with the points mentioned here.",
      images: [],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString()
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [newImages, setNewImages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editImages, setEditImages] = useState<string[]>([]);

  const handleAddComment = () => {
    if (!newComment.trim() && newImages.length === 0) return;

    const comment: Comment = {
      id: `507f1f77bcf86cd799439${Math.floor(Math.random() * 1000)}`,
      postId: "507f1f77bcf86cd799439012",
      videoId: null,
      authorId: "507f1f77bcf86cd799439013",
      author: "Current User",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      content: newComment,
      images: newImages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setNewImages([]);
  };

  const handleEdit = (id: string, content: string, images: string[]) => {
    setEditingId(id);
    setEditContent(content);
    setEditImages(images);
  };

  const handleSaveEdit = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              content: editContent,
              images: editImages,
              updatedAt: new Date().toISOString()
            }
          : comment
      )
    );
    setEditingId(null);
    setEditContent("");
    setEditImages([]);
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const addImage = () => {
    const imageUrl = "https://images.unsplash.com/photo-1560179304-6fc1d8749b23";
    if (editingId) {
      setEditImages([...editImages, imageUrl]);
    } else {
      setNewImages([...newImages, imageUrl]);
    }
  };

  const removeImage = (index: number, isEditing: boolean) => {
    if (isEditing) {
      setEditImages(editImages.filter((_, i) => i !== index));
    } else {
      setNewImages(newImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Comments Management</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              aria-label="Add a comment"
            />
            <button
              onClick={addImage}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              aria-label="Add image"
            >
              <Image className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              aria-label="Submit comment"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {newImages.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {newImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="New attachment"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index, false)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-50 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={comment.avatar}
                      alt={`${comment.author}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{comment.author}</h3>
                      <p className="text-sm text-gray-500">
                        {comment.postId ? "Post Comment" : "Video Comment"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {formatDate(comment.createdAt)}
                        {comment.updatedAt !== comment.createdAt && (
                          <span className="ml-2">
                            (Edited: {formatDate(comment.updatedAt)})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(comment.id, comment.content, comment.images)}
                      className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
                      aria-label="Edit comment"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {editingId === comment.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      aria-label="Edit comment content"
                    />
                    <div className="flex justify-between items-center">
                      <button
                        onClick={addImage}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <Image className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                    {editImages.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {editImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt="Edit attachment"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index, true)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700">{comment.content}</p>
                    {comment.images && comment.images.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {comment.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Comment attachment ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CommentManagementDashboard;
