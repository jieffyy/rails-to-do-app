import React from 'react'
import PropTypes from 'prop-types'
import {Container, Form} from 'react-bootstrap'
import {TaskName, DueDate, TaskDesc} from './TaskFormComponents'
import Tags from './Tags'
import ButtonRow from './ButtonRow'

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.task) {
      this.new_task = {"task_name": props.task.task_name,
                       "due_date": props.task.due_date,
                       "task_desc": props.task.task_desc,
                       "tags": props.task.tags
                      }
    } else {
      this.new_task = {"task_name": "",
                       "due_date": "",
                       "task_desc": "",
                       "tags": []};
    }
    this.readOnly = props.action === "show" ? true : false;
    this.changeTaskName = this.changeTaskName.bind(this);
    this.changeDueDate = this.changeDueDate.bind(this);
    this.changeTaskDesc = this.changeTaskDesc.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.appendTag = this.appendTag.bind(this);
    this.submit = this.sendSubmit.bind(this);
    this.edit = this.sendUpdate.bind(this);
    this.delete = this.sendDestroy.bind(this);
    this.reset = this.reset.bind(this);
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

  changeTaskName(e) {
    this.new_task["task_name"] = e.target.value;
    this.setState({task: this.new_task});
  }

  changeDueDate(e) {
    this.new_task["due_date"] = e.target.value;
    this.setState({task: this.new_task});
  }

  changeTaskDesc(e) {
    this.new_task["task_desc"] = e.target.value;
    this.setState({task: this.new_task});
  }

  changeTag(e) {
    this.setState({curr_tag: e.target.value});
  }

  reset(e) {
    this.setState({task: {"task_name": "",
                          "due_date": "",
                          "task_desc": "",
                          "tags": []}
                  });
  }

  appendTag(e) {
    this.new_task["tags"].push(this.state.curr_tag);
    this.setState({task: this.new_task, curr_tag: ""});
  }

  render() {
    return (
      <Container>
        <Form>
          <TaskName onChange={this.changeTaskName} task_name={this.state.task["task_name"]} readOnly={this.readOnly} />
          <DueDate onChange={this.changeDueDate} due_date={this.state.task["due_date"]} readOnly={this.readOnly} />
          <TaskDesc onChange={this.changeTaskDesc} task_desc={this.state.task["task_desc"]} readOnly={this.readOnly}/>
          <Tags onChange={this.changeTag} onClick={this.appendTag} 
                tags={this.new_task.tags} input_val={this.state.curr_tag} 
                readOnly={this.readOnly} />
          <ButtonRow flag={this.props.action} submit={this.submit} edit={this.edit} delete={this.delete} reset={this.reset} />
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