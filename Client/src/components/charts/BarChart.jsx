import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Created",
      data: [12, 18, 14, 22, 19, 26],
      backgroundColor: "#2563EB",
    },
    {
      label: "Renewed",
      data: [5, 7, 8, 6, 10, 7],
      backgroundColor: "#10B981",
    },
    {
      label: "Terminated",
      data: [2, 1, 4, 3, 5, 1],
      backgroundColor: "#EF4444",
    },
  ],
};

export default function BarChart() {
  return <Bar data={data} />;
}