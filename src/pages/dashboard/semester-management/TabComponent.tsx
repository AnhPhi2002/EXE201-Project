import React, { useState } from "react";
import DepartmentTable from "./DepartmentTable/DepartmentTable";
import SemesterTable from "./SemesterTable/SemesterTable";
import SubjectTable from "./SubjectTable/SubjectTable";
import ResourceTable from "./ResourceTable/ResourceTable";

// Định nghĩa các kiểu dữ liệu (interfaces)
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
  description: string;
  fileUrls: string[];
  type: string;
  subject: string;
  allowedRoles: string[];
}

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Dữ liệu mẫu
  const departments: Department[] = [
    { id: "1", name: "SE" },
    { id: "2", name: "CS" },
    { id: "3", name: "SA" },
  ];

  const semesters: Semester[] = [
    { id: "1", name: "Kỳ 1", departmentId: "1" },
    { id: "2", name: "Kỳ 2", departmentId: "1" },
    { id: "3", name: "Kỳ 3", departmentId: "2" },
  ];

  const subjects: Subject[] = [
    { id: "1", name: "SWD", semesterId: "1" },
    { id: "2", name: "ENS", semesterId: "1" },
    { id: "3", name: "ADD", semesterId: "2" },
    { id: "4", name: "CAS", semesterId: "3" },
  ];

  const resources: Resource[] = [
    {
      id: "1",
      title: "Math-PDF",
      description: "Mathematics course material",
      fileUrls: ["math.pdf"],
      type: "pdf",
      subject: "1",
      allowedRoles: ["member_free"],
    },
    {
      id: "2",
      title: "Programming-Video",
      description: "Programming video lecture",
      fileUrls: ["programming.mp4"],
      type: "video",
      subject: "2",
      allowedRoles: ["member_premium"],
    },
  ];

  const tabs = [
    { id: "departments", name: "Ngành" },
    { id: "semesters", name: "Kỳ" },
    { id: "subjects", name: "Môn học" },
    { id: "resources", name: "Resource" },
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
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "hover:border-gray-300 hover:text-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "departments" && (
          <DepartmentTable
          departments={departments}
          setShowDepartmentPopover={() => {}}
        />
        
        )}
        {activeTab === "semesters" && (
         <SemesterTable
         departments={departments}
         semesters={semesters}
         selectedDepartment={selectedDepartment}
         setSelectedDepartment={setSelectedDepartment}
         setShowSemesterPopover={() => {}}
       />
        )}
        {activeTab === "subjects" && (
         <SubjectTable
         departments={departments}
         semesters={semesters}
         subjects={subjects}
         selectedDepartment={selectedDepartment}
         selectedSemester={selectedSemester}
         setSelectedDepartment={setSelectedDepartment}
         setSelectedSemester={setSelectedSemester}
         setShowSubjectPopover={() => {}}
       />
        )}
        {activeTab === "resources" && (
          <ResourceTable
            departments={departments}
            semesters={semesters}
            subjects={subjects}
            resources={resources}
            selectedDepartment={selectedDepartment}
            selectedSemester={selectedSemester}
            selectedSubject={selectedSubject}
            setSelectedDepartment={setSelectedDepartment}
            setSelectedSemester={setSelectedSemester}
            setSelectedSubject={setSelectedSubject}
          />
        )}
      </div>
    </div>
  );
};

export default TabComponent;
