import "./StatsKPI.css";
import { Title } from "../Title/Title";
import { useEffect, useState } from "react";

export const StatsKPI = (props) => {
  const handleClick = () => {
    props.setShowGraph((oldValue) => !oldValue);
  };
  const [pretty, setPretty] = useState(0);
  useEffect(() => {
    const raw = props.data[props.data.length - 1]?.amount;
    const max = 256000000;
    const ratio = (raw / max) * 100;
    if (ratio === 100) {
      setPretty(`${ratio}%`);
    } else {
      setPretty(`${ratio}% (${raw} / ${max})`);
    }
  }, [props.data]);
  return (
    <div className="kpi">
      <Title>
        Énergie actuelle : {props.data?.length ? pretty : "Chargement..."}
      </Title>
      <button onClick={() => handleClick()}>
        {props.showGraph ? "Cacher" : "Afficher"} le graphique
      </button>
    </div>
  );
};
