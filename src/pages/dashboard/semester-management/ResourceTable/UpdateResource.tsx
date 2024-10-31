import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { updateResource } from '@/lib/api/redux/resourceSlice';
import { AppDispatch } from '@/lib/api/store';
import Modal from './Modal';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['pdf', 'video', 'document']),
  fileUrls: z.string().optional(),
  allowedRoles: z.enum(['member_free', 'member_premium']).optional(),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface UpdateResourceProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: string;
    fileUrls?: string[];
    allowedRoles: string[];
    subject: string;
  };
  onClose: () => void;
}

const UpdateResource: React.FC<UpdateResourceProps> = ({ resource, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: resource.title,
      description: resource.description,
      type: resource.type as 'pdf' | 'video' | 'document',
      fileUrls: resource.fileUrls ? resource.fileUrls.join(', ') : '',
      allowedRoles: resource.allowedRoles[0],
    },
  });

  const onSubmit = (data: ResourceFormData) => {
    const fileUrlsArray = data.fileUrls ? data.fileUrls.split(',').map((url) => url.trim()) : [];
    const updatedResourceData = { ...data, fileUrls: fileUrlsArray };

    dispatch(updateResource({ id: resource.id, resourceData: updatedResourceData }));
    onClose();
  };

  return (
    <Modal title="Update Resource" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input {...register('title')} type="text" className="p-2 border rounded-md w-full" required />

            <label className="block text-sm font-medium mt-4">Type</label>
            <select {...register('type')} className="p-2 border rounded-md w-full">
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>

            <label className="block text-sm font-medium mt-4">Select Role</label>
            <select {...register('allowedRoles')} className="p-2 border rounded-md w-full">
              <option value="member_free">Member Free</option>
              <option value="member_premium">Member Premium</option>
            </select>
          </div>

          <div className="col-span-2 space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea {...register('description')} className="p-2 border rounded-md w-full h-52 resize-none" required />

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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateResource;
