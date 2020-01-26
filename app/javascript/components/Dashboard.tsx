import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { fetchAPI } from '../store/actions'

import Users from "./users/Users"
import Tasks from './tasks/Tasks'
import { AppState } from '../store/types'

const mapDispatchToProps = {
  fetchAPI
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

class DashboardComp extends Component<PropsFromRedux, AppState> {
  componentDidMount() {
    this.props.fetchAPI()
  }

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

const Dashboard = connector(DashboardComp)
export default Dashboard