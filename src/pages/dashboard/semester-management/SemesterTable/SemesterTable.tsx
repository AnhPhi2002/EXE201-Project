import { Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import CreateSemester from "./CreateSemester";
import UpdateSemester from "./UpdateSemester";

interface Department {
  id: string;
  name: string;
}

interface Semester {
  id: string;
  name: string;
  departmentId: string;
}

interface SemesterTableProps {
  departments: Department[];
  semesters: Semester[];
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  setShowSemesterPopover: (value: boolean) => void; // Thêm prop này vào
}


const SemesterTable: React.FC<SemesterTableProps> = ({
  departments,
  semesters,
  selectedDepartment,
  setSelectedDepartment,
  setShowSemesterPopover, // Thêm prop này
}) => {
  const [showCreatePopover, setShowCreatePopover] = useState(false); // Quản lý hiển thị popover tạo học kỳ
  const [showUpdatePopover, setShowUpdatePopover] = useState(false); // Quản lý hiển thị popover cập nhật học kỳ
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null); // Quản lý học kỳ đã chọn để cập nhật

  // Hàm này sẽ được gọi khi người dùng bấm vào nút "Edit"
  const handleShowUpdate = (semester: Semester) => {
    setSelectedSemester(semester); // Lưu học kỳ được chọn vào state
    setShowUpdatePopover(true); // Hiển thị popover cập nhật
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between mb-4">
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

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowCreatePopover(true)} // Hiển thị popover tạo học kỳ mới
        >
          <Plus /> Add Semester
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Semester</th>
            <th className="px-6 py-3 border-b text-left">Department</th>
            <th className="px-6 py-3 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {semesters
            .filter((semester) =>
              selectedDepartment ? semester.departmentId === selectedDepartment : true
            )
            .map((semester) => (
              <tr key={semester.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{semester.id}</td>
                <td className="px-6 py-4 border-b">{semester.name}</td>
                <td className="px-6 py-4 border-b">
                  {departments.find((d) => d.id === semester.departmentId)?.name}
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleShowUpdate(semester)} // Gọi hàm khi bấm Edit
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

      {/* Popover tạo học kỳ */}
      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateSemester
              departments={departments}
              onCreate={(data) => {
                console.log("Tạo học kỳ mới:", data);
                setShowCreatePopover(false); // Đóng popover sau khi tạo thành công
              }}
              onClose={() => setShowCreatePopover(false)} // Đóng popover
            />
          </div>
        </div>
      )}

      {/* Popover cập nhật học kỳ */}
      {showUpdatePopover && selectedSemester && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateSemester
              departments={departments}
              semester={selectedSemester} // Truyền thông tin học kỳ được chọn
              onUpdate={(data) => {
                console.log("Cập nhật học kỳ:", data);
                setShowUpdatePopover(false); // Đóng popover sau khi cập nhật thành công
              }}
              onClose={() => setShowUpdatePopover(false)} // Đóng popover khi nhấn Cancel
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterTable;
