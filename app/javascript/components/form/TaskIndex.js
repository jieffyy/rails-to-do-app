import React from "react"
import {FormControl, Button, Table, Row, Col} from "react-bootstrap"


function SearchBar(props) {
  return (
    <>
    <Col sm="4" className="p-0"><FormControl placeholder="Search for a task or tag" /></Col>
    <Col sm="2" className="p-0"><Button variant="dark">Search</Button></Col>
    </>
  );
}


function ListOfTasks(props) {
  if (props.tasks) {
    if (props.tasks.length > 0) {
      const task_render = props.tasks.map(task => (
        <tr key={task.id ? task.id : task.task_name}>
          <td>Done</td>
          <td colSpan="5">{task.task_name}</td>
        </tr>
      ));
      return (
        <Table>
          <tbody>
            {task_render}
          </tbody>
        </Table>
      );
    } else {
      return <ListOfTasks tasks={false} />
    }
  } else {
    return (
      <div>
      You don't have any tasks.
      </div>
    );
  }
}

class TaskIndex extends React.Component {
  render() {
    return (
      <>
      <Row><h1>To Do List</h1></Row>
      <Row><SearchBar /></Row>
      <Row className="my-2"><ListOfTasks tasks={this.props.tasks} /></Row>
      </>
    );
  }
}

export default TaskIndex