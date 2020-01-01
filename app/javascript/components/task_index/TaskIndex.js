import React from "react"
import {Row} from "react-bootstrap"
import SearchBar from "./SearchBar"
import ListOfTasks from "./ListOfTasks"


class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    this.find = this.find.bind(this);
    this.showAll = this.showAll.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.all_tasks = this.props.tasks;
    this.state = {
      tasks: this.props.tasks,
    };
  }

  find(e){
    const search = e.target.value;
    if (search === "") {
      this.showAll();
    } else if (this.all_tasks) {
      this.setState({tasks: this.all_tasks.filter(
        (task) => task.task_name.includes(search)
      )});
    }

  }

  showAll(){
    this.setState({tasks: this.all_tasks});
  }

  deleteTask(task_id){
    this.setState({tasks: this.state.tasks.filter(task => task.id !== task_id)});
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/tasks/" + task_id);
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.send();
    return;
  }

  render() {
    return (
      <>
      <Row><h1>To Do List</h1></Row>
      <Row><SearchBar find={this.find} /></Row>
      <Row className="my-4  "><ListOfTasks tasks={this.state.tasks}
                                         delete={this.deleteTask}
                                         /></Row>
      </>
    );
  }
}

export default TaskIndex