import { FC } from 'react';

interface SubjectItemProps {
  subject: any;
  onClick: () => void;
}

const SubjectItem: FC<SubjectItemProps> = ({ subject, onClick }) => (
  <div className="pl-3">
    <button
      onClick={onClick}
      className="text-left text-purple-700 hover:underline hover:text-purple-900 transition-colors duration-150"
    >
      {subject.name}
    </button>
  </div>
);

export default SubjectItem;
