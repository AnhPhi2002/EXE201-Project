import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Trash2, FilePlus } from 'lucide-react';
import UpdateDepartment from './UpdateDepartment';
import CreateDepartment from './CreateDepartment';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchDepartments, createDepartment, deleteDepartment, updateDepartment } from '@/lib/api/redux/departmentSlice';

interface Department {
  id: string;
  name: string;
  code: string;
}

const DepartmentTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments, loading, error } = useSelector((state: RootState) => state.departments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState(false);
  const [showCreatePopover, setShowCreatePopover] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleCreateDepartment = (data: { name: string; code: string }) => {
    dispatch(createDepartment(data));
    setShowCreatePopover(false);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowCreatePopover(true)}
        >
          <FilePlus /> Add Department
        </button>
      </div>

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

      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateDepartment
              onCreate={handleCreateDepartment}
              onClose={() => setShowCreatePopover(false)}
            />
          </div>
        </div>
      )}

      {showUpdatePopover && selectedDepartment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateDepartment
              department={selectedDepartment}
              onUpdate={handleUpdateDepartment}
              onClose={() => setShowUpdatePopover(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
