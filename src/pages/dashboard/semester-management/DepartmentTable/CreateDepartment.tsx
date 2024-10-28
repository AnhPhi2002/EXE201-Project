  import React from "react";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";

  // Định nghĩa schema validation bằng Zod
  const departmentSchema = z.object({
    name: z.string().min(2, "Department name must be at least 2 characters").max(50, "Department name is too long"),
  });

  type DepartmentFormData = z.infer<typeof departmentSchema>;

  interface CreateDepartmentProps {
    onCreate: (name: string) => void;
    onClose: () => void;
  }

  const CreateDepartment: React.FC<CreateDepartmentProps> = ({ onCreate, onClose }) => {
    // Sử dụng useForm với Zod resolver để xử lý validation
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<DepartmentFormData>({
      resolver: zodResolver(departmentSchema),
    });

    const onSubmit = (data: DepartmentFormData) => {
      onCreate(data.name);
      onClose(); // Đóng popover sau khi tạo thành công
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Create New Department</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              {...register("name")} // Sử dụng React Hook Form's register
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {/* Hiển thị lỗi nếu có */}
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default CreateDepartment;
