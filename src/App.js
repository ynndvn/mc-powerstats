import { useState } from "react";
import "./App.css";
import { Card } from "./components/Card/Card";
import { LogsTable } from "./components/LogsTable/LogsTable";
import { StatsGraph } from "./components/StatsGraph/StatsGraph";
import { StatsKPI } from "./components/StatsKPI/StatsKPI";
import { StatsTable } from "./components/StatsTable/StatsTable";
import { UraniumGraph } from "./components/UraniumGraph/UraniumGraph";
import { UraniumKPI } from "./components/UraniumKPI/UraniumKPI";

function App() {
  const [showStatsGraph, setShowStatsGraph] = useState(false);
  const [showUraniumGraph, setShowUraniumGraph] = useState(false);

  return (
    <div className="root">
      <Card>
        <StatsKPI
          showGraph={showStatsGraph}
          setShowGraph={setShowStatsGraph}
        ></StatsKPI>
      </Card>
      {showStatsGraph ? (
        <Card>
          <StatsGraph />
        </Card>
      ) : null}
      <Card>
        <StatsTable />
      </Card>
      <Card>
        <UraniumKPI
          showGraph={showUraniumGraph}
          setShowGraph={setShowUraniumGraph}
        ></UraniumKPI>
      </Card>
      {showUraniumGraph ? (
        <Card>
          <UraniumGraph />
        </Card>
      ) : null}
      <Card>
        <LogsTable />
      </Card>
    </div>
  );
}

export default App;
