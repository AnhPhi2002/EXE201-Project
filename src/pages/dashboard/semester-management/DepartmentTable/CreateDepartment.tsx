import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Định nghĩa schema validation bằng Zod
const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters").max(50, "Department name is too long"),
  code: z.string().min(1, "Department code is required").max(10, "Code is too long"),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface CreateDepartmentProps {
  onCreate: (data: DepartmentFormData) => void;
  onClose: () => void;
}

const CreateDepartment: React.FC<CreateDepartmentProps> = ({ onCreate, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit = (data: DepartmentFormData) => {
    onCreate(data);
    onClose();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Create New Department</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Department Name</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department Code</label>
          <input
            type="text"
            {...register("code")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
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
