import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchAuthorById } from '@/lib/api/redux/postSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { PaginationBlogPage } from '../pagination'; // Import the Pagination component

const BlogSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const authors = useSelector((state: RootState) => state.posts.authors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const postsPerPage = 3; // Define how many posts per page you want
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Blog | LearnUp';
  }, []);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    posts.forEach((post) => {
      if (post.authorId && post.authorId._id && !authors[post.authorId._id]) {
        dispatch(fetchAuthorById(post.authorId._id));
      }
    });
  }, [posts, authors, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowAllPosts(false);
    setCurrentPage(1);
  };

  const handleShowAllPosts = () => {
    setShowAllPosts(true);
    setSearchTerm('');
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const filteredPosts = showAllPosts
    ? posts
    : posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
      });

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginatePosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const uniqueTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <div className="container mx-auto px-[10%] pt-12 ">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Bài Blog mới nhất</h1>

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
      <div className="mb-8 flex flex-wrap gap-2 items-center">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTag(tag === selectedTag ? null : tag);
              setShowAllPosts(false); // When selecting a tag, reset "Show All Posts"
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            } transition-colors duration-300`}
            aria-label={`Filter by ${tag}`}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={handleShowAllPosts}
          className="px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
          aria-label="Show all posts"
        >
          Show All Posts
        </button>
      </div>

      {/* Posts Grid */}
      <div className="space-y-8">
        {paginatePosts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col md:flex-row cursor-pointer"
            onClick={() => navigate(`/blog-detail/${post._id}`)}
          >
            {/* Image */}
            <div className="relative w-full md:w-1/3 h-[220px]">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex-grow flex flex-col bg-gray-50 justify-between max-w-[66%]">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center">
                  <img
                    src={authors[post.authorId._id]?.avatar || 'https://via.placeholder.com/50'}
                    alt={authors[post.authorId._id]?.name || 'Anonymous'}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{authors[post.authorId._id]?.name || 'Anonymous'}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <p className="text-black">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && <p className="text-center text-gray-500 mt-8">No posts found matching your search criteria.</p>}

      {/* Pagination */}
     <div className='py-[2%]'>
     <PaginationBlogPage totalPages={totalPages} currentPage={currentPage} onPageChange={(page: number) => setCurrentPage(page)} />
     </div>
    </div>
  );
};

export default BlogSection;
