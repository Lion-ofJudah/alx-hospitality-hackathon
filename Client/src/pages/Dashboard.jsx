import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import '../styles/dashoard.css'; // Import your CSS file for styles

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  const feedbackData = [
    { category: 'Food', positive: 120, negative: 30 },
    { category: 'Service', positive: 80, negative: 50 },
    { category: 'Room', positive: 90, negative: 20 },
    { category: 'Water Games', positive: 70, negative: 40 },
    { category: 'Transportation', positive: 60, negative: 30 },
    { category: 'Games', positive: 100, negative: 40 },
  ];

  const totalPositive = feedbackData.reduce((sum, item) => sum + item.positive, 0);
  const totalNegative = feedbackData.reduce((sum, item) => sum + item.negative, 0);

  const lineChartData = {
    labels: feedbackData.map(item => item.category),
    datasets: [
      {
        label: 'Positive Feedback',
        data: feedbackData.map(item => item.positive),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Negative Feedback',
        data: feedbackData.map(item => item.negative),
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: feedbackData.map(item => item.category),
    datasets: [
      {
        label: 'Positive',
        data: feedbackData.map(item => item.positive),
        backgroundColor: '#4caf50',
      },
      {
        label: 'Negative',
        data: feedbackData.map(item => item.negative),
        backgroundColor: '#f44336',
      },
    ],
  };

  const pieChartData = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        data: [totalPositive, totalNegative],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Feedback Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Positive</div>
          <div className="stat-value">{totalPositive}</div>
        </div>
        <div className="stat-card negative">
          <div className="stat-label">Total Negative</div>
          <div className="stat-value">{totalNegative}</div>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h2 className="chart-title">Line Chart</h2>
          <div className="chart-wrapper">
            <Line data={lineChartData} />
          </div>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Pie Chart</h2>
          <div className="chart-wrapper">
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Bar Chart</h2>
          <div className="chart-wrapper">
            <Bar data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
