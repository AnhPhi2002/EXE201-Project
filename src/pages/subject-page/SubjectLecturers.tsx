import imglecturers from '../../assets/images/404monkey.webp'; 

export const SubjectLecturers = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="text-center">
        <img src={imglecturers} alt="Lecturer" className="w-32 h-32 rounded-full mx-auto"/>
        <div className="mt-2">
          <p className="font-bold">Lecturer</p>
          <p>NEW YORK — A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's.</p>
        </div>
      </div>
    ))}
  </div>
);
}
