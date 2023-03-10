import "./StatsTable.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import { Title } from "../../Title/Title";
import { SyncLoader } from "react-spinners";

const p = (d) => `${d}`.padStart(2, "0");

const format = (d) => {
  const y = d.getFullYear();
  const mm = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();

  return `${y}-${p(mm)}-${p(day)} ${p(h)}:${p(m)}:${p(s)}`;
};

export const StatsTable = (props) => {
  const columns = useMemo(
    () => [
      {
        accessorFn: (line) => format(line.start),
        header: "Début",
      },
      {
        accessorFn: (line) => format(line.end),
        header: "Fin",
      },
      {
        accessorKey: "duration",
        header: "Durée (secondes)",
      },
    ],
    []
  );
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get("https://mc.ydav.in/power-stats");
      const stats = [];
      let currentOutage = null;
      for (const line of data) {
        if (line.amount !== 256_000_000) {
          if (!currentOutage) {
            currentOutage = { start: new Date(line.date) };
          } else {
            currentOutage.end = new Date(line.date);
          }
        } else if (currentOutage) {
          stats.push({
            start: currentOutage.start,
            end: new Date(line.date),
            duration: Math.round(
              new Date(line.date).getTime() / 1000 -
                currentOutage.start.getTime() / 1000
            ),
          });
          currentOutage = null;
        }
      }
      setStats(stats.sort((a, b) => b.end - a.end));
    };
    fun();
  }, []);

  return (
    <div className="reactor-table">
      <Title>Allumages des réacteurs</Title>
      {stats?.length ? (
        <MaterialReactTable columns={columns} data={stats} />
      ) : (
        <div className="spinner">
          <SyncLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
};
