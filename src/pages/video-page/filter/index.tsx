import { CreateFilter } from "./createfilter";
import { SearchFilter } from "./searchfilter";
import { SortFilter } from "./sortfilter";

export const Filter = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Add search logic here (e.g., filtering a list or making an API request)
  };

  return (
    <div className="flex items-center space-x-8 mb-16 py-10 px-[10%] bg-slate-300">
      <div>
        <SearchFilter onSearch={handleSearch} /> {/* Pass the required prop here */}
      </div>
      <div>
        <CreateFilter />
      </div>
      <div>
        <SortFilter />
      </div>
    </div>
  );
};

export default Filter;
