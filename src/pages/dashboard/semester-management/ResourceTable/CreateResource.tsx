import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { createResource } from '@/lib/api/redux/resourceSlice';
import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
import { fetchSemesters } from '@/lib/api/redux/semesterSlice';
import { fetchSubjects } from '@/lib/api/redux/subjectSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import Modal from './Modal';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  type: z.enum(['pdf', 'video', 'document'], { errorMap: () => ({ message: 'Invalid resource type' }) }),
  fileUrls: z.string().optional(),
  selectedDepartment: z.string().nonempty('Please select a department'),
  selectedSemester: z.string().nonempty('Please select a semester'),
  selectedSubject: z.string().nonempty('Please select a subject'),
  allowedRoles: z.enum(['member_free', 'member_premium']).optional(),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface CreateResourceProps {
  onClose: () => void;
}

const CreateResource: React.FC<CreateResourceProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch departments on component mount
    dispatch(fetchDepartments());
  }, [dispatch]);

  const { departments, semesters, subjects } = useSelector((state: RootState) => ({
    departments: state.departments.departments || [],
    semesters: state.semesters.semesters || [],
    subjects: state.subjects.subjects || [],
  }));

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
  });

  const selectedDepartment = watch('selectedDepartment');
  const selectedSemester = watch('selectedSemester');

  useEffect(() => {
    if (selectedDepartment) {
      dispatch(fetchSemesters(selectedDepartment));
    }
  }, [dispatch, selectedDepartment]);

  useEffect(() => {
    if (selectedSemester) {
      dispatch(fetchSubjects(selectedSemester));
    }
  }, [dispatch, selectedSemester]);

  const onSubmit = (data: ResourceFormData) => {
    const { title, description, type, allowedRoles, fileUrls, selectedSubject } = data;
    const fileUrlsArray = fileUrls ? fileUrls.split(',').map((url) => url.trim()) : [];

    const resourceData = {
      title,
      description,
      fileUrls: fileUrlsArray,
      type,
      allowedRoles: [allowedRoles || 'member_free'],
    };

    dispatch(createResource({ subjectId: selectedSubject, resourceData }));
    reset();
    onClose();
  };

  return (
    <Modal title="Create Resource" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Department</label>
            <select
              {...register('selectedDepartment')}
              className="p-2 border rounded-md w-full"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            {errors.selectedDepartment && <p className="text-red-500 text-sm">{errors.selectedDepartment.message}</p>}

            <label className="block text-sm font-medium mt-4">Select Semester</label>
            <select
              {...register('selectedSemester')}
              className="p-2 border rounded-md w-full"
              disabled={!selectedDepartment}
            >
              <option value="">Select Semester</option>
              {semesters.filter((sem) => sem.department === selectedDepartment).map((sem) => (
                <option key={sem.id} value={sem.id}>{sem.name}</option>
              ))}
            </select>
            {errors.selectedSemester && <p className="text-red-500 text-sm">{errors.selectedSemester.message}</p>}

            <label className="block text-sm font-medium mt-4">Select Subject</label>
            <select
              {...register('selectedSubject')}
              className="p-2 border rounded-md w-full"
              disabled={!selectedSemester}
            >
              <option value="">Select Subject</option>
              {subjects.filter((sub) => sub.semester === selectedSemester).map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
            {errors.selectedSubject && <p className="text-red-500 text-sm">{errors.selectedSubject.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input {...register('title')} type="text" className="p-2 border rounded-md w-full" required />

            <label className="block text-sm font-medium mt-4">Type</label>
            <select {...register('type')} className="p-2 border rounded-md w-full">
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

            <label className="block text-sm font-medium mt-4">Select Role</label>
            <select {...register('allowedRoles')} className="p-2 border rounded-md w-full">
              <option value="member_free">Member Free</option>
              <option value="member_premium">Member Premium</option>
            </select>
            {errors.allowedRoles && <p className="text-red-500 text-sm">{errors.allowedRoles.message}</p>}
          </div>

          <div className="col-span-3 space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea {...register('description')} className="p-2 border rounded-md w-full h-52 resize-none" required />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

            <label className="block text-sm font-medium mt-4">File URLs</label>
            <input
              {...register('fileUrls')}
              type="text"
              placeholder="Enter URLs separated by commas"
              className="p-2 border rounded-md w-full"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateResource;
