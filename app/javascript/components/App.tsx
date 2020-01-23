import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import Users from "../components/users/Users"

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col-4">
            <Users />
          </div>

          <div className="col-8">

          </div>
        </div>
      </div>
    )
  }
}