import "./App.css";
import { Card } from "./components/Card/Card";
import { LogsTable } from "./components/LogsTable/LogsTable";
import { StatsGraph } from "./components/StatsGraph/StatsGraph";

function App() {
  return (
    <div className="root">
      <Card>
        <StatsGraph />
      </Card>
      <Card>
        <LogsTable />
      </Card>
    </div>
  );
}

export default App;
