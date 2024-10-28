import { useState } from 'react';
import { File, PlayCircle, Edit2, Trash2, Plus } from 'lucide-react';
import { Department, Resource, Semester, Subject } from '../TabComponent';

import CreateResource from './CreateResource';
import UpdateResource from './UpdateResource';

interface ResourceTableProps {
  departments: Department[];
  semesters: Semester[];
  subjects: Subject[];
  resources: Resource[];
  selectedDepartment: string;
  selectedSemester: string;
  selectedSubject: string;
  setSelectedDepartment: (value: string) => void;
  setSelectedSemester: (value: string) => void;
  setSelectedSubject: (value: string) => void;
}

const ResourceTable: React.FC<ResourceTableProps> = ({
  departments,
  semesters,
  subjects,
  resources,
  selectedDepartment,
  selectedSemester,
  selectedSubject,
  setSelectedDepartment,
  setSelectedSemester,
  setSelectedSubject,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [resourceList, setResourceList] = useState(resources);

  const handleCreate = (resource: Resource) => {
    setResourceList([...resourceList, resource]);
  };

  const handleEditClick = (resource: Resource) => {
    setSelectedResource(resource);
    setShowEditModal(true);
  };

  const handleEdit = (updatedResource: Resource) => {
    setResourceList(resourceList.map((res) => (res.id === updatedResource.id ? updatedResource : res)));
  };

  const handleDelete = (resourceId: string) => {
    setResourceList(resourceList.filter((res) => res.id !== resourceId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <select className="border p-2 rounded-md" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select className="border p-2 rounded-md" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {semesters
              .filter((sem) => !selectedDepartment || sem.departmentId === selectedDepartment)
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
          </select>

          <select className="border p-2 rounded-md" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects
              .filter((sub) => !selectedSemester || sub.semesterId === selectedSemester)
              .map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => setShowCreateModal(true)}>
          <Plus /> Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceList
          .filter((res) => !selectedSubject || res.subject === selectedSubject)
          .map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center gap-3">
                {resource.type === 'pdf' ? <File className="text-red-500 text-2xl" /> : <PlayCircle className="text-blue-500 text-2xl" />}
                <h3 className="text-lg font-semibold">{resource.title}</h3>
              </div>

              {/* Description with ellipsis truncation */}
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap w-full">{resource.description}</p>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{resource.type.toUpperCase()}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{resource.allowedRoles[0]}</span>
              </div>

              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(resource)}>
                  <Edit2 />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(resource.id)}>
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
      </div>

      {showCreateModal && <CreateResource departments={departments} semesters={semesters} subjects={subjects} onCreate={handleCreate} onClose={() => setShowCreateModal(false)} />}

      {showEditModal && selectedResource && (
        <UpdateResource
          resource={selectedResource}
          departments={departments}
          semesters={semesters}
          subjects={subjects}
          onUpdate={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default ResourceTable;
