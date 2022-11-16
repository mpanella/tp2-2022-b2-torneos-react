import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

export const TorneoItem = (props) => {
  const history = useHistory();

  const cookies = new Cookies();

  let token = cookies.get("token");
  console.log(token);

  if (!token) {
    history.push("/");
  }

  return (
    <div className="auth-form-container">
      <button
        onClick={() => history.push("interna_torneo", { params: props._id })}
      >
        <label>{props.name}</label>
      </button>
    </div>
  );
};
