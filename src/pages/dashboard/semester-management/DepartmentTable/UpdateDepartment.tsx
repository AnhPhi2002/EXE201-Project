import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const departmentSchema = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters').max(50, 'Department name is too long'),
  code: z.string().min(1, 'Department code is required').max(10, 'Code is too long'),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface Department {
  id: string;
  name: string;
  code: string;
}

interface UpdateDepartmentProps {
  department: Department;
  onUpdate: (data: { id: string } & DepartmentFormData) => void;
  onClose: () => void;
}

const UpdateDepartment: React.FC<UpdateDepartmentProps> = ({ department, onUpdate, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: department.name, code: department.code },
  });

  const onSubmit = (data: DepartmentFormData) => {
    onUpdate({ id: department.id, ...data });
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-lg font-semibold mb-4">Update Department</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department Name</label>
            <input type="text" {...register('name')} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department Code</label>
            <input type="text" {...register('code')} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDepartment;
