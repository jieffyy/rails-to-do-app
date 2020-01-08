import React from "react"
import PropTypes from 'prop-types'
import {Col, Row, Button, ButtonGroup} from "react-bootstrap"
import {TagArr} from "../task_form/Tags"

// helper method to set up links for delete
function delete_link(task_id, deleteFx) {
  return (
      <Button type="submit"
              variant="outline-secondary"
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
          variant="outline-secondary"
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
            variant="outline-secondary"
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
  return (
    <Row className="my-2">
      <Col className="px-0" sm="1">
        <Button task={props.task} variant={props.task.is_complete ? "success" : "secondary"}
                onClick={props.markAsComplete}
                style={{height:"100%"}} name={props.task.id}>
          {props.task.is_complete ? "Done" : ""}
        </Button>
      </Col>
      <Col className="pl-0" style={{overflow: "hidden", borderTop: "#6c757d"}} sm="8">
        <div style={{whiteSpace:"nowrap", wordWrap:"break-word", overflowX:"hidden", overflowY: "visible", textOverflow:"ellipsis", height:"2.25rem"}}>
          {props.task.task_name}
        </div>
        <div>{props.task.tags.length === 0 ? null : <TagArr tag_arr={props.task.tags} /> }</div>
      </Col>
      <Col sm="3">
        <ButtonGroup>
        { edit_link(props.task.id) }
        { show_link(props.task.id) }
        { delete_link(props.task.id, props.delete) }
        </ButtonGroup>
      </Col>
    </Row>
  );
}

// main class that structures each element
class ListOfTasks extends React.Component {
  render() {
    if (this.props.tasks.length > 0) {
      return (
      this.props.tasks.map(task => 
        <RenderTask key={task.id} task={task} delete={this.props.delete} markAsComplete={this.props.markAsComplete} />)
      );
    } else {
      return (
        <Row>
        <div className="my-2 pl-0">You don't have any tasks.</div>
        </Row>
      );
    }
  }
}

ListOfTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  delete: PropTypes.func.isRequired,
}

export default ListOfTasks