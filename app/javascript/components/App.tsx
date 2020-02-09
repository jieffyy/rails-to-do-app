import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./Dashboard";
import TaskForm from "./tasks/TaskForm";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/tasks/edit/:id" component={TaskForm} />
          <Route path="/tasks/:id" component = {TaskForm} />
          <Redirect from="/logout" to="/" />
        </Switch>
      </Router>
    );
  }
}
