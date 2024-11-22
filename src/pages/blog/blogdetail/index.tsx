import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, fetchAuthorById, fetchRelatedPosts } from '@/lib/api/redux/postSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { Post } from '@/lib/api/types/types';
import CommentBlog from '../comment-blog/CommentBlog';


const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // Selectors
  const post = useSelector((state: RootState) => state.posts.currentPost);
  const author = useSelector((state: RootState) => 
    post ? state.posts.authors[post.authorId._id] : null
  );
  const relatedPosts = useSelector((state: RootState) => state.posts.relatedPosts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  // Fetch post and author data on mount or id change
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để xem bài viết này.");
      navigate("/login");
      return;
    }

    if (id) {
      dispatch(fetchPostById(id))
        .then((result) => {
          // Fetch author only after fetching post
          const postData = result.payload as Post | undefined;
          if (postData && typeof postData.authorId === 'object') {
            dispatch(fetchAuthorById(postData.authorId._id));

            // Fetch related posts based on tags of the current post
            dispatch(fetchRelatedPosts({ tags: postData.tags, excludeId: postData._id }));
          }
        })
        .catch((err) => console.error("Error fetching post data:", err));
    }
  }, [id, dispatch, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {post && (
        <article>
          <img src={post.image} alt={post.title} className="w-full h-80 object-cover object-center" />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-between mb-4">
              {author && (
                <div className="flex items-center">
                  <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold">{author.name}</p>
                    <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-6">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      )}
      <div> 
      <h3 className="text-2xl font-semibold text-white mb-6">Bình luận</h3>
      {post && (
        <CommentBlog 
          postId={post._id} 
          videoId={null} 
          currentUser={author} 
        />
      )}
      
      </div>
   
      {relatedPosts.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost._id}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate(`/blog-detail/${relatedPost._id}`)}
              >
                <img src={relatedPost.image || "https://via.placeholder.com/300"} alt={relatedPost.title} className="w-full h-48 object-cover object-center" />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(relatedPost.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
