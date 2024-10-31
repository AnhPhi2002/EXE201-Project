import React from 'react';

interface FliterDashboardProps {
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
}

const AnalyticsDashboard: React.FC<FliterDashboardProps> = ({ selectedMetric, onMetricChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="metric" className="block text-gray-700 font-semibold mb-2">
        Select Metric
      </label>
      <select
        id="metric"
        value={selectedMetric}
        onChange={(e) => onMetricChange(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
      >
        <option value="sales">Sales</option>
        <option value="traffic">Traffic</option>
        <option value="orders">Orders</option>
        <option value="customers">Customers</option>
      </select>
    </div>
  );
};

export default AnalyticsDashboard;
