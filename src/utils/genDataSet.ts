const LineChartData = (title: string, labels: string[], data: any[]) => {
  return {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        fill: false,
        borderColor: 'blue',
      },
    ],
  };
};

const PieChartData = (title: string, labels: string[], data: any[]) => {
  return {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: ['teal', 'red'],
      },
    ],
  };
};

const BarChartData = (title: string, labels: string[], data: any[]) => {
  return {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: ['green', 'red', 'blue', 'orange'],
      },
    ],
  };
};

export { LineChartData, PieChartData, BarChartData };
