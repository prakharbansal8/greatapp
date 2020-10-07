import React from "react";

function Checkbox({ label }) {
  return (
    <>
      <input type="checkbox" className="chk_bx" />
      {label}
    </>
  );
}

export default Checkbox;
