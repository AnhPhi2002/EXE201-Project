import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, fetchSemesters, fetchSubjects, fetchResources } from '@/lib/api/redux/departmentSlice';
import { RootState, AppDispatch } from '@/lib/api/store';  // Import AppDispatch
import { ChevronDown, ChevronUp, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CodingCourseSection = () => {
  const dispatch = useDispatch<AppDispatch>();  // Sử dụng AppDispatch
  const navigate = useNavigate();
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // Lấy dữ liệu từ Redux store
  const { departments, semesters, subjects, resources, loading, error } = useSelector(
    (state: RootState) => state.departments
  );

  // Gọi API lấy danh sách ngành học khi component mount
  useEffect(() => {
    dispatch(fetchDepartments());  // Sử dụng dispatch với kiểu AppDispatch
  }, [dispatch]);

  const toggleMajor = (majorId: string) => {
    setExpandedMajor(expandedMajor === majorId ? null : majorId);
    if (!semesters[majorId]) {
      dispatch(fetchSemesters(majorId));  // Gọi fetchSemesters với dispatch
    }
  };

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
    if (!subjects[semesterId]) {
      dispatch(fetchSubjects(semesterId));  // Gọi fetchSubjects với dispatch
    }
  };

  const toggleSubject = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
    if (!resources[subjectId]) {
      dispatch(fetchResources({ subjectId }));  // Gọi fetchResources với dispatch
    }
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/subject/${courseId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error loading data: {error}</p>;
  }
  
  if (!departments.length) {
    return <p>No departments found.</p>;
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mt-16 mb-8 text-black">Course Section</h1>
      <div className="space-y-2">
        {departments.map((major) => (
          <div key={major._id} className="bg-purple-300 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleMajor(major._id)}
              className="w-full flex items-center justify-between p-3 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              aria-expanded={expandedMajor === major._id}
              aria-controls={`major-${major._id}-semesters`}
            >
              <span className="text-lg font-semibold">
                {major.code} ({major.name})
              </span>
              {expandedMajor === major._id ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedMajor === major._id && (
              <div id={`major-${major._id}-semesters`} className="space-y-1 p-3 bg-gray-50">
                {semesters[major._id]?.map((semester) => (
                  <div key={semester._id} className="bg-purple-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSemester(semester._id)}
                      className="w-full flex items-center justify-between p-2 bg-purple-200 hover:bg-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                      aria-expanded={expandedSemester === semester._id}
                      aria-controls={`semester-${semester._id}-courses`}
                    >
                      <span className="text-base font-medium">{semester.name}</span>
                      {expandedSemester === semester._id ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {expandedSemester === semester._id && (
                      <div id={`semester-${semester._id}-courses`} className="p-2 space-y-1 bg-purple-50">
                        {subjects[semester._id]?.map((subject) => (
                          <div key={subject._id} className="bg-purple-100 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleSubject(subject._id)}
                              className="w-full flex items-center justify-between p-2 bg-purple-200 hover:bg-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            >
                              <Book className="text-purple-600" />
                              <span>{subject.name}</span>
                            </button>

                            {expandedSubject === subject._id && (
                              <div id={`subject-${subject._id}-resources`} className="p-2 space-y-1 bg-purple-50">
                                {resources[subject._id]?.map((resource) => (
                                  <div key={resource._id}>
                                    <p>{resource.title}</p>
                                    <a href={resource.fileUrls[0]} target="_blank" rel="noopener noreferrer">
                                      {resource.description}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingCourseSection;
