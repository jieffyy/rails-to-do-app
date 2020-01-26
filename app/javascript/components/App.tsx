import { Component} from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Dashboard from "./Dashboard";
import React from "react";

let Dash = (props: RouteComponentProps) => <Dashboard />

export default class App extends Component {
  render() {
    return (
      <Router>
        <Dash path="/" />
      </Router>
    );
  }
}
