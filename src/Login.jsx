import React, { useState } from "react";
import { BASE_URL, LOGIN } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

export const Login = (props) => {
  const cookies = new Cookies();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    let path = BASE_URL + LOGIN;

    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: path,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const rol = response.data.user.rol;
        cookies.set("token", JSON.stringify(response.data.token));
        cookies.set("id_user", JSON.stringify(response.data.user._id));

        if (rol.toString() === "admin".toString()) {
          history.push("/homeAdmin");
        } else {
          history.push("/home");
        }

        //Todo bien pasa a home
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="tuemail@email.com"
          id="email"
          name="email"
        ></input>

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        ></input>

        <button type="submit">Iniciar Sesión</button>
      </form>
      <button
        className="link-btn"
        onClick={() => history.push("/register")} //props.onFormSwith("register")
      >
        No tenes una cuenta? Registrate
      </button>
    </div>
  );
};
