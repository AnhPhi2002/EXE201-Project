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

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchSemesters(selectedDepartment || null));
    dispatch(fetchSubjects(selectedSemester || null));
    dispatch(fetchAllResources());
  }, [dispatch, selectedDepartment, selectedSemester]);

  const handleCreateResource = (data: ResourceFormData) => {
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
        setShowResourcePopover(false);
        dispatch(fetchAllResources());
      })
      .catch((error) => {
        console.error('Error creating resource:', error);
      });
  };

  const handleUpdateResource = (data: Resource) => {
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
        setShowUpdatePopover(false);
        dispatch(fetchAllResources());
      })
      .catch((error) => {
        console.error('Error updating resource:', error);
      });
  };

  const handleDeleteResource = (resourceId: string) => {
    dispatch(deleteResource(resourceId))
      .unwrap()
      .then(() => dispatch(fetchAllResources()))
      .catch((error) => {
        console.error('Error deleting resource:', error);
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex gap-4 flex-wrap">
          <select className="border p-2 rounded-md max-w-full" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select className="border p-2 rounded-md max-w-full" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} disabled={!selectedDepartment}>
            <option value="">Select Semester</option>
            {semesters
              .filter((sem) => sem.department === selectedDepartment)
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
          </select>

          <select className="border p-2 rounded-md max-w-full" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedSemester}>
            <option value="">Select Subject</option>
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
          <Plus /> Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources
          .filter((res) => !selectedSubject || res.subject === selectedSubject)
          .map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-sm w-full overflow-hidden">
              <div className="flex items-center gap-3">
                {resource.type === 'pdf' ? <File className="text-red-500 text-2xl" /> : <PlayCircle className="text-blue-500 text-2xl" />}
                <h3 className="text-lg font-semibold">{resource.title}</h3>
              </div>

              <p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">{resource.description || 'No description available'}</p>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{resource.type?.toUpperCase()}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{resource.allowedRoles?.[0] || 'N/A'}</span>
              </div>

              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setSelectedResource({ ...resource, type: resource.type || 'pdf' });
                    setShowUpdatePopover(true);
                  }}
                >
                  <Edit2 />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteResource(resource.id)}>
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
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
