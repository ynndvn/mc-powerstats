import "./StatsGraph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Title } from "../Title/Title";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);
export const options = {
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
};

export const StatsGraph = (props) => {
  const [stats, setStats] = useState([]);
  const [graphData, setGraphData] = useState({ datasets: [] });
  useEffect(() => {
    const maxElementsApprox = 150;
    const modulo = Math.floor(props.data.length / maxElementsApprox);
    setStats(props.data.filter((_d, i) => i % modulo === 0));
  }, [props.data]);

  useEffect(() => {
    setGraphData({
      labels: stats.map((log) =>
        log.date.replace("T", " ").replace("Z", "").slice(10, -4)
      ),
      datasets: [
        {
          data: stats.map((log) => log.amount),
          label: "Conso",
          fill: true,
          borderColor: "white",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
      ],
    });
  }, [stats]);
  return (
    <>
      <Title>Énergie stockée</Title>
      <Line options={options} data={graphData} />;
    </>
  );
};
