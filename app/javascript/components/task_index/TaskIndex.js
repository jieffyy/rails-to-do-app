import React from "react"
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap"
import SearchBar from "./SearchBar"
import ListOfTasks from "./ListOfTasks"

class TaskIndex extends React.Component {
  constructor(props) {
    const xs_tasks = Object.values(props.tasks).reverse();
    super(props);
    this.find = this.find.bind(this);
    this.showAll = this.showAll.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.markAsComplete = this.markAsComplete.bind(this);
    this.state = {
      tasks: xs_tasks,
      all_tasks: xs_tasks,
      search_term: "",
    };
  }

  find(search_val){
    if (search_val !== "") {
      this.setState({
        search_term: search_val,
        tasks: this.state.all_tasks.filter(task =>
          task.task_name.includes(search_val) || task.tags.includes(search_val)
        )
      })
    } else {
      this.setState({
        search_term: "",
        tasks: this.state.all_tasks,
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
    const new_task_xs = this.state.all_tasks.filter(task => task.id != del_id);
    this.setState({
      tasks: new_task_xs,
      all_tasks: new_task_xs,
    });
  }

  markAsComplete(e) {
    const curr_task_id = parseInt(e.target.name);
    var curr_task = this.state.all_tasks.filter(task => task.id === curr_task_id)[0];
    curr_task["is_complete"] = !curr_task.is_complete;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/tasks/" + e.target.name);
    xhr.setRequestHeader("X-CSRF-TOKEN", this.props.csrf);
    xhr.setRequestHeader('Content-Type', 'application/json');
    delete curr_task.created_at;
    delete curr_task.updated_at;
    delete curr_task.user_id;
    xhr.send(JSON.stringify(curr_task));
    const new_task_xs = this.state.all_tasks.map(task => {
      if (task.id === curr_task_id) {
        return curr_task;
      } else {
        return task;
      }
    });
    this.setState({all_tasks: new_task_xs});
  }

  render() {
    return (
      <Container>
      <Row><h3>To Do List</h3></Row>
      <Row><SearchBar onChange={this.find} value={this.state.search_term} 
                      tags_xs={this.props.tags_xs} handleTagFilter={this.find} /></Row>
      <ListOfTasks tasks={this.state.tasks}
                    delete={this.deleteTask} 
                    markAsComplete={this.markAsComplete} />
      </Container>
    );
  }
}

TaskIndex.propTypes = {
  csrf: PropTypes.string.isRequired, 
  tasks: PropTypes.object.isRequired,
  tags_xs: PropTypes.array.isRequired,
}

export default TaskIndex