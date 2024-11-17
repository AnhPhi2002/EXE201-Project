import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Trash2, FilePlus } from 'lucide-react';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchDepartments, createDepartment, deleteDepartment, updateDepartment } from '@/lib/api/redux/departmentSlice';
import CreateDepartment from './CreateDepartment';
import UpdateDepartment from './UpdateDepartment';
import { PaginationDashboardPage } from '../../pagination';
import { toast } from 'sonner';

interface DepartmentTableProps {
  setShowDepartmentPopover: React.Dispatch<React.SetStateAction<boolean>>;
  showCreatePopover: boolean;
}

interface Department {
  id: string;
  name: string;
  code: string;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ setShowDepartmentPopover, showCreatePopover }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleCreateDepartment = (data: { name: string; code: string }) => {
    dispatch(createDepartment(data));
    setShowDepartmentPopover(false);
  };

  const handleDeleteDepartment = (id: string) => {
    dispatch(deleteDepartment(id))
      .unwrap()
      .then(() => {
        toast.success('Xóa ngành thành công!');
      })
      .catch((error) => {
        toast.error('Xóa ngành thất bại. Vui lòng thử lại.');
        console.error('Lỗi khi xóa ngành:', error);
      });
  };

  const handleUpdateDepartment = async (data: { id: string; name: string; code: string }): Promise<void> => {
    await dispatch(updateDepartment(data)).unwrap();
    setShowUpdatePopover(false);
  };

  const handleEditClick = (department: Department) => {
    setSelectedDepartment(department);
    setShowUpdatePopover(true);
  };

  // Tính toán departments hiện tại dựa trên trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDepartments = departments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowDepartmentPopover(true)}
        >
          <FilePlus /> Thêm Ngành
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Tên Ngành</th>
            <th className="px-6 py-3 border-b text-left">Mã Ngành</th>
            <th className="px-6 py-3 border-b text-left">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {currentDepartments.map((dept) => (
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

      {/* Render PaginationDashboardPage */}
      <div className="flex justify-end mt-4">
        <PaginationDashboardPage
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {showCreatePopover && (
        <CreateDepartment
          onCreate={handleCreateDepartment}
          onClose={() => setShowDepartmentPopover(false)}
          existingDepartmentNames={departments.map(dept => dept.name)}
          existingDepartmentCodes={departments.map(dept => dept.code)}
        />
      )}

      {showUpdatePopover && selectedDepartment && (
        <UpdateDepartment
          department={selectedDepartment}
          onUpdate={handleUpdateDepartment}
          onClose={() => setShowUpdatePopover(false)}
          existingDepartments={departments} // Truyền danh sách ngành hiện có
        />
      )}
    </div>
  );
};

export default DepartmentTable;
