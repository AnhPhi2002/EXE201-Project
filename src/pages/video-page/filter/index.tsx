import { CreateFilter } from "./createfilter";
import { SearchFilter } from "./searchfilter";
import { SortFilter } from "./sortfilter";

export const Filter = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Add search logic here (e.g., filtering a list or making an API request)
  };

  return (
    <div className="flex items-center justify-between mb-16 py-10 ">
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
