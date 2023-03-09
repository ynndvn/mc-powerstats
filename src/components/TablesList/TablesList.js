import "./TablesList.css";
import { Card } from "../Card/Card";
import { LogsTable } from "./LogsTable/LogsTable";
import { StatsTable } from "./StatsTable/StatsTable";

export const TablesList = (props) => {
  return (
    <div className="tables-list">
      <Card>
        <LogsTable/>
      </Card>
      <Card>
        <StatsTable/>
      </Card>
    </div>
  );
};
