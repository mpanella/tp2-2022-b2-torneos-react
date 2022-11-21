import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { BASE_URL, USERHOME, BAJA } from "./Utils/ApiEndPoints.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { EquipoItem } from "./Components/EquipoItem.jsx";
import { EncuentroUser } from "./Components/EncuentroUser.jsx";

const handler = (token, id_user, idEquipo) => {
  let path = BASE_URL + BAJA;

  let data = {
    idEquipo: idEquipo,
    idUser: id_user,
  };

  console.log("Data : ", data);
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
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const Home = () => {
  const history = useHistory();
  const [equipos, setEquipos] = useState([]);
  const [typeEquipo, setTypeEquipo] = useState(false);
  const [miEquipo, setMiEquipo] = useState("");

  const cookies = new Cookies();

  let token = cookies.get("token");
  let idUSer = cookies.get("id_user");

  if (!token) {
    history.push("/");
  }

  useEffect(() => {
    const getData = () => {
      console.log("id user : ", idUSer);
      let path = BASE_URL + USERHOME;

      var config = {
        method: "get",
        url: path,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
          id: idUSer,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if (response.data.respuesta.type == 1) {
            setTypeEquipo(true);
            setEquipos(response.data.respuesta.single);
          } else {
            setTypeEquipo(false);
            setEquipos(response.data.respuesta.single);
            setMiEquipo(response.data.respuesta.idEquipo);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    getData();
  }, []);

  return (
    <div>
      {(() => {
        if (typeEquipo) {
          return (
            <ul>
              {equipos.map((equi) => {
                return (
                  <EquipoItem name={equi.nombre} _id={equi._id}></EquipoItem>
                );
              })}
            </ul>
          );
        } else {
          return (
            <div>
              <ul>
                {equipos.map((encuentro) => {
                  return (
                    <EncuentroUser
                      equipo1={encuentro.idEquipo1}
                      equipo2={encuentro.idEquipo2}
                      resultado_1={encuentro.resultadoEquipo1}
                      resultado_2={encuentro.resultadoEquipo2}
                    ></EncuentroUser>
                  );
                })}
              </ul>
              <button onClick={() => handler(token, idUSer, miEquipo)}>
                Darse de baja
              </button>
            </div>
          );
        }
      })()}

      <button
        className="link-btn"
        onClick={() => history.push("/")} //props.onFormSwith("register")
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
