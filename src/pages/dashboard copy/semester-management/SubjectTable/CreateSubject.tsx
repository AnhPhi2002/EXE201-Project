import React, { useState, useEffect } from "react";
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
  department: string;
}

const subjectSchema = z.object({
  name: z.string().min(2, "Tên môn học phải có ít nhất 2 ký tự").max(50, "Tên môn học quá dài"),
  semesterId: z.string().min(1, "Vui lòng chọn học kỳ"),
  description: z.string().min(5, "Mô tả phải có ít nhất 5 ký tự"), // Added description validation
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface CreateSubjectProps {
  departments: Department[];
  semesters: Semester[];
  onCreate: (data: { name: string; semesterId: string; description: string }) => void; // Include description
  onClose: () => void;
}

const CreateSubject: React.FC<CreateSubjectProps> = ({ departments, semesters, onCreate, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  useEffect(() => {
    setValue("semesterId", "");
  }, [selectedDepartment, setValue]);

  const filteredSemesters = semesters.filter((sem) => sem.department === selectedDepartment);

  const onSubmit = (data: SubjectFormData) => {
    onCreate({ name: data.name, semesterId: data.semesterId, description: data.description }); // Pass description
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-semibold mb-4">Thêm môn học mới</h3>
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
            <select
              {...register("semesterId")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              disabled={!selectedDepartment}
            >
              <option value="">Chọn học kỳ</option>
              {filteredSemesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
            {errors.semesterId && <p className="text-red-500 text-sm">{errors.semesterId.message}</p>}
            {selectedDepartment && filteredSemesters.length === 0 && (
              <p className="text-yellow-500 text-sm">Không có học kỳ nào cho phòng ban này</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              {...register("description")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={4}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubject;
