// KeyMetricsHeader.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Search, ListFilter } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface FliterDashboardProps {
  selectedMetric: string;
  setSelectedMetric: (value: string) => void;
}

const FliterDashboard: React.FC<FliterDashboardProps> = ({ selectedMetric, setSelectedMetric }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">DashBoard</h2>
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
          <Button className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Input type="text" placeholder="Search..." className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <Button className="ml-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sales">Sales</option>
          <option value="engagement">User Engagement</option>
        </select>
      </div>
    </div>
  );
};

export default FliterDashboard;
