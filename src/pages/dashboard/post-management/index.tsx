import { useState } from "react";
import { LucideSearch, LucideCalendar, LucideUser, LucideTag, LucideChevronDown, LucideChevronUp, LucideX, LucidePlus } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  timestamp: string;
  image: string;
}

const PostDashboard = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<string>("date");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dummyPosts: Post[] = [
    {
      id: 1,
      title: "Getting Started with React and Tailwind",
      content: "Learn how to set up a new project using React and Tailwind CSS. This comprehensive guide covers installation, configuration, and best practices for building modern web applications.",
      author: "John Doe",
      tags: ["React", "Tailwind", "Web Development"],
      timestamp: "2024-01-15T10:30:00",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    },
    {
      id: 2,
      title: "Advanced State Management Patterns",
      content: "Explore advanced state management patterns in React applications. This post covers various approaches including Context API, Redux, and other modern solutions for handling complex application state.",
      author: "Jane Smith",
      tags: ["State Management", "React", "Advanced"],
      timestamp: "2024-01-14T15:45:00",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
      id: 3,
      title: "Responsive Design with Tailwind",
      content: "Master responsive design techniques using Tailwind CSS. Learn how to create beautiful, adaptive layouts that work seamlessly across all device sizes.",
      author: "Mike Johnson",
      tags: ["Tailwind", "CSS", "Responsive"],
      timestamp: "2024-01-13T09:15:00",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8",
    },
  ];

  const sortPosts = (posts: Post[]): Post[] => {
    return [...posts].sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      return 0;
    });
  };

  const filteredPosts = sortPosts(dummyPosts).filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Post Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Add new post"
              >
                <LucidePlus className="mr-2" />
                Add Post
              </button>
              <div className="relative w-full md:w-64">
                <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full" role="table">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={toggleSort}
                      className="flex items-center focus:outline-none"
                      aria-label="Sort by date"
                    >
                      Date
                      {sortOrder === "desc" ? (
                        <LucideChevronDown className="ml-1" />
                      ) : (
                        <LucideChevronUp className="ml-1" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    role="button"
                    tabIndex={0}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                <LucideTag className="mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <LucideUser className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{post.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <LucideCalendar className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" role="dialog">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPost.title}</h2>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-400 hover:text-gray-500"
                      aria-label="Close"
                    >
                      <LucideX className="h-6 w-6" />
                    </button>
                  </div>
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center mb-4">
                    <LucideUser className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedPost.author}</span>
                    <span className="mx-2">•</span>
                    <LucideCalendar className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(selectedPost.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <LucideTag className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700">{selectedPost.content}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDashboard;
