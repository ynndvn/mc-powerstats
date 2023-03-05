import "./App.css";
import { Card } from "./components/Card/Card";
import { LogsTable } from "./components/LogsTable/LogsTable";
import { StatsGraph } from "./components/StatsGraph/StatsGraph";
import { StatsTable } from "./components/StatsTable/StatsTable";

function App() {
  return (
    <div className="root">
      <Card>
        <StatsGraph />
      </Card>
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
