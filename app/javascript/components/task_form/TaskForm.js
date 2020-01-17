import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {TaskName, DueDate, DueTime, TaskDesc} from './TaskFormComponents'
import {Tags} from './Tags'
import ButtonRow from './ButtonRow'

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrDateTime = this.getCurrDateTime.bind(this);
    this.readOnly = props.action === "show" ? true : false;
    this.changeTaskFormField = this.changeTaskFormField.bind(this);
    this.clearDateTime = this.clearDateTime.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.appendTag = this.appendTag.bind(this);
    this.editTag = this.editTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.submit = this.sendSubmit.bind(this);
    this.edit = this.sendUpdate.bind(this);
    this.delete = this.sendDestroy.bind(this);
    this.reset = this.reset.bind(this);
    if (props.task) {
      this.new_task = {"task_name": props.task.task_name,
                       "due_date": props.task.due_date,
                       "due_time": props.task.due_time ? props.task.due_time.slice(11, 16) : null,
                       "task_desc": props.task.task_desc,
                       "tags": props.task.tags
                      }
    } else {
      const date_time = this.getCurrDateTime();
      this.new_task = {"task_name": "",
                       "due_date": date_time[0],
                       "due_time" : date_time[1],
                       "task_desc": "",
                       "tags": []};
    }
    this.state = {
      task: this.new_task,
      curr_tag: ""
    };
  }

  sendSubmit() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/tasks");
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        window.location.href = "";
      }
    };
    xhr.send(JSON.stringify(this.new_task));
  }

  sendUpdate(e) {
    const task_id = this.props.task.id;
    console.log(task_id);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/tasks/" + task_id);
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.new_task));
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        window.location.href = "/";
      }
    };
    this.reset("null");
  }

  sendDestroy(e) {
    const task_id = this.props.task.id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/tasks/" + task_id);
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        window.location.href = "/";
      }
    };
  }

  changeTaskFormField(e) {
    this.new_task[e.target.name] = e.target.value;
    this.setState({task: this.new_task});
  }

  clearDateTime(e) {
    this.new_task["due_date"] = "";
    this.new_task["due_time"] = "";
    this.setState({task: this.new_task});
  }

  reset(e) {
    const date_time = this.getCurrDateTime();
    this.new_task = {"task_name": "",
                     "due_date": date_time[0],
                     "due_time": date_time[1],
                     "task_desc": "",
                     "tags": []}
    this.setState({task: this.new_task,
                  curr_tag: ""});
  }

  changeTag(e) {
    this.setState({curr_tag: e.target.value});
  }

  appendTag(e) {
    for (let i = 0; i < this.new_task.tags.length; i++) {
      if (this.new_task.tags[i] === this.state.curr_tag) {
        this.setState({curr_tag: ""});
        return;
      }
    }
    if (this.props.action === "edit") {
      console.log("updating a task's tag!");
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/tasks/" + this.props.task.id + "/tags");
      xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({tag_name: this.state.curr_tag}));
    }

    this.new_task["tags"].push(this.state.curr_tag);
    this.setState({task: this.new_task, curr_tag: ""});
  }

  editTag(tag_name) {
    this.deleteTag(tag_name, false);
    this.setState({curr_tag: tag_name});
  }

  deleteTag(tag_name, flag_cfm) {
    const cfm = flag_cfm ? confirm("Deleting a tag. Are you sure?") : true;
    if (cfm) {
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", "/tasks/" + this.props.task.id + "/tags/" + tag_name);
      xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
      xhr.send();
      this.new_task["tags"] = this.state.task.tags.filter(t_name => t_name !== tag_name);
      this.setState({task: this.new_task});
    }
  }

  getCurrDateTime() {
    var date_obj = new Date();
    var date_str = date_obj.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'});
    const date = date_str.slice(6, 10) + "-" + date_str.slice(0, 2) + "-" + date_str.slice(3, 5);
    var time_str = date_obj.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    const time = time_str.slice(-1, -3) === "AM" 
                ? time_str.slice(0, 5)
                : (parseInt(time_str.slice(0, 2)) + 12).toString() + time_str.slice(2, 5);
    return [date, time];
  }

  render() {
    return (
      <Container>
        <Form>
          <TaskName onChange={this.changeTaskFormField} task_name={this.state.task["task_name"]} readOnly={this.readOnly} />
          <Form.Row>
            <DueDate onChange={this.changeTaskFormField} due_date={this.state.task["due_date"]} readOnly={this.readOnly} />
            <DueTime onChange={this.changeTaskFormField} due_time={this.state.task["due_time"]} readOnly={this.readOnly} />
          </Form.Row>
          <TaskDesc onChange={this.changeTaskFormField} task_desc={this.state.task["task_desc"]} readOnly={this.readOnly}/>
          <Tags onChange={this.changeTag} onClick={this.appendTag} 
                tags={this.state.task.tags} input_val={this.state.curr_tag} 
                readOnly={this.readOnly} action={this.props.action} 
                editTag={this.editTag} deleteTag={this.deleteTag} />
          <ButtonRow flag={this.props.action} submit={this.submit} edit={this.edit} 
                                              delete={this.delete} reset={this.reset}
                                              clearDateTime={this.clearDateTime} />
        </Form>
      </Container>
    );
  }
}

TaskForm.propTypes = {
  csrf: PropTypes.string,
  task: PropTypes.object,
  action: PropTypes.oneOf(['new', 'edit', 'show']),
}

export default TaskForm 