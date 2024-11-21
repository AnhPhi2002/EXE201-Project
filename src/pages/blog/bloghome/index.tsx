import React, { useEffect, useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchAuthorById } from '@/lib/api/redux/postSlice';
import { RootState, AppDispatch } from '@/lib/api/store';

const BlogSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const authors = useSelector((state: RootState) => state.posts.authors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Fetch authors based on post data
  useEffect(() => {
    posts.forEach((post) => {
      if (post.authorId && post.authorId._id && !authors[post.authorId._id]) {
        dispatch(fetchAuthorById(post.authorId._id));
      }
    });
  }, [posts, authors, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Extract unique tags from posts
  const uniqueTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  // Limit tags to show initially
  const TAG_LIMIT = 5; // Change this number as needed
  const visibleTags = showAllTags ? uniqueTags : uniqueTags.slice(0, TAG_LIMIT);

  return (
    <div className="container mx-auto px-[10%] py-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Latest Blog Posts</h1>
      
      {/* Search bar */}
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          aria-label="Search posts"
        />
        <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-xl" />
      </div>

      {/* Tags */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-4 py-2 rounded-full border ${
              tag === selectedTag
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
        {uniqueTags.length > TAG_LIMIT && !showAllTags && (
          <button
            onClick={() => setShowAllTags(true)}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 border border-gray-300"
          >
            ...
          </button>
        )}
        {showAllTags && (
          <button
            onClick={() => setShowAllTags(false)}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 border border-gray-300"
          >
            Show Less
          </button>
        )}
      </div>

      {/* Filtered posts */}
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col md:flex-row cursor-pointer"
            onClick={() => navigate(`/blog-detail/${post._id}`)}
          >
            <img src={post.image} alt={post.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center mb-4">
                  {post.authorId ? (
                    <>
                      <img
                        src={authors[post.authorId._id]?.avatar || 'https://via.placeholder.com/50'}
                        alt={authors[post.authorId._id]?.name || 'Author Ẩn danh'}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{authors[post.authorId._id]?.name || 'Author Ẩn danh'}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1" />
                          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">Author Ẩn danh</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No posts found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
