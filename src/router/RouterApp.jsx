import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { Home, Alerts, Agents, Agent, Rules, Rule, Dashboard } from "../pages";

export const RouterApp = () => {
  return (
    <Router>
      <div className="router-app__global">
        <Navbar />

        <Switch>
          <Route exact path="/alerts" component={Alerts} />
          <Route exact path="/agents" component={Agents} />
          <Route exact path="/agents/:id" component={Agent} />
          <Route exact path="/rules" component={Rules} />
          <Route exact path="/rules/:id" component={Rule} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
