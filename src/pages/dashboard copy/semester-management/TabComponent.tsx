import React, { useState } from 'react';
import DepartmentTable from './DepartmentTable/DepartmentTable';
import SemesterTable from './SemesterTable/SemesterTable';
import SubjectTable from './SubjectTable/SubjectTable';
import ResourceTable from './ResourceTable/ResourceTable';

// Define interfaces for data structures
export interface Department {
  id: string;
  name: string;
}

export interface Semester {
  id: string;
  name: string;
  departmentId: string;
}

export interface Subject {
  id: string;
  name: string;
  semesterId: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  fileUrls?: string[];
  type: 'pdf' | 'video' | 'document';
  allowedRoles?: ('member_free' | 'member_premium')[];
  subject: string;
}

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('departments');
  const [showDepartmentPopover, setShowDepartmentPopover] = useState(false);
  const [showSemesterPopover, setShowSemesterPopover] = useState(false);
  const [showSubjectPopover, setShowSubjectPopover] = useState(false);
  const [showResourcePopover, setShowResourcePopover] = useState(false); // New state for resource popover
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');



  const tabs = [
    { id: 'departments', name: 'Ngành' },
    { id: 'semesters', name: 'Kỳ' },
    { id: 'subjects', name: 'Môn học' },
    { id: 'resources', name: 'Tài liệu' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 border-b">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'hover:border-gray-300 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
      {activeTab === 'departments' && (
          <DepartmentTable
            setShowDepartmentPopover={setShowDepartmentPopover}
            showCreatePopover={showDepartmentPopover}
          />
        )}
        {activeTab === 'semesters' && (
          <SemesterTable
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            setShowSemesterPopover={setShowSemesterPopover}
            showCreatePopover={showSemesterPopover}
          />
        )}
        {activeTab === 'subjects' && (
          <SubjectTable
            selectedDepartment={selectedDepartment}
            selectedSemester={selectedSemester}
            setSelectedDepartment={setSelectedDepartment}
            setSelectedSemester={setSelectedSemester}
            setShowSubjectPopover={setShowSubjectPopover}
            showCreatePopover={showSubjectPopover}
          />
        )}
        {activeTab === 'resources' && (
          <ResourceTable
            selectedDepartment={selectedDepartment}
            selectedSemester={selectedSemester}
            selectedSubject={selectedSubject}
            setSelectedDepartment={setSelectedDepartment}
            setSelectedSemester={setSelectedSemester}
            setSelectedSubject={setSelectedSubject}
            setShowResourcePopover={setShowResourcePopover} // Add missing prop
            showCreatePopover={showResourcePopover} // Add missing prop
          />
        )}
      </div>
    </div>
  );
};

export default TabComponent;
