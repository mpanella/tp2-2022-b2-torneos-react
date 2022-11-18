import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { BASE_URL, CARGARRESULTADO } from "../Utils/ApiEndPoints.js";
import axios from "axios";

function setResultados(token, id_encuentro, result1, result2) {
  let path = BASE_URL + CARGARRESULTADO;

  let data = {
    idEncuentro: id_encuentro,
    resultadoEquipo1: parseInt(result1),
    resultadoEquipo2: parseInt(result2),
  };

  var config = {
    method: "post",
    url: path,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {})
    .catch(function (error) {});
}

export const EncuentroItem = (props) => {
  const history = useHistory();
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");

  const [resultHarcode1, setResultHarcode1] = useState(props.resultado_1);
  const [resultHarcode2, setResultHarcode2] = useState(props.resultado_2);

  const cookies = new Cookies();

  let token = cookies.get("token");

  if (!token) {
    history.push("/");
  }

  return (
    <div className="auth-form-container">
      <label>{props.nombre_torneo}</label>
      <br></br>
      <label>
        {props.equipo1} VS {props.equipo2}
      </label>
      <br></br>
      {(() => {
        if (resultHarcode1 != -1) {
          return (
            <label>
              {resultHarcode1} - {resultHarcode2}
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
              <button
                onClick={() => {
                  setResultados(token, props.id_encuentro, result1, result2);
                  setResultHarcode1(result1);
                  setResultHarcode2(result2);
                }}
              >
                Cargar Resultado
              </button>
            </div>
          );
        }
      })()}
    </div>
  );
};
