import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import CreateSubject from './CreateSubject';
import UpdateSubject from './UpdateSubject';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
import { fetchSemesters } from '@/lib/api/redux/semesterSlice';
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from '@/lib/api/redux/subjectSlice';

interface SubjectTableProps {
  setShowSubjectPopover: React.Dispatch<React.SetStateAction<boolean>>;
  showCreatePopover: boolean;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
}

interface Subject {
  id: string;
  name: string;
  semester: string;
  description: string; // Ensure description is included
}

const SubjectTable: React.FC<SubjectTableProps> = ({
  setShowSubjectPopover,
  showCreatePopover,
  selectedDepartment,
  setSelectedDepartment,
  selectedSemester,
  setSelectedSemester,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const { semesters } = useSelector((state: RootState) => state.semesters);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchSemesters());
    dispatch(fetchSubjects(null));
  }, [dispatch]);

  const handleCreateSubject = (data: { name: string; semesterId: string; description: string }) => {
    const subjectData = { name: data.name, semester: data.semesterId, description: data.description }; // Include description
    dispatch(createSubject(subjectData))
      .unwrap()
      .then(() => {
        setShowSubjectPopover(false);
        dispatch(fetchSubjects(null));
      })
      .catch((error) => {
        console.error('Error creating subject:', error);
      });
  };

  const handleUpdateSubject = (data: { id: string; name: string; semester: string; description: string }) => {
    dispatch(updateSubject(data))
      .unwrap()
      .then(() => {
        setShowUpdatePopover(false);
        dispatch(fetchSubjects(null));
      })
      .catch((error) => {
        console.error('Error updating subject:', error);
      });
  };

  const handleDeleteSubject = (subjectId: string) => {
    dispatch(deleteSubject(subjectId))
      .unwrap()
      .then(() => dispatch(fetchSubjects(null)))
      .catch((error) => {
        console.error('Error deleting subject:', error);
      });
  };

  const getSemesterName = (semester: string) => {
    const semesterObj = semesters.find((s) => s.id === semester);
    return semesterObj ? semesterObj.name : 'N/A';
  };

  const getDepartmentNameBySemester = (semester: string) => {
    const semesterObj = semesters.find((s) => s.id === semester);
    if (semesterObj) {
      const department = departments.find((d) => d.id === semesterObj.department);
      return department ? department.name : 'N/A';
    }
    return 'N/A';
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      (!selectedSemester || subject.semester === selectedSemester) &&
      (!selectedDepartment || semesters.find((s) => s.id === subject.semester)?.department === selectedDepartment)
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <select className="border p-2 rounded-md" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select className="border p-2 rounded-md" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {semesters
              .filter((sem) => !selectedDepartment || sem.department === selectedDepartment)
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
          </select>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => setShowSubjectPopover(true)}>
          <Plus /> Add Subject
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Semester</th>
            <th className="px-6 py-3 border-b text-left">Department</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map((subject) => (
            <tr key={subject.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{subject.id}</td>
              <td className="px-6 py-4 border-b">{subject.name}</td>
              <td className="px-6 py-4 border-b">{getSemesterName(subject.semester)}</td>
              <td className="px-6 py-4 border-b">{getDepartmentNameBySemester(subject.semester)}</td>
              <td className="px-6 py-4 border-b">
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedSubject(subject);
                      setShowUpdatePopover(true);
                    }}
                  >
                    <Edit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteSubject(subject.id)}>
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateSubject 
              departments={departments} 
              semesters={semesters} 
              onCreate={handleCreateSubject} 
              onClose={() => setShowSubjectPopover(false)} 
            />
          </div>
        </div>
      )}

      {showUpdatePopover && selectedSubject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateSubject 
              subject={selectedSubject} 
              departments={departments} 
              semesters={semesters} 
              onUpdate={handleUpdateSubject} 
              onClose={() => setShowUpdatePopover(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
