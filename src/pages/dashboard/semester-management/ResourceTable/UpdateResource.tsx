import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Department, Semester, Subject, Resource } from "../TabComponent";
import Modal from "./Modal";

// Zod schema xác định các quy tắc xác thực
const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["pdf", "video"], { errorMap: () => ({ message: "Invalid resource type" }) }),
  selectedDepartment: z.string().min(1, "Please select a department"),
  selectedSemester: z.string().min(1, "Please select a semester"),
  selectedSubject: z.string().min(1, "Please select a subject"),
});

// Dựa trên Zod schema, tạo kiểu cho form dữ liệu
type ResourceFormData = z.infer<typeof resourceSchema>;

interface UpdateResourceProps {
  resource: Resource;
  departments: Department[];
  semesters: Semester[];
  subjects: Subject[];
  onUpdate: (resourceData: Resource) => void;
  onClose: () => void;
}

const UpdateResource: React.FC<UpdateResourceProps> = ({
  resource,
  departments,
  semesters,
  subjects,
  onUpdate,
  onClose,
}) => {
  // Sử dụng React Hook Form với zodResolver để quản lý form
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: resource.title,
      description: resource.description,
      type: resource.type as "pdf" | "video", // Đảm bảo rằng `type` chỉ nhận giá trị "pdf" hoặc "video"
      selectedDepartment: semesters.find((sem) => sem.id === resource.subject)?.departmentId || "",
      selectedSemester: subjects.find((sub) => sub.id === resource.subject)?.semesterId || "",
      selectedSubject: resource.subject,
    },
  });

  const onSubmit = (data: ResourceFormData) => {
    const updatedResource = {
      ...resource,
      ...data,
    };
    onUpdate(updatedResource);
    onClose();
  };

  return (
    <Modal title="Update Resource" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cột 1: Select Department, Select Semester, Select Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Department</label>
            <select
              {...register("selectedDepartment")}
              className={`mt-1 p-2 border ${errors.selectedDepartment ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.selectedDepartment && (
              <p className="text-red-500 text-sm">{errors.selectedDepartment.message}</p>
            )}

            <label className="block text-sm font-medium text-gray-700 mt-4">Select Semester</label>
            <select
              {...register("selectedSemester")}
              className={`mt-1 p-2 border ${errors.selectedSemester ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Semester</option>
              {semesters
                .filter((sem) => sem.departmentId === watch("selectedDepartment"))
                .map((sem) => (
                  <option key={sem.id} value={sem.id}>
                    {sem.name}
                  </option>
                ))}
            </select>
            {errors.selectedSemester && (
              <p className="text-red-500 text-sm">{errors.selectedSemester.message}</p>
            )}

            <label className="block text-sm font-medium text-gray-700 mt-4">Select Subject</label>
            <select
              {...register("selectedSubject")}
              className={`mt-1 p-2 border ${errors.selectedSubject ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Subject</option>
              {subjects
                .filter((sub) => sub.semesterId === watch("selectedSemester"))
                .map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
            {errors.selectedSubject && (
              <p className="text-red-500 text-sm">{errors.selectedSubject.message}</p>
            )}
          </div>

          {/* Cột 2: Title, Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register("title")}
              type="text"
              className={`mt-1 p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Type</label>
            <select
              {...register("type")}
              className={`mt-1 p-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          {/* Cột 3: Description */}
          <div className="col-span-3 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description")}
              className={`mt-1 p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md w-full h-52 resize-none focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateResource;
