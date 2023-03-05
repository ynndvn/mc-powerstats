import "./LogsTable.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import { Title } from "../Title/Title";

const p = (d) => `${d}`.padStart(2, "0");

const format = (d) => {
  const y = d.getFullYear();
  const mm = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours() + 1;
  const m = d.getMinutes();
  const s = d.getSeconds();

  return `${y}-${p(mm)}-${p(day)} ${p(h)}:${p(m)}:${p(s)}`;
};

export const LogsTable = (props) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "player",
        header: "Pseudo",
      },
      {
        accessorFn: (row) =>
          format(new Date(new Date(row.date).getTime() - 1000 * 60 * 60)),
        header: "Date",
      },
      {
        accessorFn: (row) => (row.state === "LEFT" ? "Sorti" : "Entré"),
        header: "État",
      },
    ],
    []
  );
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get("https://mc.ydav.in/logs");
      setStats(data);
    };
    fun();
  }, []);

  return (
    <>
      <Title>Ouvertures de la porte</Title>
      {stats?.raw ? (
        <MaterialReactTable columns={columns} data={stats.raw} />
      ) : (
        <div>Chargement...</div>
      )}
    </>
  );
};
