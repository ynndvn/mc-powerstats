import "./StatsGraph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
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
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get("https://mc.ydav.in/power-stats");
      const maxElementsApprox = 150;
      const modulo = Math.floor(data.length / maxElementsApprox);
      setStats(data.filter((_d, i) => i % modulo === 0));
    };
    fun();
  }, []);

  useEffect(() => {
    console.log(stats);
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
  return <Line options={options} data={graphData} />;
};
