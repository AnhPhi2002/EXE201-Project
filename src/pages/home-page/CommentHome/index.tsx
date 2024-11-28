// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/lib/api/store';
// import { fetchCommentsByPostId } from '@/lib/api/redux/commentSlice';
// import { motion } from 'framer-motion';
// import { Comment } from '@/lib/api/redux/commentSlice';
// import CommentItem from '../../blog/comment-blog/CommentItem';

// const CommentHome: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const commentsFromStore = useSelector((state: RootState) => state.comment.comments);
//   const [comments, setComments] = useState<Comment[]>([]);

//   useEffect(() => {
//     // Fetch comments khi component được mount
//     dispatch(fetchCommentsByPostId('your-post-id')); // Thay 'your-post-id' bằng ID của bài viết
//   }, [dispatch]);

//   useEffect(() => {
//     if (commentsFromStore) {
//       // Lọc và sắp xếp các bình luận chính (không có parentCommentId)
//       const rootComments = commentsFromStore.filter(comment => !comment.parentCommentId);
//       setComments(rootComments);
//     }
//   }, [commentsFromStore]);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   return (
//     <div>
//       <motion.div 
//         id="features" 
//         variants={containerVariants} 
//         initial="hidden" 
//         whileInView="visible" 
//         viewport={{ once: true }} 
//         className="py-20 px-4 md:px-8"
//       >
//         <h2 className="text-4xl font-bold text-center mb-12 text-white">Đánh giá</h2>
//         <div className="space-y-6">
//           {comments.map(comment => (
//             <CommentItem 
//               key={comment._id} 
//               comment={comment} 
//               comments={commentsFromStore} 
//               currentUser={null}  // Dùng dữ liệu người dùng hiện tại nếu cần
//               postId="your-post-id"  // Thay 'your-post-id' bằng ID bài viết
//             />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CommentHome;
