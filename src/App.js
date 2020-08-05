import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NavBar from "./pages/NavBar/index";
import Jobs from "./pages/JobsList";
import Details from "./pages/CandidatePage";

// cai 3001 o dau ra

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/jobs" component={Jobs} />
        {/* <Route exact path="/jobs/:id" /> */}

        <Route exact path="/jobs/:id" component={Details} />
      </Switch>
    </div>
  );
}

export default App;
