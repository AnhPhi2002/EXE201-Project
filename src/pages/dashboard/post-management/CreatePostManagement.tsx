import React, { useState } from 'react';
import { LucidePlusCircle, LucideX } from 'lucide-react';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  timestamp: string;
  image: string;
}

interface CreatePostManagementProps {
  onCreatePost: (newPost: Post) => void;
}

export const CreatePostManagement: React.FC<CreatePostManagementProps> = ({ onCreatePost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    author: string;
    tags: string;
    image: string;
  }>({
    title: '',
    content: '',
    author: '',
    tags: '',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.author) {
      alert('Please fill in all required fields.');
      return;
    }

    const newPost: Post = {
      id: Date.now(), // Generate unique ID
      title: formData.title,
      content: formData.content,
      author: formData.author,
      tags: formData.tags.split(',').map((tag) => tag.trim()), // Split tags into array
      timestamp: new Date().toISOString(),
      image: formData.image || 'https://via.placeholder.com/150', // Fallback image
    };

    onCreatePost(newPost);
    setIsModalOpen(false); // Close modal
    setFormData({ title: '', content: '', author: '', tags: '', image: '' }); // Reset form
  };

  return (
    <div>
      {/* Add Post Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Add new post"
      >
        <LucidePlusCircle className="mr-2" />
        Add Post
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Post</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <LucideX className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
