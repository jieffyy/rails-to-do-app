import React from "react"
import PropTypes from 'prop-types'
import {Col, Row, Button, ButtonGroup} from "react-bootstrap"

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
  const task = props.task_tag.tasks;
  const tags = props.task_tag.tags;
  return (
    <div className="mb-1">
    <Row>
      <Col sm="6">{task.task_name}</Col>
      <ButtonGroup>
        { edit_link(task.id) }
        { show_link(task.id) }
        {delete_link(task.id, props.delete)}
      </ButtonGroup>
    </Row>
    </div>
  );

}

// main class that structures each element
class ListOfTasks extends React.Component {
  render() {
    if (Object.keys(this.props.tasks).length > 0) {
      return (
        <Col>
        { Object.values(this.props.tasks).reverse().map(obj => 
          <RenderTask key={obj.tasks.id} task_tag={obj} delete={this.props.delete} /> )}
        </Col>
      );
    } else {
      return (
        <div>
        You don't have any tasks.
        </div>
      );
    }
  }
}

ListOfTasks.propTypes = {
  tasks: PropTypes.object,
}

export default ListOfTasks