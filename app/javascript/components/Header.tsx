import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component {
  render() {
    return (
      <div className="container">
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">ToDoApp</span>
      </nav>
      </div>
    )
  }
}
