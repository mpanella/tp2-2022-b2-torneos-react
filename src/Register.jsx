import React, { useState } from "react";
import { BASE_URL, REGISTER } from "./Utils/ApiEndPoints";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Register = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDNI] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    let path = BASE_URL + REGISTER;

    var data = JSON.stringify({
      nombre: name,
      apellido: apellido,
      DNI: dni,
      password: password,
      email: email,
      rol: "user",
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
        history.push("/home");

        //Todo bien pasa a home
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2>Registro</h2>

      <form className="registe-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          id="name"
          name="name"
        ></input>
        <label htmlFor="apellido">Apellido</label>
        <input
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellido"
          id="last_name"
          name="last_name"
        ></input>
        <label htmlFor="dni">DNI</label>
        <input
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
          placeholder="DNI"
          id="dni"
          name="dni"
        ></input>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="tuemail@tuemail.com"
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

        <button type="submit">Registrar</button>
      </form>
      <button className="link-btn" onClick={() => history.push("/")}>
        Ya tenes una cuenta? Iniciar Sesión
      </button>
    </div>
  );
};
