import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SortFilter: React.FC = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sắp xếp bởi" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="price_asc">Price: Low to High</SelectItem>
          <SelectItem value="price_desc">Price: High to Low</SelectItem>
          <SelectItem value="popularity">Most Popular</SelectItem>
          <SelectItem value="rating">Top Rated</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
