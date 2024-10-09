export const SubjectTitle = () => {
  return (
    <div className="flex flex-col items-start p-4">
      <div className="flex items-center space-x-4 w-full">
        <div className="bg-purple-600 text-white p-4 rounded-lg shadow-lg flex justify-center items-center w-48 h-48">
          <div className="text-center">
            <p className="text-2xl font-bold">MAE101</p>
            <p className="text-sm">Toán cho lập trình</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-medium">SWD392</span>
        </div>
      </div>
      <div className="w-full flex justify-start mt-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Subject
        </button>
      </div>
    </div>
  );
}
