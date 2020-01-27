import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import React from "react";
import TaskForm from "./tasks/TaskForm";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/tasks/edit/:id" component={TaskForm} />
          <Route path="/tasks/:id" component = {TaskForm} />
        </Switch>
      </Router>
    );
  }
}
