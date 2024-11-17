import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
import { fetchSemesters } from '@/lib/api/redux/semesterSlice';
import { fetchSubjects } from '@/lib/api/redux/subjectSlice';

import DepartmentItem from './DepartmentItem';
import SemesterItem from './SemesterItem';
import SubjectItem from './SubjectItem';

const CodingCourseSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const { departments } = useSelector((state: RootState) => state.departments);
  const { semesters } = useSelector((state: RootState) => state.semesters);
  const { subjects } = useSelector((state: RootState) => state.subjects);

  useEffect(() => {
    dispatch(fetchDepartments()).then((response) => {
      const departments = response.payload;
      if (departments) {
        departments.forEach(() => {
          dispatch(fetchSemesters()).then((semesterResponse) => {
            const semesters = semesterResponse.payload;
            if (semesters) {
              semesters.forEach((semester: any) => {
                dispatch(fetchSubjects(semester.id));
              });
            }
          });
        });
      }
    });
  }, [dispatch]);

  const toggleMajor = useCallback(
    (departmentId: string) => {
      setExpandedMajor(expandedMajor === departmentId ? null : departmentId);
      setExpandedSemester(null);
    },
    [expandedMajor],
  );

  const toggleSemester = useCallback(
    (semesterId: string) => {
      setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
    },
    [expandedSemester],
  );

  const handleSubjectClick = useCallback(
    (subjectId: string) => {
      navigate(`/subject/${subjectId}`);
    },
    [navigate],
  );

  return (
    <div className="px-[10%] py-[7%]">
      <h1 className="text-4xl text-white font-semibold mb-10">Bạn có thể tìm kiếm phần học ở đây</h1>
      <div className="space-y-4  ">
        {departments.map((major) => (
          <DepartmentItem
            key={major.id}
            department={major}
            expanded={expandedMajor === major.id}
            onToggle={() => toggleMajor(major.id)}
          >
            {semesters
              .filter((semester) => semester.department === major.id)
              .map((semester) => (
                <SemesterItem
                  key={semester.id}
                  semester={semester}
                  expanded={expandedSemester === semester.id}
                  onToggle={() => toggleSemester(semester.id)}
                >
                  {subjects
                    .filter((subject) => subject.semester === semester.id)
                    .map((subject) => (
                      <SubjectItem
                        key={subject.id}
                        subject={subject}
                        onClick={() => handleSubjectClick(subject.id)}
                      />
                    ))}
                </SemesterItem>
              ))}
          </DepartmentItem>
        ))}
      </div>
    </div>
  );
};

export default CodingCourseSection;
