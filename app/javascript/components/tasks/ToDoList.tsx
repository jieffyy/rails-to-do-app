import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../../store/types'
import { deleteTask } from '../../store/actions/tasks'

const mapStateToProps = (state: AppState) => {
  return {
    tasks: state.task_xs
  }
}

const mapDispatchToProps = {
  deleteTask
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

class ToDoListComp extends Component<PropsFromRedux> {
  render() {

    // if there are tasks present
    if (this.props.tasks.length > 0) {
      return (
        this.props.tasks.map(task => (
          <div className="row my-2" key={task.id}>
            <div className="col col-4">
              <div className="btn-group" role="group">
                <button className="btn btn-outline-secondary">Show</button>
                <button className="btn btn-outline-secondary">Edit</button>
                <button className="btn btn-outline-secondary">Delete</button>
              </div>
            </div>

            <div className="col col-8">
              <div className="row">
                <div className="col">{task.task_name}</div>
              </div>
              <div className="row">
                <div className="col col-2">
                  <button className="btn btn-secondary">{task.is_complete ? "Done" : "Pending"}</button>
                </div>
                <div className="col">
                  <div>Some tags go here</div>
                </div>
              </div>
            </div>
    
          </div>
      )));

    // there are no tasks
    } else {
      return (
        <div className="row">
          <div className="col">
            You don't have any tasks!
          </div>
        </div>
      );
    }
  }
}

const ToDoList = connector(ToDoListComp)
export default ToDoList
