import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Department {
  id: string;
  name: string;
}

interface Semester {
  id: string;
  name: string;
  departmentId: string;
}

// Schema xác thực với Zod
const subjectSchema = z.object({
  name: z.string().min(2, "Tên môn học phải có ít nhất 2 ký tự").max(50, "Tên môn học quá dài"),
  semesterId: z.string().min(1, "Vui lòng chọn học kỳ"),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface CreateSubjectProps {
  departments: Department[];
  semesters: Semester[];
  onCreate: (data: SubjectFormData) => void;
  onClose: () => void;
}

const CreateSubject: React.FC<CreateSubjectProps> = ({ departments, semesters, onCreate, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  // State để lưu trữ department đã chọn
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  // Lọc danh sách học kỳ dựa trên phòng ban đã chọn
  const filteredSemesters = semesters.filter((sem) => sem.departmentId === selectedDepartment);

  const onSubmit = (data: SubjectFormData) => {
    onCreate(data);
    onClose(); // Đóng popover sau khi tạo thành công
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Thêm môn học mới</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên môn học</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn phòng ban</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Chọn phòng ban</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn học kỳ</label>
          <select {...register("semesterId")} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
            <option value="">Chọn học kỳ</option>
            {filteredSemesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
            ))}
          </select>
          {errors.semesterId && <p className="text-red-500 text-sm">{errors.semesterId.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Hủy
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubject;
