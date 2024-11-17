import React, { useEffect } from "react";
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

interface Subject {
  id: string;
  name: string;
  semester: string;
  description: string; // Ensure description is included
}

const subjectSchema = z.object({
  name: z.string().min(1, { message: "Tên môn học không được để trống" }),
  semester: z.string().nonempty("Vui lòng chọn học kỳ"),
  description: z.string().min(5, "Mô tả phải có ít nhất 5 ký tự"), // Added description validation
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface UpdateSubjectProps {
  subject: Subject;
  departments: Department[];
  semesters: Semester[];
  onUpdate: (data: { id: string; name: string; semester: string; description: string }) => void; // Include description
  onClose: () => void;
}

const UpdateSubject: React.FC<UpdateSubjectProps> = ({ subject, departments, semesters, onUpdate, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: subject.name,
      semester: subject.semester,
      description: subject.description, // Initialize description
    },
  });

  // Get department ID from the current subject's semester
  const departmentId = semesters.find((sem) => sem.id === subject.semester)?.department || "";
  const filteredSemesters = semesters.filter((sem) => sem.department === departmentId);

  useEffect(() => {
    // Update semester when department changes (if applicable)
    setValue("semester", subject.semester);
    setValue("description", subject.description); // Ensure description is set
  }, [subject, setValue]);

  const onSubmit = (data: SubjectFormData) => {
    onUpdate({ id: subject.id, name: data.name, semester: data.semester, description: data.description }); // Pass description
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-semibold mb-4">Cập nhật môn học</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên môn học</label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Department Field (Disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phòng ban</label>
            <input
              type="text"
              value={departments.find((dept) => dept.id === departmentId)?.name || "N/A"}
              disabled
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100"
            />
          </div>

          {/* Semester Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Chọn học kỳ</label>
            <select {...register("semester")} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
              <option value="">Chọn học kỳ</option>
              {filteredSemesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
            {errors.semester && <p className="text-red-500 text-sm">{errors.semester.message}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              {...register("description")}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={4}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubject;
