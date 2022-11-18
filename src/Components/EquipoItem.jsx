import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL, REGISTEREQUIPO } from "../Utils/ApiEndPoints.js";
import axios from "axios";
import Cookies from "universal-cookie";

function Register(idEquipo, token, id_user) {
  let path = BASE_URL + REGISTEREQUIPO;

  let data = {
    idEquipo: idEquipo,
    idUser: id_user,
  };

  var config = {
    method: "post",
    url: path,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const EquipoItem = (props) => {
  const history = useHistory();

  const cookies = new Cookies();

  let token = cookies.get("token");
  let id_user = cookies.get("id_user");

  console.log(token);

  if (!token) {
    history.push("/");
  }

  return (
    <div className="auth-form-container">
      <button
        onClick={() => {
          Register(props._id, token, id_user);
        }}
      >
        <label>{props.name}</label>
      </button>
    </div>
  );
};
