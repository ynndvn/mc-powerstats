import "./StockBox.css";
import { Title } from "../../Title/Title";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Modal } from "./Modal/Modal";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { SyncLoader } from "react-spinners";

export const StockBox = (props) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [type, setType] = useState(null);
  const [types, setTypes] = useState(null);
  const [pretty, setPretty] = useState(0);
  useEffect(() => {
    if (type) {
      setPretty(props.currents[type]);
    }
  }, [props, type]);
  useEffect(() => {
    if (props.currents && Object.keys(props.currents).length) {
      setTypes(Object.keys(props.currents));
      setType(Object.keys(props.currents)[0]);
    }
  }, [props]);
  return (
    <div className="kpi">
      {type ? (
        <>
          <Title>
            {type} :{" "}
            {pretty ?? (
              <div className="spinner">
                <SyncLoader color="#36d7b7" />
              </div>
            )}
          </Title>
          <Button variant="contained" onClick={openModal}>
            {props.showGraph ? "Cacher" : "Afficher"} le graphique
          </Button>
          <FormControl size="small">
            <Select value={type} onChange={(evt) => setType(evt.target.value)}>
              {types.map((t) => (
                <MenuItem value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <ReactModal
            style={{
              overlay: { zIndex: 1 },
              content: { zIndex: 2, height: "fit-content", margin: "auto" },
            }}
            isOpen={showModal}
            onRequestClose={closeModal}
          >
            <Modal
              graphOptions={props.graphOptions}
              data={props.evolutions[type]}
            />
          </ReactModal>
        </>
      ) : (
        <div className="spinner">
          <SyncLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
};
