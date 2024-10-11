import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SortFilter = () => {
  return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sắp xếp bởi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Sorting Options</SelectLabel> */}
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
