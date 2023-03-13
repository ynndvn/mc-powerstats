import "./KPIList.css";
import { KPIBox } from "./KPIBox/KPIBox";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { StockBox } from "./StockBox/StockBox";
const powerStatsConfig = {
  formatter: (data) => {
    const raw = data?.amount;
    const max = 256000000;
    const ratio = (raw / max) * 100;
    if (ratio === 100) {
      return `${ratio}%`;
    } else {
      return `${ratio}% (${raw} / ${max})`;
    }
  },
  dataFormatter: (data) => {
    const maxElementsApprox = 150;
    const modulo = Math.floor(data.length / maxElementsApprox);
    return data.filter((_d, i) => i % modulo === 0);
  },
  graphOptions: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
      },
    },
  },
};

const uraniumConfig = {
  formatter: (data) =>
    Object.keys(data ?? {}).reduce(
      (acc, curr) => ({ ...acc, [curr]: data[curr].amount }),
      {}
    ),
  dataFormatter: (data) => {
    const maxElementsApprox = 150;
    return Object.keys(data ?? {}).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]:
          data[curr].length > maxElementsApprox
            ? data[curr].filter(
                (d, i) =>
                  i % Math.floor(data[curr].length / maxElementsApprox) === 0
              )
            : data[curr],
      }),
      {}
    );
  },
  graphOptions: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

export const KPIList = (props) => {
  const [currentStocks, setCurrentStocks] = useState([]);
  const [stocksEvolution, setStocksEvolution] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const currentResult = await axios.get(
        "https://mc.ydav.in/stocks/current"
      );
      const formatted = uraniumConfig.formatter(currentResult.data);
      setCurrentStocks(formatted);
      const evolutionResult = await axios.get("https://mc.ydav.in/stocks");

      const formattedEvolution = uraniumConfig.dataFormatter(
        evolutionResult.data
      );
      setStocksEvolution(formattedEvolution);
    };
    fun();
  }, []);
  return (
    <div className="kpi-list">
      <Card width="500px">
        <KPIBox
          url="https://mc.ydav.in/power-stats/current"
          formatter={powerStatsConfig.formatter}
          dataUrl="https://mc.ydav.in/power-stats"
          dataFormatter={powerStatsConfig.dataFormatter}
          label="Énergie actuelle"
          graphOptions={powerStatsConfig.graphOptions}
        />
      </Card>
      <Card width="500px">
        <StockBox
          currents={currentStocks}
          evolutions={stocksEvolution}
          graphOptions={uraniumConfig.graphOptions}
        />
      </Card>
    </div>
  );
};
