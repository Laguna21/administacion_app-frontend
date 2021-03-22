import React /* useMemo, useState */ from "react";
import "./App.css";
import Form from "./components/Form";
import { Navigation } from "./components/Navbar";
import /* InfoList */ "./components/InfoList";
import "./tools/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FullContextProvider } from "./context/FullContext";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <FullContextProvider>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" exact component={Inicio} />
            <Route path="/login" component={Login} />
            <Route path="/add-item" component={Form} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </FullContextProvider>
    </Router>
  );
}

export default App;
