import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import CreateSubject from "./CreateSubject";
import UpdateSubject from "./UpdateSubject";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/api/store";
import { fetchDepartments } from "@/lib/api/redux/departmentSlice";
import { fetchSemesters } from "@/lib/api/redux/semesterSlice";
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from "@/lib/api/redux/subjectSlice";

const SubjectTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const { semesters } = useSelector((state: RootState) => state.semesters);
  const { subjects } = useSelector((state: RootState) => state.subjects);

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [showCreatePopover, setShowCreatePopover] = useState(false);
  const [showUpdatePopover, setShowUpdatePopover] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<null | { id: string; name: string; semesterId: string }>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDepartments()).unwrap();
        await dispatch(fetchSemesters()).unwrap();
        await dispatch(fetchSubjects()).unwrap();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleCreateSubject = (data: { name: string; semesterId: string }) => {
    dispatch(createSubject(data))
      .unwrap()
      .then(() => setShowCreatePopover(false))
      .catch((error) => console.error("Error creating subject:", error));
  };

  const handleUpdateSubject = (data: { name: string; semesterId: string }) => {
    if (selectedSubject) {
      dispatch(updateSubject({ id: selectedSubject.id, ...data }))
        .unwrap()
        .then(() => setShowUpdatePopover(false))
        .catch((error) => console.error("Error updating subject:", error));
    }
  };

  const handleDeleteSubject = (subjectId: string) => {
    dispatch(deleteSubject(subjectId))
      .unwrap()
      .catch((error) => console.error("Error deleting subject:", error));
  };

  const getSemesterName = (semesterId: string) => {
    const semester = semesters.find((s) => s.id === semesterId);
    return semester ? semester.name : "N/A";
  };
  
  const getDepartmentNameBySemester = (semesterId: string) => {
    const semester = semesters.find((s) => s.id === semesterId);
    if (semester) {
      const department = departments.find((d) => d.id === semester.department);
      return department ? department.name : "N/A";
    }
    return "N/A";
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      (!selectedSemester || subject.semester === selectedSemester) &&
      (!selectedDepartment ||
        semesters.find((s) => s.id === subject.semester)?.department === selectedDepartment)
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <select
            className="border p-2 rounded-md"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesters
              .filter((sem) => !selectedDepartment || sem.department === selectedDepartment)
              .map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowCreatePopover(true)}
        >
          <Plus /> Add Subject
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 border-b text-left">ID</th>
            <th className="px-6 py-3 border-b text-left">Name</th>
            <th className="px-6 py-3 border-b text-left">Semester</th>
            <th className="px-6 py-3 border-b text-left">Department</th>
            <th className="px-6 py-3 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map((subject) => (
            <tr key={subject.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{subject.id}</td>
              <td className="px-6 py-4 border-b">{subject.name}</td>
              <td className="px-6 py-4 border-b">
                {getSemesterName(subject.semester)}
              </td>
              <td className="px-6 py-4 border-b">
                {getDepartmentNameBySemester(subject.semester)}
              </td>
              <td className="px-6 py-4 border-b">
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedSubject(subject);
                      setShowUpdatePopover(true);
                    }}
                  >
                    <Edit2 />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteSubject(subject.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreatePopover && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <CreateSubject
              departments={departments}
              semesters={semesters}
              onCreate={handleCreateSubject}
              onClose={() => setShowCreatePopover(false)}
            />
          </div>
        </div>
      )}

      {showUpdatePopover && selectedSubject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <UpdateSubject
              subject={selectedSubject}
              departments={departments}
              semesters={semesters}
              onUpdate={handleUpdateSubject}
              onClose={() => setShowUpdatePopover(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
