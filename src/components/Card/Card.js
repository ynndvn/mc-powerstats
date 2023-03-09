import "./Card.css";

export const Card = (props) => {
  return (
    <div className="card" style={{width: props.width ?? "fit-content"}}>
      {props.children}
    </div>
  );
};

