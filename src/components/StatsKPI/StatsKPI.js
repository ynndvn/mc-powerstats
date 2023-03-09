import "./StatsKPI.css";
import { Title } from "../Title/Title";
import { useEffect, useState } from "react";
import axios from "axios";

export const StatsKPI = (props) => {
  const handleClick = () => {
    props.setShowGraph((oldValue) => !oldValue);
  };
  const [pretty, setPretty] = useState(0);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get(
        "https://mc.ydav.in/power-stats/current"
      );
      const raw = data?.amount;
      const max = 256000000;
      const ratio = (raw / max) * 100;
      if (ratio === 100) {
        setPretty(`${ratio}%`);
      } else {
        setPretty(`${ratio}% (${raw} / ${max})`);
      }
    };
    fun();
  }, []);
  return (
    <div className="kpi">
      <Title>
        Énergie actuelle : {pretty ?? "Chargement..."}
      </Title>
      <button onClick={() => handleClick()}>
        {props.showGraph ? "Cacher" : "Afficher"} le graphique
      </button>
    </div>
  );
};
