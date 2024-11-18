import React, { useEffect, useState } from 'react';
import { File, PlayCircle, Edit2, Trash2, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
import { fetchSemesters } from '@/lib/api/redux/semesterSlice';
import { fetchSubjects } from '@/lib/api/redux/subjectSlice';
import CreateResource from './CreateResource';
import UpdateResource from './UpdateResource';
import { fetchAllResources, createResource, deleteResource, updateResource } from '@/lib/api/redux/resourceSlice';
import { PaginationDashboardPage } from '../../pagination';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  description?: string;
  fileUrls?: string[];
  type: 'pdf' | 'video' | 'document';
  allowedRoles?: ('member_free' | 'member_premium')[];
  subject: string;
}

interface ResourceFormData {
  title: string;
  description?: string;
  selectedSubject: string;
  fileUrls?: string;
  type: 'pdf' | 'video' | 'document';
  allowedRoles?: 'member_free' | 'member_premium';
}

interface ResourceTableProps {
  setShowResourcePopover: React.Dispatch<React.SetStateAction<boolean>>;
  showCreatePopover: boolean;
  selectedDepartment: string;
  selectedSemester: string;
  selectedSubject: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
}

const ResourceTable: React.FC<ResourceTableProps> = ({
  setShowResourcePopover,
  showCreatePopover,
  selectedDepartment,
  selectedSemester,
  selectedSubject,
  setSelectedDepartment,
  setSelectedSemester,
  setSelectedSubject,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const { semesters } = useSelector((state: RootState) => state.semesters);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const { resources } = useSelector((state: RootState) => state.resources);

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showUpdatePopover, setShowUpdatePopover] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchSemesters());
    dispatch(fetchSubjects(selectedSemester || null));
    dispatch(fetchAllResources());
  }, [dispatch, selectedDepartment, selectedSemester]);

  const handleCreateResource = (data: ResourceFormData) => {
    // Kiểm tra trùng lặp tài liệu
    const isDuplicate = resources.some((resource) => resource.title === data.title && resource.subject === data.selectedSubject);

    if (isDuplicate) {
      toast.error('Tài liệu này đã tồn tại trong môn học đã chọn.');
      return;
    }

    const resourceData = {
      title: data.title,
      description: data.description,
      subject: data.selectedSubject,
      fileUrls: data.fileUrls ? data.fileUrls.split(',').map((url) => url.trim()) : [],
      type: data.type,
      allowedRoles: data.allowedRoles ? [data.allowedRoles] : [],
    };

    dispatch(createResource({ subjectId: data.selectedSubject, resourceData }))
      .unwrap()
      .then(() => {
        toast.success('Tạo tài liệu thành công!');
        setShowResourcePopover(false);
        dispatch(fetchAllResources());
      })
      .catch((error) => {
        toast.error('Tạo tài liệu thất bại. Vui lòng thử lại.');
        console.error('Error creating resource:', error);
      });
  };

  const handleUpdateResource = (data: Resource) => {
    // Kiểm tra trùng lặp tài liệu khi cập nhật
    const isDuplicate = resources.some((resource) => resource.title === data.title && resource.subject === data.subject && resource.id !== data.id);

    if (isDuplicate) {
      toast.error('Tài liệu này đã tồn tại trong môn học đã chọn.');
      return;
    }

    const resourceData = {
      ...data,
      fileUrls: data.fileUrls
        ? data.fileUrls
            .join(', ')
            .split(',')
            .map((url) => url.trim())
        : [],
      subject: data.subject,
    };

    dispatch(updateResource({ id: data.id, resourceData }))
      .unwrap()
      .then(() => {
        toast.success('Cập nhật tài liệu thành công!');
        setShowUpdatePopover(false);
        dispatch(fetchAllResources());
      })
      .catch((error) => {
        toast.error('Cập nhật tài liệu thất bại. Vui lòng thử lại.');
        console.error('Error updating resource:', error);
      });
  };

  const handleDeleteResource = (resourceId: string) => {
    dispatch(deleteResource(resourceId))
      .unwrap()
      .then(() => {
        toast.success('Xóa tài liệu thành công!');
        dispatch(fetchAllResources());
      })
      .catch((error) => {
        toast.error('Xóa tài liệu thất bại. Vui lòng thử lại.');
        console.error('Error deleting resource:', error);
      });
  };

  const filteredResources = resources.filter((res) => !selectedSubject || res.subject === selectedSubject);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex gap-4 flex-wrap">
          <select className="border p-2 rounded-md max-w-full" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">Chọn Ngành</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select className="border p-2 rounded-md max-w-full" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} disabled={!selectedDepartment}>
            <option value="">Chọn Kỳ</option>
            {semesters
              .filter((sem) => sem.department === selectedDepartment)
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
          </select>

          <select className="border p-2 rounded-md max-w-full" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedSemester}>
            <option value="">Chọn Môn Học</option>
            {subjects
              .filter((sub) => sub.semester === selectedSemester)
              .map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 mt-2 md:mt-0" onClick={() => setShowResourcePopover(true)}>
          <Plus /> Thêm Tài Liệu
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {currentResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              {resource.type === 'document' ? <File className="text-red-500 w-6 h-6" /> : <PlayCircle className="text-blue-500 w-6 h-6" />}
              <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description || 'Không có mô tả'}</p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{resource.type?.toUpperCase()}</span>
              <span className={`px-2 py-1 rounded-full text-sm ${resource.allowedRoles?.[0] === 'member_premium' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {resource.allowedRoles?.[0] === 'member_premium' ? 'Premium Member' : 'Free Member'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-4">
              <button
                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                onClick={() => {
                  setSelectedResource({ ...resource, type: resource.type || 'pdf' });
                  setShowUpdatePopover(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
                <span>Sửa</span>
              </button>
              <button className="flex items-center gap-1 text-red-500 hover:text-red-700 transition" onClick={() => handleDeleteResource(resource.id)}>
                <Trash2 className="w-4 h-4" />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <PaginationDashboardPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-md relative w-full max-w-lg mx-4">
            <CreateResource departments={departments} semesters={semesters} subjects={subjects} onCreate={handleCreateResource} onClose={() => setShowResourcePopover(false)} />
          </div>
        </div>
      )}

      {showUpdatePopover && selectedResource && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-md relative w-full max-w-lg mx-4">
            <UpdateResource
              resource={selectedResource}
              departments={departments}
              semesters={semesters}
              subjects={subjects}
              onUpdate={handleUpdateResource}
              onClose={() => setShowUpdatePopover(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceTable;
