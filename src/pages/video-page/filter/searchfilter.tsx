import { useState, KeyboardEvent, ChangeEvent } from 'react';
import SearchIcon from '../../../components/icons/action-icons';

interface SearchFilterProps {
  onSearch: (query: string) => void; // Define the type of the onSearch function
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm); // Trigger the search action when Enter is pressed
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term when the input changes
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
      <SearchIcon icon="search" className="text-gray-500 ml-2" />
      <input
        type="text"
        placeholder="Search Class, Course"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="bg-transparent px-4 py-2 focus:outline-none w-full text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};
