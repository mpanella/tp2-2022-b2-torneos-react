import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { HomeAdmin } from "./HomeAdmin";
import { CreatedPredio } from "./CreatedPredio";
import { AltaTorneo } from "./AltaTorneo";
import { InternaTournament } from "./InternaTournament";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [currentForm, serCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    serCurrentForm(formName);
  };

  function setView() {}

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login onFormSwith={toggleForm} />
          </Route>
          <Route path="/register" exact>
            <Register onFormSwith={toggleForm} />
          </Route>
          <Route path="/home" exact>
            <Home></Home>
          </Route>
          <Route path="/homeAdmin" exact>
            <HomeAdmin></HomeAdmin>
          </Route>
          <Route path="/created_predio" exact>
            <CreatedPredio></CreatedPredio>
          </Route>
          <Route path="/alta_torneo" exact>
            <AltaTorneo></AltaTorneo>
          </Route>
          <Route path="/interna_torneo" exact>
            <InternaTournament></InternaTournament>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
