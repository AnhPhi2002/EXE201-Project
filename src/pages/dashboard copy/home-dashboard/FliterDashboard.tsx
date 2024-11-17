// KeyMetricsHeader.tsx
import React from 'react';


interface FliterDashboardProps {
  selectedMetric: string;
  setSelectedMetric: (value: string) => void;
}

const FliterDashboard: React.FC<FliterDashboardProps> = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mt-3 mb-3">DashBoard</h2>
        <div className="flex items-center space-x-4">      
        </div>
      </div>
      
    </div>
  );
};

export default FliterDashboard;
