import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Trash2, FilePlus } from 'lucide-react';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchDepartments, createDepartment, deleteDepartment, updateDepartment } from '@/lib/api/redux/departmentSlice';
import CreateDepartment from './CreateDepartment';
import UpdateDepartment from './UpdateDepartment';

interface DepartmentTableProps {
  setShowDepartmentPopover: React.Dispatch<React.SetStateAction<boolean>>;
  showCreatePopover: boolean; // Add prop for visibility of CreateDepartment modal
}

interface Department {
  id: string;
  name: string;
  code: string;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ setShowDepartmentPopover, showCreatePopover }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments, loading, error } = useSelector((state: RootState) => state.departments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleCreateDepartment = (data: { name: string; code: string }) => {
    dispatch(createDepartment(data));
    setShowDepartmentPopover(false); // Close popover after creating department
  };

  const handleDeleteDepartment = (id: string) => {
    dispatch(deleteDepartment(id));
  };

  const handleUpdateDepartment = (data: { id: string; name: string; code: string }) => {
    dispatch(updateDepartment(data));
    setShowUpdatePopover(false);
  };

  const handleEditClick = (department: Department) => {
    setSelectedDepartment(department);
    setShowUpdatePopover(true);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowDepartmentPopover(true)}
        >
          <FilePlus /> Add Department
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Code</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{dept.id}</td>
              <td className="px-6 py-4 border-b">{dept.name}</td>
              <td className="px-6 py-4 border-b">{dept.code || 'N/A'}</td>
              <td className="px-6 py-4 border-b">
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(dept)}>
                    <Edit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteDepartment(dept.id)}>
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render CreateDepartment component when showCreatePopover is true */}
      {showCreatePopover && (
        <CreateDepartment
          onCreate={handleCreateDepartment}
          onClose={() => setShowDepartmentPopover(false)}
        />
      )}

      {/* Render UpdateDepartment component when showUpdatePopover is true */}
      {showUpdatePopover && selectedDepartment && (
        <UpdateDepartment
          department={selectedDepartment}
          onUpdate={handleUpdateDepartment}
          onClose={() => setShowUpdatePopover(false)}
        />
      )}
    </div>
  );
};

export default DepartmentTable;
