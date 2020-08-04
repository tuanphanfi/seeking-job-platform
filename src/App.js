import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NavBar from './pages/NavBar/index'
import Jobs from "./pages/JobsList";

// cai 3001 o dau ra

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" />
      </Switch>

    
    </div>
  );
}

export default App;
