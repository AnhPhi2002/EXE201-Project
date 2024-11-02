import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchSemesters, createSemester, updateSemester, deleteSemester } from '@/lib/api/redux/semesterSlice';
import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
import CreateSemester from './CreateSemester';
import UpdateSemester from './UpdateSemester';

interface SemesterTableProps {
  setShowSemesterPopover: React.Dispatch<React.SetStateAction<boolean>>;
  showCreatePopover: boolean;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
}

interface Semester {
  id: string;
  name: string;
  department: string;
}
// 
const SemesterTable: React.FC<SemesterTableProps> = ({ setShowSemesterPopover, showCreatePopover, selectedDepartment, setSelectedDepartment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { semesters } = useSelector((state: RootState) => state.semesters);
  const { departments } = useSelector((state: RootState) => state.departments);

  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchSemesters(null));
  }, [dispatch]);

  const handleCreateSemester = (data: { name: string; departmentId: string }) => {
    dispatch(createSemester(data))
      .unwrap()
      .then(() => {
        setShowSemesterPopover(false);
        dispatch(fetchSemesters(null));
      })
      .catch((error) => {
        console.error('Error creating semester:', error);
      });
  };

  const handleUpdateSemester = (data: { id: string; name: string; departmentId: string }) => {
    dispatch(updateSemester(data))
      .unwrap()
      .then(() => {
        setShowUpdatePopover(false);
        dispatch(fetchSemesters(null));
      })
      .catch((error) => {
        console.error('Error updating semester:', error);
      });
  };

  const handleDeleteSemester = (semesterId: string) => {
    dispatch(deleteSemester(semesterId))
      .unwrap()
      .then(() => dispatch(fetchSemesters(null)))
      .catch((error) => {
        console.error('Error deleting semester:', error);
      });
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between mb-4">
        <select className="border p-2 rounded-md" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => setShowSemesterPopover(true)}>
          <Plus /> Add Semester
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Semester</th>
            <th className="px-6 py-3 border-b text-left">Department</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {semesters
            .filter((semester) => (selectedDepartment ? semester.department === selectedDepartment : true))
            .map((semester) => {
              const departmentName = departments.find((dept) => dept.id === semester.department)?.name || 'N/A';
              return (
                <tr key={semester.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{semester.id}</td>
                  <td className="px-6 py-4 border-b">{semester.name}</td>
                  <td className="px-6 py-4 border-b">{departmentName}</td>
                  <td className="px-6 py-4 border-b">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setSelectedSemester(semester);
                          setShowUpdatePopover(true);
                        }}
                      >
                        <Edit2 />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteSemester(semester.id)}>
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateSemester departments={departments} onCreate={handleCreateSemester} onClose={() => setShowSemesterPopover(false)} />
          </div>
        </div>
      )}

      {showUpdatePopover && selectedSemester && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateSemester semester={selectedSemester} onUpdate={handleUpdateSemester} onClose={() => setShowUpdatePopover(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterTable;
