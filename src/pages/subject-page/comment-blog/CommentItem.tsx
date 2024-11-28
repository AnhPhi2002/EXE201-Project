import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import { deleteComment, updateComment, replyToComment, fetchCommentsBySubjectId } from '@/lib/api/redux/commentSubjectSlice';

import CommentForm from './CommentForm';
import { toast } from 'sonner';

interface Author {
  _id: string;
  name: string;
  avatar?: string;
  role?: 'member_premium' | 'member_free' | 'staff' | 'admin';
}

interface CommentItemProps {
  comment: any;
  comments: any[];
  currentUser: any;
  subjectId: string | null;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, comments, currentUser, subjectId, level = 0 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authors: Record<string, Author> = useSelector((state: RootState) => state.comment.authors);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [replying, setReplying] = useState<boolean>(false);

  const author = authors[comment.authorId?._id];

  const roleColors = {
    member_premium: 'text-yellow-700',
    member_free: 'text-blue-700',
    staff: 'text-green-700',
    admin: 'text-red-700',
    default: 'text-gray-700',
  };

  const roleLabels = {
    member_premium: 'Premium Member',
    member_free: 'Member',
    staff: 'Culi không công',
    admin: 'Admin',
    default: 'Unknown Role',
  };

  const roleClass = author?.role ? roleColors[author.role] : roleColors.default;
  const roleLabel = author?.role ? roleLabels[author.role] : roleLabels.default;

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(comment._id));
      dispatch(fetchCommentsBySubjectId(subjectId || ''));
      toast.success('Xóa bình luận thành công!');
    } catch {
      toast.error('Không thể xóa bình luận.');
    }
  };
  
  const handleUpdate = async () => {
    if (editContent.trim()) {
      try {
        await dispatch(updateComment({ id: comment._id, content: editContent }));
        dispatch(fetchCommentsBySubjectId(subjectId || ''));
        setIsEditing(false);
        toast.success('Cập nhật bình luận thành công!');
      } catch {
        toast.error('Không thể cập nhật bình luận.');
      }
    }
  };
  
  const handleReplySubmit = async (content: string, images: string[]) => {
    if (!content.trim() && images.length === 0) {
      toast.error('Vui lòng thêm nội dung hoặc hình ảnh.');
      return;
    }
  
    const replyData = {
      subjectId: subjectId || '',
      parentCommentId: comment._id,
      content,
      images,
    };
  
    try {
      const resultAction = await dispatch(replyToComment(replyData));
      if (replyToComment.fulfilled.match(resultAction)) {
        toast.success('Thêm trả lời thành công!');
        setReplying(false);
      } else {
        toast.error('Không thể thêm trả lời.');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Không thể thêm trả lời.');
    }
  };
  

  const childComments = comments.filter((c) => c.parentCommentId === comment._id);

  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };
  console.log('Rendering comment:', comment);
  return (
    <div className={`space-y-4 ${level > 0 ? '' : ''} mt-4`} style={{ marginLeft: level * 20 }}>
      <div className="bg-white p-6 rounded-[2rem] shadow-md transition duration-300 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img src={author?.avatar || 'https://via.placeholder.com/50'} alt={author?.name || 'Unknown'} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="font-semibold text-gray-800">
                {author?.name || 'Unknown'}
                <span className={`ml-2 text-sm italic ${roleClass}`}>({roleLabel})</span>
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
                <button onClick={() => setIsEditing(true)} className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button onClick={handleDelete} className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition duration-200">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </>
            )}
            {!comment.parentCommentId && (
              <button onClick={() => setReplying(!replying)} className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200">
                <FiMessageSquare className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className="mt-4">
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full p-4 border border-gray-300 rounded-md" rows={3} />
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2">
              Update
            </button>
          </div>
        ) : (
          <p className="mt-4 text-gray-700">{comment.content}</p>
        )}

        {comment.images && comment.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {comment.images.map((image: string, index: number) => (
              <img key={index} src={image} alt={`Comment image ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
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
        <div className={`mt-4  rounded-md p-4`} style={{ marginLeft: level * 20 }}>
          {childComments.map((child) => (
            <CommentItem key={child._id} comment={child} comments={comments} currentUser={currentUser} subjectId={subjectId} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
