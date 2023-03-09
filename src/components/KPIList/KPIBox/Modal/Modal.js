import "./Modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
import SyncLoader from "react-spinners/SyncLoader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export const Modal = (props) => {
  const [graphData, setGraphData] = useState({ datasets: [] });
  const [rawGraphData, setRawGraphData] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get(props.dataUrl);
      console.log(data);
      const formatted = props.dataFormatter(data);
      console.log(formatted);
      setRawGraphData(formatted);
    };
    fun();
  }, [props]);

  useEffect(() => {
    setGraphData({
      labels: rawGraphData.map((log) =>
        log.date.replace("T", " ").replace("Z", "").slice(10, -4)
      ),
      datasets: [
        {
          data: rawGraphData.map((log) => log.amount),
          label: "",
          fill: true,
          borderColor: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      ],
    });
  }, [rawGraphData]);
  return (
    <div className="graph">
      <Line
        height={500}
        options={props.graphOptions}
        data={graphData}
        fallbackContent={<SyncLoader color="#36d7b7" />}
      />
    </div>
  );
};
