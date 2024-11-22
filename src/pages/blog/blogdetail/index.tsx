import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  fetchAuthorById,
  fetchRelatedPosts,
} from "@/lib/api/redux/postSlice";
import { RootState, AppDispatch } from "@/lib/api/store";
import CommentBlog from "../comment-blog/CommentBlog";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const post = useSelector((state: RootState) => state.posts.currentPost);
  const author = useSelector((state: RootState) =>
    post ? state.posts.authors[post.authorId._id] : null
  );
  const relatedPosts = useSelector(
    (state: RootState) => state.posts.relatedPosts
  );
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để xem bài viết này.");
      navigate("/login");
      return;
    }

    if (id) {
      dispatch(fetchPostById(id)).then((result) => {
        const postData = result.payload;
        if (postData && typeof postData.authorId === "object") {
          dispatch(fetchAuthorById(postData.authorId._id));
          dispatch(
            fetchRelatedPosts({ tags: postData.tags, excludeId: postData._id })
          );
        }
      });
    }
  }, [id, dispatch, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className=" min-h-screen text-white">
      <div className="container mx-auto px-[10%] ">
        {post && (
          <article className="bg-white rounded-b-3xl shadow-lg overflow-hidden text-gray-800">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center mb-6">
                {author && (
                  <div className="flex items-center">
                    <img
                      src={author.avatar || "https://via.placeholder.com/50"}
                      alt={author.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {author.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                {post.content}
              </p>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-300 hover:bg-blue-300 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        )}

        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-6">Bình luận</h3>
          {post && (
            <CommentBlog
              postId={post._id}
              videoId={null}
              currentUser={author}
            />
          )}
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300"
                  onClick={() => navigate(`/blog-detail/${relatedPost._id}`)}
                >
                  <img
                    src={relatedPost.image || "https://via.placeholder.com/300"}
                    alt={relatedPost.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(relatedPost.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
