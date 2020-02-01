import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import { AppState } from '../../store/types'
import { toggleComplete, deleteTask } from '../../store/actions/tasks'

const mapStateToProps = (state: AppState) => {
  return {
    csrf: state.csrf,
    tasks: state.task_xs
  }
}

const mapDispatchToProps = {
  toggleComplete,
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
          <div className="row my-3" key={task.id}>
            <div className="col col-1 d-flex align-items-end">
              <Dropdown>
                <Dropdown.Toggle id="dropdown" variant="outline-secondary" />
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => window.location.href="/tasks/" + task.id}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.props.deleteTask(this.props.csrf, task.id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="col col-11">
              <div className="row">
                <div className="col">{task.task_name}</div>
              </div>
              <div className="row">
                <div className="col col-2">
                  <button className={task.is_complete ? "btn btn-success" : "btn btn-secondary"} type="button"
                    onClick={() => this.props.toggleComplete(this.props.csrf, task.id)}
                  >{task.is_complete ? "Done" : "Pending"}</button>
                </div>
                <div className="col">
                  <div>{task.tags.map(tag_name => {
                    return (
                      <span key={tag_name} className="badge badge-info mr-1">{tag_name}</span>
                    );
                  }
                  )}</div>
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
