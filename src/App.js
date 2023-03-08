import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card/Card";
import { LogsTable } from "./components/LogsTable/LogsTable";
import { StatsGraph } from "./components/StatsGraph/StatsGraph";
import { StatsKPI } from "./components/StatsKPI/StatsKPI";
import { StatsTable } from "./components/StatsTable/StatsTable";

function App() {
  const [showGraph, setShowGraph] = useState(false);

  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get("https://mc.ydav.in/power-stats");
      setStats(data);
    };
    fun();
  }, []);
  return (
    <div className="root">
      <Card>
        <StatsKPI showGraph={showGraph} setShowGraph={setShowGraph} data={stats}></StatsKPI>
      </Card>
      {showGraph && stats.length ? (
        <Card>
          <StatsGraph data={stats} />
        </Card>
      ) : null}
      <Card>
        <StatsTable />
      </Card>
      <Card>
        <LogsTable />
      </Card>
    </div>
  );
}

export default App;
