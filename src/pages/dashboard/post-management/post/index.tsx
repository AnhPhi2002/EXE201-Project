import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addPost, updatePost, deletePost, fetchAuthorById } from '@/lib/api/redux/postSlice';
import { RootState, Post } from '@/lib/api/types/types';
import { LucideSearch, LucideChevronDown, LucideChevronUp, LucideTrash2, LucideEdit } from 'lucide-react';
import { CreatePostManagement } from '../CreatePostManagement';
import UpdatePostManagement from '../UpdatePostManagement';
import { updatePostState } from '@/lib/api/redux/postSlice';
import { PaginationDashboardPage } from '../../pagination';
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component in your UI components

const PostDashboard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { posts, loading, authors } = useSelector((state: RootState) => state.posts);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Thêm trạng thái phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Số lượng bài viết trên mỗi trang

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Fetch author nếu chưa có trong state authors
  useEffect(() => {
    posts.forEach((post) => {
      if (post.authorId?._id && !authors[post.authorId._id]) {
        dispatch(fetchAuthorById(post.authorId._id));
      }
    });
  }, [posts, authors, dispatch]);

  const handleCreatePost = async (newPost: Partial<Post>) => {
    try {
      const result = await dispatch(addPost(newPost)).unwrap();

      // Fetch thông tin tác giả ngay sau khi tạo bài viết
      if (result.authorId?._id) {
        const author = await dispatch(fetchAuthorById(result.authorId._id)).unwrap();

        // Cập nhật state bài viết với thông tin tác giả đầy đủ
        dispatch(
          updatePostState({
            id: result._id,
            post: {
              ...result,
              authorId: author,
            },
          }),
        );
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditPost = async (updatedPost: Partial<Post>) => {
    if (updatedPost._id) {
      await dispatch(updatePost({ id: updatedPost._id, post: updatedPost }));
      setEditingPost(null); // Đóng modal chỉnh sửa
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await dispatch(deletePost(id));
    }
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  // Xử lý tìm kiếm và sắp xếp
  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (authors[post.authorId?._id]?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return sortOrder === 'desc' ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'title') {
        return sortOrder === 'desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
      } else if (sortBy === 'tags') {
        const aTags = a.tags.join(', ');
        const bTags = b.tags.join(', ');
        return sortOrder === 'desc' ? bTags.localeCompare(aTags) : aTags.localeCompare(bTags);
      }
      return 0;
    });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Khi tìm kiếm hoặc sắp xếp thay đổi, reset trang về 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, sortOrder]);

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
              <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-lg p-2">
                <option value="createdAt">Date</option>
                <option value="title">Title</option>
                <option value="tags">Tags</option>
              </select>
            </div>
            <button onClick={toggleSort} className="flex items-center focus:outline-none">
              Sort Order: {sortOrder === 'desc' ? <LucideChevronDown /> : <LucideChevronUp />}
            </button>
          </div>
          {/* Posts table */}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Post</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Tags</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentPosts.length > 0 ? (
                      currentPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {post.image && <img src={post.image} alt={post.title} className="h-10 w-10 rounded-lg object-cover" />}
                              <div className="ml-4 max-w-xs truncate">
                                <div className="text-sm font-medium text-gray-900 truncate" title={post.title}>
                                  {post.title}
                                </div>
                                <div className="text-sm text-gray-500 truncate" title={post.content}>
                                  {post.content}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900">{authors[post.authorId?._id]?.name || 'Loading...'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {(post.tags || []).map((tag, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 rounded-full text-sm py-1 px-3">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900">{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => setEditingPost(post)} className="text-blue-600 hover:text-blue-800">
                                <LucideEdit />
                              </button>
                              <button onClick={() => handleDeletePost(post._id)} className="text-red-600 hover:text-red-800">
                                <LucideTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No posts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end items-center mt-5">
                <PaginationDashboardPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
              </div>
            </>
          )}
          {/* Modal chỉnh sửa */}
          {editingPost && <UpdatePostManagement post={editingPost} onSave={handleEditPost} onCancel={() => setEditingPost(null)} />}
        </div>
      </div>
    </div>
  );
};

export default PostDashboard;
