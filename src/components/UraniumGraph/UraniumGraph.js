import "./UraniumGraph.css";
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
import axios from "axios";
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
};

export const UraniumGraph = (props) => {
  const [stats, setStats] = useState([]);
  const [graphData, setGraphData] = useState({ datasets: [] });
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get("https://mc.ydav.in/uranium");
      setStats(data);
    };
    fun();
  }, []);

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
      <Title>Uranium</Title>
      <Line options={options} data={graphData} />;
    </>
  );
};
