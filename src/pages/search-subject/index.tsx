// import { useEffect, useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDepartments } from '@/lib/api/redux/departmentSlice';
// import { fetchSemesters } from '@/lib/api/redux/semesterSlice';
// import { fetchSubjects } from '@/lib/api/redux/subjectSlice';
// import { RootState, AppDispatch } from '@/lib/api/store';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const CodingCourseSection = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
//   const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

//   const { departments, loading: departmentsLoading, error: departmentsError } = useSelector((state: RootState) => state.departments);
//   const { semesters, loading: semestersLoading, error: semestersError } = useSelector((state: RootState) => state.semesters);
//   const { subjects, loading: subjectsLoading, error: subjectsError } = useSelector((state: RootState) => state.subjects);

//   useEffect(() => {
//     dispatch(fetchDepartments()).then((response) => {
//       const departments = response.payload;
//       if (departments) {
//         departments.forEach(() => {
//           dispatch(fetchSemesters()).then((semesterResponse) => {
//             const semesters = semesterResponse.payload;
//             if (semesters) {
//               semesters.forEach((semester: any) => {
//                 dispatch(fetchSubjects(semester.id));
//               });
//             }
//           });
//         });
//       }
//     });
//   }, [dispatch]);

//   const toggleMajor = useCallback(
//     (departmentId: string) => {
//       setExpandedMajor(expandedMajor === departmentId ? null : departmentId);
//       setExpandedSemester(null);
//     },
//     [expandedMajor],
//   );

//   const toggleSemester = useCallback(
//     (semesterId: string) => {
//       setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
//     },
//     [expandedSemester],
//   );

//   const handleSubjectClick = useCallback(
//     (subjectId: string, subjectName: string) => {
//       navigate(`/subject/${subjectName}?id=${subjectId}`);
//     },
//     [navigate],
//   );

//   if (departmentsLoading || semestersLoading || subjectsLoading) {
//     return <p>Loading...</p>;
//   }

//   if (departmentsError || semestersError || subjectsError) {
//     return <p>Error loading data: {departmentsError || semestersError || subjectsError}</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-semibold mb-4">Phần ngành học </h1>
//       <div className="space-y-4">
//         {departments.map((major) => (
//           <div key={major.id} className="rounded-lg overflow-hidden  ">
//             <button
//               onClick={() => toggleMajor(major.id)}
//               className="w-full flex items-center justify-between p-4 bg-purple-500 text-white rounded-t-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               aria-expanded={expandedMajor === major.id}
//             >
//               <span className="text-lg font-semibold">{major.name}</span>
//               {expandedMajor === major.id ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {expandedMajor === major.id && (
//               <div className="p-4 space-y-2"> 
//                 {semesters
//                   .filter((semester) => semester.department === major.id)
//                   .map((semester) => (
//                     <div key={semester.id} className=" border-purple-200 rounded-lg">
//                       <button
//                         onClick={() => toggleSemester(semester.id)}
//                         className="w-full flex items-center justify-between p-3 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors duration-150 focus:outline-none"
//                       >
//                         <span className="font-medium">{semester.name}</span>
//                         {expandedSemester === semester.id ? <ChevronUp /> : <ChevronDown />}
//                       </button>

//                       {expandedSemester === semester.id && (
//                         <div className="p-3  space-y-1">
//                           {subjects.length > 0 ? (
//                             subjects
//                               .filter((subject) => subject.semester === semester.id)
//                               .map((subject) => (
//                                 <div key={subject.id} className="pl-3">
//                                   <button
//                                     onClick={() => handleSubjectClick(subject.id, subject.name)}
//                                     className="text-left text-purple-700 hover:underline hover:text-purple-900 transition-colors duration-150"
//                                   >
//                                     {subject.name}
//                                   </button>
//                                 </div>
//                               ))
//                           ) : (
//                             <p className="text-gray-500">No subjects available for this semester.</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CodingCourseSection;
