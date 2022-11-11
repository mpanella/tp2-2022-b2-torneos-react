import React, { useState } from "react";
import Cookies from "universal-cookie";
import { BASE_URL, ALTAPREDIO } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const CreatedPredio = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const cookies = new Cookies();

  let token = cookies.get("token");

  if (!token) {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let path = BASE_URL + ALTAPREDIO;

    var data = JSON.stringify({
      nombre: name,
      direccion: address,
    });

    console.log("path ; ", path);
    console.log(token);

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
        history.push("/homeAdmin");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre Predio</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="nombre"
          id="nombre"
          name="nombre"
        ></input>

        <label htmlFor="direccin">Dirccion</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="direccin"
          id="direccion"
          name="direccin"
        ></input>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

//Name
//direcion
