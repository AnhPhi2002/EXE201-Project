import { useState } from 'react';
import { Edit2, Trash2, FilePlus } from 'lucide-react';
import UpdateDepartment from './UpdateDepartment';
import CreateDepartment from './CreateDepartment';

interface Department {
  id: string;
  name: string;
}

interface DepartmentTableProps {
  departments: Department[];
  setShowDepartmentPopover: (value: boolean) => void; // Thêm prop này vào
}


const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState(false);
  const [showCreatePopover, setShowCreatePopover] = useState(false); // Thêm state để quản lý popover tạo

  const handleEditClick = (department: Department) => {
    setSelectedDepartment(department);
    setShowUpdatePopover(true); // Hiển thị popover cập nhật khi click vào Edit
  };

  const handleCreateDepartment = (name: string) => {
    // Xử lý tạo department mới ở đây
    console.log('New Department Created:', name);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowCreatePopover(true)} // Hiển thị popover khi nhấn vào Add
        >
          <FilePlus /> Add Department
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{dept.id}</td>
              <td className="px-6 py-4 border-b">{dept.name}</td>
              <td className="px-6 py-4 border-b">
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(dept)}>
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

      {/* Popover tạo department */}
      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateDepartment
              onCreate={handleCreateDepartment}
              onClose={() => setShowCreatePopover(false)} // Đóng popover khi nhấn nút Cancel
            />
          </div>
        </div>
      )}

      {/* Popover cập nhật */}
      {showUpdatePopover && selectedDepartment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateDepartment department={selectedDepartment} onClose={() => setShowUpdatePopover(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
