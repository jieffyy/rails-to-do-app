import React from "react"
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap"
import SearchBar from "./SearchBar"
import ListOfTasks from "./ListOfTasks"

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.find = this.find.bind(this);
    this.showAll = this.showAll.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      tasks: this.props.tasks,
      all_tasks: this.props.tasks,
      all_tasks_index: Object.keys(this.props.tasks),
    };
  }

  find(e){
    const search = e.target.value;
    if (search === "") {
      this.showAll();
    } else {
      Object.objects(this.state.all_tasks).filter(task_tag => {
        const task = task_tag["tasks"];
        // const tags = task_tag["tags"];
        console.log(task);
      });
    }
  }

  showAll(){
    this.setState({tasks: this.state.all_tasks});
  }

  deleteTask(del_id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/tasks/" + del_id);
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.send();
    var new_tasks = {};
    var new_task_index = [];
    for (let i = 0; i < this.state.all_tasks_index.length; i++) {
      const key = this.state.all_tasks_index[i];
      if (key != del_id) {
        const task = this.state.all_tasks[key]["tasks"];
        const tags = this.state.all_tasks[key]["tags"];
        new_tasks[key] = {"tasks": task, "tags": tags};
        new_task_index.push(key);
      }
    }
    this.setState({tasks: new_tasks,
                   all_tasks: new_tasks, 
                   all_tasks_index: new_task_index});
  }

  render() {
    return (
      <Container>
      <Row><h1>To Do List</h1></Row>
      <Row><SearchBar find={this.find} /></Row>
      <Row className="my-4"><ListOfTasks tasks={this.state.tasks}
                                         delete={this.deleteTask}
                                         /></Row>
      </Container>
    );
  }
}

TaskIndex.propTypes = {
  csrf: PropTypes.string, 
  tasks: PropTypes.object,
}

export default TaskIndex