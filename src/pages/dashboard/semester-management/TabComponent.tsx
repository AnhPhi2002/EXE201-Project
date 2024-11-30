import React, { useState } from 'react';
import DepartmentTable from './DepartmentTable/DepartmentTable';
import SemesterTable from './SemesterTable/SemesterTable';
import SubjectTable from './SubjectTable/SubjectTable';
import ResourceTable from './ResourceTable/ResourceTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/api/store';

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
  const { profile } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<string>('departments');
  const [showDepartmentPopover, setShowDepartmentPopover] = useState<boolean>(false);
  const [showSemesterPopover, setShowSemesterPopover] = useState<boolean>(false);
  const [showSubjectPopover, setShowSubjectPopover] = useState<boolean>(false);
  const [showResourcePopover, setShowResourcePopover] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  // Define tabs with corresponding permissions
  const tabs = [
    { id: 'departments', name: 'Ngành', permission: 'manage_departments' },
    { id: 'semesters', name: 'Kỳ', permission: 'manage_semesters' },
    { id: 'subjects', name: 'Môn học', permission: 'manage_subjects' },
    { id: 'resources', name: 'Tài liệu', permission: 'manage_resources' },
  ];

  // Filter tabs that user can access based on permissions
  const allowedTabs = tabs.map((tab) => ({
    ...tab,
    disabled: profile?.role !== 'admin' && !profile?.permissions?.includes(tab.permission),
  }));

  const handleTabClick = (tabId: string) => {
    if (!allowedTabs.find(tab => tab.id === tabId)?.disabled) {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Tab navigation */}
      <div className="mb-6 border-b">
        <div className="flex flex-wrap -mb-px">
          {allowedTabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-block p-4 rounded-t-lg ${activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'hover:border-gray-300 hover:text-gray-600'
              } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled} // Disable tab if the user does not have permission
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
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
            setShowResourcePopover={setShowResourcePopover}
            showCreatePopover={showResourcePopover}
          />
        )}
      </div>
    </div>
  );
};

export default TabComponent;
