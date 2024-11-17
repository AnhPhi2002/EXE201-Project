import React, { useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  timestamp: string;
  image: string;
}

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

const UpdatePostManagement: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(dummyPosts[0]);
  const [updatedPost, setUpdatedPost] = useState<Post | null>(selectedPost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedPost) {
      const { name, value } = e.target;
      setUpdatedPost((prevPost) => prevPost ? { ...prevPost, [name]: value } : prevPost);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map((tag) => tag.trim());
    setUpdatedPost((prevPost) => prevPost ? { ...prevPost, tags: tagsArray } : prevPost);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Post:', updatedPost);
    // Here, you can add logic to send the updated post data to an API or update it in a database.
  };

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    setUpdatedPost(post);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Post Management</h2>

      <div className="flex gap-4 mb-8">
        <ul className="w-1/3 bg-white p-4 rounded-lg shadow">
          {dummyPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostSelect(post)}
              className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${post.id === selectedPost?.id ? 'bg-blue-100' : ''}`}
            >
              {post.title}
            </li>
          ))}
        </ul>

        {updatedPost && (
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedPost.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={updatedPost.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  rows={5}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={updatedPost.author}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={updatedPost.tags.join(', ')}
                  onChange={handleTagChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePostManagement;
