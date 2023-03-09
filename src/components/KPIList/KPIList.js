import "./KPIList.css";
import { KPIBox } from "./KPIBox/KPIBox";
import { Card } from "../Card/Card";
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
  formatter: (data) => data?.amount,
  dataFormatter: powerStatsConfig.dataFormatter,
  graphOptions: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

export const KPIList = (props) => {
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
        <KPIBox
          url="https://mc.ydav.in/uranium/current"
          formatter={uraniumConfig.formatter}
          dataUrl="https://mc.ydav.in/uranium"
          dataFormatter={uraniumConfig.dataFormatter}
          label="Uranium"
          graphOptions={uraniumConfig.graphOptions}
        />
      </Card>
    </div>
  );
};
