import React, { useState, useEffect } from "react";

export const EncuentroUser = (props) => {
  return (
    <div className="auth-form-container">
      <label>
        {props.equipo1} VS {props.equipo2}
      </label>
      <br></br>

      <label>
        {props.resultado_1} - {props.resultado_2}
      </label>
    </div>
  );
};
