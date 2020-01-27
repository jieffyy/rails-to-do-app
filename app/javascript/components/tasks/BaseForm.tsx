import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Formik } from 'formik'

import { addTask, editTask } from '../../store/actions/tasks'
import { AppState } from '../../store/types';

function dateToday(): string {
  var date_obj = new Date();
  var date_str = date_obj.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'});
  const date = date_str.slice(6, 10) + "-" + date_str.slice(0, 2) + "-" + date_str.slice(3, 5);
  return date;
}

const mapStateToProps = (state: AppState) => {
  return {
    csrf: state.csrf,
    task: state.task,
    sub_app: state.sub_app
  }
}

const mapDispatchToProps = {
  addTask,
  editTask,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

class BaseFormComp extends Component<PropsFromRedux, {}> {
  render() {
    console.log(this)
    console.log(this.props.task ? true : false)
    return (
      <Formik
        enableReinitialize
        initialValues={this.props.task
          ? {task_name: this.props.task.task_name,
            task_desc: this.props.task.task_desc,
            due_date: this.props.task.due_date,
            due_time: this.props.task.due_time?.slice(11, 19),
            is_complete: this.props.task.is_complete}
          : {task_name: "", task_desc: "", due_date: dateToday(), due_time: "23:00", is_complete: false}}
        onSubmit={values => this.props.sub_app === "add" 
            ? this.props.addTask(this.props.csrf, values)
          : this.props.task 
            ? this.props.editTask(this.props.task.id, this.props.csrf, values)
          : console.log("error")}
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



          <button type="submit" className="btn btn-dark mr-2">
            {this.props.sub_app === "add" ? "New Task" : "Update Task"}
          </button>
          <button type="button" className="btn btn-outline-secondary mr-2" 
            onClick={() => formik.resetForm()}>Reset</button>
          {this.props.sub_app === "add"
            ? null 
            : <button type="button" className="btn btn-outline-secondary"
              onClick={() => window.location.href="../"}>Back</button>}
          
        </form>
        </div>
      )}
        
      </Formik>
    )
  }
}

const BaseForm = connector(BaseFormComp)
export default BaseForm