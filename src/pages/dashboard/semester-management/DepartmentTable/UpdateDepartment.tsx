import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const departmentSchema = z.object({
  name: z.string().min(2, 'Tên phòng ban phải có ít nhất 2 ký tự').max(50, 'Tên không được vượt quá 50 ký tự'),
  code: z.string().min(1, 'Mã phòng ban là bắt buộc').max(10, 'Mã không được vượt quá 10 ký tự'),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface Department {
  id: string;
  name: string;
  code: string;
}

interface UpdateDepartmentProps {
  department: Department;
  onUpdate: (data: { id: string; name: string; code: string }) => void;
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Cập nhật Phòng Ban</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Department Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department Code</label>
          <input
            type="text"
            {...register('code')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDepartment;
