import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  fill: true,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      title: {
        display: true,
        text: 'Seconds',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time',
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart({ data }: any) {
  return (
    <div className="w-full h-96">
      <Line data={data} options={options} />
    </div>
  );
}
