import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Department {
  id: string;
  name: string;
}

// Định nghĩa schema xác thực với Zod
const semesterSchema = z.object({
  name: z.string().min(2, "Tên học kỳ phải có ít nhất 2 ký tự").max(50, "Tên học kỳ quá dài"),
  departmentId: z.string().min(1, "Vui lòng chọn phòng ban"),
});

type SemesterFormData = z.infer<typeof semesterSchema>;

interface CreateSemesterProps {
  departments: Department[];
  onCreate: (data: SemesterFormData) => void;
  onClose: () => void;
}

const CreateSemester: React.FC<CreateSemesterProps> = ({ departments, onCreate, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SemesterFormData>({
    resolver: zodResolver(semesterSchema),
  });

  const onSubmit = (data: SemesterFormData) => {
    onCreate(data);
    onClose();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Thêm học kỳ mới</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên học kỳ</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn phòng ban</label>
          <select {...register("departmentId")} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
            <option value="">Chọn phòng ban</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId.message}</p>}
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

export default CreateSemester;
