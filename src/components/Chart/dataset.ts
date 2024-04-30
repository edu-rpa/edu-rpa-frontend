const lineChartData = {
  labels: [],
  datasets: [
    {
      label: 'Robot Performance',
      data: [],
      fill: false,
      borderColor: 'blue',
    },
  ],
};

const barChartData = {
  labels: [],
  datasets: [
    {
      label: 'Robot Errors',
      data: [],
      backgroundColor: ['teal', 'red', 'blue', 'orange'],
    },
  ],
};

const pieChartData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['teal', 'red'],
    },
  ],
};

const MockDataSet = {
  lineChartData,
  barChartData,
  pieChartData,
};

export default MockDataSet;
