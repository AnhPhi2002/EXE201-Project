import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, fetchSemesters, fetchSubjects } from '@/lib/api/redux/departmentSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const CodingCourseSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();  // Khởi tạo useNavigate
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const { departments, semesters, subjects, loading, error } = useSelector(
    (state: RootState) => state.departments
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const toggleMajor = (departmentId: string) => {
    setExpandedMajor(expandedMajor === departmentId ? null : departmentId);

    if (expandedMajor !== departmentId) {
      dispatch(fetchSemesters()).then((response) => {
        const filtered = response.payload.filter(
          (semester: any) => semester.department === departmentId
        );
        setExpandedSemester(null);  // Reset trạng thái của kỳ học khi chọn ngành khác
      });
    }
  };

  const toggleSemester = (semesterId: string) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);

    if (expandedSemester !== semesterId) {
      dispatch(fetchSubjects(semesterId));
    }
  };

  // Hàm để điều hướng đến trang SubjectPage khi chọn môn học
  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
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
            >
              <span className="text-lg font-semibold">
                {major.code} ({major.name})
              </span>
              {expandedMajor === major._id ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedMajor === major._id && (
              <div className="p-3 bg-gray-50">
                {semesters
                  .filter((semester) => semester.department === major._id)
                  .map((semester) => (
                    <div key={semester._id} className="bg-purple-100 p-2 mb-2 rounded-lg">
                      <button
                        onClick={() => toggleSemester(semester._id)}
                        className="w-full flex items-center justify-between p-2 bg-purple-200 hover:bg-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                      >
                        {semester.name}
                      </button>

                      {expandedSemester === semester._id && (
                        <div className="p-2 bg-purple-50">
                          {subjects.length > 0 ? (
                            subjects
                              .filter((subject) => subject.semester === semester._id)
                              .map((subject) => (
                                <div key={subject._id} className="p-2">
                                  <button
                                    onClick={() => handleSubjectClick(subject._id)}  // Điều hướng khi click vào subject
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
