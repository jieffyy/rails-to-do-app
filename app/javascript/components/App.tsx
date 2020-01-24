import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import Users from "../components/users/Users"
import Tasks from './tasks/Tasks'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row my-4">
          <div className="col-3">
            <Users />
          </div>

          <div className="col-9">
            <Tasks />
          </div>
        </div>
      </div>
    )
  }
}