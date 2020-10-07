import React from "react";

const TimelineButton = (props) => {
  const { onClick, btntxt } = props;
  return (
    <>
      <div className="rght_btn" id="rght_btn" style={{ color: "white", cursor: "pointer" }} onClick={onClick}>
        {" "}
        <span className="rght_btn_icon">
          <img src="./../images/btn_iconb.png" alt="up" />
        </span>{" "}
        <span className="btn_sep">
          <img src="./../images/btn_sep.png" alt="sep" />
        </span>{" "}
        <br />
        {btntxt}{" "}
      </div>
    </>
  );
};

export default TimelineButton;
