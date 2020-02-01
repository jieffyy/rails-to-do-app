import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Formik, FieldArray, Field } from 'formik'

import { addTask, editTask } from '../../store/actions/tasks'
import { AppState } from '../../store/types';
import { Task } from '../../store/types/tasks';

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

type State = {
  task: Task | null,
  curr_tag: string,
  tag_xs: string[]
}

class BaseFormComp extends Component<PropsFromRedux, State> {
  constructor(props: PropsFromRedux & State) {
    super(props);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.state = {
      task: this.props.task,
      tag_xs: this.props.task ? this.props.task.tags : [],
      curr_tag: "",
    }
  }

  static getDerivedStateFromProps(next: PropsFromRedux, prev: PropsFromRedux) {
    if (next.task) {
      return {task: next.task, tags: next.task.tags}
    } else {
      return null
    }
  }

  handleTagChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({curr_tag: e.currentTarget.value})
  }

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={this.state.task
          ? {task_name: this.state.task.task_name,
            task_desc: this.state.task.task_desc,
            due_date: this.state.task.due_date,
            due_time: this.state.task.due_time?.slice(11, 19),
            is_complete: this.state.task.is_complete,
            tags: this.state.task.tags}
          : {task_name: "", task_desc: "", due_date: dateToday(), due_time: "23:00", is_complete: false,
            tags: []}}
        onSubmit={values => {
          this.props.sub_app === "add" 
            ? this.props.addTask(this.props.csrf, values)
          : this.props.task 
            ? this.props.editTask(this.props.task.id, this.props.csrf, values)
          : console.log("error");
        }}
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
               
          <div className="form-group">
            <label className="m-0">Tags</label>
            
            <div className="row">
              <div className="col mb-1">
              {formik.values.tags.map(tag_name => {
                return (
                  <span className="badge badge-info mr-2" key={tag_name}>{tag_name}</span>
                );
              })}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="input-group mb-1">
                  <input type="text" className="form-control" name="curr_tag"
                    value={this.state.curr_tag} onChange={this.handleTagChange} />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary"
                    placeholder="New Tag" onClick={() => {
                      const tag = this.state.curr_tag
                      formik.setFieldValue("tags", formik.values.tags.concat([tag]))
                      this.setState({curr_tag: ""});
                      console.log("Formik Values: " + formik.values.tags)
                    }}>New Tag</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <button type="submit" className="btn btn-dark mr-2">
            {this.props.sub_app === "add" ? "New Task" : "Update Task"}
          </button>
          <button type="button" className="btn btn-outline-secondary mr-2" 
            onClick={() => {
              formik.resetForm();
              this.setState({curr_tag: "", tag_xs: []})
            }}>Reset</button>
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