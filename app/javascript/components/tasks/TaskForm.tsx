import React, { Component } from 'react'
import { connect, ConnectedProps} from 'react-redux'
import { Formik } from 'formik'

import { AppState } from '../../store/types'
import { addTask } from '../../store/actions/tasks'

function dateToday(): string {
  var date_obj = new Date();
  var date_str = date_obj.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'});
  const date = date_str.slice(6, 10) + "-" + date_str.slice(0, 2) + "-" + date_str.slice(3, 5);
  return date;
}

const mapStateToProps = (state: AppState) => {
  return {
    csrf: state.csrf
  }
}

const mapDispatchToProps = {
  addTask
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

class TaskFormComp extends Component<PropsFromRedux, AppState> {
  render() {
    return (
      <Formik
        initialValues={{task_name: "", task_desc: "", due_date: dateToday(), due_time: "23:00",
          authenticity_token: this.props.csrf}}
        onSubmit={values => this.props.addTask(values)}
      >

{ formik => (
        <div className="container pt-3">
        <form onSubmit={formik.handleSubmit}>
      
          <div className="form-group">
            <div className="form-group">Task Name</div>
            <input type="text" id="task_name" className="form-control"
                          placeholder="Enter task name"
                          value={formik.values.task_name}
                          onChange={formik.handleChange} />
          </div>

          <div className="row form-group">
            <div className="col sm-4">
              <label>Due Date</label>
              <input type="date" id="due_date" className="form-control"
                            value={formik.values.due_date}
                            onChange={formik.handleChange} />
            </div>

            <div className="col sm-4">
            <label>Due Time</label>
              <input type="time" id="due_time" className="form-control"
                            value={formik.values.due_time}
                            onChange={formik.handleChange} />
            </div>

            <div className="col sm-4 d-flex align-items-end">
            <button type="button" className="btn btn-outline-secondary"
                    onClick={() => {
                              formik.setFieldValue("due_date", "");
                              formik.setFieldValue("due_time", "");
                            }}>Clear Date and Time</button>
            </div>
          </div>

          <div className="form-group">
            <label>Task Description</label>
            <textarea rows={5} id="task_desc" className="form-control"
                          placeholder="Add some details"
                          value={formik.values.task_desc}
                          onChange={formik.handleChange} />
          </div>

          <button type="submit" className="btn btn-dark mr-2">New Task</button>
          <button type="button" className="btn btn-outline-secondary" 
            onClick={() => formik.resetForm()}>Reset</button>   
          
        </form>
        </div>
      )}
        
      </Formik>
    )
  }
}

const TaskForm = connector(TaskFormComp)
export default TaskForm