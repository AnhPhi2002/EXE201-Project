import React, { FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DepartmentItemProps {
  department: any;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const DepartmentItem: FC<DepartmentItemProps> = ({ department, expanded, onToggle, children }) => (
  <div className="rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      aria-expanded={expanded}
    >
      <span className="text-lg font-semibold">{department.name}</span>
      {expanded ? <ChevronUp /> : <ChevronDown />}
    </button>
    {expanded && <div className="p-4 space-y-2">{children}</div>}
  </div>
);

export default DepartmentItem;
