import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
import { fetchSemesters } from '@/lib/api/redux/semesterSlice';
import { fetchSubjects } from '@/lib/api/redux/subjectSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CodingCourseSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const { departments, loading: departmentsLoading, error: departmentsError } = useSelector(
    (state: RootState) => state.departments
  );
  const { semesters, loading: semestersLoading, error: semestersError } = useSelector(
    (state: RootState) => state.semesters
  );
  const { subjects, loading: subjectsLoading, error: subjectsError } = useSelector(
    (state: RootState) => state.subjects
  );

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchSemesters()).then((response) => {
      const semesters = response.payload;
      semesters.forEach((semester: any) => {
        dispatch(fetchSubjects(semester.id));
      });
    });
  }, [dispatch]);

  const toggleMajor = (departmentId: string) => {
    setExpandedMajor(expandedMajor === departmentId ? null : departmentId);
    setExpandedSemester(null);
  };

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  const handleSubjectClick = (subjectId: string, subjectName: string) => {
    navigate(`/subject/${subjectName}?id=${subjectId}`);
  };

  if (departmentsLoading || semestersLoading || subjectsLoading) {
    return <p>Loading...</p>;
  }

  if (departmentsError || semestersError || subjectsError) {
    return <p>Error loading data: {departmentsError || semestersError || subjectsError}</p>;
  }

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mt-16 mb-8 text-black">Course Section</h1>
      <div className="space-y-2">
        {departments.map((major) => (
          <div key={major.id} className="bg-purple-300 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleMajor(major.id)}
              className="w-full flex items-center justify-between p-3 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              aria-expanded={expandedMajor === major.id}
            >
              <span className="text-lg font-semibold">
                {major.code} ({major.name})
              </span>
              {expandedMajor === major.id ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedMajor === major.id && (
              <div className="p-3 bg-gray-50">
                {semesters
                  .filter((semester) => semester.department === major.id)
                  .map((semester) => (
                    <div key={semester.id} className="bg-purple-100 p-2 mb-2 rounded-lg">
                      <button
                        onClick={() => toggleSemester(semester.id)}
                        className="w-full flex items-center justify-between p-2 bg-purple-200 hover:bg-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                      >
                        {semester.name}
                      </button>

                      {expandedSemester === semester.id && (
                        <div className="p-2 bg-purple-50">
                          {subjects.length > 0 ? (
                            subjects
                              .filter((subject) => subject.semester === semester.id)
                              .map((subject) => (
                                <div key={subject.id} className="p-2">
                                  <button
                                    onClick={() => handleSubjectClick(subject.id, subject.name)}
                                    className="text-left text-blue-600 hover:underline"
                                  >
                                    {subject.name}
                                  </button>
                                </div>
                              ))
                          ) : (
                            <p>No subjects available for this semester.</p>
                          )}
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
