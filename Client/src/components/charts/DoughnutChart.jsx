import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Vendor",
    "Employment",
    "Lease",
    "Software",
    "NDA",
  ],
  datasets: [
    {
      data: [38, 22, 14, 12, 14],
      backgroundColor: [
        "#2563EB",
        "#10B981",
        "#F59E0B",
        "#8B5CF6",
        "#EC4899",
      ],
    },
  ],
};

export default function DoughnutChart() {
  return <Doughnut data={data} />;
}