import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const options = {
  fill: true,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

const PieChart = ({ data }: any) => {
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
