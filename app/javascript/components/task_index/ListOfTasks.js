import React from "react"
import {Col, Row, Form, Button, ButtonGroup} from "react-bootstrap"

// helper method to set up links for delete
function delete_link(task_id, deleteFx) {
  return (
      <Button type="submit"
              variant="secondary"
              onClick= {e => {
                 const cfm = confirm("Are you sure?");
                 if (cfm) {
                   deleteFx(task_id)
                 }
              }}>
      Delete
      </Button>
  );
}

// helper method to set up links for edit
function edit_link(task_id) {
  return (
  <Button type="submit"
          variant="secondary"
          onClick= {e => {
            window.location.href = "/tasks/" + task_id + "/edit";
            }
          }>
  Edit
  </Button>
  );
}

// helper method to set up links for showing
function show_link(task_id) {
  return (
    <Button type="submit"
            variant="secondary"
            onClick={e => {
              window.location.href = "/tasks/" + task_id; 
            }
          }>
    Show
    </Button>
  );
}

// renders the row for a specific task
function RenderTask(props) {
  const task = props.task;
  return (
    <div className="mb-1">
    <Row>
      <Col sm="6">{task.task_name}</Col>
      <Col>
        <ButtonGroup>
        {edit_link(task.id)}
        {show_link(task.id)}
        {delete_link(task.id, props.delete)}
        </ButtonGroup>
      </Col>
      <Col></Col>
    </Row>
    <Row style={props.on_specific ? {display: "block"} : {display: "none"}}>
      <Col></Col>
    </Row>
    </div>
  );

}

// main class that structures each element
class ListOfTasks extends React.Component {
  render() {
    if (this.props.tasks && typeof this.props.tasks === "object") {
      if (this.props.tasks.length > 0) {
        return (
          <Col>
          { this.props.tasks.map(task => (
            <RenderTask key={task.id} task={task} delete={this.props.delete}
                        />)) }
          </Col>
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
}

export default ListOfTasks