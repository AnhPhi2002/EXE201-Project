import React, { useState } from 'react';
import FliterDashboard from './FliterDashboard';

const recentActivities = [
  { id: 1, action: 'User login', timestamp: '2023-05-15 10:30 AM' },
  { id: 2, action: 'New order placed', timestamp: '2023-05-15 11:45 AM' },
  { id: 3, action: 'Product updated', timestamp: '2023-05-15 02:15 PM' },
  { id: 4, action: 'Customer support ticket resolved', timestamp: '2023-05-15 04:00 PM' },
];

function AnalyticsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<string>('sales');
  return (
    <div>
      <section className="bg-white rounded-lg shadow-md p-6 mt-10">

      
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">{activity.action}</span>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AnalyticsDashboard;
