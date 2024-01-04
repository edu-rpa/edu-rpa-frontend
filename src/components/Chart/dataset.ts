const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Robot Performance',
      data: [85, 88, 92, 90, 94, 89],
      fill: false,
      borderColor: 'blue',
    },
  ],
};

const barChartData = {
  labels: ['Error 1', 'Error 2', 'Error 3', 'Error 4'],
  datasets: [
    {
      label: 'Robot Errors',
      data: [15, 10, 5, 8],
      backgroundColor: ['red', 'orange', 'yellow', 'green'],
    },
  ],
};

const pieChartData = {
  labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
  datasets: [
    {
      data: [30, 25, 20, 25],
      backgroundColor: ['purple', 'teal', 'pink', 'blue'],
    },
  ],
};

const radarChartData = {
  labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'],
  datasets: [
    {
      label: 'Sensor Data',
      data: [75, 80, 70, 90, 85],
      fill: true,
      backgroundColor: 'rgba(0, 128, 255, 0.2)',
      borderColor: 'blue',
    },
  ],
};

const polarAreaChartData = {
  labels: ['Resource 1', 'Resource 2', 'Resource 3', 'Resource 4'],
  datasets: [
    {
      data: [35, 25, 15, 25],
      backgroundColor: ['red', 'green', 'blue', 'purple'],
    },
  ],
};

const doughnutChartData = {
  labels: ['Battery Level', 'Unused'],
  datasets: [
    {
      data: [70, 30],
      backgroundColor: ['orange', 'lightgray'],
    },
  ],
};

export {
  lineChartData,
  barChartData,
  pieChartData,
  radarChartData,
  polarAreaChartData,
  doughnutChartData,
};
