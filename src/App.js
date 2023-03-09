import "./App.css";
import { KPIList } from "./components/KPIList/KPIList";
import { TablesList } from "./components/TablesList/TablesList";

function App() {
  return (
    <div className="root">
      <KPIList />
      <TablesList/>
    </div>
  );
}

export default App;
