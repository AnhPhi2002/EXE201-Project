import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Định nghĩa schema xác thực bằng Zod
const departmentSchema = z.object({
  name: z.string().min(2, 'Tên phòng ban phải có ít nhất 2 ký tự').max(50, 'Tên không được vượt quá 50 ký tự'),
});

// Tự động suy luận kiểu dữ liệu của form từ Zod schema
type DepartmentFormData = z.infer<typeof departmentSchema>;

interface Department {
  id: string;
  name: string;
}

interface UpdateDepartmentProps {
  department: Department;
  onClose: () => void;
}

const UpdateDepartment: React.FC<UpdateDepartmentProps> = ({ department, onClose }) => {
  // Sử dụng React Hook Form với Zod resolver để xác thực dữ liệu
  const {
    register, // Để đăng ký input vào form
    handleSubmit, // Để xử lý submit form
    formState: { errors }, // Trạng thái lỗi của form
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema), // Kết hợp với Zod để xử lý xác thực
    defaultValues: { name: department.name }, // Giá trị mặc định cho form
  });

  // Hàm xử lý khi form được submit
  const onSubmit = (data: DepartmentFormData) => {
    console.log('Updated Department:', { id: department.id, name: data.name });
    onClose(); // Đóng form sau khi cập nhật thành công
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Cập nhật Phòng Ban</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên Phòng Ban</label>
          <input
            type="text"
            {...register('name')} // Liên kết input với React Hook Form
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {/* Hiển thị thông báo lỗi nếu có */}
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
