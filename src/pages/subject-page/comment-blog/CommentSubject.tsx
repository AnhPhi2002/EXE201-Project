import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import {
  fetchCommentsBySubjectId,
  addComment,
} from '@/lib/api/redux/commentSubjectSlice'; // Đảm bảo đang gọi đúng slice
import { fetchUserInfo } from '@/lib/api/redux/userSlice';
import { toast } from 'react-toastify';

import { Comment } from '@/lib/api/redux/commentSubjectSlice'; // Đảm bảo đúng kiểu Comment
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentSubjectProps {
  subjectId: string | null; // subjectId truyền vào từ prop
}

const CommentSubject: React.FC<CommentSubjectProps> = ({ subjectId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentsFromStore = useSelector((state: RootState) => state.commentSubject.comments); // Đảm bảo gọi đúng slice
  const currentUser = useSelector((state: RootState) => state.user.profile); // Lấy thông tin người dùng từ Redux

  const [comments, setComments] = useState<Comment[]>([]);

  // Dispatch để fetch comments khi có subjectId
  useEffect(() => {
    if (subjectId) {
      dispatch(fetchCommentsBySubjectId(subjectId)); // Fetch comments dựa trên subjectId
    }
    dispatch(fetchUserInfo()); // Fetch thông tin người dùng khi cần
  }, [dispatch, subjectId]);

  // Khi có dữ liệu commentsFromStore, sắp xếp và lưu vào state local
  useEffect(() => {
    if (commentsFromStore) {
      const sortedComments = [...commentsFromStore].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setComments(sortedComments);
    }
  }, [commentsFromStore]);

  // Xử lý thêm bình luận mới
  const handleAddComment = async (content: string, images: string[]) => {
    if (!content.trim() && images.length === 0) {
      toast.error('Please add some text or an image.');
      return;
    }

    const commentData = {
      subjectId: subjectId || '', // Dùng subjectId để add bình luận
      content,
      images,
    };

    try {
      const resultAction = await dispatch(addComment(commentData));
      if (addComment.fulfilled.match(resultAction)) {
        toast.success('Comment added successfully!');
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to add comment.');
    }
  };

  // Lọc ra các comment gốc (không phải trả lời)
  const rootComments = comments.filter((comment) => !comment.parentCommentId);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

      {/* Form để người dùng thêm bình luận */}
      <CommentForm onSubmit={handleAddComment} />

      {/* Hiển thị bình luận */}
      <div className="space-y-6">
        {rootComments.length > 0 ? (
          rootComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              comments={comments}
              currentUser={currentUser}
              subjectId={subjectId}
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p> // Nếu không có bình luận, hiển thị thông báo
        )}
      </div>
    </div>
  );
};

export default CommentSubject;
