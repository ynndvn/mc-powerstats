import "./KPIBox.css";
import { Title } from "../../Title/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { Modal } from "./Modal/Modal";
import { Button } from "@mui/material";

export const KPIBox = (props) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [pretty, setPretty] = useState(0);
  useEffect(() => {
    const fun = async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const { data } = await axios.get(props.url);
      const formatted = props.formatter(data);
      setPretty(formatted);
    };
    fun();
  }, [props]);
  return (
    <div className="kpi">
      <Title>
        {props.label} : {pretty ?? "Chargement..."}
      </Title>
      <Button variant="contained" onClick={openModal}>
        {props.showGraph ? "Cacher" : "Afficher"} le graphique
      </Button>
      <ReactModal
        style={{ overlay: { zIndex: 1, }, content: {zIndex: 2, height: "fit-content", margin: "auto"} }}
        isOpen={showModal}
        onRequestClose={closeModal}
      >
        <Modal graphOptions={props.graphOptions} dataUrl={props.dataUrl} dataFormatter={props.dataFormatter} />
      </ReactModal>
    </div>
  );
};
