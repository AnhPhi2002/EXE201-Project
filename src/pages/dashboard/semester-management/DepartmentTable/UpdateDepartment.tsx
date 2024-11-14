import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const departmentSchema = z.object({
  name: z.string().min(2, 'Tên ngành phải có ít nhất 2 ký tự').max(50, 'Tên ngành quá dài'),
  code: z.string().min(1, 'Mã ngành là bắt buộc').max(10, 'Mã quá dài'),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface Department {
  id: string;
  name: string;
  code: string;
}

interface UpdateDepartmentProps {
  department: Department;
  onUpdate: (data: { id: string } & DepartmentFormData) => Promise<void>;
  onClose: () => void;
  existingDepartments: Department[]; // Nhận danh sách ngành hiện có để kiểm tra trùng lặp
}

const UpdateDepartment: React.FC<UpdateDepartmentProps> = ({ department, onUpdate, onClose, existingDepartments }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: department.name, code: department.code },
  });

  // Kiểm tra trùng lặp
  const isDuplicate = (data: DepartmentFormData) => {
    const isDuplicateName = existingDepartments.some(
      (dept) => dept.name === data.name && dept.id !== department.id
    );
    const isDuplicateCode = existingDepartments.some(
      (dept) => dept.code === data.code && dept.id !== department.id
    );
    if (isDuplicateName) {
      toast.error('Tên ngành đã tồn tại. Vui lòng chọn tên khác.');
      return true;
    }
    if (isDuplicateCode) {
      toast.error('Mã ngành đã tồn tại. Vui lòng chọn mã khác.');
      return true;
    }
    return false;
  };

  const onSubmit = async (data: DepartmentFormData) => {
    if (isDuplicate(data)) return;
    try {
      await onUpdate({ id: department.id, ...data });
      toast.success('Cập nhật ngành thành công!');
      onClose();
    } catch (error) {
      toast.error('Cập nhật ngành thất bại. Vui lòng thử lại.');
      console.error('Lỗi khi cập nhật ngành:', error);
    }
  };

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
        <h3 className="text-lg font-semibold mb-4">Cập Nhật Ngành</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên Ngành</label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mã Ngành</label>
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
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDepartment;
