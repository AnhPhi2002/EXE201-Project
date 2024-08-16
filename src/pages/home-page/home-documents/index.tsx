import React from 'react';

const HomeDocument = () => {
  return (
    <div>
      <div className="text-left mb-16">
        <h1 className="text-4xl font-semibold">Documents Of Subjects For FU</h1> 
      </div>  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-semibold mb-8">Resource</h2>
          <p className="text-gray-700 clamp-3-lines">Get the web design inspiration you need from top 3layers users, amazing landing page and site designs, and 3layers Workshops. Get the web design inspiration you need from top 3layers users, amazing landing page and site designs, and 3layers Workshops.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-semibold mb-8">Resource</h2>
          <p className="text-gray-700 clamp-3-lines">All the free tools and resources you need to build better websites.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-semibold mb-8">Resource</h2>
          <p className="text-gray-700 clamp-3-lines">Get the lowdown on the latest new features of 3layers, from flexbox to responsive images, Client Billing to Google Domains. Get the lowdown on the latest new features of 3layers, from flexbox to responsive images, Client Billing to Google Domains.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-xl font-semibold mb-8">Resource</h2>
          <p className="text-gray-700 clamp-3-lines">Get tips and insights on building your own business with a little help from 3layers. Get tips and insights on building your own business with a little help from 3layers.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeDocument;
