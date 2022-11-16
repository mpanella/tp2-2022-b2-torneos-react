import React, { useState } from "react";
import Cookies from "universal-cookie";
import { BASE_URL, ADMINHOME } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TorneoItem } from "./Components/TorneoItem";

export const HomeAdmin = () => {
  const history = useHistory();
  const [torneos, settorneo] = useState([]);

  const cookies = new Cookies();

  let token = cookies.get("token");
  console.log(token);

  if (!token) {
    history.push("/");
  }

  const getData = () => {
    let path = BASE_URL + ADMINHOME;

    var config = {
      method: "get",
      url: path,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.respuesta));

        settorneo(response.data.respuesta);
        //Todo bien pasa a home
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getData();

  return (
    <div>
      <ul>
        {torneos.map((torneo) => {
          return (
            <TorneoItem name={torneo.nombre} _id={torneo._id}></TorneoItem>
          );
        })}
      </ul>

      <button
        className="link-btn"
        onClick={() => history.push("/created_predio")} //props.onFormSwith("register")
      >
        Crear Predio
      </button>
      <button
        className="link-btn"
        onClick={() => history.push("/alta_torneo")} //props.onFormSwith("register")
      >
        Crear un torneo
      </button>
      <button
        className="link-btn"
        onClick={() => history.push("/")} //props.onFormSwith("register")
      >
        Cerrar Session
      </button>
    </div>
  );
};
