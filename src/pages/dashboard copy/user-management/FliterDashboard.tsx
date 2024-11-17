import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Search, ListFilter} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateUser } from './CreateUser';

// Định nghĩa kiểu props
interface FliterDashboardProps {
  selectedMetric: string;
  setSelectedMetric: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onExport: () => void; // Thêm prop onExport
}

const FliterDashboard: React.FC<FliterDashboardProps> = ({
  selectedMetric,
  setSelectedMetric,
  searchTerm,
  setSearchTerm,
  onExport, // Nhận prop onExport
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

           <CreateUser /> {/* Thêm component UpdateUser */}
           
          <Button className="flex items-center bg-green-600" onClick={onExport}>
            <Download className="h-5 w-5 mr-2" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Input
            type="text"
            value={searchTerm} // Thêm giá trị tìm kiếm
            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
            placeholder="Search..."
            className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="ml-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="user_premium">User Premium</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FliterDashboard;
