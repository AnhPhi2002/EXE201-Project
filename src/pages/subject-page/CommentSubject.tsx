import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { User, Reply, Edit, Trash2, Image as ImageIcon, ThumbsUp, ThumbsDown } from 'lucide-react'; // Sử dụng Lucide icon
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'; // Thêm các thành phần form
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'; // Sử dụng Select từ components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Cập nhật interface Comment với thuộc tính userReaction
interface Author {
  _id: string;
  name: string;
}

interface Comment {
  _id: string;
  authorId: Author;
  content: string;
  createdAt: Date;
  images?: string[];
  likes: number;
  dislikes: number;
  userReaction: 'likes' | 'dislikes' | null; // Thêm thuộc tính userReaction
}

const CommentSection: React.FC = () => {
  // Sử dụng hook useForm từ react-hook-form
  const methods = useForm<{ comment: string; image: string }>({
    defaultValues: {
      comment: '',
      image: '',
    },
  });

  // Tạo danh sách comments ban đầu
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: '1',
      authorId: { _id: 'user1', name: 'John Doe' },
      content: 'This is a great post! Thanks for sharing.',
      createdAt: new Date('2023-06-10T10:00:00'),
      images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'],
      likes: 5,
      dislikes: 10,
      userReaction: null, // Chưa có phản ứng
    },
    {
      _id: '2',
      authorId: { _id: 'user2', name: 'Jane Smith' },
      content: 'I have a question about this topic. Can you elaborate more?',
      createdAt: new Date('2023-06-11T14:30:00'),
      likes: 5,
      dislikes: 10,
      userReaction: null, // Chưa có phản ứng
    },
  ]);

  // Hàm để xử lý khi người dùng click vào "Thumbs Up" hoặc "Thumbs Down"
  const handleReaction = (commentId: string, reaction: 'likes' | 'dislikes') => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              userReaction: comment.userReaction === reaction ? null : reaction, // Thay đổi phản ứng
              likes: reaction === 'likes' ? comment.likes + 1 : comment.likes - (comment.userReaction === 'likes' ? 1 : 0),
              dislikes: reaction === 'dislikes' ? comment.dislikes + 1 : comment.dislikes - (comment.userReaction === 'dislikes' ? 1 : 0),
            }
          : comment,
      ),
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-6xl mx-auto  flex">
        <div className="flex-grow pr-4">
          {/* Bọc form trong FormProvider */}
          <form className="mb-8" onSubmit={methods.handleSubmit((data) => console.log(data))}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                  <AvatarFallback>CD</AvatarFallback> {/* Hiển thị ký tự đầu tên nếu không có ảnh */}
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                  <FormField
                    control={methods.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            rows={3}
                            name="comment"
                            id="comment"
                            className="block w-full py-3 px-4 border-0 resize-none focus:outline-none sm:text-sm"
                            placeholder="Add a comment..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="py-2 bg-white">
                    <div className="flex items-center justify-between px-3">
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={methods.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                onClick={() => {
                                  field.onChange('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60');
                                }}
                              >
                                <ImageIcon className="mr-2" />
                                Add Image
                              </button>
                            </FormItem>
                          )}
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-8">
            {' '}
            {/* Tăng khoảng cách giữa các comment */}
            {comments.map((comment) => (
              <div key={comment._id} className="flex space-x-6">
                {' '}
                {/* Tăng khoảng cách giữa avatar và nội dung */}
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                  <AvatarFallback>CD</AvatarFallback> {/* Hiển thị ký tự đầu tên nếu không có ảnh */}
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{comment.authorId.name}</h3> {/* Tăng cỡ chữ */}
                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="mt-2 text-base text-gray-700">
                    {' '}
                    {/* Tăng cỡ chữ nội dung comment */}
                    <p>{comment.content}</p>
                    {comment.images && comment.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {' '}
                        {/* Dùng grid để bố trí hình ảnh */}
                        {comment.images.map((image, index) => (
                          <img key={index} src={image} alt={`Comment image ${index + 1}`} className="h-32 w-32 object-cover rounded-lg" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-6">
                    <button className="text-base text-gray-500 hover:text-gray-700 flex items-center">
                      <Reply className="inline mr-1" />
                      <span>Reply</span>
                    </button>
                    <button className="text-base text-gray-500 hover:text-gray-700 flex items-center">
                      <Edit className="inline mr-1" />
                      <span>Edit</span>
                    </button>
                    <button className="text-base text-gray-500 hover:text-gray-700 flex items-center">
                      <Trash2 className="inline mr-1" />
                      <span>Delete</span>
                    </button>
                    <button
                      className={`text-base flex items-center ${comment.userReaction === 'likes' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-700`}
                      onClick={() => handleReaction(comment._id, 'likes')}
                    >
                      <ThumbsUp className="inline mr-1" />
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      className={`text-base flex items-center ${comment.userReaction === 'dislikes' ? 'text-red-500' : 'text-gray-500'} hover:text-red-700`}
                      onClick={() => handleReaction(comment._id, 'dislikes')}
                    >
                      <ThumbsDown className="inline mr-1" />
                      <span>{comment.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-64 ml-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">Filter Comments</h3>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter Options</SelectLabel>
                  <SelectItem value="all" className="hover:bg-indigo-100 hover:text-indigo-800">
                    All Comments
                  </SelectItem>
                  <SelectItem value="images" className="hover:bg-indigo-100 hover:text-indigo-800">
                    With Images
                  </SelectItem>
                  <SelectItem value="liked" className="hover:bg-indigo-100 hover:text-indigo-800">
                    Most Liked
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default CommentSection;
