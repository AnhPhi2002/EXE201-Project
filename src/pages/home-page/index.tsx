import React from 'react'

const HomePage = () => {
  return (
    <div>
       <div className="bg-gray-100 flex items-center justify-center min-h-screen px-[10%]">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Q&A for students</h1>
          <p className="text-lg mb-10">You can view and answer his question here</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-300 text-white text-xl font-bold py-1 px-3 rounded-full inline-block mb-4">SE392</div>
              <h2 className="text-2xl font-semibold mb-2">Standard Two</h2>
              <p className="text-gray-700 mb-6">Standard 2 builds on the foundations of Standard 1 and includes requirements...</p>
              <a href="#" className="text-purple-600 border border-purple-600 rounded-lg py-2 px-4 inline-block">
                Class Details
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-teal-400 text-white text-xl font-bold py-1 px-3 rounded-full inline-block mb-4">IB101</div>
              <h2 className="text-2xl font-semibold mb-2">Standard Two</h2>
              <p className="text-gray-700 mb-6">Standard 2 builds on the foundations of Standard 1 and includes requirements...</p>
              <a href="#" className="text-purple-600 border border-purple-600 rounded-lg py-2 px-4 inline-block">
                Class Details 
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-lime-400 text-white text-xl font-bold py-1 px-3 rounded-full inline-block mb-4">MK392</div>
              <h2 className="text-2xl font-semibold mb-2">Standard Three</h2>
              <p className="text-gray-700 mb-6">Standard 3 of the Aged Care Quality Standards applies to all services delivering personal...</p>
              <a href="#" className="text-purple-600 border border-purple-600 rounded-lg py-2 px-4 inline-block">
                Class Details
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-purple-500 text-white text-xl font-bold py-1 px-3 rounded-full inline-block mb-4">SD392</div>
              <h2 className="text-2xl font-semibold mb-2">Standard Two</h2>
              <p className="text-gray-700 mb-6">Standard 2 builds on the foundations of Standard 1 and includes requirements...</p>
              <a href="#" className="text-purple-600 border border-purple-600 rounded-lg py-2 px-4 inline-block">
                Class Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage