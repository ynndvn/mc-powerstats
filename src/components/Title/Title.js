import "./Title.css";


export const Title = (props) => {

  return (
    <div className="titleParent">
      <div className="title">
        {props.children}
      </div>
    </div>
  );
};
