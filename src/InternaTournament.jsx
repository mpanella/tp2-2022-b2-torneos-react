import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { BASE_URL, GETTORNEO } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { EncuentroItem } from "./Components/EncuentroItem";

export const InternaTournament = (props) => {
  const history = useHistory();
  const location = useLocation();
  const myparam = location.state.params;
  const [torneos, settorneo] = useState([]);

  const cookies = new Cookies();

  let token = cookies.get("token");

  const getData = () => {
    let path = BASE_URL + GETTORNEO;

    var data = JSON.stringify({
      idTorneo: myparam,
    });

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
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        settorneo(response.data.torneo);

        //Todo bien pasa a home
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getData();

  if (!token) {
    history.push("/");
  }

  return (
    <div className="auth-form-container">
      <ul>
        {torneos.map((torneo) => {
          return (
            <EncuentroItem
              nombre_torneo={torneo.nombre_torneo}
              equipo1={torneo.equipo1}
              equipo2={torneo.equipo2}
              resultado_1={torneo.resultado_1}
              resultado_2={torneo.resultado_2}
              id_encuentro={torneo.id_encuentro}
            ></EncuentroItem>
          );
        })}
      </ul>
    </div>
  );
};
