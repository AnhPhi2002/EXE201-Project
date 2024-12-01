import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import {
  fetchCommentsByPostId,
  addComment,
} from '@/lib/api/redux/commentSlice';
import { fetchUserInfo } from '@/lib/api/redux/userSlice';
import { toast } from 'react-toastify';
import { Comment } from '@/lib/api/redux/commentSlice';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentBlogProps {
  postId: string | null;
}

const CommentBlog: React.FC<CommentBlogProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentsFromStore = useSelector((state: RootState) => state.comment.comments);
  const currentUser = useSelector((state: RootState) => state.user.profile);

  const [comments, setComments] = useState<Comment[]>([]);

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

  const handleAddComment = async (content: string, images: string[]) => {
    if (!content.trim() && images.length === 0) {
      toast.error('Vui lòng thêm nội dung hoặc hình ảnh.');
      return;
    }

    const commentData = {
      postId: postId || '',
      content,
      images,
    };

    try {
      const resultAction = await dispatch(addComment(commentData));
      if (addComment.fulfilled.match(resultAction)) {
        toast.success('Thêm bình luận thành công!');
      } else {
        toast.error('Không thể thêm bình luận.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi bình luận:', error);
      toast.error('Không thể thêm bình luận.');
    }
  };

  const rootComments = comments.filter((comment) => !comment.parentCommentId);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bình luận</h2>
      <CommentForm onSubmit={handleAddComment} />
      <div className="space-y-6 text-black">
        {rootComments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} comments={comments} currentUser={currentUser} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export default CommentBlog;
