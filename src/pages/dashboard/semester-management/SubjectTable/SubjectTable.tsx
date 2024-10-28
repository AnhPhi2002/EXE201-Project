import { Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import CreateSubject from "./CreateSubject";
import UpdateSubject from "./UpdateSubject";

interface Department {
  id: string;
  name: string;
}

interface Semester {
  id: string;
  name: string;
  departmentId: string;
}

interface Subject {
  id: string;
  name: string;
  semesterId: string;
}

interface SubjectTableProps {
  departments: Department[];
  semesters: Semester[];
  subjects: Subject[];
  selectedDepartment: string;
  selectedSemester: string;
  setSelectedDepartment: (value: string) => void;
  setSelectedSemester: (value: string) => void;
  setShowSubjectPopover: (value: boolean) => void;
}

const SubjectTable: React.FC<SubjectTableProps> = ({
  departments,
  semesters,
  subjects,
  selectedDepartment,
  selectedSemester,
  setSelectedDepartment,
  setSelectedSemester,
  setShowSubjectPopover,
}) => {
  const [showCreatePopover, setShowCreatePopover] = useState(false);
  const [showUpdatePopover, setShowUpdatePopover] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleShowUpdate = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowUpdatePopover(true);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <select
            className="border p-2 rounded-md"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesters
              .filter(
                (sem) =>
                  !selectedDepartment || sem.departmentId === selectedDepartment
              )
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowCreatePopover(true)}
        >
          <Plus /> Add Subject
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Semester</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects
            .filter(
              (subject) =>
                (!selectedSemester || subject.semesterId === selectedSemester) &&
                (!selectedDepartment ||
                  semesters.find((s) => s.id === subject.semesterId)
                    ?.departmentId === selectedDepartment)
            )
            .map((subject) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{subject.id}</td>
                <td className="px-6 py-4 border-b">{subject.name}</td>
                <td className="px-6 py-4 border-b">
                  {semesters.find((s) => s.id === subject.semesterId)?.name}
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleShowUpdate(subject)}
                    >
                      <Edit2 />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Popover tạo môn học */}
      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateSubject
              departments={departments} // Truyền thêm departments
              semesters={semesters}
              onCreate={(data) => {
                console.log("Tạo môn học mới:", data);
                setShowCreatePopover(false);
              }}
              onClose={() => setShowCreatePopover(false)}
            />
          </div>
        </div>
      )}

      {/* Popover cập nhật môn học */}
      {showUpdatePopover && selectedSubject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateSubject
              departments={departments} // Truyền thêm departments
              subject={selectedSubject}
              semesters={semesters}
              onUpdate={(data) => {
                console.log("Cập nhật môn học:", data);
                setShowUpdatePopover(false);
              }}
              onClose={() => setShowUpdatePopover(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
