// src/components/CommentItem.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import {
  deleteComment,
  updateComment,
  replyToComment,
  fetchCommentsByPostId,
} from '@/lib/api/redux/commentSlice';
import { toast } from 'react-toastify';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import CommentForm from './CommentForm';
import EmojiPickerButton from './EmojiPickerButton';

interface CommentItemProps {
  comment: any;
  comments: any[];
  currentUser: any;
  postId: string | null;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  comments,
  currentUser,
  postId,
  level = 0,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authors = useSelector((state: RootState) => state.comment.authors);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [replying, setReplying] = useState<boolean>(false);

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const author = authors[comment.authorId?._id];

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(comment._id));
      dispatch(fetchCommentsByPostId(postId || ''));
      toast.success('Comment deleted successfully!');
    } catch {
      toast.error('Failed to delete comment.');
    }
  };

  const handleUpdate = async () => {
    if (editContent.trim()) {
      try {
        await dispatch(updateComment({ id: comment._id, content: editContent }));
        dispatch(fetchCommentsByPostId(postId || ''));
        setIsEditing(false);
        toast.success('Comment updated successfully!');
      } catch {
        toast.error('Failed to update comment.');
      }
    }
  };

  const handleReplySubmit = async (content: string, images: string[]) => {
    if (!content.trim() && images.length === 0) {
      toast.error('Please add some text or an image.');
      return;
    }

    const replyData = {
      postId: postId || '',
      parentCommentId: comment._id,
      content,
      images,
    };

    try {
      const resultAction = await dispatch(replyToComment(replyData));
      if (replyToComment.fulfilled.match(resultAction)) {
        toast.success('Reply added successfully!');
        setReplying(false);
      } else {
        toast.error('Failed to add reply');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Failed to add reply.');
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    const emojiNative = emoji.native || '';
    setEditContent((prev) => prev + emojiNative);
    setShowEmojiPicker(false);
  };

  const childComments = comments.filter((c) => c.parentCommentId === comment._id);

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  // Ẩn Picker khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div
      className={`space-y-4 ${
        level > 0 ? 'bg-gray-100 border-l-4 border-blue-500' : 'bg-white'
      } rounded-lg p-4`}
      style={{ marginLeft: level * 20 }}
    >
      <div className="bg-white p-6 rounded-[2rem] shadow-md transition duration-300 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img
              src={author?.avatar || 'https://via.placeholder.com/50'}
              alt={author?.name || 'Unknown'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {author?.name || 'Unknown'}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
                {comment.createdAt !== comment.updatedAt && ' (edited)'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {currentUser && currentUser._id === comment.authorId?._id && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition duration-200"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => setReplying(!replying)}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200"
            >
              <FiMessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="mt-4 space-y-2 relative">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black pr-14"
              rows={3}
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-[1rem] hover:bg-blue-700 transition duration-200"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-[1rem] hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
            <div className="absolute right-4 top-2">
              <EmojiPickerButton
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                handleEmojiSelect={handleEmojiSelect}
                buttonRef={buttonRef}
              />
              {showEmojiPicker && (
                <div className="absolute z-10 right-0 top-full mt-2" ref={pickerRef}>
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="light"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-700">{comment.content}</p>
        )}

        {comment.images && comment.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {comment.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Comment image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md"
              />
            ))}
          </div>
        )}

        {replying && (
          <div className="mt-4">
            <CommentForm onSubmit={handleReplySubmit} />
          </div>
        )}
      </div>

      {childComments.length > 0 && (
        <div className="mt-4 space-y-6">
          {childComments.map((child) => (
            <CommentItem
              key={child._id}
              comment={child}
              comments={comments}
              currentUser={currentUser}
              postId={postId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
