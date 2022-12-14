import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { BASE_URL, ALTATORNEO, GETPREDIOS } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const AltaTorneo = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [cant, setCant] = useState("");
  const [idPredio, setIdPredio] = useState("");
  const [predios, setPredios] = useState([]);
  const [selectPredio, setSelectedOption] = useState({});

  const cookies = new Cookies();

  let token = cookies.get("token");
  let idPRedio = "";
  console.log(token);

  if (!token) {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let path = BASE_URL + ALTATORNEO;

    //Busco el id del predio:
    for (let i = 0; i < predios.length; i++) {
      if (predios[i].nombre === selectPredio) {
        console.log(predios[i]._id);
        idPRedio = predios[i]._id;
      }
    }

    var data = JSON.stringify({
      nombre: name,
      cantEquipos: cant,
      idPredio: idPRedio,
    });

    //console.log("path ; ", path);
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

  useEffect(() => {
    async function getData() {
      let path = BASE_URL + GETPREDIOS;

      console.log("path ; ", path);
      console.log(token);

      var config = {
        method: "GET",
        url: path,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data.result.single));
          setPredios(response.data.result.single);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getData();
  }, []);

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre del Torneo</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          id="nombre"
          name="nombre"
        ></input>

        <label htmlFor="cantidad_equipos">Cantidad de Equipos</label>
        <input
          value={cant}
          onChange={(e) => setCant(e.target.value)}
          placeholder="0"
          id="cantidad_equipos"
          name="cantidad_equipos"
          type="number"
        ></input>

        <label htmlFor="id_predio">Seleccione el Predio</label>

        <select
          name="predio"
          value={selectPredio}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {predios.map((e, key) => {
            return (
              <option key={key} value={e.value}>
                {e.nombre}
              </option>
            );
          })}
        </select>

        <button type="submit">Crear Torneo</button>
      </form>
      <button
        className="link-btn"
        onClick={() => history.push("/homeAdmin")} //props.onFormSwith("register")
      >
        Volver
      </button>
    </div>
  );
};
