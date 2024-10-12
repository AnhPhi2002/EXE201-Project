// HomeDashboard.tsx
import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import FliterDashboard from './FliterDashboard'; // Import component
import {
  Chart as ChartJS,
  CategoryScale, // Phải đăng ký CategoryScale
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký tất cả các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomeDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('sales');
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'User Engagement',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
       <section className="bg-white rounded-lg shadow-md p-6 mt-10">
      <FliterDashboard selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
      
      <div className="h-64">
        {selectedMetric === 'sales' ? (
          <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
        ) : (
          <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
        )}
      </div>
      </section>
    </div>
  );
};

export default HomeDashboard;
