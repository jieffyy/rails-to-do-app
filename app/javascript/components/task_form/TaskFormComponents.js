import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'

function TaskName(props) {
  if (props.readOnly) {
    return (
      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="text" name="task_name" placeholder="Add a new task"
                      value={props.task_name} onChange={props.onChange} disabled plaintext />
      </Form.Group>
      </Form.Row>
    );
  } else {
    return (
      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="text" name="task_name" placeholder="Add a new task"
                      value={props.task_name} onChange={props.onChange} />
      </Form.Group>
      </Form.Row>
    );
  }

}

function DueDate(props) {
  if (props.readOnly) {
    return (
    <Form.Row>
    <Form.Group as={Col} sm="4">
      <Form.Label>Due Date</Form.Label>
      <Form.Control type="date" name="due_date"
                    value={props.due_date ? props.due_date : ""}
                    onChange={props.onChange} disabled plaintext />
    </Form.Group>
    </Form.Row>
    );
  } else {
    return (
      <Form.Row>
      <Form.Group as={Col} sm="4">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" name="due_date"
                      value={props.due_date ? props.due_date : ""}
                      onChange={props.onChange} />
      </Form.Group>
      </Form.Row>
    );
  }

}

function TaskDesc(props) {
  if (props.readOnly) {
    return (
      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="task_desc" rows="4" cols="50"
                      placeholder="Add some details" value={props.task_desc}
                      onChange={props.onChange} disabled />
      </Form.Group>
      </Form.Row>
    );
  } else {
    return (
      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="task_desc" rows="4" cols="50"
                      placeholder="Add some details" value={props.task_desc}
                      onChange={props.onChange} />
      </Form.Group>
      </Form.Row>
    );
  }

}

export {TaskName, DueDate, TaskDesc}