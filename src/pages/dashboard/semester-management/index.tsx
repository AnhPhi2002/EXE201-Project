import React from 'react';
import TabComponent from './TabComponent';

const SemesterManagementDashboard: React.FC = () => {
  return (
    <div>
      <section className="bg-white rounded-lg shadow-md p-6 mt-10">
        <TabComponent />
      </section>
    </div>
  );
};

export default SemesterManagementDashboard;
