import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Department {
  id: string;
  name: string;
  code: string;
  semesters: any[];
}

interface Semester {
  id: string;
  name: string;
  department: string;  // Thay đổi từ departmentId sang department
  subjects: any[];
}

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
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  // Reset semester selection when department changes
  useEffect(() => {
    setValue("semesterId", "");
  }, [selectedDepartment, setValue]);

  // Filter semesters based on selected department
  const filteredSemesters = semesters.filter((sem) => sem.department === selectedDepartment);

  const onSubmit = (data: SubjectFormData) => {
    onCreate(data);
    onClose();
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
          <select 
            {...register("semesterId")} 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            disabled={!selectedDepartment} // Disable if no department selected
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
  );
};

export default CreateSubject;