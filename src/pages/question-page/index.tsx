import React, { useState } from 'react';
import Filter from './filter';
import { PaginationPage } from './pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar từ shadcn/ui

interface Article {
  id: number;
  code: string;
  title: string;
  description: string;
  bgColor: string;
  author: string;
  avatarUrl: string;
}

const QuestionPage: React.FC = () => {
  // Giả sử bạn có một mảng chứa dữ liệu của các bài viết
  const articles: Article[] = [
    {
      id: 1,
      code: 'SE392',
      title: 'Standard Two',
      description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements...',
      bgColor: '#00FF75',
      author: 'Alice',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      code: 'IB101',
      title: 'Standard Two',
      description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements...',
      bgColor: '#4DF4E7',
      author: 'Bob',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      code: 'MK392',
      title: 'Standard Three',
      description: 'Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...',
      bgColor: '#DDFF55',
      author: 'Charlie',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      code: 'SD392',
      title: 'Standard Two',
      description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements...',
      bgColor: '#A855F7',
      author: 'David',
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      code: 'SE392',
      title: 'Standard Two',
      description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements...',
      bgColor: '#00FF75',
      author: 'Eve',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 6,
      code: 'IB101',
      title: 'Standard Two',
      description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements...',
      bgColor: '#4DF4E7',
      author: 'Frank',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
    },
    {
      id: 7,
      code: 'MK392',
      title: 'Standard Three',
      description: 'Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...',
      bgColor: '#DDFF55',
      author: 'Grace',
      avatarUrl: 'https://i.pravatar.cc/150?img=7',
    },
    {
      id: 8,
      code: 'SD392',
      title: 'Standard Two',
      description: 'Standard 2 builds on the foundations of Standard 1 and includes requirements...',
      bgColor: '#A855F7',
      author: 'Hank',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
    },
  ];

  const itemsPerPage = 12; // Số lượng bài viết trên mỗi trang
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tính toán số lượng trang
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Lấy bài viết hiển thị cho trang hiện tại
  const currentArticles = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white min-h-screen px-[10%]">
      <div>
        <Filter />
      </div>
      <div className=" my-4">
        <span className="text-3xl font-semibold text-black tracking-wider uppercase">Giải Ngố</span>
      </div>
      <div className="text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentArticles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg group px-[10%]">
              <div className="flex items-center mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={article.avatarUrl} alt={article.author} />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-gray-700">{article.author}</span>
                <div className="flex items-center ml-auto">
                  <div
                    className="text-black text-sm font-medium py-1 px-2 rounded-full inline-block min-w-max flex items-center justify-center"
                    style={{ backgroundColor: article.bgColor }}
                  >
                    {article.code}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-6 clamp-3-lines">{article.description}</p>
              <a href="#" className="text-purple-600 border border-purple-600 rounded-lg py-2 px-4 inline-block group-hover:bg-purple-600 group-hover:text-white">
                Class Details
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="py-10">
        {/* Pagination */}
        <PaginationPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default QuestionPage;
