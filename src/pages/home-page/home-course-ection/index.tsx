import React, { useState } from "react";
import { ChevronDown, ChevronUp, Book } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CodingCourseSection = () => {
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const majors = [
      { id: "SS", name: "Software Systems" },
      { id: "SA", name: "System Analysis" },
      { id: "IB", name: "International Business" },
      { id: "MKT", name: "Marketing" },
  ];

  const semesters = [
    { id: 1, courses: ["SPW325", "SDW102", "ABC789", "DIS456", "WND123"] },
    { id: 2, courses: ["SPW326", "SDW103", "ABC790", "DIS457", "WND124"] },
    { id: 3, courses: ["SPW327", "SDW104", "ABC791", "DIS458", "WND125"] },
  ];

  const toggleMajor = (majorId: string) => {
    setExpandedMajor(expandedMajor === majorId ? null : majorId);
    setExpandedSemester(null);
  };

  const toggleSemester = (semesterId: number) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  const handleCourseClick = (courseId: string) => {
    // Điều hướng đến trang chi tiết môn học với courseId
    navigate(`/subject/${courseId}`);
  };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mt-16 mb-8 text-black">Course Section</h1>
      <div className="space-y-2">
        {majors.map((major) => (
          <div key={major.id} className="bg-purple-300 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleMajor(major.id)}
              className="w-full flex items-center justify-between p-3 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              aria-expanded={expandedMajor === major.id}
              aria-controls={`major-${major.id}-semesters`}
            >
              <span className="text-lg font-semibold">
                {major.id} ({major.name})
              </span>
              {expandedMajor === major.id ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedMajor === major.id && (
              <div
                id={`major-${major.id}-semesters`}
                className="space-y-1 p-3 bg-gray-50 animate-fadeIn"
              >
                {semesters.map((semester) => (
                  <div key={semester.id} className="bg-purple-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSemester(semester.id)}
                      className="w-full flex items-center justify-between p-2 bg-purple-200 hover:bg-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                      aria-expanded={expandedSemester === semester.id}
                      aria-controls={`semester-${semester.id}-courses`}
                    >
                      <span className="text-base font-medium">Semester {semester.id}</span>
                      {expandedSemester === semester.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {expandedSemester === semester.id && (
                      <div
                        id={`semester-${semester.id}-courses`}
                        className="p-2 space-y-1 bg-purple-50 animate-fadeIn"
                      >
                        {semester.courses.map((course) => (
                          <button
                            key={course}
                            onClick={() => handleCourseClick(course)} // Thêm sự kiện click
                            className="w-full text-left p-1 rounded-md bg-white hover:bg-purple-100 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            aria-label={`Course ${course}`}
                          >
                            <Book className="text-purple-600" />
                            <span>{course}</span>
                          </button>
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
