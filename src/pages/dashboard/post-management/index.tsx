import React, { useState } from 'react';
import {
  LucideSearch,
  LucideChevronDown,
  LucideChevronUp,
  LucideUser,
  LucideCalendar,
  LucideTrash2,
  LucideEdit,
} from 'lucide-react';
import { CreatePostManagement, Post } from './CreatePostManagement';
import UpdatePostManagement from './UpdatePostManagement';

const PostDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Getting Started with React and Tailwind',
      content: 'Learn how to set up a new project using React and Tailwind CSS.',
      author: 'John Doe',
      tags: ['React', 'Tailwind', 'Web Development'],
      timestamp: '2024-01-15T10:30:00',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Advanced State Management Patterns',
      content: 'Explore advanced state management patterns in React applications.',
      author: 'Jane Smith',
      tags: ['State Management', 'React', 'Advanced'],
      timestamp: '2024-01-14T15:45:00',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<string>('date');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Handle adding a new post
  const handleCreatePost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Handle editing a post
  const handleEditPost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPost(null); // Close edit modal
  };

  // Handle deleting a post
  const handleDeletePost = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortBy === 'title') {
        return sortOrder === 'desc'
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      } else if (sortBy === 'author') {
        return sortOrder === 'desc'
          ? b.author.localeCompare(a.author)
          : a.author.localeCompare(b.author);
      }
      return 0;
    });

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Post Dashboard</h1>
            <div className="flex items-center gap-4">
              <CreatePostManagement onCreatePost={handleCreatePost} />
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

          {/* Sort options */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <label htmlFor="sortBy" className="text-gray-700 font-medium">
                Sort By:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
              </select>
            </div>
            <button onClick={toggleSort} className="flex items-center focus:outline-none" aria-label="Toggle sort order">
              Sort Order: {sortOrder === 'desc' ? <LucideChevronDown /> : <LucideChevronUp />}
            </button>
          </div>

          {/* Posts table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.tags.join(', ')}</div>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Edit post"
                        >
                          <LucideEdit />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Delete post"
                        >
                          <LucideTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit modal */}
          {editingPost && (
            <UpdatePostManagement
              post={editingPost}
              onSave={handleEditPost}
              onCancel={() => setEditingPost(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDashboard;
