import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSend } from "react-icons/fi";
// import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";
import Picker from '@emoji-mart/react';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/store";
import {
  fetchCommentsByPostId,
  addComment,
  deleteComment,
  updateComment,
} from "@/lib/api/redux/commentSlice";
import { fetchUserInfo } from "@/lib/api/redux/userSlice";
import { CreateCommentData } from "@/lib/api/redux/commentSlice";


// Cloudinary Configuration
const CLOUD_NAME = "dbezyvjzm";
const UPLOAD_PRESET = "learnup";

interface CommentBlogProps {
  postId: string | null;
}

const CommentBlog: React.FC<CommentBlogProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const commentsFromStore = useSelector(
    (state: RootState) => state.comment.comments
  );
  const currentUser = useSelector((state: RootState) => state.user.profile);

  // Component state
  const [comments, setComments] = useState(commentsFromStore || []);
  const [newComment, setNewComment] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const maxCharacters = 500;

  // Fetch comments and user info
  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentsByPostId(postId));
    }
    dispatch(fetchUserInfo());
  }, [dispatch, postId]);

  // Update local comments state when Redux state changes
  useEffect(() => {
    if (commentsFromStore) {
      setComments(
        [...commentsFromStore].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [commentsFromStore]);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      // Thêm URL mới vào state uploadedImages
      setUploadedImages(prev => [...prev, data.secure_url]);
      return data.secure_url;
    } catch (error: any) {
      console.error("Image Upload Error: ", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  // Sửa lại hàm handlePaste để cập nhật state uploadedImages
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          try {
            await uploadImageToCloudinary(file);
            toast.success("Image uploaded successfully!");
          } catch (error) {
            console.error("Error uploading image: ", error);
            toast.error("Failed to upload image.");
          }
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newComment.trim() && uploadedImages.length === 0) {
      toast.error("Please add some text or an image.");
      return;
    }
  
    const commentData: CreateCommentData = {
      postId: postId || "",
      content: newComment,
      images: uploadedImages,
    };
  
    // Log dữ liệu trước khi gửi
    console.log("Submitting comment with data:", commentData);
  
    try {
      const resultAction = await dispatch(addComment(commentData));
  
      if (addComment.fulfilled.match(resultAction)) {
        setNewComment("");
        setUploadedImages([]);
        toast.success("Comment added successfully!");
      } else {
        if (resultAction.payload) {
          toast.error(`Failed to add comment: ${resultAction.payload}`);
        } else {
          toast.error("Failed to add comment");
        }
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to add comment.");
    }
  };
  
  // Add emoji to the comment
  const handleEmojiSelect = (emoji: any) => {
    setNewComment((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };


  // Handle edit comment
  const handleEdit = (id: string) => {
    const comment = comments.find((c) => c._id === id);
    if (comment) {
      setEditingId(id);
      setEditContent(comment.content);
    }
  };

  const handleUpdate = async (id: string) => {
    if (editContent.trim()) {
      try {
        await dispatch(updateComment({ id, content: editContent }));
        dispatch(fetchCommentsByPostId(postId || ""));
        setEditingId(null);
        setEditContent("");
        toast.success("Comment updated successfully!");
      } catch {
        toast.error("Failed to update comment.");
      }
    }
  };

  // Delete comment
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteComment(id));
      dispatch(fetchCommentsByPostId(postId || ""));
      toast.success("Comment deleted successfully!");
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-4xl p-4 space-y-6">
      {/* Form for new comment */}
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onPaste={handlePaste}
            placeholder="Write a comment... Paste images directly!"
            className="w-full p-4 border border-gray-300 rounded-[2rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200 text-black"
            rows={3}
            maxLength={maxCharacters}
            aria-label="Comment input"
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500">
            {newComment.length}/{maxCharacters}
          </div>
        </div>

        {/* Emoji Picker Toggle */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="absolute top-3 right-14 text-gray-600 hover:text-yellow-500 transition"
        >
          😊
        </button>

        {showEmojiPicker && (
          <div className="absolute top-14 right-10 z-10">
            <Picker onEmojiSelect={handleEmojiSelect} />
          </div>
        )}

        {uploadedImages.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {uploadedImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Uploaded preview"
                className="w-16 h-16 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          disabled={!newComment.trim() && uploadedImages.length === 0}
        >
          <FiSend className="w-4 h-4" />
          Submit
        </button>
      </form>

      {/* Display comments */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white p-6 rounded-[2rem] shadow-md transition duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={comment.authorId?.avatar || "https://via.placeholder.com/50"}
                  alt={comment.authorId?.name || "Unknown"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {comment.authorId?.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                    {comment.createdAt !== comment.updatedAt && " (edited)"}
                  </p>
                </div>
              </div>
              {currentUser && currentUser._id === comment.authorId?._id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition duration-200"
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
                  className="w-full p-2 border border-gray-300 rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
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
            {comment.images.length > 0 && (
              <div className="mt-4 flex gap-4 flex-wrap">
                {comment.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Comment image ${index}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBlog;
