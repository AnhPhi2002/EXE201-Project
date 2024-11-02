import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Semester {
  id: string;
  name: string;
  department?: string;
}

const semesterSchema = z.object({
  name: z.enum(
    ["Kỳ 1", "Kỳ 2", "Kỳ 3", "Kỳ 4", "Kỳ 5", "Kỳ 6", "Kỳ 7", "Kỳ 8", "Kỳ 9"],
    { required_error: "Vui lòng chọn tên học kỳ" }
  ),
});

type SemesterFormData = z.infer<typeof semesterSchema>;

interface UpdateSemesterProps {
  
  semester: Semester;
  onUpdate: (data: { id: string } & SemesterFormData & { departmentId: string }) => void;
  onClose: () => void;
}

const UpdateSemester: React.FC<UpdateSemesterProps> = ({ semester, onUpdate, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SemesterFormData>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      name: semester.name as SemesterFormData["name"],
    },
  });

  const onSubmit = (data: SemesterFormData) => {
    // Đảm bảo departmentId luôn là chuỗi, mặc định là rỗng nếu undefined
    onUpdate({ id: semester.id, ...data, departmentId: semester.department || "" });
    onClose();
  };
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-semibold mb-4">Cập nhật học kỳ</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên học kỳ</label>
            <select
              {...register("name")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Chọn tên học kỳ</option>
              {["Kỳ 1", "Kỳ 2", "Kỳ 3", "Kỳ 4", "Kỳ 5", "Kỳ 6", "Kỳ 7", "Kỳ 8", "Kỳ 9"].map(
                (term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                )
              )}
            </select>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSemester;
