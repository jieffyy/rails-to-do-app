import React from "react"
import { Container, Row, Col } from "react-bootstrap"

function TaskRow(props) {
  return (
    <Row>
      <Col sm="8">{props.tag_name}</Col>
      <Col>Show</Col>
      <Col>Edit</Col>
      <Col>Delete</Col>
    </Row>
  );
}

class TaskIndex extends React.Component {
  render() {
    // const tasks_render = this.tasks.map(TaskRow);
    return (
      <Container>
        <TaskRow />
      </Container>
    );
  }
}

export default TaskIndex