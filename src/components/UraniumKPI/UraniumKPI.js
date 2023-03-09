import "./UraniumKPI.css";
import { Title } from "../Title/Title";
import { useEffect, useState } from "react";
import axios from "axios";

export const UraniumKPI = (props) => {
  const handleClick = () => {
    props.setShowGraph((oldValue) => !oldValue);
  };
  const [pretty, setPretty] = useState(0);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get("https://mc.ydav.in/uranium/current");
      const raw = data?.amount;
      setPretty(raw);
    };
    fun();
  }, []);
  return (
    <div className="kpi">
      <Title>
        Uranium ingots : {pretty ?? "Chargement..."}
      </Title>
      <button onClick={() => handleClick()}>
        {props.showGraph ? "Cacher" : "Afficher"} le graphique
      </button>
    </div>
  );
};
