import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      color: '#fff',
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data) => {
          sum += parseInt(data);
        });
        let percentage = ((parseInt(value) * 100) / sum).toFixed(2) + '%';
        return percentage;
      },
      font: {
        weight: 'bold',
      },
    },
  },
};

const PieChart = ({ data }) => {
  return (
    <div>
      <Pie data={data} options={options as any} />
    </div>
  );
};

export default PieChart;
