import { Bar, Pie, Line } from 'react-chartjs-2';
// Ensure you have installed chart.js and react-chartjs-2

const Chart = ({ type, data, title }) => {
  const chartMap = {
    bar: Bar,
    pie: Pie,
    line: Line
  };
  
  const ChartComponent = chartMap[type];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>
      <ChartComponent data={data} options={{ responsive: true }} />
    </div>
  );
};

export default Chart;
