import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Department, Semester, Subject } from '../TabComponent';
import Modal from './Modal';

// Zod schema xác định các quy tắc xác thực
const resourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  type: z.enum(['pdf', 'video'], { errorMap: () => ({ message: 'Invalid resource type' }) }),
  selectedDepartment: z.string().min(1, 'Please select a department'),
  selectedSemester: z.string().min(1, 'Please select a semester'),
  selectedSubject: z.string().min(1, 'Please select a subject'),
  allowedRoles: z.enum(['member_free', 'member_premium'], { errorMap: () => ({ message: 'Invalid role' }) }),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface CreateResourceProps {
  departments: Department[];
  semesters: Semester[];
  subjects: Subject[];
  onCreate: (resourceData: any) => void;
  onClose: () => void;
}

const CreateResource: React.FC<CreateResourceProps> = ({ departments, semesters, subjects, onCreate, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
  });

  const selectedDepartment = watch('selectedDepartment');

  const onSubmit = (data: ResourceFormData) => {
    const newResource = {
      id: String(Date.now()),
      ...data,
    };
    onCreate(newResource);
    onClose();
  };

  return (
    <Modal title="Create Resource" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cột 1: Select Department, Select Semester, Select Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Department</label>
            <select
              {...register('selectedDepartment')}
              className={`mt-1 p-2 border ${errors.selectedDepartment ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.selectedDepartment && <p className="text-red-500 text-sm">{errors.selectedDepartment.message}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Select Semester</label>
            <select
              {...register('selectedSemester')}
              className={`mt-1 p-2 border ${errors.selectedSemester ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Semester</option>
              {semesters
                .filter((sem) => sem.departmentId === selectedDepartment)
                .map((sem) => (
                  <option key={sem.id} value={sem.id}>
                    {sem.name}
                  </option>
                ))}
            </select>
            {errors.selectedSemester && <p className="text-red-500 text-sm">{errors.selectedSemester.message}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Select Subject</label>
            <select
              {...register('selectedSubject')}
              className={`mt-1 p-2 border ${errors.selectedSubject ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Subject</option>
              {subjects
                .filter((sub) => sub.semesterId === watch('selectedSemester'))
                .map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
            {errors.selectedSubject && <p className="text-red-500 text-sm">{errors.selectedSubject.message}</p>}
          </div>

          {/* Cột 2: Title, Type, Select Role */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              type="text"
              className={`mt-1 p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Type</label>
            <select
              {...register('type')}
              className={`mt-1 p-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-4">Select Role</label>
            <select
              {...register('allowedRoles')}
              className={`mt-1 p-2 border ${errors.allowedRoles ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="member_free">Member Free</option>
              <option value="member_premium">Member Premium</option>
            </select>
            {errors.allowedRoles && <p className="text-red-500 text-sm">{errors.allowedRoles.message}</p>}
          </div>

       
          {/* Cột 3: Description */}
          <div className="col-span-3 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className={`mt-1 p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md w-full h-52 resize-none focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md transition-colors" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateResource;
