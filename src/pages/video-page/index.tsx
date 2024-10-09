import React, { useState } from 'react';
import Filter from './filter';
import { PaginationPage } from './pagination';

interface Article {
  id: number;
  code: string;
  title: string;
  description: string;
  bgColor: string;
}

const VideoPage: React.FC = () => {
  // Giả sử bạn có một mảng chứa dữ liệu của các bài viết
  const articles: Article[] = [
    { id: 1, code: "SE392", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#00FF75" },
    { id: 2, code: "IB101", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#4DF4E7" },
    { id: 3, code: "MK392", title: "Standard Three", description: "Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...", bgColor: "#DDFF55" },
    { id: 4, code: "SD392", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#A855F7" },
    { id: 5, code: "SE392", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#00FF75" },
    { id: 6, code: "IB101", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#4DF4E7" },
    { id: 7, code: "MK392", title: "Standard Three", description: "Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...", bgColor: "#DDFF55" },
    { id: 8, code: "SD392", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#A855F7" },
    { id: 9, code: "SE392", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#00FF75" },
    { id: 10, code: "IB101", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#4DF4E7" },
    { id: 11, code: "MK392", title: "Standard Three", description: "Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...", bgColor: "#DDFF55" },
    { id: 12, code: "SD392", title: "Standard Two", description: "Standard 2 builds on the foundations of Standard 1 and includes requirements...", bgColor: "#A855F7" },
    { id: 13, code: "SE393", title: "Standard Four", description: "Standard 4 requires additional requirements for services...", bgColor: "#00FF75" },
    { id: 14, code: "IB102", title: "Standard Two", description: "Standard 2 includes more advanced requirements for care...", bgColor: "#4DF4E7" },
    { id: 15, code: "MK393", title: "Standard Four", description: "This builds on previous standards to offer advanced care requirements...", bgColor: "#DDFF55" },
    { id: 16, code: "SD393", title: "Standard Five", description: "Standard 5 focuses on customer care and requirements...", bgColor: "#A855F7" },
    { id: 17, code: "SE394", title: "Standard Six", description: "This standard introduces new policies for service care...", bgColor: "#00FF75" },
    { id: 18, code: "IB103", title: "Standard Seven", description: "This focuses on long-term care and service requirements...", bgColor: "#4DF4E7" },
    { id: 19, code: "MK394", title: "Standard Eight", description: "Standard 8 offers guidelines for extended care services...", bgColor: "#DDFF55" },
    { id: 20, code: "SD394", title: "Standard Nine", description: "Introducing key updates for quality and care guidelines...", bgColor: "#A855F7" },
    { id: 21, code: "SE395", title: "Standard Ten", description: "Standard 10 includes new revisions for customer service...", bgColor: "#00FF75" },
    { id: 22, code: "IB104", title: "Standard Eleven", description: "Standard 11 highlights critical care elements in services...", bgColor: "#4DF4E7" },
    { id: 23, code: "MK395", title: "Standard Twelve", description: "Offering advanced service requirements for quality...", bgColor: "#DDFF55" },
    { id: 24, code: "SD395", title: "Standard Thirteen", description: "Focuses on introducing new quality policies for care...", bgColor: "#A855F7" },
    { id: 25, code: "SE396", title: "Standard Fourteen", description: "Standard 14 builds on quality requirements for services...", bgColor: "#00FF75" },
    { id: 26, code: "IB105", title: "Standard Fifteen", description: "This standard provides details on advanced care elements...", bgColor: "#4DF4E7" },
    { id: 27, code: "MK396", title: "Standard Sixteen", description: "Standard 16 introduces enhanced policies for service quality...", bgColor: "#DDFF55" },
    { id: 28, code: "SD396", title: "Standard Seventeen", description: "Focusing on care upgrades in long-term services...", bgColor: "#A855F7" },
    { id: 29, code: "SE397", title: "Standard Eighteen", description: "Providing new revisions for quality guidelines in care...", bgColor: "#00FF75" },
    { id: 30, code: "IB106", title: "Standard Nineteen", description: "This standard focuses on critical updates for service policies...", bgColor: "#4DF4E7" },
  ];
  

  const itemsPerPage = 12; // Số lượng bài viết trên mỗi trang
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tính toán số lượng trang
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Lấy bài viết hiển thị cho trang hiện tại
  const currentArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-[10%] py-10">
      <div>
        <Filter />
      </div>
      <div className="text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hiển thị bài viết hiện tại */}
          {currentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-6 rounded-lg shadow-lg group"
            >
              <div
                className="text-black text-xl font-medium py-1 px-3 rounded-full inline-block mb-4"
                style={{ backgroundColor: article.bgColor }}
              >
                {article.code}
              </div>
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-6 clamp-3-lines">{article.description}</p>
              <a
                href="#"
                className="text-purple-600 border border-purple-600 rounded-lg py-2 px-4 inline-block group-hover:bg-purple-600 group-hover:text-white"
              >
                Class Details
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="py-10">
        {/* Pagination */}
        <PaginationPage
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default VideoPage;
