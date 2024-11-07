import React, { FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SemesterItemProps {
  semester: any;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SemesterItem: FC<SemesterItemProps> = ({ semester, expanded, onToggle, children }) => (
  <div className="border-purple-200 rounded-lg">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors duration-150 focus:outline-none"
    >
      <span className="font-medium">{semester.name}</span>
      {expanded ? <ChevronUp /> : <ChevronDown />}
    </button>
    {expanded && <div className="p-3 space-y-1">{children}</div>}
  </div>
);

export default SemesterItem;
