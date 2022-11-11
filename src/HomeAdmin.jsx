import React, { useState } from "react";
import Cookies from "universal-cookie";
import { BASE_URL } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const HomeAdmin = () => {
  const history = useHistory();

  const cookies = new Cookies();

  let token = cookies.get("token");
  console.log(token);

  if (!token) {
    history.push("/");
  }

  const getData = () => {
    let path = BASE_URL;

    var config = {
      method: "post",
      url: path,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        //Todo bien pasa a home
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
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
    </div>
  );
};
