import React, { useState, useEffect } from "react";
import { Search, Calendar, Eye } from "lucide-react"; // Import Lucide icons
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: {
    name: string;
    image: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  image: string;
  views: number;
}

const BlogSection: React.FC = () => {
  useEffect(() => {
    document.title = "Bài viết| LearnUp"
  }, [])
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState<boolean>(false);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [filterType, setFilterType] = useState<string>("latest");
  const navigate = useNavigate(); // Điều hướng bằng useNavigate

  useEffect(() => {
    const fetchData = async () => {
      const dummyPosts: Post[] = [
        {
          id: "1",
          title: "Understanding Mongoose Schemas",
          content: "Mongoose schemas are powerful tools for defining the structure of your MongoDB documents. In this post, we'll explore how to create and use schemas effectively.",
          authorId: {
            name: "John Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          },
          tags: ["MongoDB", "Mongoose", "Database"],
          createdAt: "2023-06-15T10:00:00Z",
          updatedAt: "2023-06-15T10:00:00Z",
          image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          views: 1500
        },
        {
          id: "2",
          title: "Advanced Mongoose Queries",
          content: "Learn how to write complex queries using Mongoose to efficiently retrieve and manipulate data from your MongoDB database.",
          authorId: {
            name: "Jane Smith",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          },
          tags: ["MongoDB", "Mongoose", "Queries"],
          createdAt: "2023-06-10T14:30:00Z",
          updatedAt: "2023-06-10T14:30:00Z",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          views: 2000
        },
        {
          id: "3",
          title: "Building RESTful APIs with Mongoose",
          content: "Discover best practices for creating robust RESTful APIs using Mongoose and Express.js. We'll cover route handling, middleware, and error management.",
          authorId: {
            name: "Mike Johnson",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          },
          tags: ["API", "Mongoose", "Express"],
          createdAt: "2023-06-05T09:15:00Z",
          updatedAt: "2023-06-05T09:15:00Z",
          image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          views: 1800
        }
      ];

      setPosts(dummyPosts);
      setTags(Array.from(new Set(dummyPosts.flatMap(post => post.tags))));
      setPopularPosts(dummyPosts.sort((a, b) => b.views - a.views).slice(0, 3));
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setShowAllPosts(false);
  };

  const handleShowAllPosts = () => {
    setShowAllPosts(true);
    setSelectedTag(null);
    setSearchTerm("");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const filteredPosts = showAllPosts
    ? posts
    : posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
      });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (filterType === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (filterType === "popular") {
      return b.views - a.views;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-[10%] py-24">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Latest Blog Posts</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          {/* Search Bar */}
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

          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTag === tag ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"} transition-colors duration-300`}
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
            {sortedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col md:flex-row cursor-pointer"
                onClick={() => navigate(`/blogdetail/${post.id}`)} // Điều hướng sang trang chi tiết
              >
                <img src={post.image} alt={post.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <img src={post.authorId.image} alt={post.authorId.name} className="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <p className="font-medium text-gray-800">{post.authorId.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1" />
                          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedPosts.length === 0 && <p className="text-center text-gray-500 mt-8">No posts found matching your search criteria.</p>}
        </div>

        {/* Popular Posts Sidebar */}
        <div className="lg:w-1/4">
          <div className="mb-6">
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="latest">Latest Posts</option>
              <option value="popular">Popular Posts</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-16 text-gray-800">Most Viewed Posts</h2>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{post.authorId.name}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="mr-1" />
                    <span>{post.views} views</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
