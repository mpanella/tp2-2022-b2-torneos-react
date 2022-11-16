import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

export const EncuentroItem = (props) => {
  const history = useHistory();
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const cookies = new Cookies();

  let token = cookies.get("token");
  console.log(token);

  if (!token) {
    history.push("/");
  }

  const setResultados = () => {
    //cargar el resultado en servicio
  };

  return (
    <div className="auth-form-container">
      <label>{props.nombre_torneo}</label>
      <br></br>
      <label>
        {props.equipo1} VS {props.equipo2}
      </label>
      <br></br>
      {(() => {
        if (props.resultado_1 != -1) {
          return (
            <label>
              {props.resultado_1} - {props.resultado_2}
            </label>
          );
        } else {
          return (
            <div>
              <input
                value={result1}
                onChange={(e) => setResult1(e.target.value)}
                type="number"
                placeholder="0"
              ></input>

              <input
                value={result2}
                onChange={(e) => setResult2(e.target.value)}
                type="number"
                placeholder="0"
              ></input>

              <br></br>
              <button onClick={setResultados()}>Cargar Resultado</button>
            </div>
          );
        }
      })()}
    </div>
  );
};
