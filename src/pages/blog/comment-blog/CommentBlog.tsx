import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSend, FiMessageSquare } from "react-icons/fi";
import Picker from '@emoji-mart/react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/store";
import {
  fetchCommentsByPostId,
  addComment,
  deleteComment,
  updateComment,
  replyToComment,
} from "@/lib/api/redux/commentSlice";
import { fetchUserInfo } from "@/lib/api/redux/userSlice";
import { CreateCommentData, ReplyCommentData } from "@/lib/api/redux/commentSlice";

interface Comment {
  _id: string;
  content: string;
  images: string[];
  authorId: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  parentCommentId?: string;
}

const CLOUD_NAME = "dbezyvjzm";
const UPLOAD_PRESET = "learnup";

interface CommentBlogProps {
  postId: string | null;
}

const CommentBlog: React.FC<CommentBlogProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentsFromStore = useSelector((state: RootState) => state.comment.comments);
  const currentUser = useSelector((state: RootState) => state.user.profile);

  // Component state
  const [comments, setComments] = useState<Comment[]>(commentsFromStore || []);
  const [newComment, setNewComment] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [replyContent, setReplyContent] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [replyImages, setReplyImages] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState<string | null>(null);
  const maxCharacters = 500;

  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentsByPostId(postId));
    }
    dispatch(fetchUserInfo());
  }, [dispatch, postId]);

  useEffect(() => {
    if (commentsFromStore) {
      const sortedComments = [...commentsFromStore].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setComments(sortedComments);
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
      return data.secure_url;
    } catch (error) {
      console.error("Image Upload Error: ", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const handlePaste = async (
    e: React.ClipboardEvent<HTMLTextAreaElement>,
    isReply: boolean = false
  ) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          try {
            const imageUrl = await uploadImageToCloudinary(file);
            if (isReply) {
              setReplyImages(prev => [...prev, imageUrl]);
            } else {
              setUploadedImages(prev => [...prev, imageUrl]);
            }
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
      toast.error('Please add some text or an image.');
      return;
    }

    const commentData: CreateCommentData = {
      postId: postId || '',
      content: newComment,
      images: uploadedImages,
    };

    try {
      const resultAction = await dispatch(addComment(commentData));

      if (addComment.fulfilled.match(resultAction)) {
        setNewComment('');
        setUploadedImages([]);
        toast.success('Comment added successfully!');
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to add comment.');
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    if (!replyContent.trim() && replyImages.length === 0) {
      toast.error("Please add some text or an image.");
      return;
    }

    const replyData: ReplyCommentData = {
      postId: postId || "",
      parentCommentId,
      content: replyContent,
      images: replyImages,
    };

    try {
      const resultAction = await dispatch(replyToComment(replyData));

      if (replyToComment.fulfilled.match(resultAction)) {
        setReplyContent("");
        setReplyImages([]);
        setReplyingTo(null);
        toast.success("Reply added successfully!");
      } else {
        toast.error("Failed to add reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("Failed to add reply.");
    }
  };

  const handleEmojiSelect = (emoji: any, isReply: boolean = false) => {
    if (isReply) {
      setReplyContent(prev => prev + emoji.native);
      setShowReplyEmojiPicker(null);
    } else {
      setNewComment(prev => prev + emoji.native);
      setShowEmojiPicker(false);
    }
  };

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

  const renderComment = (comment: Comment, level: number = 0) => {
    const replies = comments.filter(c => c.parentCommentId === comment._id);
    const marginLeft = level * 2; // Increase indentation for nested comments

    return (
      <div key={comment._id} className={`space-y-4 ml-${marginLeft}`}>
        <div className="bg-white p-6 rounded-[2rem] shadow-md transition duration-300 hover:shadow-lg">
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
            <div className="flex space-x-2">
              {currentUser && currentUser._id === comment.authorId?._id && (
                <>
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
                </>
              )}
              <button
                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200"
              >
                <FiMessageSquare className="w-4 h-4" />
              </button>
            </div>
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
            <>
              <p className="mt-4 text-gray-700">{comment.content}</p>
              {Array.isArray(comment.images) && comment.images.length > 0 && (
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
            </>
          )}

          {/* Reply Form */}
          {replyingTo === comment._id && (
            <div className="mt-4 ml-8 space-y-4">
              <div className="relative">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onPaste={(e) => handlePaste(e, true)}
                  placeholder="Write a reply..."
                  className="w-full p-4 border border-gray-300 rounded-[2rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200 text-black"
                  rows={3}
                  maxLength={maxCharacters}
                />
                <button
                  type="button"
                  onClick={() => setShowReplyEmojiPicker(comment._id)}
                  className="absolute top-3 right-14 text-gray-600 hover:text-yellow-500 transition"
                >
                  😊
                </button>
              </div>

              {showReplyEmojiPicker === comment._id && (
                <div className="absolute z-10">
                  <Picker onEmojiSelect={(emoji) => handleEmojiSelect(emoji, true)} />
                </div>
              )}

              {replyImages.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {replyImages.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt="Reply preview"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => handleReplySubmit(comment._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition duration-200"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                    setReplyImages([]);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-[1.5rem] hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Render nested replies */}
        {replies.length > 0 && (
          <div className="ml-8 space-y-4">
            {replies.map(reply => renderComment(reply, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Get only top-level comments (those without parentCommentId)
  const topLevelComments = comments.filter(comment => !comment.parentCommentId);

  return (
    <div className="max-w-4xl p-4 space-y-6">
      {/* Form for new comment */}
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onPaste={(e) => handlePaste(e)}
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
          onClick={() => setShowEmojiPicker(prev => !prev)}
          className="absolute top-3 right-14 text-gray-600 hover:text-yellow-500 transition"
        >
          😊
        </button>

        {showEmojiPicker && (
          <div className="absolute top-14 right-10 z-10">
            <Picker onEmojiSelect={(emoji) => handleEmojiSelect(emoji)} />
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
        {topLevelComments.map(comment => renderComment(comment, 0))}
      </div>
    </div>
  );
};

export default CommentBlog;