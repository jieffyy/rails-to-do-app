import React from "react"
import PropTypes from "prop-types"
import {Container, Col, Form, Button} from "react-bootstrap"

function Tag_Form(props) {
  if (props.include) {
    return (
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Tags</Form.Label>
        </Form.Group>
      </Form.Row>
    );
  } else {
    return null;
  }
}

class TaskForm extends React.Component {
  render () {
    return (
        <Form method="POST" action="/tasks">
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" name="task_name" placeholder="Add a new task"/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm="4">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="due_date" />
            </Form.Group>
            {/*
            <Form.Group as={Col} sm="2">
              <Form.Label>Due Time</Form.Label>
              <Form.Control type="time" name="due_time" />
            </Form.Group> 
            */}
            <Col sm="7"></Col>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="task_desc" placeholder="Add some details" rows="4" cols="50"/>
            </Form.Group>
          </Form.Row>

          <Tag_Form include={this.props.include_tag_form} />

          <input type="hidden" name="authenticity_token" value={this.props.csrf}></input>
          <Button variant="dark" type="submit">Add Task</Button>
          <Button variant="light" type="reset">Clear</Button>
          
        </Form>
    );
  }
}

export default TaskForm