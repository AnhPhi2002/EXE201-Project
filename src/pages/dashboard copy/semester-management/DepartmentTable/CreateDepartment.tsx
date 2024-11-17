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

interface CreateDepartmentProps {
  onCreate: (data: DepartmentFormData) => void;
  onClose: () => void;
  existingDepartmentNames: string[]; // Danh sách tên ngành đã tồn tại
  existingDepartmentCodes: string[]; // Danh sách mã ngành đã tồn tại
}

const CreateDepartment: React.FC<CreateDepartmentProps> = ({
  onCreate,
  onClose,
  existingDepartmentNames,
  existingDepartmentCodes,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit = (data: DepartmentFormData) => {
    // Kiểm tra tên ngành trùng
    if (existingDepartmentNames.includes(data.name)) {
      toast.error('Tên ngành đã tồn tại. Vui lòng chọn tên khác.');
      return;
    }
    
    // Kiểm tra mã ngành trùng
    if (existingDepartmentCodes.includes(data.code)) {
      toast.error('Mã ngành đã tồn tại. Vui lòng chọn mã khác.');
      return;
    }

    try {
      onCreate(data);
      toast.success('Tạo ngành thành công!');
      onClose();
    } catch (error) {
      toast.error('Tạo ngành thất bại. Vui lòng thử lại.');
      console.error('Lỗi khi tạo ngành:', error);
    }
  };

  // Đóng popup khi nhấn phím Escape
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
        <h3 className="text-lg font-semibold mb-4">Tạo Ngành Mới</h3>
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
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartment;
