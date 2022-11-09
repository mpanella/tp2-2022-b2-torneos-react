import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { HomeAdmin } from "./HomeAdmin";

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
            <Home></Home>;
          </Route>
          <Route path="/homeAdmin" exact>
            <HomeAdmin></HomeAdmin>;
          </Route>
        </Switch>
      </Router>
    </div>

    // <div className="App">
    //   {currentForm === "login" ? (
    //     <Login onFormSwith={toggleForm} />
    //   ) : (
    //     <Register onFormSwith={toggleForm} />
    //   )}
    // </div>
  );
}

export default App;

// {() => {
//   switch (currentForm) {
//     case "login":
//       <Login onFormSwith={toggleForm} />;
//       break;
//     case "register":
//       <Register onFormSwith={toggleForm} />;
//       break;
//     case "home":
//       <Home onFormSwith={toggleForm} />;
//       break;

//     default:
//       break;
//   }
// }}
