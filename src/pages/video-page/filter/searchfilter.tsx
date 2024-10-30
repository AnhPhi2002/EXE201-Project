import { useState, KeyboardEvent, ChangeEvent } from 'react';
import SearchIcon from '../../../components/icons/action-icons';

interface SearchFilterProps {
  onSearch: (query: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 500);
      onSearch(searchTerm);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`flex items-center bg-white rounded-full p-1 border border-slate-300 transition-transform duration-300 
      ${isFocused ? 'scale-105' : 'scale-100'} 
      ${isSubmitted ? 'animate-pulse' : ''}`}
    >
      <SearchIcon icon="search" className="text-gray-500 ml-2" />
      <input
        type="text"
        placeholder="Search Class, Course"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="bg-transparent px-4 py-2 focus:outline-none w-full text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};
