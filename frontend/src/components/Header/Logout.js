import React from "react";
import { Redirect, withRouter } from "react-router-dom";

function Logout(props) {
  const logout = () => {
    localStorage.clear();
    props.history.replace("/login");
  };
  return (
    <button className="Logout" onClick={logout}>
      Logout
    </button>
  );
}

export default withRouter(Logout);
