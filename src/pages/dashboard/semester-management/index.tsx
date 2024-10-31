import React, { useState } from 'react';
import TabComponent from './TabComponent';


function SemesterManagementDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<string>('sales');
  return (
    <div>
      <section className="bg-white rounded-lg shadow-md p-6 mt-10">

      
      <TabComponent />
      </section>
    </div>
  );
}

export default SemesterManagementDashboard;
