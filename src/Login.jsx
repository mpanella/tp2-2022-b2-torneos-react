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
        console.log(JSON.stringify(response.data));

        const rol = response.data.user.rol;
        cookies.set("token", JSON.stringify(response.data.token));

        console.log("rol : ", rol);
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
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        ></input>

        <label htmlFor="password">Pasword</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        ></input>

        <button type="submit">Log in</button>
      </form>
      <button
        className="link-btn"
        onClick={() => history.push("/register")} //props.onFormSwith("register")
      >
        Don´t have an account? Register
      </button>
    </div>
  );
};
