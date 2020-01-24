import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../../store/types'
import { setSubApp } from '../../store/actions'

import SearchPage from './SearchPage'
import TaskForm from './TaskForm'
import TaskIndex from './TaskIndex'

const mapStateToProps = (state: AppState) => {
  return {
    sub_app: state.sub_app
  }
}

const mapDispatchToProps = {
  setSubApp
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

class TasksComp extends Component<PropsFromRedux, AppState> {
  render() {
    return (
      <>
        <h3>To Do List</h3>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-outline-secondary"
            onClick={() => this.props.setSubApp('add')}>Add Task</button>
          <button type="button" className="btn btn-outline-secondary"
            onClick={() => this.props.setSubApp('all')}>Show All</button>
          <button type="button" className="btn btn-outline-secondary"
            onClick={() => this.props.setSubApp('search')}>Search</button>
        </div>

        {this.props.sub_app === "add"
          ? <TaskForm />
          : this.props.sub_app === "search"
            ? <SearchPage />
            : <TaskIndex />}
      </>
    );
  }
}

const Tasks = connector(TasksComp)
export default Tasks


