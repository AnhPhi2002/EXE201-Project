import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationDashboardPageProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationDashboardPage: React.FC<PaginationDashboardPageProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end items-center mb-4"> {/* Sử dụng justify-end để căn về bên phải */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevious} />
          </PaginationItem>
          {/* Render số trang */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === currentPage}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
