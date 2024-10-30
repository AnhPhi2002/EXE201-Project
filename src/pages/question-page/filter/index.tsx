import React from 'react';
import { CreateFilter } from "./createfilter";
import { SearchFilter } from "./searchfilter";
import { SortFilter } from "./sortfilter";

export const Filter: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="sticky top-0 flex items-center justify-between mb-2 py-5 z-40">
      <div className="w-2/4">
        <SearchFilter onSearch={handleSearch} />
      </div>
      <div className="flex items-center space-x-4">
        <CreateFilter />
        <SortFilter />
      </div>
    </div>
  );
};

export default Filter;
