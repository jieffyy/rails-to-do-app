import React from "react"
import PropTypes from "prop-types"
import {Col, Row, Form, Button, Badge} from "react-bootstrap"

function TagArr(props) {
  return props.tag_arr.map( (name, index) =>
    <Badge className="mr-1" variant="info" key={index}>{name}</Badge>
  );
}

function TagForm(props) {
  return (
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label as={Row}>Tags</Form.Label>
        <Row className="mb-1">
          <Col><TagArr tag_arr={props.tag_arr} /></Col>
        </Row>
        <Row>
          <Col sm="6" className="pr-0">
            <Form.Control type="text" placeholder="New tag" value={props.value} onChange={props.updateTag}/>
          </Col>
          <Col sm="6"className="pl-0">
            <Button variant="secondary" onClick={props.appendTag}>Tag</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form.Row>
  );
}

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.appendTag = this.appendTag.bind(this);
    this.updateTag = this.updateTag.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      curr_tag: "",
      tags_added: []
    }
  }

  clearAll(e) {
    this.setState({tags_added: []});
  }

  appendTag(e) {
    if (this.state["curr_tag"] !== "") {
      this.state["tags_added"].push(this.state["curr_tag"]);
      this.setState({curr_tag: ""});
    }
  }

  updateTag(e){
    this.setState({curr_tag: e.target.value});
  }

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

        <TagForm appendTag={this.appendTag} updateTag={this.updateTag} value={this.state["curr_tag"]} tag_arr={this.state["tags_added"]}/>

        <input type="hidden" name="authenticity_token" value={this.props.csrf} />
        <input type="hidden" name="tags_arr" value={JSON.stringify(this.state["tags_added"])} />
        <Button variant="dark" type="submit" active={true}>Add Task</Button>
        <Button variant="light" type="reset" onClick={this.clearAll}>Clear</Button>
        
      </Form>
    );
  }
}

export default TaskForm